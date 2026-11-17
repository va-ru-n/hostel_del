export default function Footer({ onOrder }) {
  return (
    <footer className="site-footer">
      <div className="footer-main section-shell" data-reveal>
        <div className="footer-brand">
          <a className="brand brand-footer" href="#home"><img className="brand-logo" src="/hostelhome-logo.png" alt="HostelHome rice bowl and house logo" /></a>
          <p>One good thing on the menu.<br />A little more joy in your day.</p>
        </div>
        <div className="footer-note"><span>ALWAYS COOKED TODAY</span><p>Small batch. Big comfort.<br />See you around six.</p></div>
        <div className="footer-links"><span>HAVE A QUESTION?</span><p>Contact details coming soon.</p><button className="footer-order-link" type="button" onClick={onOrder}>Order today ↗</button></div>
      </div>
      <div className="footer-bottom section-shell"><span>© {new Date().getFullYear()} HostelHome. Made with care.</span><a href="#home">Back to the top ↑</a><span>One special. Every day.</span></div>
    </footer>
  )
}
