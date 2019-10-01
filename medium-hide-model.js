// ==UserScript==
// @name     Medium - Hide modal
// @version  1
// @grant    none
// @include  https://medium.com.com/*
// @run-at   document-start
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

addStylesheet(`
  /* Hide the modal that is annoying. */
  [aria-modal="true"] {
    display: none;
  }
`);

function addStylesheet(text) {
  const style = document.createElement('style');
  style.innerHTML = text
  document.head.appendChild(style);
  console.log('GreaseMonkey: adding stylesheet', style)
}
