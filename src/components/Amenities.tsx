import { useMemo, useState } from 'react';
import {
  AirVent,
  Bike,
  Coffee,
  Droplets,
  Dumbbell,
  GlassWater,
  Lamp,
  Monitor,
  Moon,
  Presentation,
  Printer,
  Search,
  ShowerHead,
  Sparkles,
  Sun,
  Tv,
  Wifi,
} from 'lucide-react';
import { amenityCategories, amenities, type AmenityCategory } from '../data';

const iconMap: Record<string, typeof Wifi> = {
  wifi: Wifi,
  shower: ShowerHead,
  coffee: Coffee,
  tv: Tv,
  lamp: Lamp,
  moon: Moon,
  sun: Sun,
  glass: GlassWater,
  dumbbell: Dumbbell,
  bike: Bike,
  presentation: Presentation,
  printer: Printer,
  monitor: Monitor,
  sparkles: Sparkles,
  droplets: Droplets,
  air: AirVent,
};

export default function Amenities() {
  const [category, setCategory] = useState<AmenityCategory>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    return amenities.filter((item) => {
      const categoryMatch = category === 'All' || item.category === category;
      const textMatch = !term || `${item.label} ${item.description} ${item.category}`.toLowerCase().includes(term);
      return categoryMatch && textMatch;
    });
  }, [category, query]);

  const reset = () => {
    setCategory('All');
    setQuery('');
  };

  return (
    <section className="section amenities-section" id="amenities" aria-labelledby="amenities-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> 02 / Amenities</p>
            <h2 id="amenities-title">The useful things,<br /><span className="display-accent">done properly.</span></h2>
          </div>
          <p className="section-intro">
            A sample amenity list for the concept. Filter by where you would use it, or search the list.
            All inclusions and policies shown here are illustrative.
          </p>
        </div>

        <div className="amenity-layout">
          <div className="amenity-controls">
            <fieldset className="filter-group">
              <legend>Filter by area</legend>
              <div className="filter-chips">
                {amenityCategories.map((item) => (
                  <button
                    type="button"
                    key={item}
                    className={category === item ? 'chip active' : 'chip'}
                    aria-pressed={category === item}
                    onClick={() => setCategory(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>

            <label className="amenity-search">
              <span>Search amenities</span>
              <span className="search-field">
                <Search size={17} aria-hidden="true" />
                <input
                  type="search"
                  value={query}
                  placeholder="Try “desk”, “coffee” or “water”"
                  onChange={(event) => setQuery(event.target.value)}
                />
              </span>
            </label>

            <p className="result-count" aria-live="polite">
              Showing {filtered.length} {filtered.length === 1 ? 'amenity' : 'amenities'}
              {category !== 'All' ? ` in ${category}` : ''}
            </p>
            <p className="fine-print">Sample list — a real client must confirm every inclusion before launch.</p>
          </div>

          <div>
            {filtered.length > 0 ? (
              <ul className="amenity-grid">
                {filtered.map((item) => {
                  const Icon = iconMap[item.icon] ?? Sparkles;
                  return (
                    <li className="amenity-card" key={item.id}>
                      <span className="amenity-icon"><Icon size={21} aria-hidden="true" /></span>
                      <h3>{item.label}</h3>
                      <p>{item.description}</p>
                      <span className="amenity-category">{item.category}</span>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="empty-state" role="status">
                <Search size={28} aria-hidden="true" />
                <h3>No amenities match that search.</h3>
                <p>Try another word or clear the current filter to see the full sample list.</p>
                <button type="button" className="btn btn-quiet" onClick={reset}>Clear filters</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
