# Page to Post Conversion Workflow

Dokumen ini menjelaskan cara cepat dan aman untuk mengonversi document `page` di Sanity Studio menjadi document `post`.

Fokus utamanya:

- backlog blog/artikel yang masih tersimpan sebagai `page`
- migrasi sementara tanpa menghapus document sumber
- reuse asset/image reference yang sama
- membuat `post` baru yang bisa dipakai oleh route `/blog/[slug]`

## Prinsip Penting

Workflow ini **bukan** mengubah type document secara langsung.

Yang dilakukan:

1. baca document `page`
2. map field yang relevan ke shape `post`
3. buat document `post` baru
4. verifikasi hasil
5. biarkan `page` sumber tetap ada dulu

Artinya:

- aman untuk dry-run
- aman untuk verifikasi bertahap
- tidak destructive

## Command

```bash
pnpm --filter frontend run page:to-post -- --slug=<page-slug>
```

Default command di atas adalah dry-run.

Untuk benar-benar menulis `post`:

```bash
pnpm --filter frontend run page:to-post -- --slug=<page-slug> --write
```

## Mapping Field

Script ini memetakan:

- `page.title` -> `post.title`
- `page.slug.current` -> `post.slug.current`
- `page.meta.description` -> `post.excerpt`
- `page.meta` -> `post.meta`
- `page.meta.image` atau hero image -> `post.image`
- `page.blocks[]` -> `post.body`

## Cara `body` Dipetakan

Bagian paling sensitif adalah body.

Script memakai urutan berikut:

### 1. Prioritas: `legacy-rich-content`

Jika `page.blocks[]` mengandung block `_type == "legacy-rich-content"`, block itu akan langsung dipakai di `post.body`.

Ini jalur tercepat dan paling aman karena:

- `post.body` di repo ini memang mendukung `legacy-rich-content`
- tidak perlu menulis ulang semua block page satu per satu

### 2. Fallback: hero + section header text

Jika tidak ada `legacy-rich-content`, script akan mencoba menyusun `post.body` dari:

- `hero-1.body`
- `hero-2.body`
- `section-header.title`
- `section-header.description`

Mode ini berguna untuk migrasi cepat, tetapi hasilnya lebih sederhana.

Script akan memberi warning jika body terbentuk dari fallback ini.

### 3. Jika tidak ada sumber yang cukup

`post.body` akan kosong dan script memberi warning.

## Image / Asset

Script ini tidak upload ulang asset.

Yang dipakai ulang adalah reference asset Sanity yang sama:

- `page.meta.image`
- atau image dari hero block bila ada

Jadi ini sebenarnya adalah reuse reference, bukan memindahkan binary asset.

## Mode

### `create`

Default.

Perilaku:

- gagal jika `post` dengan slug target sudah ada

Cocok untuk:

- konversi pertama kali
- migrasi aman tanpa overwrite

### `upsert`

Perilaku:

- jika `post` target sudah ada, field hasil mapping akan diganti

Cocok untuk:

- rerun setelah memperbaiki mapping
- menyelaraskan ulang hasil migrasi sebelumnya

Contoh:

```bash
pnpm --filter frontend run page:to-post -- --slug=artikel-lama --mode=upsert --write
```

## Override Target Post

Secara default:

- slug `post` mengikuti slug `page`
- `_id` target menjadi `post-<slug>`

Kalau ingin test aman tanpa menyentuh slug final:

```bash
pnpm --filter frontend run page:to-post -- --slug=artikel-lama --post-slug=artikel-lama-smoke --write
```

Ini cocok untuk smoke test.

## Optional Author dan Category

Script mendukung:

- `--author-ref=<sanity-document-id>`
- `--category-refs=id1,id2,id3`

Contoh:

```bash
pnpm --filter frontend run page:to-post -- --slug=artikel-lama --author-ref=author-admin --category-refs=category-server,category-network --write
```

## Output yang Perlu Diperhatikan

Script akan melaporkan:

