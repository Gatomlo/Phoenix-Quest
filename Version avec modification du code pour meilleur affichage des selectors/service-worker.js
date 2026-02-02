const CACHE_NAME = 'app.ranchduphoenixv16';
// Liste des fichiers à mettre en cache
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/medias/addhint.png',
  '/medias/favicon.png',
  '/medias/logo.png',
  '/medias/noway.png',
  '/medias/removehint.png',
  '/medias/timeout.png',
  '/scripts/datepicker.js',
  '/scripts/gijgo.min.js',
  '/scripts/jquery.js',
  '/scripts/main.js',
  '/scripts/bootstrap.min.js',
  '/scripts/bootstrap.min.js.map',
  '/scripts/patternlock.js',
  '/scripts/qrCodeReader.js',
  '/scripts/messages/messages.fr-fr.min.js',
  '/css/bootstrap.min.css',
  '/css/bootstrap.min.css.map',
  '/css/main.css',
  '/css/datepicker.css',
  '/css/gijgo.min.css',
  '/css/patternlock.css',
  '/scenarios/hamlet/img/img0.png',
  '/scenarios/hamlet/img/img1.png',
  '/scenarios/hamlet/img/img2.png',
  '/scenarios/hamlet/img/img3.png',
  '/scenarios/hamlet/img/img4.png',
  '/scenarios/hamlet/img/img5.png',
  '/scenarios/hamlet/img/img6.png',
  '/scenarios/hamlet/img/img6B.png',
  '/scenarios/hamlet/img/img7.png',
  '/scenarios/hamlet/img/img9.png',
  '/scenarios/hamlet/img/img9bis.png',
  '/scenarios/hamlet/img/img10.png',
  '/scenarios/hamlet/img/img11.png',
  '/scenarios/hamlet/img/img12.png',
  '/scenarios/hamlet/img/img13.png',
  '/scenarios/hamlet/img/img14.png',
  '/scenarios/hamlet/img/img15.png',
  '/scenarios/hamlet/img/img16.png',
  '/scenarios/hamlet/img/img17.png',
  '/scenarios/hamlet/img/img18.png',
  '/scenarios/hamlet/img/img19.png',
  '/scenarios/hamlet/img/img20.png',
  '/scenarios/hamlet/img/img22.png',
  '/scenarios/hamlet/img/img23.png',
  '/scenarios/hamlet/img/img23B.png',
  '/scenarios/hamlet/img/img25.png',
  '/scenarios/hamlet/img/img26.png',
  '/scenarios/hamlet/img/img27.png',
  '/scenarios/hamlet/img/img28.png',
  '/scenarios/hamlet/img/img31.png',
  '/scenarios/hamlet/img/img34.png',
  '/scenarios/hamlet/img/img35.png',
  '/scenarios/hamlet/img/img38.png',
  '/scenarios/hamlet/img/img39.png',
  '/scenarios/hamlet/img/img40.png',
  '/scenarios/hamlet/img/img42.png',
  '/scenarios/hamlet/img/img43.png',
  '/scenarios/hamlet/img/img44.png',
  '/scenarios/hamlet/img/img45.png',
  '/scenarios/hamlet/img/img48.png',
  '/scenarios/hamlet/img/img52.png',
  '/scenarios/hamlet/img/img53.png',
  '/scenarios/hamlet/img/img55.png',
  '/scenarios/hamlet/img/img58.png',
  '/scenarios/hamlet/img/img62.png',
  '/scenarios/hamlet/img/img71.png',
  '/scenarios/hamlet/img/img72.png',
  '/scenarios/hamlet/img/img73.png',
  '/scenarios/hamlet/img/img74.png',
  '/scenarios/hamlet/img/img77.png',
  '/scenarios/hamlet/img/img79.png',
  '/scenarios/hamlet/img/img80.png',
  '/scenarios/hamlet/img/img81.png',
  '/scenarios/hamlet/img/img83.png',
  '/scenarios/hamlet/img/img84.png',
  '/scenarios/hamlet/img/img90.png',
  '/scenarios/hamlet/img/img91.png',
  '/scenarios/hamlet/img/img92.png',
  '/scenarios/hamlet/img/img93.png',
  '/scenarios/hamlet/img/img97.png',
  '/scenarios/hamlet/img/img98.png',
  '/scenarios/hamlet/img/img99.png',
  '/scenarios/hamlet/img/img149.png',
  '/scenarios/hamlet/img/img150.png',
  '/scenarios/hamlet/img/img151.png',
  '/scenarios/hamlet/img/img152.png',
  '/scenarios/hamlet/img/img153.png',
  '/scenarios/hamlet/img/img154.png',
  '/scenarios/hamlet/img/img155.png',
  '/scenarios/hamlet/img/img156.png',
  '/scenarios/hamlet/img/img205.png',
  '/scenarios/hamlet/img/map.png',
  '/scenarios/hamlet/img/rules.png',
  '/scenarios/hamlet/scenario.json',
  '/scenarios/innovation/img/rules.png',
  '/scenarios/innovation/scenario.json'
  '/scenarios/innovation/img/book.png',
  '/scenarios/innovation/img/hint.png',
  '/scenarios/innovation/img/img0.png',
  '/scenarios/innovation/img/img8.png',
  '/scenarios/innovation/img/img9.png',
  '/scenarios/innovation/img/img10.png',
  '/scenarios/innovation/img/img11.png',
  '/scenarios/innovation/img/img12.png',
  '/scenarios/innovation/img/img13.png',
  '/scenarios/innovation/img/img14.png',
  '/scenarios/innovation/img/img15.png',
  '/scenarios/innovation/img/img16.png',
  '/scenarios/innovation/img/img17.png',
  '/scenarios/innovation/img/img18.png',
  '/scenarios/innovation/img/img19.png',
  '/scenarios/innovation/img/img20.png',
  '/scenarios/innovation/img/img21.png',
  '/scenarios/innovation/img/img22.png',
  '/scenarios/innovation/img/img23.png',
  '/scenarios/innovation/img/img24.png',
];

// Lors de l'installation, le service worker met ces fichiers en cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting(); // active immédiatement le SW sans attendre
});

// Lors de l'activation, on vide les anciens caches si nécessaire
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // prend le contrôle immédiatement
});

// Interception des requêtes réseau : sert les fichiers depuis le cache si disponible
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // renvoie le fichier du cache ou fait la requête réseau si non trouvé
      return cachedResponse || fetch(event.request);
    })
  );
});
