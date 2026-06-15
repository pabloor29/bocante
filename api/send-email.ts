import type { VercelRequest, VercelResponse } from '@vercel/node';

async function sendEmail(apiKey: string, payload: {
  from: string;
  to: string;
  subject: string;
  html: string;
}) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(JSON.stringify(data));
  return data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const p = req.body as Record<string, string>;
  const apiKey = process.env.RESEND_API_KEY!;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@resa-service.com';
  const restaurantEmail = process.env.RESTAURANT_CONTACT_EMAIL || 'pab.ortg@gmail.com';
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'https://bocante.fr').replace(/\/$/, '');

  const gestionParams = new URLSearchParams({
    date: p.eventDate,
    heure: p.heure,
    invites: p.couverts,
    nom: `${p.prenom} ${p.nom}`,
    email: p.email,
    telephone: p.telephone || '',
    commentaire: p.message || '',
  });
  const gestionUrl = `${siteUrl}/gestion-reservation?${gestionParams.toString()}`;

  const restaurantHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto">
      <h2 style="color:#2d5016">Nouvelle demande de réservation</h2>
      <table style="border-collapse:collapse;width:100%">
        <tr><td style="padding:6px 0;color:#555"><strong>Nom :</strong></td><td>${p.prenom} ${p.nom}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Email :</strong></td><td>${p.email}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Téléphone :</strong></td><td>${p.telephone || '—'}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Date :</strong></td><td>${p.eventDate}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Heure :</strong></td><td>${p.heure}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Couverts :</strong></td><td>${p.couverts}</td></tr>
        <tr><td style="padding:6px 0;color:#555"><strong>Message :</strong></td><td>${p.message || '—'}</td></tr>
      </table>
      <div style="margin-top:24px">
        <a href="${gestionUrl}" style="background:#2d5016;color:#fff;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block">
          Gérer cette réservation
        </a>
      </div>
    </div>
  `;

  const clientHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#1a1a1a">
      <h2 style="color:#2d5016;margin-bottom:4px">Demande de réservation reçue</h2>
      <p style="margin-top:0;color:#555;font-size:14px">Bocante – Restaurant L'Isle-sur-la-Sorgue</p>

      <div style="background:#fef9c3;border-left:4px solid #ca8a04;padding:12px 16px;border-radius:4px;margin:20px 0">
        <strong style="color:#92400e">⏳ En attente de confirmation</strong>
        <p style="margin:6px 0 0;color:#78350f;font-size:14px">
          Votre demande a bien été transmise. Elle sera confirmée ou refusée par notre équipe dans les plus brefs délais. Vous recevrez un second e-mail de notre part.
        </p>
      </div>

      <p>Bonjour <strong>${p.prenom}</strong>,</p>
      <p>Nous avons bien reçu votre demande de réservation avec les informations suivantes :</p>

      <table style="border-collapse:collapse;width:100%;margin:16px 0;background:#f9fafb;border-radius:8px;overflow:hidden">
        <tr style="border-bottom:1px solid #e5e7eb">
          <td style="padding:10px 14px;color:#6b7280;font-size:14px;width:40%">📅 Date</td>
          <td style="padding:10px 14px;font-weight:600">${p.eventDate}</td>
        </tr>
        <tr style="border-bottom:1px solid #e5e7eb">
          <td style="padding:10px 14px;color:#6b7280;font-size:14px">🕐 Heure</td>
          <td style="padding:10px 14px;font-weight:600">${p.heure}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;color:#6b7280;font-size:14px">👥 Couverts</td>
          <td style="padding:10px 14px;font-weight:600">${p.couverts} personne${Number(p.couverts) > 1 ? 's' : ''}</td>
        </tr>
      </table>

      <p style="font-size:14px;color:#555">Veuillez noter que <strong>votre table n'est pas encore réservée</strong>. Vous recevrez un e-mail de confirmation ou de refus de notre part. En cas de non-réponse, n'hésitez pas à nous contacter directement.</p>

      <p>À très bientôt,<br/><strong>L'équipe Bocante</strong></p>
    </div>
  `;

  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return res.status(500).json({ error: 'Missing RESEND_API_KEY' });
  }

  try {
    await Promise.all([
      sendEmail(apiKey, {
        from: `Bocante <${fromEmail}>`,
        to: restaurantEmail,
        subject: `Réservation – ${p.prenom} ${p.nom} – ${p.eventDate}`,
        html: restaurantHtml,
      }),
      sendEmail(apiKey, {
        from: `Bocante <${fromEmail}>`,
        to: p.email,
        subject: 'Votre demande de réservation chez Bocante',
        html: clientHtml,
      }),
    ]);

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Send error:', error);
    return res.status(500).json({ error: String(error) });
  }
}
