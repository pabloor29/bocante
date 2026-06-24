import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function CGU() {
  return (
    <>
      <Helmet>
        <title>Conditions générales d'utilisation – Bocante</title>
        <meta name="description" content="Conditions générales d'utilisation du site bocante.com : accès, services, réservations, responsabilités et droit applicable." />
        <link rel="canonical" href="https://www.bocante.com/cgu" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <header className="page-header">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,148,74,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-golden-500 mb-3 block">
            Conditions
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Conditions générales d'utilisation</h1>
          <p className="text-white/75 text-lg">
            Règles qui encadrent l'utilisation du site bocante.com et des services qu'il propose.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <article className="max-w-3xl mx-auto">

          <p className="text-sm text-gray-500 mb-10">Dernière mise à jour : 24 juin 2026</p>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">1. Objet</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes Conditions Générales d'Utilisation (« CGU ») régissent l'accès et l'usage du site bocante.com, édité par Bocante, ainsi que des services en ligne associés (informations, réservation, formulaire de contact).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">2. Acceptation</h2>
            <p className="text-gray-700 leading-relaxed">
              L'utilisation du site implique l'acceptation pleine et entière des présentes CGU. Si vous n'acceptez pas ces conditions, merci de ne pas utiliser le site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">3. Accès au site</h2>
            <p className="text-gray-700 leading-relaxed">
              Le site est accessible gratuitement 24h/24, 7j/7, sauf interruption pour maintenance ou cas de force majeure. Bocante ne saurait être tenue responsable des indisponibilités temporaires.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">4. Réservations</h2>
            <p className="text-gray-700 leading-relaxed">
              Les réservations effectuées via le site sont soumises à la disponibilité du restaurant. Une confirmation par e-mail est envoyée après validation. Toute information erronée fournie par l'utilisateur peut entraîner l'annulation de la réservation. Pour modifier ou annuler une réservation, contactez le restaurant au 04 32 60 17 70.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">5. Obligations de l'utilisateur</h2>
            <p className="text-gray-700 leading-relaxed">
              L'utilisateur s'engage à utiliser le site de manière loyale et à ne pas porter atteinte à son fonctionnement, à sa sécurité ou aux droits de tiers. Sont notamment interdits : la collecte automatisée de données, toute tentative d'intrusion, l'envoi de contenus illicites ou diffamatoires.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">6. Propriété intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              L'ensemble des contenus du site est protégé. Toute reproduction sans autorisation préalable écrite est interdite. Voir les <a href="/mentions-legales" className="text-forest-700 hover:underline">mentions légales</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">7. Données personnelles</h2>
            <p className="text-gray-700 leading-relaxed">
              Le traitement des données personnelles est décrit dans notre <a href="/confidentialite" className="text-forest-700 hover:underline">politique de confidentialité</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">8. Responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              Bocante met tout en œuvre pour assurer l'exactitude des informations diffusées sur le site. Cependant, Bocante ne peut garantir l'exhaustivité, la précision ou la mise à jour permanente des contenus, et décline toute responsabilité quant aux dommages directs ou indirects résultant de l'utilisation du site.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">9. Liens externes</h2>
            <p className="text-gray-700 leading-relaxed">
              Le site peut contenir des liens vers des sites tiers. Bocante n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">10. Modification des CGU</h2>
            <p className="text-gray-700 leading-relaxed">
              Bocante se réserve le droit de modifier les présentes CGU à tout moment. La version applicable est celle en vigueur lors de la consultation du site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">11. Droit applicable et juridiction</h2>
            <p className="text-gray-700 leading-relaxed">
              Les présentes CGU sont soumises au droit français. Tout litige relatif à leur interprétation ou exécution relève de la compétence exclusive des tribunaux du ressort du siège social de Bocante, sauf disposition légale impérative contraire.
            </p>
          </section>

        </article>
      </div>
    </>
  );
}
