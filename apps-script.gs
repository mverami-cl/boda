// ============================================================
//  BODA IVANNA & MARIO — Google Apps Script (Web App)
//  Pega TODO este contenido en el editor de Apps Script de tu
//  planilla (Extensiones → Apps Script), reemplazando lo anterior.
//
//  Pestaña usada: "Invitados"
//  Columnas (se ubican por NOMBRE de encabezado, en cualquier orden;
//  agrega las que falten — Pais y las de respuesta):
//
//    Codigo | Nombre | Personas | Pais | Asistencia | Asisten |
//    Acom_1 | Acom_2 | Acom_3 | Acom_4 | Acom_5 |
//    Requerimientos | Mensaje | Fecha_respuesta
//
//  Deploy: Implementar → Nueva implementación → Aplicación web
//    · Ejecutar como: Yo
//    · Quién tiene acceso: Cualquier persona
//  Copia la URL /exec y pégala en CONFIG.rsvp.endpoint (config.js).
//  Cada vez que cambies el código, crea una NUEVA implementación
//  (o "Administrar implementaciones" → editar → Nueva versión).
// ============================================================

var HOJA = 'Invitados';

function getHoja_() {
  return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA);
}

// Mapa { encabezadoEnMinúsculas : índiceDeColumna(0-based) }
function mapaColumnas_(hoja) {
  var headers = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];
  var mapa = {};
  headers.forEach(function (h, i) { mapa[String(h).trim().toLowerCase()] = i; });
  return mapa;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

// -------- LECTURA: la invitación consulta ?code=INV-001 --------
function doGet(e) {
  var code = ((e && e.parameter && e.parameter.code) || '').trim();
  if (!code) return json_({ ok: false, error: 'sin code' });

  var hoja = getHoja_();
  var mapa = mapaColumnas_(hoja);
  var datos = hoja.getDataRange().getValues();
  var cCod = mapa['codigo'];

  for (var r = 1; r < datos.length; r++) {
    if (String(datos[r][cCod]).trim() === code) {
      return json_({
        ok: true,
        nombre:   datos[r][mapa['nombre']],
        personas: datos[r][mapa['personas']],
        pais:     (mapa['pais'] != null) ? datos[r][mapa['pais']] : ''
      });
    }
  }
  return json_({ ok: false, error: 'no encontrado' });
}

// -------- ESCRITURA: el RSVP actualiza la fila del invitado --------
function doPost(e) {
  var d = {};
  // El front envía JSON con Content-Type text/plain (evita preflight CORS)
  if (e && e.postData && e.postData.contents) {
    try { d = JSON.parse(e.postData.contents); } catch (err) { d = (e && e.parameter) || {}; }
  } else {
    d = (e && e.parameter) || {};
  }

  var hoja = getHoja_();
  var mapa = mapaColumnas_(hoja);
  var datos = hoja.getDataRange().getValues();
  var cCod = mapa['codigo'];
  var codigo = String(d.codigo_invitado || '').trim();

  // Buscar la fila por Código (1-based para getRange)
  var fila = -1;
  if (codigo) {
    for (var r = 1; r < datos.length; r++) {
      if (String(datos[r][cCod]).trim() === codigo) { fila = r + 1; break; }
    }
  }

  var valores = {
    'asistencia':      d.asistencia || '',
    'asisten':         d.asisten || '',
    'acom_1':          d.acom_1 || '',
    'acom_2':          d.acom_2 || '',
    'acom_3':          d.acom_3 || '',
    'acom_4':          d.acom_4 || '',
    'acom_5':          d.acom_5 || '',
    'requerimientos':  d.requerimientos || '',
    'mensaje':         d.mensaje || '',
    'fecha_respuesta': new Date()
  };

  if (fila > 0) {
    // Actualiza SOLO las columnas que existan en la planilla
    Object.keys(valores).forEach(function (k) {
      if (mapa[k] != null) hoja.getRange(fila, mapa[k] + 1).setValue(valores[k]);
    });
  } else {
    // Invitado sin código → agrega una fila nueva
    var nueva = new Array(hoja.getLastColumn()).fill('');
    if (mapa['codigo'] != null)   nueva[mapa['codigo']]   = codigo;
    if (mapa['nombre'] != null)   nueva[mapa['nombre']]   = d.nombre || '';
    if (mapa['personas'] != null) nueva[mapa['personas']] = d.asisten || '';
    Object.keys(valores).forEach(function (k) {
      if (mapa[k] != null) nueva[mapa[k]] = valores[k];
    });
    hoja.appendRow(nueva);
  }

  return json_({ ok: true });
}
