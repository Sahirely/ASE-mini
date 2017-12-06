registrationModule.controller('reporteEstatusOrdenController', function($scope, alertFactory, globalFactory, $rootScope, localStorageService, reporteEstatusOrdenRepository, userFactory   ) {

        $rootScope.modulo = 'reporteEstatusOrden';
        $scope.message = "Buscando...";
        $scope.estatusOrden = []
        
        $scope.getEmptyFilterParams = function() {
            var filterParams = {};
    
            filterParams.tipoOperacion = null;
            filterParams.fechaPagoInicial = null;
            filterParams.fechaPagoFinal = null;
            filterParams.fechaCreacionInicial = null;
            filterParams.fechaCreacionFinal = null;
            filterParams.montoInicial = null;
            filterParams.montoFinal = null;
            filterParams.montoMayorQue = null;
            
            return filterParams;
        }

        $scope.searchByPaymentDates = function(){
            $scope.rptParams = $scope.getEmptyFilterParams();

            $scope.rptParams.tipoOperacion = 1
            $scope.rptParams.fechaPagoInicial = $scope.fechaPagoInicial == "" ? null : $scope.fechaPagoInicial == undefined ? null : $scope.formattedDate($scope.fechaPagoInicial)
            $scope.rptParams.fechaPagoFinal = $scope.fechaPagoFinal == "" ? null : $scope.fechaPagoFinal == undefined ? null : $scope.formattedDate($scope.fechaPagoFinal)

            $scope.getAverage($scope.rptParams);
        }

        $scope.searchByOrderCreationDates = function(){
            $scope.rptParams = $scope.getEmptyFilterParams();

            $scope.rptParams.tipoOperacion = 2
            $scope.rptParams.fechaCreacionInicial = $scope.fechaCreacionInicial == "" ? null : $scope.fechaCreacionInicial == undefined ? null : $scope.fechaCreacionInicial
            $scope.rptParams.fechaCreacionFinal = $scope.fechaCreacionFinal == "" ? null : $scope.fechaCreacionFinal == undefined ? null : $scope.fechaCreacionFinal

            $scope.getAverage($scope.rptParams);
        }

        $scope.searchByDueRange = function(){
            $scope.rptParams = $scope.getEmptyFilterParams();

            $scope.rptParams.tipoOperacion = 3
            $scope.rptParams.montoInicial = $scope.montoInicial == "" ? 0 : $scope.montoInicial == undefined ? 0 : $scope.montoInicial
            $scope.rptParams.montoFinal = $scope.montoFinal == "" ? 0 : $scope.montoFinal == undefined ? 0 : $scope.montoFinal

            $scope.getAverage($scope.rptParams);
        }

        $scope.searchByDueGreaterThan = function(){
            $scope.rptParams = $scope.getEmptyFilterParams();

            $scope.rptParams.tipoOperacion = 4
            $scope.rptParams.montoMayorQue = $scope.montoMayorQue == "" ? 0 : $scope.montoMayorQue == undefined ? 0 : $scope.montoMayorQue

            $scope.getAverage($scope.rptParams);
        }

        $scope.getAverage = function(params){
            $('#loadModal').modal('show')
            reporteEstatusOrdenRepository.getAverage(params)
            .then(
                function successCallback(response){
                    $scope.estatusOrden = response.data
                    $('#loadModal').modal('hide')
                }, function(error){
                    $('#loadModal').modal('hide')
                    alertFactory.error('Ocurrio un error al cargar el promedio.');
                }
            )
        }

        $scope.formattedDate = function(d = new Date) {
            let month = String(d.getMonth() + 1);
            let day = String(d.getDate());
            const year = String(d.getFullYear());
          
           if (month.length < 2) month = '0' + month;
            if (day.length < 2) day = '0' + day;
          
           return `${year}${month}${day}`;
          }

        $scope.gridEstatusOrden = {
            bindingOptions: {
                dataSource: 'estatusOrden'
            },
            "export": {
                enabled: true,
                fileName: "Estatus órdenes",
                allowExportSelectedData: false
              },
            allowSorting: true,
            showRowLines: true,
            rowAlternationEnabled: true,
            showColumnLines: true,
            showBorders: true,
            allowColumnResizing: true,
            columnAutoWidth: true,
            columns: [
                { dataField: "idEstatusOrden", caption: "ID", dataType: "number", filterOperations: ['contains']},
                { dataField: "nombreEstatusOrden", caption:"Estatus Orden", dataType: "string"},
                { dataField: "ordenes", dataType: "number", caption:"Órdenes" },
                { dataField: "dias", dataType: "number", caption:"Días" },
                { dataField: "promedio", dataType: "number"}
                
            ],
            summary:{
                /*totalItems:[{
                    column: "TRABAJADO",
                    summaryType: "sum",
                    valueFormat: "currency",
                    displayFormat: "Total: {0}"
                },{
                    column: "POR FACTURAR",
                    summaryType: "sum",
                    valueFormat: "currency",
                    displayFormat: "Total: {0}"
                },{
                    column: "FACTURADO",
                    summaryType: "sum",
                    valueFormat: "currency",
                    displayFormat: "Total: {0}"
                },{
                    column: "PAGADO",
                    summaryType: "sum",
                    valueFormat: "currency",
                    displayFormat: "Total: {0}"
                },{
                    column: "SELECCION ABONOS",
                    summaryType: "sum",
                    valueFormat: "currency",
                    displayFormat: "Total: {0}"
                },{
                    column: "FACTURAS ABONADAS",
                    summaryType: "sum",
                    valueFormat: "currency",
                    displayFormat: "Total: {0}"
                }]*/
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
                enabled: true,
                pageSize: 25
            },
            pager: {
                visible: true,
                showInfo: true,
                showPageSizeSelector: true,
                infoText: "Página {0} de {1}: ({2} Registros encontrados)",
                allowedPageSizes: [5, 10, 25, 50, 100],
            },
            searchPanel: {
                visible: true,
                width: '400'
            },
    
            onCellClick: function(e) {
                if (e.rowType == "data"){
                        //$scope.salesPopupVisible=true
                        //$scope.Detalle = []
                        //$('#loadModal').modal('show')
                        //$scope.getEstadoCuentaDetalle(e.row.data, e.column.dataField)
                }   
            },
        }

        $scope.init = function() {
            

        }

        



});
