registrationModule.controller('gastoUnidadController', function ($scope, $modal, $route, $rootScope, userFactory, $location, localStorageService, alertFactory, globalFactory, analisisFlotillaRepository) {
  $rootScope.modulo = 'aprobacionProvision'

  $scope.init = function () {
    userFactory.ValidaSesion()
    $scope.userData = userFactory.getUserData()

    analisisFlotillaRepository.getGastoUnidad($scope.userData.contratoOperacionSeleccionada).then(function (result) {
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
        export: {
          enabled: true,
          fileName: 'GastoPorUnidad',
          allowExportSelectedData: false
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
        columns: [{
          dataField: 'foto',
          width: 70,
          allowFiltering: false,
          allowSorting: false,
          cellTemplate: 'cellTemplate'
        },  {
          dataField: 'unidadOperativa',
          caption: 'Zona',
          width: 250
        }, {
          dataField: 'tipoUnidad',
          caption: 'Tipo Vehículo',
        }, {
          dataField: 'numeroEconomico',
          caption: 'Económico',
          width: 90
        }
          , {
            dataField: 'placas',
            caption: 'Placas',
            width: 90
          }
          , {
            dataField: 'servicios',
            caption: 'Servicios',
            width: 90
          }
          , {
            dataField: 'monto',
            caption: 'Total',
            format: 'currency',
            width: 100,
            sortOrder: 'desc'
          }, {
            caption: 'Ir',
            dataField: 'numeroEconomico',
            width: 30,
            allowFiltering: false,
            allowSorting: false,
            cellTemplate: 'viewTemplate'
          }
        ]
      }
    }, function (error) {
      alertFactory.error('Error al cargar el gasto por unidad')
    })

    $scope.doneButtonOptions = {
      text: 'Done',
      type: 'default',
      onClick: function (e) {
        DevExpress.ui.notify('The Done button was clicked')
      }
    }
  }

  $scope.abrirUnidad = function (unidad) {
    location.href = '/unidad?economico=' + unidad
  }
})
