# Sesión 2 · Accesibilidad en HTML y ARIA

Curso *Accesibilidad Web WCAG 2.2 para Desarrolladores React y Angular* · Imagina Formación · Joan Cifo
Lunes 26 de octubre de 2026 · 15:00 – 18:30

Copia esta carpeta dentro de `curso-accesibilidad/` y abre cada archivo HTML con **Live Server**.

## Cómo funciona la sesión

La sesión se trabaja en **cinco laboratorios por grupos mixtos** (salas de Zoom de 3 o 4 personas, con quien programa y quien no). Cada grupo tiene cuatro roles: piloto, persona usuaria (teclado y lector), auditoría y portavoz.

| Carpeta o archivo | Para qué |
|---|---|
| `laboratorios/00-como-trabajamos.md` | Roles, regla del grupo, puntos y atajos |
| `laboratorios/01 … 05-lab-*.md` | La guía de cada laboratorio: pasos con minutos, chuleta, retos y entregable |
| `laboratorios/hoja-del-grupo.md` | La hoja que rellena la auditoría en cada laboratorio |
| `comprobador.html` | Revisa `canal.html` o `denuncia.html` y marca cada barrera como superada o pendiente (ábrelo con Live Server) |

| Laboratorio | Archivo | Temario | Comprobador |
|---|---|---|---|
| 1 · Del div a la semántica | `canal.html` | 2.1 – 2.4 | 12 comprobaciones |
| 2 · Nombrar y anunciar | `denuncia.html` | 2.6 – 2.9 | Barreras 1 a 7 |
| 3 · Un formulario que se entiende | `denuncia.html` | 2.10 – 2.11 | Barreras 8 a 15 |
| 4 · Solo con el teclado | `denuncia.html` | 2.12 – 2.15 | Barreras 16 a 21 |
| 5 · Auditoría del Canal de denuncias | proyecto React | 2.16 – 2.18 | Bingo de 9 casillas |

Puntuaciones del comprobador verificadas en Chromium: `canal.html` 0/12 → `canal-semantico.html` 12/12; `denuncia.html` 0/21 → etapa 1: 6 → etapa 2: 7 → etapa 3: 15 → final: 21/21.

## Detalle de las barreras

| Lab | Archivo | Temario | Qué haces | Solución |
|---|---|---|---|---|
| Lab 1 | `canal.html` | 2.1 – 2.4 | Página principal del Canal de denuncias hecha con `div`: conviértela en semántica (zonas, encabezados, enlace, listas y tabla) | `soluciones/canal-semantico.html` |
| Lab 2 | `denuncia.html` | 2.6 – 2.8 | Botones de icono sin nombre, `aria-expanded`, dos `nav` sin nombre, flecha decorativa, sección sin nombre | `soluciones/denuncia-etapa-1-nombres.html` |
| Lab 2 | `denuncia.html` | 2.9 | Mini-caso por equipos (status, alert u off) y reto: el aviso «Borrador guardado» con una región viva | `soluciones/denuncia-etapa-2-avisos.html` |
| Lab 3 | `denuncia.html` | 2.10 – 2.11 | Etiquetas, ayudas, `fieldset`, `autocomplete`, interruptor nativo, errores accesibles y foco al primer error | `soluciones/denuncia-etapa-3-formulario.html` |
| Lab 4 | `denuncia.html` | 2.12 – 2.15 | `tabindex` positivos, `outline: none`, orden visual, enlace para saltar, «Cancelar» como `button`, foco tapado | `soluciones/denuncia-final.html` |
| Casa | `denuncia.html` y `soluciones/denuncia-final.html` | 2.16 – 2.18 | En casa: escucha las dos versiones con el lector (H, D, Tab, F) y anota 3 diferencias | — |

`denuncia.html` tiene 21 barreras. axe-core 4.14 detecta 4 tipos de infracción que corresponden a 5 de ellas; `denuncia-final.html` no tiene ninguna infracción. En `canal.html`, axe solo avisa de contenido fuera de las zonas (`region`): no detecta los encabezados falsos, el «botón» que no es un botón ni la tabla de `div`.

## Ejemplos de las diapositivas (`ejemplos/`)

| Archivo | Punto | Qué enseña |
|---|---|---|
| `01-tabla-historial.html` | 2.4 | Tabla de datos con `th scope="col"` y `scope="row"` |
| `02-reglas-aria.html` | 2.5 | Las cinco reglas de uso de ARIA del W3C |
| `03-boton-alternar.html` | 2.6 | Estado `aria-pressed` actualizado con JavaScript |
| `04-dar-nombre.html` | 2.7 | `aria-label`, `aria-labelledby` y `aria-describedby` |
| `05-nombre-accesible.html` | 2.7 | Prioridad del nombre accesible y WCAG 2.5.3 |
| `06-ocultar.html` | 2.8 | `aria-hidden`, `.sr-only` y el «foco fantasma» |
| `07-regiones-vivas.html` | 2.9 | `role="status"`, `role="alert"` y por qué la región debe existir antes |
| `08-campo-accesible.html` | 2.10 – 2.11 | Etiqueta, ayuda, control y error |
| `09-grupos-y-errores.html` | 2.10 – 2.11 | `fieldset` + `legend` y foco al primer error |
| `10-tabindex.html` | 2.12 | `tabindex` positivo, `0` y `-1` |
| `11-orden-visual.html` | 2.13 | `row-reverse` frente a orden del código |
| `12-foco-visible.html` | 2.13 | `:focus-visible` y `scroll-padding-top` con cabecera fija |
| `13-saltar-contenido.html` | 2.14 | Enlace para saltar al contenido |
| `14-acordeon.html` | Reserva | Acordeón con `button` dentro del encabezado y `aria-expanded` |

## Proyecto final

1. Antes del descanso: `git clone <repositorio del proyecto>`, `cd imagina-accesibilidad-cliente`, `npm install`.
2. Laboratorio 5: `npm run dev` y bingo de auditoría (guía `laboratorios/05-lab-proyecto.md`).
3. Tarea: enlace «Saltar al contenido principal» con `proyecto-skip-link.diff` (compilado con `npm run build` sin errores):

```bash
cd imagina-accesibilidad-cliente
git switch -c sesion-2/skip-link
git apply ../sesion-2/proyecto-skip-link.diff
npm run dev
```
