import { motion } from 'framer-motion'

const FEATURES = [
  {
    cls: 'bento--wide',
    icon: <Brain />,
    title: 'Understands the whole conversation',
    body: 'Not keyword matching — SonarPilot reads context, intent, and commitments across the entire call, so subtle details and side-promises get captured too.',
    accent: true,
  },
  {
    icon: <Contact />,
    title: 'Contacts, auto-filled',
    body: 'Names, numbers, and roles are pulled straight from the dialogue into clean contact records.',
  },
  {
    icon: <Home />,
    title: 'Properties & deals',
    body: 'Addresses, budgets, and deal stage captured and linked to the right contact.',
  },
  {
    icon: <Task />,
    title: 'Tasks that write themselves',
    body: 'Every “I’ll send…”, “can you…”, and “let’s follow up” becomes a tracked task with a due date.',
  },
  {
    icon: <Cal />,
    title: 'Meetings ready to schedule',
    body: 'Tours, calls, and signings are detected with the proposed time, ready to drop on your calendar.',
  },
  {
    cls: 'bento--wide',
    icon: <Devices />,
    title: 'Synced securely, everywhere',
    body: 'Your workspace stays identical on phone, tablet, and desktop — encrypted in transit and at rest, tied to your account alone.',
    accent: true,
  },
]

export default function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <header className="section-head">
          <h2 className="section-title">
            Everything from the call,
            <br />
            <span className="grad-text">nothing left behind.</span>
          </h2>
          <p className="section-sub">
            SonarPilot turns the messy reality of phone conversations into the four things you
            actually need to act on.
          </p>
        </header>

        <div className="bento">
          {FEATURES.map((f, i) => (
            <motion.article
              key={i}
              className={`bento__card glass ${f.cls || ''} ${f.accent ? 'is-accent' : ''}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="bento__icon">{f.icon}</span>
              <h3 className="bento__title">{f.title}</h3>
              <p className="bento__body">{f.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Brain() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 4a3 3 0 00-3 3 3 3 0 00-1 5.8A3 3 0 008 18a3 3 0 004 1 3 3 0 004-1 3 3 0 003-5.2A3 3 0 0015 4a3 3 0 00-6 0z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M12 4v15" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  )
}
function Contact() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
function Home() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </svg>
  )
}
function Task() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.7" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function Cal() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
function Devices() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="2" y="5" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.7" />
      <rect x="16" y="9" width="6" height="11" rx="1.6" stroke="currentColor" strokeWidth="1.7" />
      <path d="M6 19h6" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  )
}
