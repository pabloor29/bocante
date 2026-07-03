/* eslint-disable */
/**
 * Post-build prerender.
 *
 * Why this exists:
 *  - CRA's HTML minifier silently mangles JSON-LD scripts and strips multi-line <noscript>
 *    blocks if they live in public/index.html. We therefore keep public/index.html minimal
 *    and inject all structured data + noscript fallbacks here, AFTER react-scripts build.
 *  - We also generate a per-route build/<route>/index.html with route-specific
 *    <title>, description, canonical, OG/Twitter tags, and a BreadcrumbList JSON-LD.
 *
 * Vercel's filesystem routing then serves each build/<route>/index.html when a URL matches,
 * giving crawlers fully-formed HTML even before React hydrates.
 */

const fs = require('fs');
const path = require('path');

const BUILD_DIR = path.resolve(__dirname, '..', 'build');
const SOURCE_HTML = path.join(BUILD_DIR, 'index.html');
const ORIGIN = 'https://www.bocante.com';

const escapeAttr = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const escapeHtml = (s) =>
  String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

const RESTAURANT_LD = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'LocalBusiness'],
  '@id': `${ORIGIN}/#restaurant`,
  name: 'Bocante',
  alternateName: "Bocante Restaurant L'Isle-sur-la-Sorgue",
  description:
    "Restaurant du midi situé avenue de la Petite Marine, dans la zone commerciale de L'Isle-sur-la-Sorgue, proposant une cuisine 100% maison à base de produits frais et de saison, servis en bocaux. Sur place ou à emporter.",
  slogan: 'Cuisine maison servie en bocaux',
  url: `${ORIGIN}/`,
  telephone: '+33432601770',
  email: 'bocante.commandes@gmail.com',
  image: [
    `${ORIGIN}/img/plat-001.webp`,
    `${ORIGIN}/img/plat-002.webp`,
    `${ORIGIN}/img/plat-003.webp`,
  ],
  logo: `${ORIGIN}/logo.webp`,
  sameAs: [
    'https://www.facebook.com/BocanteRestaurant/',
    'https://www.instagram.com/bocante_restaurant/',
  ],
  address: {
    '@type': 'PostalAddress',
    streetAddress: '130 Av. de la Petite Marine',
    addressLocality: "L'Isle-sur-la-Sorgue",
    addressRegion: 'Vaucluse',
    postalCode: '84800',
    addressCountry: 'FR',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 43.9216045, longitude: 5.0265398 },
  hasMap:
    'https://www.google.com/maps/place/Bocante+restaurant+L%E2%80%99isle+sur+la+sorgue/@43.9215158,5.0263741,42m/data=!3m1!1e3',
  areaServed: [
    { '@type': 'City', name: "L'Isle-sur-la-Sorgue" },
    { '@type': 'City', name: 'Le Thor' },
    { '@type': 'City', name: 'Fontaine-de-Vaucluse' },
    { '@type': 'City', name: 'Saumane-de-Vaucluse' },
  ],
  servesCuisine: [
    'Française',
    'Provençale',
    'Cuisine du marché',
    'Cuisine de saison',
    'Cuisine maison',
  ],
  priceRange: '€€',
  currenciesAccepted: 'EUR',
  paymentAccepted: 'Cash, Credit Card',
  // openingHoursSpecification is injected at build time from Supabase
  // (same source as the contact page) — see fetchOpeningHours() in main().
  menu: `${ORIGIN}/menu`,
  hasMenu: {
    '@type': 'Menu',
    url: `${ORIGIN}/menu`,
    name: 'Menu Bocante',
    inLanguage: 'fr-FR',
  },
  acceptsReservations: 'True',
  takeout: true,
  dineIn: true,
  smokingAllowed: false,
  publicAccess: true,
  potentialAction: [
    {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${ORIGIN}/reservation`,
        inLanguage: 'fr-FR',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
      result: {
        '@type': 'FoodEstablishmentReservation',
        name: 'Réserver une table chez Bocante',
      },
    },
    {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${ORIGIN}/a-emporter`,
        inLanguage: 'fr-FR',
        actionPlatform: [
          'http://schema.org/DesktopWebPlatform',
          'http://schema.org/MobileWebPlatform',
        ],
      },
    },
  ],
};

