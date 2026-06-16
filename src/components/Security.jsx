import { motion } from 'framer-motion'

const POINTS = [
  { icon: <Lock />, title: 'Encrypted in transit & at rest', body: 'Your recordings, transcripts, and extracted data are encrypted the moment they leave your device and while stored.' },
  { icon: <Key />, title: 'Tied to your account alone', body: 'Data syncs only to the account you control. No shared pools, no surprise access.' },
  { icon: <Eye />, title: 'You stay in control', body: 'Review, edit, or delete anything SonarPilot extracts. Your conversations remain yours.' },
]

export default function Security() {
  return (
    <section className="section security" id="security">
      <div className="container security__inner">
        <motion.div
          className="security__copy"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">
            <span className="dot" /> Security & privacy
          </span>
          <h2 className="section-title">
            Built so nothing leaks —<br />
            <span className="grad-text">not even the details.</span>
          </h2>
          <p className="section-sub">
            Client calls hold sensitive information. SonarPilot treats them that way: everything
            syncs securely to your account, across every device, with you in full control.
          </p>

          <div className="security__points">
            {POINTS.map((p, i) => (
              <motion.div
                key={i}
                className="secpoint"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              >
                <span className="secpoint__icon">{p.icon}</span>
                <div>
                  <h3 className="secpoint__title">{p.title}</h3>
                  <p className="secpoint__body">{p.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="security__art"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="shield">
            <div className="shield__glow" />
            <svg viewBox="0 0 120 140" className="shield__svg">
              <defs>
                <linearGradient id="sg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#3b82f6" />
                  <stop offset="1" stopColor="#38e1ff" />
                </linearGradient>
              </defs>
              <path
                d="M60 6l46 18v36c0 34-22 58-46 68C36 118 14 94 14 60V24z"
                fill="rgba(37,99,255,0.08)"
                stroke="url(#sg)"
                strokeWidth="2"
              />
              <path
                d="M42 70l13 13 24-28"
                fill="none"
                stroke="url(#sg)"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {[0, 1, 2].map((i) => (
              <span key={i} className="shield__ring" style={{ animationDelay: `${i * 1.1}s` }} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Lock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <rect x="5" y="10" width="14" height="10" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 10V7a4 4 0 018 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function Key() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 11l8 8m-3 0l2-2m-4-2l2-2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function Eye() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  )
}
