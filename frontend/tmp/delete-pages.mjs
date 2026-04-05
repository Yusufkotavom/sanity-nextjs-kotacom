import { createClient } from '@sanity/client';
import "dotenv/config";

const token = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.error("No SANITY_DEV or SANITY_AUTH_TOKEN found in environment.");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_STUDIO_PROJECT_ID || 'b017f7tl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_STUDIO_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token
});

const urls = `
/jasa-cetak-buku-aceh-tengah
/jasa-cetak-buku-agam
/jasa-cetak-buku-asahan
/jasa-cetak-buku-balangan
/jasa-cetak-buku-banggai-laut
/jasa-cetak-buku-bangka
/jasa-cetak-buku-batam
/jasa-cetak-buku-bolaang-mongondow
/jasa-cetak-buku-bolaang-mongondow-selatan
/jasa-cetak-buku-bolaang-mongondow-utara
/jasa-cetak-buku-bontang
/jasa-cetak-buku-buru
/jasa-cetak-buku-buton
/jasa-cetak-buku-dompu
/jasa-cetak-buku-dumai
/jasa-cetak-buku-empat-lawang
/jasa-cetak-buku-halmahera-barat
/jasa-cetak-buku-halmahera-utara
/jasa-cetak-buku-hulu-sungai-selatan
/jasa-cetak-buku-jambi
/jasa-cetak-buku-jembrana
/jasa-cetak-buku-kaur
/jasa-cetak-buku-kayong-utara
/jasa-cetak-buku-kepulauan-aru
/jasa-cetak-buku-klungkung
/jasa-cetak-buku-kutai-kartanegara
/jasa-cetak-buku-lampung-utara
/jasa-cetak-buku-lhokseumawe
/jasa-cetak-buku-makassar
/jasa-cetak-buku-maluku-tengah
/jasa-cetak-buku-maluku-tenggara
/jasa-cetak-buku-mandailing-natal
/jasa-cetak-buku-minahasa-tenggara
/jasa-cetak-buku-mukomuko
/jasa-cetak-buku-murung-raya
/jasa-cetak-buku-nagan-raya
/jasa-cetak-buku-palopo
/jasa-cetak-buku-pariaman
/jasa-cetak-buku-payakumbuh
/jasa-cetak-buku-pematangsiantar
/jasa-cetak-buku-pesawaran
/jasa-cetak-buku-pulang-pisau
/jasa-cetak-buku-pulau-taliabu
/jasa-cetak-buku-puncak
/jasa-cetak-buku-sabu-raijua
/jasa-cetak-buku-solok-selatan
/jasa-cetak-buku-sumba-tengah
/jasa-cetak-buku-sumba-timur
/jasa-cetak-buku-tabanan
/jasa-cetak-buku-tanah-bumbu
/jasa-cetak-buku-tanah-laut
/jasa-cetak-buku-tapanuli-selatan
/jasa-cetak-buku-tidore-kepulauan
/jasa-cetak-buku-tolikara
/jasa-cetak-buku-tual
/jasa-cetak-buku-wakatobi
/jasa-cetak-buku-waropen
`.trim().split('\n').map(s => s.trim().replace(/^\//, '')).filter(Boolean);

async function run() {
  console.log(`Checking ${urls.length} slugs...`);
  
  // Need to find IDs matching these slugs. The content could be 'page' or something else, but most likely 'page'
  const query = `*[_type == "page" && slug.current in $slugs]._id`;
  const ids = await client.fetch(query, { slugs: urls });
  
  console.log(`Found ${ids.length} documents to delete.`);
  
  if (ids.length === 0) {
    console.log("No documents matched the query.");
    return;
  }

  const transaction = client.transaction();
  for (const id of ids) {
    transaction.delete(id);
    console.log(`Queueing delete for ID: ${id}`);
  }
  
  await transaction.commit();
  console.log(`Successfully deleted ${ids.length} documents.`);
}

run().catch(console.error);
