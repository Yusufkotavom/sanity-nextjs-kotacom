#!/usr/bin/env node

/**
 * Update Sanity project documents with unique illustrations
 * Task 2.2: Home Pepar UI/UX Improvements
 * 
 * This script assigns unique illustrations from the kotacom-split-production-ready
 * asset library to portfolio projects that currently have duplicate images.
 */

import { createClient } from '@sanity/client';
import { createReadStream } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN,
});

/**
 * Project ID to illustration mapping based on audit results
 * Maps each project to a UNIQUE illustration from the asset library
 * 
 * Strategy: Assign contextually relevant and UNIQUE illustrations
 * Ensuring no two projects share the same image
 * 
 * Available website illustrations (9 total):
 * - service-website-hotel-shark.png
 * - service-website-klinik-shark.png
 * - service-website-konstruksi-shark.png
 * - service-website-ngo-shark.png
 * - service-website-personal-brand-shark.png
 * - service-website-properti-shark.png
 * - service-website-restoran-shark.png
 * - service-website-sekolah-shark.png
 * - service-website-toko-online-shark.png
 * 
 * Available IT illustrations (4 total):
 * - service-it-support-shark.png
 * - service-software-custom-shark.png
 * - service-website-development-shark.png
 * - service-wordpress-migration-shark.png
 */
const PROJECT_IMAGE_MAPPING = {
  // Duplicate Group 1 (8 projects) - Each gets a UNIQUE illustration
  'project-astro-fashion-retail-pos-system': 'service-website-toko-online-shark.png',
  'project-astro-it-infrastructure-upgrade': 'service-it-support-shark.png',
  'project-astro-klinik-management-system': 'service-website-klinik-shark.png',
  'project-astro-law-firm-case-management': 'service-software-custom-shark.png',
  'project-astro-library-management-system': 'service-website-sekolah-shark.png',
  'project-astro-manufacturing-production-system': 'service-website-konstruksi-shark.png',
  'project-astro-sistem-informasi-sekolah': 'service-website-development-shark.png', // IT folder
  'project-astro-village-administration-system': 'service-website-ngo-shark.png',
  
  // Duplicate Group 2 (3 projects) - Each gets a UNIQUE illustration
  'project-it-infrastructure-upgrade-cv-maju-bersama': 'service-wordpress-migration-shark.png',
  'project-astro-cooperative-management-system-surabaya': 'service-website-properti-shark.png',
  'project-astro-pharmacy-management-system': 'service-website-hotel-shark.png',
  
  // Duplicate Group 3 (2 projects) - Each gets a UNIQUE illustration
  'project-fashion-retail-pos-system-butik-cantik': 'service-website-personal-brand-shark.png',
  'project-astro-restaurant-management-system': 'service-website-restoran-shark.png',
};

/**
 * Map illustration filename to full path in the public directory
 */
function getIllustrationPath(filename) {
  // IT folder illustrations
  if (filename.startsWith('service-it-') || 
      filename.startsWith('service-software-') || 
      filename.startsWith('service-website-development-') ||
      filename.startsWith('service-wordpress-')) {
    return path.join(__dirname, '../public/images/kotacom-split-production-ready/services/it', filename);
  }
  // Website folder illustrations
  else if (filename.startsWith('service-website-')) {
    return path.join(__dirname, '../public/images/kotacom-split-production-ready/services/website', filename);
  }
  // Printing folder illustrations
  else if (filename.startsWith('service-cetak-') || 
           filename.startsWith('service-banner-') ||
           filename.startsWith('service-finishing-') ||
           filename.startsWith('service-kalender-') ||
           filename.startsWith('service-kartu-') ||
           filename.startsWith('service-stiker-') ||
           filename.startsWith('service-undangan-')) {
    return path.join(__dirname, '../public/images/kotacom-split-production-ready/services/printing', filename);
  }
  throw new Error(`Unknown illustration category for: ${filename}`);
}

/**
 * Upload an image to Sanity and return the asset reference
 */
