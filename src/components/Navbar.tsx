import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

interface NavItem {
  to: string;
  label: string;
}

const NAV_LINKS: NavItem[] = [
  { to: '/',           label: 'Accueil' },
  { to: '/le-concept', label: 'Le Concept' },
  { to: '/menu',       label: 'Menu' },
  { to: '/a-emporter', label: 'À emporter' },
  { to: '/contact',    label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);
  const { pathname }              = useLocation();
  const isHome                    = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const solid = scrolled || !isHome;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          solid ? 'bg-white shadow-sm' : 'navbar-transparent'
        }`}
        aria-label="Navigation principale"
      >
        <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none group" aria-label="Bocante – Accueil">
            <span className={`font-heading text-xl font-bold tracking-[0.1em] transition-colors duration-300 ${solid ? 'text-forest-900' : 'text-white'}`}>
              BOCANTE
            </span>
            <span className={`text-[0.6rem] tracking-[0.14em] uppercase transition-colors duration-300 ${solid ? 'text-gray-400' : 'text-white/60'}`}>
              Restaurant du midi · L'Isle-sur-la-Sorgue
            </span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `text-sm font-medium px-3.5 py-2 rounded-full transition-all duration-200 ${
                    solid
                      ? isActive
                        ? 'bg-forest-100 text-forest-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      : isActive
                        ? 'bg-white/15 text-white'
                        : 'nav-link text-white/85 hover:bg-white/12 hover:text-white'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            <NavLink
              to="/reservation"
              className={({ isActive }) =>
                `ml-2 text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 hover:-translate-y-px ${
                  isActive
                    ? 'bg-golden-700 text-white'
                    : 'bg-golden-600 text-white hover:bg-golden-700 hover:shadow-md'
                }`
              }
            >
              Réserver
            </NavLink>
          </div>

          {/* Hamburger — uses explicit CSS class for reliable display */}
          <button
            className={`hamburger-btn${menuOpen ? ' open' : ''}`}
            onClick={() => setMenuOpen(v => !v)}
            aria-expanded={menuOpen}
            aria-label="Menu de navigation"
          >
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="hamburger-line"
                style={{ background: solid ? '#374151' : 'white' }}
              />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden mobile-menu-open fixed top-[72px] left-0 right-0 z-40 bg-white border-b border-parchment-300 shadow-lg px-4 py-4 flex flex-col gap-1">
          {NAV_LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `text-base font-medium px-4 py-3 rounded-xl transition-colors duration-200 ${
                  isActive ? 'bg-forest-100 text-forest-700' : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/reservation"
            className="mt-2 px-4 py-3.5 bg-golden-600 text-white text-center font-semibold rounded-full hover:bg-golden-700 transition-colors"
          >
            Réserver une table
          </NavLink>
        </div>
      )}
    </>
  );
}
