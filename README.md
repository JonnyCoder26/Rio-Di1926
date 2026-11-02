# Río de Janeiro · 20–26 diciembre 2026

Itinerario del viaje. Una sola página.

## Archivos

- `index.html` — la página completa. Todo está adentro.
- `rio-2026-mapa.kml` — los 54 sitios originales. El botón "Descargar el mapa (KML)"
  de la página arma uno nuevo con el itinerario como esté.
- `leaflet/` y `maplibre/` — las librerías del mapa (Leaflet 1.9.4, MapLibre GL 5.6.0 y
  maplibre-gl-leaflet 0.1.4; licencias en cada carpeta), locales para que funcione sin internet.
- `icono.png`, `icono-192.png`, `icono-512.png`, `apple-touch-icon.png` — los íconos.
- `manifest.webmanifest` — para instalarla en el celular como app.
- `sw.js` — para que funcione sin internet.
- `supabase/proteger.sql` — para proteger la edición con una clave (no se sube al hosting).

## Cómo publicarla

Está publicada con **GitHub Pages** desde la rama `main`:
https://jonnycoder26.github.io/Rio-Di1926/

Cada vez que se hace merge a `main`, GitHub la vuelve a publicar sola en
uno o dos minutos. No hay que subir nada a mano. Para revisarlo:
Settings → Pages → *Deploy from a branch* → `main` / `(root)`.

Los celulares que ya la tienen guardada reciben la versión nueva la
próxima vez que la abran con internet.

**No escriban la clave del grupo en `supabase/proteger.sql` dentro del
repositorio**: el repositorio es público y GitHub Pages también publica
ese archivo. La clave se pone solo en el editor de Supabase, al correrlo.

## Instalar en el celular

Pestaña **Más → Instalar en el celular**. En iPhone: Compartir → Agregar a
inicio. En Android: menú ⋮ → Instalar aplicación. Hay que abrirla una vez
con internet antes de viajar para que quede guardada.

## Proteger la edición (importante)

Hoy cualquiera con el link puede cambiar o borrar el itinerario. Para que
solo el grupo pueda guardar:

1. Abran `supabase/proteger.sql` y cambien `CAMBIEN-ESTA-CLAVE` por la
   clave que quieran.
2. Supabase → SQL Editor → New query → peguen todo → Run.
3. Pásenle la clave a los otros tres. La página la pide una sola vez en
   cada celular, la primera vez que alguien guarde algo.

Mientras no corran el SQL, la página sigue guardando como antes.

## Qué trae

- **Nuestro presupuesto** (pestaña Plata): el presupuesto del grupo por
  categoría, comparado con lo que calcula el plan y con lo gastado. Cubre
  a 3 de los 4 viajeros (quiénes, se elige en Cuentas → Nombres y
  presupuesto). Los números están en `index.html`, en el bloque `id="presu"`.
- **Cuentas del grupo** (pestaña Plata): cada uno anota lo que pagó y la
  página dice quién le debe a quién. Se ve igual en los cuatro celulares.
- **Maleta** (Más): cada uno marca lo que ya empacó.
- **🚕 Al taxista**: en cada dirección, la muestra en grande y en portugués.
- **📅 Agregar al calendario** (Reservas o Más): las citas con hora fija,
  con alarma, sacadas del itinerario.
- **🔊 Frases**: tocar una frase la dice en portugués.
- **🌧️ ¿Está lloviendo?** en Hoy: el plan B de lluvia.
- **💱 Tasa del día**: con internet, la página trae la tasa real a pesos
  (open.er-api.com, máximo cada 6 horas). Si la escriben a mano, manda
  la de ustedes. Sin internet usa la última que guardó (o 605).
- **🌦️ Clima**: pronóstico de Open-Meteo en Hoy y en cada día, desde el
  5 de diciembre (no da más de 16 días adelante). El día 22 y el 23
  avisa las nubes de la mañana para el Cristo, con las cámaras en vivo.
- **🌙 Apariencia** (Más): automática según el celular, clara u oscura.
- **💸 Ya pagó** (Cuentas): marca que alguien saldó su deuda; no cuenta como gasto.
- **↩️ Versiones** (modo edición): las últimas 10 versiones del itinerario que pasaron
  por ese celular; al restaurar una, queda así para los cuatro.
- **🎒 Hoy llevan** (Hoy, durante el viaje): qué llevar y cuánto efectivo, según el día.
- **🍴 ¿Qué hay cerca?** (botón en el mapa): lo más cercano para comer y probar, con minutos a pie.
- **✅ La misión** (Comer y probar): las 10 cosas para probar, tachadas entre los cuatro; Hoy
  recuerda cuáles les quedan en el camino ese día.
- **⏰ ¿Vamos tarde?** (Hoy → Lo que sigue): qué saltar para llegar a lo que tiene hora fija,
  sin tocar las ★.
- **🇨🇴 Consulado de Colombia en Río**: emergencias +55 21 99958-9043 (riodejaneiro.consulado.gov.co).
- **🗺️ Mapa** (pestaña Mapa): satélite (Esri) con calles y nombres, o mapa (OpenFreeMap;
  si falla, OpenStreetMap) con el botón 🛰️/🗺️, con cada parada numerada en orden. Los tramos que el itinerario marca a pie
  van por las calles (rutas de FOSSGIS/OSRM, guardadas): verde si es tranquilo, amarillo si es
  solo de día; Uber y metro en línea punteada. Sale del itinerario:
  si cambian una parada, su orden o su dirección, el mapa cambia. Las
  direcciones nuevas o editadas se buscan en OpenStreetMap (Nominatim) y
  quedan guardadas. Las calles que ya vieron quedan guardadas sin internet.

## Editar

Pestaña **Más → ✏️ Editar el itinerario**. En cada parada aparece **✏️ Editar**,
que abre un formulario con hora, duración, nombre, ★, precio, cómo se llega,
nota, dirección (con sugerencias) y el día. "+ Agregar una parada" abre el
mismo formulario. Al guardar se actualizan el mapa, Google Maps, "Copiar
dirección" y "Al taxista", y se sincroniza entre los cuatro celulares.

## Navegación

La página funciona como una app, con cinco pestañas abajo:

- **Hoy**: antes del viaje, la cuenta regresiva y lo que falta reservar.
  Del 20 al 26 de diciembre, el plan del día y la próxima parada (hora de Río).
- **Días**: el itinerario completo, con una tira fija para saltar a cada día.
- **Mapa**: cada parada en el mapa, en orden, con el recorrido del día.
- **Plata**: convertidor de reales a pesos (la tasa se puede cambiar), el total
  del viaje, lo que cuesta cada día por persona (calculado del itinerario)
  y qué hacer si no hay kit de playa. Abajo, el presupuesto detallado.
- **Más**: seguridad, comer y probar, moverse, frases, documentos, maleta, reservas,
  souvenirs, datos y el botón para editar.

Para ver cómo se ve "Hoy" un día del viaje: `index.html?hoy=2026-12-22T15:00`.
