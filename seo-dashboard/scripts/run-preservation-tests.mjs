#!/usr/bin/env node

/**
 * Script to run preservation property tests for schedule system clarity fix
 * 
 * These tests validate that existing "AI Generation + Auto-Publish" behavior
 * remains unchanged after the fix is implemented.
 * 
 * Usage:
 *   node scripts/run-preservation-tests.mjs
 *   npm run test:preservation
 */

import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');

console.log('🧪 Running Preservation Property Tests\n');
console.log('These tests validate that existing schedule behavior is preserved.\n');

const testFile = resolve(projectRoot, 'lib/ai-writer/__tests__/schedule-system-preservation.test.ts');

const child = spawn('npx', ['tsx', testFile], {
  cwd: projectRoot,
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  if (code === 0) {
    console.log('\n✅ All preservation tests passed!');
    console.log('Baseline behavior confirmed - existing functionality works correctly.\n');
  } else {
    console.log('\n❌ Some preservation tests failed!');
    console.log('This indicates a regression in existing functionality.\n');
  }
  process.exit(code || 0);
});

child.on('error', (error) => {
  console.error('Failed to run tests:', error);
  process.exit(1);
});
