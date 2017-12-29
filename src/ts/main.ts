import { getClosest } from './closest';
import { updateDetails } from './content-update';
import { updateLinkText } from './content-update';
import { updateInput } from './content-update';
import { setValid } from './valid-field-set';
import { bindTo } from './bindings';
import { bindToList } from './bindings';
import { resetSelects } from './selects-reset';
import { onTransitionEnd } from './transition-end';
import { setConfirm } from './confirm';
import { getTallest } from './get-tallest';
import { isIeCheck } from './ie-check';
import { elementDelete } from "./element-delete";

// Query business partners form
let searchForm     = document.getElementById('search-form');
let searchBlock    = document.getElementById('search-block');
let queriedBid     = searchForm.querySelector('.queried-id');
let queriedBname   = searchForm.querySelector('.queried-text');

// Reject query business partners form
let rejQueryform    = document.getElementById('reject-query-form');
let rejSearchBlock  = document.getElementById('reject-query-block');
let rejQueriedBid   = document.querySelector('.queried-id');
let rejQueriedBname = document.querySelector('.queried-name');
let rejQueryUseBtn  = document.querySelectorAll('.use-this');

// Approval form and elements
let approveForm    = document.getElementById('approve-form');
let approveBlock   = document.getElementById('approve-block');
let partnerDetails = approveBlock.querySelector('.partner-details');
let appBid         = partnerDetails.querySelector('.bpid');
let appBname       = partnerDetails.querySelector('.business-name');
let appAddr        = partnerDetails.querySelector('.address ');

// Reject form and elements
let rejectForm     = document.getElementById('reject-form');
let rejectBlock    = document.getElementById('reject-block');
let rejBid         = rejectBlock.querySelector('.bpid-rej-id');
let rejBname       = rejectBlock.querySelector('.bpid-rej-text');
let rejApprovedId  = <HTMLInputElement>document.getElementById('approved-id');
let rejConfirmBtn  = <HTMLInputElement>document.getElementById('rej-confirm');

// Links to key sidebar actions in bp list
let approveThumbs  = document.querySelectorAll('.icon-thumb');
let rejectThumbs   = document.querySelectorAll('.icon-thumb-down');
let queryLink      = document.querySelectorAll('.query-bp');

// The side panel
let sidePanelCont  = document.querySelector('.panel-cont');
let theSidePanels  = document.querySelectorAll('.side-panel');
let formCancel     = document.querySelectorAll('.cancel');
let rejQueryLink   = document.querySelector('.find-approved');
let mainPanel      = document.querySelector('.side-panel--one');
let subPanel       = document.querySelector('.side-panel--two');

// BpId blocks
let bidBlocksCont  = document.querySelector('.bp-list');
let bidBlocks      = document.querySelectorAll('.bp-list-item');

let sideSwitch: boolean;
let activeCheck: Element;
let activeParent: Element;
let activeSub: boolean;

// Calls side panel close on click off
clickOffPanel(sidePanelCont);

// Handle form submissions
onFormsSubmit(approveForm);
onFormsSubmit(rejectForm);

// Show panel type on bound click events
bindToList(showSearch, queryLink, 'click');
bindToList(showApprove, approveThumbs, 'click');
bindToList(showReject, rejectThumbs, 'click');

// Toggle side panel
bindTo(onTransitionEnd, sidePanelCont, 'transitionend');
bindTo(showRejQuery, rejQueryLink, 'click');

// Select use this btn on rej-query list
bindToList(setUseThis, rejQueryUseBtn, 'click');

// Activate the submit when confirmation block checked
bindTo(setConfirm, rejConfirmBtn, 'click');


// function to handle form submission actions
function onFormsSubmit(form: HTMLElement) : void {
  form.onsubmit = function(){
    toggleSidePanel(sidePanelCont);
    if(activeParent){
      elementDelete(activeParent);
    }
    return false;
  }
};


function toggleSidePanel(sidePanel: Element, activeCheck?: Element) {
    sidePanel.classList.add('panel-cont--animatable');	
    if(!sidePanel.classList.contains('panel-cont--visible')) {		
        sidePanel.classList.add('panel-cont--visible');
    } else {
        sidePanel.classList.remove('panel-cont--visible');
        if(activeCheck){
            activeCheck.classList.remove('on');
        }
        if(activeSub===true){
            hideRejQuery();
        }	
    }	
}

function clickOffPanel(ele: Element) : void {
    document.onmouseup = function(e){
        if (e.target === ele && ele.classList.contains('panel-cont--visible')){
        toggleSidePanel(sidePanelCont);
        }
    } 
}

