# Laboratorio 3 · Un formulario que se entiende

**20 minutos · por grupos · temario 2.10 y 2.11 · archivo `denuncia.html` · comprobador: «Laboratorio 3» (barreras 8 a 15)**

Seguid con vuestra `denuncia.html`. Si no terminasteis el laboratorio 2, copiad `soluciones/denuncia-etapa-2-avisos.html` encima de vuestro `denuncia.html` y empezad desde ahí.

**Objetivo:** que una persona que no ve la pantalla sepa qué campo es cada uno, qué formato pide, cuáles son obligatorios y, si se equivoca, qué ha fallado y dónde.

## Pasos

| Minuto | Paso | Quién |
|---|---|---|
| 0 – 1 | Rotad los roles. | Portavoz |
| 1 – 4 | **El «antes».** Con el lector, recorred el formulario con `Tab` y pulsad «Siguiente» con todo vacío. ¿Sabéis en qué campo estáis? ¿Qué pasa al pulsar «Siguiente»? | Persona usuaria · Auditoría anota |
| 4 – 15 | **Arreglad** las barreras 8 a 15 (HTML primero; el JavaScript, al final). | Piloto explica · todos editan |
| 15 – 17 | **Comprobador** («Laboratorio 3»). | Auditoría |
| 17 – 20 | **El «después»:** «Siguiente» con el teléfono mal escrito. ¿Qué dice el lector? Preparad la puesta en común. | Persona usuaria · Portavoz |

## Barreras 8 a 15

| # | Barrera | Qué hacer | WCAG |
|---|---|---|---|
| 8 | Los campos solo tienen placeholder | `<label for="…">` visible para cada campo | 1.3.1 · 3.3.2 |
| 9 | «Los campos en rojo son obligatorios» | Texto con asterisco, el `*` con `aria-hidden` y `required` en cada campo | 1.4.1 · 3.3.2 |
| 10 | La ayuda del teléfono está suelta | `<p id="ayuda-telefono">` + `aria-describedby="ayuda-telefono"` | 1.3.1 |
| 11 | Los radios no tienen etiqueta ni grupo | `<fieldset>` + `<legend>` + `<label for>` en cada opción | 1.3.1 |
| 12 | No hay `autocomplete` | `given-name`, `family-name`, `email`, `tel` | 1.3.5 |
| 13 | El interruptor «anónima» es un `div` con `onclick` | `<label><input type="checkbox" role="switch" id="anonimo" onchange="alternarAnonimo()"> …</label>` | 2.1.1 · 4.1.2 |
| 14 | El error dice «Campo incorrecto» y no está asociado | Mensaje concreto + `aria-invalid="true"` + `aria-describedby` | 3.3.1 · 3.3.3 |
| 15 | Al pulsar «Siguiente» con errores, el foco no se mueve | Llevar el foco al primer campo con error | 3.3.1 |

## Chuleta

```html
<p>Los campos marcados con asterisco (*) son obligatorios.</p>

<label for="telefono">Teléfono <span aria-hidden="true">*</span></label>
<p class="ayuda" id="ayuda-telefono">9 dígitos, sin espacios. Ejemplo: 600000000</p>
<input type="tel" id="telefono" name="telefono" autocomplete="tel" inputmode="numeric"
       required aria-describedby="ayuda-telefono">

<fieldset id="tipo">
  <legend>Tipo de documento <span aria-hidden="true">*</span></legend>
  <input type="radio" name="tipo" id="tipo-dni" value="dni" required> <label for="tipo-dni">DNI</label>
  …
</fieldset>
```

**Barreras 14 y 15 (JavaScript):** no hace falta escribirlo desde cero. Copiad de `soluciones/denuncia-etapa-3-formulario.html` las funciones `MENSAJES`, `mostrarError()`, `limpiarError()`, `validar()` y `alternarAnonimo()`, y **leedlas juntos línea a línea**. Quien programa explica qué hace `aria-invalid`, por qué el mensaje va en `aria-describedby` junto a la ayuda y qué hace `primerError.focus()`.

## Retos (+2 puntos cada uno)

- **Para quien programa:** añadid un resumen de errores al principio del formulario («Hay 3 errores») con enlaces a cada campo, y decidid si debe llevar `role="alert"` o recibir el foco.
- **Para quien no programa:** reescribid estos tres mensajes para que digan qué hacer: «Fecha no válida», «Error en el documento», «Formato incorrecto». Apuntadlos en la hoja.
- **Para todo el grupo:** activad «Quiero denunciar de forma anónima» solo con el teclado (`Tab` y `Espacio`). ¿Qué dice el lector antes y después?

## Entregable

- `hoja-del-grupo.md`, apartado del laboratorio 3.
- Chat general: **«Grupo N · Lab 3 · X/8 + retos»**.

## Si os atascáis

Solución: `soluciones/denuncia-etapa-3-formulario.html`.
