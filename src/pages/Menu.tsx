import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tags?: string[];
}

interface MenuSection {
  icon: string;
  title: string;
  items: MenuItem[];
}

const MENU_SECTIONS: MenuSection[] = [
  {
    icon: '🥗',
    title: 'Entrées',
    items: [
      {
        name: 'Gaspacho de tomates cerises',
        desc: 'Basilic frais, huile d\'olive vierge extra et pignons de pin grillés',
        price: '7€',
        tags: ['maison', 'saison'],
      },
      {
        name: 'Terrine de campagne maison',
        desc: 'Cornichons artisanaux, moutarde à l\'ancienne et pain de campagne',
        price: '8€',
        tags: ['maison'],
      },
      {
        name: 'Velouté de courgettes',
        desc: 'Chèvre frais du Luberon, pignons de pin et huile de basilic',
        price: '7€',
        tags: ['maison', 'saison', 'végétarien'],
      },
    ],
  },
  {
    icon: '🍲',
    title: 'Plats',
    items: [
      {
        name: 'Poulet fermier rôti aux herbes de Provence',
        desc: 'Gratin dauphinois maison et haricots verts du marché',
        price: '14€',
        tags: ['maison', 'saison'],
      },
      {
        name: 'Brandade de morue en bocal',
        desc: 'Pommes de terre à l\'huile, câpres et salade mesclun',
        price: '13€',
        tags: ['maison'],
      },
      {
        name: 'Tian de légumes provençaux',
        desc: 'Riz pilaf aux herbes et sauce vierge à l\'estragon',
        price: '12€',
        tags: ['maison', 'saison', 'végétarien'],
      },
      {
        name: 'Daube provençale mijotée',
        desc: 'Pâtes fraîches maison, olives de la Vallée des Baux et thym',
        price: '15€',
        tags: ['maison', 'saison'],
      },
    ],
  },
  {
    icon: '🍮',
    title: 'Desserts',
    items: [
      {
        name: 'Crème brûlée à la lavande',
        desc: 'Tuile sablée au sésame et fleur de sel de Camargue',
        price: '6€',
        tags: ['maison'],
      },
      {
        name: 'Clafoutis aux cerises du marché',
        desc: 'Cerises de la région, amandes effilées et sucre glace',
        price: '6€',
        tags: ['maison', 'saison'],
      },
      {
        name: 'Mousse au chocolat noir',
        desc: 'Chocolat 70% Valrhona, crème fouettée et fleur de sel',
        price: '5€',
        tags: ['maison'],
      },
    ],
  },
];

const FORMULES = [
  {
    name: 'Entrée + Plat',
    includes: 'Une entrée\n+ un plat au choix',
    price: '18',
  },
  {
    name: 'Plat + Dessert',
    includes: 'Un plat au choix\n+ un dessert',
    price: '17',
  },
  {
    name: 'Menu complet',
    includes: 'Entrée + Plat\n+ Dessert',
    price: '23',
    featured: true,
    badge: 'La formule du chef',
  },
];

const TAG_STYLES: Record<string, string> = {
  maison:      'bg-golden-100 text-golden-700',
  saison:      'bg-forest-100 text-forest-700',
  végétarien:  'bg-green-50 text-green-700',
};

