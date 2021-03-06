--USE [master]
--GO
--/****** Object:  Database [Partidas]    Script Date: 24/05/2017 12:54:03 ******/
--CREATE DATABASE [Partidas]
 
USE [Partidas]
GO
/****** Object:  UserDefinedFunction [dbo].[parseJSON]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE FUNCTION [dbo].[parseJSON] (
	@JSON NVARCHAR(MAX)
)
	RETURNS @hierarchy TABLE

	  (

	   element_id INT IDENTITY(1, 1) NOT NULL, /* internal surrogate primary key gives the order of parsing and the list order */

	   sequenceNo [int] NULL, /* the place in the sequence for the element */

	   parent_ID INT,/* if the element has a parent then it is in this column. The document is the ultimate parent, so you can get the structure from recursing from the document */

	   Object_ID INT,/* each list or object has an object id. This ties all elements to a parent. Lists are treated as objects here */

	   NAME NVARCHAR(2000),/* the name of the object */

	   StringValue NVARCHAR(MAX) NOT NULL,/*the string representation of the value of the element. */

	   ValueType VARCHAR(10) NOT null /* the declared type of the value represented as a string in StringValue*/

	  )
as

	BEGIN

	  DECLARE

	    @FirstObject INT, --the index of the first open bracket found in the JSON string

	    @OpenDelimiter INT,--the index of the next open bracket found in the JSON string

	    @NextOpenDelimiter INT,--the index of subsequent open bracket found in the JSON string

	    @NextCloseDelimiter INT,--the index of subsequent close bracket found in the JSON string

	    @Type NVARCHAR(10),--whether it denotes an object or an array

	    @NextCloseDelimiterChar CHAR(1),--either a '}' or a ']'

	    @Contents NVARCHAR(MAX), --the unparsed contents of the bracketed expression

	    @Start INT, --index of the start of the token that you are parsing

	    @end INT,--index of the end of the token that you are parsing

	    @param INT,--the parameter at the end of the next Object/Array token

	    @EndOfName INT,--the index of the start of the parameter at end of Object/Array token

	    @token NVARCHAR(200),--either a string or object

	    @value NVARCHAR(MAX), -- the value as a string

	    @SequenceNo int, -- the sequence number within a list

	    @name NVARCHAR(200), --the name as a string

	    @parent_ID INT,--the next parent ID to allocate

	    @lenJSON INT,--the current length of the JSON String

	    @characters NCHAR(36),--used to convert hex to decimal

	    @result BIGINT,--the value of the hex symbol being parsed

	    @index SMALLINT,--used for parsing the hex value

	    @Escape INT --the index of the next escape character

	    

	  DECLARE @Strings TABLE /* in this temporary table we keep all strings, even the names of the elements, since they are 'escaped' in a different way, and may contain, unescaped, brackets denoting objects or lists. These are replaced in the JSON string by tokens representing the string */

	    (

	     String_ID INT IDENTITY(1, 1),

	     StringValue NVARCHAR(MAX)

	    )

	  SELECT--initialise the characters to convert hex to ascii

	    @characters='0123456789abcdefghijklmnopqrstuvwxyz',

	    @SequenceNo=0, --set the sequence no. to something sensible.

	  /* firstly we process all strings. This is done because [{} and ] aren't escaped in strings, which complicates an iterative parse. */

	    @parent_ID=0;

	  WHILE 1=1 --forever until there is nothing more to do

	    BEGIN

	      SELECT

	        @start=PATINDEX('%[^a-zA-Z]["]%', @json collate SQL_Latin1_General_CP850_Bin);--next delimited string

	      IF @start=0 BREAK --no more so drop through the WHILE loop

	      IF SUBSTRING(@json, @start+1, 1)='"' 

	        BEGIN --Delimited Name

	          SET @start=@Start+1;

	          SET @end=PATINDEX('%[^\]["]%', RIGHT(@json, LEN(@json+'|')-@start) collate SQL_Latin1_General_CP850_Bin);

	        END

	      IF @end=0 --no end delimiter to last string

	        BREAK --no more

	      SELECT @token=SUBSTRING(@json, @start+1, @end-1)

	      --now put in the escaped control characters

	      SELECT @token=REPLACE(@token, FROMString, TOString)

	      FROM

	        (SELECT

	          '\"' AS FromString, '"' AS ToString

	         UNION ALL SELECT '\\', '\'

	         UNION ALL SELECT '\/', '/'

	         UNION ALL SELECT '\b', CHAR(08)

	         UNION ALL SELECT '\f', CHAR(12)

	         UNION ALL SELECT '\n', CHAR(10)

	         UNION ALL SELECT '\r', CHAR(13)

	         UNION ALL SELECT '\t', CHAR(09)

	        ) substitutions

	      SELECT @result=0, @escape=1

	  --Begin to take out any hex escape codes

	      WHILE @escape>0

	        BEGIN

	          SELECT @index=0,

	          --find the next hex escape sequence

	          @escape=PATINDEX('%\x[0-9a-f][0-9a-f][0-9a-f][0-9a-f]%', @token collate SQL_Latin1_General_CP850_Bin)

	          IF @escape>0 --if there is one

	            BEGIN

	              WHILE @index<4 --there are always four digits to a \x sequence   

	                BEGIN

	                  SELECT --determine its value

	                    @result=@result+POWER(16, @index)

	                    *(CHARINDEX(SUBSTRING(@token, @escape+2+3-@index, 1),

	                                @characters)-1), @index=@index+1 ;

	         

	                END

	                -- and replace the hex sequence by its unicode value

	              SELECT @token=STUFF(@token, @escape, 6, NCHAR(@result))

	            END

	        END

	      --now store the string away 

	      INSERT INTO @Strings (StringValue) SELECT @token

	      -- and replace the string with a token

	      SELECT @JSON=STUFF(@json, @start, @end+1,

	                    '@string'+CONVERT(NVARCHAR(5), @@identity))

	    END

	  -- all strings are now removed. Now we find the first leaf.  

	  WHILE 1=1  --forever until there is nothing more to do

	  BEGIN

	 

	  SELECT @parent_ID=@parent_ID+1

	  --find the first object or list by looking for the open bracket

	  SELECT @FirstObject=PATINDEX('%[{[[]%', @json collate SQL_Latin1_General_CP850_Bin)--object or array

	  IF @FirstObject = 0 BREAK

	  IF (SUBSTRING(@json, @FirstObject, 1)='{') 

	    SELECT @NextCloseDelimiterChar='}', @type='object'

	  ELSE 

	    SELECT @NextCloseDelimiterChar=']', @type='array'

	  SELECT @OpenDelimiter=@firstObject

	  WHILE 1=1 --find the innermost object or list...

	    BEGIN

	      SELECT

	        @lenJSON=LEN(@JSON+'|')-1

	  --find the matching close-delimiter proceeding after the open-delimiter

	      SELECT

	        @NextCloseDelimiter=CHARINDEX(@NextCloseDelimiterChar, @json,

	                                      @OpenDelimiter+1)

	  --is there an intervening open-delimiter of either type

	      SELECT @NextOpenDelimiter=PATINDEX('%[{[[]%',

	             RIGHT(@json, @lenJSON-@OpenDelimiter)collate SQL_Latin1_General_CP850_Bin)--object

	      IF @NextOpenDelimiter=0 

	        BREAK

	      SELECT @NextOpenDelimiter=@NextOpenDelimiter+@OpenDelimiter

	      IF @NextCloseDelimiter<@NextOpenDelimiter 

	        BREAK

	      IF SUBSTRING(@json, @NextOpenDelimiter, 1)='{' 

	        SELECT @NextCloseDelimiterChar='}', @type='object'

	      ELSE 

	        SELECT @NextCloseDelimiterChar=']', @type='array'

	      SELECT @OpenDelimiter=@NextOpenDelimiter

	    END

	  ---and parse out the list or name/value pairs

	  SELECT

	    @contents=SUBSTRING(@json, @OpenDelimiter+1,

	                        @NextCloseDelimiter-@OpenDelimiter-1)

	  SELECT

	    @JSON=STUFF(@json, @OpenDelimiter,

	                @NextCloseDelimiter-@OpenDelimiter+1,

	                '@'+@type+CONVERT(NVARCHAR(5), @parent_ID))

	  WHILE (PATINDEX('%[A-Za-z0-9@+.e]%', @contents collate SQL_Latin1_General_CP850_Bin))<>0 

	    BEGIN

	      IF @Type='Object' --it will be a 0-n list containing a string followed by a string, number,boolean, or null

	        BEGIN

	          SELECT

	            @SequenceNo=0,@end=CHARINDEX(':', ' '+@contents)--if there is anything, it will be a string-based name.

	          SELECT  @start=PATINDEX('%[^A-Za-z@][@]%', ' '+@contents collate SQL_Latin1_General_CP850_Bin)--AAAAAAAA

	          SELECT @token=SUBSTRING(' '+@contents, @start+1, @End-@Start-1),

	            @endofname=PATINDEX('%[0-9]%', @token collate SQL_Latin1_General_CP850_Bin),

	            @param=RIGHT(@token, LEN(@token)-@endofname+1)

	          SELECT

	            @token=LEFT(@token, @endofname-1),

	            @Contents=RIGHT(' '+@contents, LEN(' '+@contents+'|')-@end-1)

	          SELECT  @name=stringvalue FROM @strings

	            WHERE string_id=@param --fetch the name

	        END

	      ELSE 

	        SELECT @Name=null,@SequenceNo=@SequenceNo+1 

	      SELECT

	        @end=CHARINDEX(',', @contents)-- a string-token, object-token, list-token, number,boolean, or null

	      IF @end=0 

	        SELECT  @end=PATINDEX('%[A-Za-z0-9@+.e][^A-Za-z0-9@+.e]%', @Contents+' ' collate SQL_Latin1_General_CP850_Bin)

	          +1

	       SELECT

	        @start=PATINDEX('%[^A-Za-z0-9@+.e][A-Za-z0-9@+.e]%', ' '+@contents collate SQL_Latin1_General_CP850_Bin)

	      --select @start,@end, LEN(@contents+'|'), @contents  

	      SELECT

	        @Value=RTRIM(SUBSTRING(@contents, @start, @End-@Start)),

	        @Contents=RIGHT(@contents+' ', LEN(@contents+'|')-@end)

	      IF SUBSTRING(@value, 1, 7)='@object' 

	        INSERT INTO @hierarchy

	          (NAME, SequenceNo, parent_ID, StringValue, Object_ID, ValueType)

	          SELECT @name, @SequenceNo, @parent_ID, SUBSTRING(@value, 8, 5),

	            SUBSTRING(@value, 8, 5), 'object' 

	      ELSE 

	        IF SUBSTRING(@value, 1, 6)='@array' 

	          INSERT INTO @hierarchy

	            (NAME, SequenceNo, parent_ID, StringValue, Object_ID, ValueType)

	            SELECT @name, @SequenceNo, @parent_ID, SUBSTRING(@value, 7, 5),

	              SUBSTRING(@value, 7, 5), 'array' 

	        ELSE 

	          IF SUBSTRING(@value, 1, 7)='@string' 

	            INSERT INTO @hierarchy

	              (NAME, SequenceNo, parent_ID, StringValue, ValueType)

	              SELECT @name, @SequenceNo, @parent_ID, stringvalue, 'string'

	              FROM @strings

	              WHERE string_id=SUBSTRING(@value, 8, 5)

	          ELSE 

	            IF @value IN ('true', 'false') 

	              INSERT INTO @hierarchy

	                (NAME, SequenceNo, parent_ID, StringValue, ValueType)

	                SELECT @name, @SequenceNo, @parent_ID, @value, 'boolean'

	            ELSE

	              IF @value='null' 

	                INSERT INTO @hierarchy

	                  (NAME, SequenceNo, parent_ID, StringValue, ValueType)

	                  SELECT @name, @SequenceNo, @parent_ID, @value, 'null'

	              ELSE

	                IF PATINDEX('%[^0-9]%', @value collate SQL_Latin1_General_CP850_Bin)>0 

	                  INSERT INTO @hierarchy

	                    (NAME, SequenceNo, parent_ID, StringValue, ValueType)

	                    SELECT @name, @SequenceNo, @parent_ID, @value, 'real'

	                ELSE

	                  INSERT INTO @hierarchy

	                    (NAME, SequenceNo, parent_ID, StringValue, ValueType)

	                    SELECT @name, @SequenceNo, @parent_ID, @value, 'int'

	      if @Contents=' ' Select @SequenceNo=0

	    END

	  END

	INSERT INTO @hierarchy (NAME, SequenceNo, parent_ID, StringValue, Object_ID, ValueType)

	  SELECT '-',1, NULL, '', @parent_id-1, @type

	--

	   RETURN

	END
