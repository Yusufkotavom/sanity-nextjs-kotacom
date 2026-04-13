import postgres from 'postgres';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sql = postgres(databaseUrl);

async function checkAndApplyMigration() {
  try {
    // Check if schedule_type column exists
    const result = await sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'scheduled_tasks' 
      AND column_name = 'schedule_type'
    `;

    if (result.length > 0) {
      console.log('✓ schedule_type column already exists');
      await sql.end();
      return;
    }

    console.log('✗ schedule_type column does not exist, applying migration...');

    // Read and apply migration
    const migrationPath = join(__dirname, '..', 'migrations', '0003_aromatic_captain_cross.sql');
    const migrationSql = readFileSync(migrationPath, 'utf-8');

    // Remove comments and split by statement breakpoint
    const lines = migrationSql.split('\n');
    let currentStatement = '';
    const statements = [];

    for (const line of lines) {
      // Skip comment-only lines
      if (line.trim().startsWith('--') && !line.includes('statement-breakpoint')) {
        continue;
      }

      // Check if line contains statement breakpoint
      if (line.includes('--> statement-breakpoint')) {
        // Extract SQL before the breakpoint
        const sqlPart = line.split('-->')[0].trim();
        if (sqlPart) {
          currentStatement += ' ' + sqlPart;
        }
        
        // Save current statement if it's not empty
        if (currentStatement.trim()) {
          statements.push(currentStatement.trim());
          currentStatement = '';
        }
      } else {
        currentStatement += ' ' + line;
      }
    }

    // Add last statement if any
    if (currentStatement.trim()) {
      statements.push(currentStatement.trim());
    }

    console.log(`Found ${statements.length} statements to execute`);

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      try {
        console.log(`\n[${i + 1}/${statements.length}] Executing:`, statement.substring(0, 80) + '...');
        await sql.unsafe(statement);
        console.log('✓ Executed successfully');
      } catch (error) {
        // Ignore errors for already existing objects
        if (error.code === '42710' || error.code === '42P07' || error.code === '42P06') {
          console.log('⚠ Object already exists, skipping');
        } else {
          console.error('✗ Error executing statement:', error.message);
          console.error('   Code:', error.code);
          throw error;
        }
      }
    }

    console.log('✓ Migration applied successfully');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

checkAndApplyMigration();
