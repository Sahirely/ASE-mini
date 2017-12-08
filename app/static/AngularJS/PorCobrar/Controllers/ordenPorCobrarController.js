registrationModule.controller('ordenPorCobrarController', function ($scope, $rootScope, localStorageService, alertFactory, globalFactory, ordenPorCobrarRepository, userFactory, cotizacionConsultaRepository, nuevoMemorandumRepository, configuradorRepository) {
  $rootScope.modulo = 'ordenxCobrar'
  //////////////////////////////////
  $scope.DatesFlag = 0;
  $scope.message = "Buscando...";
  $scope.stories= [];
  $scope.checkedTrabajos=[];
  $scope.checkedFacturas=[];
  $scope.onText = 'Copade';
  $scope.offText = 'Cotización';
  $scope.size = 'mini';
  $scope.showCopade = 1
  $scope.isSelected = 'yep';
  $scope.isSelectedFactura = 'yep';
  $scope.inverse = true;
  $scope.fechaInicio= '';
  $scope.fechaFin = '';
  $scope.showCopadeFacturas = 1;
  $scope.totalSeleccionadoSuma = 0;
  $scope.sumatoriaAbonoSelect = 0;
  //////////////////////////////////
  $scope.x = 0
  $scope.totalNiveles = 0
  $scope.total = 0
  $scope.totalPrefactura = 0
  $scope.totalAbonadas = 0
  $scope.totalPagadas = 0
  $scope.totalCobranza = 0
  $scope.totalEnviada = 0
  $scope.zonaSelected = '0'
  $scope.ZonasSeleccionadas = []
  $scope.NivelesZona = []
  $scope.Zonas = []
  // $scope.ZonaFilter = '';
  $scope.checkedTrabajos = [];
  $scope.checkedFacturasTotal = [];
  $scope.fechaRecepcionCopade = '';
  $scope.showTagFechaRecepcion = false;
  //////////////////////////////////
  $scope.grouper = 'numeroOrden'
  $scope.idGrouper = 2
  $scope.option = null
  $scope.selectedTab = 1;


  $scope.gridPorCobrar = {
    bindingOptions: {
        dataSource: 'porCobrar'
    },
    "export": {
        enabled: true,
        fileName: "DispersionProveedor",
        allowExportSelectedData: false
    },
    allowSorting: true,
    showRowLines: true,
    rowAlternationEnabled: true,
    showColumnLines: true,
    showBorders: true,
    allowColumnResizing: true,
    allowColumnReordering: true,
    columnAutoWidth: true,
    columns: [
      { dataField: "nombreCliente", caption:"Cliente", dataType: "string"},
      { dataField: "consecutivoOrden", caption: "Consecutivo", dataType: "number", filterOperations: ['contains'] },
      { dataField: "numeroOrden", caption:"Número de órden", dataType: "string"},
      // { dataField: "numeroCotizacion", dataType: "number" },
      { dataField: "numeroEconomico", caption:"Número Económico", dataType: "number", filterOperations: ['contains'] },
      { dataField: "nombreZona", caption:"Zona",  dataType: "string" },
      { dataField: "fechaCreacionOden", caption:"Fecha Creación Órden", dataType: "date", format:"dd/MM/yyyy" },
      // { dataField: "proveedor", dataType: "string" },
      { dataField: "comentarioOrden", caption:"Comentarios adicionales", dataType: "string" },
      { dataField: "nombreEstatusOrden", caption:"Estatus", dataType: "string" },
      { dataField: "venta", dataType: "number", format:{
          type:"currency",
          precision: 2
        } 
      },
      { dataField: "costo", dataType: "number", format:{
        type: "currency",
        precision: 2
        } 
      },
      { dataField: "nombreCompleto", caption:"Agendo", dataType: "string" },
      { dataField: "tiempoEsperaTranscurrido", caption:"Tiempo Transcurrido Tiempo Asignado", dataType: "string" },
      { dataField: "nombreTipoOrdenServicio", caption:"Tipo Servicio", dataType: "string" },
      
        // { dataField: "nombreTipoOrdenServicio", dataType: "number" },
        
        // { dataField: "facturaProveedor", dataType: "number" },
        // { dataField: "montoFacturaProveedor", dataType: "number" },
        // { dataField: "saldoFacturaProveedor", dataType: "number" }
    ],
    // summary:{
    //     totalItems:[{
    //         column: "TRABAJADO",
    //         summaryType: "sum",
    //         valueFormat: "currency",
    //         displayFormat: "Total: {0}"
    //     },{
    //         column: "POR FACTURAR",
    //         summaryType: "sum",
    //         valueFormat: "currency",
    //         displayFormat: "Total: {0}"
    //     },{
    //         column: "FACTURADO",
    //         summaryType: "sum",
    //         valueFormat: "currency",
    //         displayFormat: "Total: {0}"
    //     },{
    //         column: "PAGADO",
    //         summaryType: "sum",
    //         valueFormat: "currency",
    //         displayFormat: "Total: {0}"
    //     },{
    //         column: "SELECCION ABONOS",
    //         summaryType: "sum",
    //         valueFormat: "currency",
    //         displayFormat: "Total: {0}"
    //     },{
    //         column: "FACTURAS ABONADAS",
    //         summaryType: "sum",
    //         valueFormat: "currency",
    //         displayFormat: "Total: {0}"
    //     }]
    // },
    columnChooser: {
      enabled: true
    },
    loadPanel: {
      enabled: false
    },
    scrolling: {
      mode: "infinite"
    },
    filterRow: {
        visible: true,
        applyFilter: "auto"
    },
    grouping: {
        contextMenuEnabled: true,
        autoExpandAll: false
    },
    // groupPanel: {
    //     visible: true,
    //     emptyPanelText: "Arrastra aqui la columna que deseas agrupar"
    // },
    paging: {
        // enabled: true,
        pageSize: 10
    },
    pager: {
        // visible: true,
         showInfo: true,
        // showPageSizeSelector: true,
        infoText: "Página {0} de {1}: ({2} Registros encontrados)",
        //allowedPageSizes: [5, 10, 25, 50, 100],
    },
    searchPanel: {
        visible: true,
        width: '400'
    },
    onCellClick: function(e) {
      if (e.rowType == "data"){
        $scope.AbrirOrden(e.data.numeroOrden, 8)
      }   
    },
    onEditorPreparing: function(e){
      if($scope.userData.idRol == 1){
        e.component.columnOption("Costo", "visible", false)
        e.component.columnOption("Costo", "showInColumnChooser", false)
      }
      if($scope.userData.idRol == 4){
        e.component.columnOption("Venta", "visible", false)
        e.component.columnOption("Venta", "showInColumnChooser", false)
      }
    }
  }

  $scope.total = 0
      var sumatoriaMontoPago = 0;
      var sumatoriaAbonoPago = 0;
      var sumatoriaSaldoPago = 0;
      var sumatoriaMontoPagopx = 0;
      var sumatoriaSaldoPagopx = 0;
      var sumatoriaMontoAbon = 0;
      var sumatoriaAbonoAbon = 0;
      var sumatoriaSaldoAbon = 0;
      var sumatoriaMontoAbonax = 0;
      var sumatoriaSaldoAbonax = 0;

  $scope.change_switch = function () {
    if ($scope.showCopade == 2) {
      $scope.showCopade = 1;
    } else {
      $scope.showCopade = 2;
    }
  };

  $scope.change_switchFacturas = function () {
    if ($scope.showCopadeFacturas == 2) {
      $scope.showCopadeFacturas = 1;
    } else {
      $scope.showCopadeFacturas = 2;
    }
  };

  $scope.changeGrouper = function (type) {
    $scope.idGrouper = type
    switch (type) {
      case 1:
      $scope.grouper = 'numeroCotizacion'
      break
      case 2:
      $scope.grouper = 'numeroOrden'
      break
      case 3:
      $scope.grouper = 'ordenPago'
      break
    }
    $scope.idGrouper = type
    $('.dataTableCoincidencia').DataTable()
    $('.dataTablePorCobrar').DataTable().destroy()
    $('.dataTablePrefactura').DataTable().destroy()
    $('.dataTableEnviada').DataTable().destroy()
    $('.dataTableAbonadas').DataTable().destroy()
    $('.dataTablePagadas').DataTable().destroy()
    $('.dataTableDetalleOrdenes').DataTable().destroy();
    setTimeout(function () {
      globalFactory.filtrosTabla('dataTableCoincidencia', 'Mejor coinciden', 10)
      globalFactory.filtrosTabla('dataTablePorCobrar', 'Ordenes Por Cobrar', 100)
      globalFactory.filtrosTabla('dataTablePrefactura', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTableEnviada', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTableAbonadas', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTablePagadas', 'PreFactura Generada', 100)
      globalFactory.filtrosTabla('dataTableDetalleOrdenes', 'Detalle de ordenes', 10)
    }, 200)
  }

  $scope.init = function () {
    $scope.userData = userFactory.getUserData()
    $scope.rolLogged = $scope.userData.idRol
    $scope.idUsuario = $scope.userData.idUsuario
    $scope.idContratoOperacion = $scope.userData.contratoOperacionSeleccionada;
    Dropzone.autoDiscover = false;
    $scope.dzOptionsOrdenCobrar = configuradorRepository.getDzOptions("application/pdf,text/xml", 2);
    $scope.fecha = '';
    $scope.trabajosporCOPADE = '';

    // para obtener las zonas promero se inicializa la primer zona padre.
    $scope.esPemex = $scope.userData.contratoOperacionSeleccionada == 3;
    userFactory.ValidaSesion()
    $scope.ZonasSeleccionadas[0] = '0'
    $scope.obtieneNivelZona()
    // termina el cargado de las Zonas del usuario.
    $scope.devuelveEjecutivos()

    // //obtener la pestaña Ordenes Por Cobrar
    // $scope.getPorCobrar();
    //
    // // obtener la pestaña Documento Cobranza
    // $scope.getCopades();
    //
    // // obtener la pestaña Prefactura Generada
    // $scope.getPrefacturaGenerada();
    //
    // // obtener la pestaña Factura Enviada al Cliente
    // $scope.getEnviadasCliente();
    //
    // $scope.getSeleccionDeAbonos();
    //
    // $scope.getFacturasAbonadas();
    //
    // // obtener la pestaña Facturas Pagadas
    // $scope.getFacturasPagadas();

    $scope.getMemorandums()

  }

  $scope.changeSelectedTab = function (data){
          $scope.selectedTab = data;

          if ($scope.selectedTab == 2){
            $scope.getCopades();
          }
  }

  $scope.cleanSearch = function(){

    swal({
          title: '¿Desea realizar la búsqueda sin criterios de selección?',
          text: "Al realizar la búsqueda sin criterios, se traerán todos los resultados.",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si',
          cancelButtonText: 'Cancelar'
        }, function (isConfirm) {
          if (isConfirm) {
            //se limpia el filtro de zonas
            for ($scope.x = 0; $scope.x <= $scope.totalNiveles; $scope.x++) {
                $scope.ZonasSeleccionadas[$scope.x] = "0";
            }

            //se limpia el filtro de ejecutivo
            $scope.ejecutivoSelected = 0;

            //se limpia el filtro de estatus
            $scope.filtroEstatus = '';

            //bandera temporal para evitar filtro en fechas y poder limpiar
            $scope.DatesFlag = 4;

            //limpiar filtros de fechas
            $scope.fechaMes = '';
            $scope.fecha = '';
            $scope.fechaInicio = '';
            $scope.fechaFin = '';
            $('#txtMes').datepicker('setDate', null);
            $('#txtfechaEspecifica').datepicker('setDate', null);
            $('#txtFIni').datepicker('setDate', null);
            $('#txtFFin').datepicker('setDate', null);

            //aplicar el cambio con filtros limpios
            $scope.changeFilters();
            $scope.consultaPestania();
         }
       });

  }

  $scope.getPorCobrar = function (){
      // Obtengo la lista de tablas
      $('.dataTablePorCobrar').DataTable().destroy()
      $scope.promise = ordenPorCobrarRepository.get('obtenerporcobrar', {  'idContratoOperacion': $scope.userData.contratoOperacionSeleccionada,
        'idUsuario': $scope.userData.idUsuario, 'idZona': $scope.ZonaFilter, 'idEjecutivoFiltro': $scope.idEjecutivo, 'fechaIni': $scope.rInicioFilter, 'fechaFin': $scope.rFinFilter }).then(function (result) {
          $scope.porCobrar = result.data
          $scope.total = 0
          angular.forEach($scope.porCobrar, function (value, key) {
            $scope.total = $scope.total + value.venta
          });

          globalFactory.filtrosTabla('dataTablePorCobrar', 'Ordenes Por Cobrar', 50)
        }, function (error) {
          alertFactory.error('No se puenen obtener las órdenes por cobrar')
        })
  }

  $scope.getFacturasPagadas = function(){
      $('.dataTablePagadas').DataTable().destroy()
      $scope.promise = ordenPorCobrarRepository.get('trbajoCobrado', {'idUsuario': $scope.userData.idUsuario,'idDatosCopade':0, 'idContratoOperacion':$scope.userData.contratoOperacionSeleccionada,'isProduction':$scope.userData.isProduction, 'idZona': $scope.ZonaFilter, 'idEjecutivoFiltro': $scope.idEjecutivo, 'fechaIni': $scope.rInicioFilter, 'fechaFin': $scope.rFinFilter }).then(function (result) {
          $scope.pagadas = result.data
          angular.forEach($scope.pagadas, function (value, key) {
            $scope.totalPagadas = $scope.totalPagadas + value.total
          })
          globalFactory.filtrosTabla('dataTablePagadas', 'Facturas Pagadas', 50)
        }, function (error) {
          alertFactory.error('No se puenen obtener las Facturas Pagadas')
        })
  }

  $scope.getEnviadasCliente = function(){
    // Obtengo la lista de tablas
    $('.dataTableEnviada').DataTable().destroy()
    $scope.promise = ordenPorCobrarRepository.get('obtenerenviadas', { 'idUsuario': $scope.userData.idUsuario,
      'idContratoOperacion':$scope.userData.contratoOperacionSeleccionada,'isProduction':$scope.userData.isProduction, 'idZona': $scope.ZonaFilter, 'idEjecutivoFiltro': $scope.idEjecutivo, 'fechaIni': $scope.rInicioFilter, 'fechaFin': $scope.rFinFilter }).then(function (result) {
        $scope.enviada = result.data
        angular.forEach($scope.enviada, function (value, key) {
          $scope.totalEnviada = $scope.totalEnviada + value.total
        })
        globalFactory.filtrosTabla('dataTableEnviada', 'Facturas Enviada al Cliente', 50)
      }, function (error) {
        alertFactory.error('No se puenen obtener las Facturas Enviada al Cliente')
      })
  }



  $scope.getFacturasAbonadas = function (){
  // Obtengo la lista de tablas
  $('.dataTableAbonadas').DataTable().destroy();
  $scope.promise = ordenPorCobrarRepository.get('obtenerabonadas', { 'idUsuario': $scope.userData.idUsuario,
    'idContratoOperacion':$scope.userData.contratoOperacionSeleccionada,'isProduction':$scope.userData.isProduction, 'idZona': $scope.ZonaFilter, 'idEjecutivoFiltro': $scope.idEjecutivo, 'fechaIni': $scope.rInicioFilter, 'fechaFin': $scope.rFinFilter }).then(function (result) {
      $scope.abonadas = result.data;
      $scope.totalAbonadasAbono = 0;
      $scope.totalAbonadasSaldo = 0;
    //$scope.data = result.data;
    angular.forEach($scope.abonadas, function (value, key) {
      $scope.totalAbonadas = $scope.totalAbonadas + value.total;
      $scope.totalAbonadasAbono = $scope.totalAbonadasAbono + value.abono;
      $scope.totalAbonadasSaldo = $scope.totalAbonadasSaldo + value.COP_SALDO;
    })
    globalFactory.filtrosTabla('dataTableAbonadas', 'Facturas Abonadas', 10);
  }, function (error) {
    alertFactory.error('No se puenen obtener las Facturas Abonadas')
  })
  }

  $scope.getSeleccionDeAbonos = function (){
      //Obtengo la lista de tablas (ABONOS)
      $('.dataTableAbonos').DataTable().destroy()
      $scope.checkedFacturasTotal = [];
      $scope.promise = ordenPorCobrarRepository.get('obtenerabonos', { 'idUsuario': $scope.userData.idUsuario,
      'idContratoOperacion':$scope.userData.contratoOperacionSeleccionada,'isProduction':$scope.userData.isProduction, 'idZona': $scope.ZonaFilter, 'idEjecutivoFiltro': $scope.idEjecutivo, 'fechaIni': $scope.rInicioFilter, 'fechaFin': $scope.rFinFilter }).then(function (result) {
      $scope.selectCotizaciones = result.data
      var sumatoriaMontoCopade = 0;
      var sumatoriaAbonoCopade = 0;
      var sumatoriaSaldoCopade = 0;
      var sumatoriaMontoProveedor = 0;
      var sumatoriaSaldoProveedor = 0;
      $scope.selectPagadas = [];
      for(var i=0;i<result.data.length;i++){
        var existe = false;
        $scope.selectPagadas.forEach(function(value){
          if (value.numeroCopade == result.data[i].numeroCopade){
            existe = true;
          }
        });

        if(!existe){
          $scope.selectPagadas.push(result.data[i]);
          sumatoriaMontoCopade += parseFloat(result.data[i].COP_CARGO);
          sumatoriaAbonoCopade += parseFloat(result.data[i].abono);
          sumatoriaSaldoCopade += parseFloat(result.data[i].COP_SALDO);
          sumatoriaMontoProveedor += parseFloat(result.data[i].total);
          sumatoriaSaldoProveedor += parseFloat(result.data[i].saldoProveedor);
        }
      };
      $scope.montoCopAbonoSelect = sumatoriaMontoCopade;
      $scope.abonoCopAbonoSelect = sumatoriaAbonoCopade;
      $scope.saldoCopAbonoSelect = sumatoriaSaldoCopade;
      $scope.montoProvAbonoSelect = sumatoriaMontoProveedor;
      $scope.saldoProvAbonoSelect = sumatoriaSaldoProveedor;

      for(var i=0;i< result.data.length;i++){
        obj = new Object();
        obj.idTrabajoAgrupado = result.data[i].idOrdenAgrupada;
        obj.ordenGlobal = result.data[i].COP_ORDENGLOBAL;
        obj.total = result.data[i].saldoProveedor;
        obj.check = false;
        $scope.checkedFacturasTotal.push(obj);
      };

      globalFactory.filtrosTabla('dataTableAbonos', 'Selección de Abonos', 50)
    }, function (error) {
      alertFactory.error('No se puenen obtener los abonos generados')
    })

  }

  // obtiene los niveles de zona del usuario y seguidamente obtiene las zonas por nivel.
  $scope.obtieneNivelZona = function () {
    $scope.promise = cotizacionConsultaRepository.getNivelZona($scope.userData.contratoOperacionSeleccionada).then(function (result) {
      $scope.totalNiveles = result.data.length
      if (result.data.length > 0) {
        $scope.NivelesZona = result.data
        $scope.devuelveZonas()
      }
    },
    function (error) {
      alertFactory.error('No se pudo ontener el nivel de zona, inténtelo más tarde.')
    })
  }

  $scope.getCopades = function () {
      // Obtengo la lista de tablas (COBRANZA)
      $('.dataTableCopades').DataTable().destroy()
      $scope.promise = ordenPorCobrarRepository.get('obtenercobranza', { 'idUsuario': $scope.userData.idUsuario,
        'idContratoOperacion':$scope.userData.contratoOperacionSeleccionada,'isProduction':$scope.userData.isProduction }).then(function (result) {
          $scope.cobranza = result.data;
          var sumatoria = 0;
          for(var i=0;i<result.data.length;i++){
            sumatoria += parseFloat(result.data[i].total);
          };
          $scope.sumatoriaCOPADE = sumatoria;
          globalFactory.filtrosTabla('dataTableCopades', 'Documento Cobranza', 50);
        }, function (error) {
          alertFactory.error('No se pueden obtener los documentos generados');
        });
      }

  $scope.getPrefacturaGenerada = function() {
      // Obtengo la lista de tablas
      $('.dataTablePrefactura').DataTable().destroy()
      $scope.promise = ordenPorCobrarRepository.get('obtenerprefactura', { 'idUsuario': $scope.userData.idUsuario,
        'idContratoOperacion':$scope.userData.contratoOperacionSeleccionada,'isProduction':$scope.userData.isProduction, 'idZona': $scope.ZonaFilter, 'idEjecutivoFiltro': $scope.idEjecutivo, 'fechaIni': $scope.rInicioFilter, 'fechaFin': $scope.rFinFilter }).then(function (result) {
          $scope.prefactura = result.data
          angular.forEach($scope.prefactura, function (value, key) {
            $scope.totalPrefactura = $scope.totalPrefactura + value.Total
          })
          globalFactory.filtrosTabla('dataTablePrefactura', 'PreFacturas Generadas', 50)
        }, function (error) {
          alertFactory.error('No se puenen obtener las prefacturas generadas')
        })
  }

  // obtiene las zonas por cada nivel con que cuenta el usuario
  $scope.devuelveZonas = function () {
    for ($scope.x = 0; $scope.x < $scope.totalNiveles; $scope.x++) {
      cotizacionConsultaRepository.getZonas($scope.userData.contratoOperacionSeleccionada, $scope.NivelesZona[$scope.x].idNivelZona, $scope.userData.idUsuario).then(function (result) {
        if (result.data.length > 0) {
          var valueToPush = {}
          valueToPush.orden = result.data[0].orden
          valueToPush.etiqueta = result.data[0].etiqueta
          valueToPush.data = result.data
          $scope.Zonas.push(valueToPush)
          // se establece por default cada zona seleccionada en 0
          $scope.ZonasSeleccionadas[result.data[0].orden] = '0'
        }
      }, function (error) {
        alertFactory.error('No se pudo recuperar información de las zonas')
      })
    }
  }

  // obtiene los usuarios ejecutivos
  $scope.devuelveEjecutivos = function () {
    cotizacionConsultaRepository.obtieneEjecutivos($scope.userData.contratoOperacionSeleccionada).then(function (ejecutivos) {
      if (ejecutivos.data.length > 0) {
        $scope.listaEjecutivos = ejecutivos.data
      }
    }, function (error) {
      alertFactory.error('No se pudo recuperar información de los ejecutivos')
    })
  }

  $scope.changeFilters = function(){
    $scope.ZonaFilter = $scope.ZonasSeleccionadas[$scope.totalNiveles] == '' || $scope.ZonasSeleccionadas[$scope.totalNiveles] == undefined || $scope.ZonasSeleccionadas[$scope.totalNiveles] == 0 || $scope.ZonasSeleccionadas[$scope.totalNiveles] == '0' ? null : $scope.ZonasSeleccionadas[$scope.totalNiveles];

    if (($scope.fechaInicio != '' && $scope.fechaInicio !== undefined && $scope.fechaInicio !== null) && ($scope.fechaFin != '' && $scope.fechaFin !== undefined && $scope.fechaFin !== null)){
        $scope.rInicioFilter = $scope.fechaInicio + ' 00:00:00';
        $scope.rFinFilter = $scope.fechaFin + ' 23:59:59';
    } else if ($scope.fecha != '' && $scope.fecha !== undefined && $scope.fecha !==  null){
        $scope.rInicioFilter = $scope.fecha + ' 00:00:00';
        $scope.rFinFilter = $scope.fecha + ' 23:59:59';
    } else if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined){
        $scope.rInicioFilter = $scope.obtienePrimerFechaMes();
        $scope.rFinFilter = $scope.obtieneUltimaFechaMes();
    } else {
        $scope.rInicioFilter = null;
        $scope.rFinFilter = null;
    }

    $scope.idEjecutivo = $scope.ejecutivoSelected === '' || $scope.ejecutivoSelected === undefined || $scope.ejecutivoSelected === null || $scope.ejecutivoSelected === 0 || $scope.ejecutivoSelected === '0' ? null : $scope.ejecutivoSelected;

    $scope.DatesFlag = 0;
  }

  $scope.consultaPestaniaConfirm = function(){

    if (($scope.ZonaFilter ===  null || $scope.ZonaFilter === undefined) && ($scope.idEjecutivo === null || $scope.idEjecutivo === undefined) && ($scope.rInicioFilter == null || $scope.rInicioFilter == undefined) && ($scope.rFinFilter === null || $scope.rFinFilter === undefined)){

          swal({
                title: '¿Desea realizar la búsqueda sin criterios de selección?',
                text: "Al realizar la búsqueda sin criterios, se traerán todos los resultados.",
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si',
                cancelButtonText: 'Cancelar'
              }, function (isConfirm) {
                if (isConfirm) {
                  //aplicar el cambio con filtros limpios
                  $scope.changeFilters();
                  $scope.consultaPestania();
               }
             });
    }else{
        $scope.changeFilters();
        $scope.consultaPestania();
    }
  }

  $scope.consultaPestania = function(){

        switch ($scope.selectedTab) {
            case 1:
                $scope.getPorCobrar();
                break;
            case 2:
                $scope.getCopades();
                break;
            case 3:
                $scope.getPrefacturaGenerada();
                break;
            case 4:
                $scope.getEnviadasCliente();
                break;
            case 5:
                $scope.getSeleccionDeAbonos();
                break;
            case 6:
                if ($scope.showCopade == 1){
                    $scope.getFacturasAbonadas();
                } else {
                    $scope.getAbonadas();
                }
                break;
            case 7:
                if ($scope.showCopadeFacturas == 1){
                    $scope.getFacturasPagadas();
                } else {
                    $scope.getPagadas();
                }
                break;

            default:

        }

  }

  $scope.cambioZona = function (id, orden) {
      //al cambiar de zona se establece como zona seleccionada.
      $scope.zonaSelected = id;
      //se limpian los combos siguientes.
      for ($scope.x = orden + 1; $scope.x <= $scope.totalNiveles; $scope.x++) {
          $scope.ZonasSeleccionadas[$scope.x] = "0";
      }

      $scope.changeFilters();
  };

  $scope.MesChange = function () {
      if ($scope.DatesFlag == 1 || $scope.DatesFlag == 0){
          $scope.fechaInicio = '';
          $scope.fechaFin = '';
          $scope.fecha = '';
          $scope.DatesFlag = 1;
          $('#txtFIni').datepicker('setDate', null);
          $('#txtFFin').datepicker('setDate', null);
          $('#txtfechaEspecifica').datepicker('setDate', null);

          $scope.changeFilters();
      }
  };

  $scope.RangoChange = function () {
      if ($scope.DatesFlag == 2 || $scope.DatesFlag == 0){
          $scope.fechaMes = '';
          $scope.fecha = '';
          $scope.DatesFlag = 2;
          $('#txtMes').datepicker('setDate', null);
          $('#txtfechaEspecifica').datepicker('setDate', null);
          this.ValidaRangoFechas();

          $scope.changeFilters();
      }
  };

  $scope.FechaChange = function () {
      if ($scope.DatesFlag == 3 || $scope.DatesFlag == 0){
          $scope.fechaMes = '';
          $scope.fechaInicio = '';
          $scope.fechaFin = '';
          $scope.DatesFlag = 3;
          $('#txtMes').datepicker('setDate', null);
          $('#txtFIni').datepicker('setDate', null);
          $('#txtFFin').datepicker('setDate', null);

          $scope.changeFilters();
      }
  };

  $scope.ValidaRangoFechas = function () {
      var isValid = true;

      //valida si están seleccionadas ambas fechas del rango
      if ($scope.fechaInicio != '' && $scope.fechaFin != '') {
          var fechaInicial = $scope.fechaInicio.split('/');
          var fechaFinal = $scope.fechaFin.split('/');

          //valida el anio
          if (parseInt(fechaInicial[0]) > parseInt(fechaFinal[0])) {
              isValid = false;
          } else if (parseInt(fechaInicial[0]) == parseInt(fechaFinal[0])) {
              //valida el mes
              if (parseInt(fechaInicial[1]) > parseInt(fechaFinal[1])) {
                  isValid = false;
              } else if (parseInt(fechaInicial[1]) == parseInt(fechaFinal[1])) {
                  //valida el día
                  if (parseInt(fechaInicial[2]) > parseInt(fechaFinal[2])) {
                      isValid = false;
                  }
              }
          }

          if (isValid == false) {
              $scope.fechaInicio = '';
              $scope.fechaFin = '';
              alertFactory.info('La Fecha de Fin Debe Ser Posterior a la Fecha de Inicio.');
          }
      }
  };


  //obtiene la fecha del último día del mes seleccionado
  $scope.obtieneUltimaFechaMes = function(){
      var result = '';
      if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
          var fechaPartida = $scope.fechaMes.split('-');

          if (fechaPartida[0] == 'Enero') {
              var date = new Date(fechaPartida[1], 1, 0);
              result = fechaPartida[1] + '/01/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Febrero') {
              var date = new Date(fechaPartida[1], 2, 0);
              result = fechaPartida[1] + '/02/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Marzo') {
              var date = new Date(fechaPartida[1], 3, 0);
              result = fechaPartida[1] + '/03/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Abril') {
              var date = new Date(fechaPartida[1], 4, 0);
              result = fechaPartida[1] + '/04/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Mayo') {
              var date = new Date(fechaPartida[1], 5, 0);
              result = fechaPartida[1] + '/05/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Junio') {
              var date = new Date(fechaPartida[1], 6, 0);
              result = fechaPartida[1] + '/06/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Julio') {
              var date = new Date(fechaPartida[1], 7, 0);
              result = fechaPartida[1] + '/07/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Agosto') {
              var date = new Date(fechaPartida[1], 8, 0);
              result = fechaPartida[1] + '/08/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Septiembre') {
              var date = new Date(fechaPartida[1], 9, 0);
              result = fechaPartida[1] + '/09/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Octubre') {
              var date = new Date(fechaPartida[1], 10, 0);
              result = fechaPartida[1] + '/10/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Noviembre') {
              var date = new Date(fechaPartida[1], 11, 0);
              result = fechaPartida[1] + '/11/' + date.getDate().toString() + ' 23:59:59' ;
          } else if (fechaPartida[0] == 'Diciembre') {
              var date = new Date(fechaPartida[1], 12, 0);
              result = fechaPartida[1] + '/12/' + date.getDate().toString() + ' 23:59:59' ;
          }
      }
      return result;
  }

  //obtiene la fecha del primer día del mes seleccionado
  $scope.obtienePrimerFechaMes = function () {
      var result = '';
      if ($scope.fechaMes != '' && $scope.fechaMes != null && $scope.fechaMes != undefined) {
          var fechaPartida = $scope.fechaMes.split('-');
          if (fechaPartida[0] == 'Enero') {
              result = fechaPartida[1] + '/01/01 00:00:00';
          } else if (fechaPartida[0] == 'Febrero') {
              result = fechaPartida[1] + '/02/01 00:00:00';
          } else if (fechaPartida[0] == 'Marzo') {
              result = fechaPartida[1] + '/03/01 00:00:00';
          } else if (fechaPartida[0] == 'Abril') {
              result = fechaPartida[1] + '/04/01 00:00:00';
          } else if (fechaPartida[0] == 'Mayo') {
              result = fechaPartida[1] + '/05/01 00:00:00';
          } else if (fechaPartida[0] == 'Junio') {
              result = fechaPartida[1] + '/06/01 00:00:00';
          } else if (fechaPartida[0] == 'Julio') {
              result = fechaPartida[1] + '/07/01 00:00:00';
          } else if (fechaPartida[0] == 'Agosto') {
              result = fechaPartida[1] + '/08/01 00:00:00';
          } else if (fechaPartida[0] == 'Septiembre') {
              result = fechaPartida[1] + '/09/01 00:00:00';
          } else if (fechaPartida[0] == 'Octubre') {
              result = fechaPartida[1] + '/10/01 00:00:00';
          } else if (fechaPartida[0] == 'Noviembre') {
              result = fechaPartida[1] + '/11/01 00:00:00';
          } else if (fechaPartida[0] == 'Diciembre') {
              result = fechaPartida[1] + '/12/01 00:00:00';
          }
      }
      return result;
  }

  $scope.AbrirOrden = function (numeroOrden, estatus) {
    location.href = '/detalle?orden=' + numeroOrden + '&estatus=' + estatus
  }

    //-------------------------------------------------------------Muestra la lista de ordenes para la COPADE
    $('.dataTableDetalleOrdenes').DataTable().destroy()
    $scope.ShowOrdenCopade = function (idCopade, numeroCopade) {
      if(!angular.isUndefined(idCopade)){

        $scope.promise = ordenPorCobrarRepository.get('obtenerOrdenesPorCopade',
        {'idContratoOperacion': $scope.userData.contratoOperacionSeleccionada,
        'idCopade': idCopade })
        .then(function (result) {
          $scope.numeroCopadeModal = numeroCopade;
          $scope.ordenesDeCopade = result.data;

          globalFactory.filtrosTabla('dataTableDetalleOrdenes', 'Detalle de ordenes', 10);

          $('#ordenesCopade').modal('show');

        }, function (error) {
          alertFactory.error('No se puede obtener las ordenes.')
        });
      }
    }

    //Abrir detalle de orden sin estatus POR EL MOMENTO
    $scope.AbrirOrdenSinEstatus = function (numeroOrden) {
      location.href = '/detalle?orden=' + numeroOrden
    }

  $scope.AbrirCoincidencias = function () {
    $('#mejorCoincidencia').modal.show()
  }

  $scope.GuardarOrdenPago = function () {
    $scope.promise = ordenPorCobrarRepository.post('agregarordenpago', {
      'idUsuario': 1,
      'folio': 9999,
      'fecha': '20170608',
      'monto': 12345
    }).then(function (result) {
      alertFactory.success('Orden de pago almacenada correctamente.')
      $('.dataTableOrdenPago').DataTable().destroy()
      $scope.promise = ordenPorCobrarRepository.get('obtenerordenpago', { 'idUsuario': 1 }).then(function (result) {
        $scope.ordenPago = result.data
        globalFactory.filtrosTabla('dataTableOrdenPago', 'Ordenes de Pago', 100)
      }, function (error) {
        alertFactory.error('No se puenen obtener las Facturas Pagadas')
      })
    }, function (error) {
      alertFactory.error('No se puenen obtener las órdenes por cobrar')
    })
  }

  $scope.getMemorandums = function () {
    nuevoMemorandumRepository.getMemoUsuario($scope.userData.idUsuario)
    .then(function successCallback(response) {
      $scope.Memorandums = []
      response.data.forEach(function (element) {
        if (element.leido != 1) {
          if ($scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum) == undefined) {
            $scope.Memorandums.push({
              "idMemorandum": element.idMemorandum,
              "fecha": new Date(element.fecha).toLocaleDateString() + ' ' + new Date(element.fecha).toLocaleTimeString(),
              "titulo": element.titulo,
              "descripcion": element.descripcion,
              "leido": element.leido,
              "aceptado": element.aceptado,
              "comentarios": element.comentarios,
              evidencias: [
              {
                "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                "idEvidencia": element.idEvidencia,
                "evidencia": element.evidencia,
                "fullPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/' + element.evidencia
              }
              ]
            })
          }
          else {
            $scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum).evidencias.push({
              "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
              "idEvidencia": element.idEvidencia,
              "evidencia": element.evidencia,
              "fullPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/' + element.evidencia
            })
          }
        }
      }, this);
      if ($scope.Memorandums.find(X => X.leido != 1) != undefined) {
        $rootScope.hasMemo = true
        location.href = "/miCuenta"
      }
    })

  }

  $('.dataTableCoincidencia').DataTable().destroy();
  //Busqueda de las mejores coincidencias para los datos Copade
  $scope.buscaCoincidencia = function (idDatosCopade) {
    $('.dataTableCoincidencia').DataTable().destroy();
    $('.dataTableOrdenesPorCobrar').DataTable().destroy();

    $('#mejorCoincidencia').modal('show');

    $scope.ordenes = [];
    $scope.coincidencia = [];
    $scope.cobranza.forEach(function (p, i) {
      if (p.idDatosCopade == idDatosCopade) {
        $scope.folio = $scope.cobranza[i].ordenSurtimiento;
        $scope.monto = $scope.cobranza[i].subTotal;
        $scope.numeroCopade = $scope.cobranza[i].numeroCopade;
        $scope.numeroCopade == null ? $scope.numeroCopade = 'S/N COPADE' : $scope.cobranza[i].numeroCopade;
        $scope.fechacarga = $scope.cobranza[i].fechaCarga;
        $scope.fecharecepcion = $scope.cobranza[i].fechaRecepcionCopade;
        $scope.numeroestimacion = $scope.cobranza[i].numeroEstimacion;
        $scope.idDatosDeCopade = $scope.cobranza[i].idDatosCopade;
            //get('obtenerpagadas', { 'idUsuario': 1 })
            ordenPorCobrarRepository.get('MejorCoincidencia',{'folio':$scope.folio}).then(function (result) {
              $scope.coincidencia = result.data;
              $scope.trabajos=[];
              setTimeout(function () {
                globalFactory.filtrosTabla('dataTableCoincidencia', 'Mejor coinciden', 10)
              }, 1500);

            }, function (error) {
              alertFactory.error("Error al obtener las COPADE");
            });

            }
          });
  }
  //Selecciona una orden en Radio y obtiene idTrabajo
  $scope.seleccionMejorCoincidencia = function (idOrden, montoOrdenSeleccionado, numeroOrden) {

    var trabajo = false;
    if ($scope.checkedTrabajos.length>0) {
      for (i = 0; i < $scope.checkedTrabajos.length; i++) {
        if ($scope.checkedTrabajos[i].idTrabajo == idOrden) {
          trabajo = true;
          if ($scope.checkedTrabajos[i].check ) {
            $scope.checkedTrabajos[i].check= false;
          }else{
            $scope.checkedTrabajos[i].check= true;
          }
        }

      }
      if (!trabajo) {
        obj = new Object();
        obj.idTrabajo= idOrden;
        obj.numeroTrabajo= numeroOrden;
        obj.montoOrdenSeleccionado= montoOrdenSeleccionado;
        obj.check = true;
        $scope.checkedTrabajos.push(obj);
      }
    }else{
      obj = new Object();
      obj.idTrabajo= idOrden;
      obj.numeroTrabajo= numeroOrden;
      obj.montoOrdenSeleccionado= montoOrdenSeleccionado;
      obj.check = true;
      $scope.checkedTrabajos.push(obj);
    }

    }

  //valida (+-)1 del monto de la copa contrar la orden seleccionada
  var validaMontoCapadeOrden = function(montoOrdenSeleccionado){
    if($scope.monto != null && $scope.monto != '' && $scope.monto > 0){
      var resultado = montoOrdenSeleccionado >= $scope.monto ? (montoOrdenSeleccionado - $scope.monto) : ($scope.monto - montoOrdenSeleccionado);
      if(resultado >= 0 && resultado <= 10)
        return true;
      else
        return false;
    }
  }

  //Inserta a historial proceso y Asocia DatosCopadeOrden
  $scope.trabajoCobrado = function (idTrabajo, idDatosCopade) {
    $('.dataTableOrdenesPorCobrar').DataTable().destroy();
    ordenPorCobrarRepository.putTrabajoCobrado(idTrabajo, idDatosCopade, $scope.userData.contratoOperacionSeleccionada, $scope.userData.isProduction).then(function (result) {
      if (result.data.length > 0) {
        alertFactory.success('Trabajo cobrado exitosamente');
      } else {
        alertFactory.info('No se pudo actualizar el trabajo cobrado');
      }
    }, function (error) {
      alertFactory.error("Error al actualizar el trabajo cobrado");
    });
  }

  //Asociamos un idtrabajo con DatosCopade
  $scope.asociarCopade = function () {

   var idTrabajos='';
   var numeroTrbajos='';
   var montoOrdenSeleccionadoSuma=0;
   for (i = 0; i < $scope.checkedTrabajos.length; i++) {
    if ($scope.checkedTrabajos[i].check ) {
      idTrabajos+=$scope.checkedTrabajos[i].idTrabajo+',';
      numeroTrbajos+=$scope.checkedTrabajos[i].numeroTrabajo+',';
      montoOrdenSeleccionadoSuma+=parseFloat($scope.checkedTrabajos[i].montoOrdenSeleccionado);
    }
  };

  $scope.promise = ordenPorCobrarRepository.get("getOrden",numeroTrbajos).then(function (result) {

    if (result.data[0].Orden != 0) {

     if(validaMontoCapadeOrden(montoOrdenSeleccionadoSuma)){
      if (idTrabajos != '') {
        $('.btnTerminarTrabajo').ready(function () {
          swal({
            title: "¿Esta seguro en asociar esta copade con la orden de servicio selecionado?",
            text: "Se cambiará el estatus a 'Cobrado'",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#65BD10",
            confirmButtonText: "Si",
            cancelButtonText: "No",
            closeOnConfirm: false,
            closeOnCancel: false
          },
          function (isConfirm) {
            if (isConfirm) {
              $scope.trabajoCobrado(idTrabajos, $scope.idDatosDeCopade);
              ordenPorCobrarRepository.putMueveCopade(idTrabajos, $scope.idDatosDeCopade).then(function (resp) {
               if (resp.data > 0) {
                 alertFactory.success('La copade se copio correctamente');
               }
             }, function (error) {
               alertFactory.error('La copade no se pudo depositar en su carpeta');
             });
              $scope.cleanDatos();
              swal("Trabajo terminado!", "La copade se ha asociada", "success");
              setTimeout(function () {
                $scope.getCopades();
                $scope.getPrefacturaGenerada();
                $scope.checkedTrabajos=[];
                $('#finalizarTrabajoModal').modal('hide');
                $('#mejorCoincidencia').modal('hide');
              //location.href = '/ordenesporcobrar';
             }, 1500);
            } else {
              swal("Copade no asociada", "", "error");
              $scope.cleanDatos();
              $('#finalizarTrabajoModal').modal('hide');
              $('#mejorCoincidencia').modal('hide');
            }
          });
        });
      } else {
        alertFactory.error("Debe seleccionar una orden de servicio");
      }
    }
    else{
     alertFactory.error("El monto de la orden seleccionada rebasa el rango especificado de (+- $1.00 MXN), seleccione una orden que se adecúe con el monto de la COPADE");
   }

 }else{

  swal({
    title: "Advertencia",
    text: "No se ha creado la provisión de esta orden.",
    type: "warning",
    showCancelButton: false,
    confirmButtonColor: "#67BF11",
    confirmButtonText: "Aceptar",
    closeOnConfirm: true
  });
}
}, function (error) {
  alertFactory.error("Error al verificar la orden");
});
}

  //Limpiamos campos idTrabajo
  $scope.cleanDatos = function () {
    $scope.idDeTrabajo = '';
    $scope.checkedTrabajos = [];
  }

  $scope.verOrdenes= function(idDatosCopade){
    $('.dataTableTrabajosCobrados').DataTable().destroy();
    $('#facturasOrden').appendTo("body").modal('show');
    ordenPorCobrarRepository.getTrbajoCobrado({'idUsuario': $scope.userData.idUsuario,'idDatosCopade':idDatosCopade, 'idContratoOperacion': $scope.userData.contratoOperacionSeleccionada, 'isProduction': $scope.userData.isProduction}).then(function (result) {
      if (result.data.length > 0) {
        $scope.trabajosCobrados = result.data;
        $scope.numeroCopadeOrden = $scope.trabajosCobrados[0].numeroCopade;
        globalFactory.waitDrawDocument("dataTableTrabajosCobrados", "OrdenporCobrar");
      }
    }, function (error) {
      alertFactory.error("Error al obtener trabajos por cobrar");
    });
  }

  $scope.asociarFacturaCotizacion = function () {
    var ordenGlobal='';

      for (i = 0; i < $scope.checkedFacturasTotal.length; i++) {
       if ($scope.checkedFacturasTotal[i].check ) {
         ordenGlobal+=$scope.checkedFacturasTotal[i].ordenGlobal+',';
       }
     };
     if (ordenGlobal != '') {
       $('.btnTerminarTrabajo').ready(function () {
         swal({
           title: "¿Esta seguro en guardar la Factura selecionada?",
           text: "Se cambiará el estatus a 'Facturas Abonadas'",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#65BD10",
           confirmButtonText: "Si",
           cancelButtonText: "No",
           closeOnConfirm: true,
           closeOnCancel: true
         },
         function (isConfirm) {
           if (isConfirm) {
             ordenPorCobrarRepository.putFacturaAbonada(ordenGlobal).then(function (result) {
               if (result.data.length > 0) {
                 swal("Trabajo terminado!", "Las Facturas se han abonado", "success");
                 $scope.trabajosAbonados(1);
                 $scope.checkedFacturas=[];
                 $scope.totalSeleccionadoSuma = 0;
                 alertFactory.success('Factura abonada correctamente');
                 $scope.getSeleccionDeAbonos();
                 $scope.getFacturasAbonadas();
               } else {
                 alertFactory.info('No se pudo actualizar la Factura');
               }
             }, function (error) {
               alertFactory.error("Error al actualizar la factura");
             });
           } else {
             swal("Factura no asociada", "", "error");
             $('#finalizarTrabajoModal').modal('hide');
           }
         });
       });
     } else {
       alertFactory.error("Debe seleccionar al menos una Factura");
     }
   }

    //Carga Adenda y Copade
    $scope.subir = function () {
      if ($scope.fechaRecepcionCopade != ''){
        $('#subirAdenda').appendTo('body').modal('show');
      }
    }

    $scope.dzCallbacks = {
      'addedfile': function (file) {
        $scope.newFile = file;
      },
      'sending': function (file, xhr, formData) {
        formData.append('idTrabajo', 0);
        formData.append('idCotizacion', 0);
        formData.append('idCategoria', 2);
            formData.append('idNombreEspecial', 0); //adencaCopade
            formData.append('idDatosCopade', 0);
          },
          'completemultiple': function (file, xhr) {
            var checkErrorFile = file.some(checkExistsError);
            if (!checkErrorFile) {
              var allSuccess = file.every(checkAllSuccess);
              if (allSuccess) {
                var nombreCopades = [];
                file.forEach(function (archivo) {
                  nombreCopades.push(archivo.name);
                });
                ordenPorCobrarRepository.putGeneraDatosCopade(nombreCopades, $scope.fechaRecepcionCopade, $scope.idContratoOperacion).then(function (result) {
                  if (result.data.length > 0) {
                    ordenPorCobrarRepository.putInsertaDatosCopade(result.data).then(function (resp) {
                      if (resp.data.length > 0) {

                        if (resp.data[0].id==0) {
                          alertFactory.info('Ya existe un archivo para la COPADE');
                        }else{
                          ordenPorCobrarRepository.putRenombraCopade(nombreCopades, resp.data).then(function (respuesta) {
                            if (respuesta.data > 0) {
                              alertFactory.success('Copade cargada satisfactoriamente');
                                                //$scope.limpiaFecha();
                                                $scope.getCopades();
                                              }
                                            }, function (error) {
                                              alertFactory.error('No se pudo cargar la copade');
                                            });
                        }

                      } else {
                        alertFactory.error('No se pudieron extraer los datos de la copade');
                      }            
                    }, function (error) {
                      alertFactory.error(error);            
                    }); 
                  } else {
                    alertFactory.error('No se pudo procesar la copade');
                  }                     
                }, function (error) {
                  alertFactory.error(error);          
                });
                setTimeout(function () {
                  $scope.dzMethods.removeAllFiles(true);
                  $('#subirAdenda').appendTo('body').modal('hide');
                }, 1000);
              }
            }
          },
          'error': function (file, xhr) {
            if (!file.accepted) {
              $scope.dzMethods.removeFile(file);
            } else {
              $scope.dzMethods.removeAllFiles(true);
              alertFactory.info("No se pudieron subir los archivos");
            }
          },
        };

    //valida si todos son success
    function checkAllSuccess(file, index, array) {
      return file.status === 'success';
    }

    //valida si existe algún error
    function checkExistsError(file) {
      return file.status === 'error';
    }

    $scope.validarFecha = function(){
      if($scope.fechaRecepcionCopade != ''){
        $scope.showTagFechaRecepcion = false;
      }else{
        $scope.showTagFechaRecepcion = true;
      }
    }


    $('#fechaTrabajo .input-group.date').datepicker({
      todayBtn: "linked",
      keyboardNavigation: true,
      forceParse: false,
      calendarWeeks: true,
      autoclose: true,
      todayHighlight: true
    });
  //Muestra la captura de la fecha
  $scope.fechaRecepcibeCopade = function () {
    $('#finalizarTrabajoModal').appendTo("body").modal('show');
  }
  //Guardamos la fecha capturable de la copade
  $scope.saveFecha = function () {
    if ($scope.fechaRecepcionCopade != '') {
      localStorageService.set("fechaRecepcion", $scope.fechaRecepcionCopade);
      $('#finalizarTrabajoModal').modal('hide');
      $scope.validarFecha();
    } else {
      alertFactory.info('Debe ingresar una fecha');
    }
  }

  $scope.limpiaFecha = function () {
    $scope.fechaRecepcionCopade = '';
    $scope.validarFecha();
  }
  //Carga de archivos
  $scope.subirCopade = function () {
    var file = $('#myFile1:file')[0].files[0];
    var name = file.name;

    var copade_file = $('#myFile1').val()
    if (copade_file == '') {
      alertFactory.warning('Selecciona un archivo.')
    } else {
      $('.btn-copade').attr('disabled', 'disabled')

      ordenPorCobrarRepository.postSubirCopade().then(function (result) {
        var Respuesta = result
        document.getElementById('frm_copade').reset()
        //$('.lbl_evidencia').text('Seleccionar archivo')

        var _nombre = Respuesta.data.data[0].nombre
        var _descri = ''
        var _ruta = Respuesta.data.data[0].PathDB

      }, function (error) { })
    }

  }

  $scope.seleccionFacturaAbonadaCotizacion= function (idTrabajoAgrupado, ordenGlobal, total) {
    //Marcar seleccionados
     //var factura = false;
     $scope.totalSeleccionadoSuma = 0;
     if ($scope.checkedFacturasTotal.length > 0) {
      for (i = 0; i < $scope.checkedFacturasTotal.length; i++) {
        if ($scope.checkedFacturasTotal[i].ordenGlobal == ordenGlobal) {
                //factura = true;
                if ($scope.checkedFacturasTotal[i].check == false) {
                  $scope.checkedFacturasTotal[i].check = true;
                  angular.forEach($scope.selectCotizaciones, function(value, key) {
                   if(value.COP_ORDENGLOBAL == ordenGlobal)
                    value.selected = true;
                });
                }else{
                  $scope.checkedFacturasTotal[i].check = false;
                  angular.forEach($scope.selectCotizaciones, function(value, key) {
                   if(value.COP_ORDENGLOBAL == ordenGlobal)
                    value.selected = false;
                });
                }
              }
            }
          }
          for (i = 0; i < $scope.checkedFacturasTotal.length; i++) {
            if ($scope.checkedFacturasTotal[i].check) {
             $scope.totalSeleccionadoSuma+=parseFloat($scope.checkedFacturasTotal[i].total);
           }
         }
       }

  $scope.getAbonadas = function (){
      //Obtengo la lista de tablas (ABONOS)
      $('.dataTableAbona').DataTable().destroy()
      $scope.checkedFacturasTotala = [];
      $scope.selectAbonada = '';
      $scope.promise = ordenPorCobrarRepository.get('obtenerabonada', { 'idUsuario': $scope.userData.idUsuario,
      'idContratoOperacion':$scope.userData.contratoOperacionSeleccionada,'isProduction':$scope.userData.isProduction, 'idZona': $scope.ZonaFilter, 'idEjecutivoFiltro': $scope.idEjecutivo, 'fechaIni': $scope.rInicioFilter, 'fechaFin': $scope.rFinFilter }).then(function (result) {
      $scope.selectAbonada = result.data
      var sumatoriaMontoAbon = 0;
      var sumatoriaAbonoAbon = 0;
      var sumatoriaSaldoAbon = 0;
      var sumatoriaMontoAbonax = 0;
      var sumatoriaSaldoAbonax = 0;
      $scope.selectobjAbonada = [];
      for(var i=0;i<result.data.length;i++){
        var existe = false;
        $scope.selectobjAbonada.forEach(function(value){
          if (value.numeroCopade == result.data[i].numeroCopade){
            existe = true;
          }
        });

        if(!existe){
          $scope.selectobjAbonada.push(result.data[i]);
          sumatoriaMontoAbon += parseFloat(result.data[i].COP_CARGO);
          sumatoriaAbonoAbon += parseFloat(result.data[i].abono);
          sumatoriaSaldoAbon += parseFloat(result.data[i].COP_SALDO);
          sumatoriaMontoAbonax += parseFloat(result.data[i].total);
          sumatoriaSaldoAbonax += parseFloat(result.data[i].saldoProveedor);
        }
      };
      $scope.montoCopAbonoAbon = sumatoriaMontoAbon;
      $scope.abonoCopAbonoAbon = sumatoriaAbonoAbon;
      $scope.saldoCopAbonoAbon = sumatoriaSaldoAbon;
      $scope.montoProvAbonoAbon = sumatoriaMontoAbonax;
      $scope.saldoProvAbonoAbon = sumatoriaSaldoAbonax;

      for(var i=0;i< result.data.length;i++){
        obj = new Object();
        obj.idTrabajoAgrupado = result.data[i].idOrdenAgrupada;
        obj.ordenGlobal = result.data[i].COP_ORDENGLOBAL;
        obj.total = result.data[i].saldoProveedor;
        obj.check = false;
        $scope.checkedFacturasTotala.push(obj);
      };

      globalFactory.filtrosTabla('dataTableAbona', 'Facturas Abonadas', 50)
    }, function (error) {
      alertFactory.error('No se puenen obtener los abonos generados')
    })

  }

  $scope.getPagadas = function (){
      //Obtengo la lista de tablas (ABONOS)
      $('.dataTablePago').DataTable().destroy()
      $scope.checkedFacturasTotalp = [];
      $scope.selectPgds='';
      $scope.promise = ordenPorCobrarRepository.get('obtenerPagada', { 'idUsuario': $scope.userData.idUsuario,
    'idContratoOperacion':$scope.userData.contratoOperacionSeleccionada,'isProduction': $scope.userData.isProduction, 'idZona': $scope.ZonaFilter, 'idEjecutivoFiltro': $scope.idEjecutivo, 'fechaIni': $scope.rInicioFilter, 'fechaFin': $scope.rFinFilter}).then(function (result) {
      $scope.selectPgds = result.data
      var sumatoriaMontoPago = 0;
      var sumatoriaAbonoPago = 0;
      var sumatoriaSaldoPago = 0;
      var sumatoriaMontoPagopx = 0;
      var sumatoriaSaldoPagopx = 0;
      $scope.selectObjPagadas = [];
      for(var i=0;i<result.data.length;i++){
        var existe = false;
        $scope.selectObjPagadas.forEach(function(value){
          if (value.numeroCopade == result.data[i].numeroCopade){
            existe = true;
          }
        });

        if(!existe){
          $scope.selectObjPagadas.push(result.data[i]);
          sumatoriaMontoPago += parseFloat(result.data[i].COP_CARGO);
          sumatoriaAbonoPago += parseFloat(result.data[i].abono);
          sumatoriaSaldoPago += parseFloat(result.data[i].COP_SALDO);
          sumatoriaMontoPagopx += parseFloat(result.data[i].total);
          sumatoriaSaldoPagopx += parseFloat(result.data[i].saldoProveedor);
        }
      };
      $scope.montoCopAbonoPago = sumatoriaMontoPago;
      $scope.abonoCopAbonoPago = sumatoriaAbonoPago;
      $scope.saldoCopAbonoPago = sumatoriaSaldoPago;
      $scope.montoProvAbonoPago = sumatoriaMontoPagopx;
      $scope.saldoProvAbonoPago = sumatoriaSaldoPagopx;

      for(var i=0;i< result.data.length;i++){
        obj = new Object();
        obj.idTrabajoAgrupado = result.data[i].idOrdenAgrupada;
        obj.ordenGlobal = result.data[i].COP_ORDENGLOBAL;
        obj.total = result.data[i].saldoProveedor;
        obj.check = false;
        $scope.checkedFacturasTotalp.push(obj);
      };

      globalFactory.filtrosTabla('dataTablePago', 'Facturas Pagadas', 50)
    }, function (error) {
      alertFactory.error('No se puenen obtener los abonos generados')
    })

  }

  $scope.findAbono = function () {
      getAbonadas();
  }


  $scope.findFinalizado = function () {
      getPagadas();
  }


       function getBase64(file) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
          return reader.result;
          console.log(reader.result);
        };
        reader.onerror = function (error) {
          console.log('Error: ', error);
        };
      }

    $scope.eliminarCopade = function(datosCopade)
    {
      swal({
        title: "¿Esta seguro de eliminar copade?",
        text: "Eliminar copade",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#65BD10",
        confirmButtonText: "Si",
        cancelButtonText: "No",
        closeOnConfirm: true,
        closeOnCancel: true
    }, function(isConfirm) 
    {
      if (isConfirm) 
      {
        $('#loadModal').modal('show');
        ordenPorCobrarRepository.delCopade(datosCopade.idDatosCopade, $scope.idUsuario, $scope.userData.contratoOperacionSeleccionada)
        .then(function (resp) {
            if (resp.data[0].idContratoOperacion > 0)
            {
              setTimeout(function() {
                $('#loadModal').modal('show');
                $scope.changeSelectedTab(2);
                swal('Copade eliminada!', 'Operación realizada corractamente');
              }, 500)
            }
        }, function (error) {
          alertFactory.error('Ocurrio un error al eliminar copade.')
        });
      }else
      {
          swal("Operacion cancelada.");
      }
    });
  }
})
