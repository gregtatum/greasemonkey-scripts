// ==UserScript==
// @name     Searchfox - Inline search
// @version  1
// @grant    none
// @include  https://searchfox.org/*
// @run-at   document-idle
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

console.log(`Running greasemonkey script "Inline search"`);

function $$(selector) { return [...document.querySelectorAll(selector)]; }
function $(selector) { return document.querySelector(selector) }

document.getElementById('panel-content').innerHTML += `<ul><li><input type='text' id="gmSearchBox" placeholder="Inline search"/></li></ul>`


const input = $('#gmSearchBox');

Object.assign(input.style, {
  marginLeft: '30px',
  marginBottom: '10px',
});

function updateSearch(e) {
  e.preventDefault();
  const searchText = $('#gmSearchBox').value
  if (!searchText) {
    $$('.source-line-with-number').forEach(el => el.style.display = 'flex')
    $('.last-selected.highlighted').scrollIntoView({ block: 'center' });
  } else {
    $$('.source-line-with-number').forEach(el => {
      const hasSearch = el.innerText &&
        el.innerText.toLowerCase().includes(
          searchText.toLowerCase()
        );

      el.style.display = hasSearch ? 'flex' : 'none';
    });
  }
}

$('#gmSearchBox').addEventListener('keyup', updateSearch);
