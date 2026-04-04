const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'b017f7tl',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: false,
  token: 'skMU5y462khTCoQizwtweMjnw2gQfSbLoPKQFVvPW8Qp3qavnPqY3k7reXbrQd7w6BG8qocFlioVavsf7PspJeFYwPgTjXwOtC0kwkszAnZnyz1ig9Kw5cxpRB3XvBJ2CGSw7zvsik2n9DfHySGwzg1n9HTwdry26lOgjxdg2ROZFrSuG5jC'
});

async function run() {
  const page = await client.fetch('*[_type == "page" && slug.current == "home-pepar"][0]');
  if (!page) {
    console.log("No page found");
    return;
  }
  
  // Create updated blocks array
  const updatedBlocks = [
    {
      ...page.blocks[0],
      tagLine: "Solusi IT & Percetakan Terintegrasi",
      title: "Bangun fondasi digital bisnis yang rapi, stabil, dan siap untuk tumbuh.",
      body: [
        {
          "_key": "home-pepar-hero-body-block-0",
          "_type": "block",
          "children": [
            {
              "_key": "home-pepar-hero-body-span-0",
              "_type": "span",
              "marks": [],
              "text": "Kami membantu bisnis melalui layanan pembuatan website, software development, IT support, hingga percetakan profesional. Satu partner terpercaya yang memastikan infrastruktur online dan offline Anda sejalan, tanpa repot koordinasi antar vendor."
            }
          ],
          "markDefs": [],
          "style": "normal"
        }
      ],
      links: [
        {
          "_key": "home-pepar-hero-link-0",
          "_type": "link",
          "buttonVariant": "default",
          "href": "/layanan",
          "isExternal": false,
          "title": "Jelajahi Solusi"
        },
        {
          "_key": "home-pepar-hero-link-1",
          "_type": "link",
          "buttonVariant": "outline",
          "href": "https://wa.me/6281335275219",
          "isExternal": true,
          "title": "Konsultasi Gratis"
        }
      ]
    },
    {
      ...page.blocks[1],
      columns: [
        {
          ...page.blocks[1].columns[0],
          title: "Website & Software Custom",
          excerpt: "Sistem digital yang dirancang khusus mengikuti proses bisnis Anda, cepat diakses dan berkelas.",
          link: {
            "_key": "home-pepar-proof-link-0",
            "_type": "link",
            "buttonVariant": "link",
            "href": "/pembuatan-website",
            "isExternal": false,
            "title": "Pelajari lebih lanjut"
          }
        },
        {
          ...page.blocks[1].columns[1],
          title: "IT Support Terjadwal",
          excerpt: "Perawatan hardware & software rutin untuk kelancaran operasional. Zero downtime, maximum output.",
          link: {
            "_key": "home-pepar-proof-link-1",
            "_type": "link",
            "buttonVariant": "link",
            "href": "/services",
            "isExternal": false,
            "title": "Lihat paket support"
          }
        },
        {
          ...page.blocks[1].columns[2],
          title: "Percetakan & Dokumentasi",
          excerpt: "Penuhi kebutuhan promosi fisik seperti brosur, buku profil perusahaan, hingga seminar kit berkualitas.",
          link: {
            "_key": "home-pepar-proof-link-2",
            "_type": "link",
            "buttonVariant": "link",
            "href": "/percetakan",
            "isExternal": false,
            "title": "Lihat jasa cetak"
          }
        }
      ]
    },
    {
      ...page.blocks[2],
      tagLine: "Mari Berkolaborasi",
      title: "Siap mengubah cara bisnis Anda bekerja hari ini?",
      body: [
        {
          "_key": "home-pepar-cta-body-block-0",
          "_type": "block",
          "children": [
            {
              "_key": "home-pepar-cta-body-span-0",
              "_type": "span",
              "marks": [],
              "text": "Diskusikan tantangan operasional dan teknis Anda bersama kami. Tim konsultan KOTACOM akan membantu menemukan strategi yang tepat sasaran dengan budget yang paling realistis."
            }
          ],
          "markDefs": [],
          "style": "normal"
        }
      ],
      links: [
        {
          "_key": "home-pepar-cta-link-0",
          "_type": "link",
          "buttonVariant": "default",
          "href": "/contact",
          "isExternal": false,
          "title": "Hubungi Kami"
        },
        {
          "_key": "home-pepar-cta-link-1",
          "_type": "link",
          "buttonVariant": "outline",
          "href": "https://wa.me/6281335275219",
          "isExternal": true,
          "title": "Chat WhatsApp"
        }
      ]
    }
  ];

  await client.patch(page._id).set({
    blocks: updatedBlocks,
    meta: {
      ...page.meta,
      title: "Kotacom | Solusi IT, Website, Software & Percetakan Surabaya",
      description: "Jasa IT terpadu pembuatan website, software custom, IT support, dan cetak profesional di Surabaya.",
      noindex: false // enable index since it's going live soon
    }
  }).commit();
  console.log("Patched page successfully.");
}

run().catch(console.error);
