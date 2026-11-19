import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navItems } from '../data';

interface HeaderProps {
  onEnquire: () => void;
}

export default function Header({ onEnquire }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);

  const closeMenu = (returnFocus: boolean) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;

    const firstLink = mobileNavRef.current?.querySelector<HTMLAnchorElement>('a');
    firstLink?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu(true);
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (headerRef.current && !headerRef.current.contains(target)) closeMenu(true);
    };
    const onResize = () => {
      if (window.innerWidth > 900) closeMenu(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('resize', onResize);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('resize', onResize);
    };
  }, [open]);

  const handleAnchorClick = () => closeMenu(false);

  return (
    <header className="site-header" ref={headerRef}>
      <div className="header-inner">
        <a className="brand" href="#home" onClick={handleAnchorClick} aria-label="The Meridian Inn — back to home">
          <span className="brand-mark" aria-hidden="true">MI</span>
          <span className="brand-text">
            <span className="brand-name">THE MERIDIAN INN</span>
            <span className="brand-sub">urban rooms · sample concept</span>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a href={`#${item.id}`} key={item.id}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <button type="button" className="btn btn-small btn-primary" onClick={onEnquire}>
            Enquire <ArrowUpRight size={16} aria-hidden="true" />
          </button>
          <button
            type="button"
            className="menu-toggle"
            ref={toggleRef}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => (open ? closeMenu(true) : setOpen(true))}
          >
            {open ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
          </button>
        </div>
      </div>

      <nav
        className="mobile-nav"
        id="mobile-navigation"
        aria-label="Mobile navigation"
        ref={mobileNavRef}
        hidden={!open}
      >
        {navItems.map((item, index) => (
          <a href={`#${item.id}`} key={item.id} onClick={handleAnchorClick}>
            <span aria-hidden="true">0{index + 1}</span>
            {item.label}
          </a>
        ))}
        <button
          type="button"
          className="btn btn-primary mobile-enquire"
          onClick={() => {
            closeMenu(false);
            onEnquire();
          }}
        >
          Start an enquiry <ArrowUpRight size={17} aria-hidden="true" />
        </button>
      </nav>
    </header>
  );
}
