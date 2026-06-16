import { motion } from 'framer-motion'
import { MAILTO } from '../constants'

export default function CTA() {
  return (
    <section className="section cta" id="cta">
      <div className="container">
        <motion.div
          className="cta__card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="cta__rings" aria-hidden="true">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} style={{ animationDelay: `${i * 0.9}s` }} />
            ))}
          </div>
          <span className="eyebrow">
            <span className="dot" /> Stop losing the details
          </span>
          <h2 className="cta__title">
            Your next call is about to
            <br />
            <span className="grad-text">organize itself.</span>
          </h2>
          <p className="cta__sub">
            Import one recording and watch SonarPilot turn it into a contact, a property, your
            tasks, and a meeting — in seconds.
          </p>
          <div className="cta__actions">
            <a href={MAILTO} className="btn btn-primary btn-lg">
              Start free <Arrow />
            </a>
            <a href="#demo" className="btn btn-ghost btn-lg">
              Replay the demo
            </a>
          </div>
          <p className="cta__fine">No credit card · Works with recordings or transcripts</p>
        </motion.div>
      </div>
    </section>
  )
}

function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
