"use strict"

//const language = 'english';
const language = 'english';

const fs = require('fs');
const stemmer = require('../web/assets/stemmer.js')[language];

var wordLookup = new Map();

addWords('../data/'+language+'_basis.txt', 1);
addWords('../data/'+language+'_fairytales.txt', 10);

function addWords(filename, factor) {
	var lines = fs.readFileSync(filename, 'utf8');
	lines = lines.split('\n');
	lines.forEach(line => {
		if (line.length <= 1) return;
		line = line.split('\t');

		var value = Math.exp(parseFloat(line[1]))*factor;

		line[0].toLowerCase().match(/[a-zäöüß]+/gi).forEach(word => {
			if (word.length < 2) return;
			word = stemmer(word);

			if (!wordLookup.has(word)) wordLookup.set(word, 0);
			wordLookup.set(word, wordLookup.get(word) + value);
		})
	})
}

wordLookup = Array.from(wordLookup.entries());

wordLookup.sort((a,b) => b[1]-a[1]);

wordLookup = wordLookup.slice(0,100000);

wordLookup = wordLookup.map(e => e[0]).join(',')

//console.log(wordLookup);

fs.writeFileSync('../web/assets/'+language+'.txt', wordLookup, 'utf8')
