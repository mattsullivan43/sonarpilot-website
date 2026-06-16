import { useEffect, useRef } from 'react'

// Fixed full-viewport canvas: a slow drifting particle field with
// periodic sonar "pings" that send expanding rings across the scene.
// Lightweight, capped DPR, pauses when the tab is hidden.
export default function SonarBackground() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w, h, dpr
    let particles = []
    let rings = []
    let raf
    let last = 0
    let pingTimer = 0

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(90, Math.floor((w * h) / 17000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.5 + 0.1,
      }))
    }

    function ping() {
      // Emanate from a point biased toward the upper area (near hero).
      rings.push({
        x: w * (0.2 + Math.random() * 0.6),
        y: h * (0.1 + Math.random() * 0.5),
        r: 0,
        max: Math.max(w, h) * 0.7,
        life: 1,
      })
      if (rings.length > 6) rings.shift()
    }

    function draw(t) {
      const dt = Math.min(32, t - last) || 16
      last = t

      ctx.clearRect(0, 0, w, h)

      // Particles + connective lines
      for (const p of particles) {
        p.x += p.vx * dt * 0.06
        p.y += p.vy * dt * 0.06
        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(120, 170, 255, ${p.a * 0.5})`
        ctx.fill()
      }

      // Near-neighbor links (cheap O(n^2) on a small set)
      ctx.lineWidth = 1
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 13000) {
            const o = (1 - d2 / 13000) * 0.12
            ctx.strokeStyle = `rgba(60, 130, 246, ${o})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Sonar rings
      pingTimer += dt
      if (pingTimer > 2600) {
        pingTimer = 0
        ping()
      }
      for (const ring of rings) {
        ring.r += dt * 0.09
        ring.life = 1 - ring.r / ring.max
        if (ring.life <= 0) continue
        ctx.beginPath()
        ctx.arc(ring.x, ring.y, ring.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(56, 225, 255, ${ring.life * 0.18})`
        ctx.lineWidth = 1.5
        ctx.stroke()
      }
      rings = rings.filter((r) => r.life > 0)

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)

    if (!reduced) {
      ping()
      raf = requestAnimationFrame(draw)
    } else {
      // Static frame for reduced-motion users.
      draw(0)
      cancelAnimationFrame(raf)
    }

    const onVis = () => {
      if (document.hidden) cancelAnimationFrame(raf)
      else if (!reduced) raf = requestAnimationFrame(draw)
    }
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [])

  return (
    <div className="bg-fixed" aria-hidden="true">
      <div className="bg-mesh" />
      <canvas ref={ref} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
