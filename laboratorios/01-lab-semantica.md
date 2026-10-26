# Laboratorio 1 · Del div a la semántica

**18 minutos · por grupos · temario 2.1 a 2.4 · archivo `canal.html` · comprobador: «Laboratorio 1» (12 comprobaciones)**

`canal.html` es la página principal del Canal de denuncias: una aplicación interna para comunicar irregularidades en la empresa (acoso, robos…), también de forma anónima. Se ve bien, pero está hecha **solo con `div`**. Para un lector de pantalla es una sopa de cajas sin nombre.

**Objetivo:** que el navegador sepa qué es cada cosa. Al terminar, el lector debe poder saltar por encabezados (`H`), por zonas (`D`) y entrar en la tabla (`T`).

## Pasos

| Minuto | Paso | Quién |
|---|---|---|
| 0 – 1 | Repartid los roles (ver `00-como-trabajamos.md`). Todo el mundo abre `canal.html` con Live Server. | Portavoz |
| 1 – 4 | **Escuchad el «antes».** Con el lector encendido, pulsad `H` (encabezados) y `D` (zonas). ¿Qué dice? Abrid el panel Accessibility sobre el título grande: ¿qué rol tiene? | Persona usuaria (en voz alta) · Auditoría anota |
| 4 – 14 | **Arreglad** la página siguiendo la tabla de abajo, fila a fila. Después de cada fila, la persona usuaria la prueba. | Piloto explica · todos editan su copia |
| 14 – 16 | **Comprobador** («Laboratorio 1») en la copia de la auditoría, y en las demás si hay tiempo. | Auditoría |
| 16 – 18 | **Escuchad el «después»** con `H`, `D`, `T` y `Tab`. Preparad la puesta en común. | Persona usuaria · Portavoz |

## Qué cambiar

| # | En `canal.html` hay… | Cámbialo por… | Comprobación |
|---|---|---|---|
| 1 | `div class="cabecera"` · `"menu"` · `"contenido"` · `"pie"` | `<header>` · `<nav aria-label="Menú principal">` · `<main>` · `<footer>` | C1 – C4 |
| 2 | `div class="titulo"` · `"subtitulo"` · `"subsub"` | `<h1>` · `<h2>` · `<h3>` (sin saltos de nivel) | C5 – C7 |
| 3 | `div class="boton" onclick="location.href=…"` | Te lleva a otra página: `<a class="boton" href="denuncia.html">` | C8 |
| 4 | Enlaces del menú y resumen de tres cifras sueltos | `<ul>` con un `<li>` por elemento | C9 – C10 |
| 5 | Tabla hecha con `div class="tabla"`, `"fila"`, `"celda"` | `<table>`, `<thead>`, `<th scope="col">`, `<th scope="row">`, `<td>` | C11 |
| 6 | Los dos `div class="bloque"` | `<section aria-labelledby="titulo-sobre">` y `id="titulo-sobre"` en su `<h2>` | C12 |

## Chuleta

```html
<header class="cabecera">…</header>
<nav class="menu" aria-label="Menú principal">
  <ul><li><a href="#">Canal de denuncias</a></li> …</ul>
</nav>
<main class="contenido">
  <h1 class="titulo">Canal de denuncias</h1>
  <a class="boton" href="denuncia.html">Reporta una denuncia</a>
  <section class="bloque" aria-labelledby="titulo-sobre">
    <h2 class="subtitulo" id="titulo-sobre">Sobre el canal de denuncias</h2>
    <h3 class="subsub">¿Quién puede denunciar?</h3>
  </section>
</main>
<footer class="pie">…</footer>

<table aria-labelledby="titulo-historial">
  <thead><tr><th scope="col">Código de denuncia</th> … </tr></thead>
  <tbody><tr><th scope="row">D-0042</th><td>12/10/2026</td> … </tr></tbody>
</table>
```

**Truco de VSCode:** selecciona `div class="fila"` y pulsa `Ctrl + D` varias veces para editar todas a la vez.

## Retos (+2 puntos cada uno)

- **Para quien programa:** marcad en el menú la página actual con `aria-current="page"` y explicad al grupo qué dice el lector. Después, buscad por qué `role="list"` puede hacer falta en una lista con `list-style: none` (pista: Safari).
- **Para quien no programa:** con el lector, contad cuántos encabezados de cada nivel hay en la versión arreglada y escribid el «índice» de la página en `hoja-del-grupo.md`.
- **Para todo el grupo:** pasad axe DevTools a `canal.html` **antes** de arreglarla (o a la de un compañero que aún no haya empezado). ¿Cuántos de los 6 problemas de la tabla detecta?

## Entregable

- `hoja-del-grupo.md`, apartado del laboratorio 1, rellenado.
- La portavoz escribe en el chat general: **«Grupo N · Lab 1 · X/12 + retos»**.
- En la puesta en común (1 minuto): la diferencia más grande entre lo que oíais **antes** y **después**.

## Si os atascáis

Solución completa: `soluciones/canal-semantico.html`.
