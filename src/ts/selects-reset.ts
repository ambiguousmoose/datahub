export function resetSelects(ele: NodeListOf<Element>){
    for(let i = 0; i < ele.length; i++){
      ele[i].classList.remove('on');
    }
  };