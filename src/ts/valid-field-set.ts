export function setValid(theParent: Element, theField: Element){
    if(!theField.classList.contains('valid')){
      let checkCont = document.createElement('span');
      checkCont.classList.add('icon-check');
      theParent.insertBefore(checkCont, theField.nextSibling);
      theField.classList.add('valid');
    }
  }