import logo from '../assets/logo-mark.png'
import { MAILTO } from '../constants'

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
            <a href="#demo">Live demo</a>
            <a href="#features">Features</a>
            <a href="#security">Security</a>
          </div>
          <div className="footer__col">
            <h4>Get started</h4>
            <a href={MAILTO}>Start free</a>
            <a href="#top">Back to top</a>
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <a href="mailto:mjsullivan0910@gmail.com">Contact</a>
            <a href="/support">Support</a>
            <a href="/privacy">Privacy Policy</a>
            <a href="https://sonarpilot.co">sonarpilot.co</a>
          </div>
        </nav>
      </div>

      <div className="container footer__bottom">
        <span>© {year} SonarPilot · Matt Sullivan. All rights reserved.</span>
        <span className="footer__made">
          <a href="/privacy">Privacy Policy</a>
        </span>
      </div>
    </footer>
  )
}
