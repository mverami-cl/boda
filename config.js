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
    hora: '16:30 h',                               // Convocatoria / ceremonia
    hora_confirmada: true,    // false → muestra "(por confirmar)" junto a la hora
    hora_iso_inicio: '20261023T163000',                  // Para calendario (ceremonia 16:30)
    hora_iso_fin: '20261024T020000',                     // Fin de fiesta 02:00
  },

  // ----------------------------------------------------------
  //  LUGAR — dos sedes: iglesia (ceremonia) + El Portal (fiesta)
  // ----------------------------------------------------------
  lugar: {
    ciudad: 'Cochabamba, Bolivia',
    iglesia: {
      nombre: 'Iglesia Santa Teresa',
      hora: '16:30 h',
      maps_url: 'https://maps.app.goo.gl/JU3vovUHsKKZ5CgL6',
    },
    portal: {
      nombre: 'El Portal',
      nombre2: 'Centro de Convenciones y Eventos',   // puede dejarse ''
      hora: '18:00 h',
      maps_url: 'https://maps.google.com/?q=El+Portal+Centro+de+Convenciones+Cochabamba+Bolivia',
    },
  },

  // ----------------------------------------------------------
  //  DRESS CODE / FORMATO
  // ----------------------------------------------------------
  //  Depende del país del invitado. Sin país conocido → se muestran ambos.
  evento_info: {
    dress_code: { cl: 'Formal', bo: 'Gala' },
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
      'Airbnb — zona Parque Fidel Anze o Cala Cala',
    ],
    movilidad: [
      'App <strong>InDrive</strong> para moverte por la ciudad',
      'Lleva efectivo en pesos Bolivianos para taxis y propinas',
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
      { lugar: 'Heladería La Recoleta',    detalle: 'Helado de Canela o Leche'},
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
    deadline: '10 de septiembre de 2026',
    endpoint: 'https://script.google.com/macros/s/AKfycbxieEjqtAZpulL6HyK0A_IkZtprlugxBIZCxnoEiNAP8wBndTBceV8_vUUQBO0gm2M/exec',
  },

  // ----------------------------------------------------------
  //  REGALO
  // ----------------------------------------------------------
  //  El bloque mostrado depende del país del invitado (campo `pais` en la
  //  planilla / invitados.js). Sin país conocido → se muestran ambos.
  regalo: {
    // Chile → lista de novios
    cl: {
      texto:  'Tu presencia es el mejor regalo que podemos recibir. Para quienes deseen expresar su cariño con un obsequio, les compartimos la manera de hacerlo llegar:',
      tienda: 'Paris',
      codigo: '21051993',   // código de lista de novios (null → sin código)
      url:    'https://club.noviosparis.cl/home/couple-catalog/21051993',   // '' → sin botón
    },
    // Bolivia → lluvia de sobres o transferencia (QR del banco)
    bo: {
      texto:   'Tu presencia es el mejor regalo que podemos recibir. Como nuestra vida está fuera de Bolivia, para quienes deseen expresar su cariño con un obsequio, nos lo pueden hacer llegar a través de una lluvia de sobres el día del evento o a través del siguiente QR:',
      qr:      'assets/img/QR_banco.jpeg',   // QR Mercantil Santa Cruz (trae titular y cuenta)
    },
    cierre: '¡Te esperamos!',
  },

};

// NOTA: La lista de invitados está en invitados.js (archivo privado, no en git)
// Copia invitados.example.js → invitados.js y completa la lista.
