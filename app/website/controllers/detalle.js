var DetalleView = require('../views/ejemploVista'),
    DetalleModel = require('../models/dataAccess2');

var Load_Files = require('../controllers/load_files');

var _PathDocuments = "C:\\ASEv2Documentos\\public\\orden\\"

var Detalle = function (conf) {
    this.conf = conf || {};

    this.view = new DetalleView();
    this.model = new DetalleModel({
        parameters: this.conf.parameters
    });

    this.response = function () {
        this[this.conf.funcionalidad](this.conf.req, this.conf.res, this.conf.next);
    }


    this.middlewares = [
   ]
}

Detalle.prototype.get_validaFactura = function(req, res, next){
    var self = this;
    // var xml1    = '<?xml version="1.0" encoding="UTF-8" ?><ejemplo></ejemplo>';
    // var xml2    = '<cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:registrofiscal="http://www.sat.gob.mx/registrofiscal" xmlns:donat="http://www.sat.gob.mx/donat" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="3.2" fecha="2016-10-25T17:14:24" sello="JdjEYLHdP9uRoC4nGDnFunDdXhW8x71HsHOZr2Q6avLGElDAIPtxY4d7Pb3W4VCCEWGaaUToaxNIz6zkqRc5NFHJj9tlgdQKiOElMqhrl4cgY25iymHQMFG7kYvPBZZnU2BWydbxR1rKVS39LaNW95Xi324lZ6qsxfqYf3no1c8vcgO1tRIxcqytkPMzGxPZxS530ZgEZqt+VDJrunvSavhAazNa2zZTg9Oql55hPoKpzsP9iVkUopBdeukFKi2ybwkNUNWmGtiuN07Lr2AizrnvHzJB7JqY4i13Hxixb/lLaAjfTZ+WUlVxd3c5iavWTM33TsQNqgHWqah039Gbnw==" formaDePago="Pago en una sola exhibición" noCertificado="00001000000403258748" certificado="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" subTotal="0.00" total="900.98" tipoDeComprobante="ingreso" metodoDePago="Transferencia electrónica" LugarExpedicion="Mexico" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv32.xsd http://www.sat.gob.mx/registrofiscal http://www.sat.gob.mx/sitio_internet/cfd/cfdiregistrofiscal/cfdiregistrofiscal.xsd http://www.sat.gob.mx/donat http://www.sat.gob.mx/sitio_internet/cfd/donat/donat11.xsd"> <cfdi:Emisor rfc="RAPI6402012R8"><cfdi:RegimenFiscal Regimen="Régimen de Incorporación Fiscal"/> </cfdi:Emisor> <cfdi:Receptor rfc="ASE0508051B6"/> <cfdi:Conceptos> <cfdi:Concepto cantidad="2" unidad="DESPONCHADO EQ.11026" noIdentificacion="1" descripcion="PARTIDA 19.6 DESPONCHADO LLANT" valorUnitario="250.00" importe="500.00"/> <cfdi:Concepto cantidad="1" unidad="ROTACIÓ LLAN EQ11026" noIdentificacion="2" descripcion="PARTIDA 19.8 ROTACIÓN LLANTAS" valorUnitario="600.00" importe="600.00"/> <cfdi:Concepto cantidad="1" unidad="TIP TOP EQ. 11026" noIdentificacion="3" descripcion="PARTIDA 19.4 TIP TOP" valorUnitario="300.00" importe="300.00"/> </cfdi:Conceptos> <cfdi:Impuestos> <cfdi:Retenciones> <cfdi:Retencion impuesto="IVA" importe="0.00"/> <cfdi:Retencion impuesto="ISR" importe="0.00"/> </cfdi:Retenciones> <cfdi:Traslados> <cfdi:Traslado impuesto="IVA" tasa="16.00" importe="4977.47"/> <cfdi:Traslado impuesto="IEPS" tasa="0.00" importe="0.00"/> </cfdi:Traslados> </cfdi:Impuestos> <cfdi:Complemento> <registrofiscal:CFDIRegistroFiscal Version="1.0" Folio="1610000064133243"/> <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/TimbreFiscalDigital/TimbreFiscalDigital.xsd" version="1.0" UUID="AAA1D26E-D43C-43BF-A7CC-7C10E169D70B" FechaTimbrado="2016-10-25T17:14:25" selloCFD="JdjEYLHdP9uRoC4nGDnFunDdXhW8x71HsHOZr2Q6avLGElDAIPtxY4d7Pb3W4VCCEWGaaUToaxNIz6zkqRc5NFHJj9tlgdQKiOElMqhrl4cgY25iymHQMFG7kYvPBZZnU2BWydbxR1rKVS39LaNW95Xi324lZ6qsxfqYf3no1c8vcgO1tRIxcqytkPMzGxPZxS530ZgEZqt+VDJrunvSavhAazNa2zZTg9Oql55hPoKpzsP9iVkUopBdeukFKi2ybwkNUNWmGtiuN07Lr2AizrnvHzJB7JqY4i13Hxixb/lLaAjfTZ+WUlVxd3c5iavWTM33TsQNqgHWqah039Gbnw==" noCertificadoSAT="00001000000403258748" selloSAT="MqoONSjRtaebKblmE+lieG09BwxvrT9r3atKY4NTDtNXeIRFRJlDRDjVlwVd/VfT7bpzddv/Mx1eEVXYPN0AnjiGTFQb+hws2hE+j6EBl7znIofjR5X4enML4o5reqaxAxh+IxwHPprZoOxxaTnwn6a4eGWpy7yQnlHuBiIahRVmL+QOesKd285vWGSgzQEaHQdd0BSnXoDqPYjucDiRoJbhneXEw0ZtW0I1jePub15h8wQF7nj4qB0Z2L5ITYx8sr8u6U35YHZyC/W2VQWpCroU0Lc5azla+Q1IVO7wLqvs8Ov5aa6THSIpmqpRe3POXUgO236RT/me9m1rJGSkjA=="/> </cfdi:Complemento> </cfdi:Comprobante>'; 
    // var xml3    = '<?xml version="1.0" encoding="utf-8"?><cfdi:Comprobante xmlns:cfdi="http://www.sat.gob.mx/cfd/3" noCertificado="00001000000405076886" sello="K6420icP+MUbQLyLbYUtpk4aWENinEU+KJ1XBI0hhNEcwWKzxvnVEwAFNT7sdM15EU0bag2DEv3tWBD/4exytLX9foEzYtWPfWj2dJK9oz5FNEluMCtHsiKml6zILq6QJbnWf+OwTOVX3IoaeJEcywY675//kmguySItozTluayODrJ0440x/9LBij2f3amCOdIPGIcfcYApSsKiQWzmneXqm0bGMyW3BYDCRe4jfJ11j/3CTdgt8taSSNnHgRB8yXjICeVKAY7ImIBJp7LSy6CbD8IjFPos54cEapmXi28EpGQifEA4dMDBjGuLyTsN3o78uQya1/8U8KRqhzavaw==" certificado="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" fecha="2017-04-11T15:02:32" LugarExpedicion="México" tipoDeComprobante="ingreso" formaDePago="Pago en una sola exhibición" metodoDePago="Transferencia electrónica" NumCtaPago="7526965" subTotal="4310" total="5000.00" version="3.2" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv32.xsd"><cfdi:Emisor rfc="GIAA8704216N5" nombre="ALEJANDRO GRIJALVA ANTONIO"><cfdi:DomicilioFiscal calle="Av. Aztecas" noExterior="19" colonia="Los Reyes" localidad="Coyoacan" municipio="Coyoacan" estado="Ciudad de México" pais="México" codigoPostal="04330" /><cfdi:RegimenFiscal Regimen="Actividad empresarial y/o profesional" /></cfdi:Emisor><cfdi:Receptor rfc="PGS100618974" nombre="Razón Social: Piensa Gram Service, S.A de C.V"><cfdi:Domicilio calle="Av. Insurgentes Sur" noExterior="1863" noInterior="301 B" colonia="Guadalupe Inn" localidad="Álvaro Obregón" municipio="Álvaro Obregón" estado="Ciudad de México" pais="Méxco" codigoPostal="01020" /></cfdi:Receptor><cfdi:Conceptos><cfdi:Concepto cantidad="1" unidad="venta/servicio" descripcion="PAGO PARA DESARROLLO DE APLICACIÓN ATENCIÓN AL CLIENTE INCLUYE APP ANDROID, IOS Y ADMINISTRADOR PARA UN TOTAL DEL 57 PORCIENTO" valorUnitario="4310" importe="4310" /></cfdi:Conceptos><cfdi:Impuestos totalImpuestosTrasladados="690"><cfdi:Traslados><cfdi:Traslado impuesto="IVA" tasa="16" importe="690" /></cfdi:Traslados></cfdi:Impuestos><cfdi:Complemento xmlns:cfdi="http://www.sat.gob.mx/cfd/3"><tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/TimbreFiscalDigital/TimbreFiscalDigital.xsd" version="1.0" UUID="7FE6DB88-17F1-49E1-B3B2-C575917A72B7" FechaTimbrado="2017-04-11T15:14:08" selloCFD="K6420icP+MUbQLyLbYUtpk4aWENinEU+KJ1XBI0hhNEcwWKzxvnVEwAFNT7sdM15EU0bag2DEv3tWBD/4exytLX9foEzYtWPfWj2dJK9oz5FNEluMCtHsiKml6zILq6QJbnWf+OwTOVX3IoaeJEcywY675//kmguySItozTluayODrJ0440x/9LBij2f3amCOdIPGIcfcYApSsKiQWzmneXqm0bGMyW3BYDCRe4jfJ11j/3CTdgt8taSSNnHgRB8yXjICeVKAY7ImIBJp7LSy6CbD8IjFPos54cEapmXi28EpGQifEA4dMDBjGuLyTsN3o78uQya1/8U8KRqhzavaw==" noCertificadoSAT="00001000000403258748" selloSAT="GXILSMRQWP7o1W/EV6ulwfS6LS4KyEtT7Z3IPhI6ed5l+VkdYDnU8YdXcvV2mpolwmhneol2pko1nttl8cJJgWrelyRSh3nkhMctrpAdSrtnEAWjSfA2XvTKyAck+eX9VmUZB46RJtQLjRjh2EiGHBK6PuMHDwApARrQE6zVGjOfxvUwnfOTejwjhzfJDmJggVpvlJtq8aBxwHU/mN/gEm4k9iTSnv8j2rFqf1c29jcANjTet+9Zy1hOZxDFdutZYEfVKF+bIr8z+1cWayEOKMOXpKCJoxLVLHbBZYkcrtj7eLla3zZi9ihg8ILYt0tZk2ej1y+x1PnxRW0UVVM81w==" /></cfdi:Complemento></cfdi:Comprobante>';
    // var xml4    = '<?xml version="1.0" encoding="UTF-8"?> <cfdi:Comprobante xmlns:psgecfd="http://www.sat.gob.mx/psgecfd" xmlns:cfdi="http://www.sat.gob.mx/cfd/3" xmlns:terceros="http://www.sat.gob.mx/terceros" xmlns:divisas="http://www.sat.gob.mx/divisas" xmlns:donat="http://www.sat.gob.mx/donat" xmlns:ventavehiculos="http://www.sat.gob.mx/ventavehiculos" xmlns:implocal="http://www.sat.gob.mx/implocal" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:ecc="http://www.sat.gob.mx/ecc" xmlns:ecb="http://www.sat.gob.mx/ecb" version="3.2" serie="IFXS" folio="2657" fecha="2016-07-21T13:19:51" sello="IfFkZbChjxpmonwmYag3dP2F8ZWwZAKqKEnryiYGGqNNIgyt4JNT8AAPtBsaAXlY374CnngpWJ9D+X5yXC7IZTeYFr6DPasfhGrQcYW/Z+Qy656fGhFye/METuwqaLWrE2jKy+jdJS/CG/9wVjw4iIPjl+tqYiPgHlwbh0IFOXU=" formaDePago="PAGO EN UNA SOLA EXHIBICION" noCertificado="00001000000202392064" certificado="MIIEgjCCA2qgAwIBAgIUMDAwMDEwMDAwMDAyMDIzOTIwNjQwDQYJKoZIhvcNAQEFBQAwggGVMTgwNgYDVQQDDC9BLkMuIGRlbCBTZXJ2aWNpbyBkZSBBZG1pbmlzdHJhY2nDs24gVHJpYnV0YXJpYTEvMC0GA1UECgwmU2VydmljaW8gZGUgQWRtaW5pc3RyYWNpw7NuIFRyaWJ1dGFyaWExODA2BgNVBAsML0FkbWluaXN0cmFjacOzbiBkZSBTZWd1cmlkYWQgZGUgbGEgSW5mb3JtYWNpw7NuMSEwHwYJKoZIhvcNAQkBFhJhc2lzbmV0QHNhdC5nb2IubXgxJjAkBgNVBAkMHUF2LiBIaWRhbGdvIDc3LCBDb2wuIEd1ZXJyZXJvMQ4wDAYDVQQRDAUwNjMwMDELMAkGA1UEBhMCTVgxGTAXBgNVBAgMEERpc3RyaXRvIEZlZGVyYWwxFDASBgNVBAcMC0N1YXVodMOpbW9jMRUwEwYDVQQtEwxTQVQ5NzA3MDFOTjMxPjA8BgkqhkiG9w0BCQIML1Jlc3BvbnNhYmxlOiBDZWNpbGlhIEd1aWxsZXJtaW5hIEdhcmPDrWEgR3VlcnJhMB4XDTEyMTEyMTE5MDcwMFoXDTE2MTEyMTE5MDcwMFowgcMxIDAeBgNVBAMTF0dPTVNBIENBTUlPTkVTIFNBIERFIENWMSAwHgYDVQQpExdHT01TQSBDQU1JT05FUyBTQSBERSBDVjEgMB4GA1UEChMXR09NU0EgQ0FNSU9ORVMgU0EgREUgQ1YxJTAjBgNVBC0THEdDQTk1MDUwM1BUNCAvIEdPQkE3MDAzMDM3STExHjAcBgNVBAUTFSAvIEdPQkE3MDAzMDNIVlpNUkwxMDEUMBIGA1UECxMLQ0FTQSBNQVRSSVowgZ8wDQYJKoZIhvcNAQEBBQADgY0AMIGJAoGBALykY4heHcDI+E9rrc17JfPXNXTmU+mZS3LZYpsRdEbHOHznYnMy9tKe9sUGgCk41ff4g1cVtkqy2npCh+zjiqZTZOG0LIU9E3a1sGzPyyiTUy57k2AYgXGlNcqMuL8AcrsnMa68H+TlCVddYQlzj4BxvI4tJN5nWjZ84BoFJIEHAgMBAAGjHTAbMAwGA1UdEwEB/wQCMAAwCwYDVR0PBAQDAgbAMA0GCSqGSIb3DQEBBQUAA4IBAQB9yIpt/leLRjYJcNUQjvfi4923FgWQ8hKDVTDpA5pKcWOnGtBVb5WATXz7zPIfqHNmRT1261qAiwJCaruHECeb1Lyy/zDQPF7XSObxpK3WeIOfPcGA2dlssNmaUSwzu9Qd/z+pyDjv7qUE3D+mRb9KNWD1X9scbqn+ljXs5tY5PqT9MN7v4jgOglApRUJtgFXjeknNhbuEk5IVyQr2vEIQPS+Qv1MSvuVhglP9uYAUayd/B/uewzpe6/J2zUq99lj/KWHIVVvHqYEXbGL7yxfzwg2uGTKUtgI6KXOLKJ7nJwzM0cXqtwIVB02qTTiEnvHIWFtsb0vMe2EhOfIdKP5z" subTotal="8330.00" descuento="0.00" TipoCambio="1.0" Moneda="MXN" total="9662.80" tipoDeComprobante="ingreso" metodoDePago="03" LugarExpedicion="XALAPA VERACRUZ" NumCtaPago="No aplica" xsi:schemaLocation="http://www.sat.gob.mx/cfd/3 http://www.sat.gob.mx/sitio_internet/cfd/3/cfdv32.xsd http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/sitio_internet/TimbreFiscalDigital/TimbreFiscalDigital.xsd"> <cfdi:Emisor rfc="GCA950503PT4" nombre="GOMSA CAMIONES, S.A. DE C.V."> <cfdi:DomicilioFiscal calle="CARR. VERACRUZ-CARDEL" noExterior="KM 3.7" noInterior="S/N" colonia="CHALCHIHUECAN" localidad="VERACRUZ" municipio="VERACRUZ" estado="VERACRUZ" pais="MEXICO" codigoPostal="91808"/> <cfdi:ExpedidoEn calle="AV. XALAPA" noExterior="703" noInterior="S/N" colonia="UNIDAD DEL BOSQUE" localidad="XALAPA" municipio="XALAPA" estado="VERACRUZ" pais="MEXICO" codigoPostal="91010"/> <cfdi:RegimenFiscal Regimen="REGIMEN GENERAL DE LEY PERSONAS MORALES"/> </cfdi:Emisor> <cfdi:Receptor rfc="ASE0508051B6" nombre="AUTOEXPRESS SERVICIO DE EXCELENCIA PEDREGAL S.A. DE C.V."> <cfdi:Domicilio calle="AV. SAN JERONIMO" noExterior="220" colonia="LA OTRA BANDA" localidad="DEL. COYOACAN" municipio="COYOACAN" estado="D.F." pais="MEXICO" codigoPostal="04519"/> </cfdi:Receptor> <cfdi:Conceptos> <cfdi:Concepto cantidad="2.000" unidad="PIEZA" noIdentificacion="16-18972-000" descripcion="BARRA ESTABILIZADA" valorUnitario="3940.000" importe="7880.000"/> <cfdi:Concepto cantidad="1.000" unidad="No aplica" noIdentificacion="M-110745" descripcion="MANO DE OBRA" valorUnitario="450.000" importe="450.000"/> </cfdi:Conceptos> <cfdi:Impuestos totalImpuestosRetenidos="0.00" totalImpuestosTrasladados="1332.80"> <cfdi:Retenciones> <cfdi:Retencion impuesto="IVA" importe="0.00"/> </cfdi:Retenciones> <cfdi:Traslados> <cfdi:Traslado impuesto="IVA" tasa="16.000" importe="1332.80"/> </cfdi:Traslados> </cfdi:Impuestos> <cfdi:Complemento> <tfd:TimbreFiscalDigital xmlns:tfd="http://www.sat.gob.mx/TimbreFiscalDigital" FechaTimbrado="2016-07-21T13:18:51" UUID="77CF9603-AAC9-40B5-9A73-67A70E4AA59E" noCertificadoSAT="00001000000301100488" selloCFD="IfFkZbChjxpmonwmYag3dP2F8ZWwZAKqKEnryiYGGqNNIgyt4JNT8AAPtBsaAXlY374CnngpWJ9D+X5yXC7IZTeYFr6DPasfhGrQcYW/Z+Qy656fGhFye/METuwqaLWrE2jKy+jdJS/CG/9wVjw4iIPjl+tqYiPgHlwbh0IFOXU=" selloSAT="XoaIp+hK60t3oPgvCNqcyprxRK7d6nKcKksvvTgUOEcyfxGIfYm7IEQ8Gm3oVx4wh5FHpXlzydyzJ7Q/6yWi5/y2lkS/+mlhDHX+ToY3riLGWD+ZB30ahmWL1FlNrJC9cPt6MUOyOvWyr506y43oFUmMWpzlLzgLRhxaqbmohXA=" version="1.0" xsi:schemaLocation="http://www.sat.gob.mx/TimbreFiscalDigital http://www.sat.gob.mx/TimbreFiscalDigital/TimbreFiscalDigital.xsd"/> </cfdi:Complemento> </cfdi:Comprobante>';
    var soap    = require('soap');

    var fs = require('fs');
    var pathname = _PathDocuments + req.query.path;
    fs.readFile( pathname , 'utf-8', (err, data) => {
        if(err) {
            console.log('Error: ReadFile');
            console.log( err );
            self.view.expositor(res, {
                error: true,
                result: err
            });
        } else {
            var parseString = require('xml2js').parseString;
            var xml = data;
            parseString(xml, function (err, result) {
                if( err ){
                    console.log('Error: parseString');
                    console.log( err );
                    self.view.expositor(res, {
                        error: true,
                        result: err
                    });
                }
                else{
                    // var xml    = '<?xml version="1.0" encoding="UTF-8" ?><ejemplo></ejemplo>';
                    var xml_b64 = new Buffer( xml ).toString('base64');

                    var url     = 'http://cfdiee.com:8080/Validadorfull/Validador?wsdl';
                    var args    = {xml: xml_b64};

                    soap.createClient(url, function(err, client) {
                        if( err ){
                            console.log( "soap.createClient" );
                            console.log( err );
                       
                            var fs = require("fs");
                            fs.unlink( pathname, function(err) {
                                var uri  = pathname.split('.');
                                uri[1]   = 'pdf';
                                var suri = uri.join('.');
                                fs.unlink( suri, function(err) {});

                                if (err) {
                                    console.error(err);
                                }
                            });

                            self.view.expositor(res, {
                                error: false,
                                result: {return: { codigo:2, Incidencia: err.code, Mensaje: "No se ha podido validar la factura, intente más tarde." }}
                            });
                        }
                        else{
                            client.ValidaAll(args, function(err, validacion) {
                                if( err ){
                                    console.log( "client.ValidaAll" );
                                    console.log( err );
                                    self.view.expositor(res, {
                                        error: false,
                                        result: {return: { codigo:0, Mensaje: err.code }}
                                    });
                                }else{
                                    var codigo = validacion.return.codigo;   // 0 => Inválido; 1 => Válido
                                    if( codigo == 0 ){
                                        var fs = require("fs");
                                        fs.unlink( pathname, function(err) {
                                            var uri  = pathname.split('.');
                                            uri[1]   = 'pdf';
                                            var suri = uri.join('.');
                                            fs.unlink( suri, function(err) {});

                                            if (err) {
                                                console.error(err);
                                            }
                                        });
                                    }
                                    else{
                                        validacion.xml = data;
                                        validacion.xml_objet = result;
                                        console.log("Mas validaciones");
                                    }

                                    self.view.expositor(res, {
                                        error: false,
                                        result: validacion
                                    });                                    
                                }
                            });
                        }
                    });
                    // console.log('----------------------------------------------------');
                    // console.log( data );
                    // console.log('----------------------------------------------------');
                    // console.log( result );
                    // console.log('----------------------------------------------------');
                    // miCallback( { success:true, xml: data, data:result } );                        
                }
            });
        }
    });
}

