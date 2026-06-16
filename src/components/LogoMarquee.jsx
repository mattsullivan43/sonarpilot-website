const ITEMS = [
  'Call recordings',
  'Voice memos',
  'Zoom calls',
  'Phone transcripts',
  '.mp3 · .m4a · .wav',
  'Otter exports',
  'Plain-text notes',
  'Dialer logs',
]

export default function LogoMarquee() {
  return (
    <section className="marquee" aria-label="Supported sources">
      <div className="container marquee__label">Import from anything you already record</div>
      <div className="marquee__track-wrap">
        <div className="marquee__track">
          {[...ITEMS, ...ITEMS].map((t, i) => (
            <span className="marquee__item" key={i}>
              <Wave /> {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function Wave() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 12h2l2-6 4 14 3-9 2 4h5"
        stroke="var(--blue-400)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
