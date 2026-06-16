import logo from '../assets/logo-mark.png'

export default function Footer() {
  const year = 2026
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <a href="#top" className="footer__logo">
            <img src={logo} alt="SonarPilot" />
            <span>
              Sonar<span className="nav__name-accent">Pilot</span>
            </span>
          </a>
          <p className="footer__tag">
            Real-estate calls in. Organized work out. Nothing slips through the cracks.
          </p>
        </div>

        <nav className="footer__cols">
          <div className="footer__col">
            <h4>Product</h4>
            <a href="#how">How it works</a>
            <a href="#demo">Live demo</a>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
          </div>
          <div className="footer__col">
            <h4>Get started</h4>
            <a href="#cta">Start free</a>
            <a href="#top">Back to top</a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="mailto:hello@sonarpilot.co">hello@sonarpilot.co</a>
            <a href="https://sonarpilot.co">sonarpilot.co</a>
          </div>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© {year} SonarPilot. All rights reserved.</span>
        <span className="footer__made">Made for people who live on the phone.</span>
      </div>
    </footer>
  )
}
