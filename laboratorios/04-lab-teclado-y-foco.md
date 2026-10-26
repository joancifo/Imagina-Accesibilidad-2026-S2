# Laboratorio 4 · Solo con el teclado

**13 minutos · por grupos · temario 2.12 a 2.15 · archivo `denuncia.html` · comprobador: «Laboratorio 4» (barreras 16 a 21)**

Seguid con vuestra `denuncia.html`. Si os quedasteis atrás, copiad `soluciones/denuncia-etapa-3-formulario.html` encima.

**Objetivo:** que una persona que no usa ratón sepa siempre dónde está, recorra la página en un orden lógico y pueda saltarse la cabecera y el menú.

Este laboratorio es solo HTML y CSS: **buen momento para que pilote alguien que no programa**, con quien programa de copiloto.

## Pasos

| Minuto | Paso | Quién |
|---|---|---|
| 0 – 1 | Rotad los roles. | Portavoz |
| 1 – 3 | **Récord de pulsaciones.** Recargad la página y contad cuántas veces pulsáis `Tab` hasta llegar a «Nombre». ¿Veis siempre dónde está el foco? | Persona usuaria · Auditoría apunta el número |
| 3 – 10 | **Arreglad** las barreras 16 a 21. | Piloto (o copiloto) · todos editan |
| 10 – 11 | **Comprobador** («Laboratorio 4» y después «Todo denuncia.html»). | Auditoría |
| 11 – 13 | **Récord, otra vez:** ahora usando el enlace para saltar. Apuntad los dos números. | Persona usuaria · Portavoz |

## Barreras 16 a 21

| # | Barrera | Qué hacer | WCAG |
|---|---|---|---|
| 16 | `tabindex="1"` en Email y `tabindex="3"` en Siguiente | Quitadlos | 2.4.3 |
| 17 | `*:focus { outline: none; }` | `:focus-visible` con un contorno de 3 px | 2.4.7 |
| 18 | Los botones usan `row-reverse` | Escribidlos en el orden en que se ven y usad `justify-content: flex-end` | 2.4.3 · 1.3.2 |
| 19 | No hay enlace para saltar al contenido | `<a class="saltar" href="#contenido">` y `tabindex="-1"` en `<main>` | 2.4.1 |
| 20 | «Cancelar» es un `<span onclick>` | `<button type="button">` | 2.1.1 · 4.1.2 |
| 21 | Con zoom, el foco queda debajo de la cabecera fija | `html { scroll-padding-top: 72px; }` | 2.4.11 |

## Chuleta

```html
<body>
  <a class="saltar" href="#contenido">Saltar al contenido principal</a>
  …
  <main id="contenido" tabindex="-1">
  …
  <div class="acciones">
    <button type="button" class="secundario" onclick="cancelar()">Cancelar</button>
    <button type="button" class="secundario" onclick="guardarBorrador()">Guardar borrador</button>
    <button type="submit" class="principal">Siguiente <span aria-hidden="true">➜</span></button>
  </div>
```

```css
:focus-visible { outline: 3px solid #0725d0; outline-offset: 2px; }
html { scroll-padding-top: 72px; }
.acciones { display: flex; justify-content: flex-end; gap: 12px; margin-top: 24px; }
.saltar { position: absolute; left: 16px; top: -100px; z-index: 100; background: #0725d0; color: #fff; padding: 8px 16px; border-radius: 6px; }
.saltar:focus { top: 8px; }
```

## Retos (+2 puntos cada uno)

- **Para quien programa:** explicad por qué el enlace para saltar **no** puede ocultarse con `display: none` y qué pasaría sin el `tabindex="-1"` del `<main>`.
- **Para quien no programa:** zoom al 200 % (`Ctrl` y `+`), id al final del formulario y volved con `Mayús + Tab`. ¿Queda algún campo tapado por la cabecera? Probadlo antes y después de la barrera 21.
- **Para todo el grupo:** buscad en una web que uséis a diario si tiene enlace para saltar (pulsad `Tab` nada más cargar). Apuntad cuál sí y cuál no.

## Entregable

- `hoja-del-grupo.md`, apartado del laboratorio 4, con los dos números del récord.
- Chat general: **«Grupo N · Lab 4 · X/6 · récord antes → después + retos»**.

## Si os atascáis

Solución: `soluciones/denuncia-final.html`. Con ella, el comprobador da 21 de 21.
