// ==UserScript==
// @name     Phabricator - Make it readable
// @version  1
// @grant    none
// @include  https://phabricator.services.mozilla.com/*
// @run-at   document-start
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

addStylesheet(`
  /* Make the ghosted inline elements visible */
  .differential-inline-comment.inline-comment-ghost {
    opacity: 1 !important;
  }

	.differential-inline-comment.inline-comment-ghost .differential-inline-done-label, .differential-inline-comment.inline-comment-ghost {
		color: #000;
  }

  /* This overlays and dims the text making it hard to read */
	.keyboard-focus-focus-reticle {
    background: transparent !important;
  }
`);

function addStylesheet(text) {
  const style = document.createElement('style');
  style.innerHTML = text
  document.head.appendChild(style);
  console.log('GreaseMonkey: adding stylesheet', style)
}
