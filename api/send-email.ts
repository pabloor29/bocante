import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAILJS_SERVICE = 'service_pablo_001';
const EMAILJS_PUBLIC_KEY = 'Hj5zsN3OJSMAXQ9TV';
const EMAILJS_PRIVATE_KEY = 'wln8b5Ha4DXyufsb0FGjJ';

async function sendTemplate(templateId: string, templateParams: Record<string, string>) {
  const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE,
      template_id: templateId,
      user_id: EMAILJS_PUBLIC_KEY,
      accessToken: EMAILJS_PRIVATE_KEY,
      template_params: templateParams,
    }),
  });
  if (!res.ok) throw new Error(await res.text());
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const params: Record<string, string> = req.body;

  try {
    await Promise.all([
      sendTemplate('template_resa_001', params),
      sendTemplate('template_resa_002', params),
    ]);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('EmailJS error:', error);
    return res.status(500).json({ error: 'Échec de l\'envoi' });
  }
}
