export function updateDetails(
    idNode: Element, 
    busId: string, 
    nameNode: Element,
    busName: string,
    addrNode?: Element,
    busAddr?: string
) {
    idNode.innerHTML = busId;
    nameNode.innerHTML = busName;
    addrNode.innerHTML = busAddr;
}

export function updateInput(
    formBlock: Element, 
    bName: string
) {
    let searchInput = <HTMLInputElement>formBlock.querySelector('.search-input');
    searchInput.value = bName;
}

export function updateLinkText(
    link: Element, 
    newLinkText: string
) {
    let state : boolean;
    if(state===undefined||state===false){
      console.log(state);
      link.innerHTML = newLinkText;
      state = true;
    }
}