registrationModule.controller('nuevoMemorandumController', function ($scope, $route, $modal, $rootScope, alertFactory, nuevoMemorandumRepository, configuradorRepository) {

    var products = [{
        id: "1",
        text: "BAJIO",
        expanded:true,
        items: [{
            id: "1_1",
            text: "QUERETARO/GUANAJUATO"
        }]
    }, {
        id: "2",
        text: "CENTRO",
        expanded: true,
        items: [{
            id: "2_1",
            text: "JALISCO/COLIMA",
        }, {
            id: "2_2",
            text: "NAYARIT",
            
        }, {
            id: "2_3",
            text: "ZACATECAS/AGUASCALIENTES"
        }]
    },{
        id: "3",
        text: "HIDALGO",
        expanded:true,
        items: [{
            id: "3_1",
            text: "HIDALGO"
        }]
    },{
        id: "4",
        text: "METROPOLITANA",
        expanded:true,
        items: [{
            id: "4_1",
            text: "ESTADO DE MÉXICO"
        }]
    }];

    //VARIABLES GLOBALES
    $scope.titulo = ""
    $scope.descripcion = ""

    $scope.catalogoPerfiles = []
    $scope.catalogoPerfilesTree = []

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

    function isProduct(data) {
        return !data.items.length;
    }
    function processProduct(product) {
        var itemIndex = -1;
    
        $.each($scope.selectedItemKeysZonas, function (index, item) {
            if (item.key === product.key) {
                itemIndex = index;
                return false;
            }
        });
    
        if(product.selected && itemIndex === -1) {
            $scope.selectedItemKeysZonas.push(product);
        } else if (!product.selected){
            $scope.selectedItemKeysZonas.splice(itemIndex, 1);
        }
    }

    $scope.getZonas = function () {
        $scope.treeViewZonasOptions = {
            items: products,
            width: 320,
            showCheckBoxesMode: "normal",
            onItemSelectionChanged: function(e) {
                var item = e.node;
        
                if(isProduct(item)) {
                    processProduct($.extend({
                        category: item.parent.text
                    }, item));
                } else {
                    $.each(item.items, function(index, product) {
                        processProduct($.extend({
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
            placeholder: "Search",
            width: 300,
            mode: "search",
            valueChangeEvent: "keyup"
        }; 
    }

    $scope.saveMemo = function () {
        $scope.descripcion = $("#editor").summernote('code');
        //VALIDAMOS - FALTA LA PROGRAMACION DE VALIDACION
        if (true) {
            nuevoMemorandumRepository.save($scope.titulo, $scope.descripcion, $scope.chkShowZonas==true?1:0, $scope.chkShowPerfiles == true ? 1 : 0, $scope.chkShowUsuarios == true ? 1 : 0,"", JSON.stringify($scope.selectedItemKeysPerfiles), JSON.stringify($scope.selectedItemKeysUsuarios))
                .then(function (result) {
                    alertFactory.success('Se generó de forma correcta el Memorandum #' + result.data[0].idMemorandum);
                })
        }
    }

});