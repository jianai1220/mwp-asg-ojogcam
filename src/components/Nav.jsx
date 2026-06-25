export default function Nav() {
  return (
    <nav className="nav">
      <div className="nav__mark">
        OjogCam
        <span className="nav__dot" />
      </div>
      <ul className="nav__links">
        <li><a href="#hero">Home</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#specs">Specs</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
    </nav>
  )
}
