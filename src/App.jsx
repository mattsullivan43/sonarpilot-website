import useLenis from './hooks/useLenis'
import SonarBackground from './components/SonarBackground'
import ScrollProgress from './components/ScrollProgress'
import Nav from './components/Nav'
import Hero from './components/Hero'
import LogoMarquee from './components/LogoMarquee'
import DemoShowcase from './components/DemoShowcase'
import Features from './components/Features'
import Security from './components/Security'
import Steps from './components/Steps'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  useLenis()

  return (
    <>
      <SonarBackground />
      <div className="grain" />
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <LogoMarquee />
        <DemoShowcase />
        <Features />
        <Steps />
        <Security />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
