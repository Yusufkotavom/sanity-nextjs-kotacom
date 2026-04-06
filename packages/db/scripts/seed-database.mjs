#!/usr/bin/env node

/**
 * Database Seed Script
 * 
 * Seeds the database with initial/test data for development.
 * 
 * Usage:
 *   node scripts/seed-database.mjs
 *   node scripts/seed-database.mjs --clear  # Clear existing data first
 */

import postgres from 'postgres';

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  red: '\x1b[31m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function main() {
  const args = process.argv.slice(2);
  const shouldClear = args.includes('--clear');

  if (!process.env.DATABASE_URL) {
    log('✗ DATABASE_URL environment variable is not set', 'red');
    process.exit(1);
  }

  const sql = postgres(process.env.DATABASE_URL);

  try {
    log('\n╔════════════════════════════════════════╗', 'cyan');
    log('║   Database Seed Script                 ║', 'cyan');
    log('╚════════════════════════════════════════╝', 'cyan');

    if (shouldClear) {
      log('\n[1/2] Clearing existing data...', 'yellow');
      
      await sql`TRUNCATE TABLE ai_generations CASCADE`;
      await sql`TRUNCATE TABLE analytics_daily CASCADE`;
      await sql`TRUNCATE TABLE content_items CASCADE`;
      await sql`TRUNCATE TABLE index_status_checks CASCADE`;
      await sql`TRUNCATE TABLE job_runs CASCADE`;
      await sql`TRUNCATE TABLE scheduled_tasks CASCADE`;
      await sql`TRUNCATE TABLE search_submissions CASCADE`;
      await sql`TRUNCATE TABLE seo_audits CASCADE`;
      
      log('✓ All tables cleared', 'green');
    }

    log('\n[2/2] Seeding data...', 'cyan');

    // Seed content_items
    const contentItems = await sql`
      INSERT INTO content_items (sanity_id, document_type, slug, url, title, published_at)
      VALUES 
        ('page-1', 'page', 'test-page-1', 'https://example.com/test-page-1', 'Test Page 1', NOW()),
        ('page-2', 'page', 'test-page-2', 'https://example.com/test-page-2', 'Test Page 2', NOW()),
        ('post-1', 'post', 'test-post-1', 'https://example.com/blog/test-post-1', 'Test Post 1', NOW())
      ON CONFLICT (sanity_id) DO NOTHING
      RETURNING id
    `;
    log(`  ✓ Seeded ${contentItems.length} content items`, 'green');

    // Seed scheduled_tasks
    const tasks = await sql`
      INSERT INTO scheduled_tasks (task_type, name, cron_expr, enabled, payload)
      VALUES 
        ('seo_audit', 'Daily SEO Audit', '0 2 * * *', true, '{}'::jsonb),
        ('sitemap_submit', 'Daily Sitemap Submit', '0 3 * * *', true, '{}'::jsonb),
        ('analytics_pull', 'Daily Analytics Pull', '0 4 * * *', true, '{}'::jsonb),
        ('index_check', 'Index Status Check', '0 */6 * * *', true, '{}'::jsonb)
      ON CONFLICT DO NOTHING
      RETURNING id
    `;
    log(`  ✓ Seeded ${tasks.length} scheduled tasks`, 'green');

    // Seed job_runs (examples)
    const jobs = await sql`
      INSERT INTO job_runs (job_type, status, attempt, payload)
      VALUES 
        ('seo_audit', 'completed', 1, '{"url": "https://example.com/test-page-1"}'::jsonb),
        ('sitemap_submit', 'completed', 1, '{"sitemap_url": "https://example.com/sitemap.xml"}'::jsonb),
        ('analytics_pull', 'pending', 0, '{}'::jsonb)
      RETURNING id
    `;
    log(`  ✓ Seeded ${jobs.length} job runs`, 'green');

    // Get content item IDs for foreign keys
    const [item1] = await sql`SELECT id FROM content_items WHERE sanity_id = 'page-1' LIMIT 1`;
    const [item2] = await sql`SELECT id FROM content_items WHERE sanity_id = 'page-2' LIMIT 1`;

    if (item1 && item2) {
      // Seed seo_audits
      const audits = await sql`
        INSERT INTO seo_audits (content_item_id, status, score, issues, checked_at)
        VALUES 
          (${item1.id}, 'pass', 95, '[]'::jsonb, NOW()),
          (${item2.id}, 'warning', 75, '[{"type": "missing_meta_description"}]'::jsonb, NOW())
        RETURNING id
      `;
      log(`  ✓ Seeded ${audits.length} SEO audits`, 'green');
    }

    log('\n╔════════════════════════════════════════╗', 'green');
    log('║   ✓ Database seeded successfully!      ║', 'green');
    log('╚════════════════════════════════════════╝', 'green');
    log('');

    await sql.end();
  } catch (error) {
    log(`\n✗ Seed failed: ${error.message}`, 'red');
    await sql.end();
    process.exit(1);
  }
}

main();
