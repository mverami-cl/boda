// ============================================================
//  BODA IVANNA & MARIO — Archivo de configuración
//  Edita solo este archivo para actualizar la invitación.
//  No toques index.html salvo que quieras cambiar estructura.
// ============================================================

const CONFIG = {

  // ----------------------------------------------------------
  //  NOVIOS
  // ----------------------------------------------------------
  novios: {
    ella: 'Ivanna',
    el: 'Mario',
  },

  // ----------------------------------------------------------
  //  EVENTO
  // ----------------------------------------------------------
  evento: {
    fecha_larga: 'Viernes, 23 de Octubre de 2026',   // Hero y detalles
    fecha_corta: 'Viernes · 23 de Octubre · 2026',   // Entrada y pie
    fecha_iso: '2026-10-23',                        // Para el calendario (.ics)
    hora: '16:15 h',                               // Convocatoria / ceremonia
    hora_confirmada: true,    // false → muestra "(por confirmar)" junto a la hora
    hora_iso_inicio: '20261023T161500',                  // Para calendario (ceremonia 16:15)
    hora_iso_fin: '20261024T020000',                     // Fin de fiesta 02:00
  },

  // ----------------------------------------------------------
  //  LUGAR — dos sedes: iglesia (ceremonia) + El Portal (fiesta)
  // ----------------------------------------------------------
  lugar: {
    ciudad: 'Cochabamba, Bolivia',
    iglesia: {
      nombre: 'Iglesia Santa Teresa',
      maps_url: 'https://maps.app.goo.gl/JU3vovUHsKKZ5CgL6',
    },
    portal: {
      nombre: 'El Portal',
      nombre2: 'Centro de Convenciones y Eventos',   // puede dejarse ''
      maps_url: 'https://maps.google.com/?q=El+Portal+Centro+de+Convenciones+Cochabamba+Bolivia',
    },
  },

  // ----------------------------------------------------------
  //  DRESS CODE / FORMATO
  // ----------------------------------------------------------
  evento_info: {
    dress_code: 'Formal',
    ninos: 'Solo adultos',
    formato: 'Boda de destino',
    origen: 'Desde Chile',
  },

  // ----------------------------------------------------------
  //  VIAJE — bloque "Cómo llegar"
  // ----------------------------------------------------------
  viaje: {
    vuelos: [
      'LATAM / BoA',
      'Santiago (SCL) → Santa Cruz (VVI) → Cochabamba (CBB)',
      'Santiago (SCL) → La Paz (LPB) → Cochabamba (CBB)',
      'Te recomendamos reservar con anticipación',
    ],
    hospedaje: [
      'Hotel Cochabamba',
      'Airbnb — zona Parque Fidelanze o Cala Cala',
    ],
    movilidad: [
      'App <strong>InDrive</strong> para moverte por la ciudad',
      'Lleva efectivo — los conductores lo prefieren',
    ],
  },

  // ----------------------------------------------------------
  //  RECOMENDACIONES DE LOS NOVIOS — { lugar, detalle }
  // ----------------------------------------------------------
  recomendaciones: {
    novia: [
      { lugar: 'Typica Café',        detalle: '' },
      { lugar: 'Cayenna Café',         detalle: '' },
      { lugar: 'Punto de Encuentro',  detalle: 'Charque' },
      { lugar: 'Helado de Canela',    detalle: 'La Recoleta' },
    ],
    novio: [
      { lugar: 'La Casa de Campo',    detalle: 'Pique macho o Silpancho' },
      { lugar: 'Castores',            detalle: 'Salteñas' },
      { lugar: 'Romero y Julieta',    detalle: 'Café y croissants' },
      { lugar: 'Pollo Choco',         detalle: 'Pollo frito estilo Cochabamba' },
      { lugar: 'Wistupiku',           detalle: 'Cuñapés y Tojorí' },
    ],
  },

  // ----------------------------------------------------------
  //  RSVP
  // ----------------------------------------------------------
  rsvp: {
    deadline: '5 de septiembre de 2026',
    endpoint: 'https://script.google.com/macros/s/AKfycbxeYx5WXr091c0yDuF6Ltqc7K9OW3fVTB5GYkl48Hb1KorlxvGI-3w70laZ4R-5OL27/exec',
  },

  // ----------------------------------------------------------
  //  REGALO
  // ----------------------------------------------------------
  //  El bloque mostrado depende del país del invitado (campo `pais` en la
  //  planilla / invitados.js). Sin país conocido → se muestran ambos.
  regalo: {
    // Chile → lista de novios
    cl: {
      texto:  'Su presencia es el mejor regalo que podemos recibir. Para quienes deseen expresar su cariño con un obsequio, les compartimos la manera de hacerlo llegar:',
      tienda: 'Paris',
      codigo: '21051993',   // código de lista de novios (null → sin código)
    },
    // Bolivia → transferencia
    bo: {
      texto:   'Su presencia es el mejor regalo que podemos recibir. Como nuestra vida está fuera de Bolivia, para quienes deseen expresar su cariño con un obsequio, les compartimos la manera de hacerlo llegar:',
      banco:   '',   // TODO Mario — ej: 'Banco Nacional de Bolivia'
      titular: '',   // TODO Mario — ej: 'Mario Vergara'
      cuenta:  '',   // TODO Mario — ej: '1234-5678'
    },
    cierre: '¡Gracias por todo su cariño!',
  },

};

// NOTA: La lista de invitados está en invitados.js (archivo privado, no en git)
// Copia invitados.example.js → invitados.js y completa la lista.
