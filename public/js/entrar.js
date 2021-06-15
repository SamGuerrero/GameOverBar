$(function(){
    colocarTexto();
    let valido = true;

    $('#espanol').click(function(){
        manageCookie('idioma', 'espanol');
        colocarTexto();
    });

    $('#ingles').click(function(){
        manageCookie('idioma', 'ingles');
        colocarTexto();
    });

    $('#btn_entrada').click(function(){
        manageCookie('errorAutenticacion', "", -1); //Borrar cookie
        $('#errorAutenticacion').html("");

        if (!emailValido()){
            valido = false;
            $('#errorEmail').show();
            setTimeout(function(){$('#errorEmail').hide()}, 5000);
        }

        if (!contrasenaValida()){
            valido = false;
            $('#errorContrasena').show();
            setTimeout(function(){$('#errorContrasena').hide()}, 5000);
        }

        if (valido){
            $('.formulario').submit();
        }else {
            valido = true;
        }
    })
    
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
            $('#nav_atras').html($(res).find('nav_atras'));

            //Contenido
            $('#titulo_formulario').html($(res).find('titulo_formulario'));
            $('#label_nombre').html($(res).find('label_nombre'));
            $('#label_email').html($(res).find('label_email'));
            $('#label_contrasena').html($(res).find('label_contrasena'));
            $('#label_repiteContrasena').html($(res).find('label_repiteContrasena'));
            $('#btn_entrada').html($(res).find('btn_entrar'));
            $('#tengo_cuenta').html($(res).find('tengo_cuenta'));

            //Errores
            $('#errorEmail').html($(res).find('errorEmail'));
            $('#errorContrasena').html($(res).find('errorContrasena'));
            $('#errorRepContrasena').html($(res).find('errorRepContrasena'));
            $('#errorAutenticacion').html($(res).find('errorAutenticacion'));
            $('#errorAutenticacion').css('color', 'red');
            if (readCookie('errorAutenticacion') != null){
                console.log("Error")
                $('#errorAutenticacion').show();
            }else{
                console.log("Sin errores");
                $('#errorAutenticacion').hide();
            }

            //Footer
            $('#contacto_titulo').html($(res).find('contacto_titulo'));
            $('#email').html($(res).find('email'));
            $('#telefono').html($(res).find('telefono'));
            $('#direccion').html($(res).find('direccion'));
            $('#horario_titulo').html($(res).find('horario_titulo'));
            $('#horario').html($(res).find('horario'));

        }
    });
    
    $('.reg_error').hide();
}

function emailValido(){
    let email = $('#email').val();
    let pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(es|com|net|org)$/;

    return pattern.test(email);
}

function contrasenaValida(){
    let contrasena = $('#contrasena').val();
    let pattern = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;

     return pattern.test(contrasena)
}

function constrasenaIgual(){
    let contrasena = $('#contrasena').val();
    let repContrasena = $('#repContrasena').val();

    return (contrasena == repContrasena)
}