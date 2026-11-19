import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { galleryItems } from '../data';

export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const isOpen = activeIndex !== null;
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const close = () => setActiveIndex(null);
  const step = (direction: 1 | -1) => {
    setActiveIndex((current) => {
      if (current === null) return current;
      return (current + direction + galleryItems.length) % galleryItems.length;
    });
  };

  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        step(1);
      } else if (event.key === 'ArrowLeft') {
        event.preventDefault();
        step(-1);
      } else if (event.key === 'Tab') {
        const focusable = dialogRef.current?.querySelectorAll<HTMLElement>('button:not([disabled])');
        if (!focusable || focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [isOpen]);

  const active = activeIndex === null ? null : galleryItems[activeIndex];

  return (
    <section className="section gallery-section" id="gallery" aria-labelledby="gallery-title">
      <div className="wrap">
        <div className="section-head">
          <div>
            <p className="eyebrow"><span className="eyebrow-rule" aria-hidden="true" /> 06 / Gallery</p>
            <h2 id="gallery-title">The concept,<br /><span className="display-accent">frame by frame.</span></h2>
          </div>
          <p className="section-intro">
            A sample image set drawn from the supplied local photography. Select any frame to open the
            lightbox; use the arrow keys to move through the set and Escape to close.
          </p>
        </div>

        <ul className="gallery-grid">
          {galleryItems.map((item, index) => (
            <li key={item.src} className={`gallery-item gallery-${item.span}`}>
              <button
                type="button"
                className="gallery-trigger"
                ref={(element) => { triggerRefs.current[index] = element; }}
                onClick={() => setActiveIndex(index)}
                aria-label={`Open image ${index + 1} of ${galleryItems.length}: ${item.caption}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" decoding="async" width={1200} height={900} />
                <span className="gallery-zoom" aria-hidden="true"><Expand size={18} /></span>
                <span className="gallery-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      {isOpen && active && (
        <div
          className="lightbox-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) close();
          }}
        >
          <div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lightbox-title"
            ref={dialogRef}
          >
            <div className="lightbox-bar">
              <span id="lightbox-title">Sample gallery · image {(activeIndex ?? 0) + 1} of {galleryItems.length}</span>
              <button type="button" className="lightbox-close" ref={closeRef} onClick={close} aria-label="Close gallery">
                <X size={20} aria-hidden="true" />
              </button>
            </div>
            <div className="lightbox-stage">
              <button type="button" className="lightbox-nav" onClick={() => step(-1)} aria-label="Previous image">
                <ChevronLeft size={24} aria-hidden="true" />
              </button>
              <img src={active.src} alt={active.alt} />
              <button type="button" className="lightbox-nav" onClick={() => step(1)} aria-label="Next image">
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>
            <p className="lightbox-caption" aria-live="polite">{active.caption}</p>
            <p className="fine-print">Use ← → to move, Escape to close. All images are sample property photography supplied locally.</p>
          </div>
        </div>
      )}
    </section>
  );
}