const WEBSITE_LD = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${ORIGIN}/#website`,
  url: `${ORIGIN}/`,
  name: 'Bocante',
  inLanguage: 'fr-FR',
  publisher: { '@id': `${ORIGIN}/#restaurant` },
};

const ORGANIZATION_LD = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${ORIGIN}/#organization`,
  name: 'Bocante',
  url: `${ORIGIN}/`,
  logo: `${ORIGIN}/logo.webp`,
  sameAs: [
    'https://www.facebook.com/BocanteRestaurant/',
    'https://www.instagram.com/bocante_restaurant/',
  ],
};

// Keep in sync with the visible FAQ rendered in src/pages/Accueil.tsx
// (Google requires FAQPage markup to match content visible on the page).
const FAQ_LD = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Où se trouve le restaurant Bocante à L'Isle-sur-la-Sorgue ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bocante est situé au 130 Avenue de la Petite Marine, 84800 L'Isle-sur-la-Sorgue, dans la zone commerciale de la ville. Retrouvez le plan d'accès sur la page contact du site.",
      },
    },
    {
      '@type': 'Question',
      name: "Quels sont les horaires d'ouverture de Bocante ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Bocante est un restaurant du midi. Retrouvez les jours et horaires d'ouverture à jour sur la page contact du site : bocante.com/contact.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on commander à emporter chez Bocante ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Oui, avec les Bocaux To Go : chaque jour après le service, les bocaux restants sont annoncés vers 14h en story Instagram. Commandez par téléphone au 04 32 60 17 70 ou par e-mail, puis récupérez sur place avant 18h — livraison possible sur L'Isle-sur-la-Sorgue et Le Thor.",
      },
    },
    {
      '@type': 'Question',
      name: 'Faut-il réserver une table chez Bocante ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "La réservation n'est pas obligatoire mais fortement recommandée pour déjeuner sans attente. Vous pouvez réserver directement sur bocante.com ou au 04 32 60 17 70.",
      },
    },
    {
      '@type': 'Question',
      name: 'Peut-on venir en groupe chez Bocante ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui. Pour les groupes de plus de 8 personnes ou pour un événement privatif, contactez-nous directement au 04 32 60 17 70 ou par e-mail à bocante.commandes@gmail.com.',
      },
    },
  ],
};

const HOME_ROUTE = {
  path: '/',
  title: "Restaurant à L'Isle-sur-la-Sorgue – Bocante | Formules dès 17 €",
  description:
    "Restaurant du midi à L'Isle-sur-la-Sorgue (84), avenue de la Petite Marine. Cuisine 100% maison servie en bocaux, formules dès 17 €, produits frais du marché. Sur place ou à emporter. Réservez en ligne en 30 secondes.",
  image: '/img/plat-001-og.jpg',
  crumbs: null,
  isHome: true,
  noscriptH1: "Bocante – Restaurant à L'Isle-sur-la-Sorgue",
  noscriptBody:
    "Restaurant du midi situé au 130 Avenue de la Petite Marine, 84800 L'Isle-sur-la-Sorgue, dans la zone commerciale de la ville. Cuisine 100% maison servie dans des bocaux en verre, à partir de produits frais et de saison du marché.",
};

