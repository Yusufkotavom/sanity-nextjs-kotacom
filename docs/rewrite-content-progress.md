# Rewrite Content Progress

Date: 2026-04-02  
Owner track: Worker 3 (Route Rewrite + SEO Application)

## Coverage Summary

- Legacy manifest routes: `104`
- Routes already on rewrite template + metadata helper: `104/104`
- Route parity hardening completed:
  - `percetakan` nested route moved to catch-all: done
  - `pembuatan-website` alias slugs for high-intent old paths: done (partial set)

## Top-Priority URL Status (from top300 set that matches rewrite clusters)

| Old path | Current rewrite coverage | Status |
|---|---|---|
| `/pembuatan-website/harga` | direct route | Done |
| `/software/pembuatan-software` | direct route | Done |
| `/pembuatan-website/surabaya` | direct route | Done |
| `/pembuatan-website/sekolah` | alias -> `/pembuatan-website/jasa-pembuatan-website-sekolah` | Done |
| `/pembuatan-website/toko-online` | alias -> `/pembuatan-website/jasa-pembuatan-website-toko-online` | Done |
| `/percetakan/cetak-undangan` | direct route via `percetakan/[...segments]` | Done |
| `/pembuatan-website/portfolio` | supplemental route + copy preset | Done |
| `/pembuatan-website/sidoarjo` | supplemental route + city-intent rewrite copy | Done |

## What Is Already Rewritten

- Trust pages:
  - `/about`
  - `/about/ai-statement`
  - `/contact`
  - `/privacy`
  - `/layanan`
- Service clusters:
  - `/pembuatan-website/*`
  - `/percetakan/*`
  - `/software/*`
  - `/sistem-pos`
- Shared rewrite modules:
  - hero, highlights, process, faq, related links
  - metadata helper with global fallback
  - breadcrumb/service JSON-LD integration in legacy template shell

## Pending for Next Rewrite Wave

- Per-URL editorial deep rewrite for highest-business-impact pages (not only template-level copy).
- Internal-link slot strategy per rewrite page cluster (cross-link to canonical service/product/blog pages).

## Notes

- Redirect rollout remains deferred by strategy until rewrite coverage and curation are finalized.
- This tracker is content-focused; redirect action history stays in curation CSV files.
