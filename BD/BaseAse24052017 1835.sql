USE [ASEPROT]
GO
/****** Object:  Table [dbo].[Acciones]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Acciones](
	[idAccion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreAccion] [varchar](50) NULL,
	[nombrePlan] [varchar](50) NULL,
	[fechaAccion] [datetime] NULL,
	[idEstatusAccion] [int] NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idOrden] [numeric](18, 0) NULL,
 CONSTRAINT [PK_Acciones] PRIMARY KEY CLUSTERED 
(
	[idAccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Aprobaciones]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Aprobaciones](
	[idAprobacion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[fechaAprobacion] [datetime] NULL,
	[margenAprobacion] [decimal](18, 4) NULL,
	[idTipoAprobacion] [int] NULL,
	[idEstatusAprobacion] [int] NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idOrdenServicio] [numeric](18, 0) NULL,
 CONSTRAINT [PK_Aprobaciones] PRIMARY KEY CLUSTERED 
(
	[idAprobacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AprobacionRespuesta]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AprobacionRespuesta](
	[idAprobacionRespuesta] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idAprobacion] [numeric](18, 0) NULL,
	[fecha] [datetime] NULL,
	[idUsuario] [numeric](18, 0) NULL,
 CONSTRAINT [PK_AprobacionRespuesta] PRIMARY KEY CLUSTERED 
(
	[idAprobacionRespuesta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[AutorizacionCotizacion]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AutorizacionCotizacion](
	[idAutorizacionCotizacion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[fechaNotificacion] [datetime] NULL,
	[fechaAutorizacion] [datetime] NULL,
	[idCotizacion] [numeric](18, 0) NULL,
 CONSTRAINT [PK_AutorizacionCotizacion] PRIMARY KEY CLUSTERED 
(
	[idAutorizacionCotizacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CatalogoDetalleModulo]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoDetalleModulo](
	[idCatalogoDetalleModulo] [int] IDENTITY(1,1) NOT NULL,
	[idCatalogoModulos] [int] NULL,
	[nombreDetalleModulo] [varchar](50) NULL,
	[activo] [bit] NULL,
 CONSTRAINT [PK_CatalogoDetalleModulo] PRIMARY KEY CLUSTERED 
(
	[idCatalogoDetalleModulo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CatalogoDocumentos]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoDocumentos](
	[idCatalogoDocumento] [int] IDENTITY(1,1) NOT NULL,
	[nombreCatalogoDocumento] [varchar](50) NULL,
	[descripcionCatalogoDocumento] [varchar](50) NULL,
 CONSTRAINT [PK_CatalogoDocumentos] PRIMARY KEY CLUSTERED 
(
	[idCatalogoDocumento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CatalogoEstadoUnidad]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoEstadoUnidad](
	[idCatalogoEstadoUnidad] [int] IDENTITY(1,1) NOT NULL,
	[descripcionEstadoUnidad] [varchar](50) NULL,
 CONSTRAINT [PK_EstadoUnidad] PRIMARY KEY CLUSTERED 
(
	[idCatalogoEstadoUnidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CatalogoFormaPago]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoFormaPago](
	[idFormaPago] [int] IDENTITY(1,1) NOT NULL,
	[nombreFormaPago] [nvarchar](50) NULL,
	[descripcionFormaPago] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoFormaPago] PRIMARY KEY CLUSTERED 
(
	[idFormaPago] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CatalogoKPI]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoKPI](
	[idCatalogoKpi] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreKpi] [varchar](50) NULL,
 CONSTRAINT [PK_CatalogoKPI] PRIMARY KEY CLUSTERED 
(
	[idCatalogoKpi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CatalogoModulos]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoModulos](
	[idCatalogoModulos] [int] IDENTITY(1,1) NOT NULL,
	[nombreModulos] [varchar](50) NULL,
	[tipoModulo] [varchar](50) NULL,
 CONSTRAINT [PK_CatalogoModulos] PRIMARY KEY CLUSTERED 
(
	[idCatalogoModulos] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CatalogoRoles]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoRoles](
	[idCatalogoRol] [int] IDENTITY(1,1) NOT NULL,
	[nombreCatalogoRol] [varchar](50) NULL,
	[descripcionCatalogoRol] [varchar](50) NULL,
 CONSTRAINT [PK_CatalogoRoles] PRIMARY KEY CLUSTERED 
(
	[idCatalogoRol] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CatalogoTipoOperacion]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CatalogoTipoOperacion](
	[idTipoOperacion] [int] IDENTITY(1,1) NOT NULL,
	[nombreTipoOperacion] [nvarchar](50) NULL,
	[descripcionTipoOperacion] [nvarchar](50) NULL,
 CONSTRAINT [PK_CatalogoTipoOperacion] PRIMARY KEY CLUSTERED 
(
	[idTipoOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CatalogoTipoOrden]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoTipoOrden](
	[idTipoOrden] [int] IDENTITY(1,1) NOT NULL,
	[nombreTipoORden] [varchar](50) NULL,
	[descripcionTipoOrden] [nchar](10) NULL,
 CONSTRAINT [PK_CatalogoTipoOrden] PRIMARY KEY CLUSTERED 
(
	[idTipoOrden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CatalogoTiposOrdenServicio]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoTiposOrdenServicio](
	[idCatalogoTipoOrdenServicio] [int] IDENTITY(1,1) NOT NULL,
	[nombreTipoOrdenServicio] [varchar](50) NULL,
	[descripcionTipoOrden] [varchar](50) NULL,
 CONSTRAINT [PK_CatalogoTiposOrdenes] PRIMARY KEY CLUSTERED 
(
	[idCatalogoTipoOrdenServicio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CatalogoTipoUsuarios]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[CatalogoTipoUsuarios](
	[idCatalogoTipoUsuarios] [int] IDENTITY(1,1) NOT NULL,
	[nombreTipoUsuario] [varchar](50) NULL,
	[descripcionTipoUsuarios] [varchar](50) NULL,
 CONSTRAINT [PK_TipoUsuarios] PRIMARY KEY CLUSTERED 
(
	[idCatalogoTipoUsuarios] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[CentroTrabajos]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CentroTrabajos](
	[idCentroTrabajo] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreCentroTrabajo] [nvarchar](50) NULL,
	[idOperacion] [int] NULL,
 CONSTRAINT [PK_CentroTrabajos] PRIMARY KEY CLUSTERED 
(
	[idCentroTrabajo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ContratoOperacion]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContratoOperacion](
	[idContratoOperacion] [int] IDENTITY(1,1) NOT NULL,
	[idOperacion] [int] NULL,
	[idContrato] [int] NULL,
 CONSTRAINT [PK_EmpresaClienteOperacion] PRIMARY KEY CLUSTERED 
(
	[idContratoOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ContratoOperacionUsuario]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContratoOperacionUsuario](
	[idContratoOperacionUsuario] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idContratoOperacion] [int] NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idCatalogoRol] [int] NULL,
	[usuario] [numeric](18, 0) NULL,
 CONSTRAINT [PK_ContratoOperacionUsuario] PRIMARY KEY CLUSTERED 
(
	[idContratoOperacionUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CotizacionDetalle]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CotizacionDetalle](
	[idCotizacionDetalle] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idCotizacion] [numeric](18, 0) NULL,
	[costo] [decimal](18, 6) NULL,
	[cantidad] [int] NULL,
	[venta] [decimal](18, 6) NULL,
	[idPartida] [numeric](18, 0) NULL,
	[idEstatusPartida] [int] NULL,
 CONSTRAINT [PK_CotizacionDetalle] PRIMARY KEY CLUSTERED 
(
	[idCotizacionDetalle] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Cotizaciones]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Cotizaciones](
	[idCotizacion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[fechaCotizacion] [datetime] NULL,
	[idTaller] [numeric](18, 0) NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idEstatusCotizacion] [int] NULL,
	[idOrden] [numeric](18, 0) NULL,
	[numeroCotizacion] [varchar](50) NULL,
	[consecutivoCotizacion] [int] NULL,
 CONSTRAINT [PK_Cotizaciones] PRIMARY KEY CLUSTERED 
(
	[idCotizacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[DetalleAutorizacionCotizacion]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetalleAutorizacionCotizacion](
	[idDetalleAutorizacionCotizacion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[fechaAutorizacion] [datetime] NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idAprobacionCotizacion] [numeric](18, 0) NULL,
	[idEstatusAutorizacion] [int] NULL,
	[idCotizacionDetalle] [numeric](18, 0) NULL,
 CONSTRAINT [PK_DetalleAutorizacionCotizacion] PRIMARY KEY CLUSTERED 
(
	[idDetalleAutorizacionCotizacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DetalleModulo]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DetalleModulo](
	[idDetalleModulo] [int] IDENTITY(1,1) NOT NULL,
	[idModulo] [int] NULL,
	[idCatalogoDetalleModulo] [int] NULL,
	[activo] [bit] NULL,
 CONSTRAINT [PK_DetalleModulo] PRIMARY KEY CLUSTERED 
(
	[idDetalleModulo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[DocumentosOrdenes]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[DocumentosOrdenes](
	[idDocumentosOrden] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[rutaDocumento] [varchar](50) NULL,
	[fechaDocumento] [datetime] NULL,
	[idOrden] [numeric](18, 0) NULL,
	[idCatalogoDocumento] [int] NULL,
 CONSTRAINT [PK_DocumentosOrdenes] PRIMARY KEY CLUSTERED 
(
	[idDocumentosOrden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EstatusAccion]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EstatusAccion](
	[idEstatusAccion] [int] IDENTITY(1,1) NOT NULL,
	[nombreEstatusAccion] [varchar](50) NULL,
	[descripcionEstatusAccion] [varchar](50) NULL,
 CONSTRAINT [PK_EstatusAccion] PRIMARY KEY CLUSTERED 
(
	[idEstatusAccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EstatusAprobaciones]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EstatusAprobaciones](
	[idEstatusAprobacion] [int] IDENTITY(1,1) NOT NULL,
	[nombreEstatusAprobacion] [varchar](50) NULL,
	[descripcionEstatusAprobacion] [varchar](50) NULL,
 CONSTRAINT [PK_EstatusAprobaciones] PRIMARY KEY CLUSTERED 
(
	[idEstatusAprobacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EstatusCotizaciones]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EstatusCotizaciones](
	[idEstatusCotizacion] [int] IDENTITY(1,1) NOT NULL,
	[nombreEstatusCotizacion] [varchar](50) NULL,
	[descripcionEstatusOrden] [varchar](50) NULL,
 CONSTRAINT [PK_EstatusCotizaciones] PRIMARY KEY CLUSTERED 
(
	[idEstatusCotizacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EstatusOperacion]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EstatusOperacion](
	[idEstatusOperacion] [int] IDENTITY(1,1) NOT NULL,
	[nombreEstatusOperacion] [varchar](50) NULL,
 CONSTRAINT [PK_EstatusOperacion] PRIMARY KEY CLUSTERED 
(
	[idEstatusOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EstatusOrdenes]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EstatusOrdenes](
	[idEstatusOrden] [int] IDENTITY(1,1) NOT NULL,
	[nombreEstatusOrden] [varchar](50) NULL,
	[descripcionEstatusOrden] [varchar](50) NULL,
 CONSTRAINT [PK_EstatusOrdenes] PRIMARY KEY CLUSTERED 
(
	[idEstatusOrden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EstatusPartida]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EstatusPartida](
	[idEstatusPartida] [int] IDENTITY(1,1) NOT NULL,
	[nombreEstatusPartida] [varchar](50) NULL,
	[descripcionEstatusPartida] [varchar](50) NULL,
 CONSTRAINT [PK_Partidas] PRIMARY KEY CLUSTERED 
(
	[idEstatusPartida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EstatusPresupuestos]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[EstatusPresupuestos](
	[idEstatusPresupuesto] [int] IDENTITY(1,1) NOT NULL,
	[nombreEstatusPresupuesto] [varchar](50) NULL,
 CONSTRAINT [PK_EstatusPresupuestos] PRIMARY KEY CLUSTERED 
(
	[idEstatusPresupuesto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Evidencias]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Evidencias](
	[idEvidencia] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreEvidencia] [varchar](50) NULL,
	[descripcionEvidencia] [varchar](50) NULL,
	[rutaEvidencia] [varchar](50) NULL,
	[idOrdenServicio] [numeric](18, 0) NULL,
 CONSTRAINT [PK_Evidencias] PRIMARY KEY CLUSTERED 
(
	[idEvidencia] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[HistorialEstatusCotizacion]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialEstatusCotizacion](
	[idHistorialEstatusCotizacion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[fechaInicial] [datetime] NULL,
	[fechaFinal] [datetime] NULL,
	[idCotizacion] [numeric](18, 0) NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idEstatusCotizacion] [int] NULL,
 CONSTRAINT [PK_HistorialEstatusCotizacion] PRIMARY KEY CLUSTERED 
(
	[idHistorialEstatusCotizacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[HistorialEstatusOrden]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[HistorialEstatusOrden](
	[idHistorialEstatusOrden] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idOrden] [numeric](18, 0) NULL,
	[idEstatusOrden] [int] NULL,
	[fechaInicial] [datetime] NULL,
	[fechaFinal] [datetime] NULL,
	[idUsuario] [numeric](18, 0) NULL,
 CONSTRAINT [PK_OrdenEstatusOrden] PRIMARY KEY CLUSTERED 
(
	[idHistorialEstatusOrden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Modulos]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Modulos](
	[idModulo] [int] IDENTITY(1,1) NOT NULL,
	[idCatalogoModulo] [int] NULL,
	[tipoModulo] [varchar](50) NULL,
 CONSTRAINT [PK_Modulos] PRIMARY KEY CLUSTERED 
(
	[idModulo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Notas]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Notas](
	[idNota] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[descripcionNota] [varchar](50) NULL,
	[idOrden] [numeric](18, 0) NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[fechaNota] [datetime] NULL,
 CONSTRAINT [PK_Notas] PRIMARY KEY CLUSTERED 
(
	[idNota] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Operaciones]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Operaciones](
	[idOperacion] [int] IDENTITY(1,1) NOT NULL,
	[nombreOperacion] [nvarchar](50) NULL,
	[nombreContacto] [nvarchar](50) NULL,
	[correoContacto] [nvarchar](50) NULL,
	[telefonoContacto] [nvarchar](50) NULL,
	[fechaInicio] [datetime] NULL,
	[fechaFin] [datetime] NULL,
	[idCatalogoTipoOperacion] [int] NULL,
	[manejoUtilidad] [int] NULL,
	[porcentajeUtilidad] [decimal](18, 4) NULL,
	[presupuesto] [bit] NULL,
	[geolocalizacion] [bit] NULL,
	[idEstatusOperacion] [int] NULL,
	[idCatalogoFormaPago] [int] NULL,
 CONSTRAINT [PK_Operaciones] PRIMARY KEY CLUSTERED 
(
	[idOperacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[OperacionModulo]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[OperacionModulo](
	[idOperacionModulo] [int] IDENTITY(1,1) NOT NULL,
	[idOperacion] [int] NULL,
	[idModulo] [int] NULL,
 CONSTRAINT [PK_OperacionModulo] PRIMARY KEY CLUSTERED 
(
	[idOperacionModulo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Ordenes]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Ordenes](
	[idOrden] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[fechaCreacionOden] [datetime] NULL,
	[fechaCita] [datetime] NULL,
	[fechaInicioTrabajo] [datetime] NULL,
	[numeroOrden] [varchar](50) NULL,
	[consecutivoOrden] [int] NULL,
	[comentarioOrden] [varchar](150) NULL,
	[requiereGrua] [bit] NULL,
	[idCatalogoEstadoUnidad] [int] NULL,
	[idZona] [numeric](18, 0) NULL,
	[idUnidad] [numeric](18, 0) NULL,
	[idContratoOperacion] [int] NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idCatalogoTipoOrdenServicio] [int] NULL,
	[idTipoOrden] [int] NULL,
	[idEstatusOrden] [int] NULL,
 CONSTRAINT [PK_Citas] PRIMARY KEY CLUSTERED 
(
	[idOrden] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Partidas]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Partidas](
	[idPartida] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[numeroParte] [varchar](50) NULL,
	[descripcion] [varchar](50) NULL,
	[precio] [decimal](18, 2) NULL,
	[idTaller] [numeric](18, 0) NULL,
 CONSTRAINT [PK_Partidas_1] PRIMARY KEY CLUSTERED 
(
	[idPartida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Presupuestos]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Presupuestos](
	[idPresupuesto] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[presupuesto] [decimal](18, 4) NULL,
	[folioPresupuesto] [varchar](50) NULL,
	[fechaInicioPresupuesto] [datetime] NULL,
	[fechaFinalPresupuesto] [datetime] NULL,
	[idCentroTrabajo] [numeric](18, 0) NULL,
	[idEstatusPresupuesto] [int] NULL,
 CONSTRAINT [PK_Presupuestos] PRIMARY KEY CLUSTERED 
(
	[idPresupuesto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Recordatorios]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Recordatorios](
	[idRecordatorio] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreRecordatorio] [varchar](50) NULL,
	[fechaRecordatorio] [datetime] NULL,
	[idAccion] [numeric](18, 0) NULL,
 CONSTRAINT [PK_Recordatorios] PRIMARY KEY CLUSTERED 
(
	[idRecordatorio] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[ResponsablesZonas]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ResponsablesZonas](
	[idResponsableZona] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idContratoOperacion] [int] NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idZona] [numeric](18, 0) NULL,
	[fechaAsignacion] [datetime] NULL,
 CONSTRAINT [PK_ResponsablesZonas] PRIMARY KEY CLUSTERED 
(
	[idResponsableZona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Taller]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Taller](
	[idTaller] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[razonSocial] [varchar](50) NULL,
	[direccion] [varchar](100) NULL,
 CONSTRAINT [PK_Taller] PRIMARY KEY CLUSTERED 
(
	[idTaller] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Token]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Token](
	[idToken] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[token] [varchar](50) NULL,
	[comentariosToken] [varchar](50) NULL,
	[ubicacionToken] [varchar](50) NULL,
	[datosMovil] [varchar](max) NULL,
	[fechaHora] [datetime] NULL,
	[vigenciaToken] [datetime] NULL,
	[calificacionToken] [int] NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idOrdenServicio] [numeric](18, 0) NULL,
	[idEstatusOrden] [int] NULL,
	[estatusToken] [int] NULL CONSTRAINT [DF_Token_estatusToken]  DEFAULT ((1)),
	[origenToken] [varchar](6) NULL,
 CONSTRAINT [PK_Tokens] PRIMARY KEY CLUSTERED 
(
	[idToken] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[TokenKPI]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TokenKPI](
	[idTokenKpi] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idToken] [numeric](18, 0) NULL,
	[idCatalogoKpi] [numeric](18, 0) NULL,
 CONSTRAINT [PK_TokenKPI] PRIMARY KEY CLUSTERED 
(
	[idTokenKpi] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Unidades]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Unidades](
	[idUnidad] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[numeroEconomico] [varchar](20) NULL,
	[vin] [varchar](20) NULL,
	[gps] [int] NULL,
	[idTipoUnidad] [numeric](18, 0) NULL,
	[sustituto] [int] NULL,
	[idOperacion] [int] NULL,
	[idCentroTrabajo] [numeric](18, 0) NULL,
 CONSTRAINT [PK_Unidades] PRIMARY KEY CLUSTERED 
(
	[idUnidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Usuarios]    Script Date: 24/05/2017 18:33:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuarios](
	[idUsuario] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreUsuario] [varchar](50) NULL,
	[contrasenia] [varchar](50) NULL,
	[idCatalogoTipoUsuarios] [int] NULL,
	[nombreCompleto] [nvarchar](50) NULL,
	[correoElectronico] [nvarchar](50) NULL,
	[telefonoUsuario] [varchar](50) NULL,
	[extensionUsuario] [varchar](50) NULL,
	[empresa] [varchar](50) NULL,
 CONSTRAINT [PK_Usuarios] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
SET IDENTITY_INSERT [dbo].[Acciones] ON 

INSERT [dbo].[Acciones] ([idAccion], [nombreAccion], [nombrePlan], [fechaAccion], [idEstatusAccion], [idUsuario], [idOrden]) VALUES (CAST(1 AS Numeric(18, 0)), N'Ejemplo', N'Test 1', NULL, 1, CAST(1 AS Numeric(18, 0)), NULL)
SET IDENTITY_INSERT [dbo].[Acciones] OFF
SET IDENTITY_INSERT [dbo].[CatalogoDetalleModulo] ON 

INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (1, 4, N'Editar Cita', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (2, 4, N'Edición de Precios', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (3, 4, N'Eliminar Partida', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (4, 4, N'Evidencias', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (5, 4, N'Comprobante de Recepción PDF (Tipo de Unidad)', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (6, 4, N'Notificación por Correo (Llegada y Recepción)', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (7, 3, N'Comentarios', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (8, 3, N'Búsqueda Taller (GPS)', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (9, 3, N'Ubicación de Unidad (GPS)', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (10, 3, N'Notificación por Correo', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (11, 5, N'Cancelación', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (12, 5, N'Niveles o criteriós de Autorización', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (13, 5, N'Monto (Vista Cliente / Vista Proveedor)', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (14, 5, N'Notificación por Correo', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (15, 6, N'Fecha Inicio', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (16, 6, N'Termino de Trabajo por Token', 1)
INSERT [dbo].[CatalogoDetalleModulo] ([idCatalogoDetalleModulo], [idCatalogoModulos], [nombreDetalleModulo], [activo]) VALUES (17, 7, N'Orden de Pago', 1)
SET IDENTITY_INSERT [dbo].[CatalogoDetalleModulo] OFF
SET IDENTITY_INSERT [dbo].[CatalogoEstadoUnidad] ON 

INSERT [dbo].[CatalogoEstadoUnidad] ([idCatalogoEstadoUnidad], [descripcionEstadoUnidad]) VALUES (1, N'En Operación')
INSERT [dbo].[CatalogoEstadoUnidad] ([idCatalogoEstadoUnidad], [descripcionEstadoUnidad]) VALUES (2, N'Parada')
SET IDENTITY_INSERT [dbo].[CatalogoEstadoUnidad] OFF
SET IDENTITY_INSERT [dbo].[CatalogoFormaPago] ON 

INSERT [dbo].[CatalogoFormaPago] ([idFormaPago], [nombreFormaPago], [descripcionFormaPago]) VALUES (1, N'Mensual', N'Pago Mensual')
INSERT [dbo].[CatalogoFormaPago] ([idFormaPago], [nombreFormaPago], [descripcionFormaPago]) VALUES (2, N'Anual', N'Pago Anual')
INSERT [dbo].[CatalogoFormaPago] ([idFormaPago], [nombreFormaPago], [descripcionFormaPago]) VALUES (3, N'Semanal', N'Pago Semanal')
SET IDENTITY_INSERT [dbo].[CatalogoFormaPago] OFF
SET IDENTITY_INSERT [dbo].[CatalogoKPI] ON 

INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(1 AS Numeric(18, 0)), N'Opción 1')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(2 AS Numeric(18, 0)), N'Opción 2')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(3 AS Numeric(18, 0)), N'Opción 3')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(4 AS Numeric(18, 0)), N'Opción 4')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(5 AS Numeric(18, 0)), N'Opción 5')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(6 AS Numeric(18, 0)), N'Opción 6')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(7 AS Numeric(18, 0)), N'Opción 7')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(8 AS Numeric(18, 0)), N'Opción 8')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(9 AS Numeric(18, 0)), N'Opción 9')
INSERT [dbo].[CatalogoKPI] ([idCatalogoKpi], [nombreKpi]) VALUES (CAST(10 AS Numeric(18, 0)), N'Opción 10')
SET IDENTITY_INSERT [dbo].[CatalogoKPI] OFF
SET IDENTITY_INSERT [dbo].[CatalogoModulos] ON 

INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (1, N'Login', N'Default')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (2, N'Home', N'Default')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (3, N'Nueva Cita', N'Default')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (4, N'Consulta de Citas', N'Default')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (5, N'Aprobaciones', N'Default')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (6, N'Órdenes de Servicio', N'Default')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (7, N'Órdenes por Cobrar', N'Default')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (8, N'Aprobación de Provisión', N'Adicional  ')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (9, N'Aprobación de Utilidades', N'Adicional  ')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (10, N'Entrada y Salida de Unidades (Rastreo Satelital)', N'Adicional  ')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (11, N'Unidades Fuera de Servicio (Unidades Sustituto)', N'Adicional  ')
INSERT [dbo].[CatalogoModulos] ([idCatalogoModulos], [nombreModulos], [tipoModulo]) VALUES (12, N'Documentos de Reclamación', N'Adicional  ')
SET IDENTITY_INSERT [dbo].[CatalogoModulos] OFF
SET IDENTITY_INSERT [dbo].[CatalogoRoles] ON 

INSERT [dbo].[CatalogoRoles] ([idCatalogoRol], [nombreCatalogoRol], [descripcionCatalogoRol]) VALUES (1, N'Cliente', NULL)
INSERT [dbo].[CatalogoRoles] ([idCatalogoRol], [nombreCatalogoRol], [descripcionCatalogoRol]) VALUES (2, N'Administrador', NULL)
INSERT [dbo].[CatalogoRoles] ([idCatalogoRol], [nombreCatalogoRol], [descripcionCatalogoRol]) VALUES (3, N'Call Center', NULL)
INSERT [dbo].[CatalogoRoles] ([idCatalogoRol], [nombreCatalogoRol], [descripcionCatalogoRol]) VALUES (4, N'Proveedor', NULL)
SET IDENTITY_INSERT [dbo].[CatalogoRoles] OFF
SET IDENTITY_INSERT [dbo].[CatalogoTipoOperacion] ON 

INSERT [dbo].[CatalogoTipoOperacion] ([idTipoOperacion], [nombreTipoOperacion], [descripcionTipoOperacion]) VALUES (1, N'Full Service List', NULL)
INSERT [dbo].[CatalogoTipoOperacion] ([idTipoOperacion], [nombreTipoOperacion], [descripcionTipoOperacion]) VALUES (2, N'Service List', NULL)
SET IDENTITY_INSERT [dbo].[CatalogoTipoOperacion] OFF
SET IDENTITY_INSERT [dbo].[CatalogoTipoOrden] ON 

INSERT [dbo].[CatalogoTipoOrden] ([idTipoOrden], [nombreTipoORden], [descripcionTipoOrden]) VALUES (1, N'Orden de Servicio', NULL)
INSERT [dbo].[CatalogoTipoOrden] ([idTipoOrden], [nombreTipoORden], [descripcionTipoOrden]) VALUES (2, N'Orden de Grúa', NULL)
SET IDENTITY_INSERT [dbo].[CatalogoTipoOrden] OFF
SET IDENTITY_INSERT [dbo].[CatalogoTiposOrdenServicio] ON 

INSERT [dbo].[CatalogoTiposOrdenServicio] ([idCatalogoTipoOrdenServicio], [nombreTipoOrdenServicio], [descripcionTipoOrden]) VALUES (1, N'Refacciones', NULL)
INSERT [dbo].[CatalogoTiposOrdenServicio] ([idCatalogoTipoOrdenServicio], [nombreTipoOrdenServicio], [descripcionTipoOrden]) VALUES (2, N'Servicio', NULL)
SET IDENTITY_INSERT [dbo].[CatalogoTiposOrdenServicio] OFF
SET IDENTITY_INSERT [dbo].[CatalogoTipoUsuarios] ON 

INSERT [dbo].[CatalogoTipoUsuarios] ([idCatalogoTipoUsuarios], [nombreTipoUsuario], [descripcionTipoUsuarios]) VALUES (1, N'Cliente', NULL)
INSERT [dbo].[CatalogoTipoUsuarios] ([idCatalogoTipoUsuarios], [nombreTipoUsuario], [descripcionTipoUsuarios]) VALUES (2, N'Administrador', NULL)
SET IDENTITY_INSERT [dbo].[CatalogoTipoUsuarios] OFF
SET IDENTITY_INSERT [dbo].[CentroTrabajos] ON 

INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(1 AS Numeric(18, 0)), N'uno', NULL)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(2 AS Numeric(18, 0)), N'dos', NULL)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(3 AS Numeric(18, 0)), N'tres', NULL)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(4 AS Numeric(18, 0)), N'uno', 10)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(5 AS Numeric(18, 0)), N'dos', 10)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(6 AS Numeric(18, 0)), N'tres', 10)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(7 AS Numeric(18, 0)), N'undefinedH', 11)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(8 AS Numeric(18, 0)), N'O', 11)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(9 AS Numeric(18, 0)), N'L', 11)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(10 AS Numeric(18, 0)), N'A', 11)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(11 AS Numeric(18, 0)), N'', 11)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(12 AS Numeric(18, 0)), N'undefinedUNO', 12)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(13 AS Numeric(18, 0)), N'DOS', 12)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(14 AS Numeric(18, 0)), N'', 12)
INSERT [dbo].[CentroTrabajos] ([idCentroTrabajo], [nombreCentroTrabajo], [idOperacion]) VALUES (CAST(15 AS Numeric(18, 0)), N'JI', 1)
SET IDENTITY_INSERT [dbo].[CentroTrabajos] OFF
SET IDENTITY_INSERT [dbo].[ContratoOperacion] ON 

INSERT [dbo].[ContratoOperacion] ([idContratoOperacion], [idOperacion], [idContrato]) VALUES (1, 2, 2)
INSERT [dbo].[ContratoOperacion] ([idContratoOperacion], [idOperacion], [idContrato]) VALUES (2, 3, 1)
INSERT [dbo].[ContratoOperacion] ([idContratoOperacion], [idOperacion], [idContrato]) VALUES (3, 4, 1)
INSERT [dbo].[ContratoOperacion] ([idContratoOperacion], [idOperacion], [idContrato]) VALUES (4, 7, 3)
INSERT [dbo].[ContratoOperacion] ([idContratoOperacion], [idOperacion], [idContrato]) VALUES (5, 7, 4)
SET IDENTITY_INSERT [dbo].[ContratoOperacion] OFF
SET IDENTITY_INSERT [dbo].[ContratoOperacionUsuario] ON 

INSERT [dbo].[ContratoOperacionUsuario] ([idContratoOperacionUsuario], [idContratoOperacion], [idUsuario], [idCatalogoRol], [usuario]) VALUES (CAST(1 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 1, NULL)
INSERT [dbo].[ContratoOperacionUsuario] ([idContratoOperacionUsuario], [idContratoOperacion], [idUsuario], [idCatalogoRol], [usuario]) VALUES (CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 2, NULL)
INSERT [dbo].[ContratoOperacionUsuario] ([idContratoOperacionUsuario], [idContratoOperacion], [idUsuario], [idCatalogoRol], [usuario]) VALUES (CAST(3 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 1, NULL)
INSERT [dbo].[ContratoOperacionUsuario] ([idContratoOperacionUsuario], [idContratoOperacion], [idUsuario], [idCatalogoRol], [usuario]) VALUES (CAST(4 AS Numeric(18, 0)), 1, CAST(3 AS Numeric(18, 0)), 3, NULL)
INSERT [dbo].[ContratoOperacionUsuario] ([idContratoOperacionUsuario], [idContratoOperacion], [idUsuario], [idCatalogoRol], [usuario]) VALUES (CAST(5 AS Numeric(18, 0)), 1, CAST(4 AS Numeric(18, 0)), 3, NULL)
INSERT [dbo].[ContratoOperacionUsuario] ([idContratoOperacionUsuario], [idContratoOperacion], [idUsuario], [idCatalogoRol], [usuario]) VALUES (CAST(6 AS Numeric(18, 0)), 1, CAST(5 AS Numeric(18, 0)), 3, NULL)
SET IDENTITY_INSERT [dbo].[ContratoOperacionUsuario] OFF
SET IDENTITY_INSERT [dbo].[CotizacionDetalle] ON 

INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(13 AS Numeric(18, 0)), CAST(11 AS Numeric(18, 0)), CAST(931.000000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(1 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(14 AS Numeric(18, 0)), CAST(11 AS Numeric(18, 0)), CAST(8016.000000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(15 AS Numeric(18, 0)), CAST(11 AS Numeric(18, 0)), CAST(4728.000000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(3 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(16 AS Numeric(18, 0)), CAST(11 AS Numeric(18, 0)), CAST(6348.000000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(4 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(17 AS Numeric(18, 0)), CAST(12 AS Numeric(18, 0)), CAST(9188.000000 AS Decimal(18, 6)), 2, CAST(0.000000 AS Decimal(18, 6)), CAST(23 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(18 AS Numeric(18, 0)), CAST(12 AS Numeric(18, 0)), CAST(8529.000000 AS Decimal(18, 6)), 3, CAST(0.000000 AS Decimal(18, 6)), CAST(24 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(19 AS Numeric(18, 0)), CAST(12 AS Numeric(18, 0)), CAST(5636.000000 AS Decimal(18, 6)), 3, CAST(0.000000 AS Decimal(18, 6)), CAST(25 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(20 AS Numeric(18, 0)), CAST(12 AS Numeric(18, 0)), CAST(8354.000000 AS Decimal(18, 6)), 6, CAST(0.000000 AS Decimal(18, 6)), CAST(26 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(21 AS Numeric(18, 0)), CAST(13 AS Numeric(18, 0)), CAST(4541.900000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(39 AS Numeric(18, 0)), 2)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(22 AS Numeric(18, 0)), CAST(13 AS Numeric(18, 0)), CAST(750.340000 AS Decimal(18, 6)), 4, CAST(0.000000 AS Decimal(18, 6)), CAST(64 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(23 AS Numeric(18, 0)), CAST(13 AS Numeric(18, 0)), CAST(3798.440000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(81 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(24 AS Numeric(18, 0)), CAST(17 AS Numeric(18, 0)), CAST(2052.880000 AS Decimal(18, 6)), 5, CAST(0.000000 AS Decimal(18, 6)), CAST(53 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(25 AS Numeric(18, 0)), CAST(17 AS Numeric(18, 0)), CAST(9315.360000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(55 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(31 AS Numeric(18, 0)), CAST(21 AS Numeric(18, 0)), CAST(8341.800000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(40 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(32 AS Numeric(18, 0)), CAST(21 AS Numeric(18, 0)), CAST(9910.690000 AS Decimal(18, 6)), 4, CAST(0.000000 AS Decimal(18, 6)), CAST(135 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(33 AS Numeric(18, 0)), CAST(22 AS Numeric(18, 0)), CAST(8341.800000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(40 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(34 AS Numeric(18, 0)), CAST(22 AS Numeric(18, 0)), CAST(7383.970000 AS Decimal(18, 6)), 4, CAST(0.000000 AS Decimal(18, 6)), CAST(90 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(35 AS Numeric(18, 0)), CAST(23 AS Numeric(18, 0)), CAST(8016.000000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(36 AS Numeric(18, 0)), CAST(23 AS Numeric(18, 0)), CAST(931.000000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(1 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(37 AS Numeric(18, 0)), CAST(23 AS Numeric(18, 0)), CAST(4728.000000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(3 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(38 AS Numeric(18, 0)), CAST(24 AS Numeric(18, 0)), CAST(8496.570000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(54 AS Numeric(18, 0)), 1)
INSERT [dbo].[CotizacionDetalle] ([idCotizacionDetalle], [idCotizacion], [costo], [cantidad], [venta], [idPartida], [idEstatusPartida]) VALUES (CAST(39 AS Numeric(18, 0)), CAST(24 AS Numeric(18, 0)), CAST(4685.220000 AS Decimal(18, 6)), 1, CAST(0.000000 AS Decimal(18, 6)), CAST(68 AS Numeric(18, 0)), 1)
SET IDENTITY_INSERT [dbo].[CotizacionDetalle] OFF
SET IDENTITY_INSERT [dbo].[Cotizaciones] ON 

INSERT [dbo].[Cotizaciones] ([idCotizacion], [fechaCotizacion], [idTaller], [idUsuario], [idEstatusCotizacion], [idOrden], [numeroCotizacion], [consecutivoCotizacion]) VALUES (CAST(11 AS Numeric(18, 0)), CAST(N'2017-05-23 12:52:24.710' AS DateTime), CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 3, CAST(101 AS Numeric(18, 0)), NULL, 1)
INSERT [dbo].[Cotizaciones] ([idCotizacion], [fechaCotizacion], [idTaller], [idUsuario], [idEstatusCotizacion], [idOrden], [numeroCotizacion], [consecutivoCotizacion]) VALUES (CAST(12 AS Numeric(18, 0)), CAST(N'2017-05-23 12:53:29.577' AS DateTime), CAST(2 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 3, CAST(101 AS Numeric(18, 0)), NULL, 2)
INSERT [dbo].[Cotizaciones] ([idCotizacion], [fechaCotizacion], [idTaller], [idUsuario], [idEstatusCotizacion], [idOrden], [numeroCotizacion], [consecutivoCotizacion]) VALUES (CAST(13 AS Numeric(18, 0)), CAST(N'2017-05-23 12:55:16.483' AS DateTime), CAST(15 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(101 AS Numeric(18, 0)), NULL, 3)
INSERT [dbo].[Cotizaciones] ([idCotizacion], [fechaCotizacion], [idTaller], [idUsuario], [idEstatusCotizacion], [idOrden], [numeroCotizacion], [consecutivoCotizacion]) VALUES (CAST(17 AS Numeric(18, 0)), CAST(N'2017-05-23 12:56:13.267' AS DateTime), CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(93 AS Numeric(18, 0)), NULL, 1)
INSERT [dbo].[Cotizaciones] ([idCotizacion], [fechaCotizacion], [idTaller], [idUsuario], [idEstatusCotizacion], [idOrden], [numeroCotizacion], [consecutivoCotizacion]) VALUES (CAST(21 AS Numeric(18, 0)), CAST(N'2017-05-23 13:34:30.960' AS DateTime), CAST(18 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(93 AS Numeric(18, 0)), N'03-1605062222899-000003-2', 2)
INSERT [dbo].[Cotizaciones] ([idCotizacion], [fechaCotizacion], [idTaller], [idUsuario], [idEstatusCotizacion], [idOrden], [numeroCotizacion], [consecutivoCotizacion]) VALUES (CAST(22 AS Numeric(18, 0)), CAST(N'2017-05-23 13:36:05.000' AS DateTime), CAST(18 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(92 AS Numeric(18, 0)), N'03-1674082674099-000002-1', 1)
INSERT [dbo].[Cotizaciones] ([idCotizacion], [fechaCotizacion], [idTaller], [idUsuario], [idEstatusCotizacion], [idOrden], [numeroCotizacion], [consecutivoCotizacion]) VALUES (CAST(23 AS Numeric(18, 0)), CAST(N'2017-05-24 16:36:18.417' AS DateTime), CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(101 AS Numeric(18, 0)), N'02-1631070183299-000020-4', 4)
INSERT [dbo].[Cotizaciones] ([idCotizacion], [fechaCotizacion], [idTaller], [idUsuario], [idEstatusCotizacion], [idOrden], [numeroCotizacion], [consecutivoCotizacion]) VALUES (CAST(24 AS Numeric(18, 0)), CAST(N'2017-05-24 16:37:30.317' AS DateTime), CAST(49 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(101 AS Numeric(18, 0)), N'02-1631070183299-000020-5', 5)
SET IDENTITY_INSERT [dbo].[Cotizaciones] OFF
SET IDENTITY_INSERT [dbo].[EstatusAccion] ON 

INSERT [dbo].[EstatusAccion] ([idEstatusAccion], [nombreEstatusAccion], [descripcionEstatusAccion]) VALUES (1, N'Nuevo', NULL)
INSERT [dbo].[EstatusAccion] ([idEstatusAccion], [nombreEstatusAccion], [descripcionEstatusAccion]) VALUES (2, N'Proceso', NULL)
INSERT [dbo].[EstatusAccion] ([idEstatusAccion], [nombreEstatusAccion], [descripcionEstatusAccion]) VALUES (3, N'Cancelado', NULL)
SET IDENTITY_INSERT [dbo].[EstatusAccion] OFF
SET IDENTITY_INSERT [dbo].[EstatusCotizaciones] ON 

INSERT [dbo].[EstatusCotizaciones] ([idEstatusCotizacion], [nombreEstatusCotizacion], [descripcionEstatusOrden]) VALUES (1, N'En Espera', NULL)
INSERT [dbo].[EstatusCotizaciones] ([idEstatusCotizacion], [nombreEstatusCotizacion], [descripcionEstatusOrden]) VALUES (2, N'En Proceso', NULL)
INSERT [dbo].[EstatusCotizaciones] ([idEstatusCotizacion], [nombreEstatusCotizacion], [descripcionEstatusOrden]) VALUES (3, N'Aceptada', NULL)
INSERT [dbo].[EstatusCotizaciones] ([idEstatusCotizacion], [nombreEstatusCotizacion], [descripcionEstatusOrden]) VALUES (4, N'Cancelada', NULL)
SET IDENTITY_INSERT [dbo].[EstatusCotizaciones] OFF
SET IDENTITY_INSERT [dbo].[EstatusOrdenes] ON 

INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (1, N'Nueva Sin Taller', N'Descripcion test')
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (2, N'Nueva Con Taller', NULL)
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (3, N'En Taller', NULL)
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (4, N'En Aprobación', NULL)
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (5, N'En Proceso', NULL)
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (6, N'Término Trabajo', NULL)
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (7, N'Entrega', NULL)
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (8, N'Orden Por Cobrar', NULL)
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (9, N'Finalizado', NULL)
INSERT [dbo].[EstatusOrdenes] ([idEstatusOrden], [nombreEstatusOrden], [descripcionEstatusOrden]) VALUES (10, N'Cancelado', NULL)
SET IDENTITY_INSERT [dbo].[EstatusOrdenes] OFF
SET IDENTITY_INSERT [dbo].[EstatusPartida] ON 

INSERT [dbo].[EstatusPartida] ([idEstatusPartida], [nombreEstatusPartida], [descripcionEstatusPartida]) VALUES (1, N'En Espera', NULL)
INSERT [dbo].[EstatusPartida] ([idEstatusPartida], [nombreEstatusPartida], [descripcionEstatusPartida]) VALUES (2, N'Aprobada', NULL)
INSERT [dbo].[EstatusPartida] ([idEstatusPartida], [nombreEstatusPartida], [descripcionEstatusPartida]) VALUES (3, N'Rechazada', NULL)
SET IDENTITY_INSERT [dbo].[EstatusPartida] OFF
SET IDENTITY_INSERT [dbo].[EstatusPresupuestos] ON 

INSERT [dbo].[EstatusPresupuestos] ([idEstatusPresupuesto], [nombreEstatusPresupuesto]) VALUES (1, N'Pendiente')
INSERT [dbo].[EstatusPresupuestos] ([idEstatusPresupuesto], [nombreEstatusPresupuesto]) VALUES (2, N'Activo')
INSERT [dbo].[EstatusPresupuestos] ([idEstatusPresupuesto], [nombreEstatusPresupuesto]) VALUES (3, N'Utilizado')
SET IDENTITY_INSERT [dbo].[EstatusPresupuestos] OFF
SET IDENTITY_INSERT [dbo].[HistorialEstatusCotizacion] ON 

INSERT [dbo].[HistorialEstatusCotizacion] ([idHistorialEstatusCotizacion], [fechaInicial], [fechaFinal], [idCotizacion], [idUsuario], [idEstatusCotizacion]) VALUES (CAST(11 AS Numeric(18, 0)), CAST(N'2017-05-23 12:52:24.710' AS DateTime), NULL, CAST(11 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[HistorialEstatusCotizacion] ([idHistorialEstatusCotizacion], [fechaInicial], [fechaFinal], [idCotizacion], [idUsuario], [idEstatusCotizacion]) VALUES (CAST(12 AS Numeric(18, 0)), CAST(N'2017-05-23 12:53:29.577' AS DateTime), NULL, CAST(12 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[HistorialEstatusCotizacion] ([idHistorialEstatusCotizacion], [fechaInicial], [fechaFinal], [idCotizacion], [idUsuario], [idEstatusCotizacion]) VALUES (CAST(13 AS Numeric(18, 0)), CAST(N'2017-05-23 12:55:16.483' AS DateTime), NULL, CAST(13 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[HistorialEstatusCotizacion] ([idHistorialEstatusCotizacion], [fechaInicial], [fechaFinal], [idCotizacion], [idUsuario], [idEstatusCotizacion]) VALUES (CAST(14 AS Numeric(18, 0)), CAST(N'2017-05-23 12:56:13.267' AS DateTime), NULL, CAST(17 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[HistorialEstatusCotizacion] ([idHistorialEstatusCotizacion], [fechaInicial], [fechaFinal], [idCotizacion], [idUsuario], [idEstatusCotizacion]) VALUES (CAST(16 AS Numeric(18, 0)), CAST(N'2017-05-23 13:34:30.960' AS DateTime), NULL, CAST(21 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[HistorialEstatusCotizacion] ([idHistorialEstatusCotizacion], [fechaInicial], [fechaFinal], [idCotizacion], [idUsuario], [idEstatusCotizacion]) VALUES (CAST(17 AS Numeric(18, 0)), CAST(N'2017-05-23 13:36:05.000' AS DateTime), NULL, CAST(22 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[HistorialEstatusCotizacion] ([idHistorialEstatusCotizacion], [fechaInicial], [fechaFinal], [idCotizacion], [idUsuario], [idEstatusCotizacion]) VALUES (CAST(18 AS Numeric(18, 0)), CAST(N'2017-05-24 16:36:18.417' AS DateTime), NULL, CAST(23 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1)
INSERT [dbo].[HistorialEstatusCotizacion] ([idHistorialEstatusCotizacion], [fechaInicial], [fechaFinal], [idCotizacion], [idUsuario], [idEstatusCotizacion]) VALUES (CAST(19 AS Numeric(18, 0)), CAST(N'2017-05-24 16:37:30.317' AS DateTime), NULL, CAST(24 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1)
SET IDENTITY_INSERT [dbo].[HistorialEstatusCotizacion] OFF
SET IDENTITY_INSERT [dbo].[HistorialEstatusOrden] ON 

INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 2, CAST(N'2017-05-15 00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)), 1, CAST(N'2017-05-14 00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(3 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 2, CAST(N'2017-05-15 00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(4 AS Numeric(18, 0)), CAST(6 AS Numeric(18, 0)), 2, CAST(N'2017-05-13 00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(5 AS Numeric(18, 0)), CAST(6 AS Numeric(18, 0)), 3, CAST(N'2017-05-15 00:00:00.000' AS DateTime), NULL, NULL)
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(6 AS Numeric(18, 0)), CAST(93 AS Numeric(18, 0)), 1, CAST(N'2017-05-22 17:06:41.250' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(7 AS Numeric(18, 0)), CAST(94 AS Numeric(18, 0)), 1, CAST(N'2017-05-22 17:06:41.250' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(8 AS Numeric(18, 0)), CAST(95 AS Numeric(18, 0)), 1, CAST(N'2017-05-22 17:07:49.843' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(9 AS Numeric(18, 0)), CAST(96 AS Numeric(18, 0)), 1, CAST(N'2017-05-22 17:46:27.720' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(10 AS Numeric(18, 0)), CAST(97 AS Numeric(18, 0)), 1, CAST(N'2017-05-22 17:46:27.723' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(11 AS Numeric(18, 0)), CAST(98 AS Numeric(18, 0)), 1, CAST(N'2017-05-22 17:48:33.560' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(12 AS Numeric(18, 0)), CAST(99 AS Numeric(18, 0)), 1, CAST(N'2017-05-22 17:48:33.563' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(13 AS Numeric(18, 0)), CAST(100 AS Numeric(18, 0)), 1, CAST(N'2017-05-23 12:12:12.973' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(14 AS Numeric(18, 0)), CAST(101 AS Numeric(18, 0)), 1, CAST(N'2017-05-23 12:12:12.973' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(15 AS Numeric(18, 0)), CAST(102 AS Numeric(18, 0)), 1, CAST(N'2017-05-23 13:11:38.850' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[HistorialEstatusOrden] ([idHistorialEstatusOrden], [idOrden], [idEstatusOrden], [fechaInicial], [fechaFinal], [idUsuario]) VALUES (CAST(16 AS Numeric(18, 0)), CAST(103 AS Numeric(18, 0)), 1, CAST(N'2017-05-23 13:11:38.873' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)))
SET IDENTITY_INSERT [dbo].[HistorialEstatusOrden] OFF
SET IDENTITY_INSERT [dbo].[Operaciones] ON 

INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (1, N'TRES', N'DOS', N'tres@dos.com', N'133445', CAST(N'2017-05-22 10:29:05.360' AS DateTime), CAST(N'2017-05-16 00:00:00.000' AS DateTime), 1, 0, NULL, 1, 1, 0, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (2, N'Prueba 1', N'Leonardo Zamora', N'leonardo.Zamora@gmail.com', N'55-654-3222', CAST(N'2017-05-09 11:46:19.647' AS DateTime), CAST(N'1900-01-01 00:00:00.000' AS DateTime), 1, 0, CAST(0.0000 AS Decimal(18, 4)), 1, 0, 1, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (3, N'Prueba 2', N'INTEGRA', N'integra@gmail.com', N'55-654-3792', CAST(N'2017-05-09 11:51:33.163' AS DateTime), CAST(N'1900-01-01 00:00:00.000' AS DateTime), 1, 0, CAST(0.0000 AS Decimal(18, 4)), NULL, 0, 1, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (4, N'prueba a', N'prueba a', N'prueba @test.com', N'12344', CAST(N'2017-05-19 10:45:38.357' AS DateTime), CAST(N'2017-05-23 00:00:00.000' AS DateTime), 1, 1, CAST(10.0000 AS Decimal(18, 4)), 0, 1, 0, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (5, N'PRUEBA B', N'PRUEBA B', N'PRUEBAB@bis.com', N'23443434', CAST(N'2017-05-19 13:34:58.113' AS DateTime), CAST(N'2017-05-31 00:00:00.000' AS DateTime), 1, 1, CAST(10.0000 AS Decimal(18, 4)), 1, 1, 0, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (6, N'Prueba 2', N'Leonardo Zamora 2', N'leonardo.Zamora@gmail.com', N'55-654-3222', CAST(N'2017-05-19 15:59:23.623' AS DateTime), NULL, 1, 0, CAST(0.0000 AS Decimal(18, 4)), 1, 0, 1, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (7, N'Prueba 3', N'Leonardo Zamora 2', N'leonardo.Zamora@gmail.com', N'55-654-3222', CAST(N'2017-05-19 16:02:08.330' AS DateTime), NULL, 1, 0, CAST(0.0000 AS Decimal(18, 4)), 1, 0, 1, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (8, N'Prueba 3', N'Leonardo Zamora 2', N'leonardo.Zamora@gmail.com', N'55-654-3222', CAST(N'2017-05-19 16:03:48.673' AS DateTime), NULL, 1, 0, CAST(0.0000 AS Decimal(18, 4)), 1, 0, 1, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (9, N'Prueba 5', N'Leonardo Zamora 2', N'leonardo.Zamora@gmail.com', N'55-654-3222', CAST(N'2017-05-19 16:04:44.553' AS DateTime), NULL, 1, 0, CAST(0.0000 AS Decimal(18, 4)), 1, 0, 1, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (10, N'Prueba 6', N'Leonardo Zamora 2', N'leonardo.Zamora@gmail.com', N'55-654-3222', CAST(N'2017-05-19 16:06:32.480' AS DateTime), NULL, 1, 0, CAST(0.0000 AS Decimal(18, 4)), 1, 0, 1, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (11, N'TEST', N'TEST', N'test@com', N'1344555', CAST(N'2017-05-19 17:38:29.490' AS DateTime), CAST(N'2017-05-23 00:00:00.000' AS DateTime), 1, 0, NULL, 1, 0, 0, 1)
INSERT [dbo].[Operaciones] ([idOperacion], [nombreOperacion], [nombreContacto], [correoContacto], [telefonoContacto], [fechaInicio], [fechaFin], [idCatalogoTipoOperacion], [manejoUtilidad], [porcentajeUtilidad], [presupuesto], [geolocalizacion], [idEstatusOperacion], [idCatalogoFormaPago]) VALUES (12, N'NUEVO', N'NUEVO', N'NUEVO@tes.com', N'1234567', CAST(N'2017-05-22 10:02:33.857' AS DateTime), CAST(N'2017-05-19 00:00:00.000' AS DateTime), 1, 1, CAST(10.0000 AS Decimal(18, 4)), 1, 1, NULL, 1)
SET IDENTITY_INSERT [dbo].[Operaciones] OFF
SET IDENTITY_INSERT [dbo].[Ordenes] ON 

INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(N'2017-05-13 00:00:00.000' AS DateTime), CAST(N'2017-05-13 00:00:00.000' AS DateTime), NULL, N'100008', 1, N'Servicio de Grúa', 1, 2, NULL, CAST(7 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 2, 2, 6)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(4 AS Numeric(18, 0)), CAST(N'2017-05-12 00:00:00.000' AS DateTime), CAST(N'2017-05-13 00:00:00.000' AS DateTime), NULL, N'100009', 1, N'Se va a realizar cambio de llantas', 0, 1, NULL, CAST(1 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 1, 1, 9)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(5 AS Numeric(18, 0)), CAST(N'2017-05-13 00:00:00.000' AS DateTime), CAST(N'2017-05-13 00:00:00.000' AS DateTime), NULL, N'100010', 2, N'Se va a realizar cambio de llantas', 1, 2, NULL, CAST(7 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 2, 1, 7)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(6 AS Numeric(18, 0)), CAST(N'2017-05-13 00:00:00.000' AS DateTime), CAST(N'2017-05-13 00:00:00.000' AS DateTime), NULL, N'100011', 3, N'Se va a realizar cambio de llantas', 0, 1, NULL, CAST(43 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 1, 1, 3)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(11 AS Numeric(18, 0)), CAST(N'2017-05-19 00:00:00.000' AS DateTime), CAST(N'2017-05-19 00:00:00.000' AS DateTime), NULL, N'02-1633010407099-000004', 4, N'Prueba de creación de Órdenes de Servicio', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 2, 1, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(12 AS Numeric(18, 0)), CAST(N'2017-05-19 00:00:00.000' AS DateTime), CAST(N'2017-05-19 00:00:00.000' AS DateTime), NULL, N'02-1633010407099-000005', 5, N'Prueba de creación de Órdenes de Servicio', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 2, 2, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(17 AS Numeric(18, 0)), CAST(N'2017-05-19 00:00:00.000' AS DateTime), CAST(N'2017-05-19 00:00:00.000' AS DateTime), NULL, N'02-1633010407099-000006', 6, N'Prueba de creación de Órdenes de Servicio', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 2, 1, 8)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(18 AS Numeric(18, 0)), CAST(N'2017-05-19 00:00:00.000' AS DateTime), CAST(N'2017-05-19 00:00:00.000' AS DateTime), NULL, N'02-1633010407099-000007', 7, N'Prueba de creación de Órdenes de Servicio', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 2, 2, 8)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(63 AS Numeric(18, 0)), CAST(N'2017-05-22 11:15:48.460' AS DateTime), CAST(N'2017-05-22 11:15:48.460' AS DateTime), NULL, N'02-1633010407099-000008', 8, N'Prueba de creación de Órdenes de Servicio', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 2, 1, 2)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(64 AS Numeric(18, 0)), CAST(N'2017-05-22 11:15:48.460' AS DateTime), CAST(N'2017-05-22 11:15:48.460' AS DateTime), NULL, N'02-1633010407099-000009', 9, N'Prueba de creación de Órdenes de Servicio', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 1, CAST(1 AS Numeric(18, 0)), 2, 2, 2)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(65 AS Numeric(18, 0)), CAST(N'2017-05-22 11:16:36.740' AS DateTime), CAST(N'2017-05-22 11:16:36.740' AS DateTime), NULL, N'02-1631070183299-000010', 10, N'Prueba desde el front', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 1, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(66 AS Numeric(18, 0)), CAST(N'2017-05-22 11:16:36.740' AS DateTime), CAST(N'2017-05-22 11:16:36.740' AS DateTime), NULL, N'02-1631070183299-000011', 11, N'Prueba desde el front', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 2, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(67 AS Numeric(18, 0)), CAST(N'2017-05-22 11:23:12.503' AS DateTime), CAST(N'2017-05-05 00:00:00.000' AS DateTime), NULL, N'02-1631070183299-000012', 12, N'Prueba desde el Frontend', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 1, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(68 AS Numeric(18, 0)), CAST(N'2017-05-22 11:23:12.507' AS DateTime), CAST(N'2017-05-05 00:00:00.000' AS DateTime), NULL, N'02-1631070183299-000013', 13, N'Prueba desde el Frontend', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 2, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(77 AS Numeric(18, 0)), CAST(N'2017-05-22 11:35:12.507' AS DateTime), CAST(N'2017-05-25 02:10:00.000' AS DateTime), NULL, N'02-1631070183299-000014', 14, N'desde el frontend', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 1, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(78 AS Numeric(18, 0)), CAST(N'2017-05-22 11:35:12.510' AS DateTime), CAST(N'2017-05-25 02:10:00.000' AS DateTime), NULL, N'02-1631070183299-000015', 15, N'desde el frontend', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 2, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(79 AS Numeric(18, 0)), CAST(N'2017-05-22 11:44:55.960' AS DateTime), CAST(N'2017-05-31 03:00:00.000' AS DateTime), NULL, N'02-1631070183299-000016', 16, N'Desde el frontend', 0, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 1, 9)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(91 AS Numeric(18, 0)), CAST(N'2017-05-22 16:02:25.603' AS DateTime), CAST(N'2017-05-25 00:00:00.000' AS DateTime), NULL, N'03-1674082674099-000001', 1, N'Prueba de creación de Órdenes de Servicio', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 2, 1, 9)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(92 AS Numeric(18, 0)), CAST(N'2017-05-22 16:02:25.607' AS DateTime), CAST(N'2017-05-25 00:00:00.000' AS DateTime), NULL, N'03-1674082674099-000002', 2, N'Prueba de creación de Órdenes de Servicio', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 2, 2, 9)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(93 AS Numeric(18, 0)), CAST(N'2017-05-22 17:06:41.250' AS DateTime), CAST(N'2017-05-24 11:00:00.000' AS DateTime), NULL, N'03-1605062222899-000003', 3, N'Probando historial de ordenes', 1, 2, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 1, 4)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(94 AS Numeric(18, 0)), CAST(N'2017-05-22 17:06:41.250' AS DateTime), CAST(N'2017-05-24 11:00:00.000' AS DateTime), NULL, N'03-1605062222899-000004', 4, N'Probando historial de ordenes', 1, 2, CAST(1 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 1, 2, 9)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(95 AS Numeric(18, 0)), CAST(N'2017-05-22 17:07:49.843' AS DateTime), CAST(N'2017-05-31 07:00:00.000' AS DateTime), NULL, N'03-1632012972999-000005', 5, N'', 0, 1, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 2, 1, 9)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(96 AS Numeric(18, 0)), CAST(N'2017-05-22 17:46:27.720' AS DateTime), CAST(N'2017-06-02 08:00:00.000' AS DateTime), NULL, N'02-1631070183299-000017', 17, N'', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 1, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(97 AS Numeric(18, 0)), CAST(N'2017-05-22 17:46:27.723' AS DateTime), CAST(N'2017-06-02 08:00:00.000' AS DateTime), NULL, N'02-1631070183299-000018', 18, N'', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 2, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(98 AS Numeric(18, 0)), CAST(N'2017-05-22 17:48:33.560' AS DateTime), CAST(N'2017-06-09 18:00:00.000' AS DateTime), NULL, N'03-1674082674099-000006', 6, N'Prueba desde el frontEnd', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 1, 1, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(99 AS Numeric(18, 0)), CAST(N'2017-05-22 17:48:33.560' AS DateTime), CAST(N'2017-06-09 18:00:00.000' AS DateTime), NULL, N'03-1674082674099-000007', 7, N'Prueba desde el frontEnd', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 1, 2, 10)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(100 AS Numeric(18, 0)), CAST(N'2017-05-23 12:12:12.970' AS DateTime), CAST(N'2017-05-31 18:20:00.000' AS DateTime), NULL, N'02-1631070183299-000019', 19, N'Pruebas', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 1, 9)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(101 AS Numeric(18, 0)), CAST(N'2017-05-23 12:12:12.973' AS DateTime), CAST(N'2017-05-31 18:20:00.000' AS DateTime), NULL, N'02-1631070183299-000020', 20, N'Pruebas', 1, 1, CAST(1 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), 1, 2, 4)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(102 AS Numeric(18, 0)), CAST(N'2017-05-23 13:11:38.837' AS DateTime), CAST(N'2017-05-23 13:00:00.000' AS DateTime), NULL, N'03-1652113037299-000008', 8, N'tet', 1, 2, CAST(1 AS Numeric(18, 0)), CAST(12 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 1, 1, 1)
INSERT [dbo].[Ordenes] ([idOrden], [fechaCreacionOden], [fechaCita], [fechaInicioTrabajo], [numeroOrden], [consecutivoOrden], [comentarioOrden], [requiereGrua], [idCatalogoEstadoUnidad], [idZona], [idUnidad], [idContratoOperacion], [idUsuario], [idCatalogoTipoOrdenServicio], [idTipoOrden], [idEstatusOrden]) VALUES (CAST(103 AS Numeric(18, 0)), CAST(N'2017-05-23 13:11:38.873' AS DateTime), CAST(N'2017-05-23 13:00:00.000' AS DateTime), NULL, N'03-1652113037299-000009', 9, N'tet', 1, 2, CAST(1 AS Numeric(18, 0)), CAST(12 AS Numeric(18, 0)), 2, CAST(2 AS Numeric(18, 0)), 1, 2, 1)
SET IDENTITY_INSERT [dbo].[Ordenes] OFF
SET IDENTITY_INSERT [dbo].[Partidas] ON 

INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(1 AS Numeric(18, 0)), N'3275', N'luctus', CAST(931.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(2 AS Numeric(18, 0)), N'5500', N'nec,', CAST(8016.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(3 AS Numeric(18, 0)), N'1129', N'ut erat.', CAST(4728.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(4 AS Numeric(18, 0)), N'4431', N'libero. Morbi', CAST(6348.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(5 AS Numeric(18, 0)), N'3444', N'Aliquam', CAST(546.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(6 AS Numeric(18, 0)), N'3690', N'erat volutpat.', CAST(2880.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(7 AS Numeric(18, 0)), N'1971', N'convallis,', CAST(1250.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(8 AS Numeric(18, 0)), N'5329', N'sapien molestie', CAST(1278.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(9 AS Numeric(18, 0)), N'8768', N'vitae odio', CAST(3938.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(10 AS Numeric(18, 0)), N'6946', N'libero.', CAST(7193.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(11 AS Numeric(18, 0)), N'8498', N'velit justo', CAST(5184.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(12 AS Numeric(18, 0)), N'8429', N'quis,', CAST(3305.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(13 AS Numeric(18, 0)), N'9603', N'Nullam enim.', CAST(7420.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(14 AS Numeric(18, 0)), N'1597', N'molestie', CAST(3924.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(15 AS Numeric(18, 0)), N'1460', N'tellus non', CAST(1510.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(16 AS Numeric(18, 0)), N'4909', N'lobortis', CAST(7291.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(17 AS Numeric(18, 0)), N'6889', N'ac', CAST(9193.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(18 AS Numeric(18, 0)), N'8279', N'dui. Suspendisse', CAST(3200.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(19 AS Numeric(18, 0)), N'3274', N'consectetuer adipiscing', CAST(787.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(20 AS Numeric(18, 0)), N'9694', N'tellus eu', CAST(3991.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(21 AS Numeric(18, 0)), N'9773', N'in,', CAST(9320.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(22 AS Numeric(18, 0)), N'7207', N'Nulla eget', CAST(1191.00 AS Decimal(18, 2)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(23 AS Numeric(18, 0)), N'1578', N'nec tempus mauris', CAST(9188.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(24 AS Numeric(18, 0)), N'9623', N'Vivamus nisi.', CAST(8529.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(25 AS Numeric(18, 0)), N'1795', N'sit amet, consectetuer', CAST(5636.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(26 AS Numeric(18, 0)), N'9589', N'enim mi', CAST(8354.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(27 AS Numeric(18, 0)), N'6475', N'cursus luctus, ipsum', CAST(500.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(28 AS Numeric(18, 0)), N'1214', N'mauris blandit mattis.', CAST(3105.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(29 AS Numeric(18, 0)), N'7887', N'nibh. Phasellus nulla.', CAST(1274.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(30 AS Numeric(18, 0)), N'1731', N'Integer vitae nibh.', CAST(6969.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(31 AS Numeric(18, 0)), N'4373', N'non, hendrerit', CAST(5085.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(32 AS Numeric(18, 0)), N'9911', N'Nunc commodo', CAST(1570.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(33 AS Numeric(18, 0)), N'2954', N'Duis mi', CAST(7154.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(34 AS Numeric(18, 0)), N'9059', N'euismod in, dolor.', CAST(4323.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(35 AS Numeric(18, 0)), N'3988', N'et nunc.', CAST(7341.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(36 AS Numeric(18, 0)), N'6998', N'ligula. Aenean', CAST(6147.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(37 AS Numeric(18, 0)), N'4004', N'ut mi. Duis', CAST(6520.00 AS Decimal(18, 2)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(38 AS Numeric(18, 0)), N'6065', N'auctor, velit eget', CAST(5783.85 AS Decimal(18, 2)), CAST(23 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(39 AS Numeric(18, 0)), N'6388', N'Suspendisse tristique neque', CAST(4541.90 AS Decimal(18, 2)), CAST(15 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(40 AS Numeric(18, 0)), N'9619', N'et malesuada fames ac', CAST(8341.80 AS Decimal(18, 2)), CAST(18 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(41 AS Numeric(18, 0)), N'3288', N'a mi', CAST(8339.87 AS Decimal(18, 2)), CAST(16 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(42 AS Numeric(18, 0)), N'5851', N'sagittis placerat. Cras', CAST(1012.46 AS Decimal(18, 2)), CAST(25 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(43 AS Numeric(18, 0)), N'7736', N'semper cursus. Integer', CAST(5490.03 AS Decimal(18, 2)), CAST(42 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(44 AS Numeric(18, 0)), N'4231', N'mollis. Duis', CAST(5506.01 AS Decimal(18, 2)), CAST(22 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(45 AS Numeric(18, 0)), N'9377', N'eu tellus eu augue', CAST(5576.57 AS Decimal(18, 2)), CAST(8 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(46 AS Numeric(18, 0)), N'2771', N'orci. Phasellus', CAST(1280.26 AS Decimal(18, 2)), CAST(9 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(47 AS Numeric(18, 0)), N'3762', N'lectus convallis est,', CAST(4669.58 AS Decimal(18, 2)), CAST(20 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(48 AS Numeric(18, 0)), N'4363', N'sem, vitae', CAST(7528.10 AS Decimal(18, 2)), CAST(55 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(49 AS Numeric(18, 0)), N'9219', N'Aliquam tincidunt, nunc', CAST(6353.26 AS Decimal(18, 2)), CAST(13 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(50 AS Numeric(18, 0)), N'7280', N'sollicitudin commodo ipsum. Suspendisse', CAST(8467.60 AS Decimal(18, 2)), CAST(47 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(51 AS Numeric(18, 0)), N'4415', N'cursus in, hendrerit', CAST(6667.89 AS Decimal(18, 2)), CAST(27 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(52 AS Numeric(18, 0)), N'2393', N'molestie sodales.', CAST(8939.49 AS Decimal(18, 2)), CAST(19 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(53 AS Numeric(18, 0)), N'8426', N'ornare sagittis felis. Donec', CAST(2052.88 AS Decimal(18, 2)), CAST(41 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(54 AS Numeric(18, 0)), N'6404', N'Aenean euismod mauris', CAST(8496.57 AS Decimal(18, 2)), CAST(49 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(55 AS Numeric(18, 0)), N'8325', N'dictum eu, eleifend nec,', CAST(9315.36 AS Decimal(18, 2)), CAST(41 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(56 AS Numeric(18, 0)), N'1133', N'Sed eu', CAST(1257.26 AS Decimal(18, 2)), CAST(7 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(57 AS Numeric(18, 0)), N'2466', N'tortor nibh sit amet', CAST(4010.37 AS Decimal(18, 2)), CAST(33 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(58 AS Numeric(18, 0)), N'1374', N'felis, adipiscing', CAST(556.21 AS Decimal(18, 2)), CAST(52 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(59 AS Numeric(18, 0)), N'9814', N'ultricies sem magna', CAST(2634.02 AS Decimal(18, 2)), CAST(39 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(60 AS Numeric(18, 0)), N'4974', N'dis parturient montes,', CAST(2528.72 AS Decimal(18, 2)), CAST(54 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(61 AS Numeric(18, 0)), N'5229', N'nec urna suscipit', CAST(4255.23 AS Decimal(18, 2)), CAST(42 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(62 AS Numeric(18, 0)), N'2056', N'nec, imperdiet', CAST(5866.22 AS Decimal(18, 2)), CAST(42 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(63 AS Numeric(18, 0)), N'8016', N'tincidunt pede', CAST(8022.37 AS Decimal(18, 2)), CAST(6 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(64 AS Numeric(18, 0)), N'3994', N'pede, nonummy ut, molestie', CAST(750.34 AS Decimal(18, 2)), CAST(15 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(65 AS Numeric(18, 0)), N'9015', N'Donec egestas. Aliquam nec', CAST(4456.64 AS Decimal(18, 2)), CAST(21 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(66 AS Numeric(18, 0)), N'7940', N'tempus eu, ligula. Aenean', CAST(4913.56 AS Decimal(18, 2)), CAST(12 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(67 AS Numeric(18, 0)), N'8239', N'Maecenas mi', CAST(8682.89 AS Decimal(18, 2)), CAST(33 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(68 AS Numeric(18, 0)), N'5942', N'quam quis diam. Pellentesque', CAST(4685.22 AS Decimal(18, 2)), CAST(49 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(69 AS Numeric(18, 0)), N'2114', N'neque tellus, imperdiet', CAST(4279.91 AS Decimal(18, 2)), CAST(38 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(70 AS Numeric(18, 0)), N'7223', N'consectetuer euismod est', CAST(467.89 AS Decimal(18, 2)), CAST(37 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(71 AS Numeric(18, 0)), N'6835', N'magnis dis parturient', CAST(4298.83 AS Decimal(18, 2)), CAST(9 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(72 AS Numeric(18, 0)), N'7527', N'sem. Nulla', CAST(1815.41 AS Decimal(18, 2)), CAST(34 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(73 AS Numeric(18, 0)), N'8586', N'sed, est.', CAST(959.45 AS Decimal(18, 2)), CAST(60 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(74 AS Numeric(18, 0)), N'5016', N'Aliquam nisl.', CAST(7111.28 AS Decimal(18, 2)), CAST(19 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(75 AS Numeric(18, 0)), N'7287', N'odio. Aliquam vulputate', CAST(8583.96 AS Decimal(18, 2)), CAST(14 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(76 AS Numeric(18, 0)), N'7649', N'ac arcu.', CAST(7092.06 AS Decimal(18, 2)), CAST(42 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(77 AS Numeric(18, 0)), N'5766', N'ante, iaculis nec,', CAST(8331.26 AS Decimal(18, 2)), CAST(56 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(78 AS Numeric(18, 0)), N'5362', N'Nullam velit dui,', CAST(642.61 AS Decimal(18, 2)), CAST(36 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(79 AS Numeric(18, 0)), N'6617', N'Sed neque. Sed', CAST(7421.20 AS Decimal(18, 2)), CAST(44 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(80 AS Numeric(18, 0)), N'3499', N'ipsum cursus vestibulum.', CAST(3945.58 AS Decimal(18, 2)), CAST(46 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(81 AS Numeric(18, 0)), N'3784', N'Sed malesuada augue', CAST(3798.44 AS Decimal(18, 2)), CAST(15 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(82 AS Numeric(18, 0)), N'3023', N'libero at auctor ullamcorper,', CAST(7205.10 AS Decimal(18, 2)), CAST(32 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(83 AS Numeric(18, 0)), N'7663', N'ullamcorper magna.', CAST(7955.22 AS Decimal(18, 2)), CAST(29 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(84 AS Numeric(18, 0)), N'5511', N'Curabitur dictum. Phasellus in', CAST(6202.36 AS Decimal(18, 2)), CAST(50 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(85 AS Numeric(18, 0)), N'5877', N'tortor, dictum eu,', CAST(4789.15 AS Decimal(18, 2)), CAST(4 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(86 AS Numeric(18, 0)), N'4810', N'auctor vitae,', CAST(7440.62 AS Decimal(18, 2)), CAST(51 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(87 AS Numeric(18, 0)), N'4316', N'fringilla cursus', CAST(2851.55 AS Decimal(18, 2)), CAST(19 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(88 AS Numeric(18, 0)), N'5711', N'erat, eget', CAST(8091.71 AS Decimal(18, 2)), CAST(39 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(89 AS Numeric(18, 0)), N'1605', N'varius ultrices, mauris ipsum', CAST(765.06 AS Decimal(18, 2)), CAST(32 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(90 AS Numeric(18, 0)), N'3622', N'adipiscing lacus.', CAST(7383.97 AS Decimal(18, 2)), CAST(18 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(91 AS Numeric(18, 0)), N'6076', N'faucibus orci', CAST(3203.16 AS Decimal(18, 2)), CAST(60 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(92 AS Numeric(18, 0)), N'6079', N'feugiat non,', CAST(1808.46 AS Decimal(18, 2)), CAST(42 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(93 AS Numeric(18, 0)), N'4217', N'ligula consectetuer rhoncus. Nullam', CAST(3809.15 AS Decimal(18, 2)), CAST(52 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(94 AS Numeric(18, 0)), N'4040', N'sed pede.', CAST(4884.64 AS Decimal(18, 2)), CAST(20 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(95 AS Numeric(18, 0)), N'6341', N'consequat purus. Maecenas', CAST(6665.50 AS Decimal(18, 2)), CAST(44 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(96 AS Numeric(18, 0)), N'1810', N'vel quam', CAST(6756.73 AS Decimal(18, 2)), CAST(4 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(97 AS Numeric(18, 0)), N'5249', N'lacus. Nulla', CAST(1149.52 AS Decimal(18, 2)), CAST(22 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(98 AS Numeric(18, 0)), N'7146', N'orci, adipiscing', CAST(2019.42 AS Decimal(18, 2)), CAST(8 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(99 AS Numeric(18, 0)), N'6228', N'non enim. Mauris quis', CAST(1936.06 AS Decimal(18, 2)), CAST(29 AS Numeric(18, 0)))
GO
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(100 AS Numeric(18, 0)), N'2017', N'Duis mi', CAST(2630.98 AS Decimal(18, 2)), CAST(8 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(101 AS Numeric(18, 0)), N'3333', N'lectus justo', CAST(6126.54 AS Decimal(18, 2)), CAST(10 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(102 AS Numeric(18, 0)), N'9963', N'malesuada vel,', CAST(2466.36 AS Decimal(18, 2)), CAST(8 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(103 AS Numeric(18, 0)), N'9592', N'egestas, urna justo', CAST(8545.69 AS Decimal(18, 2)), CAST(24 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(104 AS Numeric(18, 0)), N'8204', N'tristique aliquet.', CAST(4898.31 AS Decimal(18, 2)), CAST(33 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(105 AS Numeric(18, 0)), N'8839', N'neque sed sem egestas', CAST(9492.65 AS Decimal(18, 2)), CAST(4 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(106 AS Numeric(18, 0)), N'4787', N'mauris. Morbi', CAST(7214.70 AS Decimal(18, 2)), CAST(28 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(107 AS Numeric(18, 0)), N'7089', N'vel, mauris.', CAST(8922.07 AS Decimal(18, 2)), CAST(56 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(108 AS Numeric(18, 0)), N'4821', N'Phasellus at augue id', CAST(2337.53 AS Decimal(18, 2)), CAST(54 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(109 AS Numeric(18, 0)), N'9208', N'condimentum. Donec at arcu.', CAST(7728.79 AS Decimal(18, 2)), CAST(22 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(110 AS Numeric(18, 0)), N'1281', N'augue ut lacus.', CAST(5023.62 AS Decimal(18, 2)), CAST(14 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(111 AS Numeric(18, 0)), N'3604', N'molestie orci', CAST(2336.35 AS Decimal(18, 2)), CAST(52 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(112 AS Numeric(18, 0)), N'8836', N'eu arcu. Morbi', CAST(6756.79 AS Decimal(18, 2)), CAST(28 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(113 AS Numeric(18, 0)), N'8799', N'commodo at,', CAST(6469.42 AS Decimal(18, 2)), CAST(29 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(114 AS Numeric(18, 0)), N'9673', N'mi lacinia mattis. Integer', CAST(3416.03 AS Decimal(18, 2)), CAST(45 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(115 AS Numeric(18, 0)), N'4031', N'ipsum non arcu. Vivamus', CAST(5071.88 AS Decimal(18, 2)), CAST(27 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(116 AS Numeric(18, 0)), N'3320', N'a, magna.', CAST(8076.95 AS Decimal(18, 2)), CAST(49 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(117 AS Numeric(18, 0)), N'1828', N'metus. Aliquam erat', CAST(226.23 AS Decimal(18, 2)), CAST(37 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(118 AS Numeric(18, 0)), N'5165', N'iaculis quis, pede. Praesent', CAST(7581.03 AS Decimal(18, 2)), CAST(26 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(119 AS Numeric(18, 0)), N'3706', N'Vivamus euismod urna.', CAST(4210.74 AS Decimal(18, 2)), CAST(4 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(120 AS Numeric(18, 0)), N'5987', N'arcu vel', CAST(5581.35 AS Decimal(18, 2)), CAST(22 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(121 AS Numeric(18, 0)), N'9144', N'lectus. Nullam suscipit,', CAST(2427.05 AS Decimal(18, 2)), CAST(37 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(122 AS Numeric(18, 0)), N'6242', N'mauris a nunc.', CAST(2004.42 AS Decimal(18, 2)), CAST(12 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(123 AS Numeric(18, 0)), N'6085', N'ipsum. Suspendisse sagittis.', CAST(3357.68 AS Decimal(18, 2)), CAST(8 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(124 AS Numeric(18, 0)), N'1114', N'laoreet posuere, enim nisl', CAST(5036.42 AS Decimal(18, 2)), CAST(38 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(125 AS Numeric(18, 0)), N'1942', N'nisi. Cum', CAST(7301.34 AS Decimal(18, 2)), CAST(26 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(126 AS Numeric(18, 0)), N'4594', N'tempor bibendum. Donec felis', CAST(3656.54 AS Decimal(18, 2)), CAST(19 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(127 AS Numeric(18, 0)), N'9138', N'ornare sagittis felis. Donec', CAST(5703.07 AS Decimal(18, 2)), CAST(56 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(128 AS Numeric(18, 0)), N'5722', N'aliquam iaculis, lacus', CAST(856.10 AS Decimal(18, 2)), CAST(38 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(129 AS Numeric(18, 0)), N'7168', N'felis, adipiscing fringilla, porttitor', CAST(1879.76 AS Decimal(18, 2)), CAST(48 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(130 AS Numeric(18, 0)), N'2640', N'Sed id', CAST(3347.12 AS Decimal(18, 2)), CAST(48 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(131 AS Numeric(18, 0)), N'6779', N'eu, accumsan sed,', CAST(1315.11 AS Decimal(18, 2)), CAST(33 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(132 AS Numeric(18, 0)), N'9268', N'a ultricies adipiscing,', CAST(1865.41 AS Decimal(18, 2)), CAST(17 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(133 AS Numeric(18, 0)), N'3057', N'felis ullamcorper viverra.', CAST(8442.90 AS Decimal(18, 2)), CAST(60 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(134 AS Numeric(18, 0)), N'3301', N'amet massa.', CAST(2801.75 AS Decimal(18, 2)), CAST(9 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(135 AS Numeric(18, 0)), N'5377', N'vel lectus. Cum', CAST(9910.69 AS Decimal(18, 2)), CAST(18 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(136 AS Numeric(18, 0)), N'3337', N'lorem, eget mollis lectus', CAST(8466.97 AS Decimal(18, 2)), CAST(18 AS Numeric(18, 0)))
INSERT [dbo].[Partidas] ([idPartida], [numeroParte], [descripcion], [precio], [idTaller]) VALUES (CAST(137 AS Numeric(18, 0)), N'7255', N'Etiam vestibulum massa rutrum', CAST(4676.83 AS Decimal(18, 2)), CAST(11 AS Numeric(18, 0)))
SET IDENTITY_INSERT [dbo].[Partidas] OFF
SET IDENTITY_INSERT [dbo].[Recordatorios] ON 

INSERT [dbo].[Recordatorios] ([idRecordatorio], [nombreRecordatorio], [fechaRecordatorio], [idAccion]) VALUES (CAST(1 AS Numeric(18, 0)), N'Lavado', CAST(N'2017-05-16 00:00:00.000' AS DateTime), CAST(1 AS Numeric(18, 0)))
SET IDENTITY_INSERT [dbo].[Recordatorios] OFF
SET IDENTITY_INSERT [dbo].[ResponsablesZonas] ON 

INSERT [dbo].[ResponsablesZonas] ([idResponsableZona], [idContratoOperacion], [idUsuario], [idZona], [fechaAsignacion]) VALUES (CAST(1 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(N'2017-06-18 00:00:00.000' AS DateTime))
INSERT [dbo].[ResponsablesZonas] ([idResponsableZona], [idContratoOperacion], [idUsuario], [idZona], [fechaAsignacion]) VALUES (CAST(2 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), CAST(N'2017-06-18 00:00:00.000' AS DateTime))
INSERT [dbo].[ResponsablesZonas] ([idResponsableZona], [idContratoOperacion], [idUsuario], [idZona], [fechaAsignacion]) VALUES (CAST(3 AS Numeric(18, 0)), 1, CAST(2 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), CAST(N'2017-06-18 00:00:00.000' AS DateTime))
SET IDENTITY_INSERT [dbo].[ResponsablesZonas] OFF
SET IDENTITY_INSERT [dbo].[Taller] ON 

INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(1 AS Numeric(18, 0)), N'Dictum Augue Industries', N'499-7127 Cubilia Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(2 AS Numeric(18, 0)), N'Dictum Magna Consulting', N'685-1273 Pede C/')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(3 AS Numeric(18, 0)), N'Purus Foundation', N'351-1097 Sit Avenida')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(4 AS Numeric(18, 0)), N'Fermentum Convallis Ligula Consulting', N'3406 A Avenida')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(5 AS Numeric(18, 0)), N'Eu Arcu Company', N'Apdo.:465-6113 Augue ')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(6 AS Numeric(18, 0)), N'At PC', N'Apartado núm.: 263, 6862 Congue. C/')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(7 AS Numeric(18, 0)), N'Rhoncus Nullam Corp.', N'143-2697 Mus. Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(8 AS Numeric(18, 0)), N'Nonummy Ipsum Corp.', N'844-761 Pulvinar Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(9 AS Numeric(18, 0)), N'Cras LLP', N'322-8106 Id, Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(10 AS Numeric(18, 0)), N'Quisque Institute', N'397-3373 Sed Ctra.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(11 AS Numeric(18, 0)), N'Aliquam Nisl Corporation', N'918-8002 Vitae ')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(12 AS Numeric(18, 0)), N'Pharetra LLP', N'Apdo.:521-7637 Augue Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(13 AS Numeric(18, 0)), N'Placerat Eget Institute', N'616-4238 Ultrices. C/')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(14 AS Numeric(18, 0)), N'Vel Mauris Integer Ltd', N'3981 Tempor Av.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(15 AS Numeric(18, 0)), N'Amet Lorem Foundation', N'5806 Donec Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(16 AS Numeric(18, 0)), N'Venenatis Lacus Etiam Associates', N'1072 Duis C.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(17 AS Numeric(18, 0)), N'Eu Corp.', N'Apartado núm.: 100, 4631 Bibendum Av.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(18 AS Numeric(18, 0)), N'Aliquam Rutrum Lorem Consulting', N'907-8624 At, Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(19 AS Numeric(18, 0)), N'Eu Inc.', N'Apartado núm.: 106, 7019 Gravida ')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(20 AS Numeric(18, 0)), N'Commodo At Inc.', N'Apartado núm.: 757, 3338 Aliquam C/')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(21 AS Numeric(18, 0)), N'Duis Cursus Limited', N'Apdo.:665-2437 At, Carretera')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(22 AS Numeric(18, 0)), N'Viverra Donec Ltd', N'Apartado núm.: 482, 6284 A, Ctra.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(23 AS Numeric(18, 0)), N'Quis Lectus Nullam Industries', N'871-3798 Velit Av.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(24 AS Numeric(18, 0)), N'Metus Vitae Velit Corporation', N'121-8265 Elit ')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(25 AS Numeric(18, 0)), N'Gravida Associates', N'8891 Fusce C/')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(26 AS Numeric(18, 0)), N'Cum Sociis Natoque Ltd', N'Apdo.:317-556 Interdum. C/')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(27 AS Numeric(18, 0)), N'Nam Ligula Consulting', N'Apartado núm.: 438, 5735 Ante ')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(28 AS Numeric(18, 0)), N'Turpis Vitae Purus Company', N'6930 Gravida Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(29 AS Numeric(18, 0)), N'Enim Sit Limited', N'935-9300 Blandit. ')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(30 AS Numeric(18, 0)), N'Eu LLC', N'Apdo.:294-3115 Hendrerit Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(31 AS Numeric(18, 0)), N'Ultricies Sem Consulting', N'949 Massa. Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(32 AS Numeric(18, 0)), N'Turpis Associates', N'Apdo.:907-2192 Arcu Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(33 AS Numeric(18, 0)), N'Semper Erat LLC', N'Apartado núm.: 248, 4097 Neque. ')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(34 AS Numeric(18, 0)), N'Metus Sit Corporation', N'Apartado núm.: 803, 7804 Feugiat Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(35 AS Numeric(18, 0)), N'Dis Corp.', N'Apartado núm.: 914, 5530 Lorem, Ctra.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(36 AS Numeric(18, 0)), N'Iaculis Limited', N'2250 Tempor Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(37 AS Numeric(18, 0)), N'Nec Ligula Corporation', N'Apdo.:220-370 Sed Ctra.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(38 AS Numeric(18, 0)), N'Tellus Nunc Ltd', N'Apartado núm.: 951, 8280 Molestie C.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(39 AS Numeric(18, 0)), N'Morbi Neque Institute', N'Apdo.:742-8897 Enim. Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(40 AS Numeric(18, 0)), N'Diam Company', N'Apartado núm.: 126, 3613 Sed Ctra.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(41 AS Numeric(18, 0)), N'Amet Industries', N'3720 In Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(42 AS Numeric(18, 0)), N'Elit Pede Consulting', N'Apartado núm.: 837, 9642 Sapien Avenida')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(43 AS Numeric(18, 0)), N'Posuere Cubilia Curae; Incorporated', N'170-8723 Eget Av.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(44 AS Numeric(18, 0)), N'Molestie Tellus Corporation', N'Apartado núm.: 225, 7083 Aenean Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(45 AS Numeric(18, 0)), N'Nonummy Ultricies Ornare Foundation', N'Apartado núm.: 279, 8717 Mauris. Calle')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(46 AS Numeric(18, 0)), N'In Lobortis Consulting', N'Apdo.:658-4644 Neque Avenida')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(47 AS Numeric(18, 0)), N'Ipsum Suspendisse PC', N'Apartado núm.: 116, 1298 Adipiscing. Avda.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(48 AS Numeric(18, 0)), N'Bibendum Limited', N'402-9495 Gravida Ctra.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(49 AS Numeric(18, 0)), N'Elit Erat Vitae Foundation', N'Apdo.:903-7583 Mauris Avenida')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(50 AS Numeric(18, 0)), N'Montes Corp.', N'739-9962 Lorem, C.')
INSERT [dbo].[Taller] ([idTaller], [razonSocial], [direccion]) VALUES (CAST(51 AS Numeric(18, 0)), N'Purus Nullam Scelerisque Foundation', N'8389 Blandit. Avenida')
SET IDENTITY_INSERT [dbo].[Taller] OFF
SET IDENTITY_INSERT [dbo].[Token] ON 

INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(170 AS Numeric(18, 0)), N'C63C0345', NULL, N'mi oficina', N'{"modelo":"test desde web"}', CAST(N'2017-05-22 16:51:50.873' AS DateTime), CAST(N'2017-05-22 16:53:50.873' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(171 AS Numeric(18, 0)), N'C63C0345', NULL, N'mi oficina', N'{"modelo":"test desde web"}', CAST(N'2017-05-22 16:52:38.690' AS DateTime), CAST(N'2017-05-22 16:54:38.690' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(172 AS Numeric(18, 0)), N'E583B364', NULL, N'19.3327013:-99.20274649999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-22 17:34:26.370' AS DateTime), CAST(N'2017-05-22 17:36:26.370' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(173 AS Numeric(18, 0)), N'D301F8A8', NULL, N'19.3327013:-99.20274649999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-22 17:36:02.497' AS DateTime), CAST(N'2017-05-22 17:38:02.497' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(174 AS Numeric(18, 0)), N'0A1163C0', NULL, N'19.3327013:-99.20274649999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-22 17:54:27.950' AS DateTime), CAST(N'2017-05-22 17:56:27.950' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(175 AS Numeric(18, 0)), N'CD3A1A96', NULL, N'19.3327013:-99.20274649999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-22 17:59:59.197' AS DateTime), CAST(N'2017-05-22 18:01:59.197' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(176 AS Numeric(18, 0)), N'F5EC6BA3', NULL, N'19.3327013:-99.20274649999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-22 18:01:32.813' AS DateTime), CAST(N'2017-05-22 18:03:32.813' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(177 AS Numeric(18, 0)), N'B6199B8E', NULL, N'19.3327013:-99.20274649999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-22 18:28:43.250' AS DateTime), CAST(N'2017-05-22 18:30:43.250' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(178 AS Numeric(18, 0)), N'536C1048', NULL, N'19.3327013:-99.20274649999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-22 18:29:38.957' AS DateTime), CAST(N'2017-05-22 18:31:38.957' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(179 AS Numeric(18, 0)), N'2568CB65', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 09:44:04.163' AS DateTime), CAST(N'2017-05-23 09:46:04.163' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(180 AS Numeric(18, 0)), N'583AB99C', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 09:44:18.140' AS DateTime), CAST(N'2017-05-23 09:46:18.140' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(181 AS Numeric(18, 0)), N'99FB8D0E', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 09:46:39.820' AS DateTime), CAST(N'2017-05-23 09:48:39.820' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(182 AS Numeric(18, 0)), N'A44EA546', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 09:47:10.063' AS DateTime), CAST(N'2017-05-23 09:49:10.063' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(183 AS Numeric(18, 0)), N'0B3C3E1A', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 09:47:20.263' AS DateTime), CAST(N'2017-05-23 09:49:20.263' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(184 AS Numeric(18, 0)), N'1F97F202', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Apple Safari","fullVersion":"9.0","platform":"iOS iPhone","mobile":true}', CAST(N'2017-05-23 09:50:57.313' AS DateTime), CAST(N'2017-05-23 09:52:57.313' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(185 AS Numeric(18, 0)), N'4C2B989B', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:02:10.167' AS DateTime), CAST(N'2017-05-23 10:04:10.167' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(186 AS Numeric(18, 0)), N'2414D569', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:05:58.513' AS DateTime), CAST(N'2017-05-23 10:07:58.513' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(187 AS Numeric(18, 0)), N'328E7613', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:06:08.190' AS DateTime), CAST(N'2017-05-23 10:08:08.190' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(188 AS Numeric(18, 0)), N'E4E50FEF', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:06:18.620' AS DateTime), CAST(N'2017-05-23 10:08:18.620' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(189 AS Numeric(18, 0)), N'02AD3434', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:08:59.617' AS DateTime), CAST(N'2017-05-23 10:10:59.617' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(190 AS Numeric(18, 0)), N'4CAEFEB8', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:09:35.070' AS DateTime), CAST(N'2017-05-23 10:11:35.070' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(191 AS Numeric(18, 0)), N'BDA11D64', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:09:47.093' AS DateTime), CAST(N'2017-05-23 10:11:47.093' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(192 AS Numeric(18, 0)), N'A983B4F0', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:10:20.030' AS DateTime), CAST(N'2017-05-23 10:12:20.030' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(193 AS Numeric(18, 0)), N'97BEBED7', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Android","mobile":true}', CAST(N'2017-05-23 10:11:05.223' AS DateTime), CAST(N'2017-05-23 10:13:05.223' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(194 AS Numeric(18, 0)), N'68F49CF1', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:11:49.860' AS DateTime), CAST(N'2017-05-23 10:13:49.860' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(195 AS Numeric(18, 0)), N'EAE6CCDF', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:18:19.163' AS DateTime), CAST(N'2017-05-23 10:20:19.163' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(196 AS Numeric(18, 0)), N'DD8B40F9', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:19:15.290' AS DateTime), CAST(N'2017-05-23 10:21:15.290' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(197 AS Numeric(18, 0)), N'4BB9B6D8', NULL, N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:23:14.123' AS DateTime), CAST(N'2017-05-23 10:25:14.123' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(198 AS Numeric(18, 0)), N'BA29AB37', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:24:15.487' AS DateTime), CAST(N'2017-05-23 10:26:15.487' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(199 AS Numeric(18, 0)), N'C8BF8604', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:25:19.890' AS DateTime), CAST(N'2017-05-23 10:27:19.890' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(200 AS Numeric(18, 0)), N'FFA58396', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:25:41.967' AS DateTime), CAST(N'2017-05-23 10:27:41.967' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(201 AS Numeric(18, 0)), N'13A6706D', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:26:19.750' AS DateTime), CAST(N'2017-05-23 10:28:19.750' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(202 AS Numeric(18, 0)), N'A4EB4EDF', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:27:42.477' AS DateTime), CAST(N'2017-05-23 10:29:42.477' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(203 AS Numeric(18, 0)), N'E86198E4', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:30:18.827' AS DateTime), CAST(N'2017-05-23 10:32:18.827' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(204 AS Numeric(18, 0)), N'70B6D5DF', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:32:08.077' AS DateTime), CAST(N'2017-05-23 10:34:08.077' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(205 AS Numeric(18, 0)), N'D148CF26', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:35:03.753' AS DateTime), CAST(N'2017-05-23 10:37:03.753' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(206 AS Numeric(18, 0)), N'ABDF431A', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:35:47.203' AS DateTime), CAST(N'2017-05-23 10:37:47.203' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(207 AS Numeric(18, 0)), N'AEE3D9EC', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:38:09.017' AS DateTime), CAST(N'2017-05-23 10:40:09.017' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(208 AS Numeric(18, 0)), N'917CE6B8', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:38:36.330' AS DateTime), CAST(N'2017-05-23 10:40:36.330' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(209 AS Numeric(18, 0)), N'ADF67DE1', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:43:13.437' AS DateTime), CAST(N'2017-05-23 10:45:13.437' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(210 AS Numeric(18, 0)), N'7CB1AA7D', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:43:37.857' AS DateTime), CAST(N'2017-05-23 10:45:37.857' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(211 AS Numeric(18, 0)), N'BFA632E1', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:44:06.657' AS DateTime), CAST(N'2017-05-23 10:46:06.657' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(212 AS Numeric(18, 0)), N'5A362E68', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:44:38.973' AS DateTime), CAST(N'2017-05-23 10:46:38.973' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(213 AS Numeric(18, 0)), N'2C8C10AA', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:46:05.473' AS DateTime), CAST(N'2017-05-23 10:48:05.473' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(214 AS Numeric(18, 0)), N'FD9F4E56', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:46:58.210' AS DateTime), CAST(N'2017-05-23 10:48:58.210' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(215 AS Numeric(18, 0)), N'AFF72829', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:47:30.263' AS DateTime), CAST(N'2017-05-23 10:49:30.263' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(216 AS Numeric(18, 0)), N'A73A9A6C', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:48:34.760' AS DateTime), CAST(N'2017-05-23 10:50:34.760' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(217 AS Numeric(18, 0)), N'3CCA55A3', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:48:55.760' AS DateTime), CAST(N'2017-05-23 10:50:55.760' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(218 AS Numeric(18, 0)), N'1179FB59', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:49:26.510' AS DateTime), CAST(N'2017-05-23 10:51:26.510' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(219 AS Numeric(18, 0)), N'E21D6458', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:50:07.837' AS DateTime), CAST(N'2017-05-23 10:52:07.837' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(220 AS Numeric(18, 0)), N'0A546558', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:50:51.977' AS DateTime), CAST(N'2017-05-23 10:52:51.977' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(221 AS Numeric(18, 0)), N'6AA8A3C6', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:51:26.857' AS DateTime), CAST(N'2017-05-23 10:53:26.857' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(222 AS Numeric(18, 0)), N'8E30D939', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:52:23.660' AS DateTime), CAST(N'2017-05-23 10:54:23.660' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(223 AS Numeric(18, 0)), N'56E17E1C', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:53:31.323' AS DateTime), CAST(N'2017-05-23 10:55:31.323' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(224 AS Numeric(18, 0)), N'D82D9AEF', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:54:49.430' AS DateTime), CAST(N'2017-05-23 10:56:49.430' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(225 AS Numeric(18, 0)), N'2D8F3430', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:55:08.457' AS DateTime), CAST(N'2017-05-23 10:57:08.457' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(226 AS Numeric(18, 0)), N'7CF2DABF', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:58:31.540' AS DateTime), CAST(N'2017-05-23 11:00:31.540' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(227 AS Numeric(18, 0)), N'60B8E360', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:58:37.107' AS DateTime), CAST(N'2017-05-23 11:00:37.107' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(228 AS Numeric(18, 0)), N'CE17614E', N'tes comentario desde mi equipo', N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 10:59:27.440' AS DateTime), CAST(N'2017-05-23 11:01:27.440' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(229 AS Numeric(18, 0)), N'B18794DB', N'ejemplo desde la web', N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:03:44.287' AS DateTime), CAST(N'2017-05-23 11:05:44.287' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(230 AS Numeric(18, 0)), N'11572083', N'', N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:04:26.330' AS DateTime), CAST(N'2017-05-23 11:06:26.330' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(231 AS Numeric(18, 0)), N'A6C8E10D', N'ejemplo', N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:05:02.100' AS DateTime), CAST(N'2017-05-23 11:07:02.100' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(232 AS Numeric(18, 0)), N'D43AB2E5', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:05:59.347' AS DateTime), CAST(N'2017-05-23 11:07:59.347' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(233 AS Numeric(18, 0)), N'5ADEFA14', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:06:44.237' AS DateTime), CAST(N'2017-05-23 11:08:44.237' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(234 AS Numeric(18, 0)), N'DDF67450', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:06:56.237' AS DateTime), CAST(N'2017-05-23 11:08:56.237' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(235 AS Numeric(18, 0)), N'70232B66', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:08:23.053' AS DateTime), CAST(N'2017-05-23 11:10:23.053' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(236 AS Numeric(18, 0)), N'0C68F323', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:10:33.660' AS DateTime), CAST(N'2017-05-23 11:12:33.660' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(237 AS Numeric(18, 0)), N'1A9B845A', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:10:44.153' AS DateTime), CAST(N'2017-05-23 11:12:44.153' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(238 AS Numeric(18, 0)), N'CE4E65CD', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:11:42.003' AS DateTime), CAST(N'2017-05-23 11:13:42.003' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(239 AS Numeric(18, 0)), N'C7E0558A', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:13:19.640' AS DateTime), CAST(N'2017-05-23 11:15:19.640' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(240 AS Numeric(18, 0)), N'C134A6BF', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:14:15.187' AS DateTime), CAST(N'2017-05-23 11:16:15.187' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(241 AS Numeric(18, 0)), N'CDF5F59C', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:15:05.950' AS DateTime), CAST(N'2017-05-23 11:17:05.950' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(242 AS Numeric(18, 0)), N'A8CAE182', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:15:11.107' AS DateTime), CAST(N'2017-05-23 11:17:11.107' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(243 AS Numeric(18, 0)), N'4EA2ACB8', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:15:15.707' AS DateTime), CAST(N'2017-05-23 11:17:15.707' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(244 AS Numeric(18, 0)), N'31A37886', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:15:21.837' AS DateTime), CAST(N'2017-05-23 11:17:21.837' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(245 AS Numeric(18, 0)), N'DA5A8021', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:19:15.863' AS DateTime), CAST(N'2017-05-23 11:21:15.863' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(246 AS Numeric(18, 0)), N'1D6DF9D9', NULL, N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:20:03.767' AS DateTime), CAST(N'2017-05-23 11:22:03.767' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(247 AS Numeric(18, 0)), N'6E19A879', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:21:25.497' AS DateTime), CAST(N'2017-05-23 11:23:25.497' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(248 AS Numeric(18, 0)), N'58BAED76', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:22:09.320' AS DateTime), CAST(N'2017-05-23 11:24:09.320' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(249 AS Numeric(18, 0)), N'19B1C828', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:22:57.317' AS DateTime), CAST(N'2017-05-23 11:24:57.317' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(250 AS Numeric(18, 0)), N'27F75748', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:23:20.837' AS DateTime), CAST(N'2017-05-23 11:25:20.837' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(251 AS Numeric(18, 0)), N'40BA60DA', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:24:24.907' AS DateTime), CAST(N'2017-05-23 11:26:24.907' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(252 AS Numeric(18, 0)), N'9E856EB7', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:24:57.197' AS DateTime), CAST(N'2017-05-23 11:26:57.197' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(253 AS Numeric(18, 0)), N'BA1503F4', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:25:13.697' AS DateTime), CAST(N'2017-05-23 11:27:13.697' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(254 AS Numeric(18, 0)), N'13430676', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:25:45.773' AS DateTime), CAST(N'2017-05-23 11:27:45.773' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(255 AS Numeric(18, 0)), N'D7360468', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:27:10.167' AS DateTime), CAST(N'2017-05-23 11:29:10.167' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(256 AS Numeric(18, 0)), N'171FF84E', NULL, N'19.3326205:-99.2026978', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 11:27:24.740' AS DateTime), CAST(N'2017-05-23 11:29:24.740' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(257 AS Numeric(18, 0)), N'6085BF57', N'Hoks', N'19.3329179:-99.2027556', N'{"modelo":"XT1563","UUID":"c43a6bc38ae45525","Serial":"ZY222THPT2","Version":"6.0.1","Plataforma":"Android"}', CAST(N'2017-05-23 12:31:41.947' AS DateTime), CAST(N'2017-05-23 12:31:41.947' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(258 AS Numeric(18, 0)), N'BE31778D', N'', N'19.3327135:-99.2027387', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:34:23.730' AS DateTime), CAST(N'2017-05-23 12:36:23.730' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(259 AS Numeric(18, 0)), N'E571AB48', N'', N'19.3327135:-99.2027387', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:35:46.937' AS DateTime), CAST(N'2017-05-23 12:37:46.937' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(260 AS Numeric(18, 0)), N'391FD7D4', N'', N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:46:18.793' AS DateTime), CAST(N'2017-05-23 12:48:18.793' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(261 AS Numeric(18, 0)), N'1075EE4D', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:46:30.877' AS DateTime), CAST(N'2017-05-23 12:48:30.877' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(262 AS Numeric(18, 0)), N'117F3FE0', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:46:39.820' AS DateTime), CAST(N'2017-05-23 12:48:39.820' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(263 AS Numeric(18, 0)), N'8C04ABB2', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:47:22.193' AS DateTime), CAST(N'2017-05-23 12:49:22.193' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(264 AS Numeric(18, 0)), N'8859EC5B', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:47:32.950' AS DateTime), CAST(N'2017-05-23 12:49:32.950' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(265 AS Numeric(18, 0)), N'3E62C09B', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:48:18.993' AS DateTime), CAST(N'2017-05-23 12:50:18.993' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(266 AS Numeric(18, 0)), N'32B4ACE2', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:48:32.967' AS DateTime), CAST(N'2017-05-23 12:50:32.967' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(267 AS Numeric(18, 0)), N'5A8C7837', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:48:40.347' AS DateTime), CAST(N'2017-05-23 12:50:40.347' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(268 AS Numeric(18, 0)), N'DD150CFF', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:49:36.730' AS DateTime), CAST(N'2017-05-23 12:51:36.730' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
GO
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(269 AS Numeric(18, 0)), N'DA75F6D0', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:49:50.060' AS DateTime), CAST(N'2017-05-23 12:51:50.060' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(270 AS Numeric(18, 0)), N'D6C9DA41', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:50:39.773' AS DateTime), CAST(N'2017-05-23 12:52:39.773' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(271 AS Numeric(18, 0)), N'91760C1C', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:50:50.110' AS DateTime), CAST(N'2017-05-23 12:52:50.110' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(272 AS Numeric(18, 0)), N'BBFCE41B', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:51:36.927' AS DateTime), CAST(N'2017-05-23 12:53:36.927' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(273 AS Numeric(18, 0)), N'BEF34D4A', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:52:25.180' AS DateTime), CAST(N'2017-05-23 12:54:25.180' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(274 AS Numeric(18, 0)), N'A0C71EBE', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:52:32.407' AS DateTime), CAST(N'2017-05-23 12:54:32.407' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(275 AS Numeric(18, 0)), N'DAE03219', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:54:03.060' AS DateTime), CAST(N'2017-05-23 12:56:03.060' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(276 AS Numeric(18, 0)), N'BA044CD5', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:54:31.260' AS DateTime), CAST(N'2017-05-23 12:56:31.260' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(277 AS Numeric(18, 0)), N'D1474BAE', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:54:56.547' AS DateTime), CAST(N'2017-05-23 12:56:56.547' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(278 AS Numeric(18, 0)), N'20F7282D', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:56:35.247' AS DateTime), CAST(N'2017-05-23 12:58:35.247' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(279 AS Numeric(18, 0)), N'F67D7819', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:57:05.787' AS DateTime), CAST(N'2017-05-23 12:59:05.787' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(280 AS Numeric(18, 0)), N'8B714E88', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:57:57.867' AS DateTime), CAST(N'2017-05-23 12:59:57.867' AS DateTime), 1, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(281 AS Numeric(18, 0)), N'D80C5938', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:58:31.790' AS DateTime), CAST(N'2017-05-23 13:00:31.790' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(282 AS Numeric(18, 0)), N'6E9E206D', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:58:51.100' AS DateTime), CAST(N'2017-05-23 13:00:51.100' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(283 AS Numeric(18, 0)), N'BEF88FC8', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 12:59:41.163' AS DateTime), CAST(N'2017-05-23 13:01:41.163' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(284 AS Numeric(18, 0)), N'A0E47A44', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:00:13.677' AS DateTime), CAST(N'2017-05-23 13:02:13.677' AS DateTime), 1, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(285 AS Numeric(18, 0)), N'32A54520', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:00:25.587' AS DateTime), CAST(N'2017-05-23 13:02:25.587' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(286 AS Numeric(18, 0)), N'F53A2E69', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:00:45.233' AS DateTime), CAST(N'2017-05-23 13:02:45.233' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(287 AS Numeric(18, 0)), N'B475B1DB', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:01:03.257' AS DateTime), CAST(N'2017-05-23 13:03:03.257' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(288 AS Numeric(18, 0)), N'B2FE8D3D', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:01:27.750' AS DateTime), CAST(N'2017-05-23 13:03:27.750' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(289 AS Numeric(18, 0)), N'1F41EDD6', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:02:35.480' AS DateTime), CAST(N'2017-05-23 13:04:35.480' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(290 AS Numeric(18, 0)), N'9A1E257A', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:02:41.170' AS DateTime), CAST(N'2017-05-23 13:04:41.170' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(291 AS Numeric(18, 0)), N'B685AC64', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:03:39.410' AS DateTime), CAST(N'2017-05-23 13:05:39.410' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(292 AS Numeric(18, 0)), N'B288AAAD', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:03:57.227' AS DateTime), CAST(N'2017-05-23 13:05:57.227' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(293 AS Numeric(18, 0)), N'E2FF19C4', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:04:05.293' AS DateTime), CAST(N'2017-05-23 13:06:05.293' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(294 AS Numeric(18, 0)), N'515682F2', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:04:48.390' AS DateTime), CAST(N'2017-05-23 13:06:48.390' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(295 AS Numeric(18, 0)), N'8F933F6C', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:04:55.720' AS DateTime), CAST(N'2017-05-23 13:06:55.720' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(296 AS Numeric(18, 0)), N'E577B5DB', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:05:11.620' AS DateTime), CAST(N'2017-05-23 13:07:11.620' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(297 AS Numeric(18, 0)), N'C1CE68D8', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:05:23.333' AS DateTime), CAST(N'2017-05-23 13:07:23.333' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(298 AS Numeric(18, 0)), N'6D2A4FEB', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:07:16.180' AS DateTime), CAST(N'2017-05-23 13:09:16.180' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(299 AS Numeric(18, 0)), N'05EE55CD', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:07:22.640' AS DateTime), CAST(N'2017-05-23 13:09:22.640' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(300 AS Numeric(18, 0)), N'36958A05', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:07:43.307' AS DateTime), CAST(N'2017-05-23 13:09:43.307' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(301 AS Numeric(18, 0)), N'664039C1', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:07:53.967' AS DateTime), CAST(N'2017-05-23 13:09:53.967' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(302 AS Numeric(18, 0)), N'B8CE77C7', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:08:06.667' AS DateTime), CAST(N'2017-05-23 13:10:06.667' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(303 AS Numeric(18, 0)), N'D22650DD', N'', N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:10:11.837' AS DateTime), CAST(N'2017-05-23 13:12:11.837' AS DateTime), 5, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(304 AS Numeric(18, 0)), N'93C36F93', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:10:20.073' AS DateTime), CAST(N'2017-05-23 13:12:20.073' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(305 AS Numeric(18, 0)), N'8879DFAC', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:10:29.177' AS DateTime), CAST(N'2017-05-23 13:12:29.177' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(306 AS Numeric(18, 0)), N'6CDE6144', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:11:02.360' AS DateTime), CAST(N'2017-05-23 13:13:02.360' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(307 AS Numeric(18, 0)), N'6D4112ED', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:11:10.277' AS DateTime), CAST(N'2017-05-23 13:13:10.277' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(308 AS Numeric(18, 0)), N'CEEFD99B', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:11:16.870' AS DateTime), CAST(N'2017-05-23 13:13:16.870' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(309 AS Numeric(18, 0)), N'D2836E54', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:12:27.847' AS DateTime), CAST(N'2017-05-23 13:14:27.847' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(310 AS Numeric(18, 0)), N'1CFD9FA2', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:12:44.840' AS DateTime), CAST(N'2017-05-23 13:14:44.840' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(311 AS Numeric(18, 0)), N'0C772A28', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:12:57.323' AS DateTime), CAST(N'2017-05-23 13:14:57.323' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(312 AS Numeric(18, 0)), N'05D6D76D', N'', N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:14:03.173' AS DateTime), CAST(N'2017-05-23 13:16:03.173' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(313 AS Numeric(18, 0)), N'5463976C', N'', N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:14:11.520' AS DateTime), CAST(N'2017-05-23 13:16:11.520' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(314 AS Numeric(18, 0)), N'F51C61E2', N'', N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:15:56.337' AS DateTime), CAST(N'2017-05-23 13:17:56.337' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(315 AS Numeric(18, 0)), N'E697D315', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:16:10.453' AS DateTime), CAST(N'2017-05-23 13:18:10.453' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(316 AS Numeric(18, 0)), N'A1844A0A', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:16:17.270' AS DateTime), CAST(N'2017-05-23 13:18:17.270' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(317 AS Numeric(18, 0)), N'D174B065', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:19:16.180' AS DateTime), CAST(N'2017-05-23 13:21:16.180' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(318 AS Numeric(18, 0)), N'02DB8B3A', N'', N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:20:17.237' AS DateTime), CAST(N'2017-05-23 13:22:17.237' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(319 AS Numeric(18, 0)), N'68EB26D9', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:22:25.737' AS DateTime), CAST(N'2017-05-23 13:24:25.737' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(320 AS Numeric(18, 0)), N'6A042B80', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:24:13.540' AS DateTime), CAST(N'2017-05-23 13:26:13.540' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(321 AS Numeric(18, 0)), N'27BD65FA', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:24:54.727' AS DateTime), CAST(N'2017-05-23 13:26:54.727' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(322 AS Numeric(18, 0)), N'A591AC2A', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:25:54.987' AS DateTime), CAST(N'2017-05-23 13:27:54.987' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(323 AS Numeric(18, 0)), N'C65E176C', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:26:16.307' AS DateTime), CAST(N'2017-05-23 13:28:16.307' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(324 AS Numeric(18, 0)), N'D6736184', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:26:30.503' AS DateTime), CAST(N'2017-05-23 13:28:30.503' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(325 AS Numeric(18, 0)), N'E3B0C27D', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:26:40.820' AS DateTime), CAST(N'2017-05-23 13:28:40.820' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(326 AS Numeric(18, 0)), N'6333CCD3', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:26:45.677' AS DateTime), CAST(N'2017-05-23 13:28:45.677' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(327 AS Numeric(18, 0)), N'7635C025', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:30:16.677' AS DateTime), CAST(N'2017-05-23 13:32:16.677' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(328 AS Numeric(18, 0)), N'BCE4BD87', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:31:27.483' AS DateTime), CAST(N'2017-05-23 14:31:27.483' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(329 AS Numeric(18, 0)), N'CDD7E34B', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:31:52.110' AS DateTime), CAST(N'2017-05-23 14:31:52.110' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(330 AS Numeric(18, 0)), N'089784BF', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:32:02.767' AS DateTime), CAST(N'2017-05-23 14:32:02.767' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(331 AS Numeric(18, 0)), N'33FCEABB', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:32:08.343' AS DateTime), CAST(N'2017-05-23 14:32:08.343' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(332 AS Numeric(18, 0)), N'F284E729', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:32:22.710' AS DateTime), CAST(N'2017-05-23 14:32:22.710' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(333 AS Numeric(18, 0)), N'EE58202C', N'', N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:34:31.993' AS DateTime), CAST(N'2017-05-23 14:34:31.993' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(334 AS Numeric(18, 0)), N'7FE13A98', N'', N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:35:50.760' AS DateTime), CAST(N'2017-05-23 14:35:50.760' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(335 AS Numeric(18, 0)), N'4C0854C3', N'', N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:37:20.270' AS DateTime), CAST(N'2017-05-23 14:37:20.270' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(336 AS Numeric(18, 0)), N'5C3377DA', NULL, N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:37:38.393' AS DateTime), CAST(N'2017-05-23 14:37:38.393' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(337 AS Numeric(18, 0)), N'581220D4', NULL, N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:41:43.970' AS DateTime), CAST(N'2017-05-23 14:41:43.970' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(338 AS Numeric(18, 0)), N'031BEAD6', NULL, N'19.3326524:-99.20270160000001', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:43:23.280' AS DateTime), CAST(N'2017-05-23 14:43:23.280' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(339 AS Numeric(18, 0)), N'8C06D251', NULL, N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 13:45:16.880' AS DateTime), CAST(N'2017-05-23 14:45:16.880' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(340 AS Numeric(18, 0)), N'0AE9C320', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:01:20.997' AS DateTime), CAST(N'2017-05-23 15:01:20.997' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(341 AS Numeric(18, 0)), N'E94AEB8A', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:01:48.527' AS DateTime), CAST(N'2017-05-23 15:01:48.527' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(342 AS Numeric(18, 0)), N'69C31250', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:02:05.157' AS DateTime), CAST(N'2017-05-23 15:02:05.157' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(343 AS Numeric(18, 0)), N'EEDBE978', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:03:34.187' AS DateTime), CAST(N'2017-05-23 15:03:34.187' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(344 AS Numeric(18, 0)), N'8DD6227C', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:04:19.443' AS DateTime), CAST(N'2017-05-23 15:04:19.443' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(345 AS Numeric(18, 0)), N'DAD10123', NULL, N'', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:04:49.227' AS DateTime), CAST(N'2017-05-23 15:04:49.227' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(346 AS Numeric(18, 0)), N'F336E884', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:05:04.593' AS DateTime), CAST(N'2017-05-23 15:05:04.593' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(347 AS Numeric(18, 0)), N'FAED18D5', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:07:14.277' AS DateTime), CAST(N'2017-05-23 15:07:14.277' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(348 AS Numeric(18, 0)), N'C9E7B5CD', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:07:27.243' AS DateTime), CAST(N'2017-05-23 15:07:27.243' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(349 AS Numeric(18, 0)), N'32200C56', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:07:59.197' AS DateTime), CAST(N'2017-05-23 15:07:59.197' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(350 AS Numeric(18, 0)), N'09946466', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:08:34.933' AS DateTime), CAST(N'2017-05-23 15:08:34.933' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(351 AS Numeric(18, 0)), N'C70F7B48', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:09:20.633' AS DateTime), CAST(N'2017-05-23 15:09:20.633' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(352 AS Numeric(18, 0)), N'0782A3FB', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:09:51.770' AS DateTime), CAST(N'2017-05-23 15:09:51.770' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(353 AS Numeric(18, 0)), N'68A85B6D', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:10:40.570' AS DateTime), CAST(N'2017-05-23 15:10:40.570' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(354 AS Numeric(18, 0)), N'4911C616', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:11:44.040' AS DateTime), CAST(N'2017-05-23 15:11:44.040' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(355 AS Numeric(18, 0)), N'9C206780', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:11:51.810' AS DateTime), CAST(N'2017-05-23 15:11:51.810' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(356 AS Numeric(18, 0)), N'E60484EC', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:12:20.613' AS DateTime), CAST(N'2017-05-23 15:12:20.613' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(357 AS Numeric(18, 0)), N'26E8400B', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:12:58.893' AS DateTime), CAST(N'2017-05-23 15:12:58.893' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(358 AS Numeric(18, 0)), N'DEC8E75F', NULL, N'19.332823899999998:-99.20274669999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 14:14:18.703' AS DateTime), CAST(N'2017-05-23 15:14:18.703' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(359 AS Numeric(18, 0)), N'7C96A0E6', NULL, N'19.332876:-99.20271989999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 15:35:20.770' AS DateTime), CAST(N'2017-05-23 16:35:20.770' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(360 AS Numeric(18, 0)), N'43814F56', NULL, N'19.332876:-99.20271989999999', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 15:35:57.240' AS DateTime), CAST(N'2017-05-23 15:37:57.240' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(361 AS Numeric(18, 0)), N'8E20F24E', NULL, N'19.332884:-99.2027394', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 15:49:13.317' AS DateTime), CAST(N'2017-05-23 15:51:13.317' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, NULL)
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(362 AS Numeric(18, 0)), N'47CED484', NULL, N'19.332884:-99.2027394', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 15:56:35.123' AS DateTime), CAST(N'2017-05-23 15:58:35.123' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 0, N'web')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(363 AS Numeric(18, 0)), N'EB48DC8D', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:04:02.703' AS DateTime), CAST(N'2017-05-23 16:04:02.703' AS DateTime), NULL, CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), 6, 1, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(364 AS Numeric(18, 0)), N'8E786B4A', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:05:34.360' AS DateTime), CAST(N'2017-05-23 16:05:34.360' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(365 AS Numeric(18, 0)), N'0A36302B', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:10:17.720' AS DateTime), CAST(N'2017-05-23 16:10:17.720' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(366 AS Numeric(18, 0)), N'04D1D3D9', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:11:50.787' AS DateTime), CAST(N'2017-05-23 16:11:50.787' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(367 AS Numeric(18, 0)), N'9577B14B', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:13:03.877' AS DateTime), CAST(N'2017-05-23 16:13:03.877' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(368 AS Numeric(18, 0)), N'FDAF71E2', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:19:32.070' AS DateTime), CAST(N'2017-05-23 16:19:32.070' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
GO
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(369 AS Numeric(18, 0)), N'727E0E23', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:20:09.580' AS DateTime), CAST(N'2017-05-23 16:20:09.580' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(370 AS Numeric(18, 0)), N'DB6E4338', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:20:34.397' AS DateTime), CAST(N'2017-05-23 16:20:34.397' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(371 AS Numeric(18, 0)), N'676DDA48', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:20:54.590' AS DateTime), CAST(N'2017-05-23 16:20:54.590' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(372 AS Numeric(18, 0)), N'10430DC6', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:21:34.047' AS DateTime), CAST(N'2017-05-23 16:21:34.047' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(373 AS Numeric(18, 0)), N'4966969A', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:22:29.947' AS DateTime), CAST(N'2017-05-23 16:22:29.947' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(374 AS Numeric(18, 0)), N'2EC0A3FE', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:23:40.970' AS DateTime), CAST(N'2017-05-23 16:23:40.970' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(375 AS Numeric(18, 0)), N'C45D3C16', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:25:17.007' AS DateTime), CAST(N'2017-05-23 16:25:17.007' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(376 AS Numeric(18, 0)), N'3D216027', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:25:43.247' AS DateTime), CAST(N'2017-05-23 16:25:43.247' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(377 AS Numeric(18, 0)), N'B22F8A26', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:26:48.040' AS DateTime), CAST(N'2017-05-23 16:26:48.040' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(378 AS Numeric(18, 0)), N'D49CBD53', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:27:48.707' AS DateTime), CAST(N'2017-05-23 16:27:48.707' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(379 AS Numeric(18, 0)), N'9AC36BA1', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:28:09.670' AS DateTime), CAST(N'2017-05-23 16:28:09.670' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(380 AS Numeric(18, 0)), N'915753D1', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:28:46.237' AS DateTime), CAST(N'2017-05-23 16:28:46.237' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(381 AS Numeric(18, 0)), N'DC3FDE19', N'', N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:29:18.080' AS DateTime), CAST(N'2017-05-23 16:29:18.080' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(382 AS Numeric(18, 0)), N'65082A28', NULL, N'19.332811799999998:-99.2026583', N'{"modelo":null,"UUID":null,"Serial":null,"Version":null,"Plataforma":null}', CAST(N'2017-05-23 16:30:24.840' AS DateTime), CAST(N'2017-05-23 16:30:24.840' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(383 AS Numeric(18, 0)), N'A7A11930', N'', N'19.3329179:-99.2027556', N'{"modelo":"SM-A710M","UUID":"8bffa1fd58ce3542","Serial":"3300d9534a67a205","Version":"5.1.1","Plataforma":"Android"}', CAST(N'2017-05-23 16:45:50.753' AS DateTime), CAST(N'2017-05-23 16:45:50.753' AS DateTime), 4, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(384 AS Numeric(18, 0)), N'2BDDF36F', N'', N'19.3325088:-99.2027904', N'{"modelo":"SM-A710M","UUID":"8bffa1fd58ce3542","Serial":"3300d9534a67a205","Version":"5.1.1","Plataforma":"Android"}', CAST(N'2017-05-23 17:16:20.063' AS DateTime), CAST(N'2017-05-23 17:16:20.063' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(385 AS Numeric(18, 0)), N'15460E44', N'', N'19.3329179:-99.2027556', N'{"modelo":"SM-A710M","UUID":"8bffa1fd58ce3542","Serial":"3300d9534a67a205","Version":"5.1.1","Plataforma":"Android"}', CAST(N'2017-05-23 17:21:33.217' AS DateTime), CAST(N'2017-05-23 17:21:33.217' AS DateTime), 2, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'mobile')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(386 AS Numeric(18, 0)), N'02A951AA', NULL, N'19.332835600000003:-99.2026011', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 17:26:07.900' AS DateTime), CAST(N'2017-05-23 17:28:07.900' AS DateTime), NULL, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 0, N'web')
INSERT [dbo].[Token] ([idToken], [token], [comentariosToken], [ubicacionToken], [datosMovil], [fechaHora], [vigenciaToken], [calificacionToken], [idUsuario], [idOrdenServicio], [idEstatusOrden], [estatusToken], [origenToken]) VALUES (CAST(387 AS Numeric(18, 0)), N'74213AFB', N'', N'19.332835600000003:-99.2026011', N'{"fullName":"Google Chrome","fullVersion":"58.0.3029.110","platform":"Windows 7","mobile":false}', CAST(N'2017-05-23 17:28:30.257' AS DateTime), CAST(N'2017-05-23 17:30:30.257' AS DateTime), 3, CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), 7, 1, N'web')
SET IDENTITY_INSERT [dbo].[Token] OFF
SET IDENTITY_INSERT [dbo].[TokenKPI] ON 

INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(82 AS Numeric(18, 0)), CAST(228 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(83 AS Numeric(18, 0)), CAST(229 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(84 AS Numeric(18, 0)), CAST(229 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(85 AS Numeric(18, 0)), CAST(229 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(86 AS Numeric(18, 0)), CAST(229 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(87 AS Numeric(18, 0)), CAST(229 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(88 AS Numeric(18, 0)), CAST(230 AS Numeric(18, 0)), CAST(6 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(89 AS Numeric(18, 0)), CAST(230 AS Numeric(18, 0)), CAST(7 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(90 AS Numeric(18, 0)), CAST(230 AS Numeric(18, 0)), CAST(8 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(91 AS Numeric(18, 0)), CAST(230 AS Numeric(18, 0)), CAST(9 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(92 AS Numeric(18, 0)), CAST(230 AS Numeric(18, 0)), CAST(10 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(93 AS Numeric(18, 0)), CAST(231 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(94 AS Numeric(18, 0)), CAST(231 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(95 AS Numeric(18, 0)), CAST(231 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(96 AS Numeric(18, 0)), CAST(257 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(97 AS Numeric(18, 0)), CAST(257 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(98 AS Numeric(18, 0)), CAST(258 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(99 AS Numeric(18, 0)), CAST(260 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(100 AS Numeric(18, 0)), CAST(261 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(101 AS Numeric(18, 0)), CAST(262 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(102 AS Numeric(18, 0)), CAST(263 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(103 AS Numeric(18, 0)), CAST(264 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(104 AS Numeric(18, 0)), CAST(265 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(105 AS Numeric(18, 0)), CAST(266 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(106 AS Numeric(18, 0)), CAST(316 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(107 AS Numeric(18, 0)), CAST(317 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(108 AS Numeric(18, 0)), CAST(384 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[TokenKPI] ([idTokenKpi], [idToken], [idCatalogoKpi]) VALUES (CAST(109 AS Numeric(18, 0)), CAST(387 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
SET IDENTITY_INSERT [dbo].[TokenKPI] OFF
SET IDENTITY_INSERT [dbo].[Unidades] ON 

INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(1 AS Numeric(18, 0)), N'1633010407099', N'16260516-4892', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(2 AS Numeric(18, 0)), N'1631070183299', N'16691021-8152', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(3 AS Numeric(18, 0)), N'1674082674099', N'16080618-1293', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(4 AS Numeric(18, 0)), N'1605062222899', N'16941118-0756', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(5 AS Numeric(18, 0)), N'1632012972999', N'16391201-2626', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(6 AS Numeric(18, 0)), N'1605111656899', N'16780105-1793', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(7 AS Numeric(18, 0)), N'1649050916099', N'16390913-2007', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(8 AS Numeric(18, 0)), N'1605110425699', N'16310816-7028', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(9 AS Numeric(18, 0)), N'1693100750199', N'16600424-1714', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(10 AS Numeric(18, 0)), N'1668112020799', N'16530121-4382', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(11 AS Numeric(18, 0)), N'1662010420899', N'16421107-4861', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(12 AS Numeric(18, 0)), N'1652113037299', N'16891024-1911', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(13 AS Numeric(18, 0)), N'1673091438999', N'16991004-5799', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(14 AS Numeric(18, 0)), N'1608050639199', N'16140808-3606', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(15 AS Numeric(18, 0)), N'1667091805699', N'16830808-1507', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(16 AS Numeric(18, 0)), N'1698102801099', N'16091222-3864', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(17 AS Numeric(18, 0)), N'1674072067099', N'16920102-7225', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(18 AS Numeric(18, 0)), N'1634060811999', N'16810221-1581', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(19 AS Numeric(18, 0)), N'1676071218599', N'16740627-3354', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(20 AS Numeric(18, 0)), N'1679013086399', N'16380517-1513', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(21 AS Numeric(18, 0)), N'1679101635999', N'16310606-1165', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(22 AS Numeric(18, 0)), N'1632091334199', N'16470826-6988', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(23 AS Numeric(18, 0)), N'1643032275799', N'16450121-9044', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(24 AS Numeric(18, 0)), N'1638112340499', N'16121120-7665', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(25 AS Numeric(18, 0)), N'1638021304099', N'16830121-8957', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(26 AS Numeric(18, 0)), N'1646021698899', N'16190920-1889', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(27 AS Numeric(18, 0)), N'1670020698499', N'16770318-7679', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(28 AS Numeric(18, 0)), N'1645042668799', N'16681122-3376', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(29 AS Numeric(18, 0)), N'1642011513199', N'16520213-7625', NULL, CAST(1 AS Numeric(18, 0)), 0, 3, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(30 AS Numeric(18, 0)), N'1695021676599', N'16730304-1441', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(31 AS Numeric(18, 0)), N'1680082218399', N'16190118-5619', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(32 AS Numeric(18, 0)), N'1654090446599', N'16040302-4920', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(33 AS Numeric(18, 0)), N'1643052194499', N'16010403-3261', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(34 AS Numeric(18, 0)), N'1614032842599', N'16450105-1934', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(35 AS Numeric(18, 0)), N'1686030421099', N'16930703-0701', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(36 AS Numeric(18, 0)), N'1603072979499', N'16891216-2313', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(37 AS Numeric(18, 0)), N'1662122518099', N'16010716-8247', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(38 AS Numeric(18, 0)), N'1693020452099', N'16350903-6574', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(39 AS Numeric(18, 0)), N'1633062588799', N'16490611-8221', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(40 AS Numeric(18, 0)), N'1632070212099', N'16800726-1483', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(41 AS Numeric(18, 0)), N'1609011143699', N'16401111-8884', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(42 AS Numeric(18, 0)), N'1692092212499', N'16170917-4468', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(43 AS Numeric(18, 0)), N'1648111060099', N'16820120-8538', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(44 AS Numeric(18, 0)), N'1695042736399', N'16610604-5195', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(45 AS Numeric(18, 0)), N'1675032694999', N'16380525-6504', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(46 AS Numeric(18, 0)), N'1696100538199', N'16600930-3311', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(47 AS Numeric(18, 0)), N'1683050662999', N'16040314-6467', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(48 AS Numeric(18, 0)), N'1628082478899', N'16930913-5524', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(49 AS Numeric(18, 0)), N'1682061978099', N'16031108-8157', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(50 AS Numeric(18, 0)), N'1686021889999', N'16120615-5549', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(51 AS Numeric(18, 0)), N'1624100271699', N'16941227-8864', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(52 AS Numeric(18, 0)), N'1623051260599', N'16780425-5292', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(53 AS Numeric(18, 0)), N'1652011093899', N'16690903-6110', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(54 AS Numeric(18, 0)), N'1688112297799', N'16040715-4525', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(55 AS Numeric(18, 0)), N'1679112321899', N'16930407-7051', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(56 AS Numeric(18, 0)), N'1618102987799', N'16460820-9633', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(57 AS Numeric(18, 0)), N'1694102411899', N'16740214-8782', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(58 AS Numeric(18, 0)), N'1640123097999', N'16631123-1671', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(59 AS Numeric(18, 0)), N'1686111174999', N'16380607-7115', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(60 AS Numeric(18, 0)), N'1606092006299', N'16200429-4027', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(61 AS Numeric(18, 0)), N'1601112409299', N'16520328-1679', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(62 AS Numeric(18, 0)), N'1670021094199', N'16890219-4839', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(63 AS Numeric(18, 0)), N'1667050674999', N'16611229-5628', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(64 AS Numeric(18, 0)), N'1625010603399', N'16391216-3379', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(65 AS Numeric(18, 0)), N'1627041997199', N'16780414-9099', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(66 AS Numeric(18, 0)), N'1613091805399', N'16280827-4613', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(67 AS Numeric(18, 0)), N'1638032128699', N'16420406-1891', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(68 AS Numeric(18, 0)), N'1637081170299', N'16630909-9684', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(69 AS Numeric(18, 0)), N'1661010502899', N'16340624-9023', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(70 AS Numeric(18, 0)), N'1693051303199', N'16890729-7991', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(71 AS Numeric(18, 0)), N'1652081525899', N'16711215-7115', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(72 AS Numeric(18, 0)), N'1682111051799', N'16460508-0482', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(73 AS Numeric(18, 0)), N'1632060652999', N'16500820-5899', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(74 AS Numeric(18, 0)), N'1655070136999', N'16850528-8251', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(75 AS Numeric(18, 0)), N'1634101251699', N'16890327-5884', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(76 AS Numeric(18, 0)), N'1682080512999', N'16450214-3177', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(77 AS Numeric(18, 0)), N'1608071533499', N'16501210-3320', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(78 AS Numeric(18, 0)), N'1600031098299', N'16470408-0425', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(79 AS Numeric(18, 0)), N'1632082752399', N'16510128-0856', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(80 AS Numeric(18, 0)), N'1695081100499', N'16400918-3916', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(81 AS Numeric(18, 0)), N'1697012506499', N'16110207-8068', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(82 AS Numeric(18, 0)), N'1668020950999', N'16101228-1273', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(83 AS Numeric(18, 0)), N'1621121544999', N'16200307-5336', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(84 AS Numeric(18, 0)), N'1693061394499', N'16271108-7771', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(85 AS Numeric(18, 0)), N'1638120852999', N'16230710-7298', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(86 AS Numeric(18, 0)), N'1627011694199', N'16270607-0709', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(87 AS Numeric(18, 0)), N'1646123019399', N'16351109-5006', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(88 AS Numeric(18, 0)), N'1670111039599', N'16340811-7483', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(89 AS Numeric(18, 0)), N'1617010311799', N'16050529-7531', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(90 AS Numeric(18, 0)), N'1654061015299', N'16630811-7107', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(91 AS Numeric(18, 0)), N'1616052747599', N'16070208-2512', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(92 AS Numeric(18, 0)), N'1643062941099', N'16540823-2873', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(93 AS Numeric(18, 0)), N'1625081916499', N'16930404-4903', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(94 AS Numeric(18, 0)), N'1652022485399', N'16031212-8234', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(95 AS Numeric(18, 0)), N'1698101364199', N'16500205-2834', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(96 AS Numeric(18, 0)), N'1604082997299', N'16520729-0494', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(97 AS Numeric(18, 0)), N'1694111277199', N'16140509-0240', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(98 AS Numeric(18, 0)), N'1619102246099', N'16040701-4950', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(99 AS Numeric(18, 0)), N'1634081792599', N'16141021-7291', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
GO
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(100 AS Numeric(18, 0)), N'1688062985999', N'16521127-2744', NULL, CAST(1 AS Numeric(18, 0)), 0, 2, NULL)
INSERT [dbo].[Unidades] ([idUnidad], [numeroEconomico], [vin], [gps], [idTipoUnidad], [sustituto], [idOperacion], [idCentroTrabajo]) VALUES (CAST(101 AS Numeric(18, 0)), N'23456', N'34567', NULL, NULL, 0, 10, NULL)
SET IDENTITY_INSERT [dbo].[Unidades] OFF
SET IDENTITY_INSERT [dbo].[Usuarios] ON 

INSERT [dbo].[Usuarios] ([idUsuario], [nombreUsuario], [contrasenia], [idCatalogoTipoUsuarios], [nombreCompleto], [correoElectronico], [telefonoUsuario], [extensionUsuario], [empresa]) VALUES (CAST(1 AS Numeric(18, 0)), N'Cliente1', N'qwerty', 1, N'Jose', NULL, NULL, NULL, NULL)
INSERT [dbo].[Usuarios] ([idUsuario], [nombreUsuario], [contrasenia], [idCatalogoTipoUsuarios], [nombreCompleto], [correoElectronico], [telefonoUsuario], [extensionUsuario], [empresa]) VALUES (CAST(2 AS Numeric(18, 0)), N'Admin1', N'1234567890', 2, N'Pedro ', NULL, NULL, NULL, NULL)
INSERT [dbo].[Usuarios] ([idUsuario], [nombreUsuario], [contrasenia], [idCatalogoTipoUsuarios], [nombreCompleto], [correoElectronico], [telefonoUsuario], [extensionUsuario], [empresa]) VALUES (CAST(3 AS Numeric(18, 0)), N'Eje1', N'12345', 1, N'Luis', N'', NULL, NULL, NULL)
INSERT [dbo].[Usuarios] ([idUsuario], [nombreUsuario], [contrasenia], [idCatalogoTipoUsuarios], [nombreCompleto], [correoElectronico], [telefonoUsuario], [extensionUsuario], [empresa]) VALUES (CAST(4 AS Numeric(18, 0)), N'Eje2', N'12345', 1, N'Carlos', NULL, NULL, NULL, NULL)
INSERT [dbo].[Usuarios] ([idUsuario], [nombreUsuario], [contrasenia], [idCatalogoTipoUsuarios], [nombreCompleto], [correoElectronico], [telefonoUsuario], [extensionUsuario], [empresa]) VALUES (CAST(5 AS Numeric(18, 0)), N'Eje3', N'12345', 1, N'Jorge', NULL, NULL, NULL, NULL)
SET IDENTITY_INSERT [dbo].[Usuarios] OFF
ALTER TABLE [dbo].[Acciones]  WITH CHECK ADD  CONSTRAINT [FK_Acciones_EstatusAccion] FOREIGN KEY([idEstatusAccion])
REFERENCES [dbo].[EstatusAccion] ([idEstatusAccion])
GO
ALTER TABLE [dbo].[Acciones] CHECK CONSTRAINT [FK_Acciones_EstatusAccion]
GO
ALTER TABLE [dbo].[Acciones]  WITH CHECK ADD  CONSTRAINT [FK_Acciones_Ordenes] FOREIGN KEY([idOrden])
REFERENCES [dbo].[Ordenes] ([idOrden])
GO
ALTER TABLE [dbo].[Acciones] CHECK CONSTRAINT [FK_Acciones_Ordenes]
GO
ALTER TABLE [dbo].[Acciones]  WITH CHECK ADD  CONSTRAINT [FK_Acciones_Usuarios] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[Acciones] CHECK CONSTRAINT [FK_Acciones_Usuarios]
GO
ALTER TABLE [dbo].[Aprobaciones]  WITH CHECK ADD  CONSTRAINT [FK_Aprobaciones_EstatusAprobaciones] FOREIGN KEY([idEstatusAprobacion])
REFERENCES [dbo].[EstatusAprobaciones] ([idEstatusAprobacion])
GO
ALTER TABLE [dbo].[Aprobaciones] CHECK CONSTRAINT [FK_Aprobaciones_EstatusAprobaciones]
GO
ALTER TABLE [dbo].[Aprobaciones]  WITH CHECK ADD  CONSTRAINT [FK_Aprobaciones_OrdenesServicios] FOREIGN KEY([idOrdenServicio])
REFERENCES [dbo].[Ordenes] ([idOrden])
GO
ALTER TABLE [dbo].[Aprobaciones] CHECK CONSTRAINT [FK_Aprobaciones_OrdenesServicios]
GO
ALTER TABLE [dbo].[AprobacionRespuesta]  WITH CHECK ADD  CONSTRAINT [FK_AprobacionRespuesta_Aprobaciones] FOREIGN KEY([idAprobacion])
REFERENCES [dbo].[Aprobaciones] ([idAprobacion])
GO
ALTER TABLE [dbo].[AprobacionRespuesta] CHECK CONSTRAINT [FK_AprobacionRespuesta_Aprobaciones]
GO
ALTER TABLE [dbo].[AutorizacionCotizacion]  WITH CHECK ADD  CONSTRAINT [FK_AutorizacionCotizacion_Cotizaciones] FOREIGN KEY([idCotizacion])
REFERENCES [dbo].[Cotizaciones] ([idCotizacion])
GO
ALTER TABLE [dbo].[AutorizacionCotizacion] CHECK CONSTRAINT [FK_AutorizacionCotizacion_Cotizaciones]
GO
ALTER TABLE [dbo].[CatalogoDetalleModulo]  WITH CHECK ADD  CONSTRAINT [FK_CatalogoDetalleModulo_CatalogoModulos] FOREIGN KEY([idCatalogoModulos])
REFERENCES [dbo].[CatalogoModulos] ([idCatalogoModulos])
GO
ALTER TABLE [dbo].[CatalogoDetalleModulo] CHECK CONSTRAINT [FK_CatalogoDetalleModulo_CatalogoModulos]
GO
ALTER TABLE [dbo].[CentroTrabajos]  WITH CHECK ADD  CONSTRAINT [FK_CentroTrabajos_Operaciones] FOREIGN KEY([idOperacion])
REFERENCES [dbo].[Operaciones] ([idOperacion])
GO
ALTER TABLE [dbo].[CentroTrabajos] CHECK CONSTRAINT [FK_CentroTrabajos_Operaciones]
GO
ALTER TABLE [dbo].[ContratoOperacion]  WITH CHECK ADD  CONSTRAINT [FK_EmpresaClienteOperacion_Operaciones] FOREIGN KEY([idOperacion])
REFERENCES [dbo].[Operaciones] ([idOperacion])
GO
ALTER TABLE [dbo].[ContratoOperacion] CHECK CONSTRAINT [FK_EmpresaClienteOperacion_Operaciones]
GO
ALTER TABLE [dbo].[ContratoOperacionUsuario]  WITH CHECK ADD  CONSTRAINT [FK_ContratoOperacionUsuario_CatalogoRoles] FOREIGN KEY([idCatalogoRol])
REFERENCES [dbo].[CatalogoRoles] ([idCatalogoRol])
GO
ALTER TABLE [dbo].[ContratoOperacionUsuario] CHECK CONSTRAINT [FK_ContratoOperacionUsuario_CatalogoRoles]
GO
ALTER TABLE [dbo].[ContratoOperacionUsuario]  WITH CHECK ADD  CONSTRAINT [FK_ContratoOperacionUsuario_ContratoOperacion] FOREIGN KEY([idContratoOperacion])
REFERENCES [dbo].[ContratoOperacion] ([idContratoOperacion])
GO
ALTER TABLE [dbo].[ContratoOperacionUsuario] CHECK CONSTRAINT [FK_ContratoOperacionUsuario_ContratoOperacion]
GO
ALTER TABLE [dbo].[ContratoOperacionUsuario]  WITH CHECK ADD  CONSTRAINT [FK_ContratoOperacionUsuario_Usuarios] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[ContratoOperacionUsuario] CHECK CONSTRAINT [FK_ContratoOperacionUsuario_Usuarios]
GO
ALTER TABLE [dbo].[CotizacionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CotizacionDetalle_Cotizaciones] FOREIGN KEY([idCotizacion])
REFERENCES [dbo].[Cotizaciones] ([idCotizacion])
GO
ALTER TABLE [dbo].[CotizacionDetalle] CHECK CONSTRAINT [FK_CotizacionDetalle_Cotizaciones]
GO
ALTER TABLE [dbo].[CotizacionDetalle]  WITH CHECK ADD  CONSTRAINT [FK_CotizacionDetalle_EstatusPartida] FOREIGN KEY([idEstatusPartida])
REFERENCES [dbo].[EstatusPartida] ([idEstatusPartida])
GO
ALTER TABLE [dbo].[CotizacionDetalle] CHECK CONSTRAINT [FK_CotizacionDetalle_EstatusPartida]
GO
ALTER TABLE [dbo].[Cotizaciones]  WITH CHECK ADD  CONSTRAINT [FK_Cotizaciones_EstatusCotizaciones1] FOREIGN KEY([idEstatusCotizacion])
REFERENCES [dbo].[EstatusCotizaciones] ([idEstatusCotizacion])
GO
ALTER TABLE [dbo].[Cotizaciones] CHECK CONSTRAINT [FK_Cotizaciones_EstatusCotizaciones1]
GO
ALTER TABLE [dbo].[Cotizaciones]  WITH CHECK ADD  CONSTRAINT [FK_Cotizaciones_OrdenesServicios] FOREIGN KEY([idOrden])
REFERENCES [dbo].[Ordenes] ([idOrden])
GO
ALTER TABLE [dbo].[Cotizaciones] CHECK CONSTRAINT [FK_Cotizaciones_OrdenesServicios]
GO
ALTER TABLE [dbo].[Cotizaciones]  WITH CHECK ADD  CONSTRAINT [FK_Cotizaciones_Taller] FOREIGN KEY([idTaller])
REFERENCES [dbo].[Taller] ([idTaller])
GO
ALTER TABLE [dbo].[Cotizaciones] CHECK CONSTRAINT [FK_Cotizaciones_Taller]
GO
ALTER TABLE [dbo].[Cotizaciones]  WITH CHECK ADD  CONSTRAINT [FK_Cotizaciones_Usuarios] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[Cotizaciones] CHECK CONSTRAINT [FK_Cotizaciones_Usuarios]
GO
ALTER TABLE [dbo].[DetalleAutorizacionCotizacion]  WITH CHECK ADD  CONSTRAINT [FK_DetalleAutorizacionCotizacion_AutorizacionCotizacion] FOREIGN KEY([idAprobacionCotizacion])
REFERENCES [dbo].[AutorizacionCotizacion] ([idAutorizacionCotizacion])
GO
ALTER TABLE [dbo].[DetalleAutorizacionCotizacion] CHECK CONSTRAINT [FK_DetalleAutorizacionCotizacion_AutorizacionCotizacion]
GO
ALTER TABLE [dbo].[DetalleModulo]  WITH CHECK ADD  CONSTRAINT [FK_DetalleModulo_Modulos1] FOREIGN KEY([idModulo])
REFERENCES [dbo].[Modulos] ([idModulo])
GO
ALTER TABLE [dbo].[DetalleModulo] CHECK CONSTRAINT [FK_DetalleModulo_Modulos1]
GO
ALTER TABLE [dbo].[DocumentosOrdenes]  WITH CHECK ADD  CONSTRAINT [FK_DocumentosOrdenes_CatalogoDocumentos] FOREIGN KEY([idCatalogoDocumento])
REFERENCES [dbo].[CatalogoDocumentos] ([idCatalogoDocumento])
GO
ALTER TABLE [dbo].[DocumentosOrdenes] CHECK CONSTRAINT [FK_DocumentosOrdenes_CatalogoDocumentos]
GO
ALTER TABLE [dbo].[DocumentosOrdenes]  WITH CHECK ADD  CONSTRAINT [FK_DocumentosOrdenes_Ordenes] FOREIGN KEY([idOrden])
REFERENCES [dbo].[Ordenes] ([idOrden])
GO
ALTER TABLE [dbo].[DocumentosOrdenes] CHECK CONSTRAINT [FK_DocumentosOrdenes_Ordenes]
GO
ALTER TABLE [dbo].[Evidencias]  WITH CHECK ADD  CONSTRAINT [FK_Evidencias_OrdenesServicios] FOREIGN KEY([idOrdenServicio])
REFERENCES [dbo].[Ordenes] ([idOrden])
GO
ALTER TABLE [dbo].[Evidencias] CHECK CONSTRAINT [FK_Evidencias_OrdenesServicios]
GO
ALTER TABLE [dbo].[HistorialEstatusCotizacion]  WITH CHECK ADD  CONSTRAINT [FK_HistorialEstatusCotizacion_Cotizaciones] FOREIGN KEY([idCotizacion])
REFERENCES [dbo].[Cotizaciones] ([idCotizacion])
GO
ALTER TABLE [dbo].[HistorialEstatusCotizacion] CHECK CONSTRAINT [FK_HistorialEstatusCotizacion_Cotizaciones]
GO
ALTER TABLE [dbo].[HistorialEstatusCotizacion]  WITH CHECK ADD  CONSTRAINT [FK_HistorialEstatusCotizacion_EstatusCotizaciones] FOREIGN KEY([idEstatusCotizacion])
REFERENCES [dbo].[EstatusCotizaciones] ([idEstatusCotizacion])
GO
ALTER TABLE [dbo].[HistorialEstatusCotizacion] CHECK CONSTRAINT [FK_HistorialEstatusCotizacion_EstatusCotizaciones]
GO
ALTER TABLE [dbo].[HistorialEstatusOrden]  WITH CHECK ADD  CONSTRAINT [FK_OrdenEstatusOrden_EstatusOrdenes] FOREIGN KEY([idEstatusOrden])
REFERENCES [dbo].[EstatusOrdenes] ([idEstatusOrden])
GO
ALTER TABLE [dbo].[HistorialEstatusOrden] CHECK CONSTRAINT [FK_OrdenEstatusOrden_EstatusOrdenes]
GO
ALTER TABLE [dbo].[HistorialEstatusOrden]  WITH CHECK ADD  CONSTRAINT [FK_OrdenEstatusOrden_Ordenes] FOREIGN KEY([idOrden])
REFERENCES [dbo].[Ordenes] ([idOrden])
GO
ALTER TABLE [dbo].[HistorialEstatusOrden] CHECK CONSTRAINT [FK_OrdenEstatusOrden_Ordenes]
GO
ALTER TABLE [dbo].[Notas]  WITH CHECK ADD  CONSTRAINT [FK_Notas_Ordenes] FOREIGN KEY([idOrden])
REFERENCES [dbo].[Ordenes] ([idOrden])
GO
ALTER TABLE [dbo].[Notas] CHECK CONSTRAINT [FK_Notas_Ordenes]
GO
ALTER TABLE [dbo].[Operaciones]  WITH CHECK ADD  CONSTRAINT [FK_Operaciones_CatalogoFormaPago] FOREIGN KEY([idCatalogoFormaPago])
REFERENCES [dbo].[CatalogoFormaPago] ([idFormaPago])
GO
ALTER TABLE [dbo].[Operaciones] CHECK CONSTRAINT [FK_Operaciones_CatalogoFormaPago]
GO
ALTER TABLE [dbo].[Operaciones]  WITH CHECK ADD  CONSTRAINT [FK_Operaciones_CatalogoTipoOperacion] FOREIGN KEY([idCatalogoTipoOperacion])
REFERENCES [dbo].[CatalogoTipoOperacion] ([idTipoOperacion])
GO
ALTER TABLE [dbo].[Operaciones] CHECK CONSTRAINT [FK_Operaciones_CatalogoTipoOperacion]
GO
ALTER TABLE [dbo].[OperacionModulo]  WITH CHECK ADD  CONSTRAINT [FK_OperacionModulo_Modulos] FOREIGN KEY([idModulo])
REFERENCES [dbo].[Modulos] ([idModulo])
GO
ALTER TABLE [dbo].[OperacionModulo] CHECK CONSTRAINT [FK_OperacionModulo_Modulos]
GO
ALTER TABLE [dbo].[OperacionModulo]  WITH CHECK ADD  CONSTRAINT [FK_OperacionModulo_Operaciones] FOREIGN KEY([idOperacion])
REFERENCES [dbo].[Operaciones] ([idOperacion])
GO
ALTER TABLE [dbo].[OperacionModulo] CHECK CONSTRAINT [FK_OperacionModulo_Operaciones]
GO
ALTER TABLE [dbo].[Ordenes]  WITH CHECK ADD  CONSTRAINT [FK_Ordenes_CatalogoTipoOrden] FOREIGN KEY([idTipoOrden])
REFERENCES [dbo].[CatalogoTipoOrden] ([idTipoOrden])
GO
ALTER TABLE [dbo].[Ordenes] CHECK CONSTRAINT [FK_Ordenes_CatalogoTipoOrden]
GO
ALTER TABLE [dbo].[Ordenes]  WITH CHECK ADD  CONSTRAINT [FK_OrdenesServicios_CatalogoTiposOrdenes] FOREIGN KEY([idCatalogoTipoOrdenServicio])
REFERENCES [dbo].[CatalogoTiposOrdenServicio] ([idCatalogoTipoOrdenServicio])
GO
ALTER TABLE [dbo].[Ordenes] CHECK CONSTRAINT [FK_OrdenesServicios_CatalogoTiposOrdenes]
GO
ALTER TABLE [dbo].[Ordenes]  WITH CHECK ADD  CONSTRAINT [FK_OrdenesServicios_EmpresaClienteOperacion] FOREIGN KEY([idContratoOperacion])
REFERENCES [dbo].[ContratoOperacion] ([idContratoOperacion])
GO
ALTER TABLE [dbo].[Ordenes] CHECK CONSTRAINT [FK_OrdenesServicios_EmpresaClienteOperacion]
GO
ALTER TABLE [dbo].[Ordenes]  WITH CHECK ADD  CONSTRAINT [FK_OrdenesServicios_EstadoUnidad] FOREIGN KEY([idCatalogoEstadoUnidad])
REFERENCES [dbo].[CatalogoEstadoUnidad] ([idCatalogoEstadoUnidad])
GO
ALTER TABLE [dbo].[Ordenes] CHECK CONSTRAINT [FK_OrdenesServicios_EstadoUnidad]
GO
ALTER TABLE [dbo].[Ordenes]  WITH CHECK ADD  CONSTRAINT [FK_OrdenesServicios_Usuarios] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[Ordenes] CHECK CONSTRAINT [FK_OrdenesServicios_Usuarios]
GO
ALTER TABLE [dbo].[Presupuestos]  WITH CHECK ADD  CONSTRAINT [FK_Presupuestos_CentroTrabajos] FOREIGN KEY([idCentroTrabajo])
REFERENCES [dbo].[CentroTrabajos] ([idCentroTrabajo])
GO
ALTER TABLE [dbo].[Presupuestos] CHECK CONSTRAINT [FK_Presupuestos_CentroTrabajos]
GO
ALTER TABLE [dbo].[Presupuestos]  WITH CHECK ADD  CONSTRAINT [FK_Presupuestos_EstatusPresupuestos] FOREIGN KEY([idEstatusPresupuesto])
REFERENCES [dbo].[EstatusPresupuestos] ([idEstatusPresupuesto])
GO
ALTER TABLE [dbo].[Presupuestos] CHECK CONSTRAINT [FK_Presupuestos_EstatusPresupuestos]
GO
ALTER TABLE [dbo].[Recordatorios]  WITH CHECK ADD  CONSTRAINT [FK_Recordatorios_Acciones] FOREIGN KEY([idAccion])
REFERENCES [dbo].[Acciones] ([idAccion])
GO
ALTER TABLE [dbo].[Recordatorios] CHECK CONSTRAINT [FK_Recordatorios_Acciones]
GO
ALTER TABLE [dbo].[ResponsablesZonas]  WITH CHECK ADD  CONSTRAINT [FK_ResponsablesZonas_ContratoOperacion] FOREIGN KEY([idContratoOperacion])
REFERENCES [dbo].[ContratoOperacion] ([idContratoOperacion])
GO
ALTER TABLE [dbo].[ResponsablesZonas] CHECK CONSTRAINT [FK_ResponsablesZonas_ContratoOperacion]
GO
ALTER TABLE [dbo].[ResponsablesZonas]  WITH CHECK ADD  CONSTRAINT [FK_ResponsablesZonas_Usuarios] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuarios] ([idUsuario])
GO
ALTER TABLE [dbo].[ResponsablesZonas] CHECK CONSTRAINT [FK_ResponsablesZonas_Usuarios]
GO
ALTER TABLE [dbo].[Token]  WITH CHECK ADD  CONSTRAINT [FK_Token_Ordenes] FOREIGN KEY([idOrdenServicio])
REFERENCES [dbo].[Ordenes] ([idOrden])
GO
ALTER TABLE [dbo].[Token] CHECK CONSTRAINT [FK_Token_Ordenes]
GO
ALTER TABLE [dbo].[TokenKPI]  WITH CHECK ADD  CONSTRAINT [FK_TokenKPI_CatalogoKPI] FOREIGN KEY([idCatalogoKpi])
REFERENCES [dbo].[CatalogoKPI] ([idCatalogoKpi])
GO
ALTER TABLE [dbo].[TokenKPI] CHECK CONSTRAINT [FK_TokenKPI_CatalogoKPI]
GO
ALTER TABLE [dbo].[TokenKPI]  WITH CHECK ADD  CONSTRAINT [FK_TokenKPI_Tokens] FOREIGN KEY([idToken])
REFERENCES [dbo].[Token] ([idToken])
GO
ALTER TABLE [dbo].[TokenKPI] CHECK CONSTRAINT [FK_TokenKPI_Tokens]
GO
ALTER TABLE [dbo].[Unidades]  WITH CHECK ADD  CONSTRAINT [FK_Unidades_CentroTrabajos] FOREIGN KEY([idCentroTrabajo])
REFERENCES [dbo].[CentroTrabajos] ([idCentroTrabajo])
GO
ALTER TABLE [dbo].[Unidades] CHECK CONSTRAINT [FK_Unidades_CentroTrabajos]
GO
ALTER TABLE [dbo].[Unidades]  WITH CHECK ADD  CONSTRAINT [FK_Unidades_Operaciones] FOREIGN KEY([idOperacion])
REFERENCES [dbo].[Operaciones] ([idOperacion])
GO
ALTER TABLE [dbo].[Unidades] CHECK CONSTRAINT [FK_Unidades_Operaciones]
GO
ALTER TABLE [dbo].[Usuarios]  WITH CHECK ADD  CONSTRAINT [FK_Usuarios_TipoUsuarios] FOREIGN KEY([idCatalogoTipoUsuarios])
REFERENCES [dbo].[CatalogoTipoUsuarios] ([idCatalogoTipoUsuarios])
GO
ALTER TABLE [dbo].[Usuarios] CHECK CONSTRAINT [FK_Usuarios_TipoUsuarios]
GO
/****** Object:  StoredProcedure [dbo].[APP_BUSCAR_ORDEN]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Alejandro Grijalva Antonio
-- Create date: 11/05/2017
-- Description:	Store para la búsqueda del Número de Orden
-- ==========================================================================================

CREATE PROCEDURE [dbo].[APP_BUSCAR_ORDEN]
    @numeroOrden NVARCHAR(20)
AS   
BEGIN
	DECLARE @idEstatusOrden NUMERIC(18,0)
	DECLARE @idOrden NUMERIC(18,0)
	DECLARE @idOperacion NUMERIC(18,0)
	
	SET @idEstatusOrden = ( SELECT idEstatusOrden 
							FROM Ordenes 
							WHERE numeroOrden = @numeroOrden );
	SET @idOperacion = ( SELECT OPE.idOperacion
						 FROM Ordenes ORD
						 INNER JOIN ContratoOperacion COP ON ORD.idContratoOperacion = COP.idContratoOperacion
						 INNER JOIN Operaciones OPE ON OPE.idOperacion = COP.idOperacion
						 WHERE numeroOrden = @numeroOrden );
	
	IF ( @idEstatusOrden IS NULL )
		BEGIN
			SELECT 0 Success, 'La Orden que busca no se encuentra registrada.' Msg
		END
	ELSE 
		BEGIN
			SET @idOrden = ( SELECT idOrden FROM Ordenes WHERE numeroOrden = @numeroOrden );
	
			IF ( @idEstatusOrden = 6 ) -- ( Admin ) -> Término de Trabajo
				BEGIN
					SELECT 
						1 Success,
						'Admin :: Estatus : Termino de Trabajo' Msg,
						@idEstatusOrden idEstatusOrden,
						@idOrden idOrden,
						0 Calificacion,
						@idOperacion Operacion
				END
			ELSE IF ( @idEstatusOrden = 7 ) -- ( Cliente ) -> Entrega
				BEGIN
					SELECT 
						1 Success, 
						@idEstatusOrden idEstatusOrden,
						@idOrden idOrden,
						1 Calificacion,
						'Cliente :: Estatus : Entrega.' Msg,
						@idOperacion Operacion
				END
			ELSE
				BEGIN
					SELECT 0 Success, 'No cuenta con los privilegios necesarios para realizar el Token' Msg
				END
		END
END

GO
/****** Object:  StoredProcedure [dbo].[APP_GUARDAR_CALIFICACION]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Alejandro Grijalva Antonio
-- Create date: 11/05/2017
-- Description:	Inserta la calificación y KPI's que se le da a una Operación
-- ==========================================================================================

CREATE PROCEDURE [dbo].[APP_GUARDAR_CALIFICACION]
    @idToken numeric(3,0),
    @calificacionToken numeric(3,0),
    @comentariosToken NVARCHAR(250),
    @kpi1 numeric(3,0),
    @kpi2 numeric(3,0),
    @kpi3 numeric(3,0),
    @kpi4 numeric(3,0),
    @kpi5 numeric(3,0)
AS
BEGIN
	DECLARE @Calificiacion numeric
	
	SET @Calificiacion = (select calificacionToken from token where idToken = @idToken)
	
	IF( @Calificiacion IS NULL )
		BEGIN
			UPDATE 
				Token 
			SET 
				comentariosToken = @comentariosToken,
				calificacionToken = @calificacionToken
			WHERE idToken = @idToken;
			
			-- Insertamos los KPI's de esta calificación
			-- Insertamos los KPI's de esta calificación
			
			-- KPI 1
			IF ( @kpi1 <> 0 ) 
				BEGIN
				
					INSERT INTO TokenKPI (
						idToken, 
						idCatalogoKpi
					) 
					VALUES (
						@idToken,
						@kpi1
					)
				END
			
			-- KPI 2
			IF ( @kpi2 <> 0 ) 
				BEGIN
				
					INSERT INTO TokenKPI (
						idToken, 
						idCatalogoKpi
					) 
					VALUES (
						@idToken,
						@kpi2
					)
				END
				
			-- KPI 3
			IF ( @kpi3 <> 0 ) 
				BEGIN
				
					INSERT INTO TokenKPI (
						idToken, 
						idCatalogoKpi
					) 
					VALUES (
						@idToken,
						@kpi3
					)
				END
		    
			-- KPI 4
			IF ( @kpi4 <> 0 ) 
				BEGIN
				
					INSERT INTO TokenKPI (
						idToken, 
						idCatalogoKpi
					) 
					VALUES (
						@idToken,
						@kpi4
					)
				END
				
			-- KPI 5
			IF ( @kpi5 <> 0 ) 
				BEGIN
				
					INSERT INTO TokenKPI (
						idToken, 
						idCatalogoKpi
					) 
					VALUES (
						@idToken,
						@kpi5
					)
				END

			SELECT 1 Success, 'Su calificación se ha guardado con exito' Msg
		END
	ELSE
		BEGIN
			SELECT 0 Success, 'Ya se ha calificado con anterioridad' Msg
		END
	
	
END


GO
/****** Object:  StoredProcedure [dbo].[APP_GUARDAR_TOKEN]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Alejandro Grijalva Antonio
-- Create date: 11/05/2017
-- Description:	Inserta el Token para el numero de orden
-- ==========================================================================================

CREATE PROCEDURE [dbo].[APP_GUARDAR_TOKEN]
    @token NVARCHAR(50),
    @Vigencia NVARCHAR(250),
	@ubicacionToken NVARCHAR(50),
	@datosMovil NVARCHAR(250),
	@numeroOrden NVARCHAR(15),
	@idUsuario numeric(18,0),
	@idOrdenServicio numeric(18,0),
	@origenToken NVARCHAR(6),
	@idEstatusOrden numeric(18,0)
AS
BEGIN
	DECLARE @Validar numeric( 18,0 )
	DECLARE @Orden NVARCHAR(15)
	DECLARE @Test NVARCHAR(250)
	DECLARE @Tiempo FLOAT(50) 	
	
	-- Se valida si hay Token Activos y se ponen como inactivos para dar entrada a uno nuevo
	SET @Orden = @numeroOrden
	
	SET @Validar = ( SELECT COUNT(idToken) TotalToken FROM Token TOK INNER JOIN Ordenes ORD ON TOK.idOrdenServicio = ORD.idOrden WHERE numeroOrden = @Orden  AND estatusToken = 1  );
	
	SET @Tiempo = CONVERT(float,@Vigencia) / 86400
	
	IF ( @Validar > 0 )
		BEGIN
			UPDATE Token SET estatusToken = 0 WHERE idToken IN ( SELECT idToken FROM Token TOK INNER JOIN Ordenes ORD ON TOK.idOrdenServicio = ORD.idOrden WHERE numeroOrden = @Orden AND estatusToken = 1 )
		END
	
	-- Se inserta el token	
	INSERT INTO Token (
		token, 
		ubicacionToken,
		datosMovil,
		fechaHora,
		vigenciaToken,
		idUsuario,
		idOrdenServicio,
		origenToken,
		idEstatusOrden
	) 
	VALUES (
		@token,
		@ubicacionToken,
		@datosMovil,
		CURRENT_TIMESTAMP,
		CURRENT_TIMESTAMP + @Tiempo,
		@idUsuario,
		@idOrdenServicio,
		@origenToken,
		@idEstatusOrden
	)

	SELECT @@IDENTITY LastInsertId, @Test Test, @Validar Total, CURRENT_TIMESTAMP + @Tiempo Segundos
END
    


GO
/****** Object:  StoredProcedure [dbo].[APP_SETTINGS]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Alejandro Grijalva Antonio
-- Create date: 16/05/2017
-- Description:	Store para los parametros usados en la aplicación
-- ==========================================================================================

CREATE PROCEDURE [dbo].[APP_SETTINGS]
    
AS   
	-- Variables para los KPI's de mejorar
	DECLARE @kpi1 numeric(3,0)
	DECLARE @kpi2 numeric(3,0)
	DECLARE @kpi3 numeric(3,0)
	DECLARE @kpi4 numeric(3,0)
	DECLARE @kpi5 numeric(3,0)
	-- Variables para los KPI's de premiar
	DECLARE @kpi6 numeric(3,0)
	DECLARE @kpi7 numeric(3,0)
	DECLARE @kpi8 numeric(3,0)
	DECLARE @kpi9 numeric(3,0)
	DECLARE @kpi10 numeric(3,0)
	-- Variables para la vigencia del token
	DECLARE @Vigencia numeric(18,0)

	-- SETEAMOS VALORES: Estos valores deberan cambiar manualmente
	SET @kpi1 = 1;
	SET @kpi2 = 2;
	SET @kpi3 = 3;
	SET @kpi4 = 4;
	SET @kpi5 = 5;

	SET @kpi6 = 6;
	SET @kpi7 = 7;
	SET @kpi8 = 8;
	SET @kpi9 = 9;
	SET @kpi10 = 10;

	SET @Vigencia = 120;

	SELECT 
		kpi1_id = @kpi1,
		kpi1_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi1),
		kpi2_id = @kpi2,
		kpi2_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi2),
		kpi3_id = @kpi3,
		kpi3_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi3),
		kpi4_id = @kpi4,
		kpi4_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi4),
		kpi5_id = @kpi5,
		kpi5_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi5),
		kpi6_id = @kpi6,
		kpi6_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi6),
		kpi7_id = @kpi7,
		kpi7_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi7),
		kpi8_id = @kpi8,
		kpi8_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi8),
		kpi9_id = @kpi9,
		kpi9_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi9),
		kpi10_id = @kpi10,
		kpi10_name = (SELECT nombreKpi FROM CatalogoKPI WHERE idCatalogoKpi = @kpi10),
		vigencia = @Vigencia
		


GO
/****** Object:  StoredProcedure [dbo].[APP_VALIDA_CREDENCIALES]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Alejandro Grijalva Antonio
-- Create date: 10/05/2017
-- Description:	Validación de credenciales de usuario para la APP Token
-- ==========================================================================================

CREATE PROCEDURE [dbo].[APP_VALIDA_CREDENCIALES]
    @usuario NVARCHAR(250),
	@contrasena NVARCHAR(50)
AS   
BEGIN
	SELECT
		Usu.idUsuario,
		Usu.nombreUsuario,
		Usu.idCatalogoTipoUsuarios,
		CaTUsu.nombreTipoUsuario,
		Ope.idOperacion,
		Ope.nombreOperacion,
		CaRo.idCatalogoRol,
		CaRo.nombreCatalogoRol
	FROM [dbo].[ContratoOperacionUsuario] CoOpUs
		INNER JOIN CatalogoRoles CaRo	ON CaRo.idCatalogoRol = CoOpUs.idCatalogoRol
		INNER JOIN Usuarios Usu ON Usu.idUsuario = CoOpUs.idUsuario
		INNER JOIN ContratoOperacion ContOpe ON ContOpe.idContratoOperacion = CoOpUs.idContratoOperacion
		INNER JOIN Operaciones Ope ON Ope.idOperacion = ContOpe.idOperacion
		INNER JOIN CatalogoTipoUsuarios CaTUsu ON Usu.idCatalogoTipoUsuarios = CaTUsu.idCatalogoTipoUsuarios
	WHERE 
		nombreUsuario = @usuario AND
		contrasenia = @contrasena AND
		CaRo.idCatalogoRol IN (1,2)
END

GO
/****** Object:  StoredProcedure [dbo].[INS_CONTRATO_OPERACION_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 18/05/2017
-- Description:	Inserta la relacion de operacion con el contrato de la licitación
-- INS_CONTRATO_OPERACION_SP 
-- =============================================
 CREATE PROCEDURE [dbo].[INS_CONTRATO_OPERACION_SP]
	 @idOperacion nvarchar(50)
	,@idContrato nvarchar(50)
AS
BEGIN
	
  DECLARE @idContratoOperacion INT

  IF EXISTS(SELECT idOperacion FROM Operaciones WHERE idOperacion = @idOperacion)
	BEGIN
	  IF EXISTS(SELECT idContrato FROM [Partidas].dbo.Contrato WHERE idContrato = @idContrato)
		BEGIN
		  INSERT INTO [ContratoOperacion] (
				[idOperacion]
				,[idContrato])
			VALUES(
			@idOperacion 
			,@idContrato)

			SET @idContratoOperacion = @@IDENTITY 
			SELECT @idContratoOperacion AS idContratoOperacion
		END
	END
  
  
END


GO
/****** Object:  StoredProcedure [dbo].[INS_COTIZACION_DETALLE_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Crea agrega los detalles de la cotización 
-- NOTA:  
-- [INS_COTIZACION_DETALLE_SP]@idTaller = 1,@idUsuario = 2, @idEstatusPartida = 1,@idOrden = 11
-- =============================================
  CREATE PROCEDURE [dbo].[INS_COTIZACION_DETALLE_SP]
  @idCotizacion NUMERIC(18,0),
  @costo DECIMAL(18,4),
  @cantidad INT,
  @venta DECIMAL(18,4) = 0,
  @idPartida NUMERIC(18,0),
  @idEstatusPartida INT
  AS
  BEGIN
	DECLARE @idCotizacionDetalle NUMERIC(18,0)
	INSERT INTO [ASEPROT].[dbo].[CotizacionDetalle]
	VALUES(@idCotizacion,@costo, @cantidad, @venta, @idPartida, @idEstatusPartida)
	SET @idCotizacionDetalle = @@IDENTITY
	SELECT @idCotizacionDetalle AS idCotizacionDetalle, 'Se agrego detalle' AS mensaje
  END

GO
/****** Object:  StoredProcedure [dbo].[INS_COTIZACION_NUEVA_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Crea una nueva cotización e inserta en la tala historial cotizaciones
-- NOTA:  
-- [INS_COTIZACION_NUEVA_SP]@idTaller = 1,@idUsuario = 2, @idEstatusCotizacion = 1,@idOrden = 11
-- =============================================
CREATE PROCEDURE [dbo].[INS_COTIZACION_NUEVA_SP]
 @idTaller NUMERIC(18,0),
 @idUsuario NUMERIC(18,0),
 @idEstatusCotizacion INT,
 @idOrden varchar(50)
 --@idContratoOperacion INT
 AS
 BEGIN
  DECLARE @fechaCotizacion DATETIME
  DECLARE @idCotizacion NUMERIC(18,0)
  DECLARE @idOrden2 NUMERIC(18,0), @consecutivoCotizacion INT
  SET @idOrden2 = (SELECT idOrden FROM Ordenes WHERE numeroOrden = @idOrden )
  SET @fechaCotizacion = SYSDATETIME()

  IF (EXISTS(SELECT TOP 1 consecutivoCotizacion FROM [ASEPROT].[dbo].[Cotizaciones] WHERE idOrden = @idOrden2))
				BEGIN
					SET @consecutivoCotizacion = (SELECT TOP 1 consecutivoCotizacion FROM [ASEPROT].[dbo].[Cotizaciones] WHERE idOrden = @idOrden2 ORDER BY consecutivoCotizacion DESC) +1
				END
			ELSE 
				BEGIN
					SET @consecutivoCotizacion = 1
				END




  INSERT INTO [ASEPROT].[dbo].[Cotizaciones] 
  VALUES(@fechaCotizacion, @idTaller, @idUsuario, @idEstatusCotizacion, @idOrden2,@idOrden+'-'+CONVERT (varchar(5), @consecutivoCotizacion),@consecutivoCotizacion)
  SET @idCotizacion = @@IDENTITY 

  INSERT INTO [ASEPROT].[dbo].[HistorialEstatusCotizacion]
		(fechaInicial,idCotizacion,idUsuario,idEstatusCotizacion)
  VALUES (@fechaCotizacion, @idCotizacion, @idUsuario, @idEstatusCotizacion)

  SELECT @idCotizacion AS idCotizacion, 'Se creo nueva cotización' AS mensaje
END
--select * from [dbo].[Cotizaciones]
--select * from [dbo].[HistorialEstatusCotizacion]

GO
/****** Object:  StoredProcedure [dbo].[INS_NOTA]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Iralda Sahirely Yam Llanes
-- Create date: 24/05/2017
-- =============================================
CREATE PROCEDURE [dbo].[INS_NOTA] 
	@nota varchar(50),
	@idOrden numeric(18,0),
	@idUsuario numeric(18,0)
AS
BEGIN
	INSERT INTO [dbo].[Notas]
				([descripcionNota],[idOrden],[idUsuario],[fechaNota])
		 VALUES (@nota,@idOrden,@idUsuario, GETDATE())
END

GO
/****** Object:  StoredProcedure [dbo].[INS_OPERACIONES_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

--use [ASEPROT]
-- =============================================
-- Author:		Gibran
-- Description:	Inserta una nueva Operación
-- [INS_OPERACIONES_SP] @nombreOperacion = 'Prueba 5' ,@nombreContacto = 'Leonardo Zamora 2',@correoContacto = 'leonardo.Zamora@gmail.com',@telefonoContacto ='55-654-3222' ,@idCatalogoTipoOperacion = 1  ,@manejoUtilidad = 0,@porcentajeUtilidad = 0.0,@geolocalizacion = 0,@estatusOperacion = 1 ,@idCatalogoFormaPago = 1, @presupuesto = 1, @centros='uno,dos,tres,'
-- =============================================

  CREATE PROCEDURE [dbo].[INS_OPERACIONES_SP]
  @nombreOperacion nvarchar(50)
,@nombreContacto nvarchar(50)
,@correoContacto  nvarchar(50)
,@telefonoContacto  nvarchar(50)
,@fechaInicio  datetime = ''
,@fechaFin  datetime = null
,@idCatalogoTipoOperacion  int
,@manejoUtilidad  int
,@porcentajeUtilidad decimal(18, 4)
,@geolocalizacion bit
,@estatusOperacion  int
,@idCatalogoFormaPago int
,@presupuesto int
,@centros nvarchar(MAX)


AS
BEGIN
SET @fechaInicio = SYSDATETIME() 
DECLARE @idOperacion INT,
		@nombreCentro nvarchar(50),
		@lnuPosComa int

		INSERT INTO [Operaciones] (
							  [nombreOperacion]
							  ,[nombreContacto]
							  ,[correoContacto]
							  ,[telefonoContacto]
							  ,[fechaInicio]
							  ,[fechaFin]
							  ,[idCatalogoTipoOperacion]
							  ,[manejoUtilidad]
							  ,[porcentajeUtilidad]
							  ,[geolocalizacion]
							  ,[idEstatusOperacion]
							  ,[idCatalogoFormaPago]
							  ,[presupuesto])
						VALUES(
						@nombreOperacion 
						,@nombreContacto 
						,@correoContacto  
						,@telefonoContacto  
						,@fechaInicio  
						,@fechaFin  
						,@idCatalogoTipoOperacion  
						,@manejoUtilidad 
						,@porcentajeUtilidad 
						,@geolocalizacion 
						,@estatusOperacion  
						,@idCatalogoFormaPago
						,@presupuesto)
			SET @idOperacion = @@IDENTITY 

			IF @presupuesto =1
				BEGIN
					WHILE  LEN(@centros)> 0
					BEGIN
						SET @lnuPosComa = CHARINDEX(',', @centros ) -- Buscamos el caracter separador
						IF ( @lnuPosComa!=0 )
						BEGIN
							SET @nombreCentro = Substring( @centros , 1  , @lnuPosComa-1)
							SET @centros = Substring( @centros , @lnuPosComa + 1 , LEN(@centros))
						END
	
						INSERT INTO [CentroTrabajos] (
								[nombreCentroTrabajo]
								,[idOperacion])
							VALUES(
							@nombreCentro 
							,@idOperacion)
					END
					
				END

			
			SELECT @idOperacion AS idOperacion
END

GO
/****** Object:  StoredProcedure [dbo].[INS_ORDEN_SERVICIO_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Inserta una nueva Orden de Servicio  
-- =============================================
/*	
	[dbo].[INS_ORDEN_SERVICIO_SP]	@idUnidad = 3, 
									@idUsuario = 2,
									@idTipoOrdenServicio = 2,
									@idEstadoUnidad = 1,
									@grua = 1,
									@fechaCita = '25/05/2017 00:00:00.000',
									@comentario = 'Prueba de creación de Órdenes de Servicio',
									@idZona = 1,
									@taller = 0 
*/
CREATE PROCEDURE [dbo].[INS_ORDEN_SERVICIO_SP] 
	@idUnidad NUMERIC(18,0), 
	@idUsuario  NUMERIC(18,0),
	@idTipoOrdenServicio NUMERIC(18,0),
	@idEstadoUnidad NUMERIC(18,0),
	@grua INT,
	@fechaCita NVARCHAR(MAX),
	@comentario VARCHAR(500),
	@idZona  NUMERIC(18,0),
	@taller INT 