const routes = [
  {
    path: '/menu',
    title: "Menu & formules dès 17 € – Bocante, L'Isle-sur-la-Sorgue",
    description:
      "Menu Bocante à L'Isle-sur-la-Sorgue : entrées, plats et desserts 100% maison servis en bocaux. Formules déjeuner dès 17 €, carte renouvelée chaque semaine selon le marché. Sur place ou à emporter.",
    image: '/img/plat-002-og.jpg',
    crumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'Menu', url: '/menu' },
    ],
    noscriptH1: "Menu Bocante – Carte du restaurant L'Isle-sur-la-Sorgue",
    noscriptBody:
      'Notre carte évolue chaque semaine selon le marché : entrées, plats et desserts 100% maison servis en bocaux. Formules midi dès 17 €. Sur place ou à emporter.',
  },
  {
    path: '/a-emporter',
    title: "À emporter L'Isle-sur-la-Sorgue – Bocaux Bocante & livraison Le Thor",
    description:
      "Plats à emporter en bocaux à L'Isle-sur-la-Sorgue : cuisine maison Bocante, Bocaux To Go chaque jour à 14h à prix réduits, livraison sur L'Isle-sur-la-Sorgue et Le Thor dès 30 € de commande.",
    image: '/img/plat-001-og.jpg',
    crumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'À emporter', url: '/a-emporter' },
    ],
    noscriptH1: "À emporter – Bocaux Bocante à L'Isle-sur-la-Sorgue",
    noscriptBody:
      "Commandez vos plats Bocante à emporter ou en livraison sur L'Isle-sur-la-Sorgue et Le Thor (à partir de 30 €). Bocaux To Go quotidiens à 14h à prix réduits en story Instagram.",
  },
  {
    path: '/le-concept',
    title: "Le Concept Bocante – Cuisine en bocaux L'Isle-sur-la-Sorgue",
    description:
      "Le concept Bocante : cuisine 100% maison servie dans des bocaux en verre à L'Isle-sur-la-Sorgue. Produits locaux du marché, circuits courts, zéro plastique.",
    image: '/img/plat-003-og.jpg',
    crumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'Le Concept', url: '/le-concept' },
    ],
    noscriptH1: 'Le Concept Bocante',
    noscriptBody:
      "Une cuisine 100% maison servie dans des bocaux en verre, au cœur de L'Isle-sur-la-Sorgue. Produits locaux, circuits courts et zéro plastique.",
  },
  {
    path: '/reservation',
    title: "Réserver une table – Bocante L'Isle-sur-la-Sorgue (gratuit)",
    description:
      "Réservez votre table en 30 secondes chez Bocante, restaurant du midi à L'Isle-sur-la-Sorgue. Confirmation par e-mail, annulation libre jusqu'à 24 h avant.",
    image: '/img/plat-001-og.jpg',
    crumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'Réservation', url: '/reservation' },
    ],
    noscriptH1: 'Réservation en ligne – Restaurant Bocante',
    noscriptBody:
      "Réservez votre table chez Bocante, restaurant du midi à L'Isle-sur-la-Sorgue. Vous pouvez également appeler le 04 32 60 17 70.",
  },
  {
    path: '/contact',
    title: "Contact, horaires & accès – Bocante L'Isle-sur-la-Sorgue",
    description:
      "Contact du restaurant Bocante à L'Isle-sur-la-Sorgue, 130 Av. de la Petite Marine, zone commerciale. Adresse, plan d'accès, horaires d'ouverture à jour et téléphone.",
    image: '/img/plat-001-og.jpg',
    crumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'Contact', url: '/contact' },
    ],
    noscriptH1: "Contact – Restaurant Bocante L'Isle-sur-la-Sorgue",
    noscriptBody:
      "130 Avenue de la Petite Marine, 84800 L'Isle-sur-la-Sorgue. Téléphone 04 32 60 17 70, e-mail bocante.commandes@gmail.com. Horaires d'ouverture à jour sur cette page.",
  },
  {
    path: '/mentions-legales',
    title: "Mentions légales – Bocante L'Isle-sur-la-Sorgue",
    description:
      "Mentions légales du site Bocante, restaurant à L'Isle-sur-la-Sorgue : éditeur, hébergeur, propriété intellectuelle.",
    image: '/img/plat-001-og.jpg',
    crumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'Mentions légales', url: '/mentions-legales' },
    ],
    noscriptH1: 'Mentions légales',
    noscriptBody: 'Informations légales relatives au site bocante.com et au restaurant Bocante.',
    robots: 'index, follow',
  },
  {
    path: '/confidentialite',
    title: 'Politique de confidentialité – Bocante',
    description:
      "Politique de confidentialité du site Bocante : données personnelles collectées, finalités, durée de conservation, droits RGPD et contact.",
    image: '/img/plat-001-og.jpg',
    crumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'Politique de confidentialité', url: '/confidentialite' },
    ],
    noscriptH1: 'Politique de confidentialité',
    noscriptBody: 'Politique de confidentialité du site Bocante, conforme au RGPD.',
    robots: 'index, follow',
  },
  {
    path: '/cgu',
    title: "CGU – Conditions générales d'utilisation Bocante",
    description:
      "Conditions générales d'utilisation du site bocante.com : accès, services, réservations, responsabilités et droit applicable.",
    image: '/img/plat-001-og.jpg',
    crumbs: [
      { name: 'Accueil', url: '/' },
      { name: 'CGU', url: '/cgu' },
    ],
    noscriptH1: "Conditions générales d'utilisation",
    noscriptBody: "Conditions générales d'utilisation du site bocante.com.",
    robots: 'index, follow',
  },
];

