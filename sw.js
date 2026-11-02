/* ============================================================
   Funciona sin internet.
   - La página se pide primero a internet (así siempre llega lo
     último) y, si no hay señal, sale la copia guardada.
   - Íconos y archivos fijos salen de la copia guardada.
   - Lo que no es de este sitio (sincronización, Google Maps)
     no se toca: va directo a internet como siempre.
   - El mapa (OpenFreeMap / OpenStreetMap) que ya se vio queda guardado.
   Subir VERSION cuando cambien los íconos, el manifest o Leaflet.
   ============================================================ */
var VERSION = 'rio2026-v4';
var TESELAS = 'rio2026-calles';    /* calles del mapa que ya vieron (la caché vieja de CARTO se borra) */
var ARCHIVOS = ['./', './index.html', './icono.png', './icono-192.png', './icono-512.png',
                './apple-touch-icon.png', './manifest.webmanifest', './rio-2026-mapa.kml',
                './leaflet/leaflet.js', './leaflet/leaflet.css', './leaflet/leaflet-maplibre-gl.js',
                './maplibre/maplibre-gl.js', './maplibre/maplibre-gl.css'];

self.addEventListener('install', function(e){
  e.waitUntil(caches.open(VERSION).then(function(c){
    /* uno por uno: si falta un archivo en el hosting, los demás igual se guardan */
    return Promise.all(ARCHIVOS.map(function(u){ return c.add(u).catch(function(){}); }));
  }).then(function(){ return self.skipWaiting(); }));
});

self.addEventListener('activate', function(e){
  e.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== VERSION && k !== TESELAS; }).map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener('fetch', function(e){
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  /* calles del mapa: la que ya se vio queda guardada (máximo ~1500) */
  /* el estilo de OpenFreeMap dice qué versión de mapa usar: red primero, para no quedar pegados a una vieja */
  if (url.hostname === 'tiles.openfreemap.org' && url.pathname.indexOf('/styles/') === 0) {
    e.respondWith(fetch(req).then(function(r){
      if (r.ok) { var copia = r.clone(); caches.open(TESELAS).then(function(c){ c.put(req, copia); }); }
      return r;
    }).catch(function(){ return caches.match(req); }));
    return;
  }
  if (url.hostname === 'tile.openstreetmap.org' || url.hostname === 'tiles.openfreemap.org') {
    e.respondWith(caches.open(TESELAS).then(function(c){
      return c.match(req).then(function(g){
        if (g) return g;
        return fetch(req).then(function(r){
          if (r.ok) { c.put(req, r.clone()); c.keys().then(function(k){ if (k.length > 3000) c.delete(k[0]); }); }
          return r;
        });
      });
    }));
    return;
  }
  if (url.origin !== self.location.origin) return;

  var esPagina = req.mode === 'navigate' || /\/(index\.html)?$/.test(url.pathname) || url.pathname.slice(-8) === '.json';
  if (esPagina) {
    /* red primero, copia si no hay señal */
    e.respondWith(fetch(req).then(function(r){
      if (r.ok) { var copia = r.clone(); caches.open(VERSION).then(function(c){ c.put(req, copia); }); }
      return r;
    }).catch(function(){
      return caches.match(req, {ignoreSearch:true}).then(function(r){ return r || caches.match('./index.html'); });
    }));
    return;
  }
  /* copia primero, y se actualiza por detrás */
  e.respondWith(caches.match(req).then(function(guardado){
    var red = fetch(req).then(function(r){
      if (r.ok) { var copia = r.clone(); caches.open(VERSION).then(function(c){ c.put(req, copia); }); }
      return r;
    }).catch(function(){ return guardado; });
    return guardado || red;
  }));
});
