export function toaster(msg: string, place: Element, msgType: boolean) : void {
    let toast = document.createElement('p');
        toast.innerHTML = msg;
        toast.setAttribute('class','toast');
      (msgType == true? toast.classList.add('success') : toast.classList.add('fail'));
      place.appendChild(toast);
      toast.classList.add('on');
      setTimeout(function(){
        removeToast(toast, place);
      }, 4000);
  }
  
function removeToast(toast: Element, place: Element) : void {
    toast.classList.remove('on');
    setTimeout(function(){
      place.removeChild(toast);
    }, 500);
}