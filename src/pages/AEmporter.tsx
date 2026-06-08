import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const steps = [
  {
    num: '1',
    icon: '📞',
    title: 'Passez commande',
    desc: 'Appelez-nous avant 12h00 ou venez directement au comptoir. Commandez vos plats parmi le menu du jour.',
  },
  {
    num: '2',
    icon: '👨‍🍳',
    title: 'On prépare votre repas',
    desc: 'Vos plats sont cuisinés à la commande et conditionnés avec soin dans nos bocaux hermétiques.',
  },
  {
    num: '3',
    icon: '🛍️',
    title: 'Récupérez votre commande',
    desc: 'Venez récupérer votre commande à l\'heure convenue. Prêt en 20 minutes, sans attente.',
  },
];

export default function AEmporter() {
  return (
    <>
      <Helmet>
        <title>À emporter – Bocante | Cuisine maison L'Isle-sur-la-Sorgue</title>
        <meta name="description" content="Commandez vos plats à emporter chez Bocante. Cuisine 100% maison servie en bocaux, prête en 20 minutes. Idéal pour manger au bureau ou en plein air à L'Isle-sur-la-Sorgue." />
        <link rel="canonical" href="https://bocante.fr/a-emporter" />
      </Helmet>

      {/* Header */}
      <header className="page-header page-header-golden">
        <div className="relative max-w-2xl mx-auto">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-white/60 mb-3 block">
            Pratique et savoureux
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">À emporter</h1>
          <p className="text-white/80 text-lg">
            Dégustez Bocante où vous voulez. Nos bocaux voyagent bien — au bureau,
            au bord de la Sorgue ou chez vous.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <div className="max-w-site mx-auto">

          {/* Steps */}
          <section className="mb-20" aria-labelledby="steps-title">
            <div className="text-center mb-12">
              <span className="section-label">Comment ça marche ?</span>
              <h2 id="steps-title" className="section-title mx-auto">Simple comme bonjour</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              {/* Connecting line (desktop) */}
              <div className="hidden md:block absolute top-7 left-[calc(16.66%+1.5rem)] right-[calc(16.66%+1.5rem)] h-0.5 bg-gradient-to-r from-forest-400 to-golden-500" />

              {steps.map(({ num, icon, title, desc }) => (
                <article key={num} className="text-center relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-forest-600 to-forest-500 text-white font-heading text-xl font-bold flex items-center justify-center mx-auto mb-5 shadow-lg shadow-forest-500/30 relative z-10">
                    {num}
                  </div>
                  <span className="text-4xl mb-4 block" role="img" aria-hidden="true">{icon}</span>
                  <h3 className="font-heading text-lg font-semibold text-gray-900 mb-2">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs mx-auto">{desc}</p>
                </article>
              ))}
            </div>
          </section>

          {/* Info boxes */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" aria-label="Informations pratiques">
            {[
              {
                icon: '⏰',
                title: 'Horaires de retrait',
                content: (
                  <ul className="space-y-2 text-sm">
                    {[
                      ['Mardi – Vendredi', '11h30 – 14h00'],
                      ['Samedi', '11h30 – 14h00'],
                      ['Lundi & Dimanche', null],
                    ].map(([day, time]) => (
                      <li key={String(day)} className="flex justify-between">
                        <span className="text-gray-500">{day}</span>
                        {time
                          ? <span className="font-semibold text-forest-700">{time}</span>
                          : <span className="text-gray-300 italic">Fermé</span>
                        }
                      </li>
                    ))}
                  </ul>
                ),
              },
              {
                icon: '📦',
                title: 'Nos bocaux',
                content: (
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Tous nos plats sont conditionnés dans des bocaux en verre hermétiques.
                    Ils se conservent 24h au réfrigérateur. Vous pouvez les réchauffer
                    directement au bain-marie ou au four (sans le couvercle).
                    <br /><br />
                    <strong className="text-gray-700">Consigne bocaux :</strong> ramenez vos bocaux vides,
                    on vous offre 10% sur la commande suivante !
                  </p>
                ),
              },
            ].map(({ icon, title, content }) => (
              <div key={title} className="p-6 bg-parchment-100 border border-parchment-300 rounded-2xl">
                <span className="text-3xl mb-3 block" role="img" aria-hidden="true">{icon}</span>
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">{title}</h3>
                {content}
              </div>
            ))}
          </section>

          {/* CTA */}
          <div className="text-center p-12 rounded-2xl text-white"
               style={{ background: 'linear-gradient(135deg, #275038 0%, #3d7a5a 100%)' }}>
            <span className="text-4xl mb-4 block" role="img" aria-label="Téléphone">📞</span>
            <h2 className="font-heading text-3xl font-bold mb-2">Passez votre commande</h2>
            <p className="text-white/70 mb-6">Appelez-nous avant 12h00 pour réserver vos plats à emporter</p>
            <a href="tel:+33490000000"
               className="font-heading text-2xl font-bold text-golden-500 hover:text-white transition-colors duration-200 block mb-8">
              +33 4 90 XX XX XX
            </a>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/menu" className="btn btn-secondary">Voir le menu du jour</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
