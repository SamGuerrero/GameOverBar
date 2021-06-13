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

    $('#btn_registrarse').click(function(){
        window.location="registro.html";
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
            $("#contenido").empty();
            $(res).find('carta').find('bebida').each(function(index){
                let divRow = document.createElement( "div" );
                let divColImg = document.createElement( "div" );
                let divColText = document.createElement( "div" );
                $(divRow).addClass('row');
                $(divColImg).addClass('col-4-md');
                $(divColText).addClass('col-md');

                
                let bebidaImg = document.createElement( "img" );
                let bebidaNombre = document.createElement( "h3" );
                let bebidaDesc = document.createElement( "p" );
                let bebidaPrecio = document.createElement( "h6" );

                $(bebidaImg).attr('src', $(this).find('imagen').text());
                $(bebidaImg).addClass('imgCarta');
                $(divColImg).append(bebidaImg);

                $(bebidaNombre).append(document.createTextNode($(this).find('nombre').text()));
                $(bebidaDesc).append(document.createTextNode($(this).find('descripcion').text()));
                $(bebidaPrecio).append(document.createTextNode($(this).find('precio').text()));
                $(divColText).append(bebidaNombre, bebidaDesc, bebidaPrecio);

                $(divRow).append(divColImg, divColText);
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