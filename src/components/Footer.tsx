import React from 'react';
import { Link } from 'react-router-dom';

const pages = [
  { to: '/',            label: 'Accueil' },
  { to: '/le-concept',  label: 'Le Concept' },
  { to: '/menu',        label: 'Notre Menu' },
  { to: '/a-emporter',  label: 'À emporter' },
  { to: '/reservation', label: 'Réservation' },
  { to: '/contact',     label: 'Contact' },
];

const hours = [
  { day: 'Lundi',    time: null },
  { day: 'Mardi',    time: '11h30 – 14h30' },
  { day: 'Mercredi', time: '11h30 – 14h30' },
  { day: 'Jeudi',    time: '11h30 – 14h30' },
  { day: 'Vendredi', time: '11h30 – 14h30' },
  { day: 'Samedi',   time: '11h30 – 14h30' },
  { day: 'Dimanche', time: null },
];

export default function Footer() {
  return (
    <footer className="bg-forest-900 text-white/75 pt-16 pb-8">
      <div className="max-w-site mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <p className="font-heading text-2xl font-bold tracking-[0.08em] text-white mb-1">BOCANTE</p>
            <p className="text-[0.7rem] tracking-[0.14em] uppercase text-white/40 mb-5">Restaurant du midi</p>
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
            <ul className="space-y-2">
              {hours.map(({ day, time }) => (
                <li key={day} className="flex justify-between text-sm gap-4">
                  <span className="text-white/45">{day}</span>
                  {time
                    ? <span className="text-white/80 font-medium">{time}</span>
                    : <span className="text-white/30 italic">Fermé</span>
                  }
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="text-[0.72rem] font-semibold tracking-[0.14em] uppercase text-golden-500 mb-5">Contact</p>
            <ul className="space-y-4">
              {[
                { icon: '📍', text: '12 Rue de la République\n84800 L\'Isle-sur-la-Sorgue' },
                { icon: '📞', text: '+33 4 90 XX XX XX' },
                { icon: '✉️', text: 'contact@bocante.fr' },
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
          <div className="flex gap-6">
            <span className="hover:text-white/60 cursor-pointer transition-colors">Mentions légales</span>
            <span className="hover:text-white/60 cursor-pointer transition-colors">Politique de confidentialité</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
