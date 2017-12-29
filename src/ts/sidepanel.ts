// Query business partners form
let searchForm     = document.getElementById('search-form');
let searchBlock    = document.getElementById('search-block');
let queriedId      = searchForm.querySelector('.queried-id');

// Reject query business partners form
let rejQueryform   = document.getElementById('reject-query-form');
let rejSearchBlock = document.getElementById('reject-query-block');
let rejQueriedId   = document.querySelector('.queried-id');
let rejQueriedName = document.querySelector('.queried-name');
let rejQueryUseBtn = document.querySelectorAll('.use-this');

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

// Copy buttons
let copyBtns  = document.querySelectorAll('.icon-copy');

let activeCheck: Element;
let activeParent: Element;
let activeSub: boolean;
let sideSwitch: boolean;
let koTimer: number;

// function to handle form submission actions
const onFormsSubmit = function (form: HTMLElement) : void {
  form.onsubmit = function(){
    toggleSidePanel();
    if(activeParent){
      koElement(activeParent);
    }
    return false;
  }
};

// function to handle side panel click away
const clickOffPanel = function (ele: Element) : void {
  document.onmouseup = function(e){
    if (e.target == ele && ele.classList.contains('panel-cont--visible')){
    toggleSidePanel();
    }
  } 
};

// function to add event to multiple items
function actionBinding(func: any, ele: NodeList, eventType: string){
  for(let i = 0; i < ele.length; i++){
    let thisFunction = func;
    ele[i].addEventListener(eventType, thisFunction, false);
  }
};

function singleElementBind(func: any, ele: Element, eventType: string){
  ele.addEventListener(eventType, func, false);
};

function resetSelects(ele: NodeListOf<Element>){
  for(let i = 0; i < ele.length; i++){
    ele[i].classList.remove('on');
  }
};

// Calls side panel close on click off
clickOffPanel(sidePanelCont);

// Handle form submissions
onFormsSubmit(approveForm);
onFormsSubmit(rejectForm);

// Toggle side panel
singleElementBind(onSidePanelTransitionEnd, sidePanelCont, 'transitionend');
singleElementBind(showRejQuery, rejQueryLink, 'click');

// Show panel type on bound click events
actionBinding(showSearch, queryLink, 'click');
actionBinding(showApprove, approveThumbs, 'click');
actionBinding(showReject, rejectThumbs, 'click');

// Copy to clipboard binding
actionBinding(copyTo, copyBtns, 'click');

// Close panel cancel binding
actionBinding(toggleSidePanel, formCancel, 'click');

// Select use this btn on rej-query list
actionBinding(submitUseThis, rejQueryUseBtn, 'click');

// Activate the submit when confirmation block checked
singleElementBind(setConfirm, rejConfirmBtn, 'click');

// Adds off class for now to simulate delete
function koElement(ele: Element){
  clearTimeout(koTimer);
  ele.classList.add('off');
  let thisParent = ele.parentNode;
  koTimer = setTimeout(function(){
    thisParent.removeChild(ele);
  }, 800);
};

function onSidePanelTransitionEnd() {
  sidePanelCont.classList.remove('panel-cont--animatable');
};

function toggleSidePanel() {
  sidePanelCont.classList.add('panel-cont--animatable');	
	if(!sidePanelCont.classList.contains('panel-cont--visible')) {		
		sidePanelCont.classList.add('panel-cont--visible');
	} else {
    sidePanelCont.classList.remove('panel-cont--visible');
    if(activeCheck){
    activeCheck.classList.remove('on');
    }
    if(activeSub===true){
      hideRejQuery();
    }	
	}
};

function updateSearch(formBlock: Element, bName: string, bId: string) {
  let searchInput       = <HTMLInputElement>formBlock.querySelector('.search-input');
  let searchResultBname = formBlock.querySelector('.queried-text');
  let searchResultBId   = formBlock.querySelector('.queried-id');
  searchInput.value = bName;
  searchResultBname.innerHTML = bName;
  searchResultBId.innerHTML = bId;
};

function updateApproveDetails(busId: string, busName: string, busAddr: string) {
  appBid.innerHTML = busId;
  appBname.innerHTML = busName;
  appAddr.innerHTML = busAddr;
};

function updateRejDetails(busId: string, busName: string) {
  rejBid.innerHTML = busId;
  rejBname.innerHTML = busName;
};

function updateRejQueryDetails(busId: string, busName: string) {
  rejQueriedId.innerHTML = busId;
  rejQueriedName.innerHTML = busName;
};

function setValid(theParent: Element, theField: Element){
  if(!theField.classList.contains('valid')){
    let checkCont = document.createElement('span');
    checkCont.classList.add('icon-check');
    theParent.insertBefore(checkCont, theField.nextSibling);
    theField.classList.add('valid');
  }
}

function resetLinkText(link: Element, newLinkText: string) {
  let state : boolean;
  if(state===undefined||state===false){
    console.log(state);
    link.innerHTML = newLinkText;
    state = true;
  }
}

function toggleEnableBtn(btn: HTMLInputElement) {
  if(btn.disabled===true){
    btn.disabled=false;
  }else{
    btn.disabled=true;
  }
  console.log(btn.disabled);
};

function setConfirm() {
  let _this = this;
  let thisParent = getClosest(_this, 'form');
  let theSubmit  = <HTMLInputElement>thisParent.querySelector('.submit');
  toggleEnableBtn(theSubmit);
};

function submitUseThis() {
  let _this      = this;
  let thisParent = getClosest(_this, 'li');
  let thisDetail = thisParent.querySelector('.partner-details');
  let theBid     = thisDetail.querySelector('.bpid').innerHTML;
  let theBname   = thisDetail.querySelector('.business-name').innerHTML;
  rejApprovedId.value = theBid;
  setValid(rejectForm, rejApprovedId);
  resetLinkText(rejQueryLink, 'Change choice');
  hideRejQuery();
};

function showRejQuery() {
  let theBid    = rejBid.innerHTML;
  let theBname  = rejBname.innerHTML;
  if(!subPanel.classList.contains('side-panel--visible')){
    subPanel.classList.add('side-panel--visible');
    activeSub = true;
    updateRejQueryDetails(theBid, theBname);
  }
};

function hideRejQuery() {
  if(subPanel.classList.contains('side-panel--visible')){
    subPanel.classList.remove('side-panel--visible');
    activeSub = false;
  }
};

function showSearch() {
  let _this      = this;
  let thisParent = getClosest(_this, '.bp-list-item');
  let theBid     = thisParent.querySelector('.bpid').innerHTML;
  let theTitle   = thisParent.querySelector('.business-name > a').innerHTML;
  searchBlock.classList.remove('off');
  approveBlock.classList.add('off');
  rejectBlock.classList.add('off');
  updateSearch(searchBlock, theTitle, theBid);
  toggleSidePanel();
};

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
  updateApproveDetails(theBid, theBname, theBaddr);
  toggleSidePanel();
};

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
  updateRejDetails(theBid, theBname);
  toggleSidePanel();
};

function copyTo() {
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
