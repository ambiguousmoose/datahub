export function bindToList(func: any, ele: NodeList, eventType: string){
    for(let i = 0; i < ele.length; i++){
        let thisFunction = func;
        ele[i].addEventListener(eventType, thisFunction, false);
    }
};
  
export function bindTo(func: any, ele: Element, eventType: string){
    ele.addEventListener(eventType, func, false);
};