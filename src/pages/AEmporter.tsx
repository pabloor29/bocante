import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const steps = [
  {
    num: '1',
    icon: '📲',
    title: 'La story à 14h',
    desc: 'À partir de 14h, on publie en story Instagram les plats restants du service à des prix réduits. Une sélection limitée, à saisir vite !',
  },
  {
    num: '2',
    icon: '✉️',
    title: 'Passez commande',
    desc: 'Envoyez-nous un message à bocante.commandes@gmail.com ou appelez le 04 32 60 17 70. On confirme votre commande par retour.',
  },
  {
    num: '3',
    icon: '🛍️',
    title: 'Récupérez ou faites livrer',
    desc: 'Récupérez votre commande sur place avant 18h, ou faites-vous livrer sur L\'Isle-sur-la-Sorgue ou Le Thor (à partir de 30€ de commande). Paiement à la récupération.',
  },
];

const infoCards = [
  {
    icon: '🚴',
    title: 'Livraison sur site',
    content: (
      <div className="space-y-3 text-sm text-gray-500 leading-relaxed">
        <p>Nous livrons sur les zones artizanales de :</p>
        <ul className="space-y-1">
          <li className="flex items-center gap-2"><span className="text-forest-600 font-semibold">·</span> L'Isle-sur-la-Sorgue</li>
          <li className="flex items-center gap-2"><span className="text-forest-600 font-semibold">·</span> Le Thor</li>
        </ul>
        <p className="pt-1">
          <span className="font-semibold text-gray-700">Minimum de commande :</span> 30€
        </p>
        <p>
          <span className="font-semibold text-gray-700">Paiement :</span> à la livraison ou au retrait (espèces ou CB)
        </p>
      </div>
    ),
  },
  {
    icon: '🫙',
    title: 'Bocaux consignés',
    content: (
      <div className="space-y-3 text-sm text-gray-500 leading-relaxed">
        <p>
          Nos bocaux sont en verre de qualité supérieure — hermétiques, résistants et parfaits pour conserver vos plats.
        </p>
        <p>
          Dans une démarche éco-responsable, ils sont <span className="font-semibold text-gray-700">consignés 2€</span> par bocal.
        </p>
        <p>
          Ramenez vos bocaux vides lors de votre prochaine visite et récupérez votre consigne. Simple et écologique !
        </p>
        <p>
          nota si votre entreprise fait partie du CLUB ENTREPRISES les bocaux ne sont pas consignés - pensez à la faire référencer...
        </p>
      </div>
    ),
  },
];

export default function AEmporter() {
  return (
    <>
      <Helmet>
        <title>Bocaux To Go – Bocante | Plats à emporter L'Isle-sur-la-Sorgue</title>
        <meta name="description" content="Bocaux To Go : chaque jour à 14h, Bocante publie ses plats restants en story Instagram à prix réduits. À récupérer sur place avant 18h ou livraison sur L'Isle-sur-la-Sorgue et Le Thor." />
        <link rel="canonical" href="https://bocante.com/a-emporter" />
      </Helmet>

      {/* Header */}
      <header className="page-header page-header-golden">
        <div className="relative max-w-2xl mx-auto">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Bocaux To Go</h1>
          <p className="text-white/80 text-lg">
            Les plats restants du service, à prix réduits — à emporter ou livrés chez vous.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <div className="max-w-site mx-auto">

          {/* Concept banner */}
          <div className="mb-20 rounded-2xl overflow-hidden bg-gradient-to-br from-golden-700 to-golden-600 p-8 md:p-12 text-white flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl flex-shrink-0" role="img" aria-label="Instagram">📸</div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-3">Suivez-nous sur Instagram</h2>
              <p className="text-white/85 leading-relaxed max-w-xl">
                Chaque jour, après le service de 14h, s'il nous reste des bocaux, nous proposons des lots à des prix très avantageux. Nous les annonçons en story, avec des quantités limitées. Pensez à activer les notifications pour être parmi les premiers informés !
              </p>
            </div>
          </div>

          {/* Steps */}
          <section className="mb-20" aria-labelledby="steps-title">
            <div className="text-center mb-12">
              <span className="section-label">Comment ça marche</span>
              <h2 id="steps-title" className="section-title mx-auto">En 3 étapes</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
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

          {/* Info cards */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16" aria-label="Informations pratiques">
            {infoCards.map(({ icon, title, content }) => (
              <div key={title} className="p-6 bg-parchment-100 border border-parchment-300 rounded-2xl">
                <span className="text-3xl mb-3 block" role="img" aria-hidden="true">{icon}</span>
                <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">{title}</h3>
                {content}
              </div>
            ))}
          </section>

          {/* Retrait */}
          <div className="mb-16 p-6 bg-forest-100 border border-forest-600/20 rounded-2xl flex items-start gap-4">
            <span className="text-3xl flex-shrink-0" role="img" aria-hidden="true">🏠</span>
            <div>
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-1">Retrait sur place</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                Vous préférez passer récupérer votre commande ? C'est possible jusqu'à <strong className="text-gray-700">18h</strong> chaque jour à notre adresse.
                Le paiement s'effectue au moment du retrait, en espèces ou par CB.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center p-10 md:p-14 rounded-2xl text-white"
               style={{ background: 'linear-gradient(135deg, #275038 0%, #3d7a5a 100%)' }}>
            <h2 className="font-heading text-3xl font-bold mb-2">Passez votre commande</h2>
            <p className="text-white/70 mb-8 max-w-md mx-auto">
              Après avoir vu la story, contactez-nous par mail ou par téléphone pour réserver vos plats.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <a href="mailto:bocante.commandes@gmail.com"
                 className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-6 py-4 transition-all duration-200 text-left">
                <span className="text-2xl" role="img" aria-hidden="true">✉️</span>
                <div>
                  <p className="text-[0.65rem] tracking-widest uppercase text-white/50 mb-0.5">Par e-mail</p>
                  <p className="font-semibold text-white text-sm">bocante.commandes@gmail.com</p>
                </div>
              </a>

              <a href="tel:+33432601770"
                 className="flex items-center gap-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl px-6 py-4 transition-all duration-200 text-left">
                <span className="text-2xl" role="img" aria-hidden="true">📞</span>
                <div>
                  <p className="text-[0.65rem] tracking-widest uppercase text-white/50 mb-0.5">Par téléphone</p>
                  <p className="font-semibold text-white text-sm">04 32 60 17 70</p>
                </div>
              </a>
            </div>

            <Link to="/menu" className="btn btn-secondary">
              Voir le menu de la semaine
            </Link>
          </div>

        </div>
      </div>
    </>
  );
}
