import { useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, ChevronDown, Monitor, Printer, Presentation } from 'lucide-react';
import type { EnquiryDraft } from '../data';

interface BusinessProps {
  onEnquire: (draft?: EnquiryDraft) => void;
}

const faqs = [
  {
    id: 'faq-overnight',
    question: 'Can I use the meeting nook without an overnight stay?',
    answer: 'Sample answer: yes, subject to the concept’s imaginary house rules. A real client should replace this with their actual day-use policy, pricing and cancellation terms.',
  },
  {
    id: 'faq-cancel',
    question: 'What is the sample cancellation policy?',
    answer: 'Sample policy: cancel by 18:00 on the day before arrival. This is illustrative only and must be replaced with the hotel’s confirmed policy before launch.',
  },
  {
    id: 'faq-invoice',
    question: 'Can a business guest get an invoice?',
    answer: 'Sample answer: the front desk can issue an itemised folio on request. No payment is collected in this demo, and no real billing details are stored.',
  },
];

export default function Business({ onEnquire }: BusinessProps) {
  const [openFaq, setOpenFaq] = useState<string | null>(faqs[0].id);

  return (
    <section className="section business-section" id="business" aria-labelledby="business-title">
      <div className="wrap business-grid">
        <div className="business-copy">
          <p className="eyebrow eyebrow-light"><span className="eyebrow-rule" aria-hidden="true" /> 03 / Business stays</p>
          <h2 id="business-title">Work trips<br /><span className="display-accent">without the theatre.</span></h2>
          <p className="section-intro">
            A small hotel can make business travel feel unusually straightforward. This section describes
            a sample work-friendly setup — not confirmed services or real corporate rates.
          </p>

          <dl className="business-stats">
            <div><dt>Sample meeting capacity</dt><dd>06–12</dd></div>
            <div><dt>Demo staffed hours</dt><dd>09–17</dd></div>
            <div><dt>Sample notice</dt><dd>48h</dd></div>
          </dl>

          <ul className="business-features">
            <li><Presentation size={20} aria-hidden="true" /><span><strong>Bookable meeting nook</strong> — sample six-seat room off the lobby.</span></li>
            <li><Monitor size={20} aria-hidden="true" /><span><strong>Monitor loans</strong> — sample equipment subject to availability.</span></li>
            <li><Printer size={20} aria-hidden="true" /><span><strong>Print & scan</strong> — sample front-desk service during staffed hours.</span></li>
          </ul>

          <button type="button" className="btn btn-sand" onClick={() => onEnquire({ topic: 'Business stay' })}>
            Plan a business stay <ArrowUpRight size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="business-side">
          <figure className="business-figure">
            <img
              src="images/workspace.jpg"
              alt="Sample photograph of a workspace at the hotel concept"
              width={1100}
              height={734}
              loading="lazy"
              decoding="async"
            />
            <figcaption>Sample workspace photography</figcaption>
          </figure>

          <div className="faq-block">
            <h3>Business questions</h3>
            {faqs.map((faq) => {
              const open = openFaq === faq.id;
              return (
                <div className="faq-item" key={faq.id}>
                  <h4>
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={`${faq.id}-panel`}
                      onClick={() => setOpenFaq(open ? null : faq.id)}
                    >
                      <BriefcaseBusiness size={17} aria-hidden="true" />
                      <span>{faq.question}</span>
                      <ChevronDown className={open ? 'faq-chevron open' : 'faq-chevron'} size={18} aria-hidden="true" />
                    </button>
                  </h4>
                  <div id={`${faq.id}-panel`} className="faq-panel" hidden={!open}>
                    <p>{faq.answer}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