async function uploadImage(filePath, filename) {
  console.log(`   📤 Uploading ${filename}...`);
  
  try {
    const asset = await client.assets.upload('image', createReadStream(filePath), {
      filename: filename,
    });
    
    console.log(`   ✅ Uploaded: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error(`   ❌ Upload failed: ${error.message}`);
    throw error;
  }
}

/**
 * Update a project document with a new image reference
 */
async function updateProjectImage(projectId, assetId, altText) {
  console.log(`   🔄 Updating project ${projectId}...`);
  
  try {
    await client
      .patch(projectId)
      .set({
        image: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: assetId,
          },
          alt: altText,
        },
      })
      .commit();
    
    console.log(`   ✅ Project updated successfully`);
  } catch (error) {
    console.error(`   ❌ Update failed: ${error.message}`);
    throw error;
  }
}

/**
 * Generate appropriate alt text based on project title and type
 */
function generateAltText(projectTitle, illustrationFilename) {
  // Extract service type from filename
  let serviceType = 'IT services';
  if (illustrationFilename.includes('software')) {
    serviceType = 'Custom software development';
  } else if (illustrationFilename.includes('it-support')) {
    serviceType = 'IT infrastructure support';
  } else if (illustrationFilename.includes('website')) {
    serviceType = 'Website development';
  } else if (illustrationFilename.includes('cetak')) {
    serviceType = 'Printing services';
  }
  
  return `${serviceType} illustration for ${projectTitle}`;
}

/**
 * Main execution function
 */
async function updateProjectImages() {
  console.log('🚀 Starting project image update process...\n');
  console.log(`📊 Projects to update: ${Object.keys(PROJECT_IMAGE_MAPPING).length}\n`);
  
  // First, fetch all projects to get their titles
  const query = `*[_type == "project" && _id in $ids] {
    _id,
    title,
    image {
      asset->{
        _id,
        url
      }
    }
  }`;
  
  const projectIds = Object.keys(PROJECT_IMAGE_MAPPING);
  const projects = await client.fetch(query, { ids: projectIds });
  
  console.log(`✅ Found ${projects.length} projects in Sanity\n`);
  
  // Track uploaded assets to avoid duplicate uploads
  const uploadedAssets = new Map();
  
  let successCount = 0;
  let skipCount = 0;
  let errorCount = 0;
  
  for (const project of projects) {
    console.log(`\n${'='.repeat(80)}`);
    console.log(`📦 Processing: ${project.title}`);
    console.log(`   ID: ${project._id}`);
    
    const illustrationFilename = PROJECT_IMAGE_MAPPING[project._id];
    
    if (!illustrationFilename) {
      console.log(`   ⚠️  No mapping found, skipping...`);
      skipCount++;
      continue;
    }
    
    console.log(`   🎨 Target illustration: ${illustrationFilename}`);
    
    try {
      // Check if we've already uploaded this asset
      let assetId;
      if (uploadedAssets.has(illustrationFilename)) {
        assetId = uploadedAssets.get(illustrationFilename);
        console.log(`   ♻️  Reusing previously uploaded asset: ${assetId}`);
      } else {
        // Upload the illustration
        const illustrationPath = getIllustrationPath(illustrationFilename);
        assetId = await uploadImage(illustrationPath, illustrationFilename);
        uploadedAssets.set(illustrationFilename, assetId);
      }
      
      // Generate alt text
      const altText = generateAltText(project.title, illustrationFilename);
      console.log(`   📝 Alt text: "${altText}"`);
      
      // Update the project
      await updateProjectImage(project._id, assetId, altText);
      
      successCount++;
    } catch (error) {
      console.error(`   ❌ Error processing project: ${error.message}`);
      errorCount++;
    }
  }
  
  // Summary
  console.log(`\n\n${'='.repeat(80)}`);
  console.log('📋 UPDATE SUMMARY');
  console.log('='.repeat(80));
  console.log(`✅ Successfully updated: ${successCount}`);
  console.log(`⚠️  Skipped: ${skipCount}`);
  console.log(`❌ Errors: ${errorCount}`);
  console.log(`📤 Unique assets uploaded: ${uploadedAssets.size}`);
  
  if (successCount > 0) {
    console.log('\n✨ Project images have been updated successfully!');
    console.log('🔍 Verify the changes in Sanity Studio or run the audit script again.');
  }
  
  console.log('\n');
}

// Run the update
updateProjectImages().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
