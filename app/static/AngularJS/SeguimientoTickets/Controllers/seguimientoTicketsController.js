registrationModule.controller('seguimientoTicketsController', function ($scope, $route, $modal, $rootScope, userFactory, alertFactory, seguimientoTicketsRepository) {
    $rootScope.modulo = 'seguimientoTickets'; // <<-- Para activar en que opción del menú se encuentra

    $scope.init = function () {
        $scope.userData = userFactory.getUserData()
        $scope.getQuejasPorTipoUsuario($scope.userData.idRol)
        $scope.getEstatusQueja()
        $scope.getTags()
        $scope.getTipoQuejaPorUsuario()
    }

    $scope.myModel = {}
    $scope.usersTag = []
    $scope.myModel.observacionQueja = ""
    $scope.idQueja = 0
    $scope.files = [];
    $scope.uploadedFiles = []
    $scope.contieneEvidencias = false
    $scope.estatus = ""
    $scope.estatusqueja = {}
    $scope.asunto = ""
    $scope.salesPopupVisible=false
    $scope.seguimientoQuejas = {}
    $scope.items = []
    $scope.itemsSelected = []
    $scope.itemsBaseSelected = []
    $scope.jsonItem = []
    $scope.QuejasAux = []
    $scope.Quejas = []
    $scope.tagAux = []
    $scope.users = []
    $scope.usersSelected = []
    

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

    $scope.getTags = function(){
        seguimientoTicketsRepository.getTags().then(
            function successCallback(response){
                response.data.forEach(function (element){
                    $scope.items.push(element.Descripcion)
                });

                $scope.tagBox = {
                    simple: {
                        bindingOptions: {
                            items: 'items',
                            value: 'itemsSelected'
                        },
                        hideSelectedItems: true,
                        searchEnabled: true
                    },

                    user: {
                        bindingOptions:{
                            items: 'users',
                            value: 'usersSelected'
                        },
                        hideSelectedItems: true,
                        searchEnabled: true
                    },

                    base: {
                        bindingOptions: {
                            items: 'items',
                            value: 'itemsBaseSelected'
                        },
                        hideSelectedItems: true,
                        searchEnabled: true,
                        onValueChanged: function(args){
                            if(args.value.length > 0){
                                $scope.Quejas = []
                                $scope.QuejasAux = $scope.seguimientoQuejas
                                args.value.forEach(function(element){
                                    for(let tipo of $scope.QuejasAux.filter(X => X.tags.find(Y => Y == element))){
                                        if($scope.Quejas.find(X => X.idQueja == tipo.idQueja) == undefined){
                                            $scope.Quejas.push(tipo)
                                        }
                                    }
                                
                                })                                
                                
                            }else{
                                $scope.Quejas = $scope.seguimientoQuejas
                            }     
                        }
                    }
                }
            },function(error){
                alertFactory.error('Ocurrio un error al obtener los tags.');
            }
        )
    }

    $scope.getTipoQuejaPorUsuario = function(){
        seguimientoTicketsRepository.getTipoQuejaPorUsuario().then(
            function successCallback(response){
                $scope.usersTag = response.data
            }, function (error){
                alertFactory.error("Ocurrió un error al obtener los usuarios.")
            }
        )
    }

    $scope.getEstatusQueja = function(){
        seguimientoTicketsRepository.getEstatusQueja().then(
            function successCallback(response){
                $scope.estatusqueja = response.data
            }, function (error) {
                alertFactory.error('Ocurrio un error al obtener los estatus.');
            }
        )
    }

    $scope.getQuejasPorTipoUsuario = function (idTipousuario) {
        seguimientoTicketsRepository.getQuejaSeguimientoUsuario($scope.userData.idUsuario).then(
            function successCallback(response) {
                $scope.QuejasAux = response.data
                seguimientoTicketsRepository.getTagPorQueja().then(
                    function successCallback(response){
                        $scope.tagsAux = response.data
                        seguimientoTicketsRepository.getTipoQuejaPorUsuario().then(
                            function successCallback(response){
                                $scope.quejaUsers = response.data
                                seguimientoTicketsRepository.getQuejaResponsable().then(
                                    function successCallback(response){
                                        $scope.quejaUsersSelected = response.data

                                        $scope.tagAux = []
                                        $scope.QuejasAux.forEach(function(element){
                                            $scope.tagAux.push({
                                                'idQueja': element.idQueja,
                                                'estatus': element.estatus,
                                                'estatusqueja': element.estatusqueja,
                                                'nombreCompleto': element.nombreCompleto,
                                                'idCatalogoTipoQueja': element.idCatalogoTipoQueja,
                                                'tipoQueja': element.tipoQueja,
                                                'asunto': element.asunto,
                                                'fechaInicio': element.fechaInicio,
                                                'fechaRespuesta': element.fechaRespuesta,
                                                'mensaje': element.mensaje,
                                                'tags': [],
                                                'users': [],
                                                'usersSelected': []
                                            })
                                            
                                            for(let tipo of $scope.tagsAux.filter(X => X.idQueja == element.idQueja)){
                                                $scope.tagAux[$scope.tagAux.length -1].tags.push(tipo.Descripcion)
                                            }
        
                                            for(let tipo of $scope.quejaUsers.filter(X => X.idCatalogoTipoQueja == element.idCatalogoTipoQueja)){
                                                $scope.tagAux[$scope.tagAux.length - 1].users.push(tipo.nombreCompleto)
                                            }
                                            
                                            for(let tipo of $scope.quejaUsersSelected.filter(X => X.idQueja == element.idQueja)){
                                                $scope.tagAux[$scope.tagAux.length - 1].usersSelected.push(tipo.nombreCompleto)
                                            }
                                        })
                                        $scope.seguimientoQuejas = $scope.tagAux
                
                                        $scope.Quejas = $scope.seguimientoQuejas
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
                                                { dataField: "idQueja", dataType: "number", caption: "ID"},
                                                {
                                                    dataField: "estatusqueja",
                                                    dataType: "string",
                                                    cellTemplate: function (element, info) {
                                                        if (info.text == "GENERADO") {
                                                            element.append("<span class='label label-default'><i class='fa fa-check'></i> " + info.text + "</span></td>");
                                                        }
                                                        if (info.text == "EN PROCESO") {
                                                            element.append("<span class='label label-warning'><i class='fa fa-check'></i> " + info.text + "</span></td>");
                                                        }
                                                        if(info.text == "VALIDACION"){
                                                            element.append("<span class='label label-danger'><i class='fa fa-check'></i> " + info.text + "</span></td>");
                                                        }
                                                        if (info.text == "FINALIZADO") {
                                                            element.append("<span class='label label-success'><i class='fa fa-check'></i> " + info.text + "</span></td>");
                                                        }
                                                    }
                                                },
                                                
                                                { dataField: "nombreCompleto", caption:"Usuario Solicitante", dataType: "string" },
                                                { dataField: "tipoQueja", dataType: "string" },
                                                { dataField: "asunto", dataType: "string" },
                                                { dataField: "fechaInicio", dataType: "date" },
                                                { dataField: "fechaRespuesta", caption:"Fecha Última Respuesta", dataType: "date" },
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
                                                if (e.rowType == "data"){
                                                    $scope.salesPopupVisible=true
                                                    $scope.getQueja(e.row.data)
                                                }
                                                    
                                            }
                                        }
                                    }
                                )
                                
                            }
                        )
                        
                    }
                )
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
        $scope.salesPopupVisible = false
    }

    $scope.SeleccionarEstatus = function (data){
        $scope.selectedEstatusId = data.idEstatusQueja
        $scope.selectedEstatus = data.estatusQueja
    }

    $scope.getQueja = function(data)
    {
        $scope.idQueja = data.idQueja
        
        seguimientoTicketsRepository.getLogQuejaPorId(data.idQueja).then(
            function successCallback(response) {
                //$scope.LogQueja = {}
                $scope.salesPopupTitle = 'Detalle de Ticket: ' + data.asunto
                $scope.LogQueja = response.data
                $scope.estatus = data.estatus
                $scope.selectedEstatus = data.estatusqueja
                $scope.selectedEstatusId = data.estatus
                $scope.asunto = data.asunto

                $scope.users = []
                for(let tipo of $scope.usersTag.filter(X => X.idCatalogoTipoQueja == data.idCatalogoTipoQueja)){
                    $scope.users.push(tipo.nombreCompleto)
                }

                $scope.usersSelected = []
                for(let tipo of $scope.Quejas.filter(X => X.idQueja == data.idQueja)){
                    for(let tag of tipo.usersSelected){
                        $scope.usersSelected.push(tag)
                    }
                }

                $scope.itemsSelected = []
                let tipo = $scope.Quejas.find(X => X.idQueja == data.idQueja)
                for(let tag of tipo.tags){
                    $scope.itemsSelected.push(tag)
                }  
                
                $scope.gridLogQueja = {
                    rowAlternationEnabled: true,
                    showColumnLines: false,
                    showBorders: true,
                    columnAutoWidth: true,
                    allowSorting: false,
                    

                    columns: [
                        { dataField: "nombreCompleto", caption:"Nombre", dataType: "string"},
                        { dataField: "fecha", dataType: "date"},
                        { dataField: "Observaciones", dataType: "string"}
                    ],

                    bindingOptions:{
                        dataSource: 'LogQueja'
                    }
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
        if ($scope.myModel.observacionQueja == "") {
            alertFactory.error("Es necesario agregar una observacion.")
            return;
        }

        if($scope.selectedEstatusId == 4){
            $scope.cerrarTicket()
        }else{
            $scope.jsonItem = []
            $scope.itemsSelected.forEach(function(element){
                $scope.jsonItem.push({'tag': element})
            })

            $scope.jsonUser = []
            $scope.usersSelected.forEach(function(element){
                $scope.jsonUser.push({'user': element})
            })
            
            $scope.contieneEvidencias = $scope.uploadedFiles.length == 0 ? false : true;
            

            seguimientoTicketsRepository.saveLogQueja(
                $scope.idQueja,
                $scope.userData.idUsuario,
                $scope.myModel.observacionQueja,
                JSON.stringify($scope.uploadedFiles),
                $scope.contieneEvidencias == true ? 1 : 0,
                $scope.selectedEstatusId,
                1,
                JSON.stringify($scope.jsonItem),
                1,
                JSON.stringify($scope.jsonUser)
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
                    $scope.salesPopupVisible = false
                },
                function(error){
                    alertFactory.error('Ocurrio un error al guardar el Ticket.');
                }
            );  
        }
    }

    $scope.popupOptions = {
        width: 1000,
        height: 500,
        bindingOptions: {          
            title: 'salesPopupTitle',
            visible: 'salesPopupVisible'
        }
    }



    $scope.cerrarTicket = function(){
        if ($scope.myModel.observacionQueja == "") {
            alertFactory.error("Es necesario agregar una observacion.")
            return;
        }

        swal({
            title: 'Cerrar Ticket',
            text: "¿Estás seguro de cerrar el ticket?" ,
            type: 'success',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cerrar ticket',
            cancelButtonText: 'Cerrar esta ventana'
        }, function(isConfirm) {
            if (isConfirm) {
                seguimientoTicketsRepository.cerrarTicket(
                    $scope.idQueja,
                    $scope.userData.idUsuario,
                    $scope.myModel.observacionQueja,
                    $scope.selectedEstatusId
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
                        $scope.salesPopupVisible = false
                    },
                    function(error){
                        alertFactory.error('Ocurrio un error al cerrar el Ticket.');
                    }
                );
            }
        })
    }
})