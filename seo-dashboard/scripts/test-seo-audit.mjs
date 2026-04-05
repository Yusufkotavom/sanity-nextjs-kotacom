const SITE_URL = 'https://sanity-nextjs-kotacom-frontend.vercel.app';
const LIMIT = 5; // Batasi test cuma 5 URL agar cepat

async function testSeoAudit() {
  console.log(`\n--- Menjalankan Simulasi Technical SEO Audit ---`);
  console.log(`Target Site: ${SITE_URL}`);

  try {
    console.log(`1. Fetching Sitemap...`);
    const sitemapUrl = `${SITE_URL.replace(/\/+$/, '')}/sitemap.xml`;
    const sitemapRes = await fetch(sitemapUrl);
    
    if (!sitemapRes.ok) {
      console.error(`❌ Gagal mengambil sitemap: HTTP ${sitemapRes.status}`);
      return;
    }

    const sitemapXml = await sitemapRes.text();
    // Regex sederhana untuk mengambil URL dari sitemap
    const matches = Array.from(sitemapXml.matchAll(/<loc>(.*?)<\/loc>/g));
    const urls = matches.map(m => m[1]).slice(0, LIMIT);

    console.log(`✅ Berhasil menemukan ${matches.length} URL di sitemap. Memindai ${urls.length} URL teratas...\n`);

    const items = [];

    for (const url of urls) {
      console.log(`Memindai: ${url}`);
      const issues = [];
      try {
        const response = await fetch(url);
        const html = await response.text();

        // Cek Keberadaan Tag Penting
        const hasTitle = /<title>[\s\S]*?<\/title>/i.test(html);
        const hasDesc = /<meta[^>]*name=["']description["'][^>]*>/i.test(html);
        const hasOgImage = /<meta[^>]*property=["']og:image["'][^>]*>/i.test(html);
        const hasJsonLd = /<script[^>]*type=["']application\/ld\+json["'][^>]*>/i.test(html);
        
        // Ambil isi robots & canonical
        const canonicalMatch = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*>/i);
        const canonical = canonicalMatch ? canonicalMatch[1] : null;

        const robotsMatch = html.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*>/i);
        const robots = robotsMatch ? robotsMatch[1] : null;
        const noindex = robots ? /noindex/i.test(robots) : false;

        // Validasi
        if (!hasTitle) issues.push("missing_title");
        if (!hasDesc) issues.push("missing_meta_description");
        if (!hasOgImage) issues.push("missing_og_image");
        if (!canonical) issues.push("missing_canonical");
        if (!hasJsonLd) issues.push("missing_jsonld");
        if (response.status >= 400) issues.push(`http_${response.status}`);
        if (canonical && canonical !== url) issues.push("canonical_mismatch");

        items.push({
          url,
          status: response.status,
          indexability: noindex ? "noindex" : "indexable",
          issues
        });

      } catch (e) {
        items.push({ url, status: 'error', issues: [e.message] });
      }
    }

    console.log(`\n--- HASIL AUDIT (${LIMIT} URL Teratas) ---`);
    for (const item of items) {
      const statusIcon = item.issues.length === 0 ? "🟢" : "🔴";
      console.log(`${statusIcon} [HTTP ${item.status}] ${item.url}`);
      if (item.issues.length > 0) {
        console.log(`    ⚠️ Issues: ${item.issues.join(', ')}`);
      }
    }
  } catch (err) {
    console.error('❌ Terjadi kesalahan saat audit:', err.message);
  }
}

testSeoAudit();
