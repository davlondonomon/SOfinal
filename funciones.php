<?php
function abrirCarpeta($ruta){
    chdir($ruta);
    $nuevasEntidades=shell_exec("ls --group-directories-first");
    return $nuevasEntidades;
}
function abrirArchivo($archivo){
    $comando="cat ${archivo} 2>&1";
    $contenido=shell_exec($comando);
    echo shell_exec("pwd");
    return $contenido;
}
$funcion = $_REQUEST["funcion"];
$argumento = $_REQUEST["argumento"];
if ($funcion == "abrirCarpeta"){
    echo abrirCarpeta($argumento);
}else if($funcion == "abrirArchivo"){
    echo abrirArchivo($argumento);
}else if($funcion == "directorioAnterior"){
    chdir($argumento);
    echo shell_exec("pwd");
}else if($funcion == "cambiarPath"){
    chdir($argumento);
    echo shell_exec("pwd");
}
?>
