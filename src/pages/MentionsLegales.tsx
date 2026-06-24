import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function MentionsLegales() {
  return (
    <>
      <Helmet>
        <title>Mentions légales – Bocante | Restaurant L'Isle-sur-la-Sorgue</title>
        <meta name="description" content="Mentions légales du site Bocante, restaurant à L'Isle-sur-la-Sorgue : éditeur, hébergeur, propriété intellectuelle." />
        <link rel="canonical" href="https://www.bocante.com/mentions-legales" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <header className="page-header">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,148,74,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-golden-500 mb-3 block">
            Informations légales
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Mentions légales</h1>
          <p className="text-white/75 text-lg">
            Informations légales relatives au site bocante.com et à l'établissement Bocante.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <article className="max-w-3xl mx-auto">

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Éditeur du site</h2>
            <p className="text-gray-700 leading-relaxed">
              <strong>Bocante</strong><br />
              Restaurant – cuisine artisanale en bocaux<br />
              130 Av. de la Petite Marine<br />
              84800 L'Isle-sur-la-Sorgue, France<br />
              Téléphone : 04 32 60 17 70<br />
              E-mail : bocante.commandes@gmail.com
            </p>
            <p className="text-gray-700 leading-relaxed mt-4">
              Forme juridique : [À COMPLÉTER]<br />
              Capital social : [À COMPLÉTER]<br />
              SIRET : [À COMPLÉTER]<br />
              RCS : [À COMPLÉTER]<br />
              N° TVA intracommunautaire : [À COMPLÉTER]<br />
              Directeur de la publication : [À COMPLÉTER]
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Hébergeur</h2>
            <p className="text-gray-700 leading-relaxed">
              Vercel Inc.<br />
              340 S Lemon Ave #4133<br />
              Walnut, CA 91789, États-Unis<br />
              Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-forest-700 hover:underline">vercel.com</a>
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Propriété intellectuelle</h2>
            <p className="text-gray-700 leading-relaxed">
              L'ensemble des éléments du site bocante.com (textes, photographies, logos, graphismes, identité visuelle) est protégé par le droit d'auteur et reste la propriété exclusive de Bocante ou de ses partenaires. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite et constitue une contrefaçon sanctionnée par les articles L.335-2 et suivants du Code de la propriété intellectuelle.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Crédits</h2>
            <p className="text-gray-700 leading-relaxed">
              Conception et réalisation du site : <a href="https://resa-service.com" target="_blank" rel="noopener noreferrer" className="text-forest-700 hover:underline">RESA</a>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Responsabilité</h2>
            <p className="text-gray-700 leading-relaxed">
              Bocante s'efforce de maintenir les informations du site exactes et à jour. Les menus, prix et horaires peuvent toutefois évoluer sans préavis. Bocante ne saurait être tenu responsable des erreurs, omissions ou des dommages liés à l'utilisation du site.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-4">Contact</h2>
            <p className="text-gray-700 leading-relaxed">
              Pour toute question relative à ces mentions légales, vous pouvez nous écrire à <a href="mailto:bocante.commandes@gmail.com" className="text-forest-700 hover:underline">bocante.commandes@gmail.com</a>.
            </p>
          </section>

        </article>
      </div>
    </>
  );
}
