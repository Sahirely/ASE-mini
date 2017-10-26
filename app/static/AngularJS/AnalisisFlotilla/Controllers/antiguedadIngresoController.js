registrationModule.controller('antiguedadIngresoController', function ($scope, $modal, $route, $rootScope, userFactory, $location, localStorageService, alertFactory, globalFactory, analisisFlotillaRepository) {
  $rootScope.modulo = 'aprobacionProvision'

  $scope.init = function () {
    userFactory.ValidaSesion()
    $scope.userData = userFactory.getUserData()

    analisisFlotillaRepository.getIngresoAntiguedad($scope.userData.contratoOperacionSeleccionada).then(function (result) {
      $scope.filterRow = {
        visible: false,
        applyFilter: 'auto'
      }
      $scope.headerFilter = {
        visible: true
      }
      $scope.dataGridOptions = {
        dataSource: result.data,
        bindingOptions: {
          filterRow: 'filterRow',
          headerFilter: 'headerFilter'
        },
        searchPanel: {
          visible: true,
          width: 240,
          placeholder: 'Buscar en todo...'
        },
        selection: {
          mode: 'single'
        },
        columns: [{
          dataField: 'sucursal',
          caption: 'Zona'
        }, {
          dataField: 'unidadOperativa',
          caption: 'SUB'
        }, {
          dataField: 'total',
          caption: 'Total'
        }, {
          caption: 'Unidades que no han entrado en:',
          columns: [{
            dataField: 'c30',
            caption: '30 días',
            alignment: 'right'
          }, {
            dataField: 'c60',
            caption: '60 días',
            alignment: 'right'
          }, {
            dataField: 'c90',
            caption: '90 días',
            alignment: 'right'
          }, {
            dataField: 'c120',
            caption: '120 o mas días',
            alignment: 'right'
          }]
        }
        ],
        summary: {
          totalItems: [{
            column: 'c30',
            summaryType: 'sum',
            valueFormat: 'fixedPoint',
            displayFormat: '{0}',
            alignByColumn: true
          }, {
            column: 'c60',
            summaryType: 'sum',
            valueFormat: 'fixedPoint',
            displayFormat: '{0}',
            alignByColumn: true
          }, {
            column: 'c90',
            summaryType: 'sum',
            valueFormat: 'fixedPoint',
            displayFormat: '{0}',
            alignByColumn: true
          }, {
            column: 'c120',
            summaryType: 'sum',
            valueFormat: 'fixedPoint',
            displayFormat: '{0}',
            alignByColumn: true
          }, {
            column: 'total',
            summaryType: 'sum',
            valueFormat: 'fixedPoint',
            displayFormat: '{0}'
          }]
        }
      }
      analisisFlotillaRepository.getIngresoAntiguedadGrafica($scope.userData.contratoOperacionSeleccionada).then(function (result) {
        $scope.chartOptions = {
          palette: 'ocean',
          dataSource: result.data,
          title: 'Ingreso Total',
          legend: {
            orientation: 'horizontal',
            itemTextPosition: 'right',
            horizontalAlignment: 'right',
            verticalAlignment: 'bottom',
            columnCount: 4
          },
          'export': {
            enabled: true
          },
          series: [{
            argumentField: 'label',
            valueField: 'value',
            label: {
              visible: true,
              font: {
                size: 16
              },
              connector: {
                visible: true,
                width: 0.5
              },
              position: 'columns',
              customizeText: function (arg) {
                return Number(arg.valueText).toLocaleString() + ' (' + arg.argument + ' días)'
              }
            }
          }]
        }
      }, function (error) {
        alertFactory.error('Error al cargar el gasto por unidad')
      })
    }, function (error) {
      alertFactory.error('Error al cargar el gasto por unidad')
    })
  }
})
