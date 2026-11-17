import { ArrowRight, CookingPot, DoorOpen, NotebookPen } from 'lucide-react'

const steps = [
  { icon: NotebookPen, number: '01', title: 'Place your order', text: 'Tell us your room, block and the best number to reach you.' },
  { icon: CookingPot, number: '02', title: 'We cook it fresh', text: 'Your one special is made in a small batch, just for today.' },
  { icon: DoorOpen, number: '03', title: 'We find your door', text: 'We’ll bring it right to you between 6 and 7 in the evening.' },
]

export default function HowItWorks() {
  return (
    <section className="process-section" id="how-it-works">
      <div className="process-inner section-shell">
        <div className="process-heading" data-reveal="left">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-line" /> The nice and easy bit</p>
          <h2>From our kitchen<br /><em>to your room.</em></h2>
          <p>Freshly cooked. Carefully packed.<br />Delivered to your door.</p>
        </div>
        <div className="process-steps" data-reveal="right">
          {steps.map(({ icon: Icon, number, title, text }, index) => (
            <div className="process-step" key={number}>
              <div className="step-top"><span>{number}</span><Icon size={22} strokeWidth={1.5} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              {index < steps.length - 1 && <ArrowRight className="step-arrow" size={16} />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
