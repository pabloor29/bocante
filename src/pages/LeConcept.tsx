import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const bocauxAvantages = [
  { icon: '🌡️', title: 'Conservation optimale', desc: 'Le bocal préserve les arômes et la fraîcheur des plats, chauds comme froids.' },
  { icon: '♻️', title: 'Zéro plastique', desc: 'Verre réutilisable, aucun emballage plastique. Un choix responsable et durable.' },
  { icon: '🧳', title: 'Pratique partout', desc: 'Hermétique, il voyage sans risque. Idéal pour le bureau, le pique-nique ou la maison.' },
];

const valeurs = [
  {
    num: '01',
    title: 'Artisanal avant tout',
    desc: 'Aucun plat surgelé, aucun produit transformé. Tout ce que vous mangez chez Bocante est élaboré dans notre cuisine, par nos mains, chaque matin.',
  },
  {
    num: '02',
    title: 'Ancré dans le territoire',
    desc: 'Nous travaillons en priorité avec des producteurs locaux du Vaucluse et de Provence. Soutenir l\'économie locale fait partie de notre ADN.',
  },
  {
    num: '03',
    title: 'Responsable et durable',
    desc: 'Bocaux en verre consignés, circuits courts, gestion rigoureuse des invendus : chez Bocante, chaque geste compte pour l\'environnement.',
  },
];

export default function LeConcept() {
  return (
    <>
      <Helmet>
        <title>Le Concept – Bocante | Cuisine artisanale en bocaux L'Isle-sur-la-Sorgue</title>
        <meta name="description" content="Bocante : une cuisine 100% maison servie dans des bocaux en verre au cœur de L'Isle-sur-la-Sorgue. Produits locaux, circuits courts, zéro plastique. Découvrez notre histoire et nos valeurs." />
        <link rel="canonical" href="https://bocante.fr/le-concept" />
      </Helmet>

      {/* Header */}
      <header className="page-header">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,148,74,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-golden-500 mb-3 block">
            Notre histoire
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Le Concept Bocante</h1>
          <p className="text-white/75 text-lg">
            Une idée née d'une conviction : manger bien au déjeuner ne devrait pas
            être un luxe ni une perte de temps.
          </p>
        </div>
      </header>

      {/* Story */}
      <section className="py-20 px-4 bg-white" aria-labelledby="story-title">
        <div className="max-w-site mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">L'origine</span>
              <h2 id="story-title" className="section-title">
                Nés d'un amour<br />
                <em className="text-forest-600 not-italic">du bien manger</em>
              </h2>
              <div className="divider" />
              <p className="text-gray-500 leading-relaxed mb-5">
                Bocante est né d'une observation simple : trop de gens renoncent à manger bien
                le midi faute de temps ou de choix. Entre le sandwich industriel et la brasserie
                trop longue, il manquait quelque chose à L'Isle-sur-la-Sorgue.
              </p>
              <p className="text-gray-500 leading-relaxed mb-5">
                L'idée du bocal s'est imposée naturellement. Pratique, élégant, écologique :
                il permet de servir une vraie cuisine maison, chaude ou froide, en quelques
                minutes. Sans compromis sur la qualité.
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Depuis notre ouverture, nous allons chaque matin au marché de L'Isle-sur-la-Sorgue
                pour sélectionner les meilleurs produits. Notre carte change chaque semaine, au
                gré des saisons et des rencontres avec nos producteurs locaux.
              </p>
              <Link to="/menu" className="btn btn-primary">Voir le menu de la semaine</Link>
            </div>

            <div className="bg-gradient-to-br from-parchment-200 to-parchment-300 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[420px] relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none"
                   style={{ background: 'radial-gradient(ellipse at center, rgba(61,122,90,0.08) 0%, transparent 70%)' }} />
              <span className="text-9xl mb-6 leading-none filter drop-shadow-xl" role="img" aria-label="Un bocal Bocante">
                🫙
              </span>
              <p className="font-heading text-lg italic text-forest-700 text-center max-w-xs relative">
                "La bonne cuisine dans un bocal, c'est la liberté de manger comme on veut."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bocaux section */}
      <section className="py-20 px-4 bg-forest-900 relative overflow-hidden" aria-labelledby="bocaux-title">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 70% 30%, rgba(196,148,74,0.14) 0%, transparent 55%)' }} />
        <div className="max-w-site mx-auto text-center relative">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-golden-500 mb-3 block">
            Le bocal
          </span>
          <h2 id="bocaux-title" className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
            Pourquoi le bocal ?
          </h2>
          <div className="w-12 h-[3px] bg-golden-600 rounded-full mx-auto mb-6" />
          <p className="text-white/65 max-w-xl mx-auto mb-14 leading-relaxed">
            Le bocal en verre n'est pas qu'un contenant — c'est le symbole de ce que nous voulons
            offrir : une cuisine honnête, transparente, que vous pouvez voir et apprécier.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {bocauxAvantages.map(({ icon, title, desc }) => (
              <article
                key={title}
                className="p-8 bg-white/[0.06] border border-white/10 rounded-2xl text-center hover:bg-white/10 hover:-translate-y-1 transition-all duration-300"
              >
                <span className="text-4xl mb-4 block" role="img" aria-hidden="true">{icon}</span>
                <h3 className="font-heading text-lg font-semibold text-white mb-3">{title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="py-20 px-4 bg-parchment-100" aria-labelledby="valeurs-title">
        <div className="max-w-site mx-auto">
          <div className="text-center mb-14">
            <span className="section-label">Ce qui nous guide</span>
            <h2 id="valeurs-title" className="section-title mx-auto">Nos valeurs</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valeurs.map(({ num, title, desc }) => (
              <article
                key={num}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <p className="font-heading text-5xl font-bold text-parchment-300 leading-none mb-4">{num}</p>
                <h3 className="font-heading text-xl font-semibold text-gray-900 mb-3">{title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 px-4 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
            Venez vivre l'expérience Bocante
          </h2>
          <p className="text-gray-500 mb-8">
            Réservez votre table ou commandez à emporter. On vous attend !
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/reservation" className="btn btn-primary">Réserver une table</Link>
            <Link to="/a-emporter" className="btn btn-outline-green">Commander à emporter</Link>
          </div>
        </div>
      </section>
    </>
  );
}
