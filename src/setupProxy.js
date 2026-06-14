const https = require('https');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@resa-service.com';
const RESTAURANT_EMAIL = process.env.RESTAURANT_CONTACT_EMAIL || 'pab.ortg@gmail.com';
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

function resendSend(payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = https.request(
      {
        hostname: 'api.resend.com',
        path: '/emails',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
          'Content-Length': Buffer.byteLength(data),
        },
        rejectUnauthorized: false,
      },
      (r) => {
        let body = '';
        r.on('data', (chunk) => (body += chunk));
        r.on('end', () => resolve({ status: r.statusCode, body }));
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

module.exports = function (app) {
  app.use(require('express').json());

  app.post('/api/send-email', (req, res) => {
    const p = req.body;

    const commentaire = [
      p.allergie ? `Allergie : ${p.allergie}` : '',
      p.message || '',
    ].filter(Boolean).join(' — ');

    const gestionParams = new URLSearchParams({
      date: p.eventDate,
      heure: p.heure,
      invites: p.couverts,
      nom: `${p.prenom} ${p.nom}`,
      email: p.email,
      telephone: p.telephone || '',
      commentaire,
    });
    const gestionUrl = `${SITE_URL}/gestion-reservation?${gestionParams.toString()}`;

    const restaurantHtml = `
      <div style="font-family:sans-serif;max-width:600px;margin:auto">
        <h2 style="color:#2d5016">Nouvelle demande de réservation</h2>
        <p><strong>Nom :</strong> ${p.prenom} ${p.nom}</p>
        <p><strong>Email :</strong> ${p.email}</p>
        <p><strong>Téléphone :</strong> ${p.telephone || '—'}</p>
        <p><strong>Date :</strong> ${p.eventDate}</p>
        <p><strong>Heure :</strong> ${p.heure}</p>
        <p><strong>Couverts :</strong> ${p.couverts}</p>
        ${p.allergie ? `<p><strong>Allergie :</strong> ${p.allergie}</p>` : ''}
        <p><strong>Message :</strong> ${p.message || '—'}</p>
        <br/>
        <a href="${gestionUrl}" style="background:#2d5016;color:#fff;padding:14px 28px;text-decoration:none;border-radius:8px;font-weight:bold;display:inline-block">
          Gérer cette réservation
        </a>
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

    Promise.all([
      resendSend({
        from: `Bocante <${FROM_EMAIL}>`,
        to: RESTAURANT_EMAIL,
        subject: `Réservation – ${p.prenom} ${p.nom} – ${p.eventDate}`,
        html: restaurantHtml,
      }),
      resendSend({
        from: `Bocante <${FROM_EMAIL}>`,
        to: p.email,
        subject: 'Votre demande de réservation chez Bocante',
        html: clientHtml,
      }),
    ])
      .then(([r1, r2]) => {
        if (r1.status >= 400 || r2.status >= 400) {
          console.error('Resend error:', r1.body, r2.body);
          return res.status(500).json({ error: 'Resend error', r1: r1.body, r2: r2.body });
        }
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.error('Send error:', err);
        res.status(500).json({ error: String(err) });
      });
  });

  app.post('/api/autoreply', (req, res) => {
    const p = req.body;
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

    resendSend({
      from: `Bocante <${FROM_EMAIL}>`,
      to: p.email,
      subject: isConfirmed
        ? 'Votre réservation chez Bocante est confirmée ✅'
        : 'Suite à votre demande de réservation chez Bocante',
      html: clientHtml,
    })
      .then((r) => {
        if (r.status >= 400) {
          console.error('Resend autoreply error:', r.body);
          return res.status(500).json({ error: 'Resend error', details: r.body });
        }
        res.status(200).json({ success: true });
      })
      .catch((err) => {
        console.error('Autoreply error:', err);
        res.status(500).json({ error: String(err) });
      });
  });
};
