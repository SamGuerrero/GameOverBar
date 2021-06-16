$(function(){
    colocarTexto();
    comprobarUsuario();
    comprobarReserva();
    $('#datos_ocultos').hide();

    $('#espanol').click(function(){
        manageCookie('idioma', 'espanol');
        colocarTexto();
    });

    $('#ingles').click(function(){
        manageCookie('idioma', 'ingles');
        colocarTexto();
    });

    //FullCalendar
    let eventPrinted = false;
    let calendarEl = document.getElementById('calendar');
    let calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'dayGridMonth',
        hiddenDays: [ 1, 2, 3, 7 ],
        timeZone: 'UTC',
        locale: 'es',
        editable: true
    });
    calendar.render();
    calendar.on('dateClick', function(info) {
        if (!eventPrinted){
            eventPrinted = true;
            let event =
                {
                  title: 'Reserva',
                  start: info.dateStr,
                  end: info.dateStr
                }
            calendar.addEvent(event);
        }
    });

    $('#btn_entrar').click(function(){
        window.location="entrar.html";
    });

    $('#btn_registrarse').click(function(){
        window.location="registro.html";
    });
    
    $('#btn_salir').click(function(){
        manageCookie('usuario', "", -1);
        manageCookie('email', "", -1);
        comprobarUsuario();
        $('#btn_entrar').show();
        $('#btn_registrarse').show();
        $('#btn_salir').hide();
        $('#input_email').val("");
    });

    $('#btn_reservar').click(function(){
        let valido = true;

        if (!emailValido()){
            valido = false;
            $('#errorEmail').show();
            setTimeout(function(){$('#errorEmail').hide()}, 5000);
        }

        if (!personasValidas()){
            valido = false;
            $('#errorPersonas').show();
            setTimeout(function(){$('#errorPersonas').hide()}, 5000);
        }

        if (!fechaValida(calendar)){
            valido = false;
            $('#errorCalendario').show();
            setTimeout(function(){$('#errorCalendario').hide()}, 5000);
        }

        if (valido){
            $('#fecha').val(calendar.getEvents()[0].start);
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
            $('#nav_inicio').html($(res).find('nav_inicio'));
            $('#nav_carta').html($(res).find('nav_carta'));
            $('#nav_reservas').html($(res).find('nav_reservas'));
            $('#nav_juegos').html($(res).find('nav_juegos'));
            $('#nav_perfil').html($(res).find('nav_perfil'));

            //Botones de entrada
            $('#btn_entrar').html($(res).find('btn_entrar'));
            $('#btn_registrarse').html($(res).find('btn_registrarse'));
            $('#btn_salir').html($(res).find('btn_salir'));

            //Errores
            $('#errorEmail').html($(res).find('errorEmail'));
            $('#errorPersonas').html($(res).find('errorPersonas'));
            $('#errorCalendario').html($(res).find('errorCalendario'));

            //Contenido
            $('#titulo_formulario').html($(res).find('titulo_formulario'));
            $('#label_email').html($(res).find('label_email'));
            $('#label_numPersonas').html($(res).find('label_numPersonas'));
            $('#btn_reservar').html($(res).find('btn_reservar'));
            $('#tengo_cuenta').html($(res).find('tengo_cuenta'));
            $('#reservaEnviada').html($(res).find('reservaEnviada'));
            $('#reservaDenegada').html($(res).find('reservaDenegada'));
            if (readCookie('email') == null){
                $('#btn_salir').hide();
            
            }else{
                $('#input_email').val(readCookie('email').replace('%40', '@'));
                $('#btn_entrar').hide();
                $('#btn_registrarse').hide();
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

function comprobarUsuario(){
    if (readCookie('usuario') == null){
        $('#a_perfil').hide();
    
    }else{
        $('#a_perfil').show();
    }
}

function comprobarReserva(){
    if (readCookie('reservaAutorizada') == null){
        $('#reservaEnviada').hide();
        if (readCookie('reservaDenegada') == null){
            $('.formulario').show();
            $('#reservaDenegada').hide();
        
        }else {
            manageCookie('reservaDenegada', "", -1);
            $('.formulario').hide();
            $('#reservaDenegada').show();
        }
    
    }else{
        manageCookie('reservaAutorizada', "", -1);
        $('.formulario').hide();
        $('#reservaEnviada').show();
        $('#reservaDenegada').hide();
    }

    if (readCookie('email') == null){
        $('#btn_salir').hide();
    
    }else{
        $('#input_email').val(readCookie('email'));
        $('#btn_entrar').hide();
        $('#btn_registrarse').hide();
    }
}

function emailValido(){
    let email = $('#email').val();
    let pattern = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.(es|com|net|org)$/;

    return pattern.test(email);
}

function personasValidas(){
    let personas = $('#personas').val();

    return ((personas >= 1) && (personas <=25));
}

function fechaValida(calendar){
    let fecha = calendar.getEvents();
    if (fecha.length > 0){
        return true;
    
    }else{
        return false;
    }

}