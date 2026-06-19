const https = require('https');

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || 'noreply@resa-service.com';
const SUPABASE_URL = (process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '');
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const RESTAURANT_ID = process.env.RESTAURANT_ID;

function httpsGet(hostname, path, headers) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      { hostname, path, method: 'GET', headers, rejectUnauthorized: false },
      (r) => {
        let responseBody = '';
        r.on('data', (chunk) => (responseBody += chunk));
        r.on('end', () => resolve({ status: r.statusCode, body: responseBody }));
      }
    );
    req.on('error', reject);
    req.end();
  });
}

function httpsPost(hostname, path, headers, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const req = https.request(
      {
        hostname,
        path,
        method: 'POST',
        headers: { ...headers, 'Content-Length': Buffer.byteLength(data) },
        rejectUnauthorized: false,
      },
      (r) => {
        let responseBody = '';
        r.on('data', (chunk) => (responseBody += chunk));
        r.on('end', () => resolve({ status: r.statusCode, body: responseBody }));
      }
    );
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

function resendSend(payload) {
  return httpsPost('api.resend.com', '/emails', {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${RESEND_API_KEY}`,
  }, payload);
}

function supabaseInsert(table, row) {
  const urlObj = new URL(SUPABASE_URL);
  return httpsPost(urlObj.hostname, `/rest/v1/${table}`, {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    apikey: SUPABASE_SERVICE_KEY,
    Prefer: 'return=minimal',
  }, row);
}

function supabaseFetch(table, query) {
  const urlObj = new URL(SUPABASE_URL);
  return httpsGet(urlObj.hostname, `/rest/v1/${table}?${query}`, {
    Authorization: `Bearer ${SUPABASE_SERVICE_KEY}`,
    apikey: SUPABASE_SERVICE_KEY,
    Accept: 'application/json',
  });
}

const FONTS = `<link href="https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:wght@700;800&family=Hanken+Grotesk:wght@400;500;600&display=swap" rel="stylesheet">`;
const MONOGRAM = `<div style="display:inline-block;width:34px;height:34px;border-radius:10px;background:#13503B;text-align:center;line-height:34px;vertical-align:middle;"><span style="color:#F5F1E9;font-family:'Schibsted Grotesk',Arial,sans-serif;font-weight:800;font-size:17px;letter-spacing:-0.03em;">R</span></div>`;
const WORDMARK = `<span style="font-family:'Schibsted Grotesk',Arial,sans-serif;font-weight:800;font-size:18px;letter-spacing:-0.03em;color:#16201B;vertical-align:middle;margin-left:9px;">RESA<span style="color:#C77E3A;">.</span></span>`;

function detailsTable(rows) {
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

module.exports = function (app) {
  app.use(require('express').json());

  app.post('/api/send-email', async (req, res) => {
    try {
      const p = req.body;
      const fullName = `${p.prenom} ${p.nom}`;
      const manageUrl = `https://resa-service.com/restaurant/${RESTAURANT_ID}/reservations`;

      const [restaurantFetch, dbResult] = await Promise.all([
        supabaseFetch('restaurants', `id=eq.${RESTAURANT_ID}&select=email`),
        supabaseInsert('reservations', {
          restaurant_id: RESTAURANT_ID,
          date: p.eventDateISO,
          time_slot: p.heure,
          covers: parseInt(p.couverts, 10),
          name: fullName,
          email: p.email,
          phone: p.telephone || '',
          notes: p.message || '',
          status: 'pending',
        }),
      ]);

      if (dbResult.status >= 400) {
        console.error('Supabase insert error:', dbResult.body);
        return res.status(500).json({ error: 'Supabase error', details: dbResult.body });
      }

      let restaurantEmail = '';
      try {
        const rows = JSON.parse(restaurantFetch.body);
        restaurantEmail = rows[0]?.email ?? '';
      } catch (e) {
        console.error('Failed to parse restaurant email:', restaurantFetch.body);
      }

      const detailRows = [
        ['Nom', fullName],
        ['Email', p.email],
        ['Téléphone', p.telephone || '—'],
        ['Date', p.eventDate],
        ['Heure', p.heure],
        ['Couverts', `${p.couverts} personne${Number(p.couverts) > 1 ? 's' : ''}`],
        ...(p.message ? [['Notes', p.message]] : []),
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

      const [r1, r2] = await Promise.all([
        resendSend({
          from: `Bocante <${FROM_EMAIL}>`,
          to: restaurantEmail,
          subject: `Nouvelle réservation — ${fullName} — ${p.eventDate} à ${p.heure}`,
          html: restaurantHtml,
        }),
        resendSend({
          from: `Bocante <${FROM_EMAIL}>`,
          to: p.email,
          subject: 'Confirmation de votre demande de réservation — Bocante',
          html: clientHtml,
        }),
      ]);

      if (r1.status >= 400 || r2.status >= 400) {
        console.error('Resend error:', r1.body, r2.body);
        return res.status(500).json({ error: 'Resend error' });
      }

      res.status(200).json({ success: true });
    } catch (err) {
      console.error('send-email error:', err);
      res.status(500).json({ error: String(err) });
    }
  });

  app.post('/api/autoreply', async (req, res) => {
    try {
      const p = req.body;
      const isConfirmed = p.reservationType === 'CONFIRMÉE';

      const badgeBg     = isConfirmed ? '#E4F1EA' : '#F4E2DD';
      const badgeBorder = isConfirmed ? 'rgba(30,122,82,0.2)' : 'rgba(168,71,58,0.2)';
      const badgeText   = isConfirmed ? '#1E7A52' : '#A8473A';
      const badgeLabel  = isConfirmed ? '✓ Réservation confirmée' : '✕ Réservation refusée';
      const badgeSub    = isConfirmed ? 'Votre table est réservée.' : 'Le restaurant ne peut pas honorer cette demande.';

      const html = `
        <!DOCTYPE html><html><head>${FONTS}</head>
        <body style="margin:0;padding:0;background:#F5F1E9;">
          <div style="font-family:'Hanken Grotesk','Helvetica Neue',Arial,sans-serif;max-width:560px;margin:0 auto;background:#F5F1E9;padding:32px 24px;">

            <div style="text-align:center;margin-bottom:28px;">
              ${MONOGRAM}${WORDMARK}
            </div>

            <div style="background:${badgeBg};border:1px solid ${badgeBorder};border-radius:12px;padding:20px 24px;text-align:center;margin-bottom:24px;">
              <p style="margin:0 0 4px;font-size:16px;font-weight:700;color:${badgeText};">${badgeLabel}</p>
              <p style="margin:0;font-size:13px;color:#5E665E;">${badgeSub}</p>
            </div>

            <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:24px;margin-bottom:${p.reservationComment2 ? '16px' : '24px'};">
              <p style="margin:0 0 14px;font-size:11px;font-weight:600;letter-spacing:0.1em;color:#9A9587;text-transform:uppercase;">Réservation concernée</p>
              <table style="width:100%;border-collapse:collapse;">
                <tr>
                  <td style="padding:9px 0;border-bottom:1px solid #F0EADD;color:#9A9587;font-size:13px;width:38%;">Client</td>
                  <td style="padding:9px 0;border-bottom:1px solid #F0EADD;color:#16201B;font-size:14px;font-weight:500;">${p.fullName}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0;border-bottom:1px solid #F0EADD;color:#9A9587;font-size:13px;">Date</td>
                  <td style="padding:9px 0;border-bottom:1px solid #F0EADD;color:#16201B;font-size:14px;font-weight:500;">${p.eventDate} à ${p.eventTime}</td>
                </tr>
                <tr>
                  <td style="padding:9px 0;color:#9A9587;font-size:13px;">Couverts</td>
                  <td style="padding:9px 0;color:#16201B;font-size:14px;font-weight:500;">${p.numberOfGuests} personne${Number(p.numberOfGuests) > 1 ? 's' : ''}</td>
                </tr>
              </table>
            </div>

            <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:20px 24px;margin-bottom:${p.reservationComment2 ? '16px' : '24px'};">
              <p style="margin:0;font-size:14px;color:#5E665E;line-height:1.6;font-style:italic;">${p.reservationComment}</p>
            </div>

            ${p.reservationComment2 ? `
            <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
              <p style="margin:0;font-size:14px;color:#5E665E;line-height:1.6;">${p.reservationComment2}</p>
            </div>` : ''}

            <div style="background:#FFFFFF;border:1px solid #E5DED0;border-radius:12px;padding:20px 24px;margin-bottom:24px;">
              <p style="margin:0 0 5px;font-size:14px;font-weight:600;color:#16201B;">Bocante</p>
              <p style="margin:0 0 3px;font-size:13px;color:#5E665E;">L'Isle-sur-la-Sorgue</p>
              <p style="margin:0;font-size:13px;color:#5E665E;">04 32 60 17 70</p>
            </div>

            <p style="margin:0;text-align:center;font-size:12px;color:#9A9587;">
              Propulsé par <a href="https://resa-service.com" style="color:#9A9587;">RESA</a> · resa-service.com
            </p>
          </div>
        </body></html>
      `;

      const r = await resendSend({
        from: `Bocante <${FROM_EMAIL}>`,
        to: p.email,
        subject: `Votre réservation chez Bocante est ${p.reservationType}`,
        html,
      });

      if (r.status >= 400) {
        console.error('Resend autoreply error:', r.body);
        return res.status(500).json({ error: 'Resend error', details: r.body });
      }

      res.status(200).json({ success: true });
    } catch (err) {
      console.error('autoreply error:', err);
      res.status(500).json({ error: String(err) });
    }
  });
};
