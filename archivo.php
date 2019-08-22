<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="stylesheet" type="text/css" href="css/archivo.css">
        <title>Explorador de archivos</title>
    </head>
    <body>
        <div class="explorador">
            <div class="ventana" id="ventana">
            </div>
            <div class="herramientas">
                <span title="directorio anterior" class="icono-herramienta" id="directorio-anterior" onclick="directorioAnterior()">
                    <img class="icono" src="img/directorio-anterior.png">
                </span>
                <span title="nuevo archivo" class="icono-herramienta" id="nuevo-archivo" onclick="toggleMostrar('nuevo-archivo-pop')">
                    <img class="icono" src="img/nuevo-archivo.png">
                </span>
                <span title="nueva carpeta" class="icono-herramienta" id="nueva-carpeta" onclick="toggleMostrar('nuevo-carpeta-pop')">
                    <img class="icono" src="img/nueva-carpeta.png">
                </span>
                <span title="eliminar" class="icono-herramienta" id="eliminar" onclick="eliminar()">
                    <img class="icono" src="img/eliminar.png">
                </span>
                <span title="cambiar permisos" class="icono-herramienta" id="cambiar-permisos" onclick="mostrar('permisos-pop')">
                    <img class="icono" src="img/cambiar-permisos.png">
                </span>
                <span title="cambiar dueño" class="icono-herramienta" id="cambiar-duenno" onclick="mostrar('duenno-pop')">
                    <img class="icono" src="img/duenno.png">
                </span>
                <span title="info" class="icono-herramienta" id="info" onclick="mostrar('info-pop')">
                    <img class="icono" src="img/info.png">
                </span>
                <span title="mover" class="icono-herramienta" id="mover" onclick="mostrar('mover-pop')">
                    <img class="icono" src="img/mover.png">
                </span>
            </div>
        </div>
        <div class="visor-texto" id="visor-texto" style="visibility: hidden">
            <div class="barra-texto">
                <h1 id="titulo-barra-texto">Titulo provisional</h1>
                <img class="icono-ventana" src="img/cerrar.png" onclick="toggleMostrar('visor-texto')">
            </div>
            <textarea class="caja-texto" id="caja-texto">
            </textarea>
        </div>
        <div class="tarjeta-pop" id="nuevo-archivo-pop" style="visibility: hidden">
            <input type="text" name="nombre-archivo-in" id="nombre-archivo-in" placeholder="Ingrese nombre del archivo">
            <button class="cancelar" onclick="toggleMostrar('nuevo-archivo-pop')">Cancelar</button>
            <button class="aceptar" onclick="nuevoArchivo()">Aceptar</button>
        </div>
        <div class="tarjeta-pop" id="nuevo-carpeta-pop" style="visibility: hidden">
            <input type="text" name="nombre-carpeta-in" id="nombre-carpeta-in" placeholder="Ingrese nombre de la carpeta">
            <button class="cancelar" onclick="toggleMostrar('nuevo-carpeta-pop')">Cancelar</button>
            <button class="aceptar" onclick="nuevaCarpeta()">Aceptar</button>
        </div>
        <div class="tarjeta-pop" id="mover-pop" style="visibility: hidden">
            <input type="text" name="mover-in" id="mover-in" placeholder="Ruta de destino">
            <button class="cancelar" onclick="toggleMostrar('mover-pop')">Cancelar</button>
            <button class="aceptar" onclick="mover()">Aceptar</button>
        </div>
        <div class="tarjeta-pop" id="info-pop" style="visibility: hidden">
            <h1 class="info" id="nombre"></h1>
            <h1 class="info" id="duenno"></h1>
            <h1 class="info" id="espacio"></h1>
            <button class="cancelar" onclick="toggleMostrar('info-pop')">Cerrar</button>
        </div>
        <div class="tarjeta-pop" id="duenno-pop" style="visibility: hidden">
            <input type="text" name="cambiar-in" id="cambiar-in" placeholder="nuevo dueño">
            <button class="cancelar" onclick="toggleMostrar('duenno-pop')">Cancelar</button>
            <button class="aceptar" onclick="nuevoDuenno()">Aceptar</button>
        </div>
        <div class="permisos-pop" id="permisos-pop" style="visibility: hidden">
            <h1>Cambiar permisos</h1>
            <table>
              <tr>
                <th>Tipo permiso</th>
                <th>Usuario</th>
                <th>Grupo</th>
                <th>Global</th>
              </tr>
              <tr>
                <td>Lectura</td>
                <td>
                    <input type="checkbox" id="u-r" value="1">
                </td>
                <td>
                    <input type="checkbox" id="g-r" value="1">
                </td>
                <td>
                    <input type="checkbox" id="o-r" value="1">
                </td>
              </tr>
              <tr>
                <td>Escritura</td>
                <td>
                    <input type="checkbox" id="u-w" value="1">
                </td>                            
                <td>                             
                    <input type="checkbox" id="g-w" value="1">
                </td>                            
                <td>                             
                    <input type="checkbox" id="o-w" value="1">
                </td>
              </tr>
              <tr>
                <td>Ejecución</td>
                <td>
                    <input type="checkbox" id="u-x" value="1">
                </td>                            
                <td>                             
                    <input type="checkbox" id="g-x" value="1">
                </td>                            
                <td>                             
                    <input type="checkbox" id="o-x" value="1">
                </td>
              </tr>
            </table>
            <div class="botones">
                <button class="cancelar" onclick="toggleMostrar('permisos-pop')">Cancelar</button>
                <button class="aceptar" onclick="cambiarPermisos()">Aceptar</button>
            </div>
        </div>
    </body>
    <script type="text/javascript" src="scripts/funciones.js"></script>
<script charset="utf-8">
cambiarPath(".")
</script>
</html>
