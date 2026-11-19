import { useState, type FormEvent } from 'react';
import { ArrowRight, CalendarDays, Users } from 'lucide-react';
import type { EnquiryDraft } from '../data';
import { todayISO } from '../utils';

interface HeroProps {
  onEnquire: (draft?: EnquiryDraft) => void;
}

export default function Hero({ onEnquire }: HeroProps) {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [adults, setAdults] = useState('2');
  const [error, setError] = useState('');
  const minDate = todayISO();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!checkIn || !checkOut) {
      setError('Choose both a check-in and a check-out date.');
      return;
    }
    if (checkOut <= checkIn) {
      setError('Check-out must be after check-in.');
      return;
    }
    setError('');
    onEnquire({ checkIn, checkOut, adults, topic: 'Leisure stay' });
  };

  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero-shell">
        <div className="hero-copy">
          <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> Urban boutique stay · demo concept</p>
          <h1 id="hero-title">
            City days,<br />
            <span className="display-accent">quiet nights.</span>
          </h1>
          <p className="hero-lede">
            THE MERIDIAN INN is a design-led urban hotel concept: compact rooms, honest sample rates,
            and a lobby built around good coffee and better conversation.
          </p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#rooms">
              Explore rooms <ArrowRight size={18} aria-hidden="true" />
            </a>
            <button type="button" className="btn btn-quiet" onClick={() => onEnquire({ topic: 'Leisure stay' })}>
              Plan a stay
            </button>
          </div>

          <form className="stay-finder" onSubmit={handleSubmit} noValidate aria-label="Check sample dates">
            <div className="stay-finder-head">
              <CalendarDays size={17} aria-hidden="true" />
              <span>Check sample dates</span>
              <span className="stay-finder-note">No availability is claimed</span>
            </div>
            <div className="stay-finder-fields">
              <label>
                <span>Check in</span>
                <input type="date" value={checkIn} min={minDate} onChange={(e) => setCheckIn(e.target.value)} />
              </label>
              <label>
                <span>Check out</span>
                <input
                  type="date"
                  value={checkOut}
                  min={checkIn || minDate}
                  onChange={(e) => setCheckOut(e.target.value)}
                  aria-invalid={Boolean(error)}
                  aria-describedby={error ? 'finder-error' : undefined}
                />
              </label>
              <label>
                <span><Users size={14} aria-hidden="true" /> Guests</span>
                <select value={adults} onChange={(e) => setAdults(e.target.value)}>
                  {[1, 2, 3, 4, 5, 6].map((count) => (
                    <option value={count} key={count}>{count} {count === 1 ? 'guest' : 'guests'}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="btn btn-sand">Check dates</button>
            </div>
            {error && <p className="form-error finder-error" id="finder-error" role="alert">{error}</p>}
          </form>
        </div>

        <div className="hero-visual">
          <div className="hero-image-frame">
            <img
              src="images/hero.jpg"
              alt="Sample architectural photograph representing The Meridian Inn"
              width={1800}
              height={1200}
              fetchPriority="high"
            />
          </div>
          <div className="hero-photo-label">Sample property photography</div>
          <div className="hero-side-index" aria-hidden="true">01 / 08 — THE CITY EDITION</div>
          <div className="hero-ink-card">
            <span className="hero-ink-number">24</span>
            <span>sample keys<br />in this concept</span>
          </div>
        </div>
      </div>

      <div className="hero-bottom-rule" aria-hidden="true">
        <span>Slate blue</span><span>Sand</span><span>Warm white</span><span>Built for walking</span>
      </div>
    </section>
  );
}
