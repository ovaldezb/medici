import { environment } from '../../environments/environment';
/*
MediciCdkStack.ApiGWPatologiaApiGwEndpointF0FA76F2 = https://vrsqdrzfc7.execute-api.us-east-1.amazonaws.com/dev/
MediciCdkStack.ApiGWWhatsAppApiGEndpointC7B56D3B = https://lyrj1s9s80.execute-api.us-east-1.amazonaws.com/dev/
*/ 
export var Global ={
  urlCarnet:   environment.urlCarnet,
  urlCita:     environment.urlCita,
  urlDisponib: environment.urlDisponib,
  urlEnfermed: environment.urlEnfermed,
  urlFactura: environment.urlFactura,
  urlFolio:    environment.urlFolio,
  urlMedicamt: environment.urlMedicamt,
  urlMedico:   environment.urlMedico,
  urlPaciente: environment.urlPaciente,
  urlPerfil:   environment.urlPerfil,
  urlPreResAF: environment.urlPreResAF,
  urlPregunta: environment.urlPregunta,
  urlProducto: environment.urlProducto,
  urlSignos:   environment.urlSignos,
  urlSucursal: environment.urlSucursal,
  urlUsuario:  environment.urlUsuario,
  urlVentas:   environment.urlVentas,
  AGREGAR:'Agregar',
  ACTUALIZAR:'Actualizar',
  ELIMINAR:'Eliminar',
  GUARDAR:'Guardar',
  CANCELAR:'Cancelar',
  AGENDAR: 'Agendar',
  ALTA: 'Alta',
  REGISTRAR:'Registrar',
  OK:200,
  MEDICO:'MEDICO',
  ENFERMERA:'ENFERMERA',
  ADMINISTRADOR:'ADMINISTRADOR',
  REPECION:'RECEPCION',
  FARMACIA:'FARMACIA',
  SUCCESS:'SUCCESS',
  ENTER:13,
  DURACION_CITA:20,
  REFRESH_CITA: 60*1000, // cada minuto va ir a consultar si hay nuevas citas
  TIMER_OFF:2500,
  UNO:1,
  MENOSUNO:-1,
  NOMBRE:'nombre',
  APELLIDO:'apellido',
  TELEFONO:'telefono',
  TAB_USUARIO:'usuario',
  TAB_PACIENTE:'paciente',
  TAB_CARNET:'carnet',
  TAB_CITAS:'citas',
  TAB_ENFERMERIA:'enfermeria',
  TAB_DISPO:'dispo',
  SI:'Si',
  OK_TEXT:'Ok',
  NO:'No',
  COD_MX:'+52',
  DURACION_E1:5,
  DURACION_E2:5,
  DURACION_E3:5,
  DURACION_E4:5,
  FIELD_OK:"form-control border-success",
  FIELD_REQUIRED:"form-control border-danger",
  VERSION:'1.0.2',
  EFECTIVO:'efectivo',
  TARJETA:'tarjeta',
  TRANSFERENCIA:'transferencia',
  CHEQUE:'cheque',
  EMPTY:0,
  LONG_TICKET:6,
  CARNET:'carnet',
  RECETA:'receta',
  TICKET:'ticket',
  PAGE_SIZE:20,
  PAGE_INIT:0,
  Factura:{
    Moneda:'MXN',
    Version:'4.0',
    TipoCambio:'1',
    TipoComprobante:'I',
    Exportacion:'01',
    CondicionesPago:'Un solo pago',
    MetodoPago:'PUE',
    ImpuestoIVA:'002',
    ImpuestoISR:'001',
    Tasa:'Tasa',
    Cuota:'Cuota',
    TasaOCuotaIVA:'0.160000',
    TasaOCuotaISR:'0.000000',
    ObjectoImpuesto:'02',
    FP_EFECTIVO:'01',
    FP_TRANSFERENCIA:'03',
    FP_TARJETA:'04',
    IVA:0.16,
    FACTOR_DIV:1.16
  },
  SKIP_HEADER:'SKIP',
  DECIMAL_FIXED:2
}