// ==UserScript==
// @name     Searchfox - Show outline view
// @version  1
// @grant    none
// @include  https://searchfox.org/*
// @run-at   document-idle
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

console.log(`Running greasemonkey script "Show outline view"`);

function $$(selector) { return [...document.querySelectorAll(selector)]; }
function $(selector) { return document.querySelector(selector) }

document.getElementById('panel-content').innerHTML += `<ul><li><a class="icon" id="gmToggleOutlineView" href='#'>Toggle Outline View</a><li></ul>`

const displayType = $('.source-line-with-number').style.display;
let isToggled = false;

function toggleOutlineView(e) {
  e.preventDefault();
  const display = isToggled ? displayType : 'none';
	$$('.source-line-with-number').map(el => el.style.display = display)
	$$('.nesting-depth-1').map(el => el.style.display = displayType)
  isToggled = !isToggled
}

$('#gmToggleOutlineView').addEventListener('click', toggleOutlineView);