Detalle.prototype.get_eliminaFactura = function(req, res, next){
    var self = this;
    var pathname = _PathDocuments + req.query.path;
    var fs = require("fs");
    fs.unlink( pathname, function(err) {
        var uri  = pathname.split('.');
        uri[1]   = 'pdf';
        var suri = uri.join('.');
        fs.unlink( suri, function(err) {});

        if (err) {
            console.error(err);
        }
        else{
            console.error("Factura eliminada");   
        }
    });
    var params = [
            {name: 'numeroCotizacion', value: req.query.numeroCotizacion, type: self.model.types.STRING}
        ];
    
    this.model.query('SEL_VALIDA_RFC_FACTURA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_getRFCFactura = function(req, res, next){
    var self = this;
    var params = [
            {name: 'numeroCotizacion', value: req.query.numeroCotizacion, type: self.model.types.STRING}
        ];
    
    this.model.query('SEL_VALIDA_RFC_FACTURA_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_insertarFactura = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idCotizacion',  value: req.query.idCotizacion,  type: self.model.types.INT},
            {name: 'numFactura',    value: req.query.numFactura,    type: self.model.types.STRING},
            {name: 'uuid',          value: req.query.uuid,          type: self.model.types.STRING},
            {name: 'fechaFactura',  value: req.query.fechaFactura,  type: self.model.types.STRING},
            {name: 'subTotal',      value: req.query.subTotal,      type: self.model.types.DECIMAL},
            {name: 'iva',           value: req.query.iva,           type: self.model.types.DECIMAL},
            {name: 'total',         value: req.query.total,         type: self.model.types.DECIMAL},
            {name: 'idUsuario',     value: req.query.idUsuario,     type: self.model.types.INT},
            {name: 'xml',           value: req.query.xml,           type: self.model.types.STRING},
            {name: 'rfcEmisor',     value: req.query.rfcEmisor,     type: self.model.types.STRING},
            {name: 'rfcReceptor',   value: req.query.rfcReceptor,   type: self.model.types.STRING}
        ];
    
    this.model.query('INS_FACTURA_COTIZACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_fechaRealTrabajo = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT},
            {name: 'fechaInicio', value: req.query.fechaInicio, type: self.model.types.STRING}
        ];
    
    this.model.query('UPD_FECHA_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_tiempoTranscurrido = function(req, res, next){
    var self = this;
    var params = [{
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
    }];

    self.model.query('SEL_TIEMPO_TRANCURRIDO_ORDEN_SP', params, function(error, result){
        self.view.expositor(res, {
          error: error,
          result: result
        });
    });
}

Detalle.prototype.get_cambiarStatusOrden = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT},
            {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING}
        ];

    this.model.query('UPD_ESTATUS_ORDEN_SERVICIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_facturasPorOrden = function(req, res, next){
    var self = this;
    var params = [
            {name: 'numeroOrden', value: req.query.numeroOrden, type: self.model.types.STRING},
            {name: 'estatus', value: req.query.estatus, type: self.model.types.INT}
        ];
    var respuesta = [];

    self.model.query('SEL_COTIZACIONES_ORDEN_SP', params, function(error, result) {
        var tamanio = result.length;
        result.forEach( function( item, key ){
            var params_factura = [
                {name: 'idOrden', value: item.idOrden, type: self.model.types.INT},
                {name: 'idCotizacion', value: item.consecutivoCotizacion, type: self.model.types.INT}
            ];

            self.model.query('SEL_FACTURAS_SP', params_factura, function(fac_error, fac_result) {
                var facturillas = [];
                fac_result.forEach( function( element, k ){
                    element.tipo = element.rutaDocumento.split('.').pop();;
                    facturillas.push( element );
                });

                respuesta.push({numeroCotizacion: item.numeroCotizacion, facturas:facturillas });

                if( key >= ( tamanio - 1 ) ){
                    self.view.expositor(res, {
                        error: error,
                        result: {
                            success: true,
                            msg: 'Se encontraron ' + respuesta.length + ' registros.',
                            data: respuesta
                        }
                    });
                }
            });
        });
    });
}

