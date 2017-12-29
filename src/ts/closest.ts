export function getClosest(elem: any, selector: string) {

    if (!Element.prototype.matches) {
         Element.prototype.matches =
         Element.prototype.msMatchesSelector ||
         Element.prototype.webkitMatchesSelector ||
        function(s) {
            let matches = (this.document || this.ownerDocument).querySelectorAll(s),
                i = matches.length;
            while (--i >= 0 && matches.item(i) !== this) {}
            return i > -1;
        };
    }

    // Get closest match
    for ( ; elem && elem !== document; elem = elem.parentNode ) {
        if ( elem.matches( selector ) ) {
          return elem
        }
    }
    return null;
}
