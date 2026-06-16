import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import logo from '../assets/logo-mark.png'

const LINKS = [
  { label: 'How it works', href: '#how' },
  { label: 'Live demo', href: '#demo' },
  { label: 'Features', href: '#features' },
  { label: 'Security', href: '#security' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav__inner">
        <a href="#top" className="nav__brand">
          <img src={logo} alt="SonarPilot" className="nav__logo" />
          <span className="nav__name">
            Sonar<span className="nav__name-accent">Pilot</span>
          </span>
        </a>

        <nav className={`nav__links ${open ? 'is-open' : ''}`}>
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#cta" className="btn btn-primary nav__cta-mobile" onClick={() => setOpen(false)}>
            Get started
          </a>
        </nav>

        <div className="nav__actions">
          <a href="#cta" className="btn btn-primary nav__cta">
            Get started
          </a>
          <button
            className="nav__burger"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </motion.header>
  )
}
