import { Fragment, useEffect, useLayoutEffect, useRef, useState } from 'react'

function getSecondsUntilEight(now = new Date()) {
  const target = new Date(now)
  target.setHours(20, 0, 0, 0)
  if (target <= now) target.setDate(target.getDate() + 1)
  return Math.ceil((target.getTime() - now.getTime()) / 1000)
}

function getTimeParts(seconds) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60
  return [
    { label: 'Hours', value: String(hours).padStart(2, '0') },
    { label: 'Minutes', value: String(minutes).padStart(2, '0') },
    { label: 'Seconds', value: String(remainingSeconds).padStart(2, '0') },
  ]
}

function FlipDigit({ digit }) {
  const previousDigit = useRef(digit)
  const [flip, setFlip] = useState(null)

  useLayoutEffect(() => {
    const previous = previousDigit.current
    if (previous === digit) return undefined

    previousDigit.current = digit
    setFlip({ from: previous, to: digit })
    const timer = window.setTimeout(() => setFlip(null), 460)
    return () => window.clearTimeout(timer)
  }, [digit])

  const isFlipping = flip?.to === digit
  const restingDigit = isFlipping ? flip.from : digit

  return (
    <span className="flip-digit" aria-hidden="true">
      <span className="flip-digit-half flip-digit-top"><span>{restingDigit}</span></span>
      <span className="flip-digit-half flip-digit-bottom"><span>{restingDigit}</span></span>
      {isFlipping && (
        <span className="flip-digit-flap" key={flip.to}>
          <span className="flip-digit-flap-face flip-digit-flap-front"><span>{flip.from}</span></span>
          <span className="flip-digit-flap-face flip-digit-flap-back"><span>{flip.to}</span></span>
        </span>
      )}
      <span className="flip-digit-seam" />
    </span>
  )
}

export default function FlipCountdown() {
  const [secondsRemaining, setSecondsRemaining] = useState(() => getSecondsUntilEight())

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSecondsRemaining(getSecondsUntilEight())
    }, 1000)
    return () => window.clearInterval(timer)
  }, [])

  const timeParts = getTimeParts(secondsRemaining)
  const accessibleTime = timeParts.map(({ label, value }) => `${Number(value)} ${label.toLowerCase()}`).join(', ')

  return (
    <div className="hero-countdown">
      <p className="countdown-caption">Counting down to <strong>8:00 PM</strong></p>
      <div className="flip-clock" role="timer" aria-label={`Time until 8:00 PM: ${accessibleTime}`}>
        {timeParts.map(({ label, value }, groupIndex) => (
          <Fragment key={label}>
            {groupIndex > 0 && <span className="flip-clock-separator" aria-hidden="true">:</span>}
            <div className="flip-clock-group">
              <div className="flip-clock-digits" aria-hidden="true">
                {value.split('').map((digit, digitIndex) => (
                  <FlipDigit digit={digit} key={`${groupIndex}-${digitIndex}`} />
                ))}
              </div>
              <span className="flip-clock-unit">{label}</span>
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}
