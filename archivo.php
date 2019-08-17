<html>
    <head>
        <meta http-equiv="content-type" content="text/html; charset=utf-8">
        <link rel="stylesheet" type="text/css" href="css/main.css">
        <link rel="stylesheet" type="text/css" href="css/archivo.css">
        <title>Explorador de archivos</title>
    </head>
    <body>
        <div class="explorador">
            <div class="ventana">
<?php
$archivos=shell_exec("ls --group-directories-first");
$entidades=explode("\n",$archivos);
for($i=0;$i < count($entidades)-1; ++$i){
    $comando="[ -f {$entidades[$i]} ] && echo si";
    $comando=exec($comando);
    if ( $comando == "si" ){
        print('
                     <div class="entidad" id="'.$entidades[$i].'" ondblclick="abrirArchivo(\''.$entidades[$i].'\')">
                         <img class="icono" src="img/archivo.png" onclick="seleccionar(\''.$entidades[$i].'\');"\>
                         <p class="leyenda">'.$entidades[$i].'</p>
                     </div>');
    }else{
         print('
                     <div class="entidad" id="'.$entidades[$i].'" ondblclick="abrirCarpeta(\''.$entidades[$i].'\')">
                         <img class="icono" src="img/carpeta.png" onclick="seleccionar(\''.$entidades[$i].'\');"\>
                         <p class="leyenda">'.$entidades[$i].'</p>
                     </div>');
    }
}
?>
            </div>
            <div class="herramientas">
                <div class="icono-herramienta" id="directorio-anterior" onclick="directorioAnterior()">
                    <img class="icono" src="img/directorio-anterior.png">
                </div>
                <div class="icono-herramienta" id="nuevo-archivo" onclick="nuevoArchivo()">
                    <img class="icono" src="img/nuevo-archivo.png">
                </div>
                <div class="icono-herramienta" id="nueva-carpeta" onclick="nuevaCarpeta()">
                    <img class="icono" src="img/nueva-carpeta.png">
                </div>
                <div class="icono-herramienta" id="eliminar" onclick="eliminar()">
                    <img class="icono" src="img/eliminar.png">
                </div>
                <div class="icono-herramienta" id="cambiar-permisos" onclick="cambiarPermisos()">
                    <img class="icono" src="img/cambiar-permisos.png">
                </div>
                <div class="icono-herramienta" id="mover" onclick="mover()">
                    <img class="icono" src="img/mover.png">
                </div>
            </div>
        </div>
        <div class="visor-texto" id="visor-texto" hidden>
            <div class="barra-texto">
                <h1 id="titulo-barra-texto">Titulo provisional</h1>
                <img class="icono-ventana" src="img/cerrar.png" onclick="toggleMostrar('visor-texto')">
            </div>
            <textarea class="caja-texto" id="caja-texto">
            </textarea>
        </div>
    </body>
    <script type="text/javascript" src="scripts/funciones.js"></script>
</html>
