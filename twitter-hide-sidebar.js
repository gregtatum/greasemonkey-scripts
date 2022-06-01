// ==UserScript==
// @name     Twitter - Hide sidebar
// @version  1
// @grant    none
// @include  https://twitter.com/*
// @run-at   document-idle
// ==/UserScript==


function hideSidebar() {
  const el = document.querySelector('[aria-label="Trending"]');
  if (!el) {
    return false;
  }
  Object.assign(el.style, {
    filter: 'blur(9px) saturate(0)',
    opacity: '0.5',
    pointerEvents: 'none',
		userSelect: 'none',
  });
  return true;
}

// Try to find the stylesheets multiple times, we dont know when twitter injects them.
let maxLooping = 25;

function loop () {
  if (maxLooping-- < 0) {
    console.log("GreaseMonkey: Gave up trying to hide the annoying sidebar.")
    return
  }
  if (hideSidebar()) {
    console.log("GreaseMonkey: Hide the annoying sidebar on twitter.");
  } else {
    console.log("GreaseMonkey: Count not find the element to hide the annoying sidebar on twitter.");
    setTimeout(loop, 500);
  }
}

loop();