AS
BEGIN
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	--Comprueba que el usuario tiene los permisos necesarios para crear la orden de servicio de la unidad
	--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	IF(EXISTS(	SELECT *
				 FROM [ASEPROT].[dbo].[Unidades] UNI
					  INNER JOIN [ASEPROT].[dbo].[ContratoOperacion] CP ON UNI.idOperacion = CP.idOperacion
					  INNER JOIN [ASEPROT].[dbo].[ContratoOperacionUsuario] COU ON CP.idContratoOperacion = COU.idContratoOperacion AND COU.idUsuario = @idUsuario
				WHERE idUnidad = @idUnidad)
			  )
		BEGIN

			DECLARE @idOperacion NUMERIC(18,0), @numeroEconomico VARCHAR(50), @idContratoOperacion NUMERIC(18,0), @consecutivoOrden INT, @estatusOrden INT
			--Obtengo los datos necesarios de la unidad para formar el numero de la orden para el campo [numeroOrden]
			SELECT @idOperacion = UNI.idOperacion,
				   @numeroEconomico = numeroEconomico,
				   @idContratoOperacion = CP.idContratoOperacion
			  FROM [ASEPROT].[dbo].[Unidades] UNI
				   INNER JOIN [ASEPROT].[dbo].[ContratoOperacion] CP ON UNI.idOperacion = CP.idOperacion
			 WHERE idUnidad = @idUnidad

			--Obtengo el consecutivo para formar el numero de la orden 
			IF (EXISTS(SELECT TOP 1 consecutivoOrden FROM [ASEPROT].[dbo].[Ordenes] WHERE idContratoOperacion = @idContratoOperacion))
				BEGIN
					SET @consecutivoOrden = (SELECT TOP 1 consecutivoOrden FROM [ASEPROT].[dbo].[Ordenes] WHERE idContratoOperacion = @idContratoOperacion ORDER BY consecutivoOrden DESC) +1
				END
			ELSE 
				BEGIN
					SET @consecutivoOrden = 1
				END

			
			--Si el usuario no selecciono taller el estatus de la orden debe crearce con 1  
			--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			--Si @taller = 0 significa que no se ha seleccionado un taller para la orden de servicio por lo cual el idEstatusOrden debe nacer en 1
			--Si @taller = 1 significa que se selecciono un taller para la orden de servicio por lo cual el idEstatusOrden debe nacer en 2 
			--------------------------------------------------------------------------------------------------------------------------------------------------------------------------
			SET @estatusOrden = (CASE WHEN @taller = 0 THEN 1 WHEN @taller = 1 THEN 2 END)	
			DECLARE @idOrdenServicio INT, @idGrua INT
			INSERT INTO [ASEPROT].[dbo].[Ordenes] ( [fechaCreacionOden]
											,[fechaCita]
											,[fechaInicioTrabajo]
											,[numeroOrden]
											,[consecutivoOrden]
											,[comentarioOrden]
											,[requiereGrua]
											,[idCatalogoEstadoUnidad]
											,[idZona]
											,[idUnidad]
											,[idContratoOperacion]
											,[idUsuario]
											,[idCatalogoTipoOrdenServicio]
											,[idTipoOrden]
											,[idEstatusOrden])
			SELECT	GETDATE(),
					@fechaCita,
					NULL,
					(select ISNULL(RIGHT('00' + CAST(@idOperacion AS varchar(2)), 2),'S/N')  
						+ '-' + ISNULL(convert(varchar(max),@numeroEconomico),'S/N') 
						+ '-' + ISNULL(RIGHT('000000' + CAST(@consecutivoOrden AS varchar(6)), 6),'S/N')),
					@consecutivoOrden,
					@comentario,
					@grua,
					@idEstadoUnidad,
					@idZona,
					@idUnidad,
					@idContratoOperacion,
					@idUsuario,
					@idTipoOrdenServicio,
					1,
					@estatusOrden
			SET @idOrdenServicio = @@IDENTITY
			INSERT INTO [ASEPROT].[dbo].[HistorialEstatusOrden] (	[idOrden]
																	,[idEstatusOrden]
																	,[fechaInicial]
																	,[fechaFinal]
																	,[idUsuario] )
			VALUES(@idOrdenServicio,@estatusOrden,GETDATE(),NULL,@idUsuario)
			    
			--Si al crear la orden de servicio para la unidad seleccionaron que necesitaban grua se inserta una Orden de Servicio independiente para la Grua
			IF(@grua = 1)
				BEGIN

					SET @consecutivoOrden = (SELECT TOP 1 consecutivoOrden FROM [ASEPROT].[dbo].[Ordenes] WHERE idContratoOperacion = @idContratoOperacion ORDER BY consecutivoOrden DESC) +1

					INSERT INTO [ASEPROT].[dbo].[Ordenes] ( [fechaCreacionOden]
													,[fechaCita]
													,[fechaInicioTrabajo]
													,[numeroOrden]
													,[consecutivoOrden]
													,[comentarioOrden]
													,[requiereGrua]
													,[idCatalogoEstadoUnidad]
													,[idZona]
													,[idUnidad]
													,[idContratoOperacion]
													,[idUsuario]
													,[idCatalogoTipoOrdenServicio]
													,[idTipoOrden]
													,[idEstatusOrden])
						SELECT	GETDATE(),
								@fechaCita,
								NULL,
								(select ISNULL(RIGHT('00' + CAST(@idOperacion AS varchar(2)), 2),'S/N')  
								+ '-' + ISNULL(convert(varchar(max),@numeroEconomico),'S/N') 
								+ '-' + ISNULL(RIGHT('000000' + CAST(@consecutivoOrden AS varchar(6)), 6),'S/N')),
								@consecutivoOrden,
								@comentario,
								@grua,
								@idEstadoUnidad,
								@idZona,
								@idUnidad,
								@idContratoOperacion,
								@idUsuario,
								@idTipoOrdenServicio,
								2,
								@estatusOrden
						SET @idGrua = @@IDENTITY
						INSERT INTO [ASEPROT].[dbo].[HistorialEstatusOrden] (	[idOrden]
																				,[idEstatusOrden]
																				,[fechaInicial]
																				,[fechaFinal]
																				,[idUsuario] )
						VALUES(@idGrua,@estatusOrden,GETDATE(),NULL,@idUsuario)
				END
			DECLARE @numeroOrdenes INT = 0;
			SELECT @numeroOrdenes = COUNT(idOrden) FROM [ASEPROT].[dbo].[Ordenes] WHERE idUnidad = @idUnidad AND idEstatusOrden = @estatusOrden
			PRINT 'Numero de Ordenes Insertadas'
			PRINT @numeroOrdenes
			--Verifico que la o las Ordenes de servicio se insertaron en dado caso que no sea asi elimino los registros y mando un mensaje de ERROR
			IF(@grua = 1)
				BEGIN
					IF(@numeroOrdenes = 2)
						BEGIN
							SELECT 1 AS respuesta, 
								   'Las Ordenes de Servicio fueron insertadas correctamente' AS mensaje	
						END 
					ELSE
						BEGIN
							DELETE FROM [ASEPROT].[dbo].[Ordenes] WHERE idUnidad = @idUnidad AND idEstatusOrden = @estatusOrden
							SELECT 0 AS respuesta,
								   'Ocurrio un problema al insertar las Ordenes de Servicio' AS mensaje
						END 
				END
			ELSE IF(@grua = 0)
				BEGIN
					IF(@numeroOrdenes = 1)
						BEGIN
							SELECT 1 AS respuesta,
								   'La Orden de Servicio se inserto correctamente' AS mensaje
						END
					ELSE 
						BEGIN
							DELETE FROM [ASEPROT].[dbo].[Ordenes] WHERE idUnidad = @idUnidad AND idEstatusOrden = @estatusOrden
							SELECT 0 AS respuesta,
								   'Ocurrio un problema al insertar la Orden de Servicio' AS mensaje
						END
				END
		END
	ELSE
		BEGIN
			print 'No se tienen los permisos necesarios para agendar una orden de servicio'
		END
