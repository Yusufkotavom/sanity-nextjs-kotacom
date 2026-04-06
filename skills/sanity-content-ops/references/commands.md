# Commands

```bash
node frontend/scripts/ops-generate-content-payload.mjs --type post --title "Judul"
node frontend/scripts/ops-validate-sanity-payload.mjs --input tmp/post-judul.json
node frontend/scripts/ops-upsert-sanity-content.mjs --input tmp/post-judul.json
node frontend/scripts/ops-upsert-sanity-content.mjs --input tmp/post-judul.json --write
```
