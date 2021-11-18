// ==UserScript==
// @name     Instagram - Save Images
// @version  1
// @grant    none
// @include  https://www.instagram.com/*
// @run-at   document-idle
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

// Hide the image overlay that stops you from saving an image.

function hideImageBlocker() {
  const matches = {
    bottom: "0px",
    left: "0px",
    position: "absolute",
    right: "0px",
    top: "0px"
  };
  // Go through all of the stylesheets.
  for (const styleSheet of document.styleSheets) {
    // The selectors are machine generated. Find the ones that we care about.
    let fullScreenSelector

    // Go through each rule.
    for (const rule of styleSheet.rules) {
      const { style, selectorText } = rule;
      if (!style) {
        continue;
      }
      let doesMatch = Object.entries(matches).length === Object.entries(style).length;
      for (const [key, value] of Object.entries(matches)) {
        doesMatch = doesMatch && style[key] == value
      }

      if (doesMatch) {
        fullScreenSelector = selectorText;
        console.log("selectorText", selectorText);
      }
    }
    console.log("fullScreenSelector", fullScreenSelector);

    // If we found both selectors, insert a new rule to hide their annoying children.
    if (fullScreenSelector) {
      styleSheet.insertRule(`
        ${fullScreenSelector} {
          display: none !important;
        }
      `, 0)
      return true;
    }
  }
  return false;
}

// Try to find the stylesheets multiple times, we dont know when twitter injects them.
let maxLooping = 10;

function loop () {
  if (maxLooping-- < 0) {
    console.log("GreaseMonkey: Gave up trying to hide the image blocker.")
    return
  }
  if (hideImageBlocker()) {
    console.log("GreaseMonkey: Hide the image blocker");
  } else {
    console.log("GreaseMonkey: Count not find the selectors to hide the image blocker");
    setTimeout(loop, 500);
  }
}

loop();
