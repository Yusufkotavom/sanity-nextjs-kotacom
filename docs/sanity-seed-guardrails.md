# Sanity Seed Guardrails

Gunakan aturan ini setiap kali melakukan seed, import, insert, atau patch document Sanity via script/API.

## Wajib untuk Array Items

- Setiap item array wajib memiliki `_key`.
- `_key` harus berupa string unik dalam array yang sama.
- Ini berlaku untuk:
  - `blocks[]`
  - `links[]`
  - `columns[]`
  - `faqs[]`
  - item `Portable Text` seperti `body[]`, `markDefs[]`, dan `children[]`

> **Developer info**: This usually happens when items are created using an API client, and the `_key` property has not been included. The value of the `_key` property must be a unique string. Saat melakukan script data import, pastikan untuk men-generate `crypto.randomUUID()` untuk setiap item dalam iterasi array.

Contoh:

```ts
{
  _type: "grid-card",
  _key: "card-1",
  title: "Hero Editable",
}
```

## Wajib untuk Link Objects

- Setiap object `link` wajib mengisi `isExternal` secara eksplisit.
- Jangan biarkan `isExternal` kosong atau implicit.

Aturan:

- `isExternal: false`
  - gunakan `internalLink`
  - jangan andalkan `href`
- `isExternal: true`
  - gunakan `href`
  - `target` opsional

Contoh internal:

```ts
{
  _type: "link",
  _key: "cta-link-internal",
  isExternal: false,
  title: "Lihat Paket",
  internalLink: {
    _type: "reference",
    _ref: "page-some-id",
  },
}
```

Contoh external:

```ts
{
  _type: "link",
  _key: "cta-link-external",
  isExternal: true,
  title: "Konsultasi WhatsApp",
  href: "https://wa.me/6281234567890",
  target: true,
}
```

## Wajib untuk Document IDs Publik

- Untuk document yang harus bisa dibaca frontend publik, gunakan `_id` tanpa titik (`.`).
- Ini penting untuk document utama maupun document yang direferensikan dari `page`, seperti `faq`.
- Gunakan format aman seperti:
  - `page-test-page-hybrid`
  - `faq-test-page-hybrid-when-to-use`
- Hindari format seperti:
  - `page.test-page-hybrid`
  - `faq.test-page-hybrid.when-to-use`

Catatan:

- ID bertitik bisa tetap terlihat saat query dengan token, tetapi gagal saat diakses publik tanpa token.
- Jika document publik direferensikan dari `page` dan tidak terbaca publik, hasil dereference seperti `faqs[]->` bisa menjadi `null` dan menjatuhkan renderer jika tidak dijaga.

## Larangan

- Jangan seed array object tanpa `_key`.
- Jangan seed `link` tanpa `isExternal`.
- Jangan campur mode internal dan external dalam satu `link` secara ambigu.
- Jangan gunakan `_id` bertitik untuk document yang harus dibaca publik.

## Workflow Wajib Setelah Seed / Insert

1. Jalankan audit:

```bash
pnpm --filter frontend run sanity:pages:audit
```

2. Jika ada temuan yang bersifat mekanis, jalankan normalizer:

```bash
pnpm --filter frontend run sanity:pages:normalize
```

3. Audit ulang sampai hasilnya `affectedPageCount: 0`.

## Catatan

- Guardrail ini dibuat terutama untuk document `page`.
- Token write untuk automation harus mengikuti urutan dev-first:
  - `SANITY_DEV`
  - `SANITY_AUTH_TOKEN`
