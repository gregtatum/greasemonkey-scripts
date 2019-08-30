// ==UserScript==
// @name     Facebook ad blocker
// @version  1
// @grant    none
// @include  https://facebook.com/*
// @run-at   document-idle
// ==/UserScript==

// https://wiki.greasespot.net/Greasemonkey_Manual:API

try {
  const checkedEls = new WeakSet();

  const observer = new MutationObserver(() => {
    // The "Sponsored" tag is made up of lots of spans together.
    const maybeSponsored = [...document.querySelectorAll('span + span + span + span + span + span + span')];

    for (const baseEl of maybeSponsored) {
      if (checkedEls.has(baseEl)) {
        continue;
      }
      checkedEls.add(baseEl);
      const spans = [...baseEl.parentElement.querySelectorAll('span')];
      const word = spans
        // Filter to the ones that have width.
        .filter(el => el.getBoundingClientRect().width)
        // Get the the [data-content] attribute.
        .map(el => el.dataset.content)
        // Filter to the ones that have content.
        .filter(content => content)
        // Join the letters together.
        .join("")

      if (word === "Sponsored") {
        const sponsoredElement = baseEl.closest('.userContentWrapper');
        if (!sponsoredElement) {
          console.warn("Could not find sponsored element");
        }

        Object.assign(sponsoredElement.style, {
          filter: 'blur(5px) contrast(0.1) brightness(1.8)',
          pointerEvents: 'none'
        });
      }
    }
  });

  // Select the news feed.
  const newsFeed = document.querySelector('[aria-label="News Feed"]')
  if (!newsFeed) {
    console.warn('No newsfeed element was found.');
  }

  // Now start the observer.
  observer.observe(newsFeed, {
    childList: true,
    subtree: true
  });
} catch (error) {
  console.error("Unable to run the GreaseMonkey script to hide Facebook ads.", error);
}
