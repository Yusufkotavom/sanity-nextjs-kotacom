#!/usr/bin/env node

import { createClient } from '@sanity/client'
import { readFileSync } from 'fs'
import { join } from 'path'

// Load environment variables from .env file
const envPath = join(process.cwd(), '.env')
const envContent = readFileSync(envPath, 'utf8')
const envVars = {}

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=')
  if (key && valueParts.length > 0) {
    envVars[key.trim()] = valueParts.join('=').trim()
  }
})

// Set environment variables
Object.assign(process.env, envVars)

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
  token: process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN,
  useCdn: false
})

// Documents that failed to delete due to references
const referencedDocuments = [
  'post-5-alasan-utama-kenapa-sewa-laptop-untuk-acara-kantor-lebih-untung',
  '20353898-4a0e-48c3-a0af-b73b29af1d07',
  'category-astro-software',
  'post-jasa-it-support-surabaya-terpercaya',
  'c4c68bce-db20-4d8e-9ac5-3b7765d6e255',
  'd03aca9b-54e3-4b5f-b046-ebdb78f42946',
  'ee253f04-bec1-443e-93f4-8ec0f8a3ba7d'
]

async function handleReferencedDocuments() {
  console.log(`Processing ${referencedDocuments.length} referenced documents...`)
  
  for (const docId of referencedDocuments) {
    try {
      console.log(`\n--- Processing document: ${docId} ---`)
      
      // Find documents that reference this document
      const referencingDocs = await client.fetch(
        `*[references($docId)]{ _id, _type, title }`,
        { docId }
      )

      console.log(`Found ${referencingDocs.length} documents referencing ${docId}:`)
      referencingDocs.forEach(doc => {
        console.log(`  - ${doc._type}: ${doc.title || doc._id}`)
      })

      if (referencingDocs.length > 0) {
        console.log(`⚠️  Cannot safely delete ${docId} - has ${referencingDocs.length} references`)
        console.log(`   You may need to manually review and remove these references first.`)
      } else {
        // Try to delete if no references found
        try {
          await client.delete(docId)
          console.log(`✅ Successfully deleted ${docId}`)
        } catch (deleteError) {
          console.error(`❌ Error deleting ${docId}:`, deleteError.message)
        }
      }

    } catch (error) {
      console.error(`❌ Error processing ${docId}:`, error.message)
    }
  }

  console.log('\n=== REFERENCED DOCUMENTS SUMMARY ===')
  console.log('Some documents could not be deleted due to references.')
  console.log('You may need to manually review and clean up these references in Sanity Studio.')
}

// Run the process
handleReferencedDocuments().catch(console.error)