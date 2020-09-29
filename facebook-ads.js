// ==UserScript==
// @name     Facebook ad blocker
// @version  1
// @grant    none
// @include  https://www.facebook.com/*
// @run-at   document-idle
// ==/UserScript==

if (window.location.toString() !== "https://www.facebook.com/common/referer_frame.php") {
  try {
    console.log('Running Facebook ad blocker', location.toString());
    main();
    blockAds();
  } catch (error) {
    console.error("Unable to run the GreaseMonkey script to hide Facebook ads.", error);
  }
}

function main() {
	addStylesheet(`
    [aria-label^=Watch],
    [aria-label^=Marketplace],
    [aria-label^=Groups] {
      opacity: 0;
    }
  `);

}

function blockAds() {
 	// https://wiki.greasespot.net/Greasemonkey_Manual:API
  const checkedEls = new WeakSet();

  // Select the news feed.
  const newsFeed = document.querySelector('[role="feed"]')
  if (!newsFeed) {
    console.warn('No newsfeed element was found.', newsFeed);
  } else {
    console.log('Greasemonkey found the news feed', newsFeed)
  }

  function runAdChecker() {
    console.log('Run ad checker');
    // The "Sponsored" tag is made up of lots of spans together.
    const maybeSponsored = [...document.querySelectorAll('span + span + span + span + span + span + span')];

    for (const baseEl of maybeSponsored) {
      if (checkedEls.has(baseEl)) {
        continue;
      }
      checkedEls.add(baseEl);
      const spans = [...baseEl.parentElement.querySelectorAll('span')];

      const lettersByRow = {}
      for (const el of spans) {
        const rect = el.getBoundingClientRect();
        if (!lettersByRow[rect.top]) {
          lettersByRow[rect.top] = '';
        }
        lettersByRow[rect.top] += el.textContent;
      }

      for (const word of Object.values(lettersByRow)) {
        console.log("Found word", word, baseEl);
        if (word === "Sponsored") {
          const sponsoredElement = baseEl.closest('[data-pagelet]');
          if (!sponsoredElement) {
            console.warn("Could not find sponsored element");
          } else {
            Object.assign(sponsoredElement.style, {
              filter: 'blur(5px) contrast(0.1) brightness(1.8)',
              pointerEvents: 'none'
            });
          }
          break;
        }
      }
    }
  }

  const observer = new MutationObserver(() => {
    try {
      runAdChecker()
    } catch(error) {
      console.error("Error in the GreaseMonkey ad observer.", error);
    }
  });

  // Now start the observer.
  observer.observe(newsFeed, {
    childList: true,
    subtree: true
  });
  console.log('Done with the observe');
}

function addStylesheet(text) {
  const style = document.createElement('style');
  style.innerHTML = text
  document.head.appendChild(style);
  console.log('GreaseMonkey: adding stylesheet', style)
}
