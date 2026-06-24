import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'bocante-cookie-consent';

export type ConsentValue = 'accepted' | 'declined';

export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(STORAGE_KEY);
  return v === 'accepted' || v === 'declined' ? v : null;
}

export function useConsent(): ConsentValue | null {
  const [consent, setConsent] = useState<ConsentValue | null>(getConsent());

  useEffect(() => {
    const onChange = () => setConsent(getConsent());
    window.addEventListener('storage', onChange);
    window.addEventListener('bocante-consent-change', onChange);
    return () => {
      window.removeEventListener('storage', onChange);
      window.removeEventListener('bocante-consent-change', onChange);
    };
  }, []);

  return consent;
}

function setConsent(value: ConsentValue) {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new Event('bocante-consent-change'));
}

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (getConsent() === null) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => { setConsent('accepted'); setVisible(false); };
  const decline = () => { setConsent('declined'); setVisible(false); };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Consentement aux cookies"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:bottom-6 sm:max-w-md z-50
                 bg-forest-900 text-white rounded-2xl shadow-2xl border border-white/10
                 p-5 sm:p-6"
    >
      <p className="text-sm leading-relaxed text-white/85 mb-4">
        Nous utilisons des cookies de mesure d'audience pour comprendre comment le site est utilisé et l'améliorer.
        Aucune donnée n'est revendue. En savoir plus dans notre{' '}
        <Link to="/confidentialite" className="underline text-golden-500 hover:text-golden-100">
          politique de confidentialité
        </Link>.
      </p>
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <button
          type="button"
          onClick={accept}
          className="flex-1 px-4 py-2.5 rounded-full bg-golden-500 text-forest-900 font-semibold text-sm
                     hover:bg-golden-600 hover:text-white transition-colors"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={decline}
          className="flex-1 px-4 py-2.5 rounded-full border border-white/30 text-white font-semibold text-sm
                     hover:bg-white/10 transition-colors"
        >
          Refuser
        </button>
      </div>
    </div>
  );
}
