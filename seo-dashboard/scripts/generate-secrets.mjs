#!/usr/bin/env node

/**
 * Generate secure secrets for production deployment
 * 
 * Usage:
 *   node scripts/generate-secrets.mjs
 */

import crypto from 'crypto';

function generateSecret(length = 32) {
  return crypto.randomBytes(length).toString('hex');
}

function generateSHA256(input) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

console.log('='.repeat(60));
console.log('SEO Dashboard - Production Secrets Generator');
console.log('='.repeat(60));
console.log('');

console.log('Copy these to your production environment variables:');
console.log('');

// Generate secrets
const cronSecret = generateSecret(32);
const internalApiSecret = generateSecret(32);
const revalidateSecret = generateSecret(32);
const sessionSecret = generateSecret(32);
const encryptionKey = generateSecret(32);

// Dashboard password (you can change this)
const dashboardPassword = 'kotacom';
const passwordHash = generateSHA256(dashboardPassword);

console.log('# Internal API Secrets');
console.log(`CRON_SECRET=${cronSecret}`);
console.log(`INTERNAL_API_SECRET=${internalApiSecret}`);
console.log(`REVALIDATE_SECRET=${revalidateSecret}`);
console.log('');

console.log('# Dashboard Auth');
console.log(`SEO_SESSION_SECRET=${sessionSecret}`);
console.log(`SEO_DASHBOARD_PASSWORD=${dashboardPassword}`);
console.log(`SEO_DASHBOARD_PASSWORD_SHA256=${passwordHash}`);
console.log(`SEO_SETTINGS_ENCRYPTION_KEY=${encryptionKey}`);
console.log('');

console.log('# IndexNow Key (optional)');
const indexNowKey = generateSecret(32);
console.log(`INDEXNOW_KEY=${indexNowKey}`);
console.log('');

console.log('='.repeat(60));
console.log('IMPORTANT: Save these secrets securely!');
console.log('='.repeat(60));
console.log('');

console.log('Next steps:');
console.log('1. Add these to Vercel environment variables (seo-dashboard)');
console.log('2. Add CRON_SECRET to Cloudflare Worker secrets');
console.log('3. Add INTERNAL_API_SECRET to Sanity webhook headers');
console.log('4. Create indexnow-key.txt in frontend/public/ with INDEXNOW_KEY');
console.log('');

console.log('Cloudflare Worker commands:');
console.log(`  wrangler secret put CRON_SECRET`);
console.log(`  # Enter: ${cronSecret}`);
console.log('');

console.log('Sanity Webhook header:');
console.log(`  x-internal-secret: ${internalApiSecret}`);
console.log('');
