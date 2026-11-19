import { useState } from 'react';
import { ArrowUpRight, Copy, MapPin, Navigation } from 'lucide-react';
import { sampleAddress, type EnquiryDraft } from '../data';

interface LocationProps {
  onEnquire: (draft?: EnquiryDraft) => void;
}

export default function Location({ onEnquire }: LocationProps) {
  const [copyStatus, setCopyStatus] = useState('');

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(sampleAddress);
      setCopyStatus('Sample address copied to clipboard.');
    } catch {
      setCopyStatus('Clipboard unavailable — select the sample address above to copy it.');
    }
  };

  return (
    <section className="section location-section" id="location" aria-labelledby="location-title">
      <div className="wrap location-grid">
        <div className="location-copy">
          <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> 07 / Location</p>
          <h2 id="location-title">Find the<br /><span className="display-accent">quiet corner.</span></h2>
          <p className="section-intro">
            A map placeholder for the concept. The address, streets and pin below are illustrative — no real
            location or travel time is claimed.
          </p>

          <div className="address-card">
            <MapPin size={20} aria-hidden="true" />
            <div>
              <span className="sample-label">Sample address</span>
              <p>{sampleAddress}</p>
            </div>
          </div>

          <ul className="location-notes">
            <li><Navigation size={17} aria-hidden="true" /> Sample note: nearest transit stop would be confirmed by the client.</li>
            <li><MapPin size={17} aria-hidden="true" /> Sample note: step-free access details must be verified before launch.</li>
          </ul>

          <div className="location-actions">
            <button type="button" className="btn btn-primary" onClick={copyAddress}>
              <Copy size={17} aria-hidden="true" /> Copy sample address
            </button>
            <button
              type="button"
              className="btn btn-quiet"
              onClick={() => onEnquire({
                topic: 'General enquiry',
                message: 'Please send the sample location and access details for this concept.',
              })}
            >
              Enquire about access <ArrowUpRight size={17} aria-hidden="true" />
            </button>
          </div>
          <p className="copy-status" role="status" aria-live="polite">{copyStatus}</p>
        </div>

        <div className="map-placeholder" role="img" aria-label="Illustrative map placeholder with a central marker. No real location data is shown.">
          <div className="map-grid" aria-hidden="true" />
          <div className="map-road map-road-a" aria-hidden="true" />
          <div className="map-road map-road-b" aria-hidden="true" />
          <div className="map-road map-road-c" aria-hidden="true" />
          <div className="map-block map-block-a" aria-hidden="true" />
          <div className="map-block map-block-b" aria-hidden="true" />
          <div className="map-block map-block-c" aria-hidden="true" />
          <div className="map-pin" aria-hidden="true"><MapPin size={26} /></div>
          <div className="map-label">
            <span className="sample-label">Map placeholder</span>
            <strong>Meridian Lane / Old Quarter</strong>
            <span>Illustrative only · replace with client map</span>
          </div>
          <div className="map-compass" aria-hidden="true">N ↑</div>
        </div>
      </div>
    </section>
  );
}
