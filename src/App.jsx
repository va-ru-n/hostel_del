import { useCallback, useEffect, useState } from 'react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import TodaysSpecial from './components/TodaysSpecial.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import OrderModal from './components/OrderModal.jsx'
import Feedback from './components/Feedback.jsx'
import Footer from './components/Footer.jsx'
import { todaysSpecial } from './data/menu.js'

function getTimeLeft(cutoffTime) {
  const [hours, minutes] = cutoffTime.split(':').map(Number)
  const cutoff = new Date()
  cutoff.setHours(hours, minutes, 0, 0)
  const difference = cutoff.getTime() - Date.now()
  if (difference <= 0) return { available: false, text: '00:00:00' }
  const seconds = Math.floor(difference / 1000)
  const hh = String(Math.floor(seconds / 3600)).padStart(2, '0')
  const mm = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0')
  const ss = String(seconds % 60).padStart(2, '0')
  return { available: true, text: `${hh}:${mm}:${ss}` }
}

export default function App() {
  const [quantity, setQuantity] = useState(1)
  const [orderOpen, setOrderOpen] = useState(false)
  const [timeLeft, setTimeLeft] = useState(() => getTimeLeft(todaysSpecial.cutoffTime))
  const [toast, setToast] = useState('')
  const closeOrder = useCallback(() => setOrderOpen(false), [])

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft(todaysSpecial.cutoffTime)), 1000)
    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) return undefined

    document.body.classList.add('motion-ready')
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -24px 0px' })

    document.querySelectorAll('[data-reveal]').forEach((element, index) => {
      element.style.setProperty('--reveal-delay', `${(index % 3) * 90}ms`)
      observer.observe(element)
    })

    return () => {
      observer.disconnect()
      document.body.classList.remove('motion-ready')
    }
  }, [])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 3600)
    return () => window.clearTimeout(timer)
  }, [toast])

  const openOrder = () => {
    if (!timeLeft.available) {
      setToast('Today’s ordering window has closed. Come back tomorrow for a new special.')
      return
    }
    setOrderOpen(true)
  }

  return (
    <>
      <Navbar onOrder={openOrder} />
      <main>
        <Hero special={todaysSpecial} onOrder={openOrder} />
        <div className="marquee-strip" aria-label="One special, made fresh every day">
          <div className="marquee-content" aria-hidden="true">
            {[0, 1, 2, 3].map((item) => <span key={item}>ONE SPECIAL <b>✳</b> MADE FRESH <b>✳</b> DELIVERED WITH CARE <b>✳</b></span>)}
          </div>
        </div>
        <TodaysSpecial special={todaysSpecial} quantity={quantity} onQuantityChange={setQuantity} onOrder={openOrder} />
        <HowItWorks />
        <Feedback onToast={setToast} />
      </main>
      <Footer onOrder={openOrder} />
      <button className="mobile-order-float" type="button" onClick={openOrder} aria-label={`Order today's ${todaysSpecial.name}`}>
        <span>Today’s plate · ₹{todaysSpecial.price}</span><span>Order now ↗</span>
      </button>
      {orderOpen && <OrderModal key="order-form" special={todaysSpecial} quantity={quantity} onQuantityChange={setQuantity} onClose={closeOrder} />}
      {toast && <div className="toast-message" role="status" aria-live="polite">{toast}</div>}
    </>
  )
}
