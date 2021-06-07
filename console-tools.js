// ==UserScript==
// @name     console-tools
// @version  1
// @grant    none
// @include  *
// ==/UserScript==

function inject () {
	console.spark = function sparkGraph(data, normalize = true) {
    if (!Array.isArray(data)) {
      return "Pass an array of numbers to create a spark graph."
    }
    let min = Infinity;
    let max = -Infinity;
    for (const datum of data) {
      min = Math.min(min, datum);
      max = Math.max(max, datum);
    }
    let result = ""
    for (const datum of data) {
      // Block elements
      // https://www.compart.com/en/unicode/block/U+2580
      const n = normalize
        ? Math.min(7, Math.round((datum - min)/(max - min)*7))
        : Math.min(7, Math.round(datum/max*7));

      // Don't graph negative numbers
      result += n >= 0 ? String.fromCodePoint(0x2581 + n) : " "
    }
    return result;
  }
}

const script = document.createElement('script');
script.appendChild(document.createTextNode('('+ inject +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
