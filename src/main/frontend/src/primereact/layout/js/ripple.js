var ink, d, x, y;

var Ripple = {

    init: function() {
        var $this = this;

        document.addEventListener("mousedown", function(e) {
            for (var target=e.target; target && target!==this; target=target.parentNode) {

                if(!$this.isVisible(target)) {
                    continue;
                }

                // Element.matches() -> https://developer.mozilla.org/en-US/docs/Web/API/Element/matches
                if ($this.selectorMatches(target, '.ripplelink,.ui-button')) {
                    var element = target;
                    $this.rippleEffect(element, e);
                    break;
                }
            }
        }, false);
    },

    selectorMatches: function(el, selector) {
        var p = Element.prototype;
        var f = p.matches || p.webkitMatchesSelector || p.mozMatchesSelector || p.msMatchesSelector || function(s) {
            return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
        };
        return f.call(el, selector);
    },

    isVisible: function(el) {
        return !!( el.offsetWidth || el.offsetHeight || el.getClientRects().length );
    },

    rippleEffect: function(element, e) {
        if(element.querySelector(".ink") === null) {
            var inkEl = document.createElement("span");
            inkEl.classList.add("ink");

            if(this.hasClass(element, 'ripplelink'))
                element.querySelector('span').insertAdjacentHTML('afterend', "<span class='ink'></span>");
            else
                element.appendChild(inkEl);
        }

        ink = element.querySelector(".ink");
        this.removeClass(ink, "ripple-animate");

        if(!ink.offsetHeight && !ink.offsetWidth){
            d = Math.max(element.offsetWidth, element.offsetHeight);
            ink.style.height = d + 'px';
            ink.style.width = d + 'px';
        }

        x = e.pageX - this.getOffset(element).left - (ink.offsetWidth/2);
        y = e.pageY - this.getOffset(element).top - (ink.offsetHeight/2);

        ink.style.top = y + 'px';
        ink.style.left = x + 'px';
        ink.style.pointerEvents = 'none'
        this.addClass(ink, "ripple-animate");
    },

    hasClass: function(element, className) {
        if (element.classList)
            return element.classList.contains(className);
        else
            return new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
    },

    addClass: function(element, className) {
        if (element.classList)
            element.classList.add(className);
        else
            element.className += ' ' + className;
    },

    removeClass: function(element, className) {
        if (element.classList)
            element.classList.remove(className);
        else
            element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    },

    getOffset: function(el) {
        var rect = el.getBoundingClientRect();

        return {
            top: rect.top + document.body.scrollTop,
            left: rect.left + document.body.scrollLeft
        };
    }
}

document.addEventListener("DOMContentLoaded", Ripple.init());
