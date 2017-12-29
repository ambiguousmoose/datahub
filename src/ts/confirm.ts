import { getClosest } from "./closest";
import { disableBtnToggle } from "./disabled-btn-toggle";

export function setConfirm() {
    let _this = this;
    let thisParent = getClosest(_this, 'form');
    let theSubmit  = <HTMLInputElement>thisParent.querySelector('.submit');
    disableBtnToggle(theSubmit);
};