/*
 * Comprobador de laboratorios · Sesión 2 · Accesibilidad en HTML y ARIA
 * Joan Cifo · Imagina Formación
 *
 * Revisa canal.html (laboratorio 1) y denuncia.html (laboratorios 2, 3 y 4).
 * Solo comprueba lo que se puede comprobar con código. Un cambio cuenta de verdad
 * cuando, además, la persona del grupo que usa el teclado y el lector lo ha probado.
 */
(function (global) {
  'use strict';

  // ───────── Utilidades ─────────
  function textoAccesible(nodo) {
    if (!nodo) return '';
    if (nodo.nodeType === 3) return nodo.textContent;
    if (nodo.nodeType !== 1) return '';
    if (nodo.getAttribute('aria-hidden') === 'true' || nodo.hidden) return '';
    const etiqueta = nodo.tagName.toLowerCase();
    if (etiqueta === 'svg') {
      const titulo = nodo.querySelector('title');
      return titulo ? titulo.textContent : '';
    }
    if (etiqueta === 'img') return nodo.getAttribute('alt') || '';
    if (etiqueta === 'style' || etiqueta === 'script') return '';
    return Array.from(nodo.childNodes).map(textoAccesible).join('');
  }

  function limpiar(texto) {
    return (texto || '').replace(/\s+/g, ' ').trim();
  }

  function etiquetasDe(control, doc) {
    if (control.labels && control.labels.length) return Array.from(control.labels);
    const lista = [];
    if (control.id) {
      doc.querySelectorAll('label[for="' + control.id + '"]').forEach((l) => lista.push(l));
    }
    const envolvente = control.closest('label');
    if (envolvente && !lista.includes(envolvente)) lista.push(envolvente);
    return lista;
  }

  function textoDeIds(ids, doc) {
    return limpiar(
      (ids || '')
        .split(/\s+/)
        .filter(Boolean)
        .map((id) => doc.getElementById(id))
        .filter(Boolean)
        .map((n) => n.textContent)
        .join(' '),
    );
  }

  function nombreAccesible(el, doc, soloAria) {
    if (!el) return '';
    const porId = textoDeIds(el.getAttribute('aria-labelledby'), doc);
    if (porId) return porId;
    const aria = limpiar(el.getAttribute('aria-label'));
    if (aria) return aria;
    if (soloAria) return '';
    if (/^(INPUT|SELECT|TEXTAREA)$/.test(el.tagName)) {
      return limpiar(etiquetasDe(el, doc).map((l) => textoAccesible(l)).join(' '));
    }
    return limpiar(textoAccesible(el));
  }

  function porTexto(doc, selector, texto) {
    return Array.from(doc.querySelectorAll(selector)).find((el) => limpiar(el.textContent).startsWith(texto));
  }

  function porTextoExacto(doc, selector, texto) {
    return Array.from(doc.querySelectorAll(selector)).find((el) => limpiar(textoAccesible(el)) === texto);
  }

  function reglasCss(doc) {
    const reglas = [];
    Array.from(doc.styleSheets || []).forEach((hoja) => {
      let lista = [];
      try {
        lista = Array.from(hoja.cssRules || []);
      } catch (e) {
        lista = [];
      }
      lista.forEach((r) => {
        if (r.selectorText) reglas.push(r);
      });
    });
    return reglas;
  }

  function quitaElFoco(regla) {
    const s = regla.style;
    const contorno = (s.getPropertyValue('outline') || '').toLowerCase();
    const estilo = (s.getPropertyValue('outline-style') || '').toLowerCase();
    const ancho = (s.getPropertyValue('outline-width') || '').toLowerCase();
    return contorno.includes('none') || /^0(px)?$/.test(contorno.trim()) || estilo === 'none' || /^0(px)?$/.test(ancho.trim());
  }

  function enfocables(doc) {
    const selector = 'a[href], button:not([disabled]), input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), [tabindex]';
    return Array.from(doc.querySelectorAll(selector)).filter(
      (el) => el.getAttribute('tabindex') !== '-1' && !el.closest('[hidden]'),
    );
  }

  // ───────── Comprobaciones de canal.html (laboratorio 1) ─────────
  const CANAL = [
    {
      id: 'C1', lab: 1, titulo: 'La cabecera es un <header>', criterio: '1.3.1 Información y relaciones (A)',
      pista: 'Cambia <div class="cabecera"> por <header class="cabecera">.',
      prueba: (doc) => Boolean(doc.querySelector('header')),
    },
    {
      id: 'C2', lab: 1, titulo: 'El menú es un <nav> con nombre', criterio: '1.3.1 (A) · 2.4.1 Evitar bloques (A)',
      pista: '<nav class="menu" aria-label="Menú principal">',
      prueba: (doc) => Array.from(doc.querySelectorAll('nav')).some((n) => nombreAccesible(n, doc, true)),
    },
    {
      id: 'C3', lab: 1, titulo: 'Hay un único <main>', criterio: '1.3.1 (A) · 2.4.1 (A)',
      pista: 'Cambia <div class="contenido"> por <main class="contenido">. Solo uno por página.',
      prueba: (doc) => doc.querySelectorAll('main').length === 1,
    },
    {
      id: 'C4', lab: 1, titulo: 'El pie es un <footer>', criterio: '1.3.1 (A)',
      pista: 'Cambia <div class="pie"> por <footer class="pie">.',
      prueba: (doc) => Boolean(doc.querySelector('footer')),
    },
    {
      id: 'C5', lab: 1, titulo: 'Un único <h1>: «Canal de denuncias»', criterio: '1.3.1 (A) · 2.4.6 Encabezados y etiquetas (AA)',
      pista: 'El div class="titulo" es el h1 de la página.',
      prueba: (doc) => {
        const h1 = doc.querySelectorAll('h1');
        return h1.length === 1 && limpiar(h1[0].textContent) === 'Canal de denuncias';
      },
    },
    {
      id: 'C6', lab: 1, titulo: '«Sobre el canal…» y «Mis denuncias» son <h2>', criterio: '1.3.1 (A)',
      pista: 'Los div class="subtitulo" son h2.',
      prueba: (doc) => {
        const textos = Array.from(doc.querySelectorAll('h2')).map((h) => limpiar(h.textContent));
        return textos.includes('Sobre el canal de denuncias') && textos.includes('Mis denuncias');
      },
    },
    {
      id: 'C7', lab: 1, titulo: 'Los apartados son <h3> y no hay saltos de nivel', criterio: '1.3.1 (A)',
      pista: 'Los div class="subsub" son h3. Después de un h2 viene un h3, nunca un h4.',
      prueba: (doc) => {
        const niveles = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6')).map((h) => Number(h.tagName[1]));
        if (niveles.length < 6 || niveles[0] !== 1) return false;
        const h3 = Array.from(doc.querySelectorAll('h3')).map((h) => limpiar(h.textContent));
        const ordenado = niveles.every((n, i) => i === 0 || n <= niveles[i - 1] + 1);
        return ordenado && h3.includes('Historial de denuncias') && h3.length >= 3;
      },
    },
    {
      id: 'C8', lab: 1, titulo: '«Reporta una denuncia» es un enlace', criterio: '2.1.1 Teclado (A) · 4.1.2 Nombre, función, valor (A)',
      pista: 'Te lleva a otra página: <a class="boton" href="denuncia.html">Reporta una denuncia</a>.',
      prueba: (doc) => {
        const el = porTexto(doc, 'a, button, div, span', 'Reporta una denuncia');
        return Boolean(el && el.tagName === 'A' && el.getAttribute('href'));
      },
    },
    {
      id: 'C9', lab: 1, titulo: 'Los enlaces del menú están en listas', criterio: '1.3.1 (A)',
      pista: '<ul><li><a href="#">Canal de denuncias</a></li> …</ul>',
      prueba: (doc) => {
        const textos = ['Comunicados', 'Mis fichajes', 'Mis ausencias'];
        return textos.every((t) => {
          const a = porTexto(doc, 'a', t);
          return Boolean(a && a.closest('li') && a.closest('ul, ol'));
        });
      },
    },
    {
      id: 'C10', lab: 1, titulo: 'El resumen de tres cifras es una lista', criterio: '1.3.1 (A)',
      pista: '<ul class="resumen"> con un <li> por cifra.',
      prueba: (doc) => {
        const el = porTexto(doc, 'li, div', 'Denuncias resueltas');
        return Boolean(el && el.tagName === 'LI');
      },
    },
    {
      id: 'C11', lab: 1, titulo: 'El historial es una <table> con cabeceras', criterio: '1.3.1 (A)',
      pista: '<table>, <thead>, <th scope="col"> en la primera fila y <th scope="row"> en el código de cada denuncia.',
      prueba: (doc) => {
        const tabla = doc.querySelector('table');
        if (!tabla) return false;
        const col = tabla.querySelectorAll('thead th[scope="col"]').length;
        const fila = tabla.querySelectorAll('tbody th[scope="row"]').length;
        return col >= 4 && fila >= 3;
      },
    },
    {
      id: 'C12', lab: 1, titulo: 'Los dos bloques son <section> con nombre', criterio: '1.3.1 (A)',
      pista: '<section class="bloque" aria-labelledby="titulo-sobre"> y su <h2 id="titulo-sobre">.',
      prueba: (doc) => {
        const secciones = Array.from(doc.querySelectorAll('section'));
        return secciones.length >= 2 && secciones.every((s) => nombreAccesible(s, doc, true));
      },
    },
  ];

  // ───────── Comprobaciones de denuncia.html (laboratorios 2, 3 y 4) ─────────
  const CAMPOS = ['nombre', 'apellidos', 'email', 'telefono', 'documento'];

  const DENUNCIA = [
    // Laboratorio 2 · nombrar y anunciar (2.6 – 2.9)
    {
      id: '1', lab: 2, titulo: 'El botón ☰ del menú tiene nombre', criterio: '4.1.2 Nombre, función, valor (A)',
      pista: 'aria-label="Menú" en <button id="btn-menu">.',
      prueba: (doc) => Boolean(nombreAccesible(doc.getElementById('btn-menu'), doc)),
    },
    {
      id: '2', lab: 2, titulo: 'El botón ☰ dice si el menú está abierto, y se actualiza', criterio: '4.1.2 (A)', tipo: 'accion',
      pista: 'aria-expanded="true" en el botón y, en alternarMenu(), boton.setAttribute(\'aria-expanded\', String(!menu.hidden)).',
      prueba: (doc) => {
        const boton = doc.getElementById('btn-menu');
        const menu = doc.getElementById('menu-lateral');
        if (!boton || !menu || !boton.hasAttribute('aria-expanded')) return false;
        const antes = boton.getAttribute('aria-expanded');
        if (antes !== String(!menu.hidden)) return false;
        boton.click();
        const despues = boton.getAttribute('aria-expanded');
        const bien = despues !== antes && despues === String(!menu.hidden);
        boton.click();
        return bien;
      },
    },
    {
      id: '3', lab: 2, titulo: 'La campana tiene nombre', criterio: '4.1.2 (A)',
      pista: 'aria-label="Notificaciones" en el segundo botón de la cabecera.',
      prueba: (doc) => {
        const botones = Array.from(doc.querySelectorAll('header button')).filter((b) => b.id !== 'btn-menu');
        return botones.length > 0 && botones.every((b) => nombreAccesible(b, doc));
      },
    },
    {
      id: '4', lab: 2, titulo: 'Cada <nav> tiene un nombre distinto', criterio: '1.3.1 (A) · 2.4.1 (A)',
      pista: 'aria-label="Menú principal" y aria-label="Ruta de navegación".',
      prueba: (doc) => {
        const nombres = Array.from(doc.querySelectorAll('nav')).map((n) => nombreAccesible(n, doc, true));
        return nombres.length >= 2 && nombres.every(Boolean) && new Set(nombres).size === nombres.length;
      },
    },
    {
      id: '5', lab: 2, titulo: 'El lector no lee la flecha de «Siguiente»', criterio: '1.1.1 Contenido no textual (A)',
      pista: 'Siguiente <span aria-hidden="true">➜</span>',
      prueba: (doc) => {
        const boton = porTexto(doc, 'button', 'Siguiente');
        return Boolean(boton && !textoAccesible(boton).includes('➜'));
      },
    },
    {
      id: '6', lab: 2, titulo: 'La sección «Identifícate» tiene nombre', criterio: '1.3.1 (A)',
      pista: '<section class="tarjeta" aria-labelledby="titulo-paso">',
      prueba: (doc) => Boolean(nombreAccesible(doc.querySelector('section'), doc, true)),
    },
    {
      id: '7', lab: 2, titulo: '«Borrador guardado» se anuncia en una región viva', criterio: '4.1.3 Mensajes de estado (AA)', tipo: 'accion',
      pista: '<div id="avisos" class="aviso" role="status"></div> en el HTML y, en avisar(), solo cambiar su textContent.',
      prueba: (doc) => {
        const regiones = Array.from(doc.querySelectorAll('[role="status"], [role="alert"], [aria-live="polite"], [aria-live="assertive"]'));
        const vacias = regiones.filter((r) => limpiar(r.textContent) === '');
        if (!vacias.length) return false;
        const boton = porTexto(doc, 'button', 'Guardar borrador');
        if (!boton) return false;
        boton.click();
        return vacias.some((r) => r.isConnected && /borrador guardado/i.test(r.textContent));
      },
    },
    // Laboratorio 3 · formularios (2.10 – 2.11)
    {
      id: '8', lab: 3, titulo: 'Cada campo de texto tiene una <label> visible', criterio: '1.3.1 (A) · 3.3.2 Etiquetas o instrucciones (A)',
      pista: '<label for="nombre">Nombre</label> antes de cada input. El placeholder no es una etiqueta.',
      prueba: (doc) => CAMPOS.every((id) => {
        const campo = doc.getElementById(id);
        return campo && etiquetasDe(campo, doc).some((l) => limpiar(textoAccesible(l)));
      }),
    },
    {
      id: '9', lab: 3, titulo: 'Los obligatorios no dependen del color', criterio: '1.4.1 Uso del color (A) · 3.3.2 (A)',
      pista: '«Los campos marcados con asterisco (*) son obligatorios», el * con aria-hidden y required en cada campo.',
      prueba: (doc) => {
        const requeridos = CAMPOS.every((id) => {
          const c = doc.getElementById(id);
          return c && (c.required || c.getAttribute('aria-required') === 'true');
        });
        return requeridos && !/en rojo/i.test(doc.body.textContent);
      },
    },
    {
      id: '10', lab: 3, titulo: 'La ayuda del teléfono está asociada al campo', criterio: '1.3.1 (A) · 3.3.2 (A)',
      pista: '<p id="ayuda-telefono">9 dígitos…</p> y aria-describedby="ayuda-telefono" en el input.',
      prueba: (doc) => /9 dígitos/i.test(textoDeIds((doc.getElementById('telefono') || { getAttribute: () => '' }).getAttribute('aria-describedby'), doc)),
    },
    {
      id: '11', lab: 3, titulo: 'Los radios están agrupados y etiquetados', criterio: '1.3.1 (A) · 3.3.2 (A)',
      pista: '<fieldset><legend>Tipo de documento</legend> y un <label for> en cada radio.',
      prueba: (doc) => {
        const radios = Array.from(doc.querySelectorAll('input[name="tipo"]'));
        if (!radios.length) return false;
        const grupo = radios[0].closest('fieldset');
        const leyenda = grupo && grupo.querySelector('legend');
        return Boolean(leyenda && limpiar(leyenda.textContent)) && radios.every((r) => r.closest('fieldset') === grupo && etiquetasDe(r, doc).length > 0);
      },
    },
    {
      id: '12', lab: 3, titulo: 'Los datos personales llevan autocomplete', criterio: '1.3.5 Identificar el propósito de la entrada (AA)',
      pista: 'given-name, family-name, email y tel.',
      prueba: (doc) => {
        const esperado = { nombre: 'given-name', apellidos: 'family-name', email: 'email', telefono: 'tel' };
        return Object.keys(esperado).every((id) => {
          const c = doc.getElementById(id);
          return c && c.getAttribute('autocomplete') === esperado[id];
        });
      },
    },
    {
      id: '13', lab: 3, titulo: 'El interruptor «anónima» es un control nativo', criterio: '2.1.1 Teclado (A) · 4.1.2 (A)',
      pista: '<label class="switch"><input type="checkbox" role="switch" id="anonimo" onchange="alternarAnonimo()"> Quiero denunciar…</label>',
      prueba: (doc) => {
        const el = doc.getElementById('anonimo');
        return Boolean(el && el.tagName === 'INPUT' && el.type === 'checkbox' && etiquetasDe(el, doc).length);
      },
    },
    {
      id: '14', lab: 3, titulo: 'Los errores dicen qué hacer y están asociados al campo', criterio: '3.3.1 Identificación de errores (A) · 3.3.3 Sugerencias (AA)', tipo: 'envio',
      pista: 'Al validar: aria-invalid="true" y el id del mensaje en aria-describedby. Nada de «Campo incorrecto».',
      prueba: (doc) => CAMPOS.every((id) => {
        const c = doc.getElementById(id);
        if (!c || c.getAttribute('aria-invalid') !== 'true') return false;
        const texto = textoDeIds(c.getAttribute('aria-describedby'), doc);
        return texto.length > 15 && !/campo incorrecto/i.test(texto);
      }),
    },
    {
      id: '15', lab: 3, titulo: 'Al pulsar «Siguiente» con errores, el foco va al primero', criterio: '3.3.1 (A) · 2.4.3 Orden del foco (A)', tipo: 'envio',
      pista: 'Guarda el primer campo con error y llama a primerError.focus() al terminar de validar.',
      prueba: (doc) => {
        const activo = doc.activeElement;
        return Boolean(activo && activo.id === 'nombre' && activo.getAttribute('aria-invalid') === 'true');
      },
    },
    // Laboratorio 4 · teclado y foco (2.12 – 2.15)
    {
      id: '16', lab: 4, titulo: 'No hay tabindex positivos', criterio: '2.4.3 Orden del foco (A)',
      pista: 'Quita tabindex="1" del email y tabindex="3" de «Siguiente».',
      prueba: (doc) => Array.from(doc.querySelectorAll('[tabindex]')).every((el) => Number(el.getAttribute('tabindex')) <= 0),
    },
    {
      id: '17', lab: 4, titulo: 'El foco se ve', criterio: '2.4.7 Foco visible (AA)',
      pista: 'Borra *:focus { outline: none; } y añade :focus-visible { outline: 3px solid #0725d0; outline-offset: 2px; }',
      prueba: (doc) => {
        const reglas = reglasCss(doc);
        const quita = reglas.some((r) => /:focus(?!-)/.test(r.selectorText) && quitaElFoco(r));
        const pone = reglas.some((r) => /:focus/.test(r.selectorText) && !quitaElFoco(r) && (r.style.getPropertyValue('outline') || r.style.getPropertyValue('outline-style') || r.style.getPropertyValue('box-shadow')));
        return !quita && pone;
      },
    },
    {
      id: '18', lab: 4, titulo: 'El orden de los botones es el mismo en código y en pantalla', criterio: '2.4.3 (A) · 1.3.2 Secuencia con significado (A)',
      pista: 'Escribe Cancelar, Guardar borrador y Siguiente en ese orden y usa justify-content: flex-end, sin row-reverse.',
      prueba: (doc, win) => {
        const cancelar = porTextoExacto(doc, 'button, a, span', 'Cancelar');
        const siguiente = porTexto(doc, 'button', 'Siguiente');
        if (!cancelar || !siguiente) return false;
        const contenedor = siguiente.parentElement;
        const direccion = win.getComputedStyle(contenedor).getPropertyValue('flex-direction') || '';
        const antes = Boolean(cancelar.compareDocumentPosition(siguiente) & 4);
        return antes && !direccion.includes('reverse');
      },
    },
    {
      id: '19', lab: 4, titulo: 'Lo primero de la página es un enlace para saltar al contenido', criterio: '2.4.1 Evitar bloques (A)',
      pista: '<a class="saltar" href="#contenido">Saltar al contenido principal</a> justo después de <body>, y tabindex="-1" en <main id="contenido">.',
      prueba: (doc) => {
        const primero = enfocables(doc)[0];
        if (!primero || primero.tagName !== 'A') return false;
        const destino = (primero.getAttribute('href') || '').replace(/^#/, '');
        const objetivo = destino && doc.getElementById(destino);
        return Boolean(objetivo && objetivo.getAttribute('tabindex') === '-1');
      },
    },
    {
      id: '20', lab: 4, titulo: '«Cancelar» es un botón de verdad', criterio: '2.1.1 Teclado (A) · 4.1.2 (A)',
      pista: '<button type="button" class="secundario" onclick="cancelar()">Cancelar</button>',
      prueba: (doc) => {
        const el = porTextoExacto(doc, 'button, a, span, div', 'Cancelar');
        return Boolean(el && el.tagName === 'BUTTON');
      },
    },
    {
      id: '21', lab: 4, titulo: 'La cabecera fija no tapa el foco', criterio: '2.4.11 Foco no oculto (mínimo) (AA)',
      pista: 'html { scroll-padding-top: 72px; }',
      prueba: (doc, win) => {
        const enCss = reglasCss(doc).some((r) => /(^|,)\s*(html|:root)\s*(,|$)/.test(r.selectorText) && parseFloat(r.style.getPropertyValue('scroll-padding-top')) > 0);
        const calculado = parseFloat(win.getComputedStyle(doc.documentElement).getPropertyValue('scroll-padding-top')) > 0;
        return enCss || calculado;
      },
    },
  ];

  const LABS = {
    1: { pagina: 'canal.html', nombre: 'Laboratorio 1 · Del div a la semántica (canal.html)' },
    2: { pagina: 'denuncia.html', nombre: 'Laboratorio 2 · Nombrar y anunciar (denuncia.html, barreras 1 a 7)' },
    3: { pagina: 'denuncia.html', nombre: 'Laboratorio 3 · Formulario accesible (denuncia.html, barreras 8 a 15)' },
    4: { pagina: 'denuncia.html', nombre: 'Laboratorio 4 · Teclado y foco (denuncia.html, barreras 16 a 21)' },
  };

  function enviarVacio(doc, win) {
    const formulario = doc.querySelector('form');
    if (!formulario) return;
    try {
      win.focus();
    } catch (e) { /* sin foco de ventana */ }
    const Evento = win.Event || Event;
    formulario.dispatchEvent(new Evento('submit', { bubbles: true, cancelable: true }));
  }

  /**
   * Ejecuta las comprobaciones de una página ya cargada.
   * pagina: 'canal.html' | 'denuncia.html'
   * Devuelve [{ id, lab, titulo, criterio, pista, ok }]
   */
  function ejecutar(doc, win, pagina) {
    const lista = pagina === 'canal.html' ? CANAL : DENUNCIA;
    const resultado = {};
    const corre = (c) => {
      let ok = false;
      try {
        ok = Boolean(c.prueba(doc, win));
      } catch (e) {
        ok = false;
      }
      resultado[c.id] = ok;
    };
    // 1º lo estático, 2º las acciones (clics) y 3º el envío del formulario vacío
    lista.filter((c) => !c.tipo).forEach(corre);
    lista.filter((c) => c.tipo === 'accion').forEach(corre);
    if (lista.some((c) => c.tipo === 'envio')) {
      enviarVacio(doc, win);
      lista.filter((c) => c.tipo === 'envio').forEach(corre);
    }
    return lista.map((c) => ({ id: c.id, lab: c.lab, titulo: c.titulo, criterio: c.criterio, pista: c.pista, ok: resultado[c.id] }));
  }

  global.Comprobador = { LABS, ejecutar };
})(typeof window !== 'undefined' ? window : globalThis);
