import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, Check, Clock3, LoaderCircle, Minus, Plus, X } from 'lucide-react'

const indianMobilePattern = '[6-9][0-9]{9}'

export default function OrderModal({ special, quantity, onQuantityChange, onClose }) {
  const [customer, setCustomer] = useState({ name: '', room: '', block: '', phone: '' })
  const [order, setOrder] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submitTimer = useRef(null)

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.classList.add('modal-open')
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
      window.clearTimeout(submitTimer.current)
    }
  }, [onClose])

  const total = special.price * quantity
  const update = (field) => (event) => setCustomer((current) => ({ ...current, [field]: event.target.value }))

  const handleSubmit = (event) => {
    event.preventDefault()
    const newOrder = {
      ...customer,
      item: special.name,
      quantity,
      total,
      deliveryWindow: special.deliveryWindow,
      id: `HH-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOrder(newOrder)
      return
    }

    setIsSubmitting(true)
    submitTimer.current = window.setTimeout(() => {
      setOrder(newOrder)
      setIsSubmitting(false)
    }, 420)
  }

  return (
    <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <section className="order-modal" role="dialog" aria-modal="true" aria-labelledby="order-title">
        <button className="modal-close" type="button" aria-label="Close order form" onClick={onClose}><X size={20} /></button>
        {order ? (
          <div className="confirmation" key={order.id}>
            <div className="confirmation-mark"><Check className="confirmation-check" size={25} /></div>
            <p className="eyebrow"><span className="eyebrow-line" /> That’s lovely</p>
            <h2 id="order-title">You’re all<br /><em>set, {order.name.split(' ')[0]}.</em></h2>
            <p className="confirmation-copy">We’ve got your order. Your evening just got a little tastier.</p>
            <div className="confirmation-card order-ticket">
              <div className="ticket-edge ticket-edge-top" aria-hidden="true" />
              <div className="ticket-header">
                <div className="ticket-brandline">
                  <img className="ticket-logo-image" src="/hostelhome-logo.png" alt="HostelHome" />
                  <span className="ticket-brand-caption">ONE SPECIAL<br />EVENING PASS</span>
                </div>
                <span className="ticket-status"><Check size={11} /> CONFIRMED</span>
              </div>
              <div className="ticket-guest">
                <div><span>MADE FOR</span><strong>{order.name}</strong></div>
                <div><span>ROOM / BLOCK</span><strong>{order.room} · {order.block}</strong></div>
                <span className="ticket-stamp"><b>✳</b>FRESH<br />TODAY</span>
              </div>
              <div className="ticket-perforation ticket-paper"><span>✳ &nbsp; READY FOR THE RIDE &nbsp; ✳</span></div>
              <div className="ticket-main ticket-paper">
                <div className="ticket-dish">
                  <span>TONIGHT’S SPECIAL</span>
                  <strong>{order.item}</strong>
                  <small>₹{special.price} per plate · freshly made</small>
                </div>
                <div className="ticket-quantity"><span>QTY</span><strong>{String(order.quantity).padStart(2, '0')}</strong></div>
              </div>
              <div className="ticket-route ticket-paper">
                <span><i className="route-dot route-kitchen" /> OUR KITCHEN</span>
                <i className="route-line" aria-hidden="true" />
                <span><i className="route-dot route-door" /> YOUR DOOR</span>
              </div>
              <div className="ticket-details ticket-paper">
                <div><span>DELIVERY WINDOW</span><strong>{order.deliveryWindow}</strong></div>
                <div><span>ORDER REFERENCE</span><strong>{order.id}</strong></div>
              </div>
              <div className="ticket-total"><span>YOUR TOTAL</span><strong>₹{order.total}<small>{order.quantity} {order.quantity === 1 ? 'plate' : 'plates'}</small></strong></div>
              <div className="ticket-barcode"><span className="ticket-barcode-lines" aria-hidden="true" /><span>KEEP THIS ORDER ID HANDY<br /><strong>{order.id}</strong></span></div>
              <div className="ticket-edge ticket-edge-bottom" aria-hidden="true" />
            </div>
            <p className="confirmation-footnote">We’ll call you if we need help finding your door.</p>
            <button className="button button-dark full-button" type="button" onClick={onClose}><ArrowLeft size={16} /> Back to home</button>
          </div>
        ) : (
          <>
            <div className="modal-heading">
              <p className="eyebrow"><span className="eyebrow-line" /> No sign-up, just supper</p>
              <h2 id="order-title">Let’s get it<br /><em>to your door.</em></h2>
              <p>Just the details we need to bring you today’s good thing.</p>
            </div>
            <form className="order-form" onSubmit={handleSubmit}>
              <div className="form-grid">
                <label className="field-label field-full">Your name
                  <input autoFocus autoComplete="name" name="name" required maxLength={70} value={customer.name} onChange={update('name')} placeholder="What should we call you?" />
                </label>
                <label className="field-label">Room number
                  <input name="room" required maxLength={12} value={customer.room} onChange={update('room')} placeholder="e.g. 204" />
                </label>
                <label className="field-label">Block
                  <select name="block" required value={customer.block} onChange={update('block')}>
                    <option value="" disabled>Choose block</option>
                    <option value="Block A">Block A</option>
                    <option value="Block B">Block B</option>
                  </select>
                </label>
                <div className="field-label field-full order-quantity-field">
                  <span className="order-quantity-label">Quantity</span>
                  <div className="order-quantity-row">
                    <div className="quantity-control" role="group" aria-label="Select quantity in plates">
                      <button type="button" aria-label="Decrease quantity" disabled={quantity <= 1 || isSubmitting} onClick={() => onQuantityChange(Math.max(1, quantity - 1))}><Minus size={15} /></button>
                      <output aria-live="polite" aria-atomic="true">{quantity}</output>
                      <button type="button" aria-label="Increase quantity" disabled={isSubmitting} onClick={() => onQuantityChange(quantity + 1)}><Plus size={15} /></button>
                    </div>
                    <span className="quantity-price-note">₹{special.price} per plate</span>
                  </div>
                </div>
                <label className="field-label field-full">Mobile number
                  <div className="phone-input"><span>+91</span><input autoComplete="tel-national" inputMode="numeric" name="phone" type="tel" required pattern={indianMobilePattern} minLength={10} maxLength={10} title="Enter a valid 10-digit Indian mobile number starting with 6, 7, 8 or 9" value={customer.phone} onChange={(event) => setCustomer((current) => ({ ...current, phone: event.target.value.replace(/\D/g, '').slice(0, 10) }))} placeholder="10-digit number" /></div>
                </label>
              </div>
              <div className="order-summary">
                <div className="summary-title"><span>Your evening order</span><span>Today only</span></div>
                <div className="summary-product">
                  <img src={special.image} alt="" />
                  <div><strong>{special.name}</strong><small>₹{special.price} per plate · freshly made</small></div>
                  <span className="summary-quantity">× {quantity}</span>
                </div>
                <div className="summary-line"><span>Order total</span><strong>₹{total}</strong></div>
                <div className="summary-delivery"><Clock3 size={14} /> Delivery between {special.deliveryWindow}</div>
              </div>
              <button className="button button-red full-button submit-order" type="submit" disabled={isSubmitting} aria-busy={isSubmitting}>
                {isSubmitting ? <><span>Placing your order</span><LoaderCircle className="order-spinner" size={16} /></> : <><span>Place my order</span><span>₹{total}</span></>}
              </button>
              <p className="privacy-note">No account. No fuss. Your details are only used for this delivery.</p>
            </form>
          </>
        )}
      </section>
    </div>
  )
}
