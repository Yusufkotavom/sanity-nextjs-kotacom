import { createClient } from 'next-sanity';

const token = process.env.SANITY_DEV || process.env.SANITY_AUTH_TOKEN;

if (!token) {
  console.error("No token found");
  process.exit(1);
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'b017f7tl',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token
});

const rawText = `
/jasa-cetak-buku-aceh-tengah	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-aceh-tengah	0	0	
/jasa-cetak-buku-agam	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-agam	0	0	
/jasa-cetak-buku-asahan	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-asahan	0	0	
/jasa-cetak-buku-balangan	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-balangan	0	0	
/jasa-cetak-buku-banggai-laut	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-banggai-laut	0	0	
/jasa-cetak-buku-bangka	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-bangka	0	0	
/jasa-cetak-buku-batam	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-batam	0	0	
/jasa-cetak-buku-bolaang-mongondow	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-bolaang-mongondow	0	0	
/jasa-cetak-buku-bolaang-mongondow-selatan	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-bolaang-mongondow-selatan	0	0	
/jasa-cetak-buku-bolaang-mongondow-utara	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-bolaang-mongondow-utara	0	0	
/jasa-cetak-buku-bontang	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-bontang	0	0	
/jasa-cetak-buku-buru	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-buru	0	0	
/jasa-cetak-buku-buton	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-buton	0	0	
/jasa-cetak-buku-dompu	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-dompu	0	0	
/jasa-cetak-buku-dumai	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-dumai	0	0	
/jasa-cetak-buku-empat-lawang	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-empat-lawang	0	0	
/jasa-cetak-buku-halmahera-barat	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-halmahera-barat	0	0	
/jasa-cetak-buku-halmahera-utara	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-halmahera-utara	0	0	
/jasa-cetak-buku-hulu-sungai-selatan	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-hulu-sungai-selatan	0	0	
/jasa-cetak-buku-jambi	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-jambi	0	0	
/jasa-cetak-buku-jembrana	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-jembrana	0	0	
/jasa-cetak-buku-kaur	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-kaur	0	0	
/jasa-cetak-buku-kayong-utara	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-kayong-utara	0	0	
/jasa-cetak-buku-kepulauan-aru	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-kepulauan-aru	0	0	
/jasa-cetak-buku-klungkung	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-klungkung	0	0	
/jasa-cetak-buku-kutai-kartanegara	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-kutai-kartanegara	0	0	
/jasa-cetak-buku-lampung-utara	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-lampung-utara	0	0	
/jasa-cetak-buku-lhokseumawe	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-lhokseumawe	0	0	
/jasa-cetak-buku-makassar	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-makassar	0	0	
/jasa-cetak-buku-maluku-tengah	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-maluku-tengah	0	0	
/jasa-cetak-buku-maluku-tenggara	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-maluku-tenggara	0	0	
/jasa-cetak-buku-mandailing-natal	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-mandailing-natal	0	0	
/jasa-cetak-buku-minahasa-tenggara	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-minahasa-tenggara	0	0	
/jasa-cetak-buku-mukomuko	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-mukomuko	0	0	
/jasa-cetak-buku-murung-raya	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-murung-raya	0	0	
/jasa-cetak-buku-nagan-raya	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-nagan-raya	0	0	
/jasa-cetak-buku-palopo	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-palopo	0	0	
/jasa-cetak-buku-pariaman	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-pariaman	0	0	
/jasa-cetak-buku-payakumbuh	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-payakumbuh	0	0	
/jasa-cetak-buku-pematangsiantar	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-pematangsiantar	0	0	
/jasa-cetak-buku-pesawaran	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-pesawaran	0	0	
/jasa-cetak-buku-pulang-pisau	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-pulang-pisau	0	0	
/jasa-cetak-buku-pulau-taliabu	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-pulau-taliabu	0	0	
/jasa-cetak-buku-puncak	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-puncak	0	0	
/jasa-cetak-buku-sabu-raijua	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-sabu-raijua	0	0	
/jasa-cetak-buku-solok-selatan	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-solok-selatan	0	0	
/jasa-cetak-buku-sumba-tengah	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-sumba-tengah	0	0	
/jasa-cetak-buku-sumba-timur	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-sumba-timur	0	0	
/jasa-cetak-buku-tabanan	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-tabanan	0	0	
/jasa-cetak-buku-tanah-bumbu	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-tanah-bumbu	0	0	
/jasa-cetak-buku-tanah-laut	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-tanah-laut	0	0	
/jasa-cetak-buku-tapanuli-selatan	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-tapanuli-selatan	0	0	
/jasa-cetak-buku-tidore-kepulauan	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-tidore-kepulauan	0	0	
/jasa-cetak-buku-tolikara	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-tolikara	0	0	
/jasa-cetak-buku-tual	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-tual	0	0	
/jasa-cetak-buku-wakatobi	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-wakatobi	0	0	
/jasa-cetak-buku-waropen	Sitemap Only	https://www.kotacom.id/jasa-cetak-buku-waropen	0	0	
`;

const lines = rawText.split('\n').map(line => line.trim()).filter(Boolean);
const paths = lines.map(line => line.split('\t')[0].trim());

async function run() {
  console.log(`Checking ${paths.length} targets...`);
  
  // They could be 'redirect' documents (source field)
  // or 'page' documents (slug.current)
  // or 'post', 'service' etc.
  
  // Let's first fetch all redirects that match
  const redirectQuery = `*[_type == "redirect" && source in $paths]._id`;
  const redirectIds = await client.fetch(redirectQuery, { paths });
  
  // Let's also fetch any content pages with those slugs (we have to strip leading /)
  const slugs = paths.map(p => p.replace(/^\//, ''));
  const contentQuery = `*[slug.current in $slugs]._id`;
  const contentIds = await client.fetch(contentQuery, { slugs });
  
  const allIds = [...new Set([...redirectIds, ...contentIds])];
  console.log(`Found ${redirectIds.length} redirects and ${contentIds.length} content documents.`);
  console.log(`Total unique documents to delete: ${allIds.length}`);
  
  if (allIds.length === 0) {
    console.log("Nothing found to delete.");
    return;
  }
  
  const transaction = client.transaction();
  for (const id of allIds) {
    transaction.delete(id);
    console.log(`Deleting ID: ${id}`);
  }
  
  await transaction.commit();
  console.log("Success.");
}

run().catch(console.error);
