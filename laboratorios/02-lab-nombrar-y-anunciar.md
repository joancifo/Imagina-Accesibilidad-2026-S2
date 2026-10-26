# Laboratorio 2 · Nombrar y anunciar

**21 minutos · por grupos · temario 2.6 a 2.9 · archivo `denuncia.html` · comprobador: «Laboratorio 2» (barreras 1 a 7)**

`denuncia.html` es el primer paso del asistente «Reporta una denuncia»: la persona se identifica o elige denunciar de forma anónima. Tiene **21 barreras escondidas**. En este laboratorio quitáis las 7 primeras: botones sin nombre, estados que no se anuncian, cosas que el lector lee y sobran, y un aviso que nadie oye.

## Pasos

| Minuto | Paso | Quién |
|---|---|---|
| 0 – 1 | Rotad los roles. Todo el mundo abre `denuncia.html` con Live Server. | Portavoz |
| 1 – 4 | **Escuchad el «antes».** Con el lector: pasad por los dos botones de la cabecera, por «Siguiente» y pulsad «Guardar borrador». ¿Qué dice? ¿Qué no dice? | Persona usuaria · Auditoría anota |
| 4 – 6 | **Mini-caso: ¿status, alert o nada?** Decidid en grupo las 6 situaciones de abajo. | Portavoz dirige |
| 6 – 17 | **Arreglad** las barreras 1 a 7. Después de cada una, la persona usuaria la prueba. | Piloto explica · todos editan |
| 17 – 19 | **Comprobador** («Laboratorio 2»). | Auditoría |
| 19 – 21 | Preparad la puesta en común: una barrera explicada en voz alta y vuestra respuesta del mini-caso. | Portavoz |

## Barreras 1 a 7

| # | Barrera | Qué hacer | WCAG |
|---|---|---|---|
| 1 | El botón ☰ del menú no tiene nombre | `aria-label="Menú"` | 4.1.2 |
| 2 | El botón ☰ no dice si el menú está abierto | `aria-expanded="true"` y actualizarlo en `alternarMenu()` | 4.1.2 |
| 3 | La campana no tiene nombre | `aria-label="Notificaciones"` | 4.1.2 |
| 4 | Hay dos `<nav>` y ninguno tiene nombre | Un `aria-label` distinto en cada uno | 1.3.1 |
| 5 | El lector lee «Siguiente flecha derecha» | `Siguiente <span aria-hidden="true">➜</span>` | 1.1.1 |
| 6 | La sección «Identifícate» no tiene nombre | `aria-labelledby="titulo-paso"` en la `<section>` | 1.3.1 |
| 7 | «Borrador guardado» aparece, pero el lector no lo anuncia | Región viva que existe desde el principio (ver chuleta) | 4.1.3 |

## Mini-caso · ¿status, alert o nada?

| # | Situación en el Canal de denuncias | Vuestra respuesta |
|---|---|---|
| 1 | Al pulsar «Guardar borrador» aparece «Borrador guardado a las 16:24» | |
| 2 | Aparece «Tu sesión caducará en 1 minuto. ¿Quieres continuar?» | |
| 3 | Al enviar: «No se ha podido enviar la denuncia. Inténtalo de nuevo» | |
| 4 | Un contador «1.950 de 2.000 caracteres» que cambia con cada tecla | |
| 5 | Tras filtrar el historial: «3 denuncias encontradas» | |
| 6 | Al volver al listado: «Tu denuncia D-0042 se ha enviado correctamente» | |

`role="status"`: espera a que el lector termine (confirmaciones). `role="alert"`: interrumpe (errores y urgencias). Nada: si cambia tanto que molestaría.

## Chuleta

```html
<!-- 1, 2 y 3 · nombre y estado en botones de icono -->
<button class="icono" type="button" id="btn-menu" aria-label="Menú"
        aria-expanded="true" aria-controls="menu-lateral" onclick="alternarMenu()">…</button>

<!-- 4 · dos nav, dos nombres -->
<nav id="menu-lateral" aria-label="Menú principal">
<nav class="migas" aria-label="Ruta de navegación">

<!-- 7 · la región viva existe vacía desde que carga la página -->
<div id="avisos" class="aviso" role="status"></div>
```

```js
// 2 · el estado lo actualiza tu código
function alternarMenu() {
  const menu = document.getElementById('menu-lateral');
  const boton = document.getElementById('btn-menu');
  menu.hidden = !menu.hidden;
  boton.setAttribute('aria-expanded', String(!menu.hidden));
}

// 7 · solo cambiamos el texto de la región que ya existe
function avisar(texto) {
  const avisos = document.getElementById('avisos');
  avisos.textContent = texto;
  setTimeout(() => { avisos.textContent = ''; }, 6000);
}
```

## Retos (+2 puntos cada uno)

- **Para quien programa:** ocultad también los dos iconos SVG con `aria-hidden="true" focusable="false"` y explicad por qué no hace falta un `aria-label` en el SVG si ya lo tiene el botón.
- **Para quien no programa:** escribid el nombre accesible **perfecto** para tres botones de icono que uséis a diario (por ejemplo, en el móvil) y comprobad en una web real si lo tienen (panel Accessibility → Name).
- **Para todo el grupo:** pulsad «Guardar borrador» dos veces seguidas con el lector. ¿Se anuncia la segunda vez? ¿Por qué ayuda que el mensaje lleve la hora?

## Entregable

- `hoja-del-grupo.md`, apartado del laboratorio 2: barreras resueltas y respuestas del mini-caso.
- Chat general: **«Grupo N · Lab 2 · X/7 + retos»**.

## Si os atascáis

Solución: `soluciones/denuncia-etapa-1-nombres.html` (barreras 1 a 6) y `soluciones/denuncia-etapa-2-avisos.html` (barrera 7).
