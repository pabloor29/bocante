import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { getOpeningHours, DAYS_FR, DayHours } from '../lib/opening-hours';

const contactItems = [
  {
    icon: '📍',
    label: 'Adresse',
    value: '130 Av. de la Petite Marine\n84800 L\'Isle-sur-la-Sorgue',
    link: 'https://www.google.com/maps/place/Bocante+restaurant+L%E2%80%99isle+sur+la+sorgue/@43.9215158,5.0263741,42m/data=!3m1!1e3!4m15!1m8!3m7!1s0x12b5f5cf07a7993d:0xc0ff34939e844db7!2s130+Av.+de+la+Petite+Marine,+84800+L\'Isle-sur-la-Sorgue!3b1!8m2!3d43.9215922!4d5.0266712!16s%2Fg%2F11c4hb8d_s!3m5!1s0x12b5f5912fe217db:0x77bea833c1fdce5b!8m2!3d43.9216045!4d5.0265398!16s%2Fg%2F11xw81gz4c',
  },
  {
    icon: '📞',
    label: 'Téléphone',
    value: '04 32 60 17 70',
    link: 'tel:+33432601770',
  },
  {
    icon: '✉️',
    label: 'E-mail',
    value: 'bocante.commandes@gmail.com',
    link: 'mailto:bocante.commandes@gmail.com',
  },
];

export default function Contact() {
  const [hours, setHours] = useState<DayHours[] | null>(null);

  useEffect(() => {
    getOpeningHours().then(setHours);
  }, []);

  return (
    <>
      <Helmet>
        <title>Contact & Accès – Bocante | Restaurant L'Isle-sur-la-Sorgue, bord de la Sorgue</title>
        <meta name="description" content="Contact Bocante, restaurant du midi à L'Isle-sur-la-Sorgue, 130 Av. de la Petite Marine, au bord de la Sorgue. Adresse, plan d'accès, horaires et téléphone. Mardi au samedi, 11h30–14h30." />
        <link rel="canonical" href="https://www.bocante.com/contact" />
        <meta property="og:url" content="https://www.bocante.com/contact" />
        <meta property="og:title" content="Contact Bocante – L'Isle-sur-la-Sorgue" />
        <meta property="og:description" content="Adresse, accès et horaires du restaurant Bocante à L'Isle-sur-la-Sorgue." />
        <meta property="og:image" content="https://www.bocante.com/img/plat-001.webp" />
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
            Une question ? Contactez-nous par téléphone ou par e-mail aux heures d'ouverture.
          </p>
        </div>
      </header>

      <div className="py-16 px-4 bg-white">
        <div className="max-w-site mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

            {/* Contact info + horaires */}
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
                      <a href={link ?? undefined}
                         target={label === 'Adresse' ? '_blank' : undefined}
                         rel={label === 'Adresse' ? 'noopener noreferrer' : undefined}
                         className="text-base text-gray-700 hover:text-forest-600 transition-colors whitespace-pre-line">
                        {value}
                      </a>
                    </div>
                  </li>
                ))}
              </ul>

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

            {/* Google Maps */}
            <div className="rounded-3xl overflow-hidden border border-parchment-300 shadow-sm min-h-[500px]">
              <iframe
                title="Localisation Bocante"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2929.9540282364187!2d5.0265398!3d43.9216045!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b5f5912fe217db%3A0x77bea833c1fdce5b!2sBocante%20restaurant%20L%E2%80%99isle%20sur%20la%20sorgue!5e1!3m2!1sfr!2sfr!4v1781431806078!5m2!1sfr!2sfr"
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', minHeight: '500px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
