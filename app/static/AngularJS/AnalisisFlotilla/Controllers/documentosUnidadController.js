registrationModule.controller('documentosUnidadController', function ($scope, $modal, $route, $rootScope, userFactory, $location, localStorageService, alertFactory, globalFactory, analisisFlotillaRepository) {
  $rootScope.modulo = 'aprobacionProvision'

  $scope.init = function () {
    userFactory.ValidaSesion()
    $scope.userData = userFactory.getUserData()

    analisisFlotillaRepository.getDocumentosUnidad($scope.userData.contratoOperacionSeleccionada).then(function (result) {
      $scope.drillDownDataSource = {}
      $scope.salesPopupVisible = false
      $scope.salesPopupTitle = ''

      // $scope.pivotGridOptions = {
      //   allowSortingBySummary: true,
      //   allowSorting: true,
      //   allowFiltering: true,
      //   allowExpandAll: true,
      //   showBorders: true,
      //   fieldChooser: {
      //     enabled: false
      //   },
      //   onCellClick: function (e) {
      //     if (e.area == 'data') {
      //       var pivotGridDataSource = e.component.getDataSource(),
      //         rowPathLength = e.cell.rowPath.length,
      //         rowPathName = e.cell.rowPath[rowPathLength - 1],
      //         popupTitle = 'Documentos vencidos en ' + (rowPathName ? rowPathName : 'Total')

      //       $scope.drillDownDataSource = pivotGridDataSource.createDrillDownDataSource(e.cell)
      //       $scope.salesPopupTitle = popupTitle
      //       $scope.salesPopupVisible = true
      //     }
      //   },
      //   dataSource: {
      //     fields: [{
      //       caption: 'Zona',
      //       width: 120,
      //       dataField: 'sucursal',
      //       area: 'row',
      //       expanded: 'true'
      //     }, {
      //       caption: 'TAR',
      //       dataField: 'unidadOperativa',
      //       width: 150,
      //       area: 'row',
      //       expanded: 'true'
      //     }, {
      //       dataField: 'vencimiento',
      //       dataType: 'date',
      //       area: 'column',
      //       expanded: 'true'
      //     }, {
      //       caption: 'Total',
      //       dataField: 'idUnidad',
      //       dataType: 'number',
      //       summaryType: 'count',
      //       format: 'fixedPoint',
      //       area: 'data'
      //     }],
      //     store: result.data
      //   }
      // }

      $scope.dataGridOptions = {
        bindingOptions: {
          dataSource: {
            dataPath: 'drillDownDataSource',
            deep: false
          },
          rowAlternationEnabled: 'true'
        },
        export: {
          enabled: true,
          fileName: 'DocumentosVencidos',
          allowExportSelectedData: false
        },
        columns: [
          {
            dataField: 'tipoUnidad',
            caption: 'Tipo Vehículo',
            width: 500
          }, {
            dataField: 'numeroEconomico',
            caption: 'Económico'
          }, {
            dataField: 'placas',
            caption: 'Placas'
          }, {
            dataField: 'tipoDocumento',
            caption: 'Documento'
          }, {
            dataField: 'vencimiento',
            caption: 'Vencimiento',
            dataType: 'date'
          }
        ],
        onRowClick: function (e) {
          location.href = '/unidad?economico=' + e.data.numeroEconomico
        }
      }

      // $scope.popupOptions = {
      //   width: 1000,
      //   height: 400,
      //   bindingOptions: {
      //     title: 'salesPopupTitle',
      //     visible: 'salesPopupVisible'
      //   }
      // }

      // Asigno los datos.
      $scope.employees = result.data

      $scope.filterRow = {
        visible: true,
        applyFilter: 'auto'
      }
      $scope.headerFilter = {
        visible: true
      }
      $scope.rowAlternationEnabled = true
      // Inicializo la tabla
      $scope.dataGridOptions = {
        dataSource: $scope.employees,
        bindingOptions: {
          filterRow: 'filterRow',
          headerFilter: 'headerFilter',
          rowAlternationEnabled: 'rowAlternationEnabled'
        },
        searchPanel: {
          visible: true,
          width: 240,
          placeholder: 'Buscar en todo...'
        },
        paging: {
          pageSize: 15
        },
        pager: {
          showPageSizeSelector: true,
          allowedPageSizes: [15, 30, 50],
          showInfo: true
        },
        export: {
          enabled: true,
          fileName: 'DocumentosVencidos',
          allowExportSelectedData: false
        },
        columns: [
          {
            dataField: 'tipoUnidad',
            caption: 'Tipo Vehículo',
            width: 500
          }, {
            dataField: 'numeroEconomico',
            caption: 'Económico'
          }, {
            dataField: 'placas',
            caption: 'Placas'
          }, {
            dataField: 'tipoDocumento',
            caption: 'Documento'
          }, {
            dataField: 'vencimiento',
            caption: 'Vencimiento',
            dataType: 'date'
          }
        ],
        onRowClick: function (e) {
          location.href = '/unidad?economico=' + e.data.numeroEconomico
        }
      }
    }, function (error) {
      alertFactory.error('Error al cargar el gasto por unidad')
    })
  }
})
