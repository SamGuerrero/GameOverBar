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
            $('#nav_inicio').html($(res).find('nav_inicio'));
            $('#nav_carta').html($(res).find('nav_carta'));
            $('#nav_reservas').html($(res).find('nav_reservas'));
            $('#nav_juegos').html($(res).find('nav_juegos'));

            //Botones de entrada
            $('#btn_entrar').html($(res).find('btn_entrar'));
            $('#btn_registrarse').html($(res).find('btn_registrarse'));

            //Contenido
            $('#historia_titulo').html($(res).find('historia_titulo'));
            $('#historia_texto').html($(res).find('historia_texto'));

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