//Variables globales
let idioma = 'espanol';

$(function(){
    colocarTexto();
    let valido = true;

    $('#espanol').click(function(){
        idioma = 'espanol';
        colocarTexto();
    });

    $('#ingles').click(function(){
        idioma = 'ingles';
        colocarTexto();
    });

    $('#icono_contrasena').click(function(){
        $('#errorContrasena').show();
        setTimeout(function(){$('#errorContrasena').hide()}, 5000);
    });

    $('#icono_repContrasena').click(function(){
        $('#errorRepContrasena').show();
        setTimeout(function(){$('#errorRepContrasena').hide()}, 5000);
    });

    $('#btn_registro').click(function(){

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

        if (!constrasenaIgual()){
            valido = false;
            $('#errorRepContrasena').show();
            setTimeout(function(){$('#errorRepContrasena').hide()}, 5000);
        }

        if (valido){
            let usuario = {
                "Nombre": $('#nombre').val(),
                "Email": $('#email').val(),
                "Contrasena": $('#contrasena').val()
            }

            console.log(usuario.Nombre);
            //TODO: Enviar email y cuando confirme entonces:
            $('.formulario').submit();
        }else {
            valido = true;
        }
    })
    
});

function colocarTexto(){
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
            $('#btn_registro').html($(res).find('btn_registrarse'));
            $('#tengo_cuenta').html($(res).find('tengo_cuenta'));

            //Errores
            $('#errorEmail').html($(res).find('errorEmail'));
            $('#errorContrasena').html($(res).find('errorContrasena'));
            $('#errorRepContrasena').html($(res).find('errorRepContrasena'));

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