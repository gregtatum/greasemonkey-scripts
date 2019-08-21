// ==UserScript==
// @name     YouTube - Hide elements
// @version  1
// @grant    none
// @include  https://www.youtube.com/*
// @run-at   document-start
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

const dimOut = `
  filter: blur(7px) saturate(0);
  opacity: 0.2;
  pointer-events: none;
`

addStylesheet(`
  /* Hide the endscreen content from a video */
  .ytp-endscreen-content {
    ${dimOut}
  }

  /* Hide the play more videos */
  ytd-compact-video-renderer, ytd-compact-autoplay-renderer {
    ${dimOut}
  }

  /* Dim out homepage videos. */
  ytd-grid-video-renderer, ytd-grid-radio-renderer {
    ${dimOut}
  }

`);

function addStylesheet(text) {
  const style = document.createElement('style');
  style.innerHTML = text
  document.head.appendChild(style);
  console.log('GreaseMonkey: adding stylesheet', style)
}
