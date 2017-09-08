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
    $scope.chkShowPerfiles = false
    $scope.chkShowUsuarios = false
    $scope.chkShowZonas = false

    //LIST WITH SEARCH 

    $scope.selectedItemKeysZonas = [];
    $scope.selectedItemKeysPerfiles = [];
    $scope.selectedItemKeysUsuarios = [];

    $scope.selectionMode = "all";
    $scope.selectAllMode = "page";

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
    function process(zona) {
        var itemIndex = -1;

        $.each($scope.selectedItemKeysZonas, function (index, item) {
            if (item.key === zona.key) {
                itemIndex = index;
                return false;
            }
        });

        if (zona.selected && itemIndex === -1) {
            $scope.selectedItemKeysZonas.push(zona);
        } else if (!zona.selected) {
            $scope.selectedItemKeysZonas.splice(itemIndex, 1);
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
                    width: 300,
                    icon: "fa fa-plus",
                    showCheckBoxesMode: "selectAll",
                    onItemSelectionChanged: function (e) {
                        var item = e.node;
                        if(isParent(item)) {
                            process($.extend({
                                category: item.parent.text
                            }, item));
                        } else {
                            $.each(item.items, function(index, product) {
                                process($.extend({
                                    category: item.text
                                }, product));
                            });
                        }
                    },
                    bindingOptions: {
                        searchValue: "searchValue"
                    }
                };

                $scope.listOptions = {
                    width: 400,
                    bindingOptions: {
                        items: "selectedItemKeysZonas"
                    }
                };

                $scope.searchOptions = {
                    bindingOptions: {
                        value: "searchValue"
                    },
                    placeholder: "Search...",
                    width: 300,
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
                $scope.listOptionsUsuarios = {
                    dataSource: dataSourceUsuarios,
                    itemTemplate: function (data) {
                        return $("<div>").text(data.text);
                    },
                    height: 'auto',
                    showSelectionControls: true,
                    bindingOptions: {
                        selectedItemKeys: "selectedItemKeysUsuarios",
                        selectionMode: "selectionMode",
                        selectAllMode: "selectAllMode",
                    }
                };

                $scope.searchOptionsUsuarios = {
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
                    height: 'auto',
                    showSelectionControls: true,
                    bindingOptions: {
                        selectedItemKeys: "selectedItemKeysPerfiles",
                        selectionMode: "selectionMode",
                        selectAllMode: "selectAllMode",
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
        $scope.descripcion = $("#editor").summernote('code');
        var ZonasArray = []
        for (let zona of $scope.selectedItemKeysZonas) {
            ZonasArray.push({"id": zona.key})
        }

        //VALIDAMOS - FALTA LA PROGRAMACION DE VALIDACION
        if (true) {
            nuevoMemorandumRepository.save(
                $scope.titulo,
                $scope.descripcion,
                $scope.chkShowZonas == true ? 1 : 0,
                $scope.chkShowPerfiles == true ? 1 : 0,
                $scope.chkShowUsuarios == true ? 1 : 0,
                JSON.stringify(ZonasArray),
                JSON.stringify($scope.selectedItemKeysPerfiles),
                JSON.stringify($scope.selectedItemKeysUsuarios)
            )
                .then(function (result) {
                    alertFactory.success('Se generó de forma correcta el Memorandum #' + result.data[0].idMemorandum);
                })
        }
    }

});