Detalle.prototype.get_validaTerminoTrabajo = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT}
        ];

    this.model.query('SEL_VALIDA_TERMINO_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_validaTokenAprobacion = function(req, res, next){
    var self = this;
    var params = [
            {name: 'Token', value: req.query.Token, type: self.model.types.STRING},
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT},
            {name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT}
        ];

    this.model.query('SEL_VALIDA_TOKEN_APROBACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_validaToken = function(req, res, next){
    var self = this;
    var params = [
            {name: 'Token', value: req.query.Token, type: self.model.types.STRING},
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT}
        ];

    this.model.query('SEL_VALIDA_TOKEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_rechazaTrabajo = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT},
            {name: 'idUsuario', value: req.query.idUsuario, type: self.model.types.STRING},
            {name: 'motivo', value: req.query.motivo, type: self.model.types.STRING}
        ];

    this.model.query('UPD_RECHAZA_TRABAJO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//devuelve los trabajos con estatus iniciados
Detalle.prototype.post_subirFactura = function(req, res, next){
    var self = this;

    // Subir Archivos
    var lf = new Load_Files();
    lf.options({ // Type Options: * / img / xml / pdf / docs / xls
                    "file_1": {"Name":"factura1","Path": "xml", "Type": "xml"},
                    "file_2": {"Name":"factura1","Path": "pdf", "Type": "pdf"}
                });

    lf.facturas( "E:/ASE_Temp/", req, res, function( respuesta ){
        // console.log( respuesta );
        respuesta.forEach(function(element) {
            // console.log(element.fieldname);
            if( element.fieldname == "file_1" ){
                // console.log( element.Param );

                var fs = require('fs');

                fs.readFile( element.Path , 'utf-8', (err, data) => {
                    if(err) {
                       // console.log( { success:false, data:err } );
                    } else {
                        var parseString = require('xml2js').parseString;
                        var xml = data;
                        parseString(xml, function (err, result) {
                            if( err ){
                               // console.log( { success:false, data:err } );
                            }
                            else{
                                var soap = require('soap');
                                var url = 'http://cfdiee.com:8080/Validadorfull/Validador?wsdl';
                                var xml_base64 = new Buffer( data ).toString('base64');
                                var args = {xml: xml_base64};

                                soap.createClient(url, function(err, client) {
                                    if(err){
                                        self.view.expositor(res, {
                                            error: false,
                                            result: {success: false, error: err }
                                        });
                                    }
                                    else{
                                        client.ValidaAll(args, function(err, validacion) {
                                         
                                            // var codigo = validacion.return.codigo;
                                            var codigo = 1;
                                            if( codigo == 0 ){
                                                self.view.expositor(res, {
                                                    error: false,
                                                    result: {success: true, res: validacion }
                                                });
                                            }
                                            else{
                                                var xml          = result;
                                                var UUID         = xml['cfdi:Comprobante']['cfdi:Complemento'][0]['tfd:TimbreFiscalDigital'][0].$['UUID'];
                                                var RFC_Emisor   = xml['cfdi:Comprobante']['cfdi:Emisor'][0].$['rfc']
                                                var RFC_Receptor = xml['cfdi:Comprobante']['cfdi:Receptor'][0].$['rfc'];
                                                var Total        = xml['cfdi:Comprobante'].$['total'];

                                                // 4524.25 - 4524.98
                                                
                                                // var totalCotizacion = 4525.98;
                                                var totalCotizacion = element.Param.cotizacionTotal;

                                                //console.log( Total );
                                               // console.log( (totalCotizacion - 1) );
                                               // console.log( (totalCotizacion + 1) );
                                                if( Total >= (parseInt(totalCotizacion) - 1) && Total <= (parseInt(totalCotizacion) + 1)){

                                                    var params = [
                                                      {name: 'ruta', value: element.Path, type: self.model.types.STRING },
                                                      {name: 'idOrden', value: element.Param.idOrden, type: self.model.types.INT },
                                                      {name: 'idCotizacion', value: element.Param.cotizacionFactura, type: self.model.types.INT }
                                                    ];
                                                    
                                                    self.model.query('INS_FACTURA_SP',params, function (error, result) {
                                                        // self.view.expositor(res, {
                                                        //     error: error,
                                                        //     result: result
                                                        // });

                                                       

                                                        self.view.expositor(res, {
                                                          error: false,
                                                          result: {success: true, res: {"return":{
                                                            "codigo":1,
                                                            "mensaje": "Esta dentro del rango",
                                                            "Total cotizacion": totalCotizacion,
                                                            "Total factura": Total
                                                          }} }
                                                      });
                                                    });


                                                }
                                                else{
                                                    self.view.expositor(res, {
                                                        error: false,
                                                        result: {success: true, res: {"return":{
                                                          "codigo":0,
                                                          "mensaje": "El monto de la factura no coincide con el de la cotización",
                                                          "Total cotizacion": totalCotizacion,
                                                          "Total factura": Total
                                                        }} }
                                                    });
                                                }
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
            }
        });
    });
}

Detalle.prototype.post_subirFacturaTmp = function(req, res, next){

    // console.log('se quiere subir facturas');
    var self = this;
    var lf = new Load_Files();

    lf.upload( _PathDocuments, req, res, function( respuesta ){
        var Resultado = respuesta;
        
        self.view.expositor(res, {
            error: false,
            result: {Success: true, Msg: 'Factura cargada correctamente', data: Resultado}
      });
    });
}

Detalle.prototype.post_subirEvidencia = function(req, res, next){

    // console.log('se quiere subir facturas');
    var self = this;
    var lf = new Load_Files();

    lf.evidencia( _PathDocuments, req, res, function( respuesta ){
        var Resultado = respuesta;
        // var Parametros = respuesta[0].Param;
        self.view.expositor(res, {
            error: false,
            result: {Success: true, Msg: 'Factura cargada correctamente', data: Resultado}
      });
    });
}

Detalle.prototype.get_guardarDocumento = function(req, res, next){
    var self = this;
    var params = [
        {name: 'ruta', value: req.query.ruta, type: self.model.types.STRING },
        {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT },
        {name: 'idCotizacion', value: req.query.idCotizacion, type: self.model.types.INT }
    ];
    self.model.query('INS_FACTURA_SP',params, function (error, result) {
        console.log( error );
    });
};


Detalle.prototype.get_insertaNota = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'nota',
        value: req.query.nota,
        type: self.model.types.STRING
      },{
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
      },{
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
      },{
        name: 'idEstatusOrden',
        value: req.query.idEstatusOrden,
        type: self.model.types.INT
      }];

      this.model.query('INS_NOTA',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerHistoricoOrden = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
      }];

      this.model.query('SEL_HISTORICO_ORDEN',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerIdCotzPorOrden = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'numOrden',
        value: req.query.numOrden,
        type: self.model.types.STRING
      }];

      this.model.query('SEL_ID_COTIZACIONES_POR_ORDEN',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_obtenerHistoricoCotizacion = function(req, res, next){
  var self = this;
  var params = [
      {
        name: 'idCotizacion',
        value: req.query.idCotizacion,
        type: self.model.types.INT
      }];

      this.model.query('SEL_HISTORICO_COTIZACIONES',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}



//LQMA 07062017
Detalle.prototype.get_reporteConformidad = function(req, res, next){
var self = this;
  var params = [
      {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
      }];
      this.model.queryAllRecordSet('SEL_REPORTE_CONFORMIDAD_SP',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

Detalle.prototype.get_existComprobanteRecepcion = function(req, res, next){
var self = this;
  var params = [
      {
        name: 'numeroOrden',
        value: req.query.numeroOrden,
        type: self.model.types.STRING
      },
      {
        name: 'idCatalogoDocumento',
        value: req.query.idCatalogoDocumento,
        type: self.model.types.INT
      }];

      this.model.queryAllRecordSet('SEL_VALIDA_DOCUMENTO_SP',params, function (error, result) {
          self.view.expositor(res, {
              error: error,
              result: result
          });
      });
}

//LQMA 07062017
Detalle.prototype.get_guardaReporteConformidad = function(req, res, next) {
    console.log('desde get_guardaReporteConformidad: ')
    //console.log(req.query.myJson)
    //result: 'regresa respuesta desde get_guardaReporteConformidad'

    var http = require('http'),
        fs = require('fs');
    var filename = "Recibo_Comprobante";//guid();
    var filePath = _PathDocuments + req.query.idOrden +"\\hojaTrabajo\\"+ filename + ".pdf";
    var options = {
        "method": "POST",
        "hostname": "189.204.141.193",
        "port": "5488",
        "path": "/api/report",
        "headers": {
            "content-type": "application/json"
        }
    };
    var request = http.request(options, function(response) {
        var chunks = [];
        response.on("data", function(chunk) {
            chunks.push(chunk);
        });
        response.on("end", function() {
            var body = Buffer.concat(chunks);
            fs.writeFile(filePath, body, function(err) {
                if (err) return console.log(err);
                console.log('Archivo creado');
            });
        });
    });
    request.write(req.query.myJson);
    request.end();
    var self = this;
    self.view.expositor(res, {
        error: null,
        result: filename
    });

}

//Inserta nueva Accion
Detalle.prototype.post_accion = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'texto',
        value: req.query.texto,
        type: self.model.types.STRING
    }, {
        name: 'fecha',
        value: req.query.fecha,
        type: self.model.types.STRING
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }];


    this.model.query('INS_PLAN_ACCION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Inserta y actualiza Recordatorio
Detalle.prototype.post_recordatorio = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'texto',
        value: req.query.texto,
        type: self.model.types.STRING
    }, {
        name: 'fecha',
        value: req.query.fecha,
        type: self.model.types.STRING
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idContratoOperacion',
        value: req.query.idContratoOperacion,
        type: self.model.types.INT
    }, {
        name: 'idRecordatorio',
        value: req.query.idRecordatorio,
        type: self.model.types.INT
    }];


    this.model.query('INS_RECORDATORIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

//Finaliza un Recordatorio
Detalle.prototype.post_estatusRecordatorio = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idRecordatorio',
        value: req.query.idRecordatorio,
        type: self.model.types.INT
    }];


    this.model.query('UPD_ESTATUS_RECORDATORIO_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_tokenEstatus = function(req, res, next){
    var self = this;
    var params = [
            {name: 'idOrden', value: req.query.idOrden, type: self.model.types.INT}
        ];
        
    this.model.query('UPD_ESTATUS_UTILIDAD_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_presupuestoOrden = function(req, res, next) {
    var object = {};
    var params = {};
    var self = this;

    var params = [{
        name: 'idPresupuesto',
        value: req.query.idPresupuesto,
        type: self.model.types.INT
    }, {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }];


    this.model.query('INS_PRESUPUESTO_ORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_cancelaOrden = function(req, res, next) {
    var self = this;
    var params = [{
        name: 'idusuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }, {
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }];

    this.model.query('UPD_CANCELA_ORDEN_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.get_facturaCotizacion = function(req, res, next){
    var self = this;
    var params = 
        [{
            name: 'idOrden', 
            value: req.query.idOrden, 
            type: self.model.types.INT
        },
        {
            name: 'idUsuario', 
            value: req.query.idUsuario, 
            type: self.model.types.INT
        }];
        
    this.model.query('SEL_VALIDA_FACTURA_COTIZACION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

Detalle.prototype.post_insertBPRO = function(req, res, next) {
    
    var self = this;
    var params = [{
        name: 'idOrden',
        value: req.query.idOrden,
        type: self.model.types.INT
    }, {
        name: 'idUsuario',
        value: req.query.idUsuario,
        type: self.model.types.INT
    }];

    this.model.query('INS_ORDEN_PAGO_PROVISION_SP', params, function(error, result) {
        self.view.expositor(res, {
            error: error,
            result: result
        });
    });
}

module.exports = Detalle;