import { getClosest } from './closest';
import { toaster } from './toaster';

export function copyTo() {
    let _this = this;
    let bp = getClosest(_this, 'li');
    let bpid = bp.querySelector('.bpid');
    let temptxt = document.createElement('textarea');
        temptxt.setAttribute('style', 'position: fixed; top: 0; right: -200px; z-index: 1;');
        temptxt.value = bpid.innerHTML;
    document.body.appendChild(temptxt);
    temptxt.select();
  
    try {
      let successful = document.execCommand('copy');
      let msgType = successful ? true : false;
      toaster('The ID: '+ temptxt.value + ' has been successfully been copied', bp, msgType);
    } catch (err) {
      toaster('Oops, the ID could\'t be copied', bp, false);
    }
    document.body.removeChild(temptxt);
  };