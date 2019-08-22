function toggleMostrar(id) {
    var x = document.getElementById(id);
    if (x.style.visibility === "hidden") {
        x.style.visibility = "visible";
    } else {
        x.style.visibility = "hidden";
    }
}
function seleccionar(id){
    if (seleccionActual == ""){
        document.getElementById(id).style.background="#D3D3D3"
        seleccionActual = id;
    }else if (seleccionActual == id){
        document.getElementById(id).style.background="#ffffff"
        seleccionActual = "";
    }else{
        document.getElementById(seleccionActual).style.background="#ffffff"
        seleccionActual=id;
        document.getElementById(id).style.background="#D3D3D3"
    }
}
function sinSeleccion(){
    if (seleccionActual!=""){
        document.getElementById(seleccionActual).style.background="#ffffff"
        seleccionActual=""
    }
}
function abrirArchivo(archivo){
    var funcion = "abrirArchivo"
    var argumento = pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+archivo

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}&pwd=${pwd}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            document.getElementById("caja-texto").innerHTML=respuesta
            document.getElementById("titulo-barra-texto").innerHTML=archivo
            toggleMostrar("visor-texto")
        }

    };
}
function directorioAnterior(){
    cambiarPath("..")
}
function cambiarPath(path){
    var funcion = "cambiarPath"
    var argumento = path

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}&pwd=${pwd}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            pwd=respuesta
            console.log(respuesta)
            redibujarEntidades()
        }

    };
}
function ejecutarComando(comando){
    var funcion = "comando"
    var argumento = comando

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}&pwd=${pwd}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            console.log(respuesta)
            redibujarEntidades()
        }

    };
}
function redibujarEntidades(){
    // preparar un array con los nombre de cada elemento a redibujar
    //
    var funcion = "abrirCarpeta"
    var argumento = pwd

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            console.log(respuesta)

            var elementos = respuesta.split("\n");
            elementos.pop();
            console.log(pwd)
            document.getElementsByClassName("ventana").item(0).innerHTML=""
            for (i in elementos){
                var funcion = "esArchivo"
                var argumento = pwd+"/"+elementos[i]

                var xhr = new XMLHttpRequest();
                xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}&file=${elementos[i]}`, true);
                xhr.send();
                xhr.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var respuesta = this.responseText
                        respuesta = respuesta.replace(/\n/g,'');
                        respuesta = respuesta.split("[fin]")
                        var contenido = ""
                        if(respuesta[1]=="si"){
                            contenido=`<div class="entidad archivo" id="${respuesta[0]}" name="${respuesta[0]}">
                         <img class="icono" src="img/archivo.png" onclick="seleccionar(\'${respuesta[0]}\');" ondblclick="abrirArchivo(\'${respuesta[0]}\')"\>
                         <p class="leyenda">${respuesta[0]}</p>
                     </div>`
                        }else{
                            contenido=`<div class="entidad carpeta" id="${respuesta[0]}" name="${respuesta}">
                         <img class="icono" src="img/carpeta.png" onclick="seleccionar(\'${respuesta[0]}\')" ondblclick="cambiarPath(\'${respuesta[0]}\')"\>
                         <p class="leyenda">${respuesta[0]}</p>
                     </div>`
                        }
                        document.getElementById("ventana").innerHTML+=contenido
                        seleccionActual=""
                    }

                };
            }
        }
    }
}
function nuevoArchivo(){
    var nombre_archivo = document.getElementById("nombre-archivo-in").value
    var comando = "touch "+pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+nombre_archivo
    ejecutarComando(comando)
    toggleMostrar("nuevo-archivo-pop")
}
function nuevaCarpeta(){
    var nombre_carpeta = document.getElementById("nombre-carpeta-in").value
    var comando = "mkdir "+pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+nombre_carpeta
    ejecutarComando(comando)
    toggleMostrar("nuevo-carpeta-pop")

}
function eliminar(){
    if(document.getElementById(seleccionActual).className == "entidad archivo"){
        var comando = "rm "+pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+seleccionActual
        ejecutarComando(comando)
    }else{
        var comando = "rm -r "+pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+seleccionActual
        ejecutarComando(comando)
    }
}
function mover(){
    var destino = document.getElementById("mover-in").value
    if (destino[0] == "/"){
        pathOrigen = pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+seleccionActual
        comando = `mv ${pathOrigen} ${destino}`
        ejecutarComando(comando)
    }else{
        pathDestino = pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+destino
        pathOrigen = pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+seleccionActual
        comando = `mv ${pathOrigen} ${pathDestino}`
        ejecutarComando(comando)
    }
}
function info(id){
    var funcion = "info"
    var argumento = seleccionActual

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}&pwd=${pwd}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            respuesta = respuesta.split("\n")
            console.log(respuesta[0])
            console.log(respuesta[1])
            document.getElementById("nombre").innerHTML=`Nombre:    ${seleccionActual}`
            document.getElementById("duenno").innerHTML=`Dueño:     ${respuesta[0]}`
            document.getElementById("espacio").innerHTML=`Tamaño (Bytes):   ${respuesta[1]}`

            toggleMostrar(id)
        }

    };
}
function mostrar(id){
    if (seleccionActual == ""){
        alert("Seleccione un archivo o carpeta")
    }else{
        if(id == "info-pop"){
            info(id)
        }else{
            var funcion = "permisos"
            var path = pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+seleccionActual

            var xhr = new XMLHttpRequest();
            xhr.open("GET", `funciones.php?funcion=${funcion}&pwd=${path}`, true);
            xhr.send();
            xhr.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var respuesta = this.responseText

                    var permisos = respuesta.toString().slice(-3);

                    for(var i=0; i<3;i++){
                        var binario=(parseInt(permisos[i])).toString(2)
                        if(i==0){
                            if(binario[0]=="1"){
                                document.getElementById("u-r").checked=true
                            }else{
                                document.getElementById("u-r").checked=false
                            }
                            if(binario[1]=="1"){
                                document.getElementById("u-w").checked=true
                            }else{
                                document.getElementById("u-w").checked=false
                            }
                            if(binario[2]=="1"){
                                document.getElementById("u-x").checked=true
                            }else{
                                document.getElementById("u-x").checked=false
                            }
                        }
                        if(i==1){
                            if(binario[0]=="1"){
                                document.getElementById("g-r").checked=true
                            }else{
                                document.getElementById("g-r").checked=false
                            }
                            if(binario[1]=="1"){
                                document.getElementById("g-w").checked=true
                            }else{
                                document.getElementById("g-w").checked=false
                            }
                            if(binario[2]=="1"){
                                document.getElementById("g-x").checked=true
                            }else{
                                document.getElementById("g-x").checked=false
                            }
                        }
                        if(i==2){
                            if(binario[0]=="1"){
                                document.getElementById("o-r").checked=true
                            }else{
                                document.getElementById("o-r").checked=false
                            }
                            if(binario[1]=="1"){
                                document.getElementById("o-w").checked=true
                            }else{
                                document.getElementById("o-w").checked=false
                            }
                            if(binario[2]=="1"){
                                document.getElementById("o-x").checked=true
                            }else{
                                document.getElementById("o-x").checked=false
                            }
                        }
                    }
                    toggleMostrar(id)
                }
            }
        }}
}
function nuevoDuenno(id){
    var ruta = pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+seleccionActual
    var funcion = "user"
    var argumento = document.getElementById("cambiar-in").value

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}&pwd=${ruta}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            toggleMostrar("duenno-pop")
        }
    }
}
function cambiarPermisos(id){


    var u_r =getValue("u-r")
    var g_r =getValue("g-r")
    var o_r =getValue("o-r")

    var u_w =getValue("u-w")
    var g_w =getValue("g-w")
    var o_w =getValue("o-w")

    var u_x =getValue("u-x")
    var g_x =getValue("g-x")
    var o_x =getValue("o-x")

    var p_usuario = parseInt(u_r+u_w+u_x, 2).toString()
    var p_grupo =   parseInt(g_r+g_w+g_x, 2).toString()
    var p_global =  parseInt(o_r+o_w+o_x, 2).toString()

    var path = pwd.replace(/(\r\n|\n|\r)/gm,"")+"/"+seleccionActual
    var permisos = parseInt(p_usuario+p_grupo+p_global, 10)

    var funcion = "chmod"
    var argumento = "0"+permisos
    console.log(argumento)

    var xhr = new XMLHttpRequest();
    xhr.open("GET", `funciones.php?funcion=${funcion}&argumento=${argumento}&pwd=${path}`, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var respuesta = this.responseText
            console.log(respuesta)
            toggleMostrar("permisos-pop")
        }

    }
}
function getValue(id){
    if(document.getElementById(id).checked){
        return "1"
    }else{
        return "0"
    }
}
var seleccionActual = "";
var pwd="";
