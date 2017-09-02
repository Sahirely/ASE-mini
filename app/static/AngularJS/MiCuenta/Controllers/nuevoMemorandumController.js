registrationModule.controller('nuevoMemorandumController', function ($scope, $route, $modal, $rootScope, nuevoMemorandumRepository, configuradorRepository) {

    //VARIABLES GLOBALES
    $scope.catalogoPerfiles = []

    // FILE UPLOAD
    $scope.multiple = true;
    $scope.accept = "*.pdf";
    $scope.value = [];
    $scope.uploadMode = "useButtons";

    $scope.options = {
        selectButtonText: "Selecciona...",
        labelText: "o arrasta aquí",
        attr: { style: "background-color: red" },
        uploadUrl: "https://js.devexpress.com/Content/Services/upload.aspx",
        bindingOptions: {
            multiple: "multiple",
            accept: "accept",
            value: "value",
            uploadMode: "uploadMode"
        }
    };
    //CHECKBOX
    $scope.chkShowPerfiles = false


    $scope.checkBox = {
        checked: {
            value: true
        },
        unchecked: {
            value: false
        },
        disabled: {
            disabled: true,
            bindingOptions: {
                value: "checkBoxValue"
            }
        }
    };


    $scope.init = function () {
        $scope.getPerfiles();

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
                    ['view', ['undo', 'redo', 'fullscreen', 'codeview', 'help']]
                ]
            }

        );
    }

    $scope.getPerfiles = function () {

        configuradorRepository.getCatalogoTipoUsuarios()
            .then(function successCallback(response) {
                $scope.catalogoPerfiles = JSON.stringify(response.data);
            }, function errorCallback(response) {
                
            });


    }

});