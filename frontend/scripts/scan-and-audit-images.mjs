#!/usr/bin/env node
/**
 * Scan all images in codebase and Sanity to identify:
 * 1. Local images that should be in Sanity
 * 2. External images that need migration
 * 3. Image optimization opportunities
 * 
 * Usage:
 *   node --env-file=.env scripts/scan-and-audit-images.mjs
 *   node --env-file=.env scripts/scan-and-audit-images.mjs --fix
 */

import { createClient } from '@sanity/client';
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..');
const FRONTEND_ROOT = join(__dirname, '..');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

const IMAGE_PATTERNS = [
  /src=["']([^"']+)["']/g,
  /image:\s*["']([^"']+)["']/g,
  /url:\s*["']([^"']+\.(jpg|jpeg|png|gif|webp|svg))["']/gi,
  /\/images\/[^"'\s]+/g,
  /\/assets\/images\/[^"'\s]+/g,
];

const EXCLUDE_DIRS = [
  'node_modules',
  '.next',
  '.git',
  'dist',
  'build',
  'tmp',
];

async function* walkDirectory(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    
    if (entry.isDirectory()) {
      if (!EXCLUDE_DIRS.includes(entry.name)) {
        yield* walkDirectory(fullPath);
      }
    } else if (entry.isFile()) {
      const ext = entry.name.split('.').pop();
      if (['tsx', 'ts', 'jsx', 'js', 'json', 'md'].includes(ext)) {
        yield fullPath;
      }
    }
  }
}

function extractImages(content, filePath) {
  const images = new Set();
  
  for (const pattern of IMAGE_PATTERNS) {
    const matches = content.matchAll(pattern);
    for (const match of matches) {
      const url = match[1] || match[0];
      if (url && !url.startsWith('data:')) {
        images.add(url);
      }
    }
  }
  
  return Array.from(images);
}

function categorizeImage(url) {
  if (url.includes('cdn.sanity.io')) {
    return { type: 'sanity', url };
  }
  if (url.startsWith('/images/') || url.startsWith('/assets/images/')) {
    return { type: 'local', url };
  }
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return { type: 'external', url };
  }
  if (url.startsWith('/')) {
    return { type: 'public', url };
  }
  return { type: 'unknown', url };
}

async function scanCodebase() {
  console.log('🔍 Scanning codebase for images...\n');
  
  const imagesByType = {
    sanity: new Set(),
    local: new Set(),
    external: new Set(),
    public: new Set(),
    unknown: new Set(),
  };
  
  const fileReferences = new Map();
  
  for await (const filePath of walkDirectory(FRONTEND_ROOT)) {
    const relativePath = relative(FRONTEND_ROOT, filePath);
    
    try {
      const content = await readFile(filePath, 'utf-8');
      const images = extractImages(content, relativePath);
      
      if (images.length > 0) {
        fileReferences.set(relativePath, images);
        
        for (const img of images) {
          const { type, url } = categorizeImage(img);
          imagesByType[type].add(url);
        }
      }
    } catch (err) {
      // Skip files that can't be read
    }
  }
  
  return { imagesByType, fileReferences };
}

async function scanSanityImages() {
  console.log('🔍 Scanning Sanity for images...\n');
  
  const query = `*[_type == "sanity.imageAsset"]{
    _id,
    url,
    originalFilename,
    size,
    "dimensions": metadata.dimensions,
    "lqip": metadata.lqip,
    "usedIn": count(*[references(^._id)])
  }`;
  
  const images = await client.fetch(query);
  
  return images;
}

async function scanLocalImages() {
  console.log('🔍 Scanning local /public/images directory...\n');
  
  const publicImagesDir = join(FRONTEND_ROOT, 'public', 'images');
  const localImages = [];
  
  try {
    for await (const filePath of walkDirectory(publicImagesDir)) {
      const relativePath = relative(join(FRONTEND_ROOT, 'public'), filePath);
      const stats = await stat(filePath);
      
      localImages.push({
        path: `/${relativePath}`,
        size: stats.size,
        file: filePath,
      });
    }
  } catch (err) {
    console.log('⚠️  No /public/images directory found');
  }
  
  return localImages;
}

