# Laboratorio 5 · Auditoría del Canal de denuncias

**12 minutos · por grupos · temario 2.16 a 2.18 aplicado al proyecto · aplicación `imagina-accesibilidad-cliente`**

Ahora toca la aplicación de verdad: el Canal de denuncias hecho en React. Vais a auditarlo con todo lo de hoy, en forma de **bingo**. No hay comprobador: aquí la herramienta sois vosotros.

## Antes de empezar (1 minuto)

Quien tenga el proyecto instalado comparte pantalla. En su terminal:

```bash
cd imagina-accesibilidad-cliente
npm run dev
```

y `Ctrl + clic` en `http://localhost:5173`. Si a alguien no le arrancó, sigue en la pantalla compartida y hace las comprobaciones de panel y teclado en la de la persona que comparte.

## El bingo

Repartid las casillas: la **persona usuaria** hace las de teclado y lector; la **auditoría**, las de panel y pestaña; **piloto** y **portavoz**, las que queden. Para cada casilla, apuntad en `hoja-del-grupo.md` si está **bien** o **a mejorar** y **cómo** lo habéis comprobado.

| | | |
|---|---|---|
| **1 · Idioma** · ¿`lang="es"` en `<html>`? (panel Elements) | **2 · Encabezados** · ¿un solo h1 y un índice ordenado? (lector, `H`) | **3 · Zonas** · ¿el menú lateral tiene nombre? (lector, `D`, o panel) |
| **4 · Teclado** · ¿hay enlace para saltar al contenido? (primer `Tab`) | **5 · Título** · ¿cambia el título de la pestaña en `/reportar`? | **6 · Nombres** · ¿la campana y el botón del menú tienen nombre? (panel) |
| **7 · Formularios** · en `/reportar`, «Siguiente» con todo vacío: ¿el error se lee en el campo? | **8 · Foco** · al pasar al paso 2, ¿dónde queda el foco? ¿qué dice el lector? | **9 · Avisos** · al enviar una denuncia, ¿el lector anuncia el aviso de éxito? |

**Tres en raya** (fila, columna o diagonal) comprobadas: la portavoz escribe **«¡Bingo! Grupo N»** en el chat general.

## Pasos

| Minuto | Paso |
|---|---|
| 0 – 1 | `npm run dev` y reparto de casillas |
| 1 – 9 | Comprobad las casillas y anotad |
| 9 – 12 | Elegid **una cosa que esté bien** y **una que haya que mejorar**, con su criterio WCAG. Es lo que contará la portavoz. |

## Retos (+2 puntos cada uno)

- **Para quien programa:** abrid `src/components/ui/Toast.tsx` y explicad por qué el aviso de éxito puede no anunciarse (pista: ¿la región viva existe **antes** que el mensaje?).
- **Para quien no programa:** pasad Lighthouse (solo «Accessibility») a `/` y a `/reportar`. ¿Qué nota sacan? ¿Cuántas casillas del bingo detecta Lighthouse?
- **Para todo el grupo:** la prueba de los cinco minutos con el lector en `/reportar`: `H`, `D`, `Tab` y `F`.

## Entregable

- `hoja-del-grupo.md`, apartado del laboratorio 5.
- Chat general: **«Grupo N · Lab 5 · casillas comprobadas + bingo + retos»**.

## Para casa

Añadid el enlace «Saltar al contenido principal» al proyecto. El cambio completo está en `proyecto-skip-link.diff`:

```bash
cd imagina-accesibilidad-cliente
git switch -c sesion-2/skip-link
git apply ../sesion-2/proyecto-skip-link.diff
npm run dev
```