function ldScript(obj) {
  return `<script type="application/ld+json">${JSON.stringify(obj)}</script>`;
}

// Opening hours come from Supabase (same source as the contact page) so the
// JSON-LD never drifts from the real schedule. hours[] is indexed Monday first,
// matching DAYS_FR in src/lib/opening-hours.ts.
const DAY_EN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

function loadLocalEnv() {
  const envPath = path.resolve(__dirname, '..', '.env.local');
  if (!fs.existsSync(envPath)) return;
  for (const line of fs.readFileSync(envPath, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].trim();
  }
}

async function fetchOpeningHours() {
  const url = process.env.REACT_APP_SUPABASE_URL;
  const key = process.env.REACT_APP_SUPABASE_ANON_KEY;
  const restaurantId = process.env.REACT_APP_RESTAURANT_ID;
  if (!url || !key || !restaurantId) return null;
  const res = await fetch(
    `${url}/rest/v1/opening_hours?select=hours&restaurant_id=eq.${restaurantId}`,
    { headers: { apikey: key, Authorization: `Bearer ${key}` } }
  );
  if (!res.ok) return null;
  const rows = await res.json();
  return (rows[0] && rows[0].hours) || null;
}

function openingHoursSpec(hours) {
  const groups = new Map();
  hours.forEach((d, i) => {
    if (d.closedDay) return;
    for (const service of ['midi', 'soir']) {
      if (service === 'midi' && d.closedLunch) continue;
      if (service === 'soir' && d.closedDiner) continue;
      const t = d[service];
      if (!t || !t.debut || !t.fin) continue;
      const key = `${t.debut}-${t.fin}`;
      if (!groups.has(key)) groups.set(key, { opens: t.debut, closes: t.fin, days: [] });
      groups.get(key).days.push(DAY_EN[i]);
    }
  });
  return [...groups.values()].map((g) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: g.days,
    opens: g.opens,
    closes: g.closes,
  }));
}

function breadcrumbLd(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: `${ORIGIN}${c.url}`,
    })),
  };
}

function webPageLd(route) {
  const url = `${ORIGIN}${route.path === '/' ? '/' : route.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${url}#webpage`,
    url,
    name: route.title,
    description: route.description,
    inLanguage: 'fr-FR',
    isPartOf: { '@id': `${ORIGIN}/#website` },
    about: { '@id': `${ORIGIN}/#restaurant` },
    primaryImageOfPage: `${ORIGIN}${route.image}`,
  };
}

function noscriptBlock(route) {
  return `<noscript><div style="font-family:system-ui,sans-serif;max-width:720px;margin:0 auto;padding:32px 16px;color:#1c3a28"><h1>${escapeHtml(route.noscriptH1)}</h1><p>${escapeHtml(route.noscriptBody)}</p><p><strong>Bocante</strong> — 130 Avenue de la Petite Marine, 84800 L'Isle-sur-la-Sorgue. Téléphone : <a href="tel:+33432601770">04 32 60 17 70</a>. Horaires à jour sur la <a href="/contact">page contact</a>.</p><ul><li><a href="/">Accueil</a></li><li><a href="/menu">Menu</a></li><li><a href="/le-concept">Le Concept</a></li><li><a href="/a-emporter">À emporter</a></li><li><a href="/reservation">Réservation</a></li><li><a href="/contact">Contact</a></li></ul></div></noscript>`;
}

