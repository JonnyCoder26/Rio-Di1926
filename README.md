# Río de Janeiro · 20–26 diciembre 2026

Itinerario del viaje. Una sola página.

## Archivos

- `index.html` — la página completa. Todo está adentro.
- `rio-2026-mapa.kml` — los 54 sitios para cargar en Google My Maps.
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

- **Cuentas del grupo** (pestaña Plata): cada uno anota lo que pagó y la
  página dice quién le debe a quién. Se ve igual en los cuatro celulares.
- **Maleta** (Más): cada uno marca lo que ya empacó.
- **🚕 Al taxista**: en cada dirección, la muestra en grande y en portugués.
- **📅 Agregar al calendario** (Reservas o Más): las citas con hora fija,
  con alarma, sacadas del itinerario.
- **🔊 Frases**: tocar una frase la dice en portugués.
- **🌧️ ¿Está lloviendo?** en Hoy: el plan B de lluvia.

## Editar

Pestaña **Más → ✏️ Editar el itinerario**. Los cambios se guardan solos
y se sincronizan entre los cuatro celulares.

## Navegación

La página funciona como una app, con cinco pestañas abajo:

- **Hoy**: antes del viaje, la cuenta regresiva y lo que falta reservar.
  Del 20 al 26 de diciembre, el plan del día y la próxima parada (hora de Río).
- **Días**: el itinerario completo.
- **Comer**: qué probar y dónde comer.
- **Plata**: convertidor de reales a pesos (la tasa se puede cambiar), el total
  del viaje, lo que cuesta cada día por persona (calculado del itinerario)
  y qué hacer si no hay kit de playa. Abajo, el presupuesto detallado.
- **Más**: mapa, moverse, caminar, cuidados, frases, documentos, reservas,
  souvenirs, datos y el botón para editar.

Para ver cómo se ve "Hoy" un día del viaje: `index.html?hoy=2026-12-22T15:00`.
