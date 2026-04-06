#!/usr/bin/env node

/**
 * Database Setup Script
 * 
 * This script sets up the complete database infrastructure:
 * 1. Validates DATABASE_URL environment variable
 * 2. Tests database connection
 * 3. Generates migrations from schema
 * 4. Runs migrations to create/update tables
 * 5. Verifies all tables exist
 * 
 * Usage:
 *   node scripts/setup-database.mjs
 *   node scripts/setup-database.mjs --force  # Force regenerate migrations
 */

import { execSync } from 'child_process';
import { existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import postgres from 'postgres';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = resolve(__dirname, '..');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function logStep(step, message) {
  log(`\n[${step}] ${message}`, 'cyan');
}

function logSuccess(message) {
  log(`✓ ${message}`, 'green');
}

function logError(message) {
  log(`✗ ${message}`, 'red');
}

function logWarning(message) {
  log(`⚠ ${message}`, 'yellow');
}

// Expected tables from schema
const EXPECTED_TABLES = [
  'ai_generations',
  'analytics_daily',
  'content_items',
  'index_status_checks',
  'job_runs',
  'scheduled_tasks',
  'search_submissions',
  'seo_audits',
];

async function validateEnvironment() {
  logStep('1/5', 'Validating environment');
  
  if (!process.env.DATABASE_URL) {
    logError('DATABASE_URL environment variable is not set');
    log('\nPlease set DATABASE_URL in your environment:', 'yellow');
    log('  export DATABASE_URL="postgresql://user:pass@host:port/db"', 'yellow');
    log('  or add it to packages/db/.env', 'yellow');
    process.exit(1);
  }
  
  logSuccess('DATABASE_URL is set');
  
  // Mask password in URL for logging
  const maskedUrl = process.env.DATABASE_URL.replace(
    /(:\/\/[^:]+:)([^@]+)(@)/,
    '$1****$3'
  );
  log(`  ${maskedUrl}`, 'blue');
}

async function testConnection() {
  logStep('2/5', 'Testing database connection');
  
  let sql;
  try {
    sql = postgres(process.env.DATABASE_URL, {
      max: 1,
      idle_timeout: 5,
      connect_timeout: 10,
    });
    
    const result = await sql`SELECT version()`;
    logSuccess('Database connection successful');
    log(`  PostgreSQL version: ${result[0].version.split(' ')[1]}`, 'blue');
    
    await sql.end();
  } catch (error) {
    logError('Failed to connect to database');
    log(`  ${error.message}`, 'red');
    process.exit(1);
  }
}

async function generateMigrations(force = false) {
  logStep('3/5', 'Generating migrations');
  
  const migrationsDir = resolve(rootDir, 'migrations');
  
  if (existsSync(migrationsDir) && !force) {
    logWarning('Migrations directory already exists');
    log('  Use --force to regenerate migrations', 'yellow');
    return;
  }
  
  try {
    execSync('pnpm drizzle:generate', {
      cwd: rootDir,
      stdio: 'inherit',
      env: { ...process.env },
    });
    logSuccess('Migrations generated successfully');
  } catch (error) {
    logError('Failed to generate migrations');
    process.exit(1);
  }
}

async function runMigrations() {
  logStep('4/5', 'Running migrations');
  
  try {
    execSync('pnpm drizzle:migrate', {
      cwd: rootDir,
      stdio: 'inherit',
      env: { ...process.env },
    });
    logSuccess('Migrations executed successfully');
  } catch (error) {
    logError('Failed to run migrations');
    process.exit(1);
  }
}

async function verifyTables() {
  logStep('5/5', 'Verifying tables');
  
  const sql = postgres(process.env.DATABASE_URL, {
    max: 1,
    idle_timeout: 5,
    connect_timeout: 10,
  });
  
  try {
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;
    
    const tableNames = tables.map(t => t.table_name);
    
    log('\nFound tables:', 'cyan');
    tableNames.forEach(name => {
      const isExpected = EXPECTED_TABLES.includes(name);
      if (isExpected) {
        log(`  ✓ ${name}`, 'green');
      } else {
        log(`  • ${name}`, 'blue');
      }
    });
    
    // Check for missing tables
    const missingTables = EXPECTED_TABLES.filter(
      name => !tableNames.includes(name)
    );
    
    if (missingTables.length > 0) {
      logWarning(`\nMissing expected tables: ${missingTables.join(', ')}`);
      log('  Run migrations again or check schema.ts', 'yellow');
    } else {
      logSuccess('\nAll expected tables exist');
    }
    
    // Get table stats
    log('\nTable statistics:', 'cyan');
    for (const tableName of EXPECTED_TABLES) {
      if (tableNames.includes(tableName)) {
        const [{ count }] = await sql`
          SELECT COUNT(*) as count FROM ${sql(tableName)}
        `;
        log(`  ${tableName}: ${count} rows`, 'blue');
      }
    }
    
    await sql.end();
  } catch (error) {
    logError('Failed to verify tables');
    log(`  ${error.message}`, 'red');
    await sql.end();
    process.exit(1);
  }
}

async function main() {
  const args = process.argv.slice(2);
  const force = args.includes('--force');
  
  log('\n╔════════════════════════════════════════╗', 'bright');
  log('║   Database Setup Script                ║', 'bright');
  log('╚════════════════════════════════════════╝', 'bright');
  
  try {
    await validateEnvironment();
    await testConnection();
    await generateMigrations(force);
    await runMigrations();
    await verifyTables();
    
    log('\n╔════════════════════════════════════════╗', 'green');
    log('║   ✓ Database setup completed!          ║', 'green');
    log('╚════════════════════════════════════════╝', 'green');
    log('');
  } catch (error) {
    log('\n╔════════════════════════════════════════╗', 'red');
    log('║   ✗ Database setup failed              ║', 'red');
    log('╚════════════════════════════════════════╝', 'red');
    log('');
    process.exit(1);
  }
}

main();
