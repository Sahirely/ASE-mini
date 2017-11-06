registrationModule.controller('miCuentaController', function ($scope, $route, $modal, $rootScope, userFactory, nuevoMemorandumRepository, alertFactory, miCuentaRepository, seguimientoTicketsRepository) {
    $rootScope.modulo = 'miCuenta'; // <<-- Para activar en que opción del menú se encuentra

    // FILE UPLOAD
    $scope.files = [];
    $scope.uploadedFiles = []

    $scope.filesDetalle = [];
    $scope.uploadedFilesDetalle = []

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
        onUploaded: function (e) {
            $scope.uploadedFiles.push({ "evidencia": e.request.responseText })
        }
    };

    $scope.fileUploadOptionsDetalle = {
        selectButtonText: "Selecciona...",
        labelText: "o arrasta aquí",
        uploadUrl: "/api/quejas/uploadQueja",
        multiple: true,
        accept: "application/pdf,image/*",
        uploadMode: "useButtons",
        bindingOptions: {
            value: "filesDetalle"
        },
        onUploaded: function(e) {
            $scope.uploadedFilesDetalle.push({ "evidencia": e.request.responseText })
        }
    };

    $scope.myModel = {}
    $scope.myModel.observacionQueja = ""
    $scope.LogQueja = []
    $scope.Evidencias = []

    $scope.itemsSelected = []
    $scope.Memorandums = []
    $scope.MemorandumsSinLeerTotal = 0
    $scope.MemorandumsLeidosTotal = 0
    $scope.asuntoQueja = ""
    $scope.mensajeQueja = ""
    $scope.Quejas = []
    $scope.contieneEvidencias = false
    $scope.catalogoTipoQuejaUsuario = []

    // DEVEX COMPONENTS

    //DROP BOX QUEJAS
    $scope.selectedQueja = ""
    $scope.uploadedEvidenciasQueja = []

    $scope.selectedEstatusId
    $scope.selectedEstatus
    $scope.estatus = ""

    $scope.init = function () {
        $scope.userData = userFactory.getUserData()
        $scope.getMemorandums()
        $scope.getQuejas($scope.userData.idUsuario)
        $scope.getTipoQuejaUsuario($scope.userData.idRol)
        $scope.getMeetings($scope.userData.idUsuario)
        $scope.getEstatusQueja()
    }

    $scope.SeleccionarEstatus = function (data){
        $scope.selectedEstatusId = data.idEstatusQueja
        $scope.selectedEstatus = data.estatusQueja
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

    $scope.getMemorandums = function () {
        nuevoMemorandumRepository.getMemoUsuario($scope.userData.idUsuario)
            .then(function successCallback(response) {
                $scope.Memorandums = []
                $scope.MemorandumsLeidosTotal = 0
                $scope.MemorandumsSinLeerTotal = 0
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
                            evidencias: [{
                                "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                                "idEvidencia": element.idEvidencia,
                                "evidencia": element.evidencia
                            }]
                        })
                    } else {
                        $scope.Memorandums.find(X => X.idMemorandum == element.idMemorandum).evidencias.push({
                            "rootPath": $rootScope.docServer + '/memorandum/' + element.idMemorandum + '/',
                            "idEvidencia": element.idEvidencia,
                            "evidencia": element.evidencia
                        })
                    }
                }, this);

                $scope.MemorandumsLeidosTotal = $scope.Memorandums.filter(X => X.leido == 1) == undefined ? 0 : $scope.Memorandums.filter(X => X.leido == 1).length
                $scope.MemorandumsSinLeerTotal = $scope.Memorandums.length - $scope.MemorandumsLeidosTotal
            })

    }

    $scope.getQuejas = function (idUsuario) {
        miCuentaRepository.getQuejaPorUsuario(idUsuario)
            .then(function successCallback(response) {
                $scope.Quejas = response.data;
                $scope.gridQuejas = {
                    bindingOptions:{
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
                        // {
                        //     width: 50,
                        //     cellTemplate: function(container, options) {
                        //         container.append("<button type='button' class='btn btn-sm btn-default'><span class='fa fa-search'></span></button>")
                        //     }
                        // },
                        { dataField: "idQueja", caption:"ID", dataType: "number", displayName: "Número de Ticket" },
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
                        { dataField: "tipoQueja", dataType: "string" },
                        { dataField: "asunto", dataType: "string" },
                        { dataField: "fechaInicio", dataType: "date" },
                        { dataField: "fechaFin", dataType: "date" },
                        { dataField: "mensaje", dataType: "string" }
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
            });
    }

    $scope.getTipoQuejaUsuario = function (idTipoUsuario) {
        miCuentaRepository.getTipoQuejaUsuario(idTipoUsuario)
            .then(function successCallback(response) {
                $scope.catalogoTipoQuejaUsuario = response.data;
                //CONFIGURAMOS
                //DROP BOX QUEJAS
                $scope.selectBoxQuejas = {
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

    $scope.getMeetings = function (idUsuario) {
        miCuentaRepository.getMeetingPorUsuario(idUsuario)
            .then(function successCallback(response) {
                if (response.data.length>0)
                {
                    $scope.Meetings = response.data[0];
                    swal({
                        title: 'Videoconferencia: ' + $scope.Meetings.asunto,
                        text: "Has sido invitado a una videoconferencia, puede unirte a través de la siguiente URL: https://www.gotomeeting.com/es-mx/meeting/join-meeting" + " con el siguiente ID: " + $scope.Meetings.meetingid + " o dando Click en el botón Unirme." ,
                        type: 'success',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Unirme',
                        cancelButtonText: 'Cerrar esta ventana'
                    }, function(isConfirm) {
                        if (isConfirm) {
                            window.open($scope.Meetings.joinURL, '_blank', '', false)
                        }
                    })
                }
            });
    }

    $scope.saveQueja = function () {
        $scope.contieneEvidencias = $scope.uploadedFiles.length == 0 ? false : true;

        if ($scope.selectedQueja == "" || $scope.asuntoQueja == "" || $scope.mensajeQueja == "") {
            alertFactory.error("Todos los datos son obligatorios para generar una queja.")
            return;
        }

        if ($scope.uploadedFiles.length < $scope.files.length) {
            alertFactory.error('Se deben de cargar las imagenes en el servidor, dando clic en el boton Upload.');
            return;
        }

        nuevoMemorandumRepository.saveQueja(
            $scope.userData.idUsuario,
            $scope.selectedQueja,
            $scope.asuntoQueja,
            $scope.mensajeQueja,
            $scope.contieneEvidencias == true ? 1 : 0,
            JSON.stringify($scope.uploadedFiles)
        )
            .then(function successCallback(response) {
                $scope.selectedQueja = ""
                $scope.asuntoQueja = ""
                $scope.mensajeQueja = ""
                $scope.uploadedFiles = []
                $scope.files = []
                $scope.uploadedFilesDetalle = []
                $scope.filesDetalle = []
                //alertFactory.success('Queja generada de forma correcta.');
                $scope.getQuejas($scope.userData.idUsuario)

                swal({
                    title: 'Ticket',
                    text: 'El ticket se creó de forma correcta',
                    type: 'success',
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33'
                }, function(isConfirm) {
                    if (isConfirm) {
                        
                    }
                })
            });
    }

    $scope.updateMemo = function (memo, leerMastarde) {
        if (!leerMastarde) {
            nuevoMemorandumRepository.actualizaLog(memo.idMemorandum, $scope.userData.idUsuario, 1, memo.aceptado, memo.comentarios)
                .then(function successCallback(response) {
                    $scope.getMemorandums();
                })

        }
        else {
            nuevoMemorandumRepository.actualizaLog(memo.idMemorandum, $scope.userData.idUsuario, 0, 0, '')
                .then(function successCallback(response) {
                    $scope.getMemorandums();
                })
        }

    }

    $scope.showQuejaInfo = function (data) {
        //OBTENEMOS LAS EVIDENCIAS Y EL HISTORICO DE LA QUEJA
        $scope.QuejaInfo = data
        $("#mdQueja").modal('show')
    }

    $scope.popupOptions = {
        width: 1000,
        height: 500,        
        bindingOptions: {          
          visible: 'salesPopupVisible',
          title: 'salesPopupTitle'
        }
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

            $scope.contieneEvidencias = $scope.uploadedFilesDetalle.length == 0 ? false : true;

            seguimientoTicketsRepository.saveLogQueja(
                $scope.idQueja,
                $scope.userData.idUsuario,
                $scope.myModel.observacionQueja,
                JSON.stringify($scope.uploadedFilesDetalle),
                $scope.contieneEvidencias == true ? 1 : 0,
                $scope.selectedEstatusId,
                0,
                '',
                0,
                ''
            ).then(
                function successCallback(response){
                    alertFactory.success('Queja actualizada.');
                    
                    $scope.myModel.observacionQueja = ""
                    $scope.Evidencias = []
                    $scope.uploadedFiles = []
                    $scope.files = []
                    $scope.uploadedFilesDetalle = []
                    $scope.filesDetalle = []
                    $scope.LogQueja = []
                    $scope.gridLogQueja = {}
                    $scope.salesPopupVisible = false
                    $scope.getQuejas($scope.userData.idUsuario)
                },
                function(error){
                    alertFactory.error('Ocurrio un error al guardar el Ticket.');
                }
            );
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
            cancelButtonText: 'Cancelar'
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
                        $scope.myModel.observacionQueja = ""
                        $scope.Evidencias = []
                        $scope.uploadedFiles = []
                        $scope.files = []
                        $scope.uploadedFilesDetalle = []
                        $scope.filesDetalle = []
                        $scope.LogQueja = []
                        $scope.gridLogQueja = {}
                        $scope.salesPopupVisible = false
                        $scope.getQuejas($scope.userData.idUsuario)
                    },
                    function(error){
                        alertFactory.error('Ocurrio un error al cerrar el Ticket.');
                    }
                );
            }
        })
    }

    $scope.getQueja = function(data)
    {
        console.log(data)
        //alertFactory.success('Ocurrio unos error al obtener los Tickets.' + data.estatus)
        
        $scope.idQueja = data.idQueja
        
        seguimientoTicketsRepository.getLogQuejaPorId(data.idQueja).then(
            function successCallback(response) {
                //$scope.LogQueja = {}
                
                $scope.LogQueja = response.data
                $scope.estatus = data.estatus
                $scope.asunto = data.asunto
                $scope.selectedEstatus = data.estatusqueja
                $scope.selectedEstatusId = data.estatus

                $scope.salesPopupTitle = 'Detalle del ticket: ' + data.asunto
                
                $scope.gridLogQueja = {
                    rowHeight: '80',
                    rowAlternationEnabled: true,
                    showColumnLines: false,
                    showBorders: true,
                    columnAutoWidth: true,
                    allowSorting: false,
                    paging: {
                        enabled: true,
                        pageSize: 10
                    },
                    pager: {
                        visible: true,
                        showInfo: true,
                        infoText: "Página {0} de {1}: ({2} Registros encontrados)",
                        allowedPageSizes: true
                    },

                    columns: [
                        { dataField: "nombreCompleto", caption:"Nombre", dataType: "int"},
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
                        alertFactory.error('Ocurrió un error al obtener los Tickets.');
                    }
                )
            }, function (error) {
                alertFactory.error('Ocurrió un error al obtener los Tickets.');
            }
        )
    } 

    $scope.cancelar = function(){
        $scope.myModel.observacionQueja = ""
        $scope.Evidencias = []
        $scope.filesDetalle = [];
        $scope.uploadedFilesDetalle = []
        $scope.LogQueja = []
        $scope.gridLogQueja = {}
        $('#loadModal').modal('hide')
        $scope.salesPopupVisible = false
    }

});