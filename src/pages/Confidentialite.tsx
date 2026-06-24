import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Confidentialite() {
  return (
    <>
      <Helmet>
        <title>Politique de confidentialité – Bocante | Protection des données</title>
        <meta name="description" content="Politique de confidentialité du site Bocante : données personnelles collectées, finalités, durée de conservation, droits RGPD et contact." />
        <link rel="canonical" href="https://www.bocante.com/confidentialite" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <header className="page-header">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,148,74,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-golden-500 mb-3 block">
            Protection des données
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Politique de confidentialité</h1>
          <p className="text-white/75 text-lg">
            Comment Bocante collecte, utilise et protège vos données personnelles, conformément au RGPD.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <article className="max-w-3xl mx-auto">

          <p className="text-sm text-gray-500 mb-10">Dernière mise à jour : 24 juin 2026</p>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">1. Responsable du traitement</h2>
            <p className="text-gray-700 leading-relaxed">
              Le responsable du traitement des données collectées sur ce site est Bocante, 130 Av. de la Petite Marine, 84800 L'Isle-sur-la-Sorgue. Contact : <a href="mailto:bocante.commandes@gmail.com" className="text-forest-700 hover:underline">bocante.commandes@gmail.com</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">2. Données collectées</h2>
            <p className="text-gray-700 leading-relaxed mb-4">Nous collectons uniquement les données nécessaires aux finalités décrites ci-dessous :</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li><strong>Réservation</strong> : nom, prénom, e-mail, téléphone, date et heure, nombre de convives, message éventuel.</li>
              <li><strong>Formulaire de contact</strong> : nom, e-mail, contenu du message.</li>
              <li><strong>Mesure d'audience</strong> : données techniques anonymisées via Vercel Analytics (pages vues, type d'appareil, pays), uniquement après votre consentement.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">3. Finalités et bases légales</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Gestion des réservations et de la relation client — exécution du contrat / mesure précontractuelle.</li>
              <li>Réponse aux demandes de contact — intérêt légitime.</li>
              <li>Statistiques d'audience anonymes — consentement.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">4. Durée de conservation</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Données de réservation : 3 ans à compter du dernier contact.</li>
              <li>Demandes de contact : 1 an après la dernière interaction.</li>
              <li>Statistiques d'audience : 13 mois maximum.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">5. Destinataires</h2>
            <p className="text-gray-700 leading-relaxed">
              Vos données sont destinées exclusivement à Bocante et à ses sous-traitants techniques nécessaires au fonctionnement du site :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mt-2">
              <li><strong>Vercel</strong> — hébergement et mesure d'audience.</li>
              <li><strong>Supabase</strong> — base de données des réservations.</li>
              <li><strong>Resend</strong> — envoi d'e-mails transactionnels.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Aucune donnée n'est revendue ni cédée à des tiers à des fins commerciales.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">6. Transferts hors UE</h2>
            <p className="text-gray-700 leading-relaxed">
              Certains prestataires (Vercel, Resend) peuvent traiter des données en dehors de l'Union européenne. Ces transferts sont encadrés par les clauses contractuelles types de la Commission européenne.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">7. Vos droits</h2>
            <p className="text-gray-700 leading-relaxed mb-2">
              Conformément au RGPD et à la loi Informatique et Libertés, vous disposez des droits suivants :
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Droit d'accès, de rectification et d'effacement.</li>
              <li>Droit à la limitation et à l'opposition au traitement.</li>
              <li>Droit à la portabilité.</li>
              <li>Droit de définir des directives post-mortem.</li>
              <li>Droit de retirer votre consentement à tout moment.</li>
            </ul>
            <p className="text-gray-700 leading-relaxed mt-4">
              Pour exercer vos droits : <a href="mailto:bocante.commandes@gmail.com" className="text-forest-700 hover:underline">bocante.commandes@gmail.com</a>. Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-forest-700 hover:underline">cnil.fr</a>).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">8. Cookies</h2>
            <p className="text-gray-700 leading-relaxed">
              Le site utilise des cookies de mesure d'audience uniquement après votre consentement, recueilli via le bandeau affiché lors de votre première visite. Vous pouvez modifier vos préférences à tout moment en vidant le stockage local de votre navigateur ou en nous contactant.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">9. Modifications</h2>
            <p className="text-gray-700 leading-relaxed">
              La présente politique peut être mise à jour à tout moment. La date de dernière modification figure en haut de cette page.
            </p>
          </section>

        </article>
      </div>
    </>
  );
}
