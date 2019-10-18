Requisitos:
Desarrollar en html + css + js utilizando alguna opción
de mapeo una pequeña app web que permita ingresar
puntos de interés.
(no es obligatorio utilizar el ArcGIS JavaScript API, se puede optar por la
que le sea más comoda [Google Maps, MapBox, Leaflet…].)

Código Fuente:
Se debe presentar el trabajo realizado mediante un
repositorio en GitHub o Bitbucket.
(Opcional) Será valorado la diversidad de commits y sus
comentarios.
(Debe ser de acceso público o se deben informar las credenciales)

Condiciones de Aceptación:
Se tomará como válido, aquel trabajo que al clonarse el
repositorio, se pueda ejecutar sin necesidad de
interacción de parte del desarrollador.
Se aceptan dos modalidades:
• El repo puede contener solo los archivos necesarios para la
web y ser montado sobre un webserver (IIS) de Aeroterra.
• El repo puede incorpor un web server (ej. Node JS +
Express.js) pero debe incluir todas la dependecias y el setup
para poder ejecutar en Windows 10.

Condiciones de Aceptación:
Será valorado el código fuente de autoría y por el
contrario, código totalmente copiado, degradará el
concepto de la prueba.
Para tomar esta determinación, se realizará una búsqueda
superficial buscando similitudes considerables con el desarrollo.
También, será necesario justificarlo de forma precencial según
evolucione el proceso de selección.

Condiciones de Aceptación:
Enviar el link al repositorio y credenciales (de ser necesario)
a laboral@aeoterra.com .
La entrega debe ser dentro del plazo de 24hs comenzando
desde la fecha convenida.

Funcionalidad
Crear un formulario flotante o anclado (Puede o utilizar
algún framework de UI) para crear un “Punto de interés” y
que permita ingresar:
• Descripción. (ej: AEROTERRA S.A.)
• Dirección (ej: Av. Eduardo Madero 1020, C1001 CABA)
• Número telefónico (ej: 54 9 11 5272 0900)
• Coordenadas X e Y (ej: -34.595986,-58.3724715) [Los
valores posibles Longitud -180 < x < 180 ; Latitud -90 < y <
90 ]
• Categoría (este campo es una lista de: ‘Comercial’,
‘Residencial’, ‘Mixta’)

Incorporar un mapa (puede ser full screen) (se puede
utilizar cualquier API ej: ArcGIS JavaScript API, Google
Maps, Leaflet, Mapbox) (Tener en cuenta la generación
de una app-key para utilizar la librería de ser necesario)
El formulario del punto anterior debe ser capaz de
agregar puntos (o marcadores) sobre el mapa.

Estos marcadores (o puntos) deben tener un popup (o
maptip) interactivo que muestre:
• Descripción
• Dirección
• (opcional) Teléfono
• Coordenadas

EXTRA CREDITS
• (opcional) Sería una mejora si la posición se puede
buscar o seleccionar del mapa.
• (opcional) Mejorar la carga inicial de los marcadores
para que la lista se base en un archivo (json, kml, etc)
• (opcional) Poder seleccionar y borrar puntos (o
marcadores) 