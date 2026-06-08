import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  date: string;
  heure: string;
  couverts: string;
  message: string;
}

const HOURS = ['12:00', '12:15', '12:30', '12:45', '13:00', '13:15', '13:30', '13:45', '14:00'];

const infoCards = [
  {
    icon: '🕐',
    title: 'Horaires du restaurant',
    content: (
      <ul className="space-y-2 text-sm">
        {[
          ['Mardi – Samedi', '11h30 – 14h30'],
          ['Lundi & Dimanche', null],
        ].map(([day, time]) => (
          <li key={String(day)} className="flex justify-between gap-4">
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
    icon: '📞',
    title: 'Réserver par téléphone',
    content: (
      <>
        <p className="text-sm text-gray-500 mb-3 leading-relaxed">
          Vous préférez appeler ? Notre équipe est disponible aux heures d'ouverture.
        </p>
        <a href="tel:+33490000000"
           className="font-heading text-xl font-bold text-forest-700 hover:text-forest-500 transition-colors">
          +33 4 90 XX XX XX
        </a>
      </>
    ),
  },
  {
    icon: '👥',
    title: 'Groupes & événements',
    content: (
      <p className="text-sm text-gray-500 leading-relaxed">
        Pour les groupes de plus de 8 personnes ou pour tout événement privatif, merci de nous
        contacter directement par téléphone ou par e-mail.
      </p>
    ),
  },
];

export default function Reservation() {
  const [form, setForm] = useState<FormData>({
    prenom: '', nom: '', email: '', telephone: '',
    date: '', heure: '12:30', couverts: '2', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <>
      <Helmet>
        <title>Réservation – Bocante | Restaurant du midi L'Isle-sur-la-Sorgue</title>
        <meta name="description" content="Réservez votre table chez Bocante à L'Isle-sur-la-Sorgue. Restaurant du midi ouvert du mardi au samedi de 11h30 à 14h30. Réservation en ligne rapide et gratuite." />
        <link rel="canonical" href="https://bocante.fr/reservation" />
      </Helmet>

      {/* Header */}
      <header className="page-header">
        <div className="absolute inset-0 pointer-events-none"
             style={{ background: 'radial-gradient(ellipse at 30% 50%, rgba(196,148,74,0.18) 0%, transparent 60%)' }} />
        <div className="relative max-w-2xl mx-auto">
          <span className="text-[0.72rem] font-semibold tracking-[0.2em] uppercase text-golden-500 mb-3 block">
            Garantissez votre place
          </span>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">Réservation</h1>
          <p className="text-white/75 text-lg">
            Réservez votre table en quelques secondes et venez profiter
            d'un déjeuner sans attente.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-parchment-100">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 items-start">

            {/* Form card */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {submitted ? (
                <div className="text-center py-8">
                  <span className="text-5xl mb-4 block" role="img" aria-label="Succès">✅</span>
                  <h2 className="font-heading text-2xl font-bold text-forest-700 mb-3">
                    Réservation envoyée !
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    Merci <strong>{form.prenom}</strong> ! Votre demande de réservation pour{' '}
                    <strong>{form.couverts} personne{Number(form.couverts) > 1 ? 's' : ''}</strong> le{' '}
                    <strong>{new Date(form.date).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</strong>{' '}
                    à <strong>{form.heure}</strong> a bien été reçue.
                    <br /><br />
                    Vous recevrez une confirmation par e-mail dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="btn btn-outline-green"
                  >
                    Faire une nouvelle réservation
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-xl font-semibold text-gray-900 mb-6">
                    Remplissez le formulaire
                  </h2>
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="prenom" className="form-label">
                          Prénom <span className="text-golden-600">*</span>
                        </label>
                        <input id="prenom" name="prenom" type="text" required
                               value={form.prenom} onChange={handleChange}
                               placeholder="Marie" className="form-input" />
                      </div>
                      <div>
                        <label htmlFor="nom" className="form-label">
                          Nom <span className="text-golden-600">*</span>
                        </label>
                        <input id="nom" name="nom" type="text" required
                               value={form.nom} onChange={handleChange}
                               placeholder="Dupont" className="form-input" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="email" className="form-label">
                          E-mail <span className="text-golden-600">*</span>
                        </label>
                        <input id="email" name="email" type="email" required
                               value={form.email} onChange={handleChange}
                               placeholder="marie@example.fr" className="form-input" />
                      </div>
                      <div>
                        <label htmlFor="telephone" className="form-label">Téléphone</label>
                        <input id="telephone" name="telephone" type="tel"
                               value={form.telephone} onChange={handleChange}
                               placeholder="+33 6 XX XX XX XX" className="form-input" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-5">
                      <div className="sm:col-span-1">
                        <label htmlFor="couverts" className="form-label">
                          Couverts <span className="text-golden-600">*</span>
                        </label>
                        <select id="couverts" name="couverts" required
                                value={form.couverts} onChange={handleChange}
                                className="form-input appearance-none cursor-pointer">
                          {[1,2,3,4,5,6,7,8].map(n => (
                            <option key={n} value={n}>{n} personne{n > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label htmlFor="date" className="form-label">
                          Date <span className="text-golden-600">*</span>
                        </label>
                        <input id="date" name="date" type="date" required
                               min={today}
                               value={form.date} onChange={handleChange}
                               className="form-input cursor-pointer" />
                      </div>
                      <div>
                        <label htmlFor="heure" className="form-label">
                          Heure <span className="text-golden-600">*</span>
                        </label>
                        <select id="heure" name="heure" required
                                value={form.heure} onChange={handleChange}
                                className="form-input appearance-none cursor-pointer">
                          {HOURS.map(h => <option key={h} value={h}>{h}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label htmlFor="message" className="form-label">Message (optionnel)</label>
                      <textarea id="message" name="message" rows={3}
                                value={form.message} onChange={handleChange}
                                placeholder="Allergies, occasion spéciale, demandes particulières…"
                                className="form-input resize-none" />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className={`w-full py-4 rounded-full font-semibold text-base text-white transition-all duration-300 ${
                        loading
                          ? 'bg-forest-400 cursor-not-allowed'
                          : 'bg-forest-600 hover:bg-forest-800 hover:-translate-y-0.5 hover:shadow-lg'
                      }`}
                    >
                      {loading ? 'Envoi en cours…' : 'Confirmer ma réservation'}
                    </button>

                    <p className="text-xs text-gray-400 text-center mt-3">
                      Vous recevrez une confirmation par e-mail. Annulation libre jusqu'à 24h avant.
                    </p>
                  </form>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-5">
              {infoCards.map(({ icon, title, content }) => (
                <div key={title} className="bg-white rounded-2xl shadow-sm p-6">
                  <span className="text-2xl mb-3 block" role="img" aria-hidden="true">{icon}</span>
                  <h3 className="font-heading font-semibold text-gray-900 mb-3">{title}</h3>
                  {content}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
