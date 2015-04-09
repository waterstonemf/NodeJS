function getCookie(cookieName){
    if (document.cookie.length > 0) {
            begin = document.cookie.indexOf(cookieName + "=");
            if (begin != -1) {
                begin += cookieName.length + 1; 
                end = document.cookie.indexOf(";", begin); 
                if (end == -1) end = document.cookie.length;
                return unescape(document.cookie.substring(begin, end));
            }
    }
    return null;    
}