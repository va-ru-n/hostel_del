import { Minus, Plus, ShoppingBag } from 'lucide-react'

export default function TodaysSpecial({ special, quantity, onQuantityChange, onOrder }) {
  return (
    <section className="special-section section-shell" id="special">
      <div className="section-heading" data-reveal>
        <div>
          <p className="eyebrow"><span className="eyebrow-line" /> The only thing cooking today</p>
          <h2>Today, on the table<span className="tomato-dot">.</span></h2>
        </div>
        <p className="section-aside">One special. Made fresh.<br />No menu-scrolling required.</p>
      </div>
      <article className="special-feature" data-reveal>
        <div className="special-image">
          <img src={special.image} alt={special.imageAlt} loading="lazy" />
          <span className="image-label">TODAY’S SPECIAL <span>✳</span></span>
        </div>
        <div className="special-details">
          <p className="dish-index">THE DAILY PLATE &nbsp; / &nbsp; 01</p>
          <h3>{special.name}</h3>
          <p className="special-description">{special.description}</p>
          <div className="dish-price"><span>₹</span>{special.price}<small> / plate</small></div>
          <div className="special-order-row">
            <div className="quantity-control" aria-label="Choose quantity">
              <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1} onClick={() => onQuantityChange(Math.max(1, quantity - 1))}><Minus size={15} /></button>
              <output aria-live="polite">{quantity}</output>
              <button type="button" aria-label="Increase quantity" onClick={() => onQuantityChange(quantity + 1)}><Plus size={15} /></button>
            </div>
            <button className="button button-red special-order-button" type="button" onClick={onOrder}>
              <ShoppingBag size={16} /> Order {quantity === 1 ? 'a plate' : `${quantity} plates`}
            </button>
          </div>
          <p className="fresh-note"><span>✳</span> Today’s rice is prepared in small batches. Just the way it should be.</p>
        </div>
      </article>
    </section>
  )
}
