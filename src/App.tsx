import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Rooms from './components/Rooms';
import Amenities from './components/Amenities';
import Business from './components/Business';
import Dining from './components/Dining';
import Nearby from './components/Nearby';
import Gallery from './components/Gallery';
import Location from './components/Location';
import EnquiryForm from './components/EnquiryForm';
import Footer from './components/Footer';
import type { EnquiryDraft } from './data';
import { scrollToId } from './utils';

export default function App() {
  const [draft, setDraft] = useState<EnquiryDraft>({});
  const [draftNonce, setDraftNonce] = useState(0);

  const openEnquiry = (nextDraft: EnquiryDraft = {}) => {
    setDraft(nextDraft);
    setDraftNonce((value) => value + 1);
    scrollToId('contact');
  };

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <Header onEnquire={() => openEnquiry({ topic: 'General enquiry' })} />
      <main id="main-content">
        <Hero onEnquire={openEnquiry} />
        <Rooms onEnquire={openEnquiry} />
        <Amenities />
        <Business onEnquire={openEnquiry} />
        <Dining onEnquire={openEnquiry} />
        <Nearby onEnquire={openEnquiry} />
        <Gallery />
        <Location onEnquire={openEnquiry} />
        <EnquiryForm draft={draft} draftNonce={draftNonce} />
      </main>
      <Footer onEnquire={() => openEnquiry({ topic: 'General enquiry' })} />
    </>
  );
}
