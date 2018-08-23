"use strict"

const fs = require('fs');

var wordLookup = new Map();

var text = fs.readFileSync('all.txt', 'utf8');

// count every meaningful, using wordLookup
text.match(/[a-zäöüß]+/gi).forEach(word => {
	if (word.length < 2) return;
	word = word.toLowerCase();
	if (!wordLookup.has(word)) {
		wordLookup.set(word, 1);
	} else {
		wordLookup.set(word, wordLookup.get(word)+1);
	}
});

wordLookup = Array.from(wordLookup.entries());

// remove all words that occur under 3 times
wordLookup = wordLookup.filter(e => e[1] >= 3);

// sort by frequency in descending order
wordLookup.sort((a,b) => b[1] - a[1]);

// ensure, that the sum of all propabilities is 1
var sum = 0;
wordLookup.forEach(e => sum += e[1]);
// and also calculate the logarithm and convert it to string
wordLookup.forEach(e => e[1] = Math.log(e[1]/sum).toFixed(3));

// prepare and save the wordLookup list
wordLookup = wordLookup.map(e => e.join('\t')).join('\n');
fs.writeFileSync('words.txt', wordLookup, 'utf8');