- page sumber
- apakah post target sudah ada
- target post yang akan dibuat
- `bodySource`
- warning mapping
- hasil public-read setelah write

Field `bodySource` biasanya bernilai:

- `legacy-rich-content`
- `fallback-portable-text`
- `empty`

Kalau nilainya `fallback-portable-text`, artinya body artikel belum benar-benar setara dengan page sumber dan perlu review.

## Workflow yang Direkomendasikan

1. Jalankan dry-run

```bash
pnpm --filter frontend run page:to-post -- --slug=artikel-lama
```

2. Review:

- excerpt
- body count
- body source
- warnings

3. Jika ingin aman, tulis ke slug test dulu:

```bash
pnpm --filter frontend run page:to-post -- --slug=artikel-lama --post-slug=artikel-lama-smoke --write
```

4. Verifikasi post hasilnya
5. Baru tulis ke slug final jika sudah sesuai
6. Jangan hapus `page` sumber dulu
7. Redirect / cleanup dilakukan belakangan, bukan default

## Kapan Tidak Cukup Menggunakan Script Ini

Script ini tidak cocok sebagai solusi final jika:

- page memakai banyak block visual kompleks yang harus diterjemahkan 1:1 ke artikel
- body artikel harus sangat rapi dan panjang
- page sumber bukan artikel, tetapi landing page pemasaran

Untuk kasus seperti itu, script ini hanya menjadi bootstrap awal.

## Studio Action: `Convert Page to Post`

Selain CLI, sekarang ada document action di Sanity Studio:

- `Convert Page to Post`

Action ini muncul pada document `page` yang:

- punya slug
- bukan main page hybrid utama seperti:
  - `index`
  - `layanan`
  - `pembuatan-website`
  - `percetakan`
  - `software`

Perilakunya:

1. editor membuka `page`
2. klik action `Convert Page to Post`
3. isi target post slug
4. pilih mode:
   - `create`
   - `upsert`
5. action membuat atau memperbarui draft `post`
6. `page` sumber tetap tidak dihapus

Catatan:

- action ini membuat draft `post`, bukan publish langsung
- review dan publish tetap dilakukan manual
- ini aman untuk editor yang tidak memakai CLI

Kapan pakai action Studio:

- saat ingin convert satu page langsung dari Studio
- saat slug target ingin direview sebagai draft dulu
- saat tidak perlu batch processing

Kapan pakai CLI:

- saat perlu dry-run detail di terminal
- saat perlu smoke test ke slug sementara
- saat perlu batch atau automation

## Smoke Test yang Sudah Dijalankan

Skenario nyata yang sudah diuji:

### 1. Dry-run dari `page`

Command:

```bash
pnpm --filter frontend run page:to-post -- --slug=test-page-hybrid
```

Hasil:

- page sumber ditemukan
- target `post-test-page-hybrid` terbentuk sebagai preview
- body berhasil dibuat dari fallback portable text
- warning diberikan karena page tidak memiliki `legacy-rich-content`

### 2. Write ke slug test

Command:

```bash
pnpm --filter frontend run page:to-post -- --slug=test-page-hybrid --post-slug=page-to-post-smoke --write
```

Hasil:

- `post-page-to-post-smoke` berhasil dibuat
- public-read mengembalikan post tersebut
- excerpt dan body count tervalidasi

### 3. Cleanup

Setelah smoke test:

- post test `post-page-to-post-smoke` dihapus kembali
- public-read diverifikasi kembali menjadi `null`

## File yang Terkait

- [convert-page-to-post.mjs](/home/ubuntu/next-js-sanity-starter/frontend/scripts/convert-page-to-post.mjs)
- [post.ts](/home/ubuntu/next-js-sanity-starter/studio/schemas/documents/post.ts)
- [page.ts](/home/ubuntu/next-js-sanity-starter/studio/schemas/documents/page.ts)
- [block-content.ts](/home/ubuntu/next-js-sanity-starter/studio/schemas/blocks/shared/block-content.ts)
