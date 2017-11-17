registrationModule.controller('dispersionController', function($scope, alertFactory, $rootScope, globalFactory, localStorageService, reporteRepository, dispersionRepository, dashBoardRepository, userFactory) {
    $rootScope.modulo = 'proveedorDispersion';
    $scope.message = "Buscando...";
    $scope.Dispersion = []
    $scope.salesPopupVisible = false
    $scope.salesPopupTitle = "Detalle de Dispersion"

    $scope.gridDispersion = {
        bindingOptions: {
            dataSource: 'Dispersion'
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
        columnAutoWidth: true,
        columns: [
            { dataField: "idProveedor", caption: "ID", dataType: "number", filterOperations: ['contains']},
            { dataField: "Proveedor", dataType: "string"},
            { dataField: "Costo", dataType: "number", format:"currency" },
            { dataField: "PorcentajeCosto", dataType: "number" },
            { dataField: "Venta", dataType: "number" , format:"currency" },
            { dataField: "PorcentajeVenta", dataType: "number" },
            { dataField: "Cantidad", dataType: "number" },
            { dataField: "PorcentajeServicio", dataType: "number" }
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
                if(e.column.dataField != "razonSocial" && e.column.dataField != "idProveedor" && e.value != 0){
                    //$scope.salesPopupVisible=true
                    //$scope.Detalle = []
                    //$('#loadModal').modal('show')
                    //$scope.getEstadoCuentaDetalle(e.row.data, e.column.dataField)
                }
            }   
        },
    }

    $scope.init = function(){
        $scope.userData = userFactory.getUserData();
    }

    $scope.getEmptyFilterParams = function() {
        var filterParams = {};

        filterParams.fechaInicial = null;
        filterParams.fechaFinal = null;
        
        return filterParams;
    }

    $scope.searchByFilters = function(){
        $scope.rptParams = $scope.getEmptyFilterParams();
        $scope.rptParams.fechaInicial = $scope.fechaInicio == "" ? null : $scope.fechaInicio === undefined ? null : $scope.fechaInicio;
        $scope.rptParams.fechaFinal = $scope.fechaFin == "" ? null : $scope.fechaFin === undefined ? null : $scope.fechaFin;

        $scope.getDispersion($scope.rptParams);
    }

    $scope.search = function(){
        $scope.rptParams = $scope.getEmptyFilterParams();

        $scope.getDispersion($scope.rptParams);
    }

    $scope.getDispersion = function(params){
        dispersionRepository.getDispersion(
            params
        ).then(
            function successCallback(response){
                $scope.Dispersion = response.data
                $('#loadModal').modal('hide')
            }, function(error){
                $('#loadModal').modal('hide')
                alertFactory.error('Ocurrio un error al cargar la Dispersion.');
            }
        )
    }


    $scope.popupOptions = {
        width: 1000,
        height: 650,
        
        bindingOptions: {          
            title: 'salesPopupTitle',
            visible: 'salesPopupVisible'
        },
    }

});