$(function(){
    colocarTexto();
    comprobarUsuario();

    $('#espanol').click(function(){
        manageCookie('idioma', 'espanol');
        colocarTexto();
    });

    $('#ingles').click(function(){
        manageCookie('idioma', 'ingles');
        colocarTexto();
    });

    $('#btn_registrarse').click(function(){
        window.location="registro.html";
    });

    $('#btn_entrar').click(function(){
        window.location="entrar.html";
    });

    $('#btn_salir').click(function(){
        manageCookie('usuario', "", -1);
        comprobarUsuario()
        $('#btn_entrar').show();
        $('#btn_registrarse').show();
        $('#btn_salir').hide();
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

            //Botones de entrada
            $('#btn_entrar').html($(res).find('btn_entrar'));
            $('#btn_registrarse').html($(res).find('btn_registrarse'));
            $('#btn_salir').html($(res).find('btn_salir'));
            if (readCookie('usuario') == null){
                $('#btn_salir').hide();
            
            }else{
                $('#btn_entrar').hide();
                $('#btn_registrarse').hide();
            }

            //Contenido
            $('.ahref_juegos').html($(res).find('ahref_juegos'));
            $("#contenido").empty();
            $(res).find('juegos').find('juego').each(function(index){
                let divRow = document.createElement( "div" );
                let divColText = document.createElement( "div" );
                $(divRow).addClass('row');
                $(divColText).addClass('col-md');
                $(divColText).addClass('col-imgJuego');

                
                let juegoImg = document.createElement( "img" );
                let juegoNombre = document.createElement( "h3" );
                let juegoDesc = document.createElement( "p" );

                $(juegoImg).attr('src', $(this).find('imagen').text());
                $(juegoImg).addClass('imgJuego');
                $(juegoNombre).append(document.createTextNode($(this).find('nombre').text()));
                $(juegoDesc).append(document.createTextNode($(this).find('descripcion').text()));
                $(divColText).append(juegoNombre, juegoImg, juegoDesc);

                $(divRow).append(divColText);
                $("#contenido").append(divRow);
            });

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

function comprobarUsuario(){
    if (readCookie('usuario') == null){
        $('#a_perfil').hide();
    
    }else{
        $('#a_perfil').show();
    }
}