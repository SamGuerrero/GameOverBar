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

    //Sacado tal cual de la librería FullCalendar
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth'
    });
    calendar.render();

    //TODO:Si está registrado, debería rellenarse automaticamente lo del nombre
    
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
            $('#label_nombre').html($(res).find('label_nombreReserva'));
            $('#label_numPersonas').html($(res).find('label_numPersonas'));
            $('#btn_reservar').html($(res).find('btn_reservar'));
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