// all links with aria-label
let toolTips  = document.querySelectorAll('a[aria-label]');
let toolTime: any;
let toolSet: boolean;

bindToolLinks(toolTips);
addLabels(toolTips);

function addLabels(links: NodeListOf<Element>){
    for(let i = 0;i < links.length; i++){
        let tip     = document.createElement('span');
        let tipText = links[i].getAttribute('aria-label');
        tip.classList.add('tooltip');
        links[i].appendChild(tip); //adds span to all aria-label links
        let thisTooltip = <HTMLElement>links[i].querySelector('.tooltip');
        thisTooltip.innerHTML = tipText;
    }
}

// bind click event to view buttons
function bindToolLinks(links: NodeListOf<Element>){
    for(let i = 0;i < links.length; i++){
        links[i].addEventListener('mouseenter', showTip, false);
        links[i].addEventListener('mouseleave', hideTip, false);
    }
}

function showTip(){
    let _this = this;
    toolSet = false;
    toolTime = setTimeout(function(){
        _this.classList.add('tooltip--on');
        toolSet = true;
    }, 1000);
}

function hideTip(){
    let _this = this;
    if(toolTime && toolTime!=undefined){
            clearTimeout(toolTime);
        }
    if(toolSet==true){
    toolTime = setTimeout(function(){
        _this.classList.remove('tooltip--on');
        }, 10);
    }
}