function generateReport(codebaseImages, sanityImages, localImages) {
  console.log('\n' + '='.repeat(80));
  console.log('📊 IMAGE AUDIT REPORT');
  console.log('='.repeat(80) + '\n');
  
  // Summary
  console.log('📈 SUMMARY\n');
  console.log(`  Sanity CDN Images:     ${codebaseImages.sanity.size}`);
  console.log(`  Local /images/:        ${codebaseImages.local.size}`);
  console.log(`  External URLs:         ${codebaseImages.external.size}`);
  console.log(`  Public folder:         ${codebaseImages.public.size}`);
  console.log(`  Unknown:               ${codebaseImages.unknown.size}`);
  console.log(`  Total in Sanity CMS:   ${sanityImages.length}`);
  console.log(`  Total in /public:      ${localImages.length}\n`);
  
  // Sanity Images
  if (sanityImages.length > 0) {
    console.log('✅ SANITY CDN IMAGES (Good)\n');
    const used = sanityImages.filter(img => img.usedIn > 0);
    const unused = sanityImages.filter(img => img.usedIn === 0);
    
    console.log(`  Used in content:   ${used.length}`);
    console.log(`  Unused (orphans):  ${unused.length}`);
    
    const totalSize = sanityImages.reduce((sum, img) => sum + (img.size || 0), 0);
    console.log(`  Total size:        ${(totalSize / 1024 / 1024).toFixed(2)} MB\n`);
    
    if (unused.length > 0 && unused.length <= 10) {
      console.log('  Unused images:');
      unused.forEach(img => {
        console.log(`    - ${img.originalFilename} (${(img.size / 1024).toFixed(1)} KB)`);
      });
      console.log();
    }
  }
  
  // Local Images (Need Migration)
  if (codebaseImages.local.size > 0) {
    console.log('⚠️  LOCAL /images/ REFERENCES (Should migrate to Sanity)\n');
    const localArray = Array.from(codebaseImages.local);
    
    localArray.forEach(url => {
      console.log(`  🔴 ${url}`);
    });
    console.log();
    
    console.log(`  Action: Upload these ${localArray.length} images to Sanity\n`);
  }
  
  // External Images (Need Migration)
  if (codebaseImages.external.size > 0) {
    console.log('⚠️  EXTERNAL IMAGE URLs (Should migrate to Sanity)\n');
    const externalArray = Array.from(codebaseImages.external);
    
    externalArray.forEach(url => {
      if (!url.includes('cdn.sanity.io')) {
        console.log(`  🔴 ${url}`);
      }
    });
    console.log();
    
    console.log(`  Action: Download and upload to Sanity\n`);
  }
  
  // Local Files Not Referenced
  const referencedLocal = new Set(
    Array.from(codebaseImages.local).map(url => url.replace(/^\//, ''))
  );
  
  const unreferencedFiles = localImages.filter(img => {
    const path = img.path.replace(/^\//, '');
    return !referencedLocal.has(path);
  });
  
  if (unreferencedFiles.length > 0) {
    console.log('🗑️  LOCAL FILES NOT REFERENCED IN CODE\n');
    console.log(`  Found ${unreferencedFiles.length} unreferenced files\n`);
    
    if (unreferencedFiles.length <= 20) {
      unreferencedFiles.forEach(img => {
        console.log(`  - ${img.path} (${(img.size / 1024).toFixed(1)} KB)`);
      });
      console.log();
    }
    
    console.log(`  Action: Review and delete or upload to Sanity\n`);
  }
  
  // Recommendations
  console.log('💡 RECOMMENDATIONS\n');
  
  const issues = [];
  
  if (codebaseImages.local.size > 0) {
    issues.push({
      priority: 'HIGH',
      issue: `${codebaseImages.local.size} local image references`,
      action: 'Upload to Sanity and update references',
      impact: 'Performance, CDN optimization, easier management',
    });
  }
  
  if (codebaseImages.external.size > 0) {
    const nonSanity = Array.from(codebaseImages.external).filter(
      url => !url.includes('cdn.sanity.io')
    );
    if (nonSanity.length > 0) {
      issues.push({
        priority: 'MEDIUM',
        issue: `${nonSanity.length} external image URLs`,
        action: 'Download and upload to Sanity',
        impact: 'Control, reliability, optimization',
      });
    }
  }
  
  if (unreferencedFiles.length > 0) {
    issues.push({
      priority: 'LOW',
      issue: `${unreferencedFiles.length} unreferenced local files`,
      action: 'Clean up or migrate to Sanity',
      impact: 'Reduce bundle size, cleaner codebase',
    });
  }
  
  if (issues.length === 0) {
    console.log('  ✅ All images are in Sanity CDN - Perfect!\n');
  } else {
    issues.forEach((issue, i) => {
      console.log(`  ${i + 1}. [${issue.priority}] ${issue.issue}`);
      console.log(`     Action: ${issue.action}`);
      console.log(`     Impact: ${issue.impact}\n`);
    });
  }
  
  console.log('='.repeat(80) + '\n');
}

async function main() {
  try {
    const [codebaseResult, sanityImages, localImages] = await Promise.all([
      scanCodebase(),
      scanSanityImages(),
      scanLocalImages(),
    ]);
    
    const { imagesByType, fileReferences } = codebaseResult;
    
    generateReport(imagesByType, sanityImages, localImages);
    
    // Save detailed report
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        sanityReferences: imagesByType.sanity.size,
        localReferences: imagesByType.local.size,
        externalReferences: imagesByType.external.size,
        sanityAssets: sanityImages.length,
        localFiles: localImages.length,
      },
      images: {
        sanity: Array.from(imagesByType.sanity),
        local: Array.from(imagesByType.local),
        external: Array.from(imagesByType.external),
      },
      sanityAssets: sanityImages,
      localFiles: localImages,
    };
    
    const { writeFile, mkdir } = await import('node:fs/promises');
    await mkdir(join(FRONTEND_ROOT, 'tmp'), { recursive: true });
    await writeFile(
      join(FRONTEND_ROOT, 'tmp', 'image-audit-report.json'),
      JSON.stringify(report, null, 2)
    );
    
    console.log('📄 Detailed report saved to: tmp/image-audit-report.json\n');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

main();