END


GO
/****** Object:  StoredProcedure [dbo].[INS_UNIDAD_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 22/05/2017
-- Description:	Inserta una unidad por operación
-- INS_UNIDAD_SP 
-- =============================================
 CREATE PROCEDURE [dbo].[INS_UNIDAD_SP]
	 @numeroEconomico nvarchar(20)
	,@vin nvarchar(20)
	,@gps int
	,@idTipoUnidad int
	,@sustituto int
	,@idOperacion int
	,@idCentroTrabajo int
AS
BEGIN
	
  DECLARE @idUnidad INT
  
  IF NOT EXISTS(SELECT numeroEconomico FROM Unidades WHERE idOperacion = @idOperacion AND numeroEconomico = @numeroEconomico)
	BEGIN
		  INSERT INTO [Unidades] (
				[numeroEconomico]
				,[vin]
				,[gps]
				,[idTipoUnidad]
				,[sustituto]
				,[idOperacion]
				,[idCentroTrabajo])
			VALUES(
			@numeroEconomico 
			,@vin
			,@gps
			,@idTipoUnidad
			,@sustituto
			,@idOperacion
			,@idCentroTrabajo)


			SET @idUnidad = @@IDENTITY 
			SELECT @idUnidad AS idContratoOperacion
		
	END
  
  
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_CENTROS_DE_TRABAJO_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 23/05/2017
-- Description:	Obtiene los centros de trabajo por operación 
-- SEL_CENTROS_DE_TRABAJO_SP 
-- =============================================
 CREATE PROCEDURE [dbo].[SEL_CENTROS_DE_TRABAJO_SP]
	@idOperacion INT
AS
BEGIN
	
  SELECT idCentroTrabajo, nombreCentroTrabajo FROM CentroTrabajos WHERE idOperacion = @idOperacion
   
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_CONFIGURACIONES_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 18/05/2017
-- Description:	Obtiene todas las operaciones existentes
-- SEL_CONFIGURACIONES_SP 
-- =============================================
 CREATE PROCEDURE [dbo].[SEL_CONFIGURACIONES_SP]

AS
BEGIN
  
	DECLARE @idOperacion INT

	SELECT CL.razonSocial,
		OPER.idOperacion,
		OPER.nombreOperacion,
		OPER.geolocalizacion,
		OPER.idEstatusOperacion,
		OPER.nombreContacto
	FROM operaciones OPER
		LEFT  JOIN ContratoOperacion CP ON CP.idOperacion = OPER.idOperacion
		LEFT  JOIN [Partidas].[dbo].[Contrato] CON ON CP.idContrato = CON.idContrato
		LEFT  JOIN [Partidas].[dbo].[Licitacion] LIC ON LIC.idLicitacion = CON.idLicitacion
		LEFT  JOIN [Partidas].[dbo].[Cliente] CL ON LIC.idCliente = CL.idCliente
  
  
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_CONSULTA_ORDENES_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ==========================================================================================
-- Author:		Iralda Sahirely Yam Llanes
-- Create date: 16/05/2017
-- ==========================================================================================
CREATE PROC [dbo].[SEL_CONSULTA_ORDENES_SP]
	@idusuario numeric(18,0),
	@idzona nvarchar(18) = NULL,
	@idejecutivo nvarchar(18) = NULL,
	@fechaMes nvarchar(50) = NULL,
	@rangoInicial nvarchar(50) = NULL,
	@rangoFinal nvarchar(50) = NULL,
	@fecha nvarchar(50) = NULL,
	@numorden nvarchar(18) = NULL,
	@porOrden bit,
	@presupuesto bit
AS
BEGIN
	DECLARE @select NVARCHAR(MAX) = '',
			@condiciones NVARCHAR(MAX) = ''



	SET @select = 
	'SELECT 
		CLI.razonSocial AS Cliente, 
		O.consecutivoOrden AS Consecutivo, 
		O.numeroOrden AS NumeroOrden, 
		UN.numeroEconomico AS NumeroEconomico, 
		Z.nombre AS Zona, 
		TA.razonSocial AS Taller, 
		T.nombreTipoORden AS TipoOrden, 
		O.fechaCita AS Fecha, 
		COT.idCotizacion AS numeroCotizacion,
		TiUn.tipo AS MarcaModelo,
		Ecot.nombreEstatusCotizacion AS Estatus,
		US.nombreUsuario AS Cotizo,
		Porcentaje = (select count(*) from ASEPROT.dbo.CotizacionDetalle as CD where CD.idCotizacion = COT.idCotizacion and CD.idEstatusPartida != 1) * 100 / (select count(*) from ASEPROT.dbo.CotizacionDetalle as CD where CD.idCotizacion = COT.idCotizacion),
		Estadistica = convert(varchar(max), (select count(*) from ASEPROT.dbo.CotizacionDetalle as CD where CD.idCotizacion = COT.idCotizacion and CD.idEstatusPartida = 1)) + ''|'' + convert(varchar(max), (select count(*) from ASEPROT.dbo.CotizacionDetalle as CD where CD.idCotizacion = COT.idCotizacion and CD.idEstatusPartida = 2)) + ''|'' + convert(varchar(1), (select count(*) from ASEPROT.dbo.CotizacionDetalle as CD where CD.idCotizacion = COT.idCotizacion and CD.idEstatusPartida = 3)) + ''|'' + convert(varchar(1), (select count(*) from ASEPROT.dbo.CotizacionDetalle as CD where CD.idCotizacion = COT.idCotizacion)),
		Ecot.idEstatusCotizacion AS EstatusAprobacion,
		TiempoEspera = '''',		
		OP.presupuesto,
		COT.idCotizacion
	FROM ASEPROT.dbo.Ordenes AS O JOIN
		ASEPROT.dbo.ContratoOperacion AS CO ON O.idContratoOperacion = CO.idContratoOperacion INNER JOIN
		ASEPROT.dbo.Unidades AS UN ON O.idUnidad = UN.idUnidad INNER JOIN
		ASEPROT.dbo.Operaciones AS OP ON CO.idOperacion = OP.idOperacion AND UN.idOperacion = OP.idOperacion INNER JOIN
		ASEPROT.dbo.Cotizaciones AS COT ON O.idOrden = COT.idOrden INNER JOIN
		ASEPROT.dbo.Taller AS TA ON COT.idTaller = TA.idTaller INNER JOIN
		ASEPROT.dbo.CatalogoTipoOrden AS T ON O.idTipoOrden = T.idTipoOrden INNER JOIN
		ASEPROT.dbo.EstatusOrdenes AS E ON E.idEstatusOrden = O.idEstatusOrden INNER JOIN 
		ASEPROT.dbo.EstatusCotizaciones AS Ecot ON Ecot.idEstatusCotizacion = COT.idEstatusCotizacion INNER JOIN
		ASEPROT.dbo.Usuarios AS US ON US.idUsuario = COT.idUsuario INNER JOIN
		Partidas.dbo.Contrato AS C ON C.idContrato = CO.idContrato INNER JOIN
		Partidas.dbo.Licitacion AS LI ON LI.idLicitacion = C.idLicitacion INNER JOIN
		Partidas.dbo.Cliente AS CLI ON CLI.idCliente = LI.idCliente INNER JOIN
		Partidas.dbo.Zona AS Z ON Z.idZona = O.idZona INNER JOIN
		Partidas.dbo.TipoUnidad AS TiUn ON UN.idTipoUnidad = TiUn.idTipoUnidad
		WHERE O.idEstatusOrden = 4 AND (COT.idEstatusCotizacion = 1 OR COT.idEstatusCotizacion = 2)
		AND OP.presupuesto = ' + convert(varchar(max),@presupuesto)
		+ ' AND O.idContratoOperacion IN (SELECT contrOpUs.idContratoOperacion
																FROM dbo.Usuarios AS us
																INNER JOIN dbo.ContratoOperacionUsuario AS contrOpUs ON us.idUsuario = contrOpUs.idUsuario
																WHERE us.idUsuario = '+ convert(varchar(max),@idusuario)+')'

		IF (@porOrden = 1 and (@numorden is not null))
			BEGIN
				SET @condiciones = ' AND O.numeroOrden like ''%' + @numorden + '%'''
			END
		ELSE IF (@porOrden = 0)
			BEGIN
				IF (@idzona is not null)
					BEGIN
						SET @condiciones = @condiciones + ' AND Z.idZona = ' + @idzona
					END
				IF (@idejecutivo is not null)
					BEGIN
						SET @condiciones = @condiciones + ' AND US.idUsuario = ' + @idejecutivo
					END
				IF (@fechaMes is not null)
					BEGIN
						DECLARE @fechaInicio DATE = CONVERT(DATE,@fechaMes)
						DECLARE @fechaFin DATE = CONVERT(DATE,DATEADD(d,-1,DATEADD(mm, DATEDIFF(m,0,@fechaMes)+1,0)))
						SET @condiciones = @condiciones + ' AND O.fechaCita BETWEEN ' + convert(varchar(max),@fechaInicio) + ' AND ' + convert(varchar(max),@fechaFin)
					END
				IF (@rangoInicial is not null and @rangoFinal is not null)
					BEGIN
						SET @condiciones = @condiciones + ' AND O.fechaCita BETWEEN CAST('+''''+@rangoInicial+''''+' AS DATETIME) AND CAST('+''''+@rangoFinal+''''+' AS DATETIME)'
					END
				IF (@fecha is not null)
					BEGIN
						SET @condiciones = @condiciones +	' AND O.fechaCita = CAST('+''''+@fecha+''''+' AS DATETIME)'
					END

			END

		DECLARE @query NVARCHAR(MAX) = @select + @condiciones
		EXECUTE SP_EXECUTESQL @query
		PRINT @query
END

GO
/****** Object:  StoredProcedure [dbo].[SEL_CONTRATOS_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 19/05/2017
-- Description:	Obtiene los contratos de la BD.Partidas que no estan ligados con una operación
-- SEL_CONTRATOS_SP 
-- =============================================
 CREATE PROCEDURE [dbo].[SEL_CONTRATOS_SP]
AS
BEGIN
	
  SELECT LIC.idLicitacion,
		 LIC.nombre, 
		 CON.idContrato,
		 CON.fechaInicio
   FROM [Partidas].dbo.Contrato CON
		INNER JOIN [Partidas].dbo.Licitacion LIC ON CON.idLicitacion = LIC.idLicitacion
   WHERE NOT EXISTS (SELECT idContrato FROM ContratoOperacion WHERE CON.idContrato = idContrato)
  
  
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_DETALLE_ORDEN_ACCIONES_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Busca todas las acciones relacionadas a la orden
-- NOTA: 
-- [SEL_DETALLE_ORDEN_ACCIONES_SP] @numeroOrden ='100010'
-- =============================================

CREATE PROCEDURE [dbo].[SEL_DETALLE_ORDEN_ACCIONES_SP]
@idUsuario INT = 0,
@numeroOrden varchar(50) = ''
AS
BEGIN
	SELECT * 
	FROM Acciones Acc
	INNER JOIN Ordenes Ord ON Acc.idOrden = Ord.idOrden
	INNER JOIN Recordatorios Recor ON Recor.idAccion = Acc.idAccion
	WHERE Ord.numeroOrden = @numeroOrden

END

GO
/****** Object:  StoredProcedure [dbo].[SEL_DETALLE_ORDEN_CLIENTE_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Busca los detalles del cliente relacionado con la orden
-- NOTA: 
-- [SEL_DETALLE_ORDEN_CLIENTE_SP] @numeroOrden ='100010'
-- =============================================
CREATE PROCEDURE [dbo].[SEL_DETALLE_ORDEN_CLIENTE_SP]
@idUsuario INT = 0,
@numeroOrden VARCHAR(50) = ''
AS
BEGIN
	SELECT top 1 * FROM
	[Partidas].[dbo].[Cliente]
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_DETALLE_ORDEN_DOCUMENTACION_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description: Busca todos los documentos relacionados a la orden
-- NOTA: 
-- [SEL_DETALLE_ORDEN_DOCUMENTACION_SP] @numeroOrden = '100010'
-- =============================================
CREATE PROCEDURE [dbo].[SEL_DETALLE_ORDEN_DOCUMENTACION_SP]
@idUsuario INT = 0,
@numeroOrden varchar(50) = ''
AS
BEGIN
	SELECT * 
	FROM DocumentosOrdenes DocOr
	INNER JOIN CatalogoDocumentos CatDoc ON CatDoc.idCatalogoDocumento = DocOr.idCatalogoDocumento 
	INNER JOIN Ordenes Ord ON Ord.idOrden = DocOr.idOrden
	WHERE Ord.numeroOrden = @numeroOrden

END

GO
/****** Object:  StoredProcedure [dbo].[SEL_DETALLE_ORDEN_EVIDENCIA_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- Description:	Busca todas las evidencias relacionados a la orden
-- NOTA: 
-- [SEL_DETALLE_ORDEN_EVIDENCIA_SP] @numeroOrden ='100010'
-- =============================================
CREATE PROCEDURE [dbo].[SEL_DETALLE_ORDEN_EVIDENCIA_SP]
@idUsuario INT = 0,
@numeroOrden varchar(50) = ''
AS
BEGIN
	SELECT * 
	FROM Evidencias Evi
	INNER JOIN Ordenes Ord ON Evi.idOrdenServicio = Ord.idOrden
	WHERE Ord.numeroOrden = @numeroOrden
END

GO
/****** Object:  StoredProcedure [dbo].[SEL_DETALLE_ORDEN_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Busca detalle de la orden
-- NOTA: falta cambiar la consulta para mostrar marca y modelo de base de datos Partidas 
-- [SEL_DETALLE_ORDEN_SP]@numeroOrden='100010'
-- =============================================
/****** Script for SelectTopNRows command from SSMS  ******/

