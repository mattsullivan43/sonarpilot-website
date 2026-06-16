import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const STAGES = [
  {
    n: '01',
    title: 'Import the call',
    body: 'Drop in a recording or paste a transcript. SonarPilot accepts audio files or plain text from any dialer, voice memo, or meeting app.',
    icon: <Upload />,
  },
  {
    n: '02',
    title: 'It listens & understands',
    body: 'SonarPilot reads the whole conversation in context — who spoke, what they wanted, and what was promised on both sides.',
    icon: <Ear />,
  },
  {
    n: '03',
    title: 'Structured data, extracted',
    body: 'The contact, the property or deal, every follow-up task, and any meeting to schedule are pulled out and neatly organized.',
    icon: <Sparkle />,
  },
  {
    n: '04',
    title: 'Synced to your account',
    body: 'Everything lands in your workspace and stays in sync across every device — encrypted, searchable, and ready to act on.',
    icon: <Sync />,
  },
]

export default function Pipeline() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.7', 'end 0.6'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section className="section pipeline" id="how" ref={ref}>
      <div className="container">
        <header className="section-head">
          <span className="eyebrow">
            <span className="dot" /> How it works
          </span>
          <h2 className="section-title">
            From a voice on the phone
            <br />
            to a <span className="grad-text">plan on your desk.</span>
          </h2>
          <p className="section-sub">
            Four steps, fully automatic. You talk to clients like you always have — SonarPilot
            does the busywork after the call ends.
          </p>
        </header>

        <div className="timeline">
          <div className="timeline__rail">
            <motion.div className="timeline__fill" style={{ scaleY: lineScale }} />
          </div>

          <div className="timeline__stages">
            {STAGES.map((s, i) => (
              <Stage key={s.n} stage={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Stage({ stage, index }) {
  return (
    <motion.div
      className="stage"
      initial={{ opacity: 0, x: index % 2 ? 40 : -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="stage__node">
        <span className="stage__pulse" />
        {stage.icon}
      </div>
      <div className="stage__card glass">
        <span className="stage__n">{stage.n}</span>
        <h3 className="stage__title">{stage.title}</h3>
        <p className="stage__body">{stage.body}</p>
      </div>
    </motion.div>
  )
}

function Upload() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 16V4m0 0L7 9m5-5l5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function Ear() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M6 9a6 6 0 1112 0c0 3-2 4-3 5s-1 3-3 3a2.5 2.5 0 01-2.5-2.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 9a3 3 0 016 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function Sparkle() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}
function Sync() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path d="M4 12a8 8 0 0113.5-5.8L20 8M20 12a8 8 0 01-13.5 5.8L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M20 4v4h-4M4 20v-4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
