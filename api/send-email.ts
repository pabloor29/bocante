import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = 'Bocante <onboarding@resend.dev>';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const p = req.body as Record<string, string>;

  const restaurantHtml = `
    <h2>Nouvelle demande de réservation</h2>
    <p><strong>Nom :</strong> ${p.prenom} ${p.nom}</p>
    <p><strong>Email :</strong> ${p.email}</p>
    <p><strong>Téléphone :</strong> ${p.telephone || '—'}</p>
    <p><strong>Date :</strong> ${p.eventDate}</p>
    <p><strong>Heure :</strong> ${p.heure}</p>
    <p><strong>Couverts :</strong> ${p.couverts}</p>
    <p><strong>Message :</strong> ${p.message || '—'}</p>
  `;

  const clientHtml = `
    <h2>Demande de réservation reçue</h2>
    <p>Bonjour ${p.prenom},</p>
    <p>Nous avons bien reçu votre demande de réservation pour <strong>${p.couverts} personne${Number(p.couverts) > 1 ? 's' : ''}</strong> le <strong>${p.eventDate}</strong> à <strong>${p.heure}</strong>.</p>
    <p>${p.reservationComment}</p>
    <p>À très bientôt,<br/>L'équipe Bocante</p>
  `;

  try {
    await Promise.all([
      resend.emails.send({
        from: FROM,
        to: p.emailCompany,
        subject: `Réservation – ${p.prenom} ${p.nom} – ${p.eventDate}`,
        html: restaurantHtml,
      }),
      resend.emails.send({
        from: FROM,
        to: p.email,
        subject: 'Votre demande de réservation chez Bocante',
        html: clientHtml,
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Resend error:', error);
    return res.status(500).json({ error: "Échec de l'envoi" });
  }
}
