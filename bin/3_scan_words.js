"use strict"

const fs = require('fs');
const Stemmer = require('../web/assets/script/stemmer.js');

// combine multiple wordlists, but use weights. E.g. one wordlist can have 100-times more influence.
[
	{name: 'german', files:[
		['german_basis.txt', 1],
		['german_fairytales.txt', 70],
		['german_magazin.txt', 30],
	]},
	{name: 'english', files:[
		['english_basis.txt', 1],
		['english_fairytales.txt', 100],
	]},
].forEach(task => {

	// use stemmer specifically for this language
	var stemmer = Stemmer[task.name];
	var wordLookup = new Map();

	task.files.forEach(file => addWords('../data/'+file[0], file[1]));

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

	wordLookup.sort((a,b) => (b[1]-a[1]) || a[0].localeCompare(b[0]));

	// use only the 80.000 most word (stems)
	wordLookup = wordLookup.slice(0, 80000);

	wordLookup = wordLookup.map(e => e[0]).join('\n')

	// save data
	fs.writeFileSync('../web/assets/data/'+task.name+'.txt', wordLookup, 'utf8')
})
