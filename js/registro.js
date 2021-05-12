//Variables globales
let idioma = 'espanol';

$(function(){
    colocarTexto();

    $('#espanol').click(function(){
        idioma = 'espanol';
        colocarTexto();
    });

    $('#ingles').click(function(){
        idioma = 'ingles';
        colocarTexto();
    });

    //TODO: Mostrar toast cuando se equivoque o pase por encima
    //TODO: Añadir regexp para controlar errores
    //TODO: Enviar email para confirmar
    $('.icono').hover(function(){
        $('.toast').toast('show');
    });
    
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