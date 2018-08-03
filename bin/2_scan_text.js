"use strict"

const fs = require('fs');

var wordLookup = new Map();

var text = fs.readFileSync('all.txt', 'utf8');

text.match(/[a-zäöüß]+/gi).forEach(word => {
	if (word.length < 2) return;
	word = word.toLowerCase();
	if (!wordLookup.has(word)) {
		wordLookup.set(word, 1);
	} else {
		wordLookup.set(word, wordLookup.get(word)+1);
	}
	//console.log(word);
});

wordLookup = Array.from(wordLookup.entries());

wordLookup = wordLookup.filter(e => e[1] >= 3);

wordLookup.sort((a,b) => b[1] - a[1]);

var sum = 0;
wordLookup.forEach(e => sum += e[1]);

wordLookup.forEach(e => e[1] = Math.log(e[1]/sum).toFixed(3));
wordLookup = wordLookup.map(e => e.join('\t')).join('\n');

fs.writeFileSync('words.txt', wordLookup, 'utf8');
