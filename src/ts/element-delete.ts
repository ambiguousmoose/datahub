export function elementDelete(ele: Element){
    let koTimer: any;
    clearTimeout(koTimer);
    ele.classList.add('off');
    let thisParent = ele.parentNode;
    koTimer = setTimeout(function(){
      thisParent.removeChild(ele);
    }, 800);
  };