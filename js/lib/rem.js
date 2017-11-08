 var docEl = document.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function() {
        var tagFont = 20 * (docEl.clientWidth / 320);
        if( tagFont > 60){
            docEl.style.fontSize =  '32px';
        }else{
            docEl.style.fontSize = 20 * (docEl.clientWidth /320) + 'px';
        } 
    };
window.addEventListener(resizeEvt, recalc, false);
document.addEventListener('DOMContentLoaded', recalc, false);