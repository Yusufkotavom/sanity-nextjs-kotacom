#!/usr/bin/env node

/**
 * Audit Sanity project documents for duplicate or missing images
 * Task 2.1: Home Pepar UI/UX Improvements
 */

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN,
});

async function auditProjectImages() {
  console.log('🔍 Auditing Sanity project documents...\n');

  // Query all projects with their images
  const query = `*[_type == "project" && defined(slug)] | order(featured desc, _createdAt desc) {
    _id,
    title,
    slug,
    clientName,
    industry,
    completionYear,
    featured,
    categories[]->{
      title
    },
    image {
      asset->{
        _id,
        url
      },
      alt
    }
  }`;

  const projects = await client.fetch(query);

  console.log(`📊 Total projects found: ${projects.length}\n`);

  // Track image URLs to detect duplicates
  const imageUrlMap = new Map();
  const missingImages = [];
  const projectTypes = new Map();

  projects.forEach((project, index) => {
    const projectNum = index + 1;
    console.log(`\n${projectNum}. ${project.title || 'Untitled'}`);
    console.log(`   ID: ${project._id}`);
    console.log(`   Slug: ${project.slug?.current || 'N/A'}`);
    console.log(`   Client: ${project.clientName || 'N/A'}`);
    console.log(`   Industry: ${project.industry || 'N/A'}`);
    console.log(`   Year: ${project.completionYear || 'N/A'}`);
    console.log(`   Featured: ${project.featured ? 'Yes' : 'No'}`);
    
    // Determine project type based on categories and industry
    const categories = project.categories?.map(c => c.title).join(', ') || 'N/A';
    console.log(`   Categories: ${categories}`);
    
    let projectType = 'unknown';
    const categoryStr = categories.toLowerCase();
    const industryStr = (project.industry || '').toLowerCase();
    
    if (categoryStr.includes('website') || categoryStr.includes('web')) {
      projectType = 'website';
    } else if (categoryStr.includes('software') || categoryStr.includes('pos') || categoryStr.includes('sistem')) {
      projectType = 'software';
    } else if (categoryStr.includes('print') || categoryStr.includes('cetak') || industryStr.includes('print')) {
      projectType = 'printing';
    } else if (categoryStr.includes('support') || categoryStr.includes('it')) {
      projectType = 'support';
    }
    
    console.log(`   Project Type: ${projectType}`);
    projectTypes.set(project._id, projectType);

    // Check image
    if (!project.image?.asset?._id) {
      console.log(`   ⚠️  Image: MISSING`);
      missingImages.push({
        id: project._id,
        title: project.title,
        slug: project.slug?.current,
        projectType,
      });
    } else {
      const imageUrl = project.image.asset.url;
      const imageId = project.image.asset._id;
      console.log(`   ✅ Image: ${imageId}`);
      console.log(`      Alt: ${project.image.alt || 'N/A'}`);
      console.log(`      URL: ${imageUrl}`);

      // Track for duplicates
      if (imageUrlMap.has(imageUrl)) {
        imageUrlMap.get(imageUrl).push({
          id: project._id,
          title: project.title,
          projectType,
        });
      } else {
        imageUrlMap.set(imageUrl, [{
          id: project._id,
          title: project.title,
          projectType,
        }]);
      }
    }
  });

  // Find duplicates
  const duplicates = [];
  imageUrlMap.forEach((projects, url) => {
    if (projects.length > 1) {
      duplicates.push({ url, projects });
    }
  });

  // Summary report
  console.log('\n\n' + '='.repeat(80));
  console.log('📋 AUDIT SUMMARY');
  console.log('='.repeat(80));

  console.log(`\n✅ Total projects: ${projects.length}`);
  console.log(`⚠️  Projects with missing images: ${missingImages.length}`);
  console.log(`🔄 Duplicate image groups: ${duplicates.length}`);

  // Project type breakdown
  console.log('\n📊 Project Type Breakdown:');
  const typeCount = {};
  projectTypes.forEach((type) => {
    typeCount[type] = (typeCount[type] || 0) + 1;
  });
  Object.entries(typeCount).forEach(([type, count]) => {
    console.log(`   ${type}: ${count}`);
  });

  if (missingImages.length > 0) {
    console.log('\n⚠️  PROJECTS WITH MISSING IMAGES:');
    missingImages.forEach((proj, i) => {
      console.log(`\n${i + 1}. ${proj.title}`);
      console.log(`   ID: ${proj.id}`);
      console.log(`   Slug: ${proj.slug}`);
      console.log(`   Type: ${proj.projectType}`);
    });
  }

  if (duplicates.length > 0) {
    console.log('\n🔄 DUPLICATE IMAGES:');
    duplicates.forEach((dup, i) => {
      console.log(`\n${i + 1}. Image URL: ${dup.url}`);
      console.log(`   Used by ${dup.projects.length} projects:`);
      dup.projects.forEach((proj, j) => {
        console.log(`   ${j + 1}. ${proj.title} (${proj.projectType})`);
        console.log(`      ID: ${proj.id}`);
      });
    });
  }

  // Recommendations
  console.log('\n\n' + '='.repeat(80));
  console.log('💡 RECOMMENDATIONS');
  console.log('='.repeat(80));

  if (missingImages.length > 0) {
    console.log('\n1. Assign unique images to projects with missing thumbnails:');
    missingImages.forEach((proj) => {
      const assetPath = getRecommendedAssetPath(proj.projectType);
      console.log(`   - ${proj.title}: ${assetPath}`);
    });
  }

  if (duplicates.length > 0) {
    console.log('\n2. Replace duplicate images with unique alternatives:');
    duplicates.forEach((dup) => {
      dup.projects.forEach((proj, i) => {
        if (i > 0) { // Keep first, suggest alternatives for others
          const assetPath = getRecommendedAssetPath(proj.projectType);
          console.log(`   - ${proj.title}: ${assetPath}`);
        }
      });
    });
  }

  console.log('\n');
}

function getRecommendedAssetPath(projectType) {
  const assetMap = {
    website: '/images/kotacom-split-production-ready/services/website/website-dev-*.png',
    software: '/images/kotacom-split-production-ready/services/it/it-support-*.png',
    printing: '/images/kotacom-split-production-ready/services/printing/printing-*.png',
    support: '/images/kotacom-split-production-ready/services/it/it-support-*.png',
    unknown: '/images/kotacom-split-production-ready/services/website/website-dev-*.png',
  };
  return assetMap[projectType] || assetMap.unknown;
}

// Run the audit
auditProjectImages().catch((err) => {
  console.error('❌ Error:', err);
  process.exit(1);
});
