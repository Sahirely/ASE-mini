registrationModule.controller('antiguedadIngresoController', function ($scope, $modal, $route, $rootScope, userFactory, $location, localStorageService, alertFactory, globalFactory, analisisFlotillaRepository) {
  $rootScope.modulo = 'aprobacionProvision'

  $scope.init = function () {
    userFactory.ValidaSesion()
    $scope.userData = userFactory.getUserData()
  }

  var orders = [{
    'ID': 1,
    'sucursal': 'Oaxaca',
    'unidadOperativa': 'Istmo',
    'total': 5543,
    'c30': 43,
    'c60': 23,
    'c90': 43,
    'c120': 65
  }, {
    'ID': 2,
    'sucursal': 'Oaxaca',
    'unidadOperativa': 'Mixteca',
    'total': 3523,
    'c30': 34,
    'c60': 54,
    'c90': 12,
    'c120': 52
  }, {
    'ID': 3,
    'sucursal': 'Veracruz',
    'unidadOperativa': 'Acayucan',
    'total': 1232,
    'c30': 32,
    'c60': 65,
    'c90': 92,
    'c120': 23
  }]

  $scope.filterRow = {
    visible: false,
    applyFilter: 'auto'
  }

  $scope.headerFilter = {
    visible: true
  }

  $scope.dataGridOptions = {
    dataSource: orders,
    bindingOptions: {
      filterRow: 'filterRow',
      headerFilter: 'headerFilter'
    },
    searchPanel: {
      visible: true,
      width: 240,
      placeholder: 'Buscar...'
    },
    selection: {
      mode: 'single'
    },
    columns: [{
      dataField: 'sucursal',
      caption: 'Sucursal'
    }, {
      dataField: 'unidadOperativa',
      caption: 'Unidad Operativa'
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

  var dataSource = [{
    country: '30',
    medals: 110
  }, {
    country: '60',
    medals: 100
  }, {
    country: '90',
    medals: 72
  }, {
    country: '120',
    medals: 47
  }]

  $scope.chartOptions = {
    palette: 'ocean',
    dataSource: dataSource,
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
      argumentField: 'country',
      valueField: 'medals',
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
          return arg.valueText + ' (' + arg.argument + ' días)'
        }
      }
    }]
  }
})
