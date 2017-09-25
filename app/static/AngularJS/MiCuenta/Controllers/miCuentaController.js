registrationModule.controller('miCuentaController', function ($scope, $route, $modal, $rootScope, userFactory, nuevoMemorandumRepository, alertFactory, miCuentaRepository) {
    $rootScope.modulo = 'miCuenta'; // <<-- Para activar en que opción del menú se encuentra

    var orders = [{
        "ID": 1,
        "OrderNumber": 35703,
        "OrderDate": "2014/04/10",
        "SaleAmount": 11800,
        "Terms": "15 Days",
        "CustomerStoreState": "California",
        "CustomerStoreCity": "Los Angeles",
        "Employee": "Harv Mudd"
    }]




    $scope.Memorandums = []
    $scope.asuntoQueja = ""
    $scope.mensajeQueja = ""
    $scope.Quejas = []
    $scope.catalogoTipoQuejaUsuario = []

    // DEVEX COMPONENTS

    //DROP BOX QUEJAS
    $scope.selectedQueja = ""
    $scope.uploadedEvidenciasQueja = []

    $scope.init = function () {
        $scope.userData = userFactory.getUserData()
        $scope.getMemorandums()
        $scope.getQuejas()
        $scope.getTipoQuejaUsuario($scope.userData.idRol)
    }

    $scope.getMemorandums = function () {
        nuevoMemorandumRepository.getMemoUsuario($scope.userData.idUsuario)
            .then(function successCallback(response) {
                response.data.forEach(function (element) {

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
                                    "evidencia": element.evidencia
                                }
                            ]
                        })
                    }
                    else {
                        $scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum).evidencias.push({
                            "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                            "idEvidencia": element.idEvidencia,
                            "evidencia": element.evidencia
                        })
                    }
                }, this);
            })

    }

    $scope.getQuejas = function () {
        nuevoMemorandumRepository.getQuejas()
            .then(function successCallback(response) {
                $scope.Quejas = response.data;
                $scope.gridQuejas = {
                    dataSource: $scope.Quejas,
                    allowSorting: true,
                    showRowLines: true,
                    rowAlternationEnabled: true,
                    showColumnLines: false,
                    showBorders: true,
                    allowColumnResizing: true,
                    columnAutoWidth: true,
                    columns: [
                        {
                            width: 50, cellTemplate: function (container, options) {
                                container.append("<button type='button' class='btn btn-sm btn-default'><span class='fa fa-search'></span></button>")
                            }
                        },
                        {
                            dataField: "estatus", dataType: "string", cellTemplate: function (element, info) {
                                if (info.text == "GENERADA") {
                                    element.append("<span class='label label-warning'><i class='fa fa-check'></i>" + info.text + "</span></td>");
                                }
                            }
                        },
                        { dataField: "tipoQueja", dataType: "string" },
                        { dataField: "asunto", dataType: "string" },
                        { dataField: "fechaInicio", dataType: "date" },
                        { dataField: "fechaFin", dataType: "date" },
                        { dataField: "mensaje", dataType: "string" }
                    ],
                    filterRow:
                    {
                        visible: true,
                        applyFilter: "auto"
                    },
                    grouping:
                    {
                        contextMenuEnabled: true,
                        autoExpandAll: false
                    },
                    groupPanel: {
                        visible: true,
                        emptyPanelText: "Arrastra aqui la columna que deseas agrupar"
                    },
                    paging: {
                        enabled: true,
                        pageSize: 50
                    },
                    pager:
                    {
                        visible: true,
                        showInfo: true,
                        showPageSizeSelector: true,
                        infoText: "Página {0} de {1}: ({2} Registros encontrados)",
                        allowedPageSizes: true
                    },
                    searchPanel: {
                        visible: true,
                        width: '400'
                    },
                    onCellClick: function (e) {
                        if (e.rowType == "data")
                            $scope.showQuejaInfo(e.row.data)
                    }

                }

            });
    }

    $scope.getTipoQuejaUsuario = function (idTipoUsuario) {
        miCuentaRepository.getTipoQuejaUsuario(idTipoUsuario)
            .then(function successCallback(response) {
                $scope.catalogoTipoQuejaUsuario = response.data;
                //CONFIGURAMOS
                //DROP BOX QUEJAS
                $scope.selectBoxQuejas =
                    {
                        dataSource: new DevExpress.data.DataSource({
                            store: $scope.catalogoTipoQuejaUsuario
                        }),
                        valueExpr: "idCatalogoTipoQueja",
                        displayExpr: "tipoQueja",
                        placeholder: 'Selecciona el tipo de Queja',
                        searchEnabled: true,
                        searchExpr: ['tipoQueja'],
                        onValueChanged: function (e) {
                            $scope.selectedQueja = e.value;
                        }
                    }
            });
    }

    $scope.saveQueja = function () {

        if ($scope.selectedQueja == "" || $scope.asuntoQueja == "" || $scope.mensajeQueja == "") {
            alertFactory.error("Todos los datos son obligatorios para generar una queja.")
            return;
        }

        nuevoMemorandumRepository.saveQueja($scope.userData.idUsuario, $scope.selectedQueja, $scope.asuntoQueja, $scope.mensajeQueja)
            .then(function successCallback(response) {
                $scope.selectedQueja = ""
                $scope.asuntoQueja = ""
                $scope.mensajeQueja = ""
                alertFactory.success('Queja generada de forma correcta.');
                $scope.getQuejas()
            });
    }

    $scope.showQuejaInfo = function (data) {
        //OBTENEMOS LAS EVIDENCIAS Y EL HISTORICO DE LA QUEJA
        $scope.QuejaInfo = data
        $("#mdQueja").modal('show')
    }
});