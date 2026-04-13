import postgres from 'postgres';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('DATABASE_URL environment variable is not set');
  process.exit(1);
}

const sql = postgres(databaseUrl);

async function verifyColumn() {
  try {
    // Check if schedule_type column exists
    const result = await sql`
      SELECT column_name, data_type, column_default
      FROM information_schema.columns 
      WHERE table_name = 'scheduled_tasks' 
      AND column_name = 'schedule_type'
    `;

    if (result.length > 0) {
      console.log('✓ schedule_type column exists:');
      console.log('  Column:', result[0].column_name);
      console.log('  Type:', result[0].data_type);
      console.log('  Default:', result[0].column_default);
    } else {
      console.log('✗ schedule_type column does not exist');
    }

    // Also check the enum type
    const enumResult = await sql`
      SELECT enumlabel 
      FROM pg_enum 
      JOIN pg_type ON pg_enum.enumtypid = pg_type.oid 
      WHERE pg_type.typname = 'schedule_type'
    `;

    if (enumResult.length > 0) {
      console.log('\n✓ schedule_type enum exists with values:');
      enumResult.forEach(row => console.log('  -', row.enumlabel));
    } else {
      console.log('\n✗ schedule_type enum does not exist');
    }

    // Test a simple query
    const testResult = await sql`
      SELECT id, name, schedule_type 
      FROM scheduled_tasks 
      LIMIT 1
    `;

    console.log('\n✓ Query test successful');
    if (testResult.length > 0) {
      console.log('  Sample row:', testResult[0]);
    } else {
      console.log('  No rows in table');
    }

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

verifyColumn();