GO
/****** Object:  UserDefinedFunction [dbo].[SEL_PROVEEDOR_ESPECIALIDAD_FN]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[SEL_PROVEEDOR_ESPECIALIDAD_FN] (
	@idProveedor numeric(18,0)
)
RETURNS nvarchar(max)
as
begin

	DECLARE @result nvarchar(max)
	
	SET @result = ''
	
	SELECT @result = @result + esp.especialidad + ' | ' 
	FROM dbo.Proveedor pro
		LEFT JOIN dbo.ProveedorEspecialidad pes ON pes.idProveedor = pro.idProveedor
		LEFT JOIN dbo.Especialidad esp ON esp.idEspecialidad = pes.idEspecialidad
	 WHERE  pro.idProveedor = @idProveedor
	 
	select @result = substring(@result, 0, len(@result) - 1) 
	
	return @result

end
GO
/****** Object:  UserDefinedFunction [dbo].[SEL_PROVEEDOR_TIPO_UNIDAD_FN]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create function [dbo].[SEL_PROVEEDOR_TIPO_UNIDAD_FN] (
	@idProveedor numeric(18,0)
)
RETURNS nvarchar(max)
as
begin

	DECLARE @result nvarchar(max)
	
	SET @result = ''
	
	SELECT @result = @result + tun.tipo + ' | ' 
	FROM dbo.Proveedor pro
		LEFT JOIN dbo.ProveedorTipoUnidad ptu ON ptu.idProveedor = pro.idProveedor
		LEFT JOIN dbo.TipoUnidad tun ON tun.idTipoUnidad = ptu.idTipoUnidad
	 WHERE  pro.idProveedor = @idProveedor
	 
	select @result = substring(@result, 0, len(@result) - 1) 
	
	return @result

end
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[idCategoria] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[categoria] [nvarchar](200) NULL,
	[descripcion] [nvarchar](500) NULL,
	[estatus] [nchar](10) NULL,
 CONSTRAINT [PK_Categoria] PRIMARY KEY CLUSTERED 
(
	[idCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Cliente]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Cliente](
	[idCliente] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreComercial] [nvarchar](200) NULL,
	[razonSocial] [nvarchar](500) NULL,
	[rfc] [nvarchar](20) NULL,
	[direccion] [nvarchar](200) NULL,
	[telefono] [nvarchar](50) NULL,
	[estatus] [smallint] NULL,
 CONSTRAINT [PK_Cliente] PRIMARY KEY CLUSTERED 
(
	[idCliente] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Contrato]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Contrato](
	[idContrato] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idLicitacion] [numeric](18, 0) NOT NULL,
	[numero] [nvarchar](50) NOT NULL,
	[descripcion] [nvarchar](500) NOT NULL,
	[fechaInicio] [datetime] NOT NULL,
	[estatus] [smallint] NOT NULL,
 CONSTRAINT [PK__Licitaci__F1FD22475BF05B73] PRIMARY KEY CLUSTERED 
(
	[idContrato] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ContratoPartida]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContratoPartida](
	[idContratoPartida] [numeric](18, 0) NOT NULL,
	[idContratoUnidad] [numeric](18, 0) NOT NULL,
	[idPartida] [numeric](18, 0) NOT NULL,
	[venta] [decimal](18, 2) NOT NULL,
	[fecha] [datetime] NOT NULL,
	[idUsuario] [numeric](18, 0) NULL,
 CONSTRAINT [PK_ContratoPartida_1] PRIMARY KEY CLUSTERED 
(
	[idContratoPartida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ContratoProveedor]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContratoProveedor](
	[idContratoProveedor] [numeric](18, 0) NOT NULL,
	[idContrato] [numeric](18, 0) NOT NULL,
	[idProveedor] [numeric](18, 0) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[idContratoProveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ContratoProveedorZona]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContratoProveedorZona](
	[idContratoProveedorZona] [numeric](18, 0) NOT NULL,
	[idContratoProveedor] [numeric](18, 0) NULL,
	[idZona] [numeric](18, 0) NULL,
 CONSTRAINT [PK_ContratoProveedorZona] PRIMARY KEY CLUSTERED 
(
	[idContratoProveedorZona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ContratoUnidad]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ContratoUnidad](
	[idContratoUnidad] [numeric](18, 0) NOT NULL,
	[idContrato] [numeric](18, 0) NULL,
	[idUnidad] [numeric](18, 0) NULL,
PRIMARY KEY CLUSTERED 
(
	[idContratoUnidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[CotizacionEstatus]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[CotizacionEstatus](
	[idCotizacionEstatus] [numeric](18, 0) NOT NULL,
	[estatus] [nvarchar](50) NULL,
 CONSTRAINT [PK_CotizacionEstatus] PRIMARY KEY CLUSTERED 
(
	[idCotizacionEstatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Documento]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Documento](
	[idDocumento] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[folio] [nvarchar](20) NULL,
	[descripcion] [nvarchar](max) NULL,
	[requerido] [int] NULL,
	[estatus] [int] NULL,
 CONSTRAINT [PK_Documento] PRIMARY KEY CLUSTERED 
(
	[idDocumento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Empresa]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Empresa](
	[idEmpresa] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreComercial] [nvarchar](200) NOT NULL,
	[razonSocial] [nvarchar](200) NULL,
	[rfc] [nvarchar](20) NULL,
	[estatus] [smallint] NULL,
	[direccion] [nvarchar](500) NULL,
 CONSTRAINT [PK_Empresa] PRIMARY KEY CLUSTERED 
(
	[idEmpresa] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Especialidad]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Especialidad](
	[idEspecialidad] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[especialidad] [nvarchar](200) NOT NULL,
	[estatus] [smallint] NULL,
 CONSTRAINT [PK_Especialidades] PRIMARY KEY CLUSTERED 
(
	[idEspecialidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Licitacion]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Licitacion](
	[idLicitacion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idCliente] [numeric](18, 0) NOT NULL,
	[idClienteFinal] [numeric](18, 0) NOT NULL,
	[folio] [nvarchar](50) NOT NULL,
	[nombre] [nvarchar](200) NOT NULL,
	[descripcion] [nvarchar](500) NOT NULL,
	[fechaInicio] [datetime] NOT NULL,
	[estatus] [int] NOT NULL,
 CONSTRAINT [PK_Contrato] PRIMARY KEY CLUSTERED 
(
	[idLicitacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Marca]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Marca](
	[idMarca] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombre] [nvarchar](200) NOT NULL,
	[estatus] [smallint] NOT NULL,
 CONSTRAINT [PK_Marca] PRIMARY KEY CLUSTERED 
(
	[idMarca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[NivelZona]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NivelZona](
	[idNivelZona] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idCliente] [numeric](18, 0) NOT NULL,
	[etiqueta] [nvarchar](200) NOT NULL,
	[orden] [smallint] NOT NULL,
 CONSTRAINT [PK_Nivel] PRIMARY KEY CLUSTERED 
(
	[idNivelZona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Partida]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Partida](
	[idPartida] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idUnidad] [numeric](18, 0) NOT NULL,
	[idEspecialidad] [numeric](18, 0) NULL,
	[idPartidaClasificacion] [numeric](18, 0) NOT NULL,
	[idPartidaSubClasificacion] [numeric](18, 0) NULL,
	[partida] [nvarchar](50) NOT NULL,
	[noParte] [nvarchar](200) NOT NULL,
	[descripcion] [nvarchar](500) NULL,
	[foto] [nvarchar](50) NULL,
	[instructivo] [nvarchar](50) NULL,
	[estatus] [smallint] NULL,
 CONSTRAINT [PK__Partida__552192F6D4C6D296] PRIMARY KEY CLUSTERED 
(
	[idPartida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PartidaClasificacion]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PartidaClasificacion](
	[idPartidaClasificacion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[clasificacion] [nvarchar](200) NOT NULL,
	[descripcion] [nvarchar](500) NULL,
	[estatus] [smallint] NULL,
 CONSTRAINT [PK_Clasificacion] PRIMARY KEY CLUSTERED 
(
	[idPartidaClasificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PartidaEstatus]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PartidaEstatus](
	[idPartidaEstatus] [numeric](18, 0) NOT NULL,
	[estatus] [nvarchar](50) NULL,
 CONSTRAINT [PK_PartidaEstatus] PRIMARY KEY CLUSTERED 
(
	[idPartidaEstatus] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[PartidaSubClasificacion]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PartidaSubClasificacion](
	[idPartidaSubClasificacion] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[subClasificacion] [nvarchar](200) NOT NULL,
	[descripcion] [nvarchar](500) NOT NULL,
	[estatus] [smallint] NOT NULL,
 CONSTRAINT [PK_ClasificacionN2] PRIMARY KEY CLUSTERED 
(
	[idPartidaSubClasificacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Perfil]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Perfil](
	[idPerfil] [numeric](18, 0) NOT NULL,
	[descripcion] [nvarchar](200) NULL,
	[estatus] [smallint] NULL,
 CONSTRAINT [PK_Perfil] PRIMARY KEY CLUSTERED 
(
	[idPerfil] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Proveedor]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Proveedor](
	[idProveedor] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[nombreComercial] [nvarchar](200) NULL,
	[razonSocial] [nvarchar](500) NULL,
	[RFC] [nvarchar](20) NULL,
	[fechaInicio] [datetime] NULL,
	[idCategoria] [numeric](18, 0) NOT NULL,
	[direccion] [nvarchar](500) NULL,
	[latitud] [nvarchar](50) NULL,
	[longitud] [nvarchar](50) NULL,
	[poligono] [nvarchar](200) NULL,
	[estatus] [int] NULL,
 CONSTRAINT [PK_Proveedor] PRIMARY KEY CLUSTERED 
(
	[idProveedor] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProveedorCotizacion]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProveedorCotizacion](
	[idProveedorCotizacion] [numeric](18, 0) NOT NULL,
	[idProveedor] [numeric](18, 0) NULL,
	[fecha] [nchar](10) NULL,
	[idCotizacionEstatus] [numeric](18, 0) NULL,
	[fechaModificacion] [datetime] NULL,
	[idUnidad] [numeric](18, 0) NULL,
 CONSTRAINT [PK_ProveedorCotizacion] PRIMARY KEY CLUSTERED 
(
	[idProveedorCotizacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProveedorDocumento]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProveedorDocumento](
	[idProveedorDocumento] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idProveedor] [numeric](18, 0) NULL,
	[idDocumento] [numeric](18, 0) NULL,
	[archivo] [nvarchar](500) NULL,
	[fechaCarga] [datetime] NULL,
 CONSTRAINT [PK_ProveedorDocumento] PRIMARY KEY CLUSTERED 
(
	[idProveedorDocumento] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProveedorEspecialidad]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProveedorEspecialidad](
	[idProveedorEspecialidad] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idProveedor] [numeric](18, 0) NULL,
	[idEspecialidad] [numeric](18, 0) NULL,
 CONSTRAINT [PK_ProveedorEspecialidad] PRIMARY KEY CLUSTERED 
(
	[idProveedorEspecialidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProveedorPartida]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProveedorPartida](
	[idProveedorPartida] [numeric](18, 0) NOT NULL,
	[idProveedorCotizacion] [numeric](18, 0) NOT NULL,
	[idPartida] [numeric](18, 0) NOT NULL,
	[costo] [decimal](18, 2) NOT NULL,
	[fecha] [datetime] NULL,
	[idUsuario] [numeric](18, 0) NULL,
	[idPartidaEstatus] [numeric](18, 0) NULL,
 CONSTRAINT [PK_ContratoPartida] PRIMARY KEY CLUSTERED 
(
	[idProveedorPartida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProveedorPartidaNota]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProveedorPartidaNota](
	[idProveedorPartidaNota] [numeric](18, 0) NOT NULL,
	[idContratoProveedor] [numeric](18, 0) NULL,
	[nota] [nvarchar](200) NULL,
	[fecha] [datetime] NULL,
	[idUsuario] [numeric](18, 0) NULL,
 CONSTRAINT [PK_ContratoProveedorPartidaNota] PRIMARY KEY CLUSTERED 
(
	[idProveedorPartidaNota] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[ProveedorTipoUnidad]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[ProveedorTipoUnidad](
	[idProveedorTipoUnidad] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idProveedor] [numeric](18, 0) NOT NULL,
	[idTipoUnidad] [numeric](18, 0) NOT NULL,
 CONSTRAINT [PK_ProveedorTipoUnidad] PRIMARY KEY CLUSTERED 
(
	[idProveedorTipoUnidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[SubMarca]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SubMarca](
	[idSubMarca] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idMarca] [numeric](18, 0) NOT NULL,
	[nombre] [nvarchar](200) NOT NULL,
	[estatus] [smallint] NOT NULL,
 CONSTRAINT [PK_SubMarca] PRIMARY KEY CLUSTERED 
(
	[idSubMarca] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[TipoUnidad]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TipoUnidad](
	[idTipoUnidad] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[tipo] [nvarchar](500) NULL,
	[estatus] [nchar](10) NULL,
 CONSTRAINT [PK_Tipo] PRIMARY KEY CLUSTERED 
(
	[idTipoUnidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Unidad]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Unidad](
	[idUnidad] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idTipoUnidad] [numeric](18, 0) NOT NULL,
	[idSubMarca] [numeric](18, 0) NOT NULL,
	[anio] [nvarchar](50) NULL,
	[version] [nvarchar](100) NULL,
	[foto] [nvarchar](50) NULL,
	[estatus] [smallint] NOT NULL,
 CONSTRAINT [PK_Unidad] PRIMARY KEY CLUSTERED 
(
	[idUnidad] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[idUsuario] [numeric](18, 0) NOT NULL,
	[nombre] [nvarchar](200) NOT NULL,
	[usuario] [nvarchar](50) NOT NULL,
	[password] [nvarchar](50) NOT NULL,
	[idPerfil] [numeric](18, 0) NOT NULL,
	[estatus] [smallint] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[idUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Zona]    Script Date: 24/05/2017 12:54:05 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Zona](
	[idZona] [numeric](18, 0) IDENTITY(1,1) NOT NULL,
	[idNivelZona] [numeric](18, 0) NOT NULL,
	[idPadre] [numeric](18, 0) NOT NULL,
	[nombre] [nvarchar](200) NOT NULL,
	[estatus] [smallint] NOT NULL,
 CONSTRAINT [PK_Zona] PRIMARY KEY CLUSTERED 
(
	[idZona] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[Categoria] ON 

INSERT [dbo].[Categoria] ([idCategoria], [categoria], [descripcion], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), N'A', N'Clase A', N'1         ')
INSERT [dbo].[Categoria] ([idCategoria], [categoria], [descripcion], [estatus]) VALUES (CAST(2 AS Numeric(18, 0)), N'B', N'Clase B', N'1         ')
SET IDENTITY_INSERT [dbo].[Categoria] OFF
SET IDENTITY_INSERT [dbo].[Cliente] ON 

INSERT [dbo].[Cliente] ([idCliente], [nombreComercial], [razonSocial], [rfc], [direccion], [telefono], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), N'PEMEX', N'Petroleos Mexicanos', N'ERTYUIOP', N'Avenida Marina Nacional #329 C 3, Col. Verónica Anzures, Del. Miguel Hidalgo, 
Distrito Federal C.P. 11300', N'(+52 55) 1944 2500.', 1)
INSERT [dbo].[Cliente] ([idCliente], [nombreComercial], [razonSocial], [rfc], [direccion], [telefono], [estatus]) VALUES (CAST(4 AS Numeric(18, 0)), N'aa', N'aa', N'aaa', N'aaaaa', N'333', 1)
SET IDENTITY_INSERT [dbo].[Cliente] OFF
SET IDENTITY_INSERT [dbo].[Contrato] ON 

INSERT [dbo].[Contrato] ([idContrato], [idLicitacion], [numero], [descripcion], [fechaInicio], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), N'XXX768', N'Desc.', CAST(N'2017-05-31 00:00:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Contrato] OFF
INSERT [dbo].[CotizacionEstatus] ([idCotizacionEstatus], [estatus]) VALUES (CAST(5 AS Numeric(18, 0)), N'Aprobada')
SET IDENTITY_INSERT [dbo].[Empresa] ON 

INSERT [dbo].[Empresa] ([idEmpresa], [nombreComercial], [razonSocial], [rfc], [estatus], [direccion]) VALUES (CAST(1 AS Numeric(18, 0)), N'ASE', N'AutoExpress Servicios de Excelencia Pedregal SA de CV', N'ASEP98765678', 1, NULL)
INSERT [dbo].[Empresa] ([idEmpresa], [nombreComercial], [razonSocial], [rfc], [estatus], [direccion]) VALUES (CAST(2 AS Numeric(18, 0)), N'Integra', N'Integra Sofom', N'INT98789097', 1, NULL)
SET IDENTITY_INSERT [dbo].[Empresa] OFF
SET IDENTITY_INSERT [dbo].[Especialidad] ON 

INSERT [dbo].[Especialidad] ([idEspecialidad], [especialidad], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), N'Suspensión', 1)
INSERT [dbo].[Especialidad] ([idEspecialidad], [especialidad], [estatus]) VALUES (CAST(2 AS Numeric(18, 0)), N'Frenos', 1)
SET IDENTITY_INSERT [dbo].[Especialidad] OFF
SET IDENTITY_INSERT [dbo].[Licitacion] ON 

INSERT [dbo].[Licitacion] ([idLicitacion], [idCliente], [idClienteFinal], [folio], [nombre], [descripcion], [fechaInicio], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), N'111', N'Mantenimiento Autotanques', N'Contrato de mantenimiento AT PEMEX', CAST(N'2016-03-01 00:00:00.000' AS DateTime), 1)
INSERT [dbo].[Licitacion] ([idLicitacion], [idCliente], [idClienteFinal], [folio], [nombre], [descripcion], [fechaInicio], [estatus]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), N'345', N'Arrendamiento 920 unidades', N'Contrato de Arrendamiento 920 Unidades', CAST(N'2017-01-01 00:00:00.000' AS DateTime), 1)
SET IDENTITY_INSERT [dbo].[Licitacion] OFF
SET IDENTITY_INSERT [dbo].[Marca] ON 

INSERT [dbo].[Marca] ([idMarca], [nombre], [estatus]) VALUES (CAST(6 AS Numeric(18, 0)), N'NISSAN', 1)
INSERT [dbo].[Marca] ([idMarca], [nombre], [estatus]) VALUES (CAST(8 AS Numeric(18, 0)), N'FORD', 1)
SET IDENTITY_INSERT [dbo].[Marca] OFF
SET IDENTITY_INSERT [dbo].[NivelZona] ON 

INSERT [dbo].[NivelZona] ([idNivelZona], [idCliente], [etiqueta], [orden]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), N'Zona', 1)
INSERT [dbo].[NivelZona] ([idNivelZona], [idCliente], [etiqueta], [orden]) VALUES (CAST(3 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), N'TAR', 2)
INSERT [dbo].[NivelZona] ([idNivelZona], [idCliente], [etiqueta], [orden]) VALUES (CAST(5 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), N'Gerencia', 3)
SET IDENTITY_INSERT [dbo].[NivelZona] OFF
SET IDENTITY_INSERT [dbo].[Partida] ON 

INSERT [dbo].[Partida] ([idPartida], [idUnidad], [idEspecialidad], [idPartidaClasificacion], [idPartidaSubClasificacion], [partida], [noParte], [descripcion], [foto], [instructivo], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), N'partidaxx', N'xxparte', N'desc.xx', N'1495566416223.png', N'1495564500036.pdf', 1)
SET IDENTITY_INSERT [dbo].[Partida] OFF
SET IDENTITY_INSERT [dbo].[PartidaClasificacion] ON 

INSERT [dbo].[PartidaClasificacion] ([idPartidaClasificacion], [clasificacion], [descripcion], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), N'Clasificación 1', N'desc1', 1)
INSERT [dbo].[PartidaClasificacion] ([idPartidaClasificacion], [clasificacion], [descripcion], [estatus]) VALUES (CAST(2 AS Numeric(18, 0)), N'Clasificacion 2', N'desc2', 1)
SET IDENTITY_INSERT [dbo].[PartidaClasificacion] OFF
SET IDENTITY_INSERT [dbo].[PartidaSubClasificacion] ON 

INSERT [dbo].[PartidaSubClasificacion] ([idPartidaSubClasificacion], [subClasificacion], [descripcion], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), N'Sub Clasificación 1', N'desc 1', 1)
SET IDENTITY_INSERT [dbo].[PartidaSubClasificacion] OFF
SET IDENTITY_INSERT [dbo].[Proveedor] ON 

INSERT [dbo].[Proveedor] ([idProveedor], [nombreComercial], [razonSocial], [RFC], [fechaInicio], [idCategoria], [direccion], [latitud], [longitud], [poligono], [estatus]) VALUES (CAST(6 AS Numeric(18, 0)), N'nombre', N'razón', N'rfc', CAST(N'2017-05-26 05:00:00.000' AS DateTime), CAST(2 AS Numeric(18, 0)), N'lago bolsena 101', N'19.4460793', N'-99.18786779999999', NULL, 1)
INSERT [dbo].[Proveedor] ([idProveedor], [nombreComercial], [razonSocial], [RFC], [fechaInicio], [idCategoria], [direccion], [latitud], [longitud], [poligono], [estatus]) VALUES (CAST(7 AS Numeric(18, 0)), N'Proveedor 2 sa de cv', N'Proveedor 2 sa de cv', N'JKHGF98769LKJH', CAST(N'2017-05-17 05:00:00.000' AS DateTime), CAST(2 AS Numeric(18, 0)), N'parque fundidora', N'28.66160519999999', N'-105.97974120000003', NULL, 1)
SET IDENTITY_INSERT [dbo].[Proveedor] OFF
SET IDENTITY_INSERT [dbo].[ProveedorEspecialidad] ON 

INSERT [dbo].[ProveedorEspecialidad] ([idProveedorEspecialidad], [idProveedor], [idEspecialidad]) VALUES (CAST(4 AS Numeric(18, 0)), CAST(6 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[ProveedorEspecialidad] ([idProveedorEspecialidad], [idProveedor], [idEspecialidad]) VALUES (CAST(5 AS Numeric(18, 0)), CAST(7 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[ProveedorEspecialidad] ([idProveedorEspecialidad], [idProveedor], [idEspecialidad]) VALUES (CAST(6 AS Numeric(18, 0)), CAST(7 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
SET IDENTITY_INSERT [dbo].[ProveedorEspecialidad] OFF
SET IDENTITY_INSERT [dbo].[ProveedorTipoUnidad] ON 

INSERT [dbo].[ProveedorTipoUnidad] ([idProveedorTipoUnidad], [idProveedor], [idTipoUnidad]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(7 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)))
INSERT [dbo].[ProveedorTipoUnidad] ([idProveedorTipoUnidad], [idProveedor], [idTipoUnidad]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(7 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)))
INSERT [dbo].[ProveedorTipoUnidad] ([idProveedorTipoUnidad], [idProveedor], [idTipoUnidad]) VALUES (CAST(3 AS Numeric(18, 0)), CAST(7 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)))
SET IDENTITY_INSERT [dbo].[ProveedorTipoUnidad] OFF
SET IDENTITY_INSERT [dbo].[SubMarca] ON 

INSERT [dbo].[SubMarca] ([idSubMarca], [idMarca], [nombre], [estatus]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(6 AS Numeric(18, 0)), N'Sentra', 1)
INSERT [dbo].[SubMarca] ([idSubMarca], [idMarca], [nombre], [estatus]) VALUES (CAST(3 AS Numeric(18, 0)), CAST(8 AS Numeric(18, 0)), N'F-150', 1)
INSERT [dbo].[SubMarca] ([idSubMarca], [idMarca], [nombre], [estatus]) VALUES (CAST(4 AS Numeric(18, 0)), CAST(6 AS Numeric(18, 0)), N'Versa', 1)
SET IDENTITY_INSERT [dbo].[SubMarca] OFF
SET IDENTITY_INSERT [dbo].[TipoUnidad] ON 

INSERT [dbo].[TipoUnidad] ([idTipoUnidad], [tipo], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), N'Auto Tanques 10T', N'1         ')
INSERT [dbo].[TipoUnidad] ([idTipoUnidad], [tipo], [estatus]) VALUES (CAST(2 AS Numeric(18, 0)), N'Autos Sedan', N'1         ')
INSERT [dbo].[TipoUnidad] ([idTipoUnidad], [tipo], [estatus]) VALUES (CAST(3 AS Numeric(18, 0)), N'Camionetas', N'1         ')
SET IDENTITY_INSERT [dbo].[TipoUnidad] OFF
SET IDENTITY_INSERT [dbo].[Unidad] ON 

INSERT [dbo].[Unidad] ([idUnidad], [idTipoUnidad], [idSubMarca], [anio], [version], [foto], [estatus]) VALUES (CAST(5 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), N'2019', N'versión 1', N'1495476645799.png', 1)
SET IDENTITY_INSERT [dbo].[Unidad] OFF
SET IDENTITY_INSERT [dbo].[Zona] ON 

INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(1 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(0 AS Numeric(18, 0)), N'Norte', 1)
INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(2 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), CAST(0 AS Numeric(18, 0)), N'Sur', 1)
INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(3 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), CAST(1 AS Numeric(18, 0)), N'Sonora', 1)
INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(4 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), N'Yucatán', 1)
INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(5 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), CAST(2 AS Numeric(18, 0)), N'Tabasco', 1)
INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(6 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), CAST(3 AS Numeric(18, 0)), N'Gerencia 1', 1)
INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(7 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)), N'Gerencia 2', 1)
INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(8 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), CAST(4 AS Numeric(18, 0)), N'Gerencia 3', 1)
INSERT [dbo].[Zona] ([idZona], [idNivelZona], [idPadre], [nombre], [estatus]) VALUES (CAST(9 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), CAST(5 AS Numeric(18, 0)), N'Gerencia 4', 1)
SET IDENTITY_INSERT [dbo].[Zona] OFF
ALTER TABLE [dbo].[Contrato]  WITH CHECK ADD  CONSTRAINT [FK_Contrato_Licitacion] FOREIGN KEY([idLicitacion])
REFERENCES [dbo].[Licitacion] ([idLicitacion])
GO
ALTER TABLE [dbo].[Contrato] CHECK CONSTRAINT [FK_Contrato_Licitacion]
GO
ALTER TABLE [dbo].[ContratoPartida]  WITH CHECK ADD  CONSTRAINT [FK_ContratoPartida_ContratoUnidad] FOREIGN KEY([idContratoUnidad])
REFERENCES [dbo].[ContratoUnidad] ([idContratoUnidad])
GO
ALTER TABLE [dbo].[ContratoPartida] CHECK CONSTRAINT [FK_ContratoPartida_ContratoUnidad]
GO
ALTER TABLE [dbo].[ContratoPartida]  WITH CHECK ADD  CONSTRAINT [FK_ContratoPartida_Partida1] FOREIGN KEY([idPartida])
REFERENCES [dbo].[Partida] ([idPartida])
GO
ALTER TABLE [dbo].[ContratoPartida] CHECK CONSTRAINT [FK_ContratoPartida_Partida1]
GO
ALTER TABLE [dbo].[ContratoPartida]  WITH CHECK ADD  CONSTRAINT [FK_ContratoPartida_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[ContratoPartida] CHECK CONSTRAINT [FK_ContratoPartida_Usuario]
GO
ALTER TABLE [dbo].[ContratoProveedor]  WITH CHECK ADD  CONSTRAINT [FK_ContratoProveedor_Proveedor] FOREIGN KEY([idProveedor])
REFERENCES [dbo].[Proveedor] ([idProveedor])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ContratoProveedor] CHECK CONSTRAINT [FK_ContratoProveedor_Proveedor]
GO
ALTER TABLE [dbo].[ContratoProveedor]  WITH CHECK ADD  CONSTRAINT [FK_LictacionProveedor_Licitacion] FOREIGN KEY([idContrato])
REFERENCES [dbo].[Contrato] ([idContrato])
GO
ALTER TABLE [dbo].[ContratoProveedor] CHECK CONSTRAINT [FK_LictacionProveedor_Licitacion]
GO
ALTER TABLE [dbo].[ContratoProveedorZona]  WITH CHECK ADD  CONSTRAINT [FK_ContratoProveedorZona_ContratoProveedor] FOREIGN KEY([idContratoProveedor])
REFERENCES [dbo].[ContratoProveedor] ([idContratoProveedor])
GO
ALTER TABLE [dbo].[ContratoProveedorZona] CHECK CONSTRAINT [FK_ContratoProveedorZona_ContratoProveedor]
GO
ALTER TABLE [dbo].[ContratoProveedorZona]  WITH CHECK ADD  CONSTRAINT [FK_ContratoProveedorZona_Zona] FOREIGN KEY([idZona])
REFERENCES [dbo].[Zona] ([idZona])
GO
ALTER TABLE [dbo].[ContratoProveedorZona] CHECK CONSTRAINT [FK_ContratoProveedorZona_Zona]
GO
ALTER TABLE [dbo].[ContratoUnidad]  WITH CHECK ADD  CONSTRAINT [FK_LicitacionUnidad_Licitacion] FOREIGN KEY([idContrato])
REFERENCES [dbo].[Contrato] ([idContrato])
GO
ALTER TABLE [dbo].[ContratoUnidad] CHECK CONSTRAINT [FK_LicitacionUnidad_Licitacion]
GO
ALTER TABLE [dbo].[Licitacion]  WITH CHECK ADD  CONSTRAINT [FK_Contrato_Cliente] FOREIGN KEY([idCliente])
REFERENCES [dbo].[Cliente] ([idCliente])
GO
ALTER TABLE [dbo].[Licitacion] CHECK CONSTRAINT [FK_Contrato_Cliente]
GO
ALTER TABLE [dbo].[Licitacion]  WITH CHECK ADD  CONSTRAINT [FK_Licitacion_Cliente] FOREIGN KEY([idClienteFinal])
REFERENCES [dbo].[Cliente] ([idCliente])
GO
ALTER TABLE [dbo].[Licitacion] CHECK CONSTRAINT [FK_Licitacion_Cliente]
GO
ALTER TABLE [dbo].[NivelZona]  WITH CHECK ADD  CONSTRAINT [FK_Nivel_Cliente] FOREIGN KEY([idCliente])
REFERENCES [dbo].[Cliente] ([idCliente])
GO
ALTER TABLE [dbo].[NivelZona] CHECK CONSTRAINT [FK_Nivel_Cliente]
GO
ALTER TABLE [dbo].[Partida]  WITH CHECK ADD  CONSTRAINT [FK_Partida_ClasificacionN1] FOREIGN KEY([idPartidaClasificacion])
REFERENCES [dbo].[PartidaClasificacion] ([idPartidaClasificacion])
GO
ALTER TABLE [dbo].[Partida] CHECK CONSTRAINT [FK_Partida_ClasificacionN1]
GO
ALTER TABLE [dbo].[Partida]  WITH CHECK ADD  CONSTRAINT [FK_Partida_ClasificacionN2] FOREIGN KEY([idPartidaSubClasificacion])
REFERENCES [dbo].[PartidaSubClasificacion] ([idPartidaSubClasificacion])
GO
ALTER TABLE [dbo].[Partida] CHECK CONSTRAINT [FK_Partida_ClasificacionN2]
GO
ALTER TABLE [dbo].[Partida]  WITH CHECK ADD  CONSTRAINT [FK_Partida_Especialidad] FOREIGN KEY([idEspecialidad])
REFERENCES [dbo].[Especialidad] ([idEspecialidad])
GO
ALTER TABLE [dbo].[Partida] CHECK CONSTRAINT [FK_Partida_Especialidad]
GO
ALTER TABLE [dbo].[Partida]  WITH CHECK ADD  CONSTRAINT [FK_Partida_Unidad] FOREIGN KEY([idUnidad])
REFERENCES [dbo].[Unidad] ([idUnidad])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Partida] CHECK CONSTRAINT [FK_Partida_Unidad]
GO
ALTER TABLE [dbo].[Proveedor]  WITH CHECK ADD  CONSTRAINT [FK_Proveedor_Categoria] FOREIGN KEY([idCategoria])
REFERENCES [dbo].[Categoria] ([idCategoria])
GO
ALTER TABLE [dbo].[Proveedor] CHECK CONSTRAINT [FK_Proveedor_Categoria]
GO
ALTER TABLE [dbo].[ProveedorCotizacion]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorCotizacion_CotizacionEstatus] FOREIGN KEY([idCotizacionEstatus])
REFERENCES [dbo].[CotizacionEstatus] ([idCotizacionEstatus])
GO
ALTER TABLE [dbo].[ProveedorCotizacion] CHECK CONSTRAINT [FK_ProveedorCotizacion_CotizacionEstatus]
GO
ALTER TABLE [dbo].[ProveedorCotizacion]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorCotizacion_Proveedor] FOREIGN KEY([idProveedor])
REFERENCES [dbo].[Proveedor] ([idProveedor])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProveedorCotizacion] CHECK CONSTRAINT [FK_ProveedorCotizacion_Proveedor]
GO
ALTER TABLE [dbo].[ProveedorCotizacion]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorCotizacion_Unidad] FOREIGN KEY([idUnidad])
REFERENCES [dbo].[Unidad] ([idUnidad])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProveedorCotizacion] CHECK CONSTRAINT [FK_ProveedorCotizacion_Unidad]
GO
ALTER TABLE [dbo].[ProveedorDocumento]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorDocumento_Documento] FOREIGN KEY([idDocumento])
REFERENCES [dbo].[Documento] ([idDocumento])
GO
ALTER TABLE [dbo].[ProveedorDocumento] CHECK CONSTRAINT [FK_ProveedorDocumento_Documento]
GO
ALTER TABLE [dbo].[ProveedorDocumento]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorDocumento_Proveedor] FOREIGN KEY([idProveedor])
REFERENCES [dbo].[Proveedor] ([idProveedor])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProveedorDocumento] CHECK CONSTRAINT [FK_ProveedorDocumento_Proveedor]
GO
ALTER TABLE [dbo].[ProveedorEspecialidad]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorEspecialidad_Especialidad] FOREIGN KEY([idEspecialidad])
REFERENCES [dbo].[Especialidad] ([idEspecialidad])
GO
ALTER TABLE [dbo].[ProveedorEspecialidad] CHECK CONSTRAINT [FK_ProveedorEspecialidad_Especialidad]
GO
ALTER TABLE [dbo].[ProveedorEspecialidad]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorEspecialidad_Proveedor] FOREIGN KEY([idProveedor])
REFERENCES [dbo].[Proveedor] ([idProveedor])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProveedorEspecialidad] CHECK CONSTRAINT [FK_ProveedorEspecialidad_Proveedor]
GO
ALTER TABLE [dbo].[ProveedorPartida]  WITH CHECK ADD  CONSTRAINT [FK_ContratoPartida_Partida] FOREIGN KEY([idPartida])
REFERENCES [dbo].[Partida] ([idPartida])
GO
ALTER TABLE [dbo].[ProveedorPartida] CHECK CONSTRAINT [FK_ContratoPartida_Partida]
GO
ALTER TABLE [dbo].[ProveedorPartida]  WITH CHECK ADD  CONSTRAINT [FK_ContratoProveedorPartida_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[ProveedorPartida] CHECK CONSTRAINT [FK_ContratoProveedorPartida_Usuario]
GO
ALTER TABLE [dbo].[ProveedorPartida]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorPartida_PartidaEstatus] FOREIGN KEY([idPartidaEstatus])
REFERENCES [dbo].[PartidaEstatus] ([idPartidaEstatus])
GO
ALTER TABLE [dbo].[ProveedorPartida] CHECK CONSTRAINT [FK_ProveedorPartida_PartidaEstatus]
GO
ALTER TABLE [dbo].[ProveedorPartida]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorPartida_ProveedorCotizacion] FOREIGN KEY([idProveedorCotizacion])
REFERENCES [dbo].[ProveedorCotizacion] ([idProveedorCotizacion])
GO
ALTER TABLE [dbo].[ProveedorPartida] CHECK CONSTRAINT [FK_ProveedorPartida_ProveedorCotizacion]
GO
ALTER TABLE [dbo].[ProveedorPartidaNota]  WITH CHECK ADD  CONSTRAINT [FK_ContratoProveedorPartidaNota_ContratoProveedorPartida] FOREIGN KEY([idContratoProveedor])
REFERENCES [dbo].[ProveedorPartida] ([idProveedorPartida])
GO
ALTER TABLE [dbo].[ProveedorPartidaNota] CHECK CONSTRAINT [FK_ContratoProveedorPartidaNota_ContratoProveedorPartida]
GO
ALTER TABLE [dbo].[ProveedorPartidaNota]  WITH CHECK ADD  CONSTRAINT [FK_ContratoProveedorPartidaNota_Usuario] FOREIGN KEY([idUsuario])
REFERENCES [dbo].[Usuario] ([idUsuario])
GO
ALTER TABLE [dbo].[ProveedorPartidaNota] CHECK CONSTRAINT [FK_ContratoProveedorPartidaNota_Usuario]
GO
ALTER TABLE [dbo].[ProveedorTipoUnidad]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorTipoUnidad_Proveedor] FOREIGN KEY([idProveedor])
REFERENCES [dbo].[Proveedor] ([idProveedor])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[ProveedorTipoUnidad] CHECK CONSTRAINT [FK_ProveedorTipoUnidad_Proveedor]
GO
ALTER TABLE [dbo].[ProveedorTipoUnidad]  WITH CHECK ADD  CONSTRAINT [FK_ProveedorTipoUnidad_TipoUnidad] FOREIGN KEY([idTipoUnidad])
REFERENCES [dbo].[TipoUnidad] ([idTipoUnidad])
GO
ALTER TABLE [dbo].[ProveedorTipoUnidad] CHECK CONSTRAINT [FK_ProveedorTipoUnidad_TipoUnidad]
GO
ALTER TABLE [dbo].[SubMarca]  WITH CHECK ADD  CONSTRAINT [FK_SubMarca_Marca] FOREIGN KEY([idMarca])
REFERENCES [dbo].[Marca] ([idMarca])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[SubMarca] CHECK CONSTRAINT [FK_SubMarca_Marca]
GO
ALTER TABLE [dbo].[Unidad]  WITH CHECK ADD  CONSTRAINT [FK_Unidad_SubMarca] FOREIGN KEY([idSubMarca])
REFERENCES [dbo].[SubMarca] ([idSubMarca])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Unidad] CHECK CONSTRAINT [FK_Unidad_SubMarca]
GO
ALTER TABLE [dbo].[Unidad]  WITH CHECK ADD  CONSTRAINT [FK_Unidad_Tipo] FOREIGN KEY([idTipoUnidad])
REFERENCES [dbo].[TipoUnidad] ([idTipoUnidad])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Unidad] CHECK CONSTRAINT [FK_Unidad_Tipo]
GO
ALTER TABLE [dbo].[Usuario]  WITH CHECK ADD  CONSTRAINT [FK_Usuario_Perfil] FOREIGN KEY([idPerfil])
REFERENCES [dbo].[Perfil] ([idPerfil])
GO
ALTER TABLE [dbo].[Usuario] CHECK CONSTRAINT [FK_Usuario_Perfil]
GO
ALTER TABLE [dbo].[Zona]  WITH CHECK ADD  CONSTRAINT [FK_Zona_Nivel] FOREIGN KEY([idNivelZona])
REFERENCES [dbo].[NivelZona] ([idNivelZona])
GO
ALTER TABLE [dbo].[Zona] CHECK CONSTRAINT [FK_Zona_Nivel]
GO
/****** Object:  StoredProcedure [dbo].[DEL_CLIENTE_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DEL_CLIENTE_SP] (
	@idCliente numeric(18,0)
)
as
begin

	DELETE FROM Partidas.dbo.Cliente WHERE idCliente = @idCliente
	
	SELECT @idCliente

end
GO
/****** Object:  StoredProcedure [dbo].[DEL_LICITACION_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DEL_LICITACION_SP] (
	@idLicitacion numeric(18,0)
)
as
begin

	DELETE FROM dbo.Licitacion WHERE idLicitacion = @idLicitacion

	SELECT @idLicitacion
	
end
GO
/****** Object:  StoredProcedure [dbo].[DEL_MARCA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DEL_MARCA_SP] (
	@idMarca numeric(18,0)
)
as
begin

	DELETE FROM dbo.Marca WHERE idMarca = @idMarca
	
	SELECT @idMarca

end
GO
/****** Object:  StoredProcedure [dbo].[DEL_PARTIDA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DEL_PARTIDA_SP] (
	@idPartida numeric(18,0)
)
as
begin

	DELETE FROM dbo.Partida WHERE idPartida = @idPartida
	
	SELECT @idPartida

end
GO
/****** Object:  StoredProcedure [dbo].[DEL_PROVEEDOR_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[DEL_PROVEEDOR_SP] (
	@idProveedor numeric(18,0)
)
as
begin

	DELETE FROM dbo.Proveedor WHERE idProveedor = @idProveedor
	
	SELECT @idProveedor

end
GO
/****** Object:  StoredProcedure [dbo].[DEL_SUBMARCA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[DEL_SUBMARCA_SP] (
	@idSubMarca numeric(18,0)
)
as
begin

	DELETE FROM dbo.SubMarca WHERE idSubMarca = @idSubMarca
	
	SELECT @idSubMarca
	
end
GO
/****** Object:  StoredProcedure [dbo].[DEL_UNIDAD_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[DEL_UNIDAD_SP] (
	@idUnidad numeric(18,0)
)
as
begin

	DELETE FROM dbo.Unidad WHERE idUnidad = @idUnidad
	
	SELECT @idUnidad

end
GO
/****** Object:  StoredProcedure [dbo].[INS_CLIENTE_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[INS_CLIENTE_SP] (
	@nombreComercial nvarchar(200),
	@razonSocial nvarchar(200),
	@rfc nvarchar(20),
	@direccion nvarchar(200),
	@telefono nvarchar(50)
	
)
as
begin

	INSERT INTO dbo.Cliente
		( nombreComercial, razonSocial, rfc, direccion, telefono, estatus )
	VALUES 
		(@nombreComercial, @razonSocial, @rfc, @direccion, @telefono, 1)
		
	SELECT @@IDENTITY

end
GO
/****** Object:  StoredProcedure [dbo].[INS_LICITACION_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[INS_LICITACION_SP] (
	@idCliente numeric(18,0),
	@idClienteFinal numeric(18,0),
	@folio nvarchar(50),
	@nombre nvarchar(200),
	@descripcion nvarchar(500),
	@fechaInicio datetime
)
as
begin

	INSERT INTO dbo.Licitacion
		( idCliente, idClienteFinal, folio, nombre, descripcion, fechaInicio, estatus)
	VALUES 
		( @idCliente, @idClienteFinal, @folio, @nombre, @descripcion, @fechaInicio, 1);
		
	SELECT @@IDENTITY

end
GO
/****** Object:  StoredProcedure [dbo].[INS_MARCA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_MARCA_SP] (
	@marca nvarchar(200)
)
as
begin

	
	INSERT INTO dbo.Marca
		(nombre, estatus)
	VALUES 
		(@marca, 1 );
		
	SELECT @@IDENTITY
end
GO
/****** Object:  StoredProcedure [dbo].[INS_NIVEL_ZONA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[INS_NIVEL_ZONA_SP] (
	@idCliente numeric(18,0),
	@etiqueta nvarchar(200),
	@orden smallint
)
as
begin

	INSERT INTO Partidas.dbo.NivelZona
		(idCliente, etiqueta, orden)
	VALUES 
		(@idCliente, @etiqueta, @orden);
		
	SELECT @@IDENTITY

end
GO
/****** Object:  StoredProcedure [dbo].[INS_PARTIDA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[INS_PARTIDA_SP] (
	@idUnidad numeric(18,0),
	@idEspecialidad numeric(18,0),
	@idPartidaClasificacion numeric(18,0),
	@idPartidaSubClasificacion numeric(18,0),
	@partida nvarchar(50),
	@noParte nvarchar(200),
	@descripcion nvarchar(500),
	@foto nvarchar(50),
	@instructivo nvarchar(50)
)
as
begin

	
	INSERT INTO dbo.Partida
			(idUnidad, idEspecialidad, idPartidaClasificacion, idPartidaSubClasificacion, partida, noParte, descripcion, foto, instructivo, estatus)
	VALUES 
		(@idUnidad, @idEspecialidad ,@idPartidaClasificacion, @idPartidaSubClasificacion , @partida, @noParte, @descripcion, REPLACE(@foto,'"',''), REPLACE(@instructivo,'"',''), 1);

	SELECT @@IDENTITY
	
end
GO
/****** Object:  StoredProcedure [dbo].[INS_PROVEEDOR_ESPECIALIDAD_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_PROVEEDOR_ESPECIALIDAD_SP] (
	@idProveedor numeric(18,0),
	@json nvarchar(max)
)
as
begin

	DECLARE @idEspecialidad AS numeric(18,0)
	
	--Insertar cotizaciones
	DECLARE @parent AS INT
	DECLARE _cursor CURSOR FOR 

	SELECT Object_ID FROM parseJSON(@json)
	WHERE 
	Object_ID IS NOT NULL
	AND ValueType = 'object' 
	ORDER BY Object_ID

	OPEN _cursor 
	FETCH NEXT FROM _cursor INTO @parent
	WHILE @@FETCH_STATUS = 0 
	BEGIN
		
		SELECT @idEspecialidad = REPLACE(StringValue,'"','')  FROM parseJSON(@json)
			WHERE 
			parent_ID = @parent
			AND NAME = 'idEspecialidad'
			AND Object_ID IS NULL
	
		INSERT INTO dbo.ProveedorEspecialidad
			(idProveedor, idEspecialidad)
		VALUES 
			(@idProveedor , @idEspecialidad);
	
	FETCH NEXT FROM _cursor INTO @parent
	END 
	CLOSE _cursor 
	DEALLOCATE _cursor
	
	SELECT @idProveedor as idProveedor

end
GO
/****** Object:  StoredProcedure [dbo].[INS_PROVEEDOR_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[INS_PROVEEDOR_SP] (
	@nombreComercial nvarchar(200),
	@razonSocial nvarchar(500),
	@RFC nvarchar(20),
	@fechaInicio datetime,
	@idCategoria numeric(18,0),
	@direccion nvarchar(500),
	@latitud nvarchar(50),
	@longitud nvarchar(50),
	@poligono nvarchar(200)
)
as
begin

	INSERT INTO dbo.Proveedor
		( nombreComercial, razonSocial, RFC, fechaInicio, idCategoria, direccion, latitud, longitud, poligono, estatus)
	VALUES 
		(@nombreComercial, @razonSocial, @RFC, @fechaInicio, @idCategoria, @direccion, @latitud, @longitud, @poligono, 1 );
		
	SELECT @@IDENTITY as idProveedor

end
GO
/****** Object:  StoredProcedure [dbo].[INS_PROVEEDOR_TIPO_UNIDAD_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_PROVEEDOR_TIPO_UNIDAD_SP] (
	@idProveedor numeric(18,0),
	@json nvarchar(max)
)
as
begin

	DECLARE @idTipoUnidad AS numeric(18,0)
	
	--Insertar cotizaciones
	DECLARE @parent AS INT
	DECLARE _cursor CURSOR FOR 

	SELECT Object_ID FROM parseJSON(@json)
	WHERE 
	Object_ID IS NOT NULL
	AND ValueType = 'object' 
	ORDER BY Object_ID

	OPEN _cursor 
	FETCH NEXT FROM _cursor INTO @parent
	WHILE @@FETCH_STATUS = 0 
	BEGIN
		
		SELECT @idTipoUnidad = REPLACE(StringValue,'"','')  FROM parseJSON(@json)
			WHERE 
			parent_ID = @parent
			AND NAME = 'idTipoUnidad'
			AND Object_ID IS NULL
	
		INSERT INTO dbo.ProveedorTipoUnidad
			(idProveedor, idTipoUnidad)
		VALUES 
			(@idProveedor , @idTipoUnidad);
	
	FETCH NEXT FROM _cursor INTO @parent
	END 
	CLOSE _cursor 
	DEALLOCATE _cursor
	
	SELECT @idProveedor as idProveedor

end
GO
/****** Object:  StoredProcedure [dbo].[INS_SUBMARCA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_SUBMARCA_SP] (
	@idMarca numeric(18,0),
	@subMarca nvarchar(200)
)
as
begin

	INSERT INTO  dbo.SubMarca
		( idMarca, nombre, estatus)
	VALUES 
		(@idMarca, @subMarca, 1)
		
		
	SELECT @@IDENTITY


end
GO
/****** Object:  StoredProcedure [dbo].[INS_UNIDAD_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[INS_UNIDAD_SP] (
	@idTipoUnidad numeric(18,0)
	,@idSubMarca numeric(18,0)
	,@anio nvarchar(100)
	,@version nvarchar(100)
	,@foto nvarchar(100)
)
as
begin

	INSERT INTO dbo.Unidad
		(idTipoUnidad, idSubMarca,anio, version,foto,estatus)
	VALUES 
		( @idTipoUnidad,@idSubMarca ,@anio,@version,REPLACE(@foto,'"',''), 1);
	
		
	SELECT @@IDENTITY
end
GO
/****** Object:  StoredProcedure [dbo].[SEL_CATEGORIA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SEL_CATEGORIA_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		idCategoria as value,
		categoria + ' - ' + descripcion as label
	FROM
		dbo.Categoria
	WHERE 
		estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_CLASIFICACION_DDL_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_CLASIFICACION_DDL_SP] (
	@idUsuario numeric(18,0)
)
as
begin

		SELECT
			idPartidaClasificacion as value,
			clasificacion + ' - ' + descripcion as label
		FROM
			dbo.PartidaClasificacion
		WHERE 
			estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_CLIENTE_DDL_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_CLIENTE_DDL_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	
	SELECT
		idCliente as value,
		razonSocial + ' - ' + nombreComercial + ' - RFC: ' + rfc  as label
	FROM
		dbo.Cliente
	WHERE
		estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_CLIENTE_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SEL_CLIENTE_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		idCliente,
		nombreComercial,
		razonSocial,
		rfc,
		direccion,
		telefono,
		estatus
	FROM
		dbo.Cliente;

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_CONTRATO_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SEL_CONTRATO_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		idContrato,
		con.idLicitacion,
		cli.idCliente,
			cli.nombreComercial as cliente,
			emp.idEmpresa,
			emp.nombreComercial as empresa,
			folio as folioLicitacion,
			nombre as nombreLicitacion,
		con.numero as numeroContrato,
		con.descripcion as descripcionContrato,
		convert(nvarchar(10),con.fechaInicio,103) as fechaInicio,
		0 as unidades,
		0 as proveedores,
		con.estatus
	FROM
		dbo.Contrato con
		LEFT JOIN Licitacion lic ON lic.idLicitacion = con.idContrato
		LEFT JOIN Cliente cli ON cli.idCliente = lic.idCliente
		LEFT JOIN Empresa emp ON emp.idEmpresa = lic.idEmpresa
	WHERE 
		1=1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_ESPECIALIDAD_DDL_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SEL_ESPECIALIDAD_DDL_SP] (
	@idUsuario numeric(18,0)
)
as
begin

		
	SELECT
		idEspecialidad as value,
		especialidad as label
	FROM
		dbo.Especialidad
		
	WHERE 
	estatus = 1


end
GO
/****** Object:  StoredProcedure [dbo].[SEL_LICITACION_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_LICITACION_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		idLicitacion,
		cli.idCliente,
		cli.nombreComercial as cliente,
		lic.idClienteFinal,
		clf.nombreComercial as clienteFinal,
		folio,
		nombre,
		descripcion,
		convert(nvarchar(10),fechaInicio,103) as fechaInicioCompleta,
		fechaInicio,
		lic.estatus
	FROM
		dbo.Licitacion lic
		LEFT JOIN Cliente cli ON cli.idCliente = lic.idCliente
		LEFT JOIN Cliente clf ON clf.idCliente = lic.idClienteFinal
	WHERE 
		1=1


end
GO
/****** Object:  StoredProcedure [dbo].[SEL_MARCA_DDL_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_MARCA_DDL_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	
	SELECT
		idMarca as value,
		nombre as label
	FROM
		dbo.Marca
	WHERE estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_MARCA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_MARCA_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	
	SELECT
		idMarca,
		nombre as marca,
		estatus
	FROM
		dbo.Marca

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_MARCADOR_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SEL_MARCADOR_SP] (
	@idUsuario numeric(18,0)
)
as
begin
      SELECT 
      		latitud as lat,
      		longitud as lng,
      		cast(idProveedor as nvarchar(10)) as label,
      		razonSocial as nombre,
      		direccion as direccion
      	FROM dbo.Proveedor
      WHERE estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_NIVEL_ZONA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SEL_NIVEL_ZONA_SP] (
	@idUsuario numeric(18,0),
	@idCliente numeric(18,0)
)
as
begin

	SELECT
		idNivelZona,
		idCliente,
		etiqueta,
		orden
	FROM
		dbo.NivelZona
	WHERE
		idCliente = @idCliente
	ORDER BY orden desc

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_PARTIDA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SEL_PARTIDA_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		idPartida,
		--unidad
		par.idUnidad,
		tip.idTipoUnidad,
		tip.tipo as tipoUnidad,
		uni.anio,
		uni.version,
		sma.nombre as subMarca,
		sma.idSubMarca,
		mar.nombre as marca,		
		---------
		esp.idEspecialidad,
		esp.especialidad,
		cl1.idPartidaClasificacion,
		cl1.clasificacion,
		cl2.idPartidaSubClasificacion,
		cl2.subClasificacion,
		partida,
		noParte,
		par.descripcion,
		par.foto,
		par.instructivo,
		par.estatus
	FROM
		dbo.Partida par
		LEFT JOIN dbo.Unidad uni ON uni.idUnidad = par.idUnidad
		LEFT JOIN dbo.Especialidad esp ON esp.idEspecialidad = par.idEspecialidad
		LEFT JOIN TipoUnidad tip ON tip.idTipoUnidad = uni.idTipoUnidad
		LEFT JOIN SubMarca sma ON sma.idSubmarca = uni.idSubMarca
		LEFT JOIN Marca mar ON mar.idMarca = sma.idMarca
		LEFT JOIN PartidaClasificacion cl1 ON cl1.idPartidaClasificacion = par.idPartidaClasificacion
		LEFT JOIN PartidaSubClasificacion cl2 ON cl2.idPartidaSubClasificacion = par.idPartidaSubClasificacion
	WHERE 
		par.estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_PROVEEDOR_ESPECIALIDAD_SELECTED_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_PROVEEDOR_ESPECIALIDAD_SELECTED_SP] (
	@idProveedor numeric(18,0)
)
as
begin

	SELECT
		pes.idProveedorEspecialidad,
		pes.idEspecialidad,
		esp.especialidad
	FROM
		dbo.ProveedorEspecialidad pes
		LEFT JOIN dbo.Especialidad esp ON esp.idEspecialidad = pes.idEspecialidad
	WHERE 
		esp.estatus = 1
		and pes.idProveedor = @idProveedor
		

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_PROVEEDOR_ESPECIALIDAD_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_PROVEEDOR_ESPECIALIDAD_SP] (
	@idProveedor numeric(18,0)
)
as
begin

	SELECT
		esp.idEspecialidad,
		esp.especialidad
	FROM
		dbo.Especialidad esp
	WHERE 
		esp.estatus = 1
		and idEspecialidad not in(
			SELECT
				pes.idEspecialidad
			FROM
				dbo.ProveedorEspecialidad pes
			WHERE 
				pes.idProveedor = @idProveedor
		) 
		

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_PROVEEDOR_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_PROVEEDOR_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		idProveedor,
		nombreComercial,
		razonSocial,
		RFC,
		convert(nvarchar(10),fechaInicio,103) as fechaInicio,
		pro.idCategoria,
		cat.categoria,
		dbo.SEL_PROVEEDOR_ESPECIALIDAD_FN(pro.idProveedor) especialidades,
		dbo.SEL_PROVEEDOR_TIPO_UNIDAD_FN(pro.idProveedor) tipoUnidad,
		direccion,
		latitud,
		longitud,
		poligono,
		pro.estatus
	FROM
		dbo.Proveedor pro
		LEFT JOIN Categoria cat ON cat.idCategoria = pro.idCategoria
	WHERE 
		pro.estatus = 1
		
		

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_PROVEEDOR_TIPO_UNIDAD_SELECTED_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_PROVEEDOR_TIPO_UNIDAD_SELECTED_SP] (
	@idProveedor numeric(18,0)
)
as
begin

	SELECT
		ptu.idProveedorTipoUnidad,
		ptu.idProveedor,
		ptu.idTipoUnidad,
		tun.tipo
	FROM
		dbo.ProveedorTipoUnidad ptu
		LEFT JOIN dbo.TipoUnidad tun ON tun.idTipoUnidad = ptu.idTipoUnidad
	WHERE 
		tun.estatus = 1
		and ptu.idProveedor = @idProveedor
		

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_PROVEEDOR_TIPO_UNIDAD_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_PROVEEDOR_TIPO_UNIDAD_SP] (
	@idProveedor numeric(18,0)
)
as
begin

	SELECT
		tun.idTipoUnidad,
		tun.tipo
	FROM
		 dbo.TipoUnidad tun
	WHERE 
		tun.estatus = 1
		and tun.idTipoUnidad not in(
				SELECT
					ptu.idTipoUnidad
				FROM
					dbo.ProveedorTipoUnidad ptu
				WHERE 
					ptu.idProveedor = @idProveedor
		) 
		

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_SUBCLASIFICACION_DDL_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_SUBCLASIFICACION_DDL_SP] (
	@idUsuario numeric(18,0)
)
as
begin

		SELECT
			idPartidaSubClasificacion as value,
			subClasificacion + ' - ' + descripcion as label
		FROM
			dbo.PartidaSubClasificacion
		WHERE 
			estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_SUBMARCA_DDL_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_SUBMARCA_DDL_SP] (
	@idUsuario numeric(18,0)
)
as
begin
	
	SELECT
		idSubMarca as value,
		mar.nombre + ' - ' + sub.nombre as label
	FROM
		dbo.SubMarca sub
		LEFT JOIN dbo.Marca mar ON mar.idMarca = sub.idMarca
	WHERE sub.estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_SUBMARCA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[SEL_SUBMARCA_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		sub.idSubMarca,
		sub.idMarca,
		mar.nombre as marca,
		sub.nombre as subMarca,
		sub.estatus 
	FROM
		dbo.SubMarca sub
		LEFT JOIN dbo.Marca mar ON mar.idMarca = sub.idMarca
	WHERE 
		sub.estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_TIPO_UNIDAD_DDL_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SEL_TIPO_UNIDAD_DDL_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		idTipoUnidad as value,
		tipo as label
	FROM
		dbo.TipoUnidad
	WHERE
		estatus = 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_UNIDAD_DDL_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SEL_UNIDAD_DDL_SP] (
	@idUsuario numeric(18,0)
)
as
begin

		SELECT
		idUnidad as value,
		tip.tipo + ' - ' + mar.nombre + ' - ' + sma.nombre + ' - ' + uni.anio + ' - ' + uni.version as label
	FROM
		dbo.Unidad uni
		LEFT JOIN TipoUnidad tip ON tip.idTipoUnidad = uni.idTipoUnidad
		LEFT JOIN SubMarca sma ON sma.idSubmarca = uni.idSubMarca
		LEFT JOIN Marca mar ON mar.idMarca = sma.idMarca
	WHERE 
		uni.estatus= 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_UNIDAD_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE procedure [dbo].[SEL_UNIDAD_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	SELECT
		idUnidad,
		tip.idTipoUnidad,
		tip.tipo as tipoUnidad,
		uni.anio,
		uni.version,
		sma.nombre as subMarca,
		sma.idSubMarca,
		mar.nombre as marca,
		--'http://localhost:4500/uploads/' + foto as fotoURL,
		foto as foto,
		uni.estatus
	FROM
		dbo.Unidad uni
		LEFT JOIN TipoUnidad tip ON tip.idTipoUnidad = uni.idTipoUnidad
		LEFT JOIN SubMarca sma ON sma.idSubmarca = uni.idSubMarca
		LEFT JOIN Marca mar ON mar.idMarca = sma.idMarca
	WHERE 
		uni.estatus= 1

end
GO
/****** Object:  StoredProcedure [dbo].[SEL_ZONA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[SEL_ZONA_SP] (
	@idUsuario numeric(18,0)
)
as
begin

	select 
		idZona,
		nzo.orden,
		idPadre,
		nombre
	from Zona zon
	LEFT JOIN NivelZona nzo ON nzo.idNivelZona = zon.idNivelZona 
	order by orden

end
GO
/****** Object:  StoredProcedure [dbo].[UPD_CLIENTE_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[UPD_CLIENTE_SP] (
	@idCliente numeric(18,0),
	@nombreComercial nvarchar(200),
	@razonSocial nvarchar(200),
	@rfc nvarchar(20),
	@direccion nvarchar(200),
	@telefono nvarchar(50)
)
as
begin

	UPDATE
		dbo.Cliente
	SET
		nombreComercial =@nombreComercial,
		razonSocial = @razonSocial,
		rfc = @rfc,
		direccion = @direccion,
		telefono = @telefono
	WHERE 
		idCliente = @idCliente
		
	SELECT @idCliente 

end
GO
/****** Object:  StoredProcedure [dbo].[UPD_LICITACION_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[UPD_LICITACION_SP](
	@idLicitacion numeric(18,0),
	@idCliente numeric(18,0),
	@idClienteFinal numeric(18,0),
	@folio nvarchar(50),
	@nombre nvarchar(200),
	@descripcion nvarchar(500),
	@fechaInicio datetime
)
as
begin
		
	UPDATE
		dbo.Licitacion
	SET
		idCliente = @idCliente,
		idClienteFinal = @idClienteFinal,
		folio = @folio,
		nombre = @nombre,
		descripcion = @descripcion,
		fechaInicio = @fechaInicio
	WHERE 
		idLicitacion = @idLicitacion
		
	SELECT @idLicitacion

end
GO
/****** Object:  StoredProcedure [dbo].[UPD_PARTIDA_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_PARTIDA_SP] (
	@idPartida numeric(18,0),
	@idUnidad numeric(18,0),
	@idEspecialidad numeric(18,0),
	@idPartidaClasificacion numeric(18,0),
	@idPartidaSubClasificacion numeric(18,0),
	@partida nvarchar(50),
	@noParte nvarchar(200),
	@descripcion nvarchar(500),
	@foto nvarchar(50),
	@instructivo nvarchar(50)
)
as
begin

	
	UPDATE
		dbo.Partida
	SET
		
		idUnidad = @idUnidad,
		idEspecialidad = @idEspecialidad,
		idPartidaClasificacion = @idPartidaClasificacion,
		idPartidaSubClasificacion = @idPartidaSubClasificacion,
		partida =@partida,
		noParte = @noParte,
		descripcion = @descripcion,
		foto = REPLACE(@foto,'"',''),
		instructivo = REPLACE(@instructivo,'"','')
	WHERE 
		idPartida = @idPartida

	SELECT @idPartida
	
end
GO
/****** Object:  StoredProcedure [dbo].[UPD_PROVEEDOR_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create procedure [dbo].[UPD_PROVEEDOR_SP] (
	@idProveedor numeric(18,0),
	@nombreComercial nvarchar(200),
	@razonSocial nvarchar(500),
	@RFC nvarchar(20),
	@fechaInicio datetime,
	@idCategoria numeric(18,0),
	@direccion nvarchar(500),
	@latitud nvarchar(50),
	@longitud nvarchar(50),
	@poligono nvarchar(200)
)
as
begin

	UPDATE
		dbo.Proveedor
	SET
		nombreComercial = @nombreComercial,
		razonSocial = @razonSocial,
		RFC = @RFC,
		fechaInicio = @fechaInicio,
		idCategoria = @idCategoria,
		direccion = @direccion,
		latitud = @latitud,
		longitud = @longitud,
		poligono = @poligono
	WHERE 
	idProveedor = @idProveedor
	
	SELECT @idProveedor
	

end
GO
/****** Object:  StoredProcedure [dbo].[UPD_UNIDAD_SP]    Script Date: 24/05/2017 12:54:12 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[UPD_UNIDAD_SP] (
	@idUnidad numeric(18,0),
	@idTipoUnidad numeric(18,0),
	@idSubMarca numeric(18,0),
	@anio nvarchar(100),
	@version nvarchar(100),
	@foto nvarchar(100)

)
as
begin

		
	UPDATE
		dbo.Unidad
	SET
		idTipoUnidad = @idTipoUnidad,
		idSubMarca = @idSubMarca,
		anio = @anio,
		version = @version,
		foto = REPLACE(@foto,'"','')
	WHERE 
		idUnidad = @idUnidad

	
	SELECT @idUnidad
	
end
GO
USE [master]
GO
ALTER DATABASE [Partidas] SET  READ_WRITE 
GO