CREATE PROCEDURE [dbo].[SEL_DETALLE_ORDEN_SP]
@idUsuario INT = 0,
@numeroOrden varchar(50)
AS
BEGIN
	SELECT 
		  Orden.comentarioOrden
		  ,Uni.numeroEconomico
		  --,Uni.marca
		  --,uni.modelo
		  ,'Ford' marca
		  ,'F-150' modelo
	  FROM [ASEPROT].[dbo].[Ordenes]Orden
	INNER JOIN [ASEPROT].[dbo].[Unidades] Uni ON Uni.idUnidad = Orden.idUnidad
	WHERE Orden.numeroOrden = @numeroOrden
END

GO
/****** Object:  StoredProcedure [dbo].[SEL_DETALLE_UNIDAD_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- =============================================
-- Description:	Busca el detalle de la uniad 
-- NOTA: Falta verificar el usuario, su rol y el tipo de operación 
-- =============================================
-- [dbo].[SEL_DETALLE_UNIDAD_SP] @idUsuario = 2, @economico = '1633010407099'
-- [dbo].[SEL_DETALLE_UNIDAD_SP] @idUsuario = 2, @economico = '1674082674099'
-- [dbo].[SEL_DETALLE_UNIDAD_SP] @idUsuario = 2, @economico = '1639'
CREATE PROCEDURE [dbo].[SEL_DETALLE_UNIDAD_SP] 
	@idUsuario INT = 0,
	@economico VARCHAR(50) = ''
AS
BEGIN
	-------------------------------------------------------------------------------------------------------------------------
	--Busqueda de unidad respuesta = 1 <-- Respuesta Correcta
	--					 respuesta = 0 <-- No se encontraron registros
	--					 respuesta = 2 <-- El usuario no tiene los permisos necesarios
	--                   respuesta = 3 <-- La unidad tiene una orden de servicio en proceso 
	--Cuando situacionOrden = 0 <--No tiene ordenes de servicio en proceso 
	--		 situacionOrden = 1 <--Tiene ordenes de servicio en proceso 
	-------------------------------------------------------------------------------------------------------------------------
	IF(EXISTS(SELECT [numeroEconomico] FROM [ASEPROT].[dbo].[Unidades] WHERE [numeroEconomico] = @economico))
		BEGIN
			IF(EXISTS(SELECT *
						FROM [ASEPROT].[dbo].[Unidades] UNI
							 INNER JOIN [ASEPROT].[dbo].[ContratoOperacion] CP ON UNI.idOperacion = CP.idOperacion
							 INNER JOIN [ASEPROT].[dbo].[ContratoOperacionUsuario] COU ON CP.idContratoOperacion = COU.idContratoOperacion AND COU.idUsuario = @idUsuario
					   WHERE numeroEconomico = @economico))
				BEGIN
					DECLARE @situacionOrden INT=0
					SET @situacionOrden = (CASE WHEN EXISTS(SELECT *
															  FROM [ASEPROT].[dbo].[Unidades] AS U
																   INNER JOIN [ASEPROT].[dbo].[Ordenes] AS O ON U.idUnidad = O.idUnidad
															 WHERE numeroEconomico = @economico AND idEstatusOrden < 8)
												THEN 1
												ELSE 0 END)
					PRINT @situacionOrden					
					SELECT	[idUnidad] AS idUnidad
							,[numeroEconomico] AS numeroEconomico
							,[vin] AS vin
							,[marca] AS marca
							,[subMarca] AS subMarca
							,[modelo] AS modelo
							,[gps] AS gps
							,[idCatalogoTipoUnidad] AS idCatalogoTipoUnidad
							,[sustituto] AS sustituto
							,[idOperacion] AS idOperacion
							,[idCentroTrabajo] AS idCentroTrabajo
							, 1 AS respuesta
							, @situacionOrden AS situacionOrden
					 FROM	[ASEPROT].[dbo].[Unidades] 
					WHERE	[numeroEconomico] = @economico
				END	
			ELSE
				BEGIN
					SELECT 2 AS respuesta,
					'El usuario no tiene los permisos necesarios' AS mensaje
				END		
		END
	ELSE
		BEGIN
			SELECT 0 AS respuesta,
					'No se encontraron registros' AS mensaje
		END
			
	
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_EXISTE_ORDEN_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Busca si existe la unidad 
-- NOTA: Falta verificar el usuario, su rol y el tipo de operación
-- =============================================
-- [dbo].[SEL_EXISTE_ORDEN_SP] @idUsuario = 0, @numeroOrden = '1010'
-- [dbo].[SEL_EXISTE_ORDEN_SP] @idUsuario = 0, @numeroOrden = '1631070183299'
CREATE PROCEDURE [dbo].[SEL_EXISTE_ORDEN_SP]
	@idUsuario INT = 0,
	@numeroOrden VARCHAR(50) = ''
AS
BEGIN
	-------------------------------------------------------------------------------------------------------------------------
	-- Busca si la unidad existe y si el usuario cumple con los permisos necesarios
	--		 respuesta = 0 <-- No existe la unidad 
	--		 respuesta = 1 <-- Existe la unidad y tiene todos los permisos necesarios 
	--		 respuesta = 2 <-- Existe la unidad pero el tipo de operación no le corresponde
	--		 respuesta = 3 <-- Existe la unidad pero el rol no tiene permisos para visualizar la información
	-------------------------------------------------------------------------------------------------------------------------
	IF(EXISTS(SELECT [numeroOrden] FROM [ASEPROT].[dbo].[Ordenes] WHERE [numeroOrden] = @numeroOrden))
		BEGIN
			SELECT 1 AS respuesta
				  ,'Orden encontrada con éxito' AS mensaje
			 FROM [ASEPROT].[dbo].[Ordenes]
			WHERE [numeroOrden] = @numeroOrden
		END
	ELSE
		BEGIN
			SELECT 0 AS respuesta , 
				   'No se encontró la orden con el número de orden ' + @numeroOrden AS mensaje
		END
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_EXISTE_UNIDAD_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Busca si existe la unidad 
-- NOTA: Falta verificar el usuario, su rol y el tipo de operación
-- =============================================
-- [dbo].[SEL_EXISTE_UNIDAD_SP] @idUsuario = 0, @economico = '1010'
-- [dbo].[SEL_EXISTE_UNIDAD_SP] @idUsuario = 0, @economico = '1631070183299'
CREATE PROCEDURE [dbo].[SEL_EXISTE_UNIDAD_SP]
	@idUsuario INT = 0,
	@economico VARCHAR(50) = ''
AS
BEGIN
	-------------------------------------------------------------------------------------------------------------------------
	-- Busca si la unidad existe y si el usuario cumple con los permisos necesarios
	--		 respuesta = 0 <-- No existe la unidad 
	--		 respuesta = 1 <-- Existe la unidad y tiene todos los permisos necesarios 
	--		 respuesta = 2 <-- Existe la unidad pero el tipo de operación no le corresponde
	--		 respuesta = 3 <-- Existe la unidad pero el rol no tiene permisos para visualizar la información
	-------------------------------------------------------------------------------------------------------------------------
	IF(EXISTS(SELECT [numeroEconomico] FROM [ASEPROT].[dbo].[Unidades] WHERE [numeroEconomico] = @economico))
		BEGIN
			SELECT 1 AS respuesta
				  ,'Unidad encontrada con éxito' AS mensaje
			 FROM [ASEPROT].[dbo].[Unidades] 
			WHERE [numeroEconomico] = @economico
		END
	ELSE
		BEGIN
			SELECT 0 AS respuesta , 
				   'No se encontró la unidad con el número economico ' + @economico AS mensaje
		END
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_FORMA_DE_PAGO_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 18/05/2017
-- Description:	Obtiene todas las formas de pago
-- SEL_FORMA_DE_PAGO_SP
-- =============================================
 CREATE PROCEDURE [dbo].[SEL_FORMA_DE_PAGO_SP]

AS
BEGIN
  

	SELECT idFormaPago, 
		nombreFormaPago 
	FROM CatalogoFormaPago
  
  
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_FORMA_TIPO_DE_OPERACION_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 18/05/2017
-- Description:	Obtiene los tipos de operación
-- SEL_FORMA_TIPO_DE_OPERACION_SP
-- =============================================
 CREATE PROCEDURE [dbo].[SEL_FORMA_TIPO_DE_OPERACION_SP]

AS
BEGIN
  

	SELECT idTipoOperacion, 
		nombreTipoOperacion 
	FROM CatalogoTipoOperacion
  
  
END

GO
/****** Object:  StoredProcedure [dbo].[SEL_NIVEL_ZONAS_CLIENTE_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Iralda Sahirely Yam Llanes
-- Create date: 16/05/2017
-- ==========================================================================================

CREATE PROC [dbo].[SEL_NIVEL_ZONAS_CLIENTE_SP]
	@idusuario numeric(18,0)
AS
BEGIN
	SELECT count(NivZo.idNivelZona) AS Niveles
	FROM Partidas.dbo.Contrato AS Con INNER JOIN
		Partidas.dbo.Licitacion AS Li ON Con.idLicitacion = Li.idLicitacion INNER JOIN
		Partidas.dbo.Cliente AS Cli ON Li.idCliente = Cli.idCliente INNER JOIN
		Partidas.dbo.NivelZona AS NivZo ON Cli.idCliente = NivZo.idCliente
	WHERE Con.idContrato IN (SELECT ConOp.idContrato
							FROM ASEPROT.dbo.ContratoOperacionUsuario AS ConOpUs INNER JOIN
									ASEPROT.dbo.ContratoOperacion AS ConOp ON ConOpUs.idContratoOperacion = ConOp.idContratoOperacion
							WHERE (ConOpUs.idUsuario = @idusuario))

END

GO
/****** Object:  StoredProcedure [dbo].[SEL_NOTAS_ORDEN]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Iralda Sahirely Yam Llanes
-- Create date: 24/05/2017
-- =============================================
CREATE PROCEDURE [dbo].[SEL_NOTAS_ORDEN]
	@idOrden numeric(18,0)
AS
BEGIN

	SET NOCOUNT ON;

	SELECT [descripcionNota],[idUsuario],[fechaNota]
	FROM   [ASEPROT].[dbo].[Notas]
	WHERE  [idOrden] = @idOrden
	ORDER BY [fechaNota]

END

GO
/****** Object:  StoredProcedure [dbo].[SEL_ORDENES_ACTUAL_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Obtiene las ordenes de servicio en proceso es decir que no esten canceladas o finalizadas
-- =============================================
-- [SEL_ORDENES_ACTUAL_SP] @idUsuario = 2, @economico = '1633010407099'
-- [SEL_ORDENES_ACTUAL_SP] @idUsuario = 2, @economico = '1631070183299'
CREATE PROCEDURE [dbo].[SEL_ORDENES_ACTUAL_SP]
	@idUsuario NUMERIC(18,0),
	@economico NVARCHAR(50)
AS
BEGIN
	--Obtendo el id de la Unidad
	DECLARE @idUnidad INT
	SELECT @idUnidad=idUnidad FROM Unidades WHERE numeroEconomico = @economico
	-----------------------------------------------------------------------------------
	--Verifico si la unidad tiene Ordenes de serevicio en proceso  
	-- respuesta = 0 <-- No tiene Ordenses de servicio en proceso 
	-- respuesta = 1 <-- Tiene Ordenes de Servicio en Proceso 
	-----------------------------------------------------------------------------------
	IF(EXISTS(SELECT * FROM [ASEPROT].[dbo].[Ordenes] WHERE idUnidad = @idUnidad AND NOT idEstatusOrden IN (9,10)))
		BEGIN 
			SELECT [idOrden] AS idOrden
				  ,[fechaCreacionOden] AS fechaCreacionOrden
				  ,[fechaCita] AS FechaCita
				  ,[numeroOrden] AS numeroOrden
				  ,[comentarioOrden] AS descripcion
				  ,[idCatalogoEstadoUnidad] AS idEstadoUnidad
				  ,O.[idUsuario] AS idUsuario
				  ,U.nombreCompleto AS nombreCompleto
				  ,O.[idTipoOrden] AS idTipoOrden
				  ,CTO.nombreTipoORden AS tipoOrden
				  ,O.[idEstatusOrden] AS idEstatusOrden
				  ,(CASE WHEN O.idEstatusOrden = 1 THEN 'Sin Taller' 
						 ELSE EO.nombreEstatusOrden END) AS estatusOrden
				  ,1 AS respuesta 
				  ,'' AS taller
				  ,'' AS direccion
			 FROM [ASEPROT].[dbo].[Ordenes] AS O
				  INNER JOIN [ASEPROT].[dbo].[EstatusOrdenes] AS EO ON O.idEstatusOrden = EO.idEstatusOrden
				  INNER JOIN [ASEPROT].[dbo].[Usuarios] AS U ON U.idUsuario = O.idUsuario
				  INNER JOIN [ASEPROT].[dbo].[CatalogoTipoOrden] CTO ON CTO.idTipoOrden = O.idTipoOrden
			WHERE idUnidad = @idUnidad AND NOT O.idEstatusOrden IN (9,10)
		END
	ELSE 
		BEGIN
			SELECT 0 AS respuesta,
				   'No tiene Ordenes de Servicio en Proceso' AS mensaje
		END
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_ORDENES_HISTORIAL_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Obtiene el historial de las ordenes de servicio finalizadas o canceladas 
-- =============================================
-- [SEL_ORDENES_HISTORIAL_SP] @idUsuario = 2, @economico = '1633010407099'
-- [SEL_ORDENES_HISTORIAL_SP] @idUsuario = 2, @economico = '1631070183299'
CREATE PROCEDURE [dbo].[SEL_ORDENES_HISTORIAL_SP]
	@idUsuario NUMERIC(18,0),
	@economico NVARCHAR(50)
AS
BEGIN
	--Obtendo el id de la Unidad
	DECLARE @idUnidad INT
	SELECT @idUnidad=idUnidad FROM Unidades WHERE numeroEconomico = @economico
	-----------------------------------------------------------------------------------
	--Verifico si la unidad tiene Ordenes de serevicio canceladas o finalizadas 
	-- respuesta = 0 <-- No tiene Ordenses de servicio  
	-- respuesta = 1 <-- Tiene Ordenes de Servicio  
	-----------------------------------------------------------------------------------
	IF(EXISTS(SELECT * FROM [ASEPROT].[dbo].[Ordenes] WHERE idUnidad = @idUnidad AND idEstatusOrden IN (9,10)))
		BEGIN 
			SELECT [idOrden] AS idOrden
				  ,[fechaCreacionOden] AS fechaCreacionOrden
				  ,[fechaCita] AS FechaCita
				  ,[numeroOrden] AS numeroOrden
				  ,[comentarioOrden] AS descripcion
				  ,[idCatalogoEstadoUnidad] AS idEstadoUnidad
				  ,O.[idUsuario] AS idUsuario
				  ,U.nombreCompleto AS nombreCompleto
				  ,O.[idTipoOrden] AS idTipoOrden
				  ,CTO.nombreTipoORden AS tipoOrden
				  ,O.[idEstatusOrden] AS idEstatusOrden
				  ,EO.nombreEstatusOrden AS estatusOrden
				  ,1 AS respuesta 
				  ,'' AS taller
				  ,'' AS direccion
			 FROM [ASEPROT].[dbo].[Ordenes] AS O
				  INNER JOIN [ASEPROT].[dbo].[EstatusOrdenes] AS EO ON O.idEstatusOrden = EO.idEstatusOrden
				  INNER JOIN [ASEPROT].[dbo].[Usuarios] AS U ON U.idUsuario = O.idUsuario
				  INNER JOIN [ASEPROT].[dbo].[CatalogoTipoOrden] CTO ON CTO.idTipoOrden = O.idTipoOrden
			WHERE idUnidad = @idUnidad AND O.idEstatusOrden IN (9,10)
		END
	ELSE 
		BEGIN
			SELECT 0 AS respuesta,
				   'No tine Orden(es) Finalizadas o Canceladas' AS mensaje
		END
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_ORDENES_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Busca todas las órdenes existentes
-- NOTA: Falta verificar el usuario, su rol y el tipo de operación 
-- =============================================
-- [dbo].[SEL_ORDENES_SP]

CREATE PROCEDURE [dbo].[SEL_ORDENES_SP]
AS
BEGIN

	SELECT 
	  Orden.[idOrden]
      ,[numeroOrden]
      ,[fechaCita] as fecha
	  ,convert(datetime, fechaCreacionOden, 103) as fechaCreacionOden
      ,fechaInicioTrabajo
	  ,comentarioOrden
      ,Uni.[numeroEconomico]
      ,[requiereGrua]
      ,EstadoUni.[idCatalogoEstadoUnidad]
	  ,EstadoUni.descripcionEstadoUnidad
      ,[idZona]
      ,Uni.[idUnidad]
	  ,[consecutivoOrden]
      ,EtsOrden.[idEstatusOrden]
	  ,EtsOrden.[nombreEstatusOrden]
      ,ConOpe.[idContratoOperacion]
      ,Usu.[idUsuario]
	  ,Usu.nombreUsuario
      ,CaTiOrSe.[idCatalogoTipoOrdenServicio]
	  ,CaTiOrSe.[nombreTipoOrdenServicio]
      ,CaTiOr.[idTipoOrden]
	  ,CaTiOr.nombreTipoORden 
	FROM [dbo].[Ordenes] Orden
	INNER JOIN [dbo].[CatalogoEstadoUnidad] EstadoUni ON EstadoUni.idCatalogoEstadoUnidad = Orden.idCatalogoEstadoUnidad
	INNER JOIN [dbo].[Unidades] Uni ON Uni.idUnidad = Orden.idUnidad
	--INNER JOIN [dbo].[OrdenEstatusOrden] OrdeEsOr ON OrdeEsOr.idEstatusOrden = orden.idOrden
	INNER JOIN [dbo].[EstatusOrdenes] EtsOrden ON EtsOrden.idEstatusOrden = Orden.idEstatusOrden --AND 
	INNER JOIN [dbo].[ContratoOperacion] ConOpe ON ConOpe.idContratoOperacion = Orden.idContratoOperacion
	INNER JOIN [dbo].[Usuarios] Usu ON usu.idUsuario = Orden.idUsuario
	INNER JOIN [dbo].[CatalogoTiposOrdenServicio] CaTiOrSe ON CaTiOrSe.idCatalogoTipoOrdenServicio = Orden.idCatalogoTipoOrdenServicio
	--INNER JOIN [dbo].[Acciones] Acc ON Acc.idAccion = Orden.idAccion
	INNER JOIN [dbo].[CatalogoTipoOrden] CaTiOr ON CaTiOr.idTipoOrden = Orden.idTipoOrden
	--WHERE EtsOrden.idEstatusOrden IN (2,1)
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_PARTIDAS_PRUEBA_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_PARTIDAS_PRUEBA_SP]
@idTaller NUMERIC

AS
BEGIN
	SELECT * FROM Partidas
	WHERE idTaller = @idTaller
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_PERMISOS_USUARIOS_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_PERMISOS_USUARIOS_SP]
@usuario varchar(50)
,@contrasenia varchar(50)

AS
BEGIN
	SELECT
		Ope.idOperacion
		,Ope.nombreOperacion 
		,Usu.idUsuario
		,Usu.nombreUsuario
		,CaRo.nombreCatalogoRol
		-- ,
	FROM [dbo].[ContratoOperacionUsuario] CoOpUs
		INNER JOIN CatalogoRoles CaRo	ON CaRo.idCatalogoRol = CoOpUs.idCatalogoRol
		INNER JOIN Usuarios Usu ON Usu.idUsuario = CoOpUs.idUsuario
		INNER JOIN ContratoOperacion ContOpe ON ContOpe.idContratoOperacion = CoOpUs.idContratoOperacion
		INNER JOIN Operaciones Ope ON Ope.idOperacion = ContOpe.idOperacion
	WHERE	Usu.nombreUsuario = @usuario AND Usu.contrasenia = @contrasenia
END

GO
/****** Object:  StoredProcedure [dbo].[SEL_TALLER_PRUEBA_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SEL_TALLER_PRUEBA_SP]
AS
BEGIN
	SELECT * FROM Taller
END

GO
/****** Object:  StoredProcedure [dbo].[SEL_TIPO_DE_UNIDAD_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 24/05/2017
-- Description:	Obtiene los centros de trabajo por operación 
-- SEL_TIPO_DE_UNIDAD_SP 3
-- =============================================
 CREATE PROCEDURE [dbo].[SEL_TIPO_DE_UNIDAD_SP]
	@idOperacion INT
AS
BEGIN
	
  SELECT TU.idTipoUnidad, (TU.tipo + ' ' +MA.nombre+ ' ' + SM.nombre +' ' + UNI.anio + ' '+ UNI.version ) as unidad 
	FROM [Partidas].dbo.TipoUnidad TU 
	INNER JOIN [Partidas].dbo.Unidad UNI ON UNI.idTipoUnidad = TU.idTipoUnidad
	INNER JOIN [Partidas].dbo.SubMarca SM ON UNI.idSubMarca = SM.idSubMarca
	INNER JOIN [Partidas].dbo.Marca MA ON MA.idMarca = SM.idMarca
	INNER JOIN [Partidas].dbo.ContratoUnidad CU ON UNI.idUnidad = CU.idUnidad
	INNER JOIN ContratoOperacion CO ON CO.idContrato = CU.idContrato
	WHERE CO.idOperacion = @idOperacion 

END


GO
/****** Object:  StoredProcedure [dbo].[SEL_TIPO_UNIDADES_CONTRATO_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Anel Candi Pérez Pérez
-- Create date: 22/05/2017
-- Description:	Obtiene los contratos de la BD.Partidas que no estan ligados con una operación
-- SEL_TIPO_UNIDADES_CONTRATO_SP
-- =============================================
 CREATE PROCEDURE [dbo].[SEL_TIPO_UNIDADES_CONTRATO_SP]
AS
BEGIN
	
  SELECT 'Se debe buscar los datos en la BD.Partidas'

  
  
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_TIPOS_ESTADOS_UNIDAD]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Obtiene los estados de la unidad
-- =============================================
-- [dbo].[SEL_TIPOS_ESTADOS_UNIDAD]
CREATE PROCEDURE [dbo].[SEL_TIPOS_ESTADOS_UNIDAD]
AS
BEGIN
	SELECT [idCatalogoEstadoUnidad] AS idEstadoUnidad
		  ,[descripcionEstadoUnidad] AS descripcion
	  FROM [ASEPROT].[dbo].[CatalogoEstadoUnidad]
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_TIPOS_ORDENES_SERVICIO_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Description:	Obtengo el catalago de tipo de ordenes de servicio
-- =============================================
-- [dbo].[SEL_TIPOS_ORDENES_SERVICIO_SP]
CREATE PROCEDURE [dbo].[SEL_TIPOS_ORDENES_SERVICIO_SP]
AS
BEGIN
	SELECT [idCatalogoTipoOrdenServicio] AS idTipoCita
		  ,[nombreTipoOrdenServicio] AS tipoCita
		  ,[descripcionTipoOrden] AS descripcionTipoCita
	  FROM [ASEPROT].[dbo].[CatalogoTiposOrdenServicio]
END


GO
/****** Object:  StoredProcedure [dbo].[SEL_USUARIOS_EJECUTIVOS_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Iralda Sahirely Yam Llanes
-- Create date: 10/05/2017
-- ==========================================================================================

CREATE PROC [dbo].[SEL_USUARIOS_EJECUTIVOS_SP]
@idusuario numeric(18,0)
AS
BEGIN

	SELECT us.idUsuario, us.nombreUsuario
	FROM dbo.Usuarios AS us
		INNER JOIN dbo.ContratoOperacionUsuario AS contrOpUs ON us.idUsuario = contrOpUs.idUsuario
		INNER JOIN dbo.CatalogoRoles AS catRol ON contrOpUs.idCatalogoRol = catRol.idCatalogoRol
	WHERE (contrOpUs.idCatalogoRol = 3) AND contrOpUs.idContratoOperacion in (SELECT contrOpUs.idContratoOperacion
							FROM dbo.Usuarios AS us
							INNER JOIN dbo.ContratoOperacionUsuario AS contrOpUs ON us.idUsuario = contrOpUs.idUsuario
							WHERE us.idUsuario = @idusuario)
	
END

GO
/****** Object:  StoredProcedure [dbo].[SEL_ZONAS_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

-- ==========================================================================================
-- Author:		Iralda Sahirely Yam Llanes
-- Create date: 16/05/2017
-- ==========================================================================================

CREATE PROC [dbo].[SEL_ZONAS_SP]
	@idUsuario numeric(18,0),
	@idPadre numeric(18, 0),
	@orden smallint
AS
BEGIN
	SELECT      z.idZona, z.nombre
	FROM		Partidas.dbo.Contrato AS Con INNER JOIN
				Partidas.dbo.Licitacion AS Li ON Con.idLicitacion = Li.idLicitacion INNER JOIN
				Partidas.dbo.Cliente AS Cli ON Li.idCliente = Cli.idCliente INNER JOIN
				Partidas.dbo.NivelZona AS NivZo ON Cli.idCliente = NivZo.idCliente INNER JOIN
				Partidas.dbo.Zona AS Z ON z.idNivelZona = NivZo.idNivelZona
	WHERE z.idPadre = @idPadre AND NivZo.orden = orden
							AND Con.idContrato IN (SELECT ConOp.idContrato
							FROM ASEPROT.dbo.ContratoOperacionUsuario AS ConOpUs INNER JOIN
									ASEPROT.dbo.ContratoOperacion AS ConOp ON ConOpUs.idContratoOperacion = ConOp.idContratoOperacion
							WHERE (ConOpUs.idUsuario = @idUsuario))
END

GO
/****** Object:  StoredProcedure [dbo].[UPD_CANCELA_COTIZACION_SP]    Script Date: 24/05/2017 18:33:20 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- ==========================================================================================
-- Author:		Iralda Sahirely Yam Llanes
-- Create date: 22/05/2017
-- ==========================================================================================
CREATE PROCEDURE [dbo].[UPD_CANCELA_COTIZACION_SP]
	@idusuario numeric(18,0),
	@idcotizacion numeric(18,0)
AS
BEGIN
	SET NOCOUNT ON;
	IF ((SELECT COUNT(*) FROM Cotizaciones where idCotizacion = @idcotizacion) > 0)
	BEGIN
		UPDATE [dbo].[Cotizaciones]
		SET [idEstatusCotizacion] = 4
		WHERE [idCotizacion] = @idcotizacion

		UPDATE [dbo].[CotizacionDetalle]
		SET [idEstatusPartida] = 3
		WHERE [idCotizacion] = @idcotizacion

		INSERT INTO [dbo].[HistorialEstatusCotizacion]([fechaInicial], [idCotizacion], [idUsuario], [idEstatusCotizacion])
		VALUES (GETDATE(), @idcotizacion, @idusuario, 4)
	END
END


GO
USE [master]
GO
ALTER DATABASE [ASEPROT] SET  READ_WRITE 
GO
