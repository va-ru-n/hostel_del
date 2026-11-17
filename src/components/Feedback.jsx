import { useState } from 'react'
import { Check, Star } from 'lucide-react'

export default function Feedback({ onToast }) {
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!rating) {
      onToast('Choose a star rating before sending your note.')
      return
    }
    setSubmitted(true)
    setName('')
    setMessage('')
    setRating(0)
    onToast('Thanks for taking a moment to leave us a note.')
  }

  return (
    <section className="feedback-section section-shell" id="feedback">
      <div className="feedback-intro" data-reveal="left">
        <p className="eyebrow"><span className="eyebrow-line" /> We’re listening</p>
        <h2>A good meal is<br /><em>a conversation.</em></h2>
        <p>Tell us what you think. Every little note helps us make tomorrow’s plate even better.</p>
        <div className="feedback-quote"><span>“</span><p>Cooked with care.<br />Shared with you.</p></div>
      </div>
      <form className="feedback-form" data-reveal="right" onSubmit={handleSubmit}>
        {submitted ? (
          <div className="feedback-success" role="status">
            <span className="success-check"><Check size={19} /></span>
            <h3>Note received.</h3>
            <p>Thank you for making our little kitchen better. We’ll take it to heart.</p>
            <button type="button" className="text-link" onClick={() => setSubmitted(false)}>Leave another note ↗</button>
          </div>
        ) : (
          <>
            <p className="feedback-form-title">A little note from you</p>
            <label className="field-label">Your name <span>(if you like)</span>
              <input autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Anonymous is lovely too" maxLength={60} />
            </label>
            <fieldset className="rating-field">
              <legend>Your rating</legend>
              <div className="rating-stars" onMouseLeave={() => setHoveredRating(0)}>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    className={`rating-star${star <= (hoveredRating || rating) ? ' is-active' : ''}`}
                    type="button"
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    aria-pressed={rating === star}
                    onMouseEnter={() => setHoveredRating(star)}
                    onFocus={() => setHoveredRating(star)}
                    onBlur={() => setHoveredRating(0)}
                    onClick={() => setRating(star)}
                  ><Star size={23} fill="currentColor" /></button>
                ))}
                <span className="rating-hint">{rating ? `${rating} out of 5` : 'Tap a star'}</span>
              </div>
            </fieldset>
            <label className="field-label">Your thoughts
              <textarea required minLength={3} maxLength={500} rows="3" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="The rice, the delivery, anything at all…" />
            </label>
            <button className="button button-dark feedback-submit" type="submit">Send a little note <span>↗</span></button>
          </>
        )}
      </form>
    </section>
  )
}