export default function Menu() {
  return (
    <>
      <Helmet>
        <title>Menu – Bocante | Restaurant du midi L'Isle-sur-la-Sorgue</title>
        <meta name="description" content="Découvrez le menu de Bocante : entrées, plats et desserts 100% maison à base de produits frais et de saison. Formules déjeuner dès 17€. Carte renouvelée chaque semaine." />
        <link rel="canonical" href="https://bocante.fr/menu" />
      </Helmet>

      {/* Header */}
      <header className="page-header">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,148,74,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-golden-500 mb-3 block">
            Cuisine du marché
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Notre Menu</h1>
          <p className="text-white/75 text-lg">
            Tout est préparé sur place chaque matin, à partir des produits fraîchement
            sélectionnés au marché local.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">

          {/* Seasonal note */}
          <div className="flex items-start gap-3 p-5 bg-forest-100 border-l-4 border-forest-600 rounded-r-xl mb-12">
            <span className="text-xl flex-shrink-0 mt-0.5" role="img" aria-hidden="true">🌿</span>
            <p className="text-sm text-forest-700 leading-relaxed">
              <strong>Carte de saison</strong> — Notre menu change chaque semaine selon les arrivages du marché.
              Les plats présentés ci-dessous sont à titre indicatif ; demandez la carte du jour à l'accueil.
            </p>
          </div>

          {/* Formulas */}
          <section className="mb-14" aria-labelledby="formules-title">
            <span className="section-label">Nos formules</span>
            <h2 id="formules-title" className="section-title mb-8">Déjeuner à votre rythme</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {FORMULES.map(({ name, includes, price, featured, badge }) => (
                <div
                  key={name}
                  className={`relative rounded-2xl border-2 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                    featured
                      ? 'border-golden-600 bg-gradient-to-br from-golden-100 to-white'
                      : 'border-parchment-300 hover:border-forest-400'
                  }`}
                >
                  {badge && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-golden-600 text-white text-[0.68rem] font-bold tracking-wide uppercase px-3 py-0.5 rounded-full whitespace-nowrap">
                      {badge}
                    </span>
                  )}
                  <p className="font-heading font-semibold text-gray-900 mb-2">{name}</p>
                  <p className="text-xs text-gray-500 whitespace-pre-line leading-relaxed mb-4">{includes}</p>
                  <p className="font-heading text-3xl font-bold text-forest-700">
                    {price}<span className="text-base font-sans font-normal text-gray-400">€</span>
                  </p>
                </div>
              ))}
            </div>

            <p className="text-xs text-gray-400 mt-4 text-center">
              Plat seul : 13€ — Boissons non comprises
            </p>
          </section>

          {/* Menu sections */}
          {MENU_SECTIONS.map(({ icon, title, items }) => (
            <section key={title} className="mb-12" aria-labelledby={`section-${title}`}>
              <div className="flex items-center gap-3 mb-6 pb-3 border-b-2 border-parchment-300">
                <span className="text-2xl" role="img" aria-hidden="true">{icon}</span>
                <h2 id={`section-${title}`} className="font-heading text-2xl font-semibold text-gray-900">
                  {title}
                </h2>
              </div>

              <ul className="space-y-3">
                {items.map(({ name, desc, price, tags = [] }) => (
                  <li
                    key={name}
                    className="flex items-start justify-between gap-4 p-5 bg-parchment-100 border border-parchment-300 rounded-xl hover:bg-white hover:border-forest-400 hover:shadow-sm transition-all duration-300"
                  >
                    <div className="flex-1">
                      <p className="font-heading font-semibold text-gray-900 mb-1">{name}</p>
                      <p className="text-sm text-gray-500 leading-relaxed mb-2">{desc}</p>
                      {tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {tags.map(tag => (
                            <span key={tag}
                                  className={`text-[0.67rem] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full ${TAG_STYLES[tag] ?? 'bg-gray-100 text-gray-500'}`}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <span className="font-heading text-lg font-bold text-forest-700 flex-shrink-0">{price}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}

          {/* Allergens */}
          <aside className="p-5 bg-gray-50 rounded-xl text-sm text-gray-500 leading-relaxed border border-gray-200">
            <strong className="text-gray-700">Allergènes</strong> — Nos plats peuvent contenir des allergènes.
            Signalez toute allergie ou intolérance alimentaire à notre équipe avant de commander.
            Liste des 14 allergènes disponible sur demande.
          </aside>

          <div className="text-center mt-10">
            <Link to="/reservation" className="btn btn-primary">Réserver ma table</Link>
          </div>
        </div>
      </div>
    </>
  );
}
