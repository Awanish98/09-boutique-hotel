import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import { diningPeriods, type EnquiryDraft } from '../data';

interface DiningProps {
  onEnquire: (draft?: EnquiryDraft) => void;
}

export default function Dining({ onEnquire }: DiningProps) {
  const [active, setActive] = useState(diningPeriods[0].id);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight'
      ? (index + 1) % diningPeriods.length
      : (index - 1 + diningPeriods.length) % diningPeriods.length;
    const next = diningPeriods[nextIndex].id;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section dining-section" id="dining" aria-labelledby="dining-title">
      <div className="wrap dining-grid">
        <figure className="dining-figure">
          <img
            src="images/dining.jpg"
            alt="Sample photograph of the hotel dining room"
            width={1100}
            height={734}
            loading="lazy"
            decoding="async"
          />
          <figcaption><span className="sample-label">Sample dining photography</span></figcaption>
        </figure>

        <div className="dining-copy">
          <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> 04 / Dining</p>
          <h2 id="dining-title">A short menu,<br /><span className="display-accent">done with care.</span></h2>
          <p className="section-intro">
            The concept’s food and drink offer is deliberately small: good coffee, a few honest plates and
            a place to sit without rushing. Prices and hours below are samples.
          </p>

          <div className="dining-tabs" role="tablist" aria-label="Sample dining menus">
            {diningPeriods.map((period, index) => (
              <button
                key={period.id}
                type="button"
                role="tab"
                id={`dining-tab-${period.id}`}
                aria-controls={`dining-panel-${period.id}`}
                aria-selected={active === period.id}
                tabIndex={active === period.id ? 0 : -1}
                className={active === period.id ? 'dining-tab active' : 'dining-tab'}
                ref={(element) => { tabRefs.current[period.id] = element; }}
                onClick={() => setActive(period.id)}
                onKeyDown={(event) => onKeyDown(event, index)}
              >
                {period.label}
              </button>
            ))}
          </div>

          {diningPeriods.map((period) => (
            <div
              key={period.id}
              role="tabpanel"
              id={`dining-panel-${period.id}`}
              aria-labelledby={`dining-tab-${period.id}`}
              hidden={active !== period.id}
              tabIndex={0}
              className="dining-panel"
            >
              <p className="dining-hours"><Clock3 size={16} aria-hidden="true" /> {period.hours}</p>
              <p className="fine-print">{period.note}</p>
              <ul className="menu-list">
                {period.items.map((item) => (
                  <li key={item.name}>
                    <div><strong>{item.name}</strong><span>{item.description}</span></div>
                    <span className="menu-price">{item.price}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <button type="button" className="btn btn-primary" onClick={() => onEnquire({ topic: 'Dining' })}>
            Ask about dining <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
