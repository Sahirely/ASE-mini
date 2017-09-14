module.exports = {
  aprobacion: require('./controllers/aprobacion'),
  cita: require('./controllers/cita'),
  cotizacion: require('./controllers/cotizacion'),
  trabajo: require('./controllers/trabajo'),
  orden: require('./controllers/ordenes'),
  login: require('./controllers/login'),
  example: require('./controllers/example'),
  reporte: require('./controllers/reporte'),
  reclamacion: require('./controllers/reclamacion'),
  presupuesto: require('./controllers/presupuesto'),
  taller: require('./controllers/taller'),
  ordenAnticipo: require('./controllers/ordenAnticipo'),
  dashboard: require('./controllers/dashboard'),
  administracion: require('./controllers/administracion'),
  mobile: require('./controllers/app.controller'),
  busquedaUnidad: require('./controllers/busquedaUnidad'),
  ordenServicio: require('./controllers/ordenServicio'),
  configurador: require('./controllers/configurador'),
  detalle: require('./controllers/detalle'),
  cobrar: require('./controllers/cobrar/cobrar'),
  dashboardCallcenter: require('./controllers/dashboardCallcenter'),
  preordenCotizacion: require('./controllers/preordenCotizacion'), // FAL 15072017
  commonFunctions: require('./controllers/commonFunctions'), // LQMA 11062017
  analisisflotilla: require('./controllers/analisisflotilla'),
  memorandum: require('./controllers/memorandum'),
  meeting: require('./controllers/meeting'),
  quejas: require('./controllers/quejas')
}
