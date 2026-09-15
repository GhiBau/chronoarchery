/* ChronoArchery — service worker
 *
 * Objectif : que le panneau démarre sans réseau, y compris dans un gymnase
 * mal couvert. À incrémenter à chaque mise en ligne d'une nouvelle version
 * de la page, sinon les appareils déjà installés garderont l'ancienne.
 */
const VERSION = 'chronoarchery-v1';
const FONTS   = 'chronoarchery-fonts-v1';

const SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './icon-512-maskable.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(VERSION).then(cache => cache.addAll(SHELL))
  );
  // Pas de skipWaiting() volontairement : une mise à jour ne doit jamais
  // recharger la page en plein milieu d'une volée. Le nouveau service worker
  // prend la main à la prochaine ouverture de l'application.
});

self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const noms = await caches.keys();
    await Promise.all(
      noms.filter(n => n !== VERSION && n !== FONTS).map(n => caches.delete(n))
    );
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Navigation : réseau d'abord, pour que les corrections arrivent dès qu'il
  // y a du réseau. Le cache prend le relais hors ligne.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const frais = await fetch(req);
        const cache = await caches.open(VERSION);
        cache.put('./index.html', frais.clone());
        return frais;
      } catch (err) {
        const secours = await caches.match('./index.html');
        return secours || Response.error();
      }
    })());
    return;
  }

  // Polices Google : cache d'abord, elles ne bougent pas. Sans ça, la page
  // hors ligne retomberait sur les polices système.
  if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    event.respondWith((async () => {
      const enCache = await caches.match(req);
      if (enCache) return enCache;
      try {
        const res = await fetch(req);
        const cache = await caches.open(FONTS);
        cache.put(req, res.clone());
        return res;
      } catch (err) {
        return Response.error();
      }
    })());
    return;
  }

  // Icônes, manifeste et autres ressources du site : cache d'abord.
  if (url.origin === self.location.origin) {
    event.respondWith(
      caches.match(req).then(enCache => enCache || fetch(req))
    );
  }
});
