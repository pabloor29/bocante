import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getOpeningHours, DAYS_FR, DayHours } from '../lib/opening-hours';

const features = [
  {
    icon: '🫙',
    title: 'Servi en bocaux',
    desc: 'Un concept original et pratique : vos plats présentés en bocaux, sur place ou à emporter, chauds ou froids.',
  },
  {
    icon: '🌿',
    title: '100 % Maison',
    desc: 'Tout est cuisiné sur place, de l\'entrée au dessert, avec soin et sans compromis sur la qualité.',
  },
  {
    icon: '🛒',
    title: 'Produits de saison',
    desc: 'Nous nous approvisionnons au marché de L\'Isle-sur-la-Sorgue pour des assiettes qui changent avec les saisons.',
  },
];

const menuPreview = [
  { img: '/img/plat-002.webp', imgAlt: "Entrée du jour en bocal – restaurant Bocante, L'Isle-sur-la-Sorgue",  tag: 'Entrée',  tagClass: 'bg-forest-100 text-forest-700' },
  { img: '/img/plat-001.webp', imgAlt: "Plat du jour en bocal – cuisine maison Bocante, L'Isle-sur-la-Sorgue", tag: 'Plat',    tagClass: 'bg-golden-100 text-golden-700' },
  { img: '/img/plat-003.webp', imgAlt: "Dessert du jour en bocal – restaurant Bocante, L'Isle-sur-la-Sorgue", tag: 'Dessert', tagClass: 'bg-rose-50 text-rose-600'      },
];

// Keep in sync with FAQ_LD in scripts/prerender-routes.js
// (Google requires FAQPage markup to match content visible on the page).
const faq = [
  {
    q: "Où se trouve le restaurant Bocante à L'Isle-sur-la-Sorgue ?",
    a: <>Bocante est situé au 130 Avenue de la Petite Marine, 84800 L'Isle-sur-la-Sorgue, à deux pas de la Sorgue et à proximité du centre-ville. Retrouvez le plan d'accès sur notre <Link to="/contact" className="text-forest-600 font-medium hover:underline">page contact</Link>.</>,
  },
  {
    q: "Le restaurant est-il au bord de l'eau ?",
    a: <>Bocante se trouve avenue de la Petite Marine, à deux pas de la Sorgue et à quelques minutes à pied du centre-ville et des antiquaires de L'Isle-sur-la-Sorgue. Envie de déjeuner au bord de l'eau ? Emportez vos bocaux et installez-vous le long de la Sorgue.</>,
  },
  {
    q: "Quels sont les horaires d'ouverture de Bocante ?",
    a: <>Bocante est ouvert le midi, du mardi au samedi. Retrouvez les horaires à jour sur notre <Link to="/contact" className="text-forest-600 font-medium hover:underline">page contact</Link>.</>,
  },
  {
    q: 'Peut-on commander à emporter chez Bocante ?',
    a: <>Oui, avec les Bocaux To Go : chaque jour après le service, les bocaux restants sont annoncés vers 14h en story Instagram. Commandez par téléphone au <a href="tel:+33432601770" className="text-forest-600 font-medium hover:underline">04 32 60 17 70</a> ou par e-mail, puis récupérez sur place avant 18h — livraison possible sur L'Isle-sur-la-Sorgue et Le Thor. Tout le fonctionnement sur la page <Link to="/a-emporter" className="text-forest-600 font-medium hover:underline">à emporter</Link>.</>,
  },
  {
    q: 'Faut-il réserver une table chez Bocante ?',
    a: <>La réservation n'est pas obligatoire mais fortement recommandée pour déjeuner sans attente. Vous pouvez <Link to="/reservation" className="text-forest-600 font-medium hover:underline">réserver en ligne</Link> ou appeler le 04 32 60 17 70.</>,
  },
  {
    q: 'Peut-on venir en groupe chez Bocante ?',
    a: <>Oui. Pour les groupes de plus de 8 personnes ou pour un événement privatif, contactez-nous directement au 04 32 60 17 70 ou par e-mail à bocante.commandes@gmail.com.</>,
  },
];

function heroSchedule(hours: DayHours[]): { days: string; time: string } {
  const openIndices = hours.map((h, i) => (!h.closedDay ? i : -1)).filter(i => i >= 0);
  const days =
    openIndices.length === 0 ? 'Fermé'
    : openIndices.length === 1 ? DAYS_FR[openIndices[0]]
    : `${DAYS_FR[openIndices[0]]} – ${DAYS_FR[openIndices[openIndices.length - 1]]}`;

  const firstOpen = hours.find(h => !h.closedDay && !h.closedLunch && h.midi?.debut);
  const fmt = (t: string) => t.replace(':', 'h');
  const time = firstOpen ? `${fmt(firstOpen.midi.debut)} – ${fmt(firstOpen.midi.fin)}` : '';

  return { days, time };
}

