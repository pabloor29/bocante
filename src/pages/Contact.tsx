import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { getOpeningHours, DAYS_FR, DayHours } from '../lib/opening-hours';

interface ContactForm {
  nom: string;
  email: string;
  sujet: string;
  message: string;
}

const contactItems = [
  {
    icon: '📍',
    label: 'Adresse',
    value: '12 Rue de la République\n84800 L\'Isle-sur-la-Sorgue',
    link: null,
  },
  {
    icon: '📞',
    label: 'Téléphone',
    value: '+33 4 90 XX XX XX',
    link: 'tel:+33490000000',
  },
  {
    icon: '✉️',
    label: 'E-mail',
    value: 'contact@bocante.fr',
    link: 'mailto:contact@bocante.fr',
  },
];

export default function Contact() {
  const [form, setForm] = useState<ContactForm>({ nom: '', email: '', sujet: '', message: '' });
  const [hours, setHours] = useState<DayHours[] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getOpeningHours().then(setHours);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1000);
  };

  return (
    <>
      <Helmet>
        <title>Contact – Bocante | Restaurant du midi L'Isle-sur-la-Sorgue</title>
        <meta name="description" content="Contactez Bocante, restaurant du midi à L'Isle-sur-la-Sorgue. Adresse, horaires, téléphone et formulaire de contact. Ouvert du mardi au samedi de 11h30 à 14h30." />
        <link rel="canonical" href="https://bocante.fr/contact" />
      </Helmet>

      {/* Header */}
      <header className="page-header">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,148,74,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-golden-500 mb-3 block">
            Nous trouver
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Contact</h1>
          <p className="text-white/75 text-lg">
            Une question, une information ? Notre équipe est à votre disposition
            aux heures d'ouverture.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <div className="max-w-site mx-auto">

          {/* Info + Map grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

            {/* Contact info */}
            <div>
              <h2 className="font-heading text-2xl font-semibold text-gray-900 mb-8">Informations pratiques</h2>

              <ul className="space-y-6 mb-10">
                {contactItems.map(({ icon, label, value, link }) => (
                  <li key={label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-forest-100 flex items-center justify-center text-xl flex-shrink-0">
                      <span role="img" aria-hidden="true">{icon}</span>
                    </div>
                    <div>
                      <p className="text-[0.72rem] font-semibold tracking-[0.1em] uppercase text-gray-400 mb-1">{label}</p>
                      {link ? (
                        <a href={link} className="text-base text-gray-700 hover:text-forest-600 transition-colors whitespace-pre-line">
                          {value}
                        </a>
                      ) : (
                        <p className="text-base text-gray-700 whitespace-pre-line">{value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {/* Hours */}
              <h3 className="font-heading text-lg font-semibold text-gray-900 mb-4">Horaires d'ouverture</h3>
              {hours ? (
                <ul className="space-y-0">
                  {DAYS_FR.map((day, i) => {
                    const d = hours[i];
                    return (
                      <li key={day} className="flex justify-between py-2.5 border-b border-parchment-300 last:border-0 text-sm">
                        <span className="text-gray-500">{day}</span>
                        {d.closedDay ? (
                          <span className="text-gray-300 italic">Fermé</span>
                        ) : (
                          <div className="flex flex-col items-end">
                            {!d.closedLunch && d.midi.debut && (
                              <span className="font-semibold text-forest-700">{d.midi.debut} – {d.midi.fin}</span>
                            )}
                            {!d.closedDiner && d.soir.debut && (
                              <span className="font-semibold text-forest-700">{d.soir.debut} – {d.soir.fin}</span>
                            )}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-sm text-gray-400 italic">Chargement des horaires…</p>
              )}
            </div>

            {/* Map placeholder */}
            <div className="bg-gradient-to-br from-forest-100 to-parchment-200 rounded-3xl flex flex-col items-center justify-center min-h-[400px] border border-parchment-300 gap-4 p-8">
              <span className="text-6xl" role="img" aria-label="Carte">🗺️</span>
              <h3 className="font-heading text-xl font-semibold text-forest-700 text-center">
                L'Isle-sur-la-Sorgue
              </h3>
              <p className="text-sm text-gray-500 text-center max-w-[200px] leading-relaxed">
                12 Rue de la République<br />
                84800 L'Isle-sur-la-Sorgue<br />
                Vaucluse, Provence
              </p>
              <p className="text-xs text-gray-400 text-center mt-2">
                En centre-ville, proche du marché
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="max-w-2xl mx-auto bg-parchment-100 rounded-2xl border border-parchment-300 p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-6">
                <span className="text-5xl mb-4 block" role="img" aria-label="Message envoyé">📨</span>
                <h3 className="font-heading text-2xl font-bold text-forest-700 mb-3">Message envoyé !</h3>
                <p className="text-gray-500 leading-relaxed mb-6">
                  Merci pour votre message. Nous vous répondrons dans les meilleurs délais,
                  généralement sous 24h les jours ouvrables.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ nom: '', email: '', sujet: '', message: '' }); }}
                  className="btn btn-outline-green"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <>
                <h2 className="font-heading text-xl font-semibold text-gray-900 mb-1">Envoyez-nous un message</h2>
                <p className="text-sm text-gray-500 mb-6">
                  Une question sur le menu, les allergènes, les privatisations ? Écrivez-nous.
                </p>

                <form onSubmit={handleSubmit} noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label htmlFor="c-nom" className="form-label">
                        Nom <span className="text-golden-600">*</span>
                      </label>
                      <input id="c-nom" name="nom" type="text" required
                             value={form.nom} onChange={handleChange}
                             placeholder="Votre nom" className="form-input" />
                    </div>
                    <div>
                      <label htmlFor="c-email" className="form-label">
                        E-mail <span className="text-golden-600">*</span>
                      </label>
                      <input id="c-email" name="email" type="email" required
                             value={form.email} onChange={handleChange}
                             placeholder="votre@email.fr" className="form-input" />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="c-sujet" className="form-label">
                      Sujet <span className="text-golden-600">*</span>
                    </label>
                    <input id="c-sujet" name="sujet" type="text" required
                           value={form.sujet} onChange={handleChange}
                           placeholder="Ex. : Question sur les allergènes" className="form-input" />
                  </div>

                  <div className="mb-6">
                    <label htmlFor="c-message" className="form-label">
                      Message <span className="text-golden-600">*</span>
                    </label>
                    <textarea id="c-message" name="message" rows={5} required
                              value={form.message} onChange={handleChange}
                              placeholder="Votre message…"
                              className="form-input resize-none" />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full py-4 rounded-full font-semibold text-white transition-all duration-300 ${
                      loading
                        ? 'bg-forest-400 cursor-not-allowed'
                        : 'bg-forest-600 hover:bg-forest-800 hover:-translate-y-0.5 hover:shadow-lg'
                    }`}
                  >
                    {loading ? 'Envoi…' : 'Envoyer le message'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
