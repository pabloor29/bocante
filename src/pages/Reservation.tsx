import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { Helmet } from 'react-helmet-async';
import DatePicker, { registerLocale } from 'react-datepicker';
import { fr } from 'date-fns/locale';
import 'react-datepicker/dist/react-datepicker.css';
import emailjs from '@emailjs/browser';
import { getReservationConfig, ReservationConfig } from '../lib/reservation';

const EMAILJS_SERVICE = 'service_pablo_001';
const EMAILJS_PUBLIC_KEY = 'Hj5zsN3OJSMAXQ9TV';

registerLocale('fr', fr);

const DateInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => (
    <input {...props} ref={ref} autoComplete="new-password" readOnly />
  )
);

interface FormData {
  prenom: string;
  nom: string;
  email: string;
  telephone: string;
  heure: string;
  couverts: string;
  message: string;
}

const FALLBACK_HOURS = ['11:30', '12:00', '12:30', '13:00', '13:30', '14:00'];

const infoCards = [
  // {
  //   icon: '🕐',
  //   title: 'Horaires du restaurant',
  //   content: (
  //     <ul className="space-y-2 text-sm">
  //       {[
  //         ['Mardi – Samedi', '11h30 – 14h30'],
  //         ['Lundi & Dimanche', null],
  //       ].map(([day, time]) => (
  //         <li key={String(day)} className="flex justify-between gap-4">
  //           <span className="text-gray-500">{day}</span>
  //           {time
  //             ? <span className="font-semibold text-forest-700">{time}</span>
  //             : <span className="text-gray-300 italic">Fermé</span>
  //           }
  //         </li>
  //       ))}
  //     </ul>
  //   ),
  // },
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
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormData>({
    prenom: '', nom: '', email: '', telephone: '',
    heure: '12:30', couverts: '2', message: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [config, setConfig] = useState<ReservationConfig | null>(null);

  useEffect(() => {
    getReservationConfig().then(setConfig).catch(console.error);
  }, []);

  useEffect(() => {
    if (config && config.timeSlots.length > 0 && !config.timeSlots.includes(form.heure)) {
      setForm(prev => ({ ...prev, heure: config.timeSlots[Math.floor(config.timeSlots.length / 2)] }));
    }
  }, [config]); // eslint-disable-line react-hooks/exhaustive-deps

  const isDateClosed = (date: Date): boolean => {
    if (!config) return false;
    if (config.closedWeekdays.includes(date.getDay())) return true;
    const dateStr = toLocalDateStr(date);
    if (config.closedDates.includes(dateStr)) return true;
    for (const period of config.holidayPeriods) {
      if (dateStr >= period.debut && dateStr <= period.fin) return true;
    }
    return false;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formRef.current) {
      console.error("Le formulaire n'est pas disponible !");
      return;
    }

    const formElement = formRef.current;
    setLoading(true);

    Promise.all([
      emailjs.sendForm(EMAILJS_SERVICE, 'template_resa_001', formElement, EMAILJS_PUBLIC_KEY),
      emailjs.sendForm(EMAILJS_SERVICE, 'template_resa_002', formElement, EMAILJS_PUBLIC_KEY),
    ])
      .then(() => {
        formRef.current?.reset();
        setSubmitted(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de l'envoi des emails :", error);
        setLoading(false);
      });
  };

  const timeSlots = config?.timeSlots ?? FALLBACK_HOURS;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const formattedDate = selectedDate
    ? selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    : '';

  return (
    <>
      <Helmet>
        <title>Réservation – Bocante | Restaurant du midi L'Isle-sur-la-Sorgue</title>
        <meta name="description" content="Réservez votre table chez Bocante à L'Isle-sur-la-Sorgue. Restaurant du midi ouvert du mardi au samedi de 11h30 à 14h30. Réservation en ligne rapide et gratuite." />
        <link rel="canonical" href="https://bocante.fr/reservation" />
      </Helmet>

      <style>{`
        /* Surcharge du datepicker pour matcher la charte graphique */
        .bocante-datepicker .react-datepicker {
          font-family: inherit;
          border: 1px solid #d1d5db;
          border-radius: 0.75rem;
          box-shadow: 0 4px 16px rgba(0,0,0,0.08);
          overflow: hidden;
        }
        .bocante-datepicker .react-datepicker__header {
          background-color: #2d5016;
          border-bottom: none;
          padding: 12px 0 8px;
        }
        .bocante-datepicker .react-datepicker__current-month,
        .bocante-datepicker .react-datepicker__day-name {
          color: #fff;
          font-weight: 600;
          text-transform: capitalize;
        }
        .bocante-datepicker .react-datepicker__navigation-icon::before {
          border-color: #fff;
        }
        .bocante-datepicker .react-datepicker__day--selected,
        .bocante-datepicker .react-datepicker__day--keyboard-selected {
          background-color: #4a7c2a !important;
          color: #fff !important;
          border-radius: 50%;
        }
        .bocante-datepicker .react-datepicker__day:hover:not(.react-datepicker__day--disabled) {
          background-color: #e8f5e0;
          border-radius: 50%;
        }
        .bocante-datepicker .react-datepicker__day--today {
          font-weight: 700;
          color: #4a7c2a;
        }
        .bocante-datepicker .react-datepicker__day--today.react-datepicker__day--selected {
          color: #fff;
        }
        /* Jours passés */
        .bocante-datepicker .day-past {
          color: #d1d5db !important;
          cursor: not-allowed !important;
        }
        /* Jours fermés (rouge barré) */
        .bocante-datepicker .day-closed {
          background-color: #fee2e2 !important;
          color: #991b1b !important;
          border-radius: 50%;
          position: relative;
          cursor: not-allowed !important;
        }
        .bocante-datepicker .day-closed::after {
          content: '';
          position: absolute;
          left: 50%;
          top: 50%;
          width: 70%;
          height: 1.5px;
          background-color: #991b1b;
          transform: translate(-50%, -50%) rotate(-45deg);
        }
        .bocante-datepicker .react-datepicker__day--disabled {
          cursor: not-allowed !important;
        }
        .bocante-datepicker .react-datepicker__input-container input {
          width: 100%;
          padding: 0.5rem 1rem;
          border: 1px solid #3f6c1c;
          border-radius: 0.375rem;
          font-size: 0.875rem;
          cursor: pointer;
          background-color: #fff;
          outline: none;
          transition: box-shadow 0.15s;
        }
        .bocante-datepicker .react-datepicker__input-container input:focus {
          box-shadow: 0 0 0 3px rgba(74,124,42,0.2);
        }
        .bocante-datepicker .react-datepicker-popper {
          z-index: 50;
        }
      `}</style>

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
                    Demande de réservation envoyée !
                  </h2>
                  <p className="text-gray-500 leading-relaxed mb-6">
                    Merci <strong>{form.prenom}</strong> ! Votre demande de réservation pour{' '}
                    <strong>{form.couverts} personne{Number(form.couverts) > 1 ? 's' : ''}</strong> le{' '}
                    <strong>{formattedDate}</strong>{' '}
                    à <strong>{form.heure}</strong> a bien été reçue.
                    <br /><br />
                    Vous recevrez une confirmation par e-mail dans les plus brefs délais.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setSelectedDate(null); }}
                    className="btn btn-outline-green"
                  >
                    Faire une nouvelle réservation
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-heading text-xl font-semibold text-gray-900 mb-6">
                    Demande de réservation
                  </h2>
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    {/* Champs cachés pour les templates EmailJS */}
                    <input type="hidden" name="company" value="Bocante" />
                    <input type="hidden" name="emailCompany" value="pab.ortg@gmail.com" />
                    <input type="hidden" name="reservationType" value="EN ATTENTE DE CONFIRMATION" />
                    <input type="hidden" name="reservationComment" value="Nous avons bien pris en compte votre demande et elle sera traitée dans les plus brefs délais. Veuillez noter que votre réservation ne sera confirmée qu'une fois que vous aurez reçu un mail de confirmation de notre part. Nous vous remercions pour votre patience et sommes impatients de vous accueillir !" />
                    <input type="hidden" name="reservationComment2" value=" " />
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

                      <div className="bocante-datepicker">
                        <label className="form-label">
                          Date <span className="text-golden-600">*</span>
                        </label>
                        <DatePicker
                          selected={selectedDate}
                          onChange={(date: Date | null) => date && setSelectedDate(date)}
                          filterDate={(date) => !isDateClosed(date)}
                          dayClassName={(date) => {
                            if (date < today) return 'day-past';
                            if (isDateClosed(date)) return 'day-closed';
                            return '';
                          }}
                          minDate={today}
                          dateFormat="dd/MM/yyyy"
                          locale="fr"
                          placeholderText="Choisir une date"
                          required
                          customInput={<DateInput />}
                        />
                        {/* Champ caché transmis au template emailjs */}
                        <input
                          type="hidden"
                          name="eventDate"
                          value={selectedDate ? selectedDate.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''}
                        />
                      </div>

                      <div>
                        <label htmlFor="heure" className="form-label">
                          Heure <span className="text-golden-600">*</span>
                        </label>
                        <select id="heure" name="heure" required
                                value={form.heure} onChange={handleChange}
                                className="form-input appearance-none cursor-pointer">
                          {timeSlots.map(h => <option key={h} value={h}>{h}</option>)}
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
                      disabled={loading || !selectedDate}
                      className={`w-full py-4 rounded-full font-semibold text-base text-white transition-all duration-300 ${
                        loading || !selectedDate
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

function toLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = (date.getMonth() + 1).toString().padStart(2, '0');
  const d = date.getDate().toString().padStart(2, '0');
  return `${y}-${m}-${d}`;
}
