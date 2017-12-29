export function disableBtnToggle(btn: HTMLInputElement) {
    if(btn.disabled===true){
      btn.disabled=false;
    }else{
      btn.disabled=true;
    }
    console.log(btn.disabled);
  };