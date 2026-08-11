  // ============================================================
  //  BODA IVANNA & MARIO — Google Apps Script (Web App)
  //  Pega TODO este contenido en el editor de Apps Script de tu
  //  planilla (Extensiones → Apps Script), reemplazando lo anterior.
  //
  //  Pestaña usada: "Invitados" (una fila por invitación).
  //  Columnas (se ubican por NOMBRE de encabezado, en cualquier orden):
  //
  //   BASE (la mantienes tú; el RSVP NO la toca):
  //    Codigo | Nombre | Pais | Personas | Acom_1 | Acom_2 | Acom_3 | Acom_4 | Acom_5
  //      · Acom_1..5 = acompañantes INVITADOS → se usan para prellenar el formulario.
  //
  //   RESPUESTA en "Invitados" (la llena el RSVP; resumen por invitación):
  //    Asistencia | Asisten | Conf_1 | Conf_2 | Conf_3 | Conf_4 | Conf_5 |
  //    Requerimientos | Mensaje | Fecha_respuesta
  //      · Conf_1..5 = cada persona confirmada en su columna. (Opcional: "Confirmados" = lista unida.)
  //
  //  LOG en la pestaña "RSVPs" (se crea sola si no existe): UNA FILA POR PERSONA
  //  confirmada en cada envío → Fecha | Codigo | Titular | Persona | Niño | Asistencia |
  //  Requerimientos | Mensaje. Ideal para extraer el listado de quién respondió/confirmó.
  //
  //  Deploy: Implementar → Nueva implementación → Aplicación web
  //    · Ejecutar como: Yo
  //    · Quién tiene acceso: Cualquier persona
  //  Copia la URL /exec y pégala en CONFIG.rsvp.endpoint (config.js).
  //  Cada vez que cambies el código, crea una NUEVA implementación
  //  (o "Administrar implementaciones" → editar → Nueva versión).
  // ============================================================

  var HOJA = 'Invitados';
  var LOG_HOJA = 'RSVPs';   // log: una fila por persona confirmada (se crea si no existe)

  function getHoja_() {
    return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJA);
  }

  // Normaliza encabezados: minúsculas, sin tildes, espacios → guion_bajo.
  // Así "País" → "pais" y "Fecha respuesta" → "fecha_respuesta".
  function norm_(s) {
    return String(s).trim().toLowerCase()
      .normalize('NFD').replace(/[̀-ͯ]/g, '')
      .replace(/\s+/g, '_');
  }

  // Mapa { encabezadoNormalizado : índiceDeColumna(0-based) }.
  // Si hay encabezados repetidos (p. ej. dos "Pais"), gana la PRIMERA ocurrencia.
  function mapaColumnas_(hoja) {
    if (hoja.getLastColumn() === 0) return {};   // hoja vacía
    var headers = hoja.getRange(1, 1, 1, hoja.getLastColumn()).getValues()[0];
    var mapa = {};
    headers.forEach(function (h, i) {
      var k = norm_(h);
      if (k && !(k in mapa)) mapa[k] = i;
    });
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

    function val(fila, key) { return (mapa[key] != null) ? datos[fila][mapa[key]] : ''; }

    for (var r = 1; r < datos.length; r++) {
      if (String(datos[r][cCod]).trim() === code) {
        return json_({
          ok: true,
          nombre:   datos[r][mapa['nombre']],
          personas: datos[r][mapa['personas']],
          pais:     val(r, 'pais'),
          acom_1:   val(r, 'acom_1'),
          acom_2:   val(r, 'acom_2'),
          acom_3:   val(r, 'acom_3'),
          acom_4:   val(r, 'acom_4'),
          acom_5:   val(r, 'acom_5')
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

    // Confirmados como array (el front envía "A / B / C (niño)")
    var confArr = String(d.confirmados || '').split(' / ')
      .map(function (s) { return s.trim(); })
      .filter(Boolean);

    // Titular (Nombre base) para el log
    var titular = (fila > 0 && mapa['nombre'] != null)
      ? datos[fila - 1][mapa['nombre']]
      : (d.nombre || '');

    // RESPUESTA en "Invitados": resumen + cada confirmado en su columna Conf_1..5.
    // NO se tocan las columnas base (Acom_1..5).
    var valores = {
      'asistencia':      d.asistencia || '',
      'asisten':         d.asisten || '',
      'confirmados':     d.confirmados || '',   // opcional: columna única unida
      'requerimientos':  d.requerimientos || '',
      'mensaje':         d.mensaje || '',
      'fecha_respuesta': new Date()
    };
    for (var i = 0; i < 5; i++) valores['conf_' + (i + 1)] = confArr[i] || '';

    if (fila > 0) {
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

    // LOG en "RSVPs": una fila por persona confirmada (o una fila si "No")
    registrarLog_(codigo, titular, confArr, d);

    return json_({ ok: true });
  }

  // Agrega al log "RSVPs" una fila por persona confirmada. Crea la hoja si no existe.
  function registrarLog_(codigo, titular, confArr, d) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var log = ss.getSheetByName(LOG_HOJA);
    if (!log) log = ss.insertSheet(LOG_HOJA);
    // Asegurar encabezados (cubre hoja recién creada O existente pero vacía)
    if (log.getLastRow() === 0 || log.getLastColumn() === 0) {
      log.appendRow(['Fecha', 'Codigo', 'Titular', 'Persona', 'Niño', 'Asistencia', 'Requerimientos', 'Mensaje']);
    }
    var mapaLog = mapaColumnas_(log);
    var ancho = Math.max(log.getLastColumn(), 8);
    var ahora = new Date();
    var asis = d.asistencia || '';
    var req  = d.requerimientos || '';
    var msg  = d.mensaje || '';

    function filaLog(persona, nino) {
      var row = new Array(ancho).fill('');
      function set(k, v) { if (mapaLog[k] != null) row[mapaLog[k]] = v; }
      set('fecha', ahora);
      set('codigo', codigo);
      set('titular', titular); set('nombre', titular);   // alias
      set('persona', persona);
      set('niño', nino); set('nino', nino);               // alias
      set('asistencia', asis);
      set('requerimientos', req); set('dieta', req);      // alias
      set('mensaje', msg);
      return row;
    }

    if (asis === 'si' && confArr.length) {
      confArr.forEach(function (p) {
        var esNino = /\(niñ[oa]\)/i.test(p) ? 'Sí' : '';
        var nombre = p.replace(/\s*\(niñ[oa]\)\s*/i, '').trim();
        log.appendRow(filaLog(nombre, esNino));
      });
    } else {
      log.appendRow(filaLog('', ''));
    }
  }
