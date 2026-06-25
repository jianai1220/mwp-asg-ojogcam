import { useRef, useEffect } from 'react'
import Scene from './components/Scene.jsx'
import Nav from './components/Nav.jsx'

export default function App() {
  // scrollRef.current is normalized 0..1 across the full page height
  const scrollRef = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight
      scrollRef.current = max > 0 ? window.scrollY / max : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <Scene scrollRef={scrollRef} />
      <Nav />

      <main>
        <section id="hero" className="section">
          <div className="frame">
            <p className="frame__eyebrow">OjogCam — Smart Camera</p>
            <h1>Capture your<br/>view, with<br/>real-time focusing.</h1>
            <p className="lede">
              OjogCam turns your regular camera into an smarter system. Smart edge detection 
              for better manual focus navigation, auto-framing through object detection, and 
              connection to mobile app for remote controlling.

            </p>
            <div className="cta-row">
              <a className="btn btn--primary" href="#features">Explore the camera</a>
              <a className="btn btn--ghost" href="#contact">Talk to us</a>
            </div>
          </div>
          <div className="scroll-cue">
            <span className="scroll-cue__line" />
            Scroll to power on.
          </div>
        </section>

        <section id="about" className="section">
          <div className="frame">
            <p className="frame__eyebrow">The Idea</p>
            <h2>Built for better focusing and ease of use.</h2>
            <p>
              Most camera requires immediate shutter control or timer settings. 
              OjogCam reduces your fuss by providing remote controlling through
              Wi-Fi connection to the mobile app. The automated edge detection
              and real-time motion tracking supplies the user with a better manual
              focusing.
            </p>
          </div>
        </section>

        <section id="features" className="section">
          <div className="frame">
            <p className="frame__eyebrow">Capabilities</p>
            <h2>Four reasons to equip them.</h2>
            <ul className="feature-list">
              <li className="feature-item">
                <div className="feature-item__body">
                  <h3>AI processing unit</h3>
                  <p>Real-time eye tracking and motion tracking for better focus.</p>
                </div>
                <span className="feature-item__index">01</span>
              </li>
              <li className="feature-item">
                <div className="feature-item__body">
                  <h3>Tiltable LCD Touch Screen</h3>
                  <p>Easier self potrait and touch operations</p>
                </div>
                <span className="feature-item__index">02</span>
              </li>
              <li className="feature-item">
                <div className="feature-item__body">
                  <h3>HQ Capture</h3>
                  <p>Compatible with the KJJ Series Lenses.</p>
                </div>
                <span className="feature-item__index">03</span>
              </li>
              <li className="feature-item">
                <div className="feature-item__body">
                  <h3>Custom Functions</h3>
                  <p>Eight keys and controls to be assigned with different shooting functions.</p>
                </div>
                <span className="feature-item__index">04</span>
              </li>
            </ul>
          </div>
        </section>

        <section id="specs" className="section">
          <div className="frame">
            <p className="frame__eyebrow">Beyond the Lens</p>
            <h2>Compact, for something that does this much.</h2>
            <div className="spec-grid">
              <div className="spec-cell">
                <div className="spec-cell__label">Weight</div>
                <div className="spec-cell__value">483 g</div>
              </div>
              <div className="spec-cell">
                <div className="spec-cell__label">Battery</div>
                <div className="spec-cell__value">Approx 360-410 Shots (Image)<br/>Approx 70-75 Mins (Movie)</div>
              </div>
              <div className="spec-cell">
                <div className="spec-cell__label">Display</div>
                <div className="spec-cell__value">180° tiltable screen</div>
              </div>
              <div className="spec-cell">
                <div className="spec-cell__label">Storage</div>
                <div className="spec-cell__value">64 GB SD Card</div>
              </div>
              <div className="spec-cell">
                <div className="spec-cell__label">Connectivity</div>
                <div className="spec-cell__value">Wi-Fi, BT 4.1</div>
              </div>
              <div className="spec-cell">
                <div className="spec-cell__label">Focus</div>
                <div className="spec-cell__value">Fast Hybrid AF</div>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="frame">
            <p className="frame__eyebrow">Get In Touch</p>
            <h2>Be first on the frame.</h2>
            <p>Join the early access list and we'll reach out before public launch.</p>
            <a className="email-link" href="mailto:hello@ojogcam.tech">hello@ojogcam.tech →</a>

            <div className="footer-meta">
              <span>OjogCam © 2026</span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
