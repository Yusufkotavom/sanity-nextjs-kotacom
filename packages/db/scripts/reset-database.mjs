#!/usr/bin/env node

/**
 * Database Reset Script
 * 
 * Drops all tables and re-runs migrations from scratch.
 * WARNING: This will delete ALL data!
 * 
 * Usage:
 *   node scripts/reset-database.mjs
 *   node scripts/reset-database.mjs --yes  # Skip confirmation
 */

import { execSync } from 'child_process';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import postgres from 'postgres';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

async function confirm(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${colors.yellow}${question} (yes/no): ${colors.reset}`, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'yes');
    });
  });
}

async function dropAllTables() {
  log('\n[1/2] Dropping all tables...', 'cyan');
  
  const sql = postgres(process.env.DATABASE_URL);
  
  try {
    // Drop tables in reverse dependency order
    await sql`DROP TABLE IF EXISTS seo_audits CASCADE`;
    await sql`DROP TABLE IF EXISTS search_submissions CASCADE`;
    await sql`DROP TABLE IF EXISTS index_status_checks CASCADE`;
    await sql`DROP TABLE IF EXISTS analytics_daily CASCADE`;
    await sql`DROP TABLE IF EXISTS ai_generations CASCADE`;
    await sql`DROP TABLE IF EXISTS job_runs CASCADE`;
    await sql`DROP TABLE IF EXISTS scheduled_tasks CASCADE`;
    await sql`DROP TABLE IF EXISTS content_items CASCADE`;
    
    // Drop drizzle migrations table
    await sql`DROP TABLE IF EXISTS __drizzle_migrations CASCADE`;
    
    log('✓ All tables dropped', 'green');
    await sql.end();
  } catch (error) {
    log(`✗ Failed to drop tables: ${error.message}`, 'red');
    await sql.end();
    process.exit(1);
  }
}

async function runMigrations() {
  log('\n[2/2] Running migrations...', 'cyan');
  
  try {
    execSync('pnpm drizzle:migrate', {
      cwd: rootDir,
      stdio: 'inherit',
      env: { ...process.env },
    });
    log('✓ Migrations completed', 'green');
  } catch (error) {
    log('✗ Failed to run migrations', 'red');
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const skipConfirm = args.includes('--yes');

  log('\n╔════════════════════════════════════════╗', 'red');
  log('║   ⚠  DATABASE RESET SCRIPT  ⚠          ║', 'red');
  log('╚════════════════════════════════════════╝', 'red');
  log('\nThis will:', 'yellow');
  log('  1. Drop ALL tables', 'yellow');
  log('  2. Delete ALL data', 'yellow');
  log('  3. Re-run migrations', 'yellow');
  log('\nThis action CANNOT be undone!', 'red');

  if (!process.env.DATABASE_URL) {
    log('\n✗ DATABASE_URL environment variable is not set', 'red');
    process.exit(1);
  }

  // Mask password in URL for logging
  const maskedUrl = process.env.DATABASE_URL.replace(
    /(:\/\/[^:]+:)([^@]+)(@)/,
    '$1****$3'
  );
  log(`\nTarget database: ${maskedUrl}`, 'cyan');

  if (!skipConfirm) {
    const confirmed = await confirm('\nAre you sure you want to continue?');
    if (!confirmed) {
      log('\n✗ Reset cancelled', 'yellow');
      process.exit(0);
    }
  }

  try {
    await dropAllTables();
    await runMigrations();

    log('\n╔════════════════════════════════════════╗', 'green');
    log('║   ✓ Database reset completed!          ║', 'green');
    log('╚════════════════════════════════════════╝', 'green');
    log('');
  } catch (error) {
    log('\n╔════════════════════════════════════════╗', 'red');
    log('║   ✗ Database reset failed              ║', 'red');
    log('╚════════════════════════════════════════╝', 'red');
    log('');
    process.exit(1);
  }
}

main();
