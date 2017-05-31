USE [ASEPROT]
GO

/****** Object:  Synonym [dbo].[Partidas_Contrato]    Script Date: 05/30/2017 16:39:26 ******/
IF  EXISTS (SELECT * FROM sys.synonyms WHERE name = N'Partidas_Contrato')
DROP SYNONYM [dbo].[Partidas_Contrato]
GO

USE [ASEPROT]
GO

/****** Object:  Synonym [dbo].[Partidas_Contrato]    Script Date: 05/30/2017 16:39:26 ******/
CREATE SYNONYM [dbo].[Partidas_Contrato] FOR [192.168.20.9].[Partidas].[dbo].[Contrato]
GO


