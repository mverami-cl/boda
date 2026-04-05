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
    hora: '18:00 h',
    hora_confirmada: false,   // false → muestra "(por confirmar)" junto a la hora
    hora_iso_inicio: '20261023T180000',                  // Para calendario
    hora_iso_fin: '20261024T000000',
  },

  // ----------------------------------------------------------
  //  LUGAR
  // ----------------------------------------------------------
  lugar: {
    nombre: 'El Portal Centro de Convenciones',
    nombre2: 'y Eventos',                          // Segunda línea (puede dejarse vacío '')
    ciudad: 'Cochabamba, Bolivia',
    maps_url: 'https://maps.google.com/?q=El+Portal+Centro+de+Convenciones+Cochabamba+Bolivia',
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
      'LATAM: Santiago (SCL) → Cochabamba (CBB)',
      'Escala en Santa Cruz (VVI) o São Paulo (GRU)',
      'Duración aprox. 4–6 horas',
      'Te recomendamos reservar con anticipación',
    ],
    hospedaje: [
      'Hotel Portales — céntrico y elegante',
      'Casa Grande Hotel — boutique',
      'Antesala Hotel — diseño y confort',
    ],
    itinerario: [
      { dia: 'Viernes 23', detalle: 'Ceremonia, 19:00 h' },
      { dia: 'Sábado 24', detalle: 'Por confirmar' },
    ],
  },

  // ----------------------------------------------------------
  //  RSVP
  // ----------------------------------------------------------
  rsvp: {
    deadline: '1 de septiembre de 2026',
    endpoint: 'https://script.google.com/macros/s/AKfycbxieEjqtAZpulL6HyK0A_IkZtprlugxBIZCxnoEiNAP8wBndTBceV8_vUUQBO0gm2M/exec',  // ← Pega aquí la URL de tu Google Apps Script (ver instrucciones abajo)
  },

  // ----------------------------------------------------------
  //  REGALO
  // ----------------------------------------------------------
  regalo: {
    codigo: null,     // null → muestra "Por confirmar". Ej: 'IVI-MAR26'
    tienda: 'Paris',     // null → muestra "Tienda por confirmar". Ej: 'Falabella'
    url: null,     // null → sin botón. Ej: 'https://novios.falabella.com/...'
  },

};

// NOTA: La lista de invitados está en invitados.js (archivo privado, no en git)
// Copia invitados.example.js → invitados.js y completa la lista.
