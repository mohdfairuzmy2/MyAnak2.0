const TERMS = [
  'Pra pendaftaran kelahiran dalam talian hanya untuk kelahiran di fasiliti perubatan kerajaan atau swasta dalam tempoh 60 hari (Semenanjung) atau 14 hari (Sabah, Sarawak, Labuan) dari tarikh kelahiran.',
  'Ibu bapa perlu membawa dokumen asal ke pejabat JPN: Borang JPN.LM01, pengesahan hospital, kad pengenalan ibu bapa, sijil nikah, dan buku pink.',
  'Kehadiran kedua-dua ibu bapa diperlukan untuk status perkahwinan tertentu.',
  'Permohonan akan terbatal jika ibu bapa tidak hadir ke JPN dalam tempoh yang ditetapkan.',
  'Membuat pernyataan palsu adalah satu kesalahan di bawah undang-undang dan boleh dikenakan denda atau penjara.',
]

export function TermsContent() {
  return (
    <>
      <div className="terms-card">
        <ol className="terms-list">
          {TERMS.map((term, i) => (
            <li key={i}>{term}</li>
          ))}
        </ol>
      </div>

      <div className="terms-note">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
        </svg>
        <p>Dengan menekan &quot;Setuju&quot;, anda menerima semua terma di atas.</p>
      </div>
    </>
  )
}
