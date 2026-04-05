const fs = require('fs');
const path = require('path');

const file = path.join(process.cwd(), 'content/astro-local/jasa-cetak-buku-kota/cities.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const slugsToRemove = [
  'aceh-tengah', 'agam', 'asahan', 'balangan', 'banggai-laut', 'bangka', 'batam',
  'bolaang-mongondow', 'bolaang-mongondow-selatan', 'bolaang-mongondow-utara',
  'bontang', 'buru', 'buton', 'dompu', 'dumai', 'empat-lawang', 'halmahera-barat',
  'halmahera-utara', 'hulu-sungai-selatan', 'jambi', 'jembrana', 'kaur', 'kayong-utara',
  'kepulauan-aru', 'klungkung', 'kutai-kartanegara', 'lampung-utara', 'lhokseumawe',
  'makassar', 'maluku-tengah', 'maluku-tenggara', 'mandailing-natal', 'minahasa-tenggara',
  'mukomuko', 'murung-raya', 'nagan-raya', 'palopo', 'pariaman', 'payakumbuh',
  'pematangsiantar', 'pesawaran', 'pulang-pisau', 'pulau-taliabu', 'puncak', 'sabu-raijua',
  'solok-selatan', 'sumba-tengah', 'sumba-timur', 'tabanan', 'tanah-bumbu', 'tanah-laut',
  'tapanuli-selatan', 'tidore-kepulauan', 'tolikara', 'tual', 'wakatobi', 'waropen'
];

let removed = 0;
const filtered = data.filter(c => {
  const match = typeof c === 'string' ? slugsToRemove.includes(c) : slugsToRemove.includes(c.slug);
  if (match) removed++;
  return !match;
});

fs.writeFileSync(file, JSON.stringify(filtered, null, 2));

console.log(`Original count: ${data.length}, Removed: ${removed}, Remaining: ${filtered.length}`);
