import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const p = req.body as Record<string, string>;
  const resend = new Resend(process.env.RESEND_API_KEY);
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'noreply@resa-service.com';
  const isConfirmed = p.reservationType === 'CONFIRMÉE';

  const statusBadge = isConfirmed
    ? `<div style="background:#dcfce7;border-left:4px solid #16a34a;padding:12px 16px;border-radius:4px;margin:20px 0">
        <strong style="color:#166534">✅ Réservation confirmée</strong>
      </div>`
    : `<div style="background:#fee2e2;border-left:4px solid #dc2626;padding:12px 16px;border-radius:4px;margin:20px 0">
        <strong style="color:#991b1b">❌ Réservation refusée</strong>
      </div>`;

  const clientHtml = `
    <div style="font-family:sans-serif;max-width:600px;margin:auto;color:#1a1a1a">
      <h2 style="color:#2d5016;margin-bottom:4px">Votre réservation chez Bocante</h2>
      <p style="margin-top:0;color:#555;font-size:14px">Bocante – Restaurant L'Isle-sur-la-Sorgue</p>

      ${statusBadge}

      <p>Bonjour <strong>${p.fullName}</strong>,</p>
      <p>${p.reservationComment}</p>

      <table style="border-collapse:collapse;width:100%;margin:16px 0;background:#f9fafb;border-radius:8px;overflow:hidden">
        <tr style="border-bottom:1px solid #e5e7eb">
          <td style="padding:10px 14px;color:#6b7280;font-size:14px;width:40%">📅 Date</td>
          <td style="padding:10px 14px;font-weight:600">${p.eventDate}</td>
        </tr>
        <tr style="border-bottom:1px solid #e5e7eb">
          <td style="padding:10px 14px;color:#6b7280;font-size:14px">🕐 Heure</td>
          <td style="padding:10px 14px;font-weight:600">${p.eventTime}</td>
        </tr>
        <tr>
          <td style="padding:10px 14px;color:#6b7280;font-size:14px">👥 Couverts</td>
          <td style="padding:10px 14px;font-weight:600">${p.numberOfGuests} personne${Number(p.numberOfGuests) > 1 ? 's' : ''}</td>
        </tr>
      </table>

      ${p.reservationComment2 ? `<p>${p.reservationComment2}</p>` : ''}
      <p>À très bientôt,<br/><strong>L'équipe Bocante</strong></p>
    </div>
  `;

  try {
    const { error } = await resend.emails.send({
      from: `Bocante <${fromEmail}>`,
      to: p.email,
      subject: isConfirmed
        ? 'Votre réservation chez Bocante est confirmée ✅'
        : 'Suite à votre demande de réservation chez Bocante',
      html: clientHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: 'Resend error', details: error });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Send error:', error);
    return res.status(500).json({ error: String(error) });
  }
}
