import { useRef, useState, type KeyboardEvent } from 'react';
import { ArrowRight, Check, Minus } from 'lucide-react';
import { rooms, type EnquiryDraft } from '../data';
import { sampleCurrency } from '../utils';

interface RoomsProps {
  onEnquire: (draft?: EnquiryDraft) => void;
}

type TabId = 'cards' | 'compare';
const tabs: { id: TabId; label: string }[] = [
  { id: 'cards', label: 'Room cards' },
  { id: 'compare', label: 'Compare rooms' },
];

const FEES = { levyPerNight: 6, extraGuestPerNight: 25, includedGuests: 2 };

function BooleanCell({ value }: { value: boolean }) {
  return value ? (
    <span className="bool yes"><Check size={18} aria-hidden="true" /><span className="visually-hidden">Included</span></span>
  ) : (
    <span className="bool no"><Minus size={18} aria-hidden="true" /><span className="visually-hidden">Not included</span></span>
  );
}

export default function Rooms({ onEnquire }: RoomsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('cards');
  const [roomId, setRoomId] = useState(rooms[0].id);
  const [nights, setNights] = useState(2);
  const [adults, setAdults] = useState(2);
  const tabRefs = useRef<Record<TabId, HTMLButtonElement | null>>({ cards: null, compare: null });

  const room = rooms.find((item) => item.id === roomId) ?? rooms[0];
  const extraGuests = Math.max(0, adults - FEES.includedGuests);
  const roomTotal = room.sampleRate * nights;
  const levyTotal = FEES.levyPerNight * nights;
  const guestTotal = FEES.extraGuestPerNight * extraGuests * nights;
  const total = roomTotal + levyTotal + guestTotal;

  const onTabKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
    event.preventDefault();
    const nextIndex = event.key === 'ArrowRight' ? (index + 1) % tabs.length : (index - 1 + tabs.length) % tabs.length;
    const next = tabs[nextIndex].id;
    setActiveTab(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section className="section rooms-section" id="rooms" aria-labelledby="rooms-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> 01 / Rooms</p>
            <h2 id="rooms-title">Small footprint.<br /><span className="display-accent">Considered space.</span></h2>
          </div>
          <p className="section-intro">
            Three sample room types, each drawn with the same simple idea: a good bed, a usable desk and
            nowhere wasted. Every rate below is a sample rate, not a live quote.
          </p>
        </div>

        <div className="tabs" role="tablist" aria-label="Choose how to view rooms">
          {tabs.map((tab, index) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`room-tab-${tab.id}`}
              aria-controls={`room-panel-${tab.id}`}
              aria-selected={activeTab === tab.id}
              tabIndex={activeTab === tab.id ? 0 : -1}
              className={activeTab === tab.id ? 'tab active' : 'tab'}
              ref={(element) => { tabRefs.current[tab.id] = element; }}
              onClick={() => setActiveTab(tab.id)}
              onKeyDown={(event) => onTabKeyDown(event, index)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id="room-panel-cards"
          aria-labelledby="room-tab-cards"
          hidden={activeTab !== 'cards'}
          tabIndex={0}
        >
          <div className="room-grid">
            {rooms.map((item, index) => (
              <article className="room-card" key={item.id}>
                <div className="room-image">
                  <img src={item.image} alt={item.alt} width={1200} height={1200} loading="lazy" decoding="async" />
                  <span className="room-index">0{index + 1}</span>
                </div>
                <div className="room-card-body">
                  <h3>{item.name}</h3>
                  <p className="room-tagline">{item.tagline}</p>
                  <dl className="room-meta">
                    <div><dt>Size</dt><dd>{item.size}</dd></div>
                    <div><dt>Sleeps</dt><dd>{item.sleeps}</dd></div>
                    <div><dt>Bed</dt><dd>{item.bed}</dd></div>
                  </dl>
                  <ul className="tag-list">
                    {item.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <div className="room-card-foot">
                    <p><span className="sample-label">Sample rate</span><strong>{sampleCurrency(item.sampleRate)}</strong><span> / night</span></p>
                    <button
                      type="button"
                      className="text-link"
                      onClick={() => onEnquire({ room: item.name, topic: 'Leisure stay' })}
                    >
                      Enquire <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div
          role="tabpanel"
          id="room-panel-compare"
          aria-labelledby="room-tab-compare"
          hidden={activeTab !== 'compare'}
          tabIndex={0}
        >
          <div className="compare-wrap">
            <table className="compare-table">
              <caption>Room comparison — all figures and inclusions are sample values, not confirmed availability.</caption>
              <thead>
                <tr>
                  <th scope="col">At a glance</th>
                  {rooms.map((item) => (
                    <th scope="col" key={item.id}>
                      <span>{item.name}</span>
                      <button type="button" className="text-link" onClick={() => onEnquire({ room: item.name, topic: 'Leisure stay' })}>
                        Enquire <ArrowRight size={14} aria-hidden="true" />
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr><th scope="row">Room size</th>{rooms.map((item) => <td key={item.id}>{item.size}</td>)}</tr>
                <tr><th scope="row">Sleeps</th>{rooms.map((item) => <td key={item.id}>{item.sleeps} guests</td>)}</tr>
                <tr><th scope="row">Bed</th>{rooms.map((item) => <td key={item.id}>{item.bed}</td>)}</tr>
                <tr><th scope="row">Aspect</th>{rooms.map((item) => <td key={item.id}>{item.view}</td>)}</tr>
                <tr><th scope="row">Work desk</th>{rooms.map((item) => <td key={item.id}><BooleanCell value={item.compare.desk} /></td>)}</tr>
                <tr><th scope="row">Rainfall shower</th>{rooms.map((item) => <td key={item.id}><BooleanCell value={item.compare.shower} /></td>)}</tr>
                <tr><th scope="row">Espresso bar</th>{rooms.map((item) => <td key={item.id}><BooleanCell value={item.compare.espresso} /></td>)}</tr>
                <tr><th scope="row">Sofa bed</th>{rooms.map((item) => <td key={item.id}><BooleanCell value={item.compare.sofa} /></td>)}</tr>
                <tr className="rate-row"><th scope="row">Sample rate / night</th>{rooms.map((item) => <td key={item.id}>{sampleCurrency(item.sampleRate)}</td>)}</tr>
              </tbody>
            </table>
          </div>

          <div className="estimate">
            <div className="estimate-copy">
              <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> Sample stay estimate</p>
              <h3>Work the numbers before you enquire.</h3>
              <p>Illustrative only. This is a calculation from labelled sample values, not a reservation or a price guarantee.</p>
            </div>
            <div className="estimate-tool">
              <div className="estimate-inputs">
                <label>
                  <span>Room</span>
                  <select value={roomId} onChange={(event) => setRoomId(event.target.value)}>
                    {rooms.map((item) => <option value={item.id} key={item.id}>{item.name}</option>)}
                  </select>
                </label>
                <label>
                  <span>Nights</span>
                  <input
                    type="number"
                    min={1}
                    max={7}
                    value={nights}
                    onChange={(event) => setNights(Math.min(7, Math.max(1, Number(event.target.value) || 1)))}
                  />
                </label>
                <label>
                  <span>Adults</span>
                  <select value={adults} onChange={(event) => setAdults(Number(event.target.value))}>
                    {[1, 2, 3, 4, 5, 6].map((count) => <option value={count} key={count}>{count}</option>)}
                  </select>
                </label>
              </div>
              <div className="estimate-formula" aria-live="polite">
                <p><span>Room rate</span><span>{sampleCurrency(room.sampleRate)} × {nights} {nights === 1 ? 'night' : 'nights'} = {sampleCurrency(roomTotal)}</span></p>
                <p><span>Sample city levy</span><span>{sampleCurrency(FEES.levyPerNight)} × {nights} = {sampleCurrency(levyTotal)}</span></p>
                <p><span>Sample extra-guest fee</span><span>{sampleCurrency(FEES.extraGuestPerNight)} × {extraGuests} extra × {nights} = {sampleCurrency(guestTotal)}</span></p>
                <p className="estimate-total"><span>Illustrative total</span><strong>{sampleCurrency(total)}</strong></p>
              </div>
              <p className="fine-print">Sample policy: two adults included; {sampleCurrency(FEES.extraGuestPerNight)} per extra adult per night; {sampleCurrency(FEES.levyPerNight)} nightly sample levy. Taxes and real availability are not included.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
