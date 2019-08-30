// ==UserScript==
// @name     Bugzilla - Filter results
// @version  1
// @grant    none
// @include  https://bugzilla.mozilla.org/buglist.cgi*
// @run-at   document-idle
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

// Creates a filter box on the bugzilla search results

console.log("GreaseMonkey script running");

const description = document.querySelector('.search_description')
const searchField = document.createElement('div')
searchField.innerHTML = `
  <input type='text' placeholder='Filter results' onClick= />
`
const input = searchField.querySelector('input')
Object.assign(input.style, {
  width: '100%'
});
insertAfter(description, searchField)
searchField.addEventListener('keyup', filterItems);
input.focus()

function filterItems() {
  const searchTerm = searchField.querySelector('input').value;
  for (const el of document.querySelectorAll('.bz_bugitem')) {
    el.style.display = el.innerText.toLowerCase().includes(searchTerm.toLowerCase()) ? "" : "none"
  }
}

function insertAfter (el, newNode) {
  el.parentNode.insertBefore(newNode, el.nextSibling)
}


// Fix the sort to be descending
const updatedHeaderEl = document.querySelector('.bz_buglist_header').lastElementChild
updatedHeaderEl.click()
updatedHeaderEl.click()
