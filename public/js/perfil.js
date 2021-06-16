$(function(){
    colocarTexto();
    $('#email').val(readCookie('email').replace('%40', '@'));
    $('#email').hide();
    $('#email2').val(readCookie('email').replace('%40', '@'));
    $('#email2').hide();

    $('#espanol').click(function(){
        manageCookie('idioma', 'espanol');
        colocarTexto();
    });

    $('#ingles').click(function(){
        manageCookie('idioma', 'ingles');
        colocarTexto();
    });

    $('#btn_salir').click(function(){
        manageCookie('usuario', "", -1);
        window.location = "index.html";
    });

    $('#btn_cambiar').click(function(){
        let valido = true;

        if (!contrasenaValida($('#contrasena').val())){
            valido = false;
        }

        if (!contrasenaValida($('#nuevaContrasena').val())){
            valido = false;
        }

        if (!contrasenaValida($('#repiteContrasena').val())){
            valido = false;
        }

        if (!constrasenaIgual()){
            valido = false;
        }

        if (valido){
            $('#form_cambiar').submit();
        }else {
            console.log("Mal");
            valido = true;
        }
    });

    $('#borrarCuenta').click(function(){
        manageCookie('usuario', "", -1);
        manageCookie('email', "", -1);
        $('#form_borrar').submit();
    });
    
});

function colocarTexto(){
    let idioma = readCookie('idioma');
    let ruta;
    switch(idioma){
        case 'espanol': ruta ='textos_esp.xml';
        break;
        case 'ingles': ruta = 'textos_eng.xml';
        break;
        default: ruta ='textos_esp.xml';
    }
        
    $.ajax({
        type: 'GET',
        dataType: 'xml',
        url: '../archivos/' + ruta,
        success: function(res){
            //Navigation Bar
            $('#nav_inicio').html($(res).find('nav_inicio'));
            $('#nav_carta').html($(res).find('nav_carta'));
            $('#nav_reservas').html($(res).find('nav_reservas'));
            $('#nav_juegos').html($(res).find('nav_juegos'));
            $('#nav_perfil').html($(res).find('nav_perfil'));
            $('#btn_salir').html($(res).find('btn_salir'));

            //Contenido
            $('#bienvenida').html(readCookie('usuario'));
            $('#h5_reservas').html($(res).find('titulo_reservas'));
            $('#h3_ajustes').html($(res).find('titulo_ajustes'));
            $('#h3_cambiarContrasena').html($(res).find('cambiarContrasena'));
            $('#label_contrasena').html($(res).find('label_antiguaContrasena'));
            $('#label_nuevaContrasena').html($(res).find('label_contrasena'));
            $('#label_repiteContrasena').html($(res).find('label_repiteContrasena'));
            $('#btn_cambiar').html($(res).find('btn_cambiar'));
            $('#h3_borrar').html($(res).find('borrarCuenta'));
            $('#borrarCuenta').html($(res).find('btn_borrarCuenta'));

            //Footer
            $('#contacto_titulo').html($(res).find('contacto_titulo'));
            $('#email').html($(res).find('email'));
            $('#telefono').html($(res).find('telefono'));
            $('#direccion').html($(res).find('direccion'));
            $('#horario_titulo').html($(res).find('horario_titulo'));
            $('#horario').html($(res).find('horario'));

        }
    });
}

function contrasenaValida(contra){
    let pattern = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
    return pattern.test(contra)
}

function constrasenaIgual(){
    let contrasena = $('#contrasena').val();
    let repContrasena = $('#repiteContrasena').val();

    return (contrasena == repContrasena)
}