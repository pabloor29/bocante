import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
  {
    emoji: '🥗',
    tag: 'Entrée',
    tagClass: 'bg-forest-100 text-forest-700',
    bg: 'from-forest-100 to-green-100',
    name: 'Gaspacho de tomates cerises',
    desc: 'Basilic frais, huile d\'olive vierge extra et pignons grillés',
  },
  {
    emoji: '🍲',
    tag: 'Plat',
    tagClass: 'bg-golden-100 text-golden-700',
    bg: 'from-golden-100 to-amber-100',
    name: 'Poulet fermier rôti aux herbes',
    desc: 'Gratin dauphinois maison et haricots verts du marché',
  },
  {
    emoji: '🍮',
    tag: 'Dessert',
    tagClass: 'bg-rose-50 text-rose-600',
    bg: 'from-rose-50 to-orange-50',
    name: 'Crème brûlée à la lavande',
    desc: 'Tuile sablée au sésame et fleur de sel de Camargue',
  },
];

export default function Accueil() {
  return (
    <>
      <Helmet>
        <title>Bocante – Restaurant du midi à L'Isle-sur-la-Sorgue | Cuisine maison en bocaux</title>
        <meta name="description" content="Bocante, restaurant du midi à L'Isle-sur-la-Sorgue : cuisine 100% maison, produits frais et de saison servis en bocaux. Sur place ou à emporter. Ouvert du mardi au samedi, 11h30–14h30." />
        <link rel="canonical" href="https://bocante.fr/" />
      </Helmet>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg hero-texture">
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 text-golden-500 text-[0.72rem] font-semibold tracking-[0.22em] uppercase mb-8 px-4 py-2 border border-golden-500/30 rounded-full bg-golden-500/[0.08]">
            Restaurant du midi · L'Isle-sur-la-Sorgue
          </div>

          <h1 className="font-heading font-bold text-white tracking-[0.06em] leading-none mb-5"
              style={{ fontSize: 'clamp(3.5rem, 10vw, 7rem)' }}>
            BOCANTE
          </h1>

          <p className="font-heading italic text-white/70 mb-8"
             style={{ fontSize: 'clamp(1.05rem, 2.5vw, 1.5rem)' }}>
            La cuisine du marché, servie en bocal.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 mb-10 text-sm text-white/55">
            <span className="flex items-center gap-1.5">📍 L'Isle-sur-la-Sorgue</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">🕐 11h30 – 14h30</span>
            <span className="text-white/20">|</span>
            <span className="flex items-center gap-1.5">📅 Mardi – Samedi</span>
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/menu" className="btn btn-primary shadow-lg">Voir le menu</Link>
            <Link to="/reservation" className="btn btn-secondary">Réserver une table</Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40 scroll-indicator">
          <span className="text-[0.65rem] tracking-[0.16em] uppercase">Découvrir</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
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
            {menuPreview.map(({ emoji, tag, tagClass, bg, name, desc }) => (
              <article key={name} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className={`h-44 flex items-center justify-center text-5xl bg-gradient-to-br ${bg}`}>
                  <span role="img" aria-hidden="true">{emoji}</span>
                </div>
                <div className="p-6">
                  <span className={`inline-block text-[0.68rem] font-semibold tracking-[0.1em] uppercase px-2.5 py-0.5 rounded-full mb-2 ${tagClass}`}>
                    {tag}
                  </span>
                  <h3 className="font-heading text-base font-semibold text-gray-900 mb-1.5">{name}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
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

            <div className="flex flex-col items-center gap-5 order-first lg:order-last">
              <div className="text-[7rem] filter drop-shadow-2xl leading-none" role="img" aria-label="Bocaux de cuisine maison">
                🫙
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {['Artisanal', 'Local', 'De saison', '100% maison'].map(badge => (
                  <span key={badge}
                        className="px-4 py-1.5 text-sm bg-white/[0.07] border border-white/10 rounded-full text-white/70">
                    {badge}
                  </span>
                ))}
              </div>
            </div>
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
            <a href="tel:+33490000000" className="btn btn-outline-white">
              📞 Appeler le restaurant
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