function transform(src, route) {
  const url = `${ORIGIN}${route.path === '/' ? '/' : route.path}`;
  const imageUrl = `${ORIGIN}${route.image}`;

  let html = src;

  if (!route.isHome) {
    html = html.replace(/<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(route.title)}</title>`);
    html = html.replace(
      /<meta name="description"[^>]*>/,
      `<meta name="description" content="${escapeAttr(route.description)}"/>`
    );
    if (route.robots) {
      html = html.replace(
        /<meta name="robots"[^>]*>/,
        `<meta name="robots" content="${escapeAttr(route.robots)}"/>`
      );
    }
    html = html.replace(/<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}"/>`);
    html = html.replace(
      /<link rel="alternate" hreflang="fr-FR"[^>]*>/,
      `<link rel="alternate" hreflang="fr-FR" href="${url}"/>`
    );
    html = html.replace(
      /<link rel="alternate" hreflang="x-default"[^>]*>/,
      `<link rel="alternate" hreflang="x-default" href="${url}"/>`
    );
    html = html.replace(/<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}"/>`);
    html = html.replace(
      /<meta property="og:title"[^>]*>/,
      `<meta property="og:title" content="${escapeAttr(route.title)}"/>`
    );
    html = html.replace(
      /<meta property="og:description"[^>]*>/,
      `<meta property="og:description" content="${escapeAttr(route.description)}"/>`
    );
    html = html.replace(
      /<meta property="og:image" content="[^"]*"\s*\/?>/,
      `<meta property="og:image" content="${imageUrl}"/>`
    );
    html = html.replace(
      /<meta property="og:image:alt"[^>]*>/,
      `<meta property="og:image:alt" content="${escapeAttr(route.title)}"/>`
    );
    html = html.replace(
      /<meta name="twitter:title"[^>]*>/,
      `<meta name="twitter:title" content="${escapeAttr(route.title)}"/>`
    );
    html = html.replace(
      /<meta name="twitter:description"[^>]*>/,
      `<meta name="twitter:description" content="${escapeAttr(route.description)}"/>`
    );
    html = html.replace(
      /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
      `<meta name="twitter:image" content="${imageUrl}"/>`
    );
  }

  const ldBlocks = [
    ldScript(RESTAURANT_LD),
    ldScript(WEBSITE_LD),
    ldScript(ORGANIZATION_LD),
    ldScript(webPageLd(route)),
  ];
  if (route.isHome) {
    ldBlocks.push(ldScript(FAQ_LD));
  } else if (route.crumbs) {
    ldBlocks.push(ldScript(breadcrumbLd(route.crumbs)));
  }

  html = html.replace(/<\/head>/, `${ldBlocks.join('')}</head>`);

  html = html.replace(/<body>/, `<body>${noscriptBlock(route)}`);

  return html;
}

async function main() {
  if (!fs.existsSync(SOURCE_HTML)) {
    console.error(`[prerender] ${SOURCE_HTML} not found. Run 'react-scripts build' first.`);
    process.exit(1);
  }

  loadLocalEnv();
  let hours = null;
  try {
    hours = await fetchOpeningHours();
  } catch (e) {
    console.warn(`[prerender] opening hours fetch failed: ${e.message}`);
  }
  if (hours) {
    RESTAURANT_LD.openingHoursSpecification = openingHoursSpec(hours);
    console.log('[prerender] ✓ opening hours injected from Supabase');
  } else {
    console.warn('[prerender] ⚠ opening hours unavailable — omitted from JSON-LD');
  }

  const src = fs.readFileSync(SOURCE_HTML, 'utf8');

  const homeHtml = transform(src, HOME_ROUTE);
  fs.writeFileSync(SOURCE_HTML, homeHtml, 'utf8');

  let count = 1;
  for (const route of routes) {
    const destDir = path.join(BUILD_DIR, route.path.replace(/^\//, ''));
    fs.mkdirSync(destDir, { recursive: true });
    const html = transform(src, route);
    fs.writeFileSync(path.join(destDir, 'index.html'), html, 'utf8');
    count++;
  }
  console.log(`[prerender] ✓ wrote ${count} HTML files (home + ${count - 1} routes)`);
}

main().catch((e) => {
  console.error('[prerender] failed:', e);
  process.exit(1);
});
