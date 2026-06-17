# MyAnak

Aplikasi web progresif (PWA) mobile-first untuk urusan awal kelahiran anak — dibangunkan dengan React, TypeScript, dan Vite.

## Ciri-ciri

- Skrin utama mengikut reka bentuk MyAnak
- Mobile-first, responsif (max-width 430px)
- Boleh dipasang sebagai PWA di telefon
- Bahasa Melayu (ms)

## Perkhidmatan

- Pendaftaran Kelahiran
- Status MyKid
- Bantuan
- Imunisasi
- Perancangan Anak

## Jalankan Secara Tempatan

```bash
npm install
npm run dev
```

Buka `http://localhost:5173` dalam pelayar. Untuk ujian mobile, gunakan DevTools (Toggle device toolbar) atau akses dari telefon dalam rangkaian yang sama.

## Pasang sebagai PWA

1. Bina aplikasi: `npm run build`
2. Pratonton: `npm run preview`
3. Dalam Chrome/Safari pada telefon, pilih **Add to Home Screen** / **Pasang aplikasi**

## Struktur Projek

```
src/
├── components/
│   ├── Header.tsx       # Logo, tajuk, notifikasi
│   ├── HeroBanner.tsx   # Banner selamat datang
│   ├── ServiceGrid.tsx  # Grid 2x2 perkhidmatan
│   ├── PlanningCard.tsx # Kad Perancangan Anak
│   └── BottomNav.tsx    # Navigasi bawah
├── App.tsx
└── App.css
```

## Skrip

| Perintah | Keterangan |
|----------|------------|
| `npm run dev` | Server pembangunan |
| `npm run build` | Bina untuk production |
| `npm run preview` | Pratonton binaan production |
