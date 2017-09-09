function getCookie(name){
    //выдает куку по id
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options){
    //создает куку по id, значению и объекту параметров
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires){
        var date = new Date();
        date.setTime(date.getTime() + expires * 1000);
        expires = options.expires = date;
    }

    if (expires && expires.toUTCString){
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updateCookie = name + "=" + value;

    for( var propName in options){
        updateCookie += ";" + propName;
        var propValue = options[propName];
        if (propValue != true){
            updateCookie += "=" + propValue;
        }
    }

    document.cookie = updateCookie;
}

function deleteCookie(name){
    //удаляет куку по id
    setCookie(name, "", {
        expires: -1
    })
}
