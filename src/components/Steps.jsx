import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const STATS = [
  { to: 4, suffix: '', label: 'Things extracted from every call', sub: 'contact · property · tasks · meeting' },
  { to: 0, suffix: '', label: 'Manual notes required', sub: 'it writes them for you', zero: true },
  { to: 100, suffix: '%', label: 'Synced across your devices', sub: 'encrypted, end to end' },
  { to: 30, suffix: 's', label: 'From upload to organized', sub: 'typical processing time' },
]

export default function Steps() {
  return (
    <section className="section stats">
      <div className="container">
        <div className="stats__grid">
          {STATS.map((s, i) => (
            <Stat key={i} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Stat({ to, suffix, label, sub, zero, delay }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (zero) {
      setVal(0)
      return
    }
    let raf
    const dur = 1200
    let start
    const tick = (t) => {
      if (!start) start = t
      const p = Math.min(1, (t - start) / dur)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.round(eased * to))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, zero])

  return (
    <motion.div
      ref={ref}
      className="stat"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
    >
      <div className="stat__num grad-text">
        {zero ? '0' : val}
        {suffix}
      </div>
      <div className="stat__label">{label}</div>
      <div className="stat__sub">{sub}</div>
    </motion.div>
  )
}
