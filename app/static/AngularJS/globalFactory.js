registrationModule.factory('globalFactory', function(commonFunctionRepository) { //LQMA 09062017
    return {
        waitDrawDocument: function(dataTable, title) {
            setTimeout(function() {
                $('.' + dataTable).DataTable({
                    dom: '<"html5buttons"B>lTfgitp',
                    'iDisplayLength': 100,
                    buttons: [{
                        extend: 'excel',
                        title: title
                    }, {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg')
                            $(win.document.body).css('font-size', '10px')

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit')
                        }
                    }]
                })
            }, 2500)
        },
        minDrawDocument: function(dataTable, title) {
            setTimeout(function() {
                $('.' + dataTable).DataTable({
                    dom: '<"html5buttons"B>lTfgitp',
                    'iDisplayLength': 10,
                    buttons: [{
                        extend: 'excel',
                        title: title
                    }, {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg')
                            $(win.document.body).css('font-size', '10px')

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit')
                        }
                    }]
                })
            }, 2500)
        },
        minMinDrawDocument: function(dataTable, title) {
            setTimeout(function() {
                $('.' + dataTable).DataTable({
                    dom: '<"html5buttons"B>lTfgitp',
                    'iDisplayLength': 100,
                    buttons: [{
                        extend: 'excel',
                        title: title
                    }, {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg')
                            $(win.document.body).css('font-size', '10px')

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit')
                        }
                    }]
                })
            }, 1500)
        },
        filtrosTabla: function(dataTable, title, displayLength) {
            $('.' + dataTable).DataTable().destroy()
            $('.' + dataTable + ' thead th').each(function() {
                var titulo = $(this).text()
                $(this).html(titulo + '<br><input type="text" class="filtro-tabla"/>')
            })
            setTimeout(function() {
                var table = $('.' + dataTable).DataTable({
                    dom: '<"html5buttons"B>lTfgitp',
                    'iDisplayLength': displayLength,
                    buttons: [{
                        extend: 'excel',
                        exportOptions: {
                            columns: ':visible'
                        },
                        title: title
                    }, {
                        extend: 'print',
                        exportOptions: {
                            columns: ':visible'
                        },
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg')
                            $(win.document.body).css('font-size', '10px')

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit')
                        }
                    }]
                })
                table.columns().every(function() {
                    var that = this

                    $('input', this.header()).on('keyup change', function() {
                        if (that.search() !== this.value) {
                            that
                                .search(this.value)
                                .draw()
                        }
                    })
                })
            }, 100)
        },
        drawDocument: function(dataTable, title) {
            setTimeout(function() {
                $('.' + dataTable).DataTable({
                    dom: '<"html5buttons"B>lTfgitp',
                    'iDisplayLength': 100,
                    buttons: [{
                        extend: 'excel',
                        title: title
                    }, {
                        extend: 'print',
                        customize: function(win) {
                            $(win.document.body).addClass('white-bg')
                            $(win.document.body).css('font-size', '10px')

                            $(win.document.body).find('table')
                                .addClass('compact')
                                .css('font-size', 'inherit')
                        }
                    }]
                })
            }, 500)
        }, //LQMA 09062017
        sendMail: function(correoDe,correoPara,asunto,texto,bodyhtml,archivoRuta, nombreArchivo) {
           // console.log('entro a sendMail');
            //console.log('correo: ' + correoDe);
            commonFunctionRepository.sendMail(correoDe,correoPara,asunto, texto, bodyhtml, archivoRuta, nombreArchivo).then(function(result) {

                //console.log(result);
            });

        },
        dataMail: function(idOrden,idUsuario) {
            commonFunctionRepository.dataMail(idOrden,idUsuario).then(function(result) {
                //console.log(result);
            });

        }
    }
})
