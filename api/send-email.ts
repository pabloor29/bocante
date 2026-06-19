import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL ?? 'noreply@resa-service.com';

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@700;800&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">`;
const MONOGRAM = `<div style="display:inline-block;width:34px;height:34px;border-radius:10px;background:#13503B;text-align:center;line-height:34px;vertical-align:middle;"><span style="color:#F5F1E9;font-family:'Schibsted Grotesk',Arial,sans-serif;font-weight:800;font-size:17px;letter-spacing:-0.03em;">R</span></div>`;
const WORDMARK = `<span style="font-family:'Schibsted Grotesk',Arial,sans-serif;font-weight:800;font-size:18px;letter-spacing:-0.03em;color:#16201B;vertical-align:middle;margin-left:9px;">RESA<span style="color:#C77E3A;">.</span></span>`;

function detailsTable(rows: [string, string][]): string {
  const last = rows.length - 1;
  return `
    <table style="width:100%;border-collapse:collapse;">
      ${rows.map(([label, value], i) => `
        <tr>
          <td style="padding:9px 0;${i < last ? 'border-bottom:1px solid #F0EADD;' : ''}color:#9A9587;font-size:13px;width:38%;font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;">${label}</td>
          <td style="padding:9px 0;${i < last ? 'border-bottom:1px solid #F0EADD;' : ''}color:#16201B;font-size:14px;font-weight:500;font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;">${value}</td>
        </tr>`).join('')}
    </table>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const p = req.body as Record<string, string>;
  const fullName = `${p.prenom} ${p.nom}`;
  const restaurantId = process.env.RESTAURANT_ID!;
  const manageUrl = `https://resa-service.com/restaurant/${restaurantId}/reservations`;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const [restaurantQuery, insertResult] = await Promise.all([
    supabase.from('restaurants').select('email').eq('id', restaurantId).single(),
    supabase.from('reservations').insert({
      restaurant_id: restaurantId,
      date: p.eventDateISO,
      time_slot: p.heure,
      covers: parseInt(p.couverts, 10),
      name: fullName,
      email: p.email,
      phone: p.telephone ?? '',
      notes: p.message ?? '',
      status: 'pending',
    }),
  ]);

  if (insertResult.error) {
    console.error('Supabase insert error:', JSON.stringify(insertResult.error));
    return res.status(500).json({ error: insertResult.error });
  }

  const restaurantEmail = restaurantQuery.data?.email ?? '';

  const detailRows: [string, string][] = [
    ['Nom', fullName],
    ['Email', p.email],
    ['Téléphone', p.telephone || '—'],
    ['Date', p.eventDate],
    ['Heure', p.heure],
    ['Couverts', `${p.couverts} personne${parseInt(p.couverts, 10) > 1 ? 's' : ''}`],
    ...(p.message ? [['Notes', p.message] as [string, string]] : []),
  ];

  const restaurantHtml = `
    <!DOCTYPE html><html><head>${FONTS}</head>
    <body style="margin:0;padding:0;background:#F5F1E9;">
      <div style="font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#F5F1E9;padding:32px 24px;">

        <div style="text-align:center;margin-bottom:28px;">
          ${MONOGRAM}${WORDMARK}
        </div>

        <div style="background:#F6EBD6;border:1px solid rgba(185,125,43,0.25);border-radius:12px;padding:16px 20px;text-align:center;margin-bottom:24px;">
          <p style="margin:0 0 3px;font-size:15px;font-weight:700;color:#B97D2B;">Nouvelle demande de réservation</p>
          <p style="margin:0;font-size:13px;color:#5E665E;">En attente de validation</p>
        </div>

        <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;color:#9A9587;text-transform:uppercase;">Détails de la réservation</p>
          ${detailsTable(detailRows)}
        </div>

        <div style="text-align:center;margin-bottom:28px;">
          <a href="${manageUrl}" target="_blank" rel="noopener"
            style="display:inline-block;background:#C77E3A;color:#FFFFFF;text-decoration:none;padding:12px 24px;border-radius:10px;font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;font-weight:600;font-size:14px;">
            Gérer dans RESA
          </a>
        </div>

        <p style="margin:0;text-align:center;font-size:12px;color:#9A9587;">
          Propulsé par <a href="https://resa-service.com" style="color:#9A9587;">RESA</a> · resa-service.com
        </p>
      </div>
    </body></html>
  `;

  const clientHtml = `
    <!DOCTYPE html><html><head>${FONTS}</head>
    <body style="margin:0;padding:0;background:#F5F1E9;">
      <div style="font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#F5F1E9;padding:32px 24px;">

        <div style="text-align:center;margin-bottom:28px;">
          ${MONOGRAM}${WORDMARK}
        </div>

        <div style="background:#F6EBD6;border:1px solid rgba(185,125,43,0.25);border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px;">
          <p style="margin:0 0 4px;font-size:15px;font-weight:700;color:#B97D2B;">Demande reçue · En attente de confirmation</p>
          <p style="margin:0;font-size:13px;color:#5E665E;">Votre réservation sera confirmée dès que le restaurant l'aura validée.</p>
        </div>

        <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:24px;margin-bottom:24px;">
          <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;color:#9A9587;text-transform:uppercase;">Récapitulatif</p>
          ${detailsTable(detailRows)}
        </div>

        <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
          <p style="margin:0 0 6px;font-size:14px;font-weight:600;color:#16201B;">Bocante</p>
          <p style="margin:0 0 3px;font-size:13px;color:#5E665E;">L'Isle-sur-la-Sorgue</p>
          <p style="margin:0;font-size:13px;color:#5E665E;">04 32 60 17 70</p>
        </div>

        <p style="margin:0;text-align:center;font-size:12px;color:#9A9587;">
          Propulsé par <a href="https://resa-service.com" style="color:#9A9587;">RESA</a> · resa-service.com
        </p>
      </div>
    </body></html>
  `;

  const [restaurantResult, clientResult] = await Promise.all([
    resend.emails.send({
      from: `Bocante <${FROM_EMAIL}>`,
      to: restaurantEmail,
      subject: `Nouvelle réservation — ${fullName} — ${p.eventDate} à ${p.heure}`,
      html: restaurantHtml,
    }),
    resend.emails.send({
      from: `Bocante <${FROM_EMAIL}>`,
      to: p.email,
      subject: 'Confirmation de votre demande de réservation — Bocante',
      html: clientHtml,
    }),
  ]);

  if (restaurantResult.error) {
    console.error('Resend error (restaurant):', JSON.stringify(restaurantResult.error));
    return res.status(500).json({ error: restaurantResult.error });
  }
  if (clientResult.error) {
    console.error('Resend error (client):', JSON.stringify(clientResult.error));
    return res.status(500).json({ error: clientResult.error });
  }

  return res.status(200).json({ success: true });
}
