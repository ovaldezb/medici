// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlCarnet:   'https://95fxm0pf8l.execute-api.us-east-1.amazonaws.com/dev/carnet',
  urlCita:     'https://gjxtfu9ve2.execute-api.us-east-1.amazonaws.com/dev/cita',
  urlDisponib: 'https://uxifak5tof.execute-api.us-east-1.amazonaws.com/dev/disponibilidad',
  urlEnfermed: 'https://ekapc7eimk.execute-api.us-east-1.amazonaws.com/dev/enfermedad',
  urlFolio:    'https://ys72uwulue.execute-api.us-east-1.amazonaws.com/dev/folio',
  urlMedicamt: 'https://qrrlv0txqi.execute-api.us-east-1.amazonaws.com/dev/medicamento',
  urlMedico:   'https://s1ic99wjca.execute-api.us-east-1.amazonaws.com/dev/medico',
  urlPaciente: 'https://eg3c501ond.execute-api.us-east-1.amazonaws.com/dev/paciente',
  urlPerfil:   'https://s43bbtyule.execute-api.us-east-1.amazonaws.com/dev/perfil',
  urlPreResAF: 'https://smyllmdu93.execute-api.us-east-1.amazonaws.com/dev/pregresaf',
  urlPregunta: 'https://hqapo3yili.execute-api.us-east-1.amazonaws.com/dev/preguntas',
  urlProducto: 'https://vtzmpzap93.execute-api.us-east-1.amazonaws.com/dev/producto',
  urlSignos:   'https://u02vi9jos6.execute-api.us-east-1.amazonaws.com/dev/signos',
  urlSucursal: 'https://s0keqy0oqb.execute-api.us-east-1.amazonaws.com/dev/sucursal',
  urlUsuario:  'https://bzlnlb9ptd.execute-api.us-east-1.amazonaws.com/dev/usuario',
  urlVentas:   'https://e7lvodtqha.execute-api.us-east-1.amazonaws.com/dev/ventas',
  cognito:{
    userPoolId: 'us-east-1_32OuUI3WL',
    userPoolWebClientId:'3spniq5sm0ecn99sg6h003v0nn'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
