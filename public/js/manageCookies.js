function manageCookie(name, value, days=""){
    if (days == "")
    {
        document.cookie = name + "=" + encodeURIComponent(value);

    }else{
        let expireDate = days * 24 * 60 * 60;
        document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=" + expireDate; //Con un (max-age =< 0) lo elimina
    }
    
}

function readCookie(name) {
    let cookies = document.cookie.split(";");
    name = name + "=";
    let value = null;

    for (c of cookies) {
        if (c.trim().startsWith(name)){
            value = c.trim().substring(name.length);
        }
    }

    return value;
}

function delAllCookies() {
    let cookies = document.cookie.split(";");
    let name = "";

    for (c of cookies){
        name = c.substring(0, c.indexOf("="));
        manageCookie(name, "", -1);
    }
}