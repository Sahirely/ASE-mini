registrationModule.controller('inversionController', function ($scope, $filter, $modal, $route, $rootScope, userFactory, $location, localStorageService, alertFactory, globalFactory, analisisFlotillaRepository) {
  $rootScope.modulo = 'aprobacionProvision'

  $scope.init = function () {
    userFactory.ValidaSesion()
    $scope.userData = userFactory.getUserData()


    analisisFlotillaRepository.getInversion($scope.userData.contratoOperacionSeleccionada).then(function (result) {
      // Grafica
      $scope.chartOptions = {
        palette: 'ocean',
        'export': {
          enabled: true
        },
        commonSeriesSettings: {
          type: 'bar'
        },
        tooltip: {
          enabled: true,
          customizeTooltip: function (args) {
            var valueText = ''
            if (args.seriesName.indexOf('Total') != -1) {
              valueText = $filter('currency')(args.originalValue, '$', 2)
            }
            else if (args.seriesName.indexOf('Prom.') != -1) {
              valueText = $filter('currency')(args.originalValue, '$', 2)
            }else {
              valueText = args.originalValue
            }

            return {
              html: args.seriesName + "<div class='currency'>"
                + valueText + '</div>'
            }
          }
        },
        onInitialized: function (e) {
          $scope.chart = e.component
        }
      }

      $scope.drillDownDataSource = {}
      $scope.salesPopupVisible = false
      $scope.salesPopupTitle = ''

      // Pivot
      $scope.pivotGridOptions = {
        allowSortingBySummary: true,
        allowSorting: true,
        allowFiltering: true,
        allowExpandAll: true,
        showBorders: true,
        fieldChooser: {
          enabled: true
        },
        fieldPanel: {
          showFilterFields: false,
          allowFieldDragging: false,
          visible: true
        },
        export: {
          enabled: true,
          fileName: 'Inversion'
        },
        onInitialized: function (e) {
          e.component.bindChart($scope.chart, {
            dataFieldsDisplayMode: 'splitPanes',
            alternateDataFields: false
          })
        },
        onCellClick: function (e) {
          if (e.area == 'data') {
            var pivotGridDataSource = e.component.getDataSource(),
              rowPathLength = e.cell.rowPath.length,
              rowPathName = e.cell.rowPath[rowPathLength - 1],
              popupTitle = ' Detalle de Ordenes en ' + (rowPathName ? rowPathName : 'Total')

            $scope.drillDownDataSource = pivotGridDataSource.createDrillDownDataSource(e.cell)
            $scope.salesPopupTitle = popupTitle
            $scope.salesPopupVisible = true
          }
        },
        dataSource: {
          fields: [{
            caption: 'Zona',
            width: 120,
            dataField: 'sucursal',
            area: 'row',
            expanded: 'true'
          }, {
            caption: 'TAR',
            dataField: 'unidadOperativa',
            width: 150,
            area: 'row',
            expanded: 'true'
          }, {
            dataField: 'date',
            dataType: 'date',
            area: 'column'
          }, {
            caption: 'Ordenes',
            summaryType: 'count',
            area: 'data'
          }, {
            caption: 'Total',
            dataField: 'amount',
            dataType: 'number',
            summaryType: 'sum',
            format: 'currency',
            area: 'data'
          }, {
            caption: 'Prom.',
            dataField: 'amount',
            dataType: 'number',
            summaryType: 'avg',
            format: 'currency',
            area: 'data'
          }],
          store: result.data
        }
      }

      $scope.dataGridOptions = {
        bindingOptions: {
          dataSource: {
            dataPath: 'drillDownDataSource',
            deep: false
          }
        },
        columns: ['tipo', 'numeroEconomico', 'placas', 'date', 'amount']
      }

      $scope.popupOptions = {
        width: 1000,
        height: 400,
        bindingOptions: {
          title: 'salesPopupTitle',
          visible: 'salesPopupVisible'
        }
      }
    }, function (error) {
      alertFactory.error('Error al cargar el gasto por unidad')
    })
  }
})
