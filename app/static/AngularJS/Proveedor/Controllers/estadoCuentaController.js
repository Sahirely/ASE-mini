    registrationModule.controller('estadoCuentaController', function($scope, alertFactory, $rootScope, globalFactory, localStorageService, reporteRepository, estadoCuentaRepository, dashBoardRepository, userFactory) {
        //*****************************************************************************************************************************//
        // $rootScope.modulo <<-- Para activar en que opción del menú se encuentra
        //*****************************************************************************************************************************//
        $rootScope.modulo = 'estadoCuenta';
        $scope.message = "Buscando...";
        $scope.tipofecha = "";
        $scope.ordenes = [];      
        $scope.sumatoriaCosto = 0;
        $scope.sumatoriaVenta = 0;
        $scope.Detalle = []
        $scope.EstadoCuenta = []


        $scope.init = function(){
            $scope.userData = userFactory.getUserData();
            userFactory.ValidaSesion();

            $scope.getEstadoCuenta();
        }

        $scope.getEstadoCuenta = function(){
            estadoCuentaRepository.getEstadoCuenta(
                $scope.userData.idOperacion
            ).then(
                function successCallback(response){
                    $scope.EstadoCuenta = response.data

                    $scope.gridEstadoGeneral = {
                        bindingOptions: {
                            dataSource: 'EstadoCuenta'
                        },
                        allowSorting: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        showColumnLines: true,
                        showBorders: true,
                        allowColumnResizing: true,
                        columnAutoWidth: true,
                        columns: [
                            { dataField: "idProveedor", caption: "ID", dataType: "number", filterOperations: ['contains']},
                            { dataField: "razonSocial", caption:"Razón Social", dataType: "string" },
                            { dataField: "TRABAJADO", dataType: "number", format:"currency" },
                            { dataField: "POR FACTURAR", dataType: "number", format:"currency" },
                            { dataField: "FACTURADO", dataType: "number", format:"currency" },
                            { dataField: "PAGADO", dataType: "number", format:"currency" },
                            { dataField: "SELECCION ABONOS", dataType: "number", format:"currency" },
                            { dataField: "FACTURAS ABONADAS", dataType: "number", format:"currency" }
                        ],
                        summary:{
                            totalItems:[{
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
                            }]
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        grouping: {
                            contextMenuEnabled: true,
                            autoExpandAll: false
                        },
                        groupPanel: {
                            visible: true,
                            emptyPanelText: "Arrastra aqui la columna que deseas agrupar"
                        },
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
                                if(e.column.dataField != "razonSocial" && e.column.dataField != "idProveedor"){
                                    $scope.salesPopupVisible=true
                                    $scope.Detalle = []
                                    $scope.getEstadoCuentaDetalle(e.row.data, e.column.dataField)
                                }
                            }   
                        },
                    }
                }, function(error){
                    alertFactory.error('Ocurrio un error al cargar estado de cuenta.');
                }
            )
        };


        $scope.getEstadoCuentaDetalle = function(data, columna){
            estadoCuentaRepository.getEstadoCuentaDetalle(
                $scope.userData.idOperacion,
                data.idProveedor,
                columna
            ).then(
                function successCallback(response){
                    $scope.Detalle = response.data
                    $scope.gridDetalle = {
                        bindingOptions: {
                            dataSource: 'Detalle'
                        },
                        "export": {
                          enabled: true,
                          fileName: "EstadoCuentaProveedor",
                          allowExportSelectedData: false
                        },

                        width: 'auto',
                        height: 550,

                        allowSorting: true,
                        showRowLines: true,
                        rowAlternationEnabled: true,
                        showColumnLines: true,
                        showBorders: true,
                        allowColumnResizing: true,
                        columnAutoWidth: true,
                        columns: [
                            { dataField: "razonSocial", caption:"Razón Social", dataType: "string" },
                            { dataField: "tipoUnidad", dataType: "string" },
                            { dataField: "numeroEconomico", dataType: "number", filterOperations: ['contains'] },
                            { dataField: "placas", dataType: "string" },
                            { dataField: "numeroOrden", dataType: "string" },
                            { dataField: "fechaCreacionOden", dataType: "date" },
                            { dataField: "total", dataType: "number", format:"currency" },
                            { dataField: "nombreEstatusOrden", dataType: "string" }
                        ],
                        summary:{
                            totalItems:[{
                                column: "total",
                                summaryType: "sum",
                                valueFormat: "currency",
                                displayFormat: "{0}"
                            }]
                        },
                        filterRow: {
                            visible: true,
                            applyFilter: "auto"
                        },
                        grouping: {
                            contextMenuEnabled: true,
                            autoExpandAll: false
                        },
                        groupPanel: {
                            visible: true,
                            emptyPanelText: "Arrastra aqui la columna que deseas agrupar"
                        },
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
                    }

                }, function(error){
                    alertFactory.error('Ocurrió un error al cargar el detalle.');
                }
            )
        };

        
        $scope.popupOptions = {
            width: 1000,
            height: 650,
            
            bindingOptions: {          
                title: 'salesPopupTitle',
                visible: 'salesPopupVisible'
            },
        }
    });