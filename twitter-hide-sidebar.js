// ==UserScript==
// @name     Twitter - Hide sidebar
// @version  1
// @grant    none
// @include  https://twitter.com/*
// @run-at   document-idle
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

// Hide the annoying panels on the right.

function hideSidebar() {
  // Go through all of the stylesheets.
  for (const styleSheet of document.styleSheets) {
    // The selectors are machine generated. Find the ones that we care about.
    let borderRadiusSelector
    let backgroundRadiusSelector

    // Go through each rule.
    for (const rule of styleSheet.rules) {
      const { style, selectorText } = rule;
      if (!style) {
        continue;
      }

      // The rules are de-duplicated and at the time of the writing there is pretty much
      // one css style declaration per ruleset.
      if (style.borderRadius === '15px') {
        borderRadiusSelector = selectorText;
      }
      const lightMode = 'rgb(245, 248, 250)';
      const darkMode = 'rgb(25, 39, 52)';
      if (style.backgroundColor == lightMode || style.backgroundColor === darkMode) {
        backgroundRadiusSelector = selectorText
      }
    }

    // If we found both selectors, insert a new rule to hide their annoying children.
    if (borderRadiusSelector && backgroundRadiusSelector) {
      // Double check that the selector still matches expectations. e.g. "r-9cbz99"
      const validSelector = /^\.r-[a-z0-9]+$/

      if (
        !borderRadiusSelector.match(validSelector) ||
        !backgroundRadiusSelector.match(validSelector)
      ) {
        console.error({ borderRadiusSelector, backgroundRadiusSelector })
        throw new Error("GreaseMonkey: The selectors to match the annoying sidebar elements don't seem to match anymore.")
      }

      // styleSheet.insertRule(`
      //   ${borderRadiusSelector}${backgroundRadiusSelector} > * {
      //     opacity: 0 !important;
      //     pointer-events: none;
      //   }
      // `)

      styleSheet.insertRule(`
        ${borderRadiusSelector}${backgroundRadiusSelector} > * {
          filter: blur(9px) saturate(0) contrast(0.3) brightness(1.4);
          pointer-events: none;
					user-select: none;
        }
      `, 0)
      return true;
    }
  }
  return false;
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
    console.log("GreaseMonkey: Count not find the selectors to hide the annoying sidebar on twitter.");
    setTimeout(loop, 500);
  }
}

loop();
