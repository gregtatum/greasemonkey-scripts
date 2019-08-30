// ==UserScript==
// @name     Bugzilla - Fill out bug IDs descriptions
// @version  1
// @grant    none
// @include  https://bugzilla.mozilla.org/show_bug.cgi*
// @run-at   document-idle
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

// Makes bug IDs have their description shown instead.

for (const bugLink of document.querySelectorAll('.bug-list .bz_bug_link')) {
  bugLink.innerText += " - " + bugLink.title.replace('NEW - ', '')

  Object.assign(bugLink.style, {
    display: 'block',
    whiteSpace: 'nowrap',
    maxWidth: '70%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  });

  // Check to see if it's followed by a comma, if so, remove it.
  const { nextSibling } = bugLink
  if (nextSibling && nextSibling.textContent && nextSibling.textContent.trim() === ",") {
    nextSibling.remove();
  }
}
