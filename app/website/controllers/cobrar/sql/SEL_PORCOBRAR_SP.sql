ALTER PROCEDURE [dbo].[SEL_PORCOBRAR_SP] @idUsuario NUMERIC(18, 0) AS
BEGIN
	SELECT
		cli.razonSocial AS cliente,
		ord.consecutivoOrden AS consecutivo,
		ord.numeroOrden AS numeroOrden,
		uni.numeroEconomico AS economico,
		uni.placas AS placas,
		--zonas dinámicas
		'' AS proveedor,
		tor.nombreTipoORden AS tipoOrden,
		'' AS ceco,
		'' AS provision,
		'' AS ventasiniva,
		eor.nombreEstatusOrden AS estatus
	FROM
		Ordenes ord
	LEFT JOIN EstatusOrdenes eor ON eor.idEstatusOrden = ord.idEstatusOrden
	LEFT JOIN Cotizaciones coi ON coi.idOrden = ord.idOrden
	LEFT JOIN Partidas.dbo.Proveedor pro ON pro.idProveedor = coi.idTaller
	LEFT JOIN dbo.ContratoOperacion cop ON cop.idContratoOperacion = ord.idContratoOperacion
	LEFT JOIN Partidas.dbo.Contrato con ON con.idContrato = cop.idContrato
	LEFT JOIN Partidas.dbo.Licitacion lic ON lic.idLicitacion = con.idLicitacion
	LEFT JOIN Partidas.dbo.Cliente cli ON cli.idCliente = lic.idCliente
	LEFT JOIN dbo.Unidades uni ON uni.idUnidad = ord.idUnidad 
	LEFT JOIN [dbo].[CatalogoTipoOrden] tor ON tor.idTipoOrden = ord.idTipoOrden --JOIN CECOS
	WHERE
		ord.idOrden > 0

	END