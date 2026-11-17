import { ArrowDown, ArrowUpRight, Clock3, Leaf } from 'lucide-react'

export default function Hero({ special, onOrder, timeLeft, isAvailable }) {
  return (
    <section className="hero-section" id="home">
      <div className="hero-copy" data-reveal="left">
        <p className="eyebrow"><span className="eyebrow-line" /> A little something, cooked today</p>
        <h1>Good food.<br /><em>Good evening.</em></h1>
        <p className="hero-intro">
          There’s just one thing on the menu today, and it’s made to make your evening.
        </p>
        <div className="hero-special-name">
          <span className="today-pill"><span className="live-dot" /> Today’s special</span>
          <h2>{special.name}</h2>
          <p>{special.tagline}</p>
        </div>
        <div className="hero-actions">
          <button className="button button-red" type="button" onClick={onOrder}>
            Get today’s plate <ArrowUpRight size={17} strokeWidth={1.8} />
          </button>
          <a className="text-link" href="#how-it-works">A little about us <ArrowDown size={14} /></a>
        </div>
        <div className="hero-meta">
          <span><Clock3 size={15} /> At your door, {special.deliveryWindow}</span>
          <span><Leaf size={15} /> Cooked fresh, every day</span>
        </div>
      </div>
      <div className="hero-visual" data-reveal="right">
        <div className="hero-photo-wrap">
          <img className="hero-photo" src={special.image} alt={special.imageAlt} />
          <div className="photo-caption"><span>01 / TODAY’S PLATE</span><span>Made with a little more care</span></div>
        </div>
        <div className="hero-sticker" aria-label="Only one special each day">
          <span>ONE<br />GOOD<br />THING</span>
          <span className="sticker-star" aria-hidden="true">✳</span>
        </div>
        <div className={`availability-note${isAvailable ? '' : ' is-closed'}`}>
          <span className="availability-dot" />
          <span>{isAvailable ? 'Taking orders for today' : 'Today’s order window has closed'}</span>
          {isAvailable && <span className="cutoff-clock">· {timeLeft} left</span>}
        </div>
      </div>
    </section>
  )
}
