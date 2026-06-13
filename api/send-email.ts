import type { VercelRequest, VercelResponse } from '@vercel/node';
import https from 'https';

const IS_PROD = process.env.VERCEL_ENV === 'production';

function resendSend(payload: object): Promise<{ status: number; body: string }> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = https.request(
      {
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Length': Buffer.byteLength(data),
        },
        rejectUnauthorized: IS_PROD,
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => resolve({ status: res.statusCode ?? 0, body }));
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

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
    const [r1, r2] = await Promise.all([
      resendSend({
        from: 'Bocante <onboarding@resend.dev>',
        to: p.emailCompany,
        subject: `Réservation – ${p.prenom} ${p.nom} – ${p.eventDate}`,
        html: restaurantHtml,
      }),
      resendSend({
        from: 'Bocante <onboarding@resend.dev>',
        to: p.email,
        subject: 'Votre demande de réservation chez Bocante',
        html: clientHtml,
      }),
    ]);

    if (r1.status >= 400 || r2.status >= 400) {
      console.error('Resend error r1:', r1.body, 'r2:', r2.body);
      return res.status(500).json({ error: 'Resend error', r1: r1.body, r2: r2.body });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Send error:', error);
    return res.status(500).json({ error: String(error) });
  }
}