export default function Accueil() {
  const [schedule, setSchedule] = useState<{ days: string; time: string } | null>(null);

  useEffect(() => {
    getOpeningHours().then(h => {
      if (h) setSchedule(heroSchedule(h));
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>Restaurant à L'Isle-sur-la-Sorgue – Bocante | Formules dès 17 €</title>
        <meta name="description" content="Restaurant du midi à deux pas de la Sorgue et du centre-ville de L'Isle-sur-la-Sorgue. Cuisine 100% maison en bocaux, formules dès 17 €, produits frais du marché. Ouvert mardi–samedi 11h30–14h30. Sur place ou à emporter. Réservez en ligne en 30 secondes." />
        <link rel="canonical" href="https://www.bocante.com/" />
        <meta property="og:url" content="https://www.bocante.com/" />
        <meta property="og:title" content="Restaurant à L'Isle-sur-la-Sorgue – Bocante | Formules dès 17 €" />
        <meta property="og:description" content="Cuisine 100% maison servie en bocaux, à deux pas de la Sorgue. Formules dès 17 €, sur place ou à emporter." />
        <meta property="og:image" content="https://www.bocante.com/img/plat-001-og.jpg" />
        <meta name="twitter:title" content="Restaurant à L'Isle-sur-la-Sorgue – Bocante | Formules dès 17 €" />
        <meta name="twitter:description" content="Cuisine 100% maison servie en bocaux, à deux pas de la Sorgue. Formules dès 17 €. Sur place ou à emporter." />
        <meta name="twitter:image" content="https://www.bocante.com/img/plat-001-og.jpg" />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/img/plat-001.webp"
          alt="Plat Bocante servi en bocal — restaurant L'Isle-sur-la-Sorgue"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/75 via-forest-900/60 to-forest-900/80" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-golden-500 text-[0.72rem] font-semibold tracking-[0.22em] uppercase mb-8 px-4 py-2 border border-golden-500/30 rounded-full bg-golden-500/[0.08]">
            Restaurant du midi · L'Isle-sur-la-Sorgue
          </div>

          <h1 className="font-heading font-bold text-white tracking-[0.06em] leading-none mb-5"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
            BOCANTE
            <span className="sr-only"> – Restaurant à L'Isle-sur-la-Sorgue, cuisine maison servie en bocaux</span>
          </h1>

          <p className="font-heading italic text-white/70 mb-8"
             style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.5rem)' }}>
            La cuisine du marché, servie en bocal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm text-white/55">
            <span className="flex items-center gap-1.5">📍 L'Isle-sur-la-Sorgue</span>
            {schedule && (
              <>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-1.5">🕐 {schedule.time}</span>
                <span className="text-white/20">|</span>
                <span className="flex items-center gap-1.5">📅 {schedule.days}</span>
              </>
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/menu" className="btn btn-primary shadow-lg">Voir le menu</Link>
            <Link to="/reservation" className="btn btn-secondary">Réserver une table</Link>
          </div>
        </div>

      </section>

      {/* FEATURES */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-site mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Notre promesse</span>
            <h2 className="section-title mx-auto">
              Une cuisine <em className="text-forest-600 not-italic">authentique</em>,<br />pensée pour votre déjeuner
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map(({ icon, title, desc }) => (
              <article
                key={title}
                className="bg-parchment-100 border border-parchment-300 rounded-2xl p-10 text-center hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
              >
                <span className="text-5xl mb-5 block" role="img" aria-hidden="true">{icon}</span>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* MENU PREVIEW */}
      <section className="py-24 px-4 bg-parchment-100">
        <div className="max-w-site mx-auto">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="section-label">Cette semaine</span>
              <h2 className="section-title">Un avant-goût du menu</h2>
              <p className="section-lead">Notre carte évolue chaque semaine selon les arrivages du marché local.</p>
            </div>
            <Link to="/menu" className="btn btn-outline-green flex-shrink-0 self-start sm:self-auto">
              Menu complet →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {menuPreview.map(({ img, imgAlt, tag, tagClass }) => (
              <article key={tag} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="relative h-56 overflow-hidden">
                  <img src={img} alt={imgAlt} className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
                  <span className={`absolute top-3 left-3 text-[0.68rem] font-semibold tracking-[0.1em] uppercase px-2.5 py-1 rounded-full ${tagClass}`}>
                    {tag}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONCEPT TEASER */}
      <section className="py-24 px-4 bg-forest-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 80% 50%, rgba(196,148,74,0.13) 0%, transparent 60%)' }} />
        <div className="max-w-site mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-[0.72rem] font-semibold tracking-[0.18em] uppercase text-golden-500 mb-4 block">
                Le concept
              </span>
              <h2 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-5">
                La cuisine de quartier<br />
                <em className="italic text-golden-500">réinventée</em>
              </h2>
              <div className="w-12 h-[3px] bg-golden-600 rounded-full mb-6" />
              <p className="text-white/65 leading-relaxed mb-4">
                Bocante, c'est l'idée simple qu'un déjeuner de qualité ne doit pas prendre une heure.
                Nous cuisinons chaque matin, à partir des produits glanés au marché, des plats généreux
                et savoureux que nous servons dans des bocaux.
              </p>
              <p className="text-white/65 leading-relaxed mb-8">
                Sur place dans notre salle conviviale, ou à emporter pour manger au bureau ou au bord
                de la Sorgue : Bocante s'adapte à votre pause déjeuner.
              </p>
              <Link to="/le-concept" className="btn btn-secondary">
                Découvrir notre histoire →
              </Link>
            </div>

            <div className="order-first lg:order-last rounded-3xl overflow-hidden relative shadow-2xl">
              <img
                src="/img/plat-003.webp"
                alt="Dessert Bocante servi en bocal"
                className="w-full h-72 lg:h-[420px] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/60 to-transparent">
                <div className="flex flex-wrap gap-2">
                  {['Artisanal', 'Local', 'De saison', '100% maison'].map(badge => (
                    <span key={badge}
                          className="px-3 py-1 text-xs bg-white/20 backdrop-blur-sm border border-white/20 rounded-full text-white/90">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LOCAL — la Sorgue à deux pas */}
      <section className="py-24 px-4 bg-white" aria-labelledby="local-title">
        <div className="max-w-3xl mx-auto text-center">
          <span className="section-label">Au cœur de L'Isle-sur-la-Sorgue</span>
          <h2 id="local-title" className="section-title mx-auto">
            La Sorgue et le centre-ville <em className="text-forest-600 not-italic">à deux pas</em>
          </h2>
          <div className="w-12 h-[3px] bg-golden-600 rounded-full mx-auto mb-8" />
          <p className="text-gray-500 leading-relaxed mb-5">
            Installé avenue de la Petite Marine, à deux pas de la Sorgue, Bocante est à quelques
            minutes à pied du centre-ville et des célèbres antiquaires de L'Isle-sur-la-Sorgue.
            Après une matinée au marché ou une balade le long de l'eau, faites une pause
            déjeuner simple et abordable : des <Link to="/menu" className="text-forest-600 font-medium hover:underline">formules dès 17 €</Link>,
            cuisinées maison chaque matin avec les produits du marché.
          </p>
          <p className="text-gray-500 leading-relaxed mb-8">
            Sur place dans notre salle conviviale, ou en <Link to="/a-emporter" className="text-forest-600 font-medium hover:underline">Bocaux To Go à emporter</Link> pour
            pique-niquer au fil de la Sorgue. Ouvert du mardi au samedi le midi —
            pensez à <Link to="/reservation" className="text-forest-600 font-medium hover:underline">réserver votre table</Link> pour
            déjeuner sans attente.
          </p>
        </div>
      </section>

      {/* FAQ — visible content matching the FAQPage JSON-LD */}
      <section className="py-24 px-4 bg-parchment-100" aria-labelledby="faq-title">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="section-label">Questions fréquentes</span>
            <h2 id="faq-title" className="section-title mx-auto">Tout savoir avant de venir</h2>
          </div>
          <div className="space-y-3">
            {faq.map(({ q, a }) => (
              <details key={q} className="group bg-white rounded-2xl shadow-sm border border-parchment-300 overflow-hidden">
                <summary className="flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 font-heading font-semibold text-gray-900 hover:text-forest-700 transition-colors">
                  <span>{q}</span>
                  <span className="flex-shrink-0 text-forest-600 transition-transform duration-200 group-open:rotate-45 text-xl leading-none" aria-hidden="true">+</span>
                </summary>
                <div className="px-6 pb-5 text-sm text-gray-500 leading-relaxed">{a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RESERVATION CTA */}
      <section className="py-20 px-4 relative overflow-hidden"
               style={{ background: 'linear-gradient(135deg, #a67836 0%, #c4944a 100%)' }}>
        <div className="absolute inset-0 pointer-events-none"
             style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 60px)' }} />
        <div className="max-w-site mx-auto text-center relative">
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Réservez votre table
          </h2>
          <p className="text-white/80 text-lg mb-10 max-w-md mx-auto">
            Pour un déjeuner sans attente, réservez en ligne ou appelez-nous directement.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/reservation" className="btn btn-white">
              Réserver en ligne
            </Link>
            <a href="tel:+33432601770" className="btn btn-outline-white">
              📞 Appeler le restaurant
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
