registrationModule.controller('nuevoMemorandumController', function ($scope, $route, $modal, $rootScope, alertFactory, nuevoMemorandumRepository, configuradorRepository, userFactory) {
    var Zonas = []

    //VARIABLES GLOBALES
    $scope.titulo = ""
    $scope.descripcion = ""

    $scope.userData = userFactory.getUserData();
    $scope.idOperacion = $scope.userData.idOperacion;
    $scope.idUsuario = $scope.userData.idUsuario;
    $scope.idRol = $scope.userData.idRol;

    // FILE UPLOAD
    $scope.multiple = true;
    $scope.accept = "application/pdf,image/*";
    $scope.files = [];
    $scope.uploadMode = "useButtons";

    $scope.fileUploadOptions = {
        selectButtonText: "Selecciona...",
        labelText: "o arrasta aquí",
        uploadUrl: "/api/configurador/uploadMemo",
        bindingOptions: {
            multiple: "multiple",
            accept: "accept",
            value: "files",
            uploadMode: "uploadMode"
        }
    };
    //SHOW CHECKBOXES
    $scope.notificaPerfiles = false
    $scope.notificaUsuarios = false
    $scope.notificaZonas = false

    //LIST WITH SEARCH 

    $scope.selectedZonas = []
    $scope.selectedPerfiles = []
    $scope.selectedUsuarios = []

    $scope.selectionMode = "all";
    $scope.selectAllMode = "allPages";

    $scope.init = function () {
        $("#editor").summernote(
            {
                height: 250,
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
                    ['fontname', ['fontname']],
                    ['fontsize', ['fontsize']],
                    ['color', ['color']],
                    ['para', ['ol', 'ul', 'paragraph', 'height']],
                    ['table', ['table']],
                    ['insert', ['link']],
                    ['view', ['undo', 'redo', 'fullscreen', 'help']]
                ]
            }

        );
        $scope.LoadData();
    }


    $scope.LoadData = function () {
        $scope.getPerfiles();
        $scope.getUsuarios();
        $scope.getZonas();
    }

    function isParent(data) {
        return !data.items.length;
    }

    function processZona(zona) {
        var itemIndex = -1;

        $.each($scope.selectedZonas, function (index, item) {
            if (item.key === zona.key) {
                itemIndex = index;
                return false;
            }
        });

        if (zona.selected && itemIndex === -1) {
            $scope.selectedZonas.push(zona);
        } else if (!zona.selected) {
            $scope.selectedZonas.splice(itemIndex, 1);
        }
    }

    $scope.getZonas = function () {
        configuradorRepository.getZonas($scope.idOperacion)
            .then(function successCallback(response) {
                //YA QUE TENEMOS LAS ZONAS ARMAMOS EL TREE
                var JSONResponse = response.data
                for (let level1 of JSONResponse.filter(data => data.nivel == 1)) {
                    Zonas.push(
                        {
                            "id": level1.idZona,
                            "text": level1.nombre,
                            "items": []
                        }
                    )
                    //NIVEL 2
                    for (let level2 of JSONResponse.filter(data => data.nivel == 2)) {
                        if (level1.idZona == level2.idPadre) {
                            Zonas.filter(data => { return data.id == level1.idZona })[0].items.push(
                                {
                                    "id": level2.idZona,
                                    "text": level2.nombre,
                                    "items": []
                                }
                            )
                        }
                    }
                }


                $scope.treeViewZonasOptions = {
                    items: Zonas,
                    showCheckBoxesMode: "selectAll",
                    onItemSelectionChanged: function (e) {
                        var item = e.node;
                        if (isParent(item)) {
                            processZona($.extend({
                                category: item.parent.text
                            }, item));
                        } else {
                            $.each(item.items, function (index, product) {
                                processZona($.extend({
                                    category: item.text
                                }, product));
                            });
                        }
                    },
                    bindingOptions:{
                        searchValue: "searchValue"
                    }
                };

              

                $scope.searchOptionsZonas = {
                    bindingOptions: {
                        value: "searchValue"
                    },
                    placeholder: "Buscar...",
                    mode: "search",
                    valueChangeEvent: "keyup"
                };

            })



    }
    $scope.getUsuarios = function () {

        configuradorRepository.getUsuarios()
            .then(function successCallback(response) {
                var dataSourceUsuarios = new DevExpress.data.DataSource({
                    store: response.data,
                    searchOperation: "contains",
                    searchExpr: "text"
                });
                $scope.listOptionsUsers = {
                    dataSource: dataSourceUsuarios,
                    itemTemplate: function (data) {
                        return $("<div>").text(data.text);
                    },
                    showSelectionControls: true,
                    bindingOptions: {
                        selectedItemKeys: "selectedUsuarios",
                        selectionMode: "selectionMode",
                        selectAllMode: "selectAllMode"
                    }
                };

                $scope.searchOptionsUsers = {
                    valueChangeEvent: "keyup",
                    placeholder: "Buscar...",
                    mode: "search",
                    onValueChanged: function (args) {
                        dataSourceUsuarios.searchValue(args.value);
                        dataSourceUsuarios.load();
                    }
                };
            }, function errorCallback(response) {
            });

    }
    $scope.getPerfiles = function () {
        configuradorRepository.getCatalogoTipoUsuarios()
            .then(function successCallback(response) {
                var dataSourcePerfiles = new DevExpress.data.DataSource({
                    store: response.data,
                    searchOperation: "contains",
                    searchExpr: "text"
                });
                $scope.listOptionsPerfiles = {
                    dataSource: dataSourcePerfiles,
                    itemTemplate: function (data) {
                        return $("<div>").text(data.text);
                    },
                    showSelectionControls: true,
                    bindingOptions: {
                        selectedItemKeys: "selectedPerfiles",
                        selectionMode: "selectionMode",
                        selectAllMode: "selectAllMode"
                    }
                };
                $scope.searchOptionsPerfiles = {
                    valueChangeEvent: "keyup",
                    placeholder: "Buscar...",
                    mode: "search",
                    onValueChanged: function (args) {
                        dataSourcePerfiles.searchValue(args.value);
                        dataSourcePerfiles.load();
                    }
                };

            }, function errorCallback(response) {
            });
    }


    $scope.saveMemo = function () {
        //VALIDACIONES
        $scope.descripcion = $("#editor").summernote('code');
        $scope.notificaPerfiles = $scope.selectedPerfiles.length == 0 ? false : true;
        $scope.notificaUsuarios = $scope.selectedUsuarios.length == 0 ? false : true;
        $scope.notificaZonas = $scope.selectedZonas.length == 0 ? false : true;


        if ($scope.descripcion == "" || $scope.titulo == "") {
            alertFactory.error('El campo Titulo y Descripción son obligatorios.');
            return;
        }



        //VALIDACION DE SELECCION DE PERFILES
        if ($scope.notificaPerfiles && $scope.selectedPerfiles.length == 0) {
            alertFactory.error('Si se desea alertar por Perfil, se debe de seleccionar al menos 1 elemento de la lista.');
            return;
        }
        //VALIDACION DE SELECCION DE USUARIOS
        if ($scope.notificaUsuarios && $scope.selectedUsuarios.length == 0) {
            alertFactory.error('Si se desea alertar por Usuario, se debe de seleccionar al menos 1 elemento de la lista.');
            return;
        }
        //VALIDACION DE SELECCION DE ZONAS
        if ($scope.notificaZonas && $scope.selectedZonas.length == 0) {
            alertFactory.error('Si se desea alertar por Zona, se debe de seleccionar al menos 1 elemento de la lista.');
            return;
        }
        var ZonasArray = []
        for (let zona of $scope.selectedZonas) {
            ZonasArray.push({ "id": zona.key })
        }

        //VALIDAMOS - FALTA LA PROGRAMACION DE VALIDACION

        nuevoMemorandumRepository.save(
            $scope.titulo,
            $scope.descripcion,
            $scope.notificaZonas == true ? 1 : 0,
            $scope.notificaPerfiles == true ? 1 : 0,
            $scope.notificaUsuarios == true ? 1 : 0,
            JSON.stringify(ZonasArray),
            JSON.stringify($scope.selectedPerfiles),
            JSON.stringify($scope.selectedUsuarios)
        )
            .then(function (result) {
                alertFactory.success('Se generó de forma correcta el Memorandum #' + result.data[0].idMemorandum);
                $scope.titulo="";
                $scope.descripcion="";
                $scope.notificaZonas=false;
                $scope.notificaUsuarios=false;
                $scope.notificaPerfiles=false;
                $scope.selectedPerfiles = []
                $scope.selectedUsuarios = []
                $scope.selectedZonas = []
                $scope.Zonas = []
                $('#editor').summernote('code', '')
            })

    }

});