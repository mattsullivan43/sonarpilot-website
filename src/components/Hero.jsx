import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import logo from '../assets/logo-mark.png'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
}
const item = {
  hidden: { y: 26, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { duration: 0.8, ease } },
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const yText = useTransform(scrollYProgress, [0, 1], [0, -120])
  const yArt = useTransform(scrollYProgress, [0, 1], [0, 90])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])

  return (
    <section className="hero" id="top" ref={ref}>
      <span className="hero__anchor" id="hero" />
      <motion.div className="container hero__inner" style={{ opacity }}>
        <motion.div
          className="hero__copy"
          style={{ y: yText }}
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <span className="eyebrow">
              <span className="dot" /> Built for real-estate operators
            </span>
          </motion.div>

          <motion.h1 className="hero__title" variants={item}>
            Turn every call into
            <br />
            <span className="grad-text">organized work.</span>
          </motion.h1>

          <motion.p className="hero__sub" variants={item}>
            SonarPilot listens to your real-estate calls and automatically extracts the
            contact, the property or deal, your follow-up tasks, and any meeting to
            schedule — so nothing from a conversation ever slips through the cracks.
          </motion.p>

          <motion.div className="hero__actions" variants={item}>
            <a href="#cta" className="btn btn-primary">
              Start free
              <Arrow />
            </a>
            <a href="#demo" className="btn btn-ghost">
              <Play /> See it work
            </a>
          </motion.div>

          <motion.div className="hero__meta" variants={item}>
            <Check /> Recording or transcript&nbsp;&nbsp;·&nbsp;&nbsp;<Check /> Synced across
            devices&nbsp;&nbsp;·&nbsp;&nbsp;<Check /> Encrypted by default
          </motion.div>
        </motion.div>

        <motion.div className="hero__art" style={{ y: yArt, scale }}>
          <SonarEmblem />
          <FloatingCards />
        </motion.div>
      </motion.div>

      <div className="hero__scrollcue" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__mouse">
          <div className="hero__wheel" />
        </div>
      </div>
    </section>
  )
}

function SonarEmblem() {
  return (
    <div className="emblem">
      <div className="emblem__glow" />
      {[0, 1, 2].map((i) => (
        <span key={i} className="emblem__ring" style={{ animationDelay: `${i * 1}s` }} />
      ))}
      <img src={logo} alt="" className="emblem__logo" />
    </div>
  )
}

function FloatingCards() {
  const cards = [
    { cls: 'fc-1', icon: <IconContact />, label: 'Contact', val: 'Maria Alvarez' },
    { cls: 'fc-2', icon: <IconHome />, label: 'Property', val: '1420 Oak Ridge Dr' },
    { cls: 'fc-3', icon: <IconCheck />, label: 'Task', val: 'Send comps by Fri' },
    { cls: 'fc-4', icon: <IconCal />, label: 'Meeting', val: 'Tour · Tue 3:00 PM' },
  ]
  return (
    <>
      {cards.map((c, i) => (
        <motion.div
          key={c.cls}
          className={`floatcard glass ${c.cls}`}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.8 + i * 0.18, duration: 0.7, ease }}
        >
          <span className="floatcard__icon">{c.icon}</span>
          <div>
            <div className="floatcard__label">{c.label}</div>
            <div className="floatcard__val">{c.val}</div>
          </div>
        </motion.div>
      ))}
    </>
  )
}

/* --- inline icons --- */
function Arrow() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function Play() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7z" />
    </svg>
  )
}
function Check() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M20 6L9 17l-5-5" stroke="var(--cyan)" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconContact() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
function IconHome() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M4 11l8-6 8 6v8a1 1 0 01-1 1h-4v-6h-6v6H5a1 1 0 01-1-1z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  )
}
function IconCheck() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M8 12l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
function IconCal() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="5" width="16" height="15" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M4 9h16M8 3v4M16 3v4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}
