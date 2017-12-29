// all links with aria-label
var toolTips = document.querySelectorAll('a[aria-label]');
var toolTime;
var toolSet;
bindToolLinks(toolTips);
addLabels(toolTips);
function addLabels(links) {
    for (var i = 0; i < links.length; i++) {
        var tip = document.createElement('span');
        var tipText = links[i].getAttribute('aria-label');
        tip.classList.add('tooltip');
        links[i].appendChild(tip); //adds span to all aria-label links
        var thisTooltip = links[i].querySelector('.tooltip');
        thisTooltip.innerHTML = tipText;
    }
}
// bind click event to view buttons
function bindToolLinks(links) {
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('mouseenter', showTip, false);
        links[i].addEventListener('mouseleave', hideTip, false);
    }
}
function showTip() {
    var _this = this;
    toolSet = false;
    toolTime = setTimeout(function () {
        _this.classList.add('tooltip--on');
        toolSet = true;
    }, 1000);
}
function hideTip() {
    var _this = this;
    if (toolTime && toolTime != undefined) {
        clearTimeout(toolTime);
    }
    if (toolSet == true) {
        toolTime = setTimeout(function () {
            _this.classList.remove('tooltip--on');
        }, 10);
    }
}
