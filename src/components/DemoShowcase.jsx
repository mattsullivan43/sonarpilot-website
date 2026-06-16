import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

// Scripted transcript. Each line can carry an `emit` payload that fills a
// card the moment that line is "processed", so the extraction feels live.
const TRANSCRIPT = [
  { who: 'agent', t: 'Hi, this is Jordan over at Beacon Realty — is this Maria?' },
  {
    who: 'client',
    t: "Yes, hi Jordan. I'm calling about the listing on Oak Ridge.",
    emit: { card: 'contact', field: 'Name', value: 'Maria Alvarez' },
  },
  {
    who: 'agent',
    t: 'Of course — 1420 Oak Ridge Drive. Great choice, it just came on market.',
    emit: { card: 'property', field: 'Address', value: '1420 Oak Ridge Dr' },
  },
  {
    who: 'client',
    t: "We're pre-approved up to about 650. Is it still in range?",
    emit: { card: 'property', field: 'Budget', value: 'Up to $650K' },
  },
  {
    who: 'agent',
    t: "It's listed at 629, so yes. I'll send you the comps for the block.",
    emit: { card: 'task', value: 'Send comps for Oak Ridge block', due: 'by Friday' },
  },
  {
    who: 'client',
    t: 'Perfect. Could we walk through it sometime Tuesday afternoon?',
    emit: { card: 'meeting', value: 'Property tour — 1420 Oak Ridge', when: 'Tue · 3:00 PM' },
  },
  {
    who: 'agent',
    t: "Tuesday at 3 works. I'll also email the disclosure packet beforehand.",
    emit: { card: 'task', value: 'Email disclosure packet', due: 'before tour' },
  },
  {
    who: 'client',
    t: 'Wonderful. Talk Tuesday — and you can reach me at this number.',
    emit: { card: 'contact', field: 'Phone', value: '(512) 555-0188' },
  },
]

const STEP_MS = 1150

export default function DemoShowcase() {
  const ref = useRef(null)
  const [started, setStarted] = useState(false)
  const [idx, setIdx] = useState(-1)

  // Start once the section scrolls into view.
  useEffect(() => {
    const el = ref.current
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.4 },
    )
    if (el) io.observe(el)
    return () => io.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    if (idx >= TRANSCRIPT.length - 1) return
    const id = setTimeout(() => setIdx((i) => i + 1), idx === -1 ? 500 : STEP_MS)
    return () => clearTimeout(id)
  }, [started, idx])

  const replay = () => {
    setIdx(-1)
    // re-kick on next tick
    setStarted(false)
    requestAnimationFrame(() => setStarted(true))
  }

  // Derive card contents from emitted lines up to current index.
  const visible = TRANSCRIPT.slice(0, idx + 1)
  const contact = {}
  const property = {}
  const tasks = []
  let meeting = null
  visible.forEach((l) => {
    if (!l.emit) return
    const e = l.emit
    if (e.card === 'contact') contact[e.field] = e.value
    if (e.card === 'property') property[e.field] = e.value
    if (e.card === 'task') tasks.push({ value: e.value, due: e.due })
    if (e.card === 'meeting') meeting = { value: e.value, when: e.when }
  })

  const done = idx >= TRANSCRIPT.length - 1

  return (
    <section className="section demo" id="demo" ref={ref}>
      <div className="container">
        <header className="section-head section-head--center">
          <span className="eyebrow">
            <span className="dot" /> Live demo
          </span>
          <h2 className="section-title">
            Watch a call become <span className="grad-text">structured work.</span>
          </h2>
          <p className="section-sub" style={{ margin: '0 auto' }}>
            This is a real extraction flow. As the conversation plays, SonarPilot fills in the
            contact, property, tasks, and meeting — automatically.
          </p>
        </header>

        <div className="demo__grid">
          {/* Transcript */}
          <div className="demo__panel glass">
            <div className="demo__panelhead">
              <div className="demo__dots">
                <span /> <span /> <span />
              </div>
              <span className="demo__filename">oak-ridge-call.mp3</span>
              <span className={`demo__badge ${done ? 'is-done' : ''}`}>
                {done ? 'Processed' : started ? 'Listening…' : 'Ready'}
              </span>
            </div>
            <div className="demo__transcript">
              <AnimatePresence>
                {visible.map((l, i) => (
                  <motion.div
                    key={i}
                    className={`bubble bubble--${l.who} ${l.emit ? 'bubble--hot' : ''}`}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <span className="bubble__who">{l.who === 'agent' ? 'Agent' : 'Client'}</span>
                    <p>{l.t}</p>
                    {l.emit && <span className="bubble__spark">extracted</span>}
                  </motion.div>
                ))}
              </AnimatePresence>
              {!started && <div className="demo__placeholder">Scroll into view to play…</div>}
            </div>
            {done && (
              <button className="demo__replay" onClick={replay}>
                <Replay /> Replay
              </button>
            )}
          </div>

          {/* Extracted cards */}
          <div className="demo__cards">
            <ExtractCard
              title="Contact"
              icon={<IContact />}
              empty={!Object.keys(contact).length}
            >
              {Object.entries(contact).map(([k, v]) => (
                <Row key={k} k={k} v={v} />
              ))}
            </ExtractCard>

            <ExtractCard
              title="Property / Deal"
              icon={<IHome />}
              empty={!Object.keys(property).length}
            >
              {Object.entries(property).map(([k, v]) => (
                <Row key={k} k={k} v={v} />
              ))}
            </ExtractCard>

            <ExtractCard title="Follow-up tasks" icon={<ITask />} empty={!tasks.length}>
              <AnimatePresence>
                {tasks.map((t, i) => (
                  <motion.div
                    key={i}
                    className="taskrow"
                    initial={{ opacity: 0, x: 12 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <span className="taskrow__check" />
                    <span className="taskrow__text">{t.value}</span>
                    {t.due && <span className="taskrow__due">{t.due}</span>}
                  </motion.div>
                ))}
              </AnimatePresence>
            </ExtractCard>

            <ExtractCard title="Meeting to schedule" icon={<ICal />} empty={!meeting}>
              {meeting && (
                <motion.div
                  className="meetingrow"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div>
                    <div className="meetingrow__title">{meeting.value}</div>
                    <div className="meetingrow__when">{meeting.when}</div>
                  </div>
                  <span className="meetingrow__add">Add</span>
                </motion.div>
              )}
            </ExtractCard>
          </div>
        </div>
      </div>
    </section>
  )
}

function ExtractCard({ title, icon, empty, children }) {
  return (
    <motion.div
      className={`xcard glass ${empty ? 'is-empty' : 'is-filled'}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="xcard__head">
        <span className="xcard__icon">{icon}</span>
        <span className="xcard__title">{title}</span>
        <span className={`xcard__status ${empty ? '' : 'on'}`} />
      </div>
      <div className="xcard__body">
        {empty ? <div className="xcard__waiting">Waiting for data…</div> : children}
      </div>
    </motion.div>
  )
}

function Row({ k, v }) {
  return (
    <motion.div
      className="kv"
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span className="kv__k">{k}</span>
      <span className="kv__v">{v}</span>
    </motion.div>
  )
}

/* icons */
function Replay() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M3 12a9 9 0 109-9 9 9 0 00-7 3.3M3 3v4h4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IContact() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function IHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}
function ITask() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function ICal() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
