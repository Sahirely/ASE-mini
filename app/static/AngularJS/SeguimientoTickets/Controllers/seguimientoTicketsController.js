registrationModule.controller('seguimientoTicketsController', function ($scope, $route, $modal, $rootScope, userFactory, alertFactory, seguimientoTicketsRepository) {
    $rootScope.modulo = 'seguimientoTickets'; // <<-- Para activar en que opción del menú se encuentra

    $scope.init = function () {
        $scope.userData = userFactory.getUserData()
        $scope.getQuejasPorTipoUsuario($scope.userData.idRol)
    }

    $scope.getQuejasPorTipoUsuario = function (idTipousuario) {
        seguimientoTicketsRepository.getQuejaPorTipoUsuario(idTipousuario).then(
            function successCallback(response) {
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
                            dataField: "estatus",
                            dataType: "string",
                            cellTemplate: function (element, info) {
                                if (info.text == "GENERADA") {
                                    element.append("<span class='label label-default'><i class='fa fa-check'></i> " + info.text + "</span></td>");
                                }
                                if (info.text == "EN PROCESO") {
                                    element.append("<span class='label label-warning'><i class='fa fa-check'></i> " + info.text + "</span></td>");
                                }
                                if (info.text == "FINALIZADA") {
                                    element.append("<span class='label label-success'><i class='fa fa-check'></i> " + info.text + "</span></td>");
                                }
                            }
                        },
                        { dataField: "tipoQueja", dataType: "string" },
                        { dataField: "asunto", dataType: "string" },
                        { dataField: "fechaInicio", dataType: "date" },
                        { dataField: "fechaFin", dataType: "date" },
                        { dataField: "mensaje", dataType: "string" },
                        {
                            cellTemplate: function (element, info) {
                                element.append("<button type='button' class='btn btn-primary' ng-click='getQueja()'><i class='fa fa-list' aria-hidden='true'></i></button>")
                            }
                        }
                    ],
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
                        pageSize: 50
                    },
                    pager: {
                        visible: true,
                        showInfo: true,
                        showPageSizeSelector: true,
                        infoText: "Página {0} de {1}: ({2} Registros encontrados)",
                        allowedPageSizes: true
                    },
                    searchPanel: {
                        visible: true,
                        width: '400'
                    }
                }

            }, function (error) {
                alertFactory.error('Ocurrio un error al obtener los Tickets.');
            }
        )
    }

    $scope.getQueja = function()
    {
        alertFactory.success('Ocurrio un error al obtener los Tickets.');
    }
})