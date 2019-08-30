// ==UserScript==
// @name     Searchfox - Show outline view
// @version  1
// @grant    none
// @include  https://searchfox.org/*
// @run-at   document-idle
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API
try {
  console.log(`Running greasemonkey script "Show outline view"`);

  function $$(selector) {
    return [...document.querySelectorAll(selector)];
  }
  function $(selector) {
    return document.querySelector(selector)
  }

  document.getElementById('panel-content').innerHTML += `
    <ul style='width: 215px;'>
      <li>
        <a class="icon" id="gmShowAll" href='#'>Show All</a>
        <a class="icon gmToggleOutlineView" data-level='1' href='#'>Collapse To Level 1</a>
        <a class="icon gmToggleOutlineView" data-level='2' href='#'>Collapse To Level 2</a>
        <a class="icon gmToggleOutlineView" data-level='3' href='#'>Collapse To Level 3</a>
        <a class="icon gmToggleOutlineView" data-level='4' href='#'>Collapse To Level 4</a>
        <a class="icon gmToggleOutlineView" data-level='5' href='#'>Collapse To Level 5</a>
      <li>
    </ul>
  `

  function toggleOutlineView(e) {
    try {
      e.preventDefault();

      // Decide what's happening with toggles.
      let toggleTo = Number(e.target.dataset.level);

      // Adjust the view to hide all the source lines.
      $$('.source-line-with-number').map(el => el.style.display = 'none')

      for (let i = 1; i <= toggleTo; i++) {
        // Show the items up to that nesting depth
        $$(`.nesting-depth-${i}`).map(el => el.style.display = 'flex')
      }

      // Always show "public", "private" keywords.
      for (const el of $$('.source-line > .syn_reserved')) {
        if (el.children.length === 1 && el.innerText === 'public' ||
            el.innerText === 'private') {
          el.closest('.source-line-with-number').style.display = 'flex'
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

  for (const el of $$('.gmToggleOutlineView')) {
    el.addEventListener('click', toggleOutlineView);
  }

  $('#gmShowAll').addEventListener('click', e => {
    e.preventDefault();
    $$('.source-line-with-number').map(el => el.style.display = 'flex')
  });

} catch (error) {
  console.error(
      `Error running GreaseMonkey script, "Show outline view"`, error);
}
