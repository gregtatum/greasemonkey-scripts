// ==UserScript==
// @name     Twitter - Switch to Latest Tweets
// @version  1
// @grant    none
// @run-at   document-idle
// @include  https://twitter.com/*
// ==/UserScript==

async function switchToLatestTweets() {
  const menu = document.querySelector(`[aria-label="Top Tweets on"]`);

  if (!menu) {
    console.log('Could not find the "Top Tweets on" menu');
    return false;
  }

  // Wait a tick
  await new Promise(requestAnimationFrame);

  console.log('Found the "Top Tweets on" menu, clicking it.');
  menu.click();

  // Wait a tick for the UI to update.
  await new Promise(requestAnimationFrame);

  for (let i = 0; i < 100; i++) {
    for(const el of document.querySelectorAll(`[role=menuitem]`)) {
      if (el.innerText.includes("See latest Tweets")) {
        el.click();
        console.log("Clicking to see the latest tweets.");
        return true;
      }
    }
    console.log(`Could not click "See latest Tweets"`);
    await new Promise(resolve => setTimeout(resolve, 100))
  }
  return false;
}

async function attempts() {
  for (let i = 0; i < 100; i++) {
    console.log(`Switch to latest tweets attempt ${i}`);
    if (await switchToLatestTweets()) {
     	return;
    }
    await new Promise(resolve => setTimeout(resolve, 100))
  }
}

attempts();
