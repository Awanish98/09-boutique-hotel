import { ArrowUpRight, BookOpen, Footprints, Landmark, Store } from 'lucide-react';
import { attractions, type EnquiryDraft } from '../data';

interface NearbyProps {
  onEnquire: (draft?: EnquiryDraft) => void;
}

const attractionIcons: Record<string, typeof Footprints> = {
  footprints: Footprints,
  landmark: Landmark,
  store: Store,
  book: BookOpen,
};

export default function Nearby({ onEnquire }: NearbyProps) {
  return (
    <section className="section nearby-section" id="nearby" aria-labelledby="nearby-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> 05 / Nearby</p>
            <h2 id="nearby-title">A city you can<br /><span className="display-accent">cover on foot.</span></h2>
          </div>
          <p className="section-intro">
            Four generic sample entries for a neighbourhood guide. Names, distances and descriptions are
            illustrative only and do not describe real places near a real property.
          </p>
        </div>

        <ul className="nearby-list">
          {attractions.map((item, index) => {
            const Icon = attractionIcons[item.icon] ?? Footprints;
            return (
              <li className="nearby-card" key={item.id}>
                <span className="nearby-number" aria-hidden="true">0{index + 1}</span>
                <img src={item.image} alt={item.alt} width={1100} height={1100} loading="lazy" decoding="async" />
                <div className="nearby-body">
                  <span className="nearby-kind"><Icon size={15} aria-hidden="true" /> {item.kind}</span>
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span className="nearby-distance">{item.distance}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="nearby-foot">
          <p className="fine-print">Illustrative sample guide — replace every entry with verified local information.</p>
          <button type="button" className="text-link" onClick={() => onEnquire({ topic: 'Nearby guide' })}>
            Request the sample neighbourhood brief <ArrowUpRight size={16} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
