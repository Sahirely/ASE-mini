registrationModule.controller('seguimientoTicketsController', function ($scope, $route, $modal, $rootScope, userFactory, alertFactory, seguimientoTicketsRepository) {
    $rootScope.modulo = 'seguimientoTickets'; // <<-- Para activar en que opción del menú se encuentra

    $scope.init = function () {
        $scope.userData = userFactory.getUserData()
        $scope.getQuejasPorTipoUsuario($scope.userData.idRol)
    }

    $scope.myModel = {}
    $scope.myModel.observacionQueja = ""
    $scope.idQueja = 0
    $scope.files = [];
    $scope.uploadedFiles = []
    $scope.contieneEvidencias = false
    $scope.estatus = ""
    $scope.asunto = ""

    $scope.fileUploadOptions = {
        selectButtonText: "Selecciona...",
        labelText: "o arrasta aquí",
        uploadUrl: "/api/quejas/uploadQueja",
        multiple: true,
        accept: "application/pdf,image/*",
        uploadMode: "useButtons",
        bindingOptions: {
            value: "files"
        },
        onUploaded: function(e) {
            $scope.uploadedFiles.push({ "evidencia": e.request.responseText })
        }
    };

    $scope.LogQueja = []
    $scope.Evidencias = []

    $scope.getQuejasPorTipoUsuario = function (idTipousuario) {
        seguimientoTicketsRepository.getQuejaPorTipoUsuario(idTipousuario).then(
            function successCallback(response) {
                $scope.Quejas = response.data;
                $scope.gridQuejas = {
                    bindingOptions: {
                        dataSource: 'Quejas'
                    },
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
                                element.append("<md-button type='button' class='btn btn-primary' ng-click='dtgQuejas.appScope.getQueja($event)'><i class='fa fa-list' aria-hidden='true'></i></md-button>")
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
                    },

                    onCellClick: function(e) {
                        if (e.rowType == "data")
                            $scope.getQueja(e.row.data)
                    }
                }

            }, function (error) {
                alertFactory.error('Ocurrio un error al obtener los Tickets.');
            }
        )
    }

    $scope.cancelar = function(){
        $scope.myModel.observacionQueja = ""
        $scope.Evidencias = []
        $scope.files = [];
        $scope.uploadedFiles = []
        $scope.LogQueja = []
        $scope.gridLogQueja = {}
        $('#loadModal').modal('hide')
        
    }

    $scope.getQueja = function(data)
    {
        console.log(data)
        //alertFactory.success('Ocurrio unos error al obtener los Tickets.' + data.estatus)
        $('#loadModal').modal('show')
        $scope.idQueja = data.idQueja
        
        seguimientoTicketsRepository.getLogQuejaPorId(data.idQueja).then(
            function successCallback(response) {
                //$scope.LogQueja = {}
                
                $scope.LogQueja = response.data
                $scope.estatus = data.estatus
                $scope.asunto = data.asunto
                
                $scope.gridLogQueja = {
                    bindingOptions:{
                        dataSource: 'LogQueja'
                    },
                    
                    rowAlternationEnabled: true,
                    showColumnLines: false,
                    showBorders: true,
                    columnAutoWidth: true,
                    allowSorting: false,

                    columns: [
                        { dataField: "nombreCompleto", caption:"Nombre", dataType: "int" },
                        { dataField: "fecha", dataType: "date" },
                        { dataField: "Observaciones", dataType: "string" }
                    ]
                }
                
                //$scope.gridLogQueja.refresh()
                
                seguimientoTicketsRepository.getEvidenciaQuejaPorId(data.idQueja).then(
                    function successCallback(response){
                        $scope.Evidencias = []
                        $scope.estatus = data.estatus
                        $scope.asunto = data.asunto
                        response.data.forEach(function(element){
                            $scope.Evidencias.push(
                                { 'idQuejaEvidencia': element.idQuejaEvidencia,
                                  'idQueja': element.idQueja,
                                  'evidencia': element.evidencia,
                                  'rootPath': $rootScope.docServer + '/queja/' + element.idQueja + '/'
                                }
                            )
                        });
                    }, function (error) {
                        alertFactory.error('Ocurrio un error al obtener los Tickets.');
                    }
                )
            }, function (error) {
                alertFactory.error('Ocurrio un error al obtener los Tickets.');
            }
        )
    }  
    
    $scope.saveLogQueja = function(){
        
        $scope.contieneEvidencias = $scope.uploadedFiles.length == 0 ? false : true;

        seguimientoTicketsRepository.saveLogQueja(
            $scope.idQueja,
            $scope.userData.idUsuario,
            $scope.myModel.observacionQueja,
            JSON.stringify($scope.uploadedFiles),
            $scope.contieneEvidencias == true ? 1 : 0,
            'EN PROCESO'
        ).then(
            function successCallback(response){
                alertFactory.success('Queja actualizada.');
                $scope.getQuejasPorTipoUsuario($scope.userData.idRol)
                $scope.myModel.observacionQueja = ""
                $scope.Evidencias = []
                $scope.files = [];
                $scope.uploadedFiles = []
                $scope.LogQueja = []
                $scope.gridLogQueja = {}
                $('#loadModal').modal('hide')
            },
            function(error){
                alertFactory.error('Ocurrio un error al guardar el Ticket.');
            }
        );
    }

    $scope.cerrarTicket = function(){
        seguimientoTicketsRepository.cerrarTicket(
            $scope.idQueja,
            $scope.userData.idUsuario,
            'Ha cerrado el ticket',
            'FINALIZADA'
        ).then(
            function successCallback(response){
                alertFactory.success('Ticket cerrado.');
                $scope.getQuejasPorTipoUsuario($scope.userData.idRol)
                $scope.myModel.observacionQueja = ""
                $scope.Evidencias = []
                $scope.files = [];
                $scope.uploadedFiles = []
                $scope.LogQueja = []
                $scope.gridLogQueja = {}
                $('#loadModal').modal('hide')
             
            },
            function(error){
                alertFactory.error('Ocurrio un error al cerrar el Ticket.');
            }
        );
    }
})