import { useEffect, useState } from 'react';

interface ReservationInfo {
  date: string;
  heure: string;
  invites: string;
  nom: string;
  commentaire: string;
  email: string;
  telephone: string;
}

const CONFIRM_COMMENT =
  "Nous avons le plaisir de vous confirmer votre réservation chez Bocante. Nous serons ravis de vous accueillir et espérons vous faire passer un excellent moment. À très bientôt !";
const CONFIRM_COMMENT2 =
  "Pour toute question, n'hésitez pas à nous contacter. Nous vous attendons avec impatience !";
const REFUSE_COMMENT =
  "Nous vous remercions pour votre demande de réservation. Malheureusement, nous ne sommes pas en mesure de vous accueillir à cette date. Nous sommes désolés pour ce contretemps et espérons avoir l'occasion de vous accueillir lors d'une prochaine visite. N'hésitez pas à nous recontacter pour trouver une autre date.";

export default function GestionReservation() {
  const [info, setInfo] = useState<ReservationInfo | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState<'confirmed' | 'refused' | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setInfo({
      date: params.get('date') || '',
      heure: params.get('heure') || '',
      invites: params.get('invites') || '',
      nom: params.get('nom') || '',
      commentaire: params.get('commentaire') || '',
      email: params.get('email') || '',
      telephone: params.get('telephone') || '',
    });
  }, []);

  const sendAutoreply = async (type: 'CONFIRMÉE' | 'REFUSÉE') => {
    if (!info?.email) return;
    setIsSending(true);
    const isConfirmed = type === 'CONFIRMÉE';

    try {
      const res = await fetch('/api/autoreply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: info.email,
          fullName: info.nom,
          eventDate: info.date,
          eventTime: info.heure,
          numberOfGuests: info.invites,
          reservationType: type,
          reservationComment: isConfirmed ? CONFIRM_COMMENT : REFUSE_COMMENT,
          reservationComment2: isConfirmed ? CONFIRM_COMMENT2 : '',
        }),
      });
      if (!res.ok) throw new Error('Erreur serveur');
      setSent(isConfirmed ? 'confirmed' : 'refused');
    } catch (error) {
      console.error('Erreur autoreply :', error);
      alert('Échec de l\'envoi. Veuillez réessayer.');
    } finally {
      setIsSending(false);
    }
  };

  if (!info) {
    return <p className="text-center mt-10 text-gray-500">Chargement…</p>;
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-parchment-100 p-6">
        <div className="p-8 text-center shadow-lg bg-white rounded-2xl max-w-sm">
          <p className="text-2xl font-semibold mb-2">
            {sent === 'confirmed' ? '✅ Réservation confirmée' : '❌ Réservation refusée'}
          </p>
          <p className="text-gray-500 mt-2">
            Le mail a bien été envoyé à <strong>{info.email}</strong>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-parchment-100 p-6">
      <div className="p-8 shadow-lg bg-white rounded-2xl max-w-sm w-full">
        <h2 className="font-heading text-xl font-semibold text-gray-900 mb-5 text-center">
          Demande de réservation
        </h2>

        <ul className="space-y-2 text-gray-600 text-sm mb-6">
          <li><span className="font-semibold">📅 Date :</span> {info.date || '—'} à {info.heure || '—'}</li>
          <li><span className="font-semibold">👥 Couverts :</span> {info.invites || '—'}</li>
          <li><span className="font-semibold">👤 Nom :</span> {info.nom || '—'}</li>
          <li><span className="font-semibold">📞 Téléphone :</span> {info.telephone || '—'}</li>
          <li><span className="font-semibold">✉️ Email :</span> {info.email || '—'}</li>
          {info.commentaire && (
            <li><span className="font-semibold">💬 Commentaire :</span> {info.commentaire}</li>
          )}
        </ul>

        <div className="flex justify-center gap-4">
          <button
            disabled={isSending}
            onClick={() => sendAutoreply('REFUSÉE')}
            className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Refuser
          </button>
          <button
            disabled={isSending}
            onClick={() => sendAutoreply('CONFIRMÉE')}
            className="bg-forest-600 text-white px-5 py-2 rounded-lg hover:bg-forest-800 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
          >
            Confirmer
          </button>
        </div>

        {isSending && (
          <p className="text-sm text-gray-400 mt-4 text-center">Envoi en cours…</p>
        )}
      </div>
    </div>
  );
}
