import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { getMenuData, getMenuFileUrl, getFormules, MenuCategory, Formule } from '../lib/menu';

const COURSE_ICONS: Record<string, string> = {
  'Entrées':  '🥗',
  'Plats':    '🍲',
  'Desserts': '🍮',
};

export default function Menu() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [formules, setFormules] = useState<Formule[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([getMenuData(), getFormules()]).then(([menuData, formulesData]) => {
      setCategories(menuData);
      setFormules(formulesData);
      setLoading(false);
    });
  }, []);

  const menuDuJour = categories.find((c) => c.name === 'Menu du jour');
  const menuImages = menuDuJour?.files.map((f) => getMenuFileUrl(f.file_path)) ?? [];

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
            sélectionnés.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">

          {/* Seasonal note */}
          <div className="flex items-start gap-3 p-5 bg-forest-100 border-l-4 border-forest-600 rounded-r-xl mb-12">
            <span className="text-xl flex-shrink-0 mt-0.5" role="img" aria-hidden="true">🌿</span>
            <p className="text-sm text-forest-700 leading-relaxed">
              <strong>Carte de saison</strong> — Notre menu change chaque semaine selon les arrivages et les produits de saison. N'hésitez pas à demander conseil à notre équipe pour découvrir les spécialités du moment !
            </p>
          </div>

          {/* Formules */}
          <section className="mb-14" aria-labelledby="formules-title">
            {/* <span className="section-label">Nos formules</span> */}
            <h2 id="formules-title" className="section-title mb-8">La carte du jour</h2>

            {loading ? (
              <p className="text-sm text-gray-400 italic text-center py-8">Chargement…</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {formules.map((f) => (
                  <div
                    key={f.id}
                    className="rounded-2xl border-2 border-parchment-300 hover:border-forest-400 p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <span className="text-xl" role="img" aria-hidden="true">
                          {COURSE_ICONS[f.nom] ?? '🍽️'}
                        </span>
                        <p className="font-heading font-semibold text-gray-900">{f.nom}</p>
                      </div>
                      <p className="font-heading text-2xl font-bold text-forest-700 flex-shrink-0">
                        {f.prix.toFixed(0)}<span className="text-sm font-sans font-normal text-gray-400">€</span>
                      </p>
                    </div>

                    {f.description && (
                      <p className="text-xs text-gray-500 mb-3 leading-relaxed">{f.description}</p>
                    )}

                    <ul className="space-y-1.5 mt-auto">
                      {f.elements.map((el, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <span className="mt-1.5 w-1 h-1 rounded-full bg-golden-500 flex-shrink-0" />
                          {el}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}

            <p className="text-xs text-gray-400 mt-4 text-center">
              Boissons non comprises
            </p>
          </section>

          {/* Menu du jour */}
          <section className="mb-12" aria-labelledby="menu-du-jour-title">
            {/* <span className="section-label">Aujourd'hui</span> */}
            <h2 id="menu-du-jour-title" className="section-title mb-8">Menu du jour</h2>

            {loading ? (
              <p className="text-sm text-gray-400 italic text-center py-8">Chargement du menu…</p>
            ) : menuImages.length > 0 ? (
              <div className="flex flex-col items-center gap-6">
                {menuImages.map((src, i) => (
                  <img
                    key={i}
                    src={src}
                    alt={`Menu du jour ${i + 1}`}
                    className="w-full h-auto rounded-2xl shadow-md"
                  />
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 italic text-center py-8">
                Le menu du jour n'est pas encore disponible.
              </p>
            )}
          </section>

          {/* Allergens */}
          {/* <aside className="p-5 bg-gray-50 rounded-xl text-sm text-gray-500 leading-relaxed border border-gray-200">
            <strong className="text-gray-700">Allergènes</strong> — Nos plats peuvent contenir des allergènes.
            Signalez toute allergie ou intolérance alimentaire à notre équipe avant de commander.
            Liste des 14 allergènes disponible sur demande.
          </aside> */}

          <div className="text-center mt-10">
            <Link to="/reservation" className="btn btn-primary">Réserver ma table</Link>
          </div>
        </div>
      </div>
    </>
  );
}
