# Component Archive

Folder ini menampung komponen historis yang sengaja dipertahankan sebagai referensi migrasi, bukan sebagai source aktif untuk route publik.

Aturan pakai:

- jangan import komponen dari folder ini ke jalur aktif tanpa keputusan refactor yang jelas
- kalau ada duplikasi visual lama yang sudah tidak dipakai, pindahkan ke subfolder arsip yang sesuai
- source visual utama untuk landing surfaces sekarang ada di:
  - `frontend/components/ui/rewrite/*`
  - `frontend/components/blocks/*`
  - `frontend/components/hybrid/*`

Subfolder saat ini:

- `legacy-rewrite-v0/`: stack legacy sebelum rewrite shell dipromosikan sebagai referensi utama