function showRejQuery() {
    let theBid    = rejBid.innerHTML;
    let theBname  = rejBname.innerHTML;
    if(!subPanel.classList.contains('side-panel--visible')){
      subPanel.classList.add('side-panel--visible');
      activeSub = true;
      updateDetails(rejQueriedBid, theBid, rejQueriedBname,  theBname);
    }
}
  
function hideRejQuery() {
    if(subPanel.classList.contains('side-panel--visible')){
      subPanel.classList.remove('side-panel--visible');
      activeSub = false;
    }
}

function showSearch() {
    let _this      = this;
    let thisParent = getClosest(_this, '.bp-list-item');
    let theBid     = thisParent.querySelector('.bpid').innerHTML;
    let theBname   = thisParent.querySelector('.business-name > a').innerHTML;
    searchBlock.classList.remove('off');
    approveBlock.classList.add('off');
    rejectBlock.classList.add('off');
    updateDetails(queriedBid, theBid, queriedBname, theBname);
    updateInput(searchBlock, theBname);
    toggleSidePanel(sidePanelCont);
}

function setUseThis() {
    let _this      = this;
    let thisParent = getClosest(_this, 'li');
    let thisDetail = thisParent.querySelector('.partner-details');
    let theBid     = thisDetail.querySelector('.bpid').innerHTML;
    //let theBname   = thisDetail.querySelector('.business-name').innerHTML;
    rejApprovedId.value = theBid;
    setValid(rejectForm, rejApprovedId);
    updateLinkText(rejQueryLink, 'Change choice');
    hideRejQuery();
}
  
function showApprove() {
    let _this      = this;
    let ap         = getClosest(_this, '.approval-actions');
    let nextThumb  = ap.querySelector('.icon-thumb-down');
    let thisParent = getClosest(_this, '.bp-list-item');
    let theBid     = thisParent.querySelector('.bpid').innerHTML;
    let theBname   = thisParent.querySelector('.business-name > a').innerHTML;
    let theBaddr   = thisParent.querySelector('.address').innerHTML;
    activeCheck = _this;
    activeParent = thisParent;
    resetSelects(rejectThumbs);
    resetSelects(approveThumbs);
    _this.classList.add('on');
    nextThumb.classList.remove('on');
    searchBlock.classList.add('off');
    approveBlock.classList.remove('off');
    rejectBlock.classList.add('off');
    updateDetails(appBid, theBid, appBname, theBname, appAddr, theBaddr);
    toggleSidePanel(sidePanelCont, activeCheck);
}
  
function showReject() {
    let _this      = this;
    let ap         = getClosest(_this, '.approval-actions');
    let prevThumb  = ap.querySelector('.icon-thumb');
    let thisParent = getClosest(_this, '.bp-list-item');
    let theBid     = thisParent.querySelector('.bpid').innerHTML;
    let theBname   = thisParent.querySelector('.business-name > a').innerHTML;
    activeCheck = _this;
    activeParent = thisParent;
    resetSelects(rejectThumbs);
    resetSelects(approveThumbs);
    prevThumb.classList.remove('on');
    _this.classList.add('on');
    searchBlock.classList.add('off');
    approveBlock.classList.add('off');
    rejectBlock.classList.remove('off');
    updateDetails(rejBid, theBid, rejBname, theBname);
    toggleSidePanel(sidePanelCont, activeCheck);
}

function resetHeights(ele: any){
    let t = getTallest(ele);
    let _ms_ie = isIeCheck();
    for(let i = 0; i < ele.length; i++){
    (_ms_ie ? ele[i].style.height = t +'px' : ele[i].style.minHeight = t +'px' );
    }
    bidBlocksCont.classList.remove('bp-list--drawing');
}
resetHeights(bidBlocks);

let rTime: any;
function isResized() {
    clearTimeout(rTime);
    bidBlocksCont.classList.add('bp-list--drawing');
    rTime = setTimeout(function(){
        resetHeights(bidBlocks);
    }, 500);
}
window.addEventListener('resize', isResized, false);

let viewActions      = document.querySelector('.edit-view-actions');
let viewActionsBtns  = viewActions.querySelectorAll('a');


bindViewLinks(viewActionsBtns);

function bindViewLinks(links: NodeListOf<Element>){
    for(let i = 0;i < links.length; i++){
        links[i].addEventListener('click', toggleView, true);
    }
}

function toggleView() {
    let _this = this;
    bidBlocksCont.classList.toggle('bp-list--table');
    for(let i = 0;i < viewActionsBtns.length; i++){
    viewActionsBtns[i].classList.toggle('active');
    }
    resetHeights(bidBlocks);
}