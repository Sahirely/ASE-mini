create procedure dbo.SEL_PORCOBRAR_SP (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT 
		'' as cliente,
		'' as consecutivo,
		'' as numeroOrden,
		'' as económico,
		--zonas dinámicas
		'' as peroveedor,
		'' as tipoOrden,
		'' as ceco,
		'' as provision,
		'' as estatus,
		'' as ventasiniva,
		'' as fechaCita
	FROM
		Ordenes ord
	LEFT JOIN dbo.ContratoOperacion cop ON cop.idContratoOperacion = ord.idContratoOperacion

end

