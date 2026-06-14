import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOpeningHours, DAYS_FR, DayHours } from '../lib/opening-hours';

const pages = [
  { to: '/',            label: 'Accueil' },
  { to: '/le-concept',  label: 'Le Concept' },
  { to: '/menu',        label: 'Notre Menu' },
  { to: '/a-emporter',  label: 'À emporter' },
  { to: '/reservation', label: 'Réservation' },
  { to: '/contact',     label: 'Contact' },
];

export default function Footer() {
  const [hours, setHours] = useState<DayHours[] | null>(null);

  useEffect(() => {
    getOpeningHours().then(setHours);
  }, []);

  return (
    <footer className="bg-forest-900 text-white/75 pt-16 pb-8">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <img src="/logo.webp" alt="Bocante" className="h-16 w-16 rounded-xl object-cover mb-4" />
            <p className="text-sm leading-relaxed text-white/55 max-w-xs">
              Une cuisine 100&nbsp;% maison élaborée à partir de produits frais et de saison,
              servie en bocaux au cœur de L'Isle-sur-la-Sorgue.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-golden-500 mb-5">Navigation</p>
            <ul className="space-y-2.5">
              {pages.map(({ to, label }) => (
                <li key={to}>
                  <Link to={to} className="text-sm text-white/60 hover:text-white transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Horaires */}
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-golden-500 mb-5">Horaires</p>
            {hours ? (
              <ul className="space-y-2">
                {DAYS_FR.map((day, i) => {
                  const d = hours[i];
                  return (
                    <li key={day} className="flex justify-between text-sm gap-4">
                      <span className="text-white/45">{day}</span>
                      {d.closedDay ? (
                        <span className="text-white/30 italic">Fermé</span>
                      ) : (
                        <div className="flex flex-col items-end">
                          {!d.closedLunch && d.midi.debut && (
                            <span className="text-white/80 font-medium">{d.midi.debut} – {d.midi.fin}</span>
                          )}
                          {!d.closedDiner && d.soir.debut && (
                            <span className="text-white/80 font-medium">{d.soir.debut} – {d.soir.fin}</span>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="text-sm text-white/30 italic">Chargement…</p>
            )}
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-golden-500 mb-5">Contact</p>
            <ul className="space-y-4">
              {[
                { icon: '📍', text: '130 Av. de la Petite Marine\n84800 L\'Isle-sur-la-Sorgue' },
                { icon: '📞', text: '04 32 60 17 70' },
                { icon: '✉️', text: 'bocante.commandes@gmail.com' },
              ].map(({ icon, text }) => (
                <li key={icon} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="mt-0.5 flex-shrink-0">{icon}</span>
                  <span className="whitespace-pre-line leading-relaxed">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[0.78rem] text-white/30">
          <p>© {new Date().getFullYear()} Bocante · L'Isle-sur-la-Sorgue</p>
          <a
            href="https://portfolio-pablo-teal.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white/60 transition-colors duration-200"
          >
            Site réalisé par Pablo Ortega
          </a>
          <div className="flex gap-6">
            <span className="hover:text-white/60 cursor-pointer transition-colors">Mentions légales</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Politique de confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
