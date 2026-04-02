# AI Writer Production Guide

Dokumen ini fokus ke implementasi production AI rewrite di project ini.

## Scope

Yang termasuk:
- Konfigurasi provider/model/prompt di Studio.
- Endpoint config + generate + rewrite apply.
- Tombol `AI Rewrite` langsung dari dokumen `post/service/project`.

Yang tidak termasuk:
- Auto-publish.
- Workflow approval multi-user.
- Cost dashboard terpisah.

## Arsitektur

1. Konfigurasi disimpan di singleton Sanity: `aiWriterSettings`.
2. Secret key disimpan terenkripsi lewat API backend.
3. Studio action memanggil endpoint rewrite backend.
4. Backend generate konten lalu patch ke `drafts.<id>`.

## Endpoint Aktif

- `GET /api/ai/config/status`
- `POST /api/ai/config/save`
- `POST /api/ai/generate`
- `POST /api/ai/rewrite/apply`

Catatan auth:
- `config/*` dan `generate` memakai auth cookie dashboard SEO.
- `rewrite/apply` memakai shared secret header untuk Studio action.

## Provider Mode

- `gateway` (rekomendasi production): Vercel AI Gateway.
- `direct-gemini`: rotasi key Gemini.
- `direct-groq`: rotasi key Groq.

## Environment Wajib

Frontend (`frontend/.env`):
- `SEO_SESSION_SECRET`
- `SANITY_AUTH_TOKEN`
- `AI_WRITER_ACTION_SECRET`

Studio (`studio/.env`):
- `SANITY_STUDIO_AI_WRITER_ACTION_SECRET`

`AI_WRITER_ACTION_SECRET` dan `SANITY_STUDIO_AI_WRITER_ACTION_SECRET` harus sama.

Opsional:
- `VERCEL_OIDC_TOKEN` (gateway via OIDC).
- `AI_GATEWAY_API_KEY` (gateway static key fallback).
- `AI_WRITER_GEMINI_KEYS`, `AI_WRITER_GROQ_KEYS` (fallback env key pool).

## Setup Cepat (Gateway)

```bash
vercel link
vercel env pull .env.local
```

Di Studio `AI Writer Settings`:
1. `enabled = true`
2. `mode = gateway`
3. `defaultModel = openai/gpt-5.4` (atau model valid provider/model)
4. Isi `fallbackModels` dan `gatewayProviderOrder` jika perlu.
5. Isi prompt template (`globalSystem`, `postRewrite`, `serviceRewrite`, `projectRewrite`).

## Format Key Rotation

Untuk direct mode, isi key sebagai newline list:

```text
key-1
key-2
key-3
```

Backend akan mencoba key satu per satu sampai sukses.

## Contoh Save Config

```json
{
  "enabled": true,
  "mode": "gateway",
  "defaultModel": "openai/gpt-5.4",
  "fallbackModels": ["google/gemini-2.5-flash"],
  "gatewayProviderOrder": ["openai", "google"],
  "temperature": 0.4,
  "maxOutputTokens": 1400,
  "prompts": {
    "globalSystem": "Anda editor SEO bahasa Indonesia.",
    "postRewrite": "Rewrite artikel tanpa mengubah intent slug."
  }
}
```

## Rewrite Apply Flow

1. Buka dokumen `post/service/project` di Studio.
2. Klik action `AI Rewrite`.
3. Tambah instruksi opsional.
4. Backend rewrite dan patch `title`, `excerpt`, `body` ke draft.
5. Review manual sebelum publish.

## Guardrail yang Sudah Aktif

- Validasi model format untuk gateway: `provider/model`.
- Guard panjang prompt pada generate endpoint.
- Rewrite apply hanya untuk `post/service/project`.
- Rewrite apply mewajibkan action secret valid.

## Production Checklist

1. Secret env sudah terpasang (`SEO_SESSION_SECRET`, `SANITY_AUTH_TOKEN`, action secret pair).
2. Mode `gateway` aktif dan model valid.
3. Prompt template final sudah diisi.
4. Smoke test:
   - `/api/ai/config/status`
   - `/api/ai/generate` (3 doc type)
   - Studio `AI Rewrite` di dokumen real.
5. Team editorial confirm review-before-publish policy.
