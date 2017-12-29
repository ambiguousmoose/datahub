export function isIeCheck() : boolean {
    let ms_ie = false;
    let ua = window.navigator.userAgent;
    let old_ie = ua.indexOf('MSIE ');
    let new_ie = ua.indexOf('Trident/');
    let edge = ua.indexOf('Edge/');
    if ((old_ie > -1) || (new_ie > -1) || edge > -1) { 
        ms_ie = true; 
    }
    return ms_ie;
}