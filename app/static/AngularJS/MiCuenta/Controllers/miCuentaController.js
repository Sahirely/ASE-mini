registrationModule.controller('miCuentaController', function($scope, $route, $modal, $rootScope, userFactory, nuevoMemorandumRepository, alertFactory, miCuentaRepository) {
    $rootScope.modulo = 'miCuenta'; // <<-- Para activar en que opción del menú se encuentra

    // FILE UPLOAD
    $scope.files = [];
    $scope.uploadedFiles = []

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

    $scope.init = function() {
        $scope.userData = userFactory.getUserData()
        $scope.getMemorandums()        
        $scope.getQuejas($scope.userData.idUsuario)
        $scope.getTipoQuejaUsuario($scope.userData.idRol)
    }

    $scope.getMemorandums = function() {
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
                
                $scope.MemorandumsLeidosTotal = $scope.Memorandums.filter(X => X.leido == 1)==undefined?0:$scope.Memorandums.filter(X => X.leido == 1).length
                $scope.MemorandumsSinLeerTotal = $scope.Memorandums.length - $scope.MemorandumsLeidosTotal
            })

    }

    $scope.getQuejas = function(idUsuario) {
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
                        {
                            dataField: "estatus",
                            dataType: "string",
                            cellTemplate: function(element, info) {
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
                        //if (e.rowType == "data")
                            //$scope.showQuejaInfo(e.row.data)
                    }
                }
            });
    }

    $scope.getTipoQuejaUsuario = function(idTipoUsuario) {
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
                    onValueChanged: function(e) {
                        $scope.selectedQueja = e.value;
                    }
                }
            });
    }

    $scope.saveQueja = function() {
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
                alertFactory.success('Queja generada de forma correcta.');
                $scope.getQuejas($scope.userData.idUsuario)
            });
    }

    $scope.updateMemo = function (memo, leerMastarde) {
        if (!leerMastarde) {
            nuevoMemorandumRepository.actualizaLog(memo.idMemorandum,$scope.userData.idUsuario, 1, memo.aceptado, memo.comentarios)
            .then(function successCallback(response) {
                $scope.getMemorandums();
            })
            
        }
        else
            {
                nuevoMemorandumRepository.actualizaLog(memo.idMemorandum,$scope.userData.idUsuario, 0, 0, '')
                .then(function successCallback(response) {
                    $scope.getMemorandums();
                })
            }
            
    }

    $scope.showQuejaInfo = function(data) {
        //OBTENEMOS LAS EVIDENCIAS Y EL HISTORICO DE LA QUEJA
        $scope.QuejaInfo = data
        $("#mdQueja").modal('show')
    }


});