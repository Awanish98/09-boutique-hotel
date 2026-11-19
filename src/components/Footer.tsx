import { ArrowUpRight, Mail, MessageCircle } from 'lucide-react';
import { navItems, sampleEmail, whatsappHref } from '../data';

interface FooterProps {
  onEnquire: () => void;
}

export default function Footer({ onEnquire }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <span className="brand-mark brand-mark-large" aria-hidden="true">MI</span>
          <p className="footer-wordmark">THE MERIDIAN INN</p>
          <p className="footer-story">
            A sample urban boutique hotel concept. Slate blue, sand and warm white; compact rooms and a
            quieter way to move through the city.
          </p>
          <button type="button" className="btn btn-sand" onClick={onEnquire}>
            Start an enquiry <ArrowUpRight size={17} aria-hidden="true" />
          </button>
        </div>

        <nav className="footer-nav" aria-label="Footer navigation">
          <h2>Explore</h2>
          <ul>
            {navItems.map((item) => <li key={item.id}><a href={`#${item.id}`}>{item.label}</a></li>)}
          </ul>
        </nav>

        <div className="footer-contact">
          <h2>Contact</h2>
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Demo WhatsApp link — replace with client number"
          >
            <MessageCircle size={17} aria-hidden="true" /> WhatsApp — demo link
          </a>
          <a href={`mailto:${sampleEmail}`} aria-label="Sample email address — replace with client address">
            <Mail size={17} aria-hidden="true" /> {sampleEmail}
          </a>
          <p className="fine-print">Sample address: 14 Meridian Lane, Old Quarter, [City]</p>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <p>© 2026 THE MERIDIAN INN · Demo concept — sample information.</p>
        <p>Rates, availability, policies, photography captions and contact details are placeholders.</p>
        <a href="#home">Back to top ↑</a>
      </div>
    </footer>
  );
}
