"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var closest_1 = require("./closest");
var content_update_1 = require("./content-update");
var content_update_2 = require("./content-update");
var content_update_3 = require("./content-update");
var valid_field_set_1 = require("./valid-field-set");
var bindings_1 = require("./bindings");
var bindings_2 = require("./bindings");
var selects_reset_1 = require("./selects-reset");
var transition_end_1 = require("./transition-end");
var confirm_1 = require("./confirm");
var get_tallest_1 = require("./get-tallest");
var ie_check_1 = require("./ie-check");
var element_delete_1 = require("./element-delete");
// Query business partners form
var searchForm = document.getElementById('search-form');
var searchBlock = document.getElementById('search-block');
var queriedBid = searchForm.querySelector('.queried-id');
var queriedBname = searchForm.querySelector('.queried-text');
// Reject query business partners form
var rejQueryform = document.getElementById('reject-query-form');
var rejSearchBlock = document.getElementById('reject-query-block');
var rejQueriedBid = document.querySelector('.queried-id');
var rejQueriedBname = document.querySelector('.queried-name');
var rejQueryUseBtn = document.querySelectorAll('.use-this');
// Approval form and elements
var approveForm = document.getElementById('approve-form');
var approveBlock = document.getElementById('approve-block');
var partnerDetails = approveBlock.querySelector('.partner-details');
var appBid = partnerDetails.querySelector('.bpid');
var appBname = partnerDetails.querySelector('.business-name');
var appAddr = partnerDetails.querySelector('.address ');
// Reject form and elements
var rejectForm = document.getElementById('reject-form');
var rejectBlock = document.getElementById('reject-block');
var rejBid = rejectBlock.querySelector('.bpid-rej-id');
var rejBname = rejectBlock.querySelector('.bpid-rej-text');
var rejApprovedId = document.getElementById('approved-id');
var rejConfirmBtn = document.getElementById('rej-confirm');
// Links to key sidebar actions in bp list
var approveThumbs = document.querySelectorAll('.icon-thumb');
var rejectThumbs = document.querySelectorAll('.icon-thumb-down');
var queryLink = document.querySelectorAll('.query-bp');
// The side panel
var sidePanelCont = document.querySelector('.panel-cont');
var theSidePanels = document.querySelectorAll('.side-panel');
var formCancel = document.querySelectorAll('.cancel');
var rejQueryLink = document.querySelector('.find-approved');
var mainPanel = document.querySelector('.side-panel--one');
var subPanel = document.querySelector('.side-panel--two');
// BpId blocks
var bidBlocksCont = document.querySelector('.bp-list');
var bidBlocks = document.querySelectorAll('.bp-list-item');
var sideSwitch;
var activeCheck;
var activeParent;
var activeSub;
// Calls side panel close on click off
clickOffPanel(sidePanelCont);
// Handle form submissions
onFormsSubmit(approveForm);
onFormsSubmit(rejectForm);
// Show panel type on bound click events
bindings_2.bindToList(showSearch, queryLink, 'click');
bindings_2.bindToList(showApprove, approveThumbs, 'click');
bindings_2.bindToList(showReject, rejectThumbs, 'click');
// Toggle side panel
bindings_1.bindTo(transition_end_1.onTransitionEnd, sidePanelCont, 'transitionend');
bindings_1.bindTo(showRejQuery, rejQueryLink, 'click');
// Select use this btn on rej-query list
bindings_2.bindToList(setUseThis, rejQueryUseBtn, 'click');
// Activate the submit when confirmation block checked
bindings_1.bindTo(confirm_1.setConfirm, rejConfirmBtn, 'click');
// function to handle form submission actions
function onFormsSubmit(form) {
    form.onsubmit = function () {
        toggleSidePanel(sidePanelCont);
        if (activeParent) {
            element_delete_1.elementDelete(activeParent);
        }
        return false;
    };
}
;
function toggleSidePanel(sidePanel, activeCheck) {
    sidePanel.classList.add('panel-cont--animatable');
    if (!sidePanel.classList.contains('panel-cont--visible')) {
        sidePanel.classList.add('panel-cont--visible');
    }
    else {
        sidePanel.classList.remove('panel-cont--visible');
        if (activeCheck) {
            activeCheck.classList.remove('on');
        }
        if (activeSub === true) {
            hideRejQuery();
        }
    }
}
function clickOffPanel(ele) {
    document.onmouseup = function (e) {
        if (e.target === ele && ele.classList.contains('panel-cont--visible')) {
            toggleSidePanel(sidePanelCont);
        }
    };
}
function showRejQuery() {
    var theBid = rejBid.innerHTML;
    var theBname = rejBname.innerHTML;
    if (!subPanel.classList.contains('side-panel--visible')) {
        subPanel.classList.add('side-panel--visible');
        activeSub = true;
        content_update_1.updateDetails(rejQueriedBid, theBid, rejQueriedBname, theBname);
    }
}
function hideRejQuery() {
    if (subPanel.classList.contains('side-panel--visible')) {
        subPanel.classList.remove('side-panel--visible');
        activeSub = false;
    }
}
function showSearch() {
    var _this = this;
    var thisParent = closest_1.getClosest(_this, '.bp-list-item');
    var theBid = thisParent.querySelector('.bpid').innerHTML;
    var theBname = thisParent.querySelector('.business-name > a').innerHTML;
    searchBlock.classList.remove('off');
    approveBlock.classList.add('off');
    rejectBlock.classList.add('off');
    content_update_1.updateDetails(queriedBid, theBid, queriedBname, theBname);
    content_update_3.updateInput(searchBlock, theBname);
    toggleSidePanel(sidePanelCont);
}
function setUseThis() {
    var _this = this;
    var thisParent = closest_1.getClosest(_this, 'li');
    var thisDetail = thisParent.querySelector('.partner-details');
    var theBid = thisDetail.querySelector('.bpid').innerHTML;
    //let theBname   = thisDetail.querySelector('.business-name').innerHTML;
    rejApprovedId.value = theBid;
    valid_field_set_1.setValid(rejectForm, rejApprovedId);
    content_update_2.updateLinkText(rejQueryLink, 'Change choice');
    hideRejQuery();
}
function showApprove() {
    var _this = this;
    var ap = closest_1.getClosest(_this, '.approval-actions');
    var nextThumb = ap.querySelector('.icon-thumb-down');
    var thisParent = closest_1.getClosest(_this, '.bp-list-item');
    var theBid = thisParent.querySelector('.bpid').innerHTML;
    var theBname = thisParent.querySelector('.business-name > a').innerHTML;
    var theBaddr = thisParent.querySelector('.address').innerHTML;
    activeCheck = _this;
    activeParent = thisParent;
    selects_reset_1.resetSelects(rejectThumbs);
    selects_reset_1.resetSelects(approveThumbs);
    _this.classList.add('on');
    nextThumb.classList.remove('on');
    searchBlock.classList.add('off');
    approveBlock.classList.remove('off');
    rejectBlock.classList.add('off');
    content_update_1.updateDetails(appBid, theBid, appBname, theBname, appAddr, theBaddr);
    toggleSidePanel(sidePanelCont, activeCheck);
}
function showReject() {
    var _this = this;
    var ap = closest_1.getClosest(_this, '.approval-actions');
    var prevThumb = ap.querySelector('.icon-thumb');
    var thisParent = closest_1.getClosest(_this, '.bp-list-item');
    var theBid = thisParent.querySelector('.bpid').innerHTML;
    var theBname = thisParent.querySelector('.business-name > a').innerHTML;
    activeCheck = _this;
    activeParent = thisParent;
    selects_reset_1.resetSelects(rejectThumbs);
    selects_reset_1.resetSelects(approveThumbs);
    prevThumb.classList.remove('on');
    _this.classList.add('on');
    searchBlock.classList.add('off');
    approveBlock.classList.add('off');
    rejectBlock.classList.remove('off');
    content_update_1.updateDetails(rejBid, theBid, rejBname, theBname);
    toggleSidePanel(sidePanelCont, activeCheck);
}
function resetHeights(ele) {
    var t = get_tallest_1.getTallest(ele);
    var _ms_ie = ie_check_1.isIeCheck();
    for (var i = 0; i < ele.length; i++) {
        (_ms_ie ? ele[i].style.height = t + 'px' : ele[i].style.minHeight = t + 'px');
    }
    bidBlocksCont.classList.remove('bp-list--drawing');
}
resetHeights(bidBlocks);
var rTime;
function isResized() {
    clearTimeout(rTime);
    bidBlocksCont.classList.add('bp-list--drawing');
    rTime = setTimeout(function () {
        resetHeights(bidBlocks);
    }, 500);
}
window.addEventListener('resize', isResized, false);
var viewActions = document.querySelector('.edit-view-actions');
var viewActionsBtns = viewActions.querySelectorAll('a');
bindViewLinks(viewActionsBtns);
function bindViewLinks(links) {
    for (var i = 0; i < links.length; i++) {
        links[i].addEventListener('click', toggleView, true);
    }
}
function toggleView() {
    var _this = this;
    bidBlocksCont.classList.toggle('bp-list--table');
    for (var i = 0; i < viewActionsBtns.length; i++) {
        viewActionsBtns[i].classList.toggle('active');
    }
    resetHeights(bidBlocks);
}
