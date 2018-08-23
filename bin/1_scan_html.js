"use strict"

const fs = require('fs');

// load the file
var html = fs.readFileSync('all.html', 'utf8');


// replace every ascii char < 0x20 with space
console.log('replace');
var buffer = Buffer.from(html, 'utf16le');
if (buffer.length !== html.length*2) throw Error();
for (var i = 0; i < buffer.length; i += 2) {
	var value = buffer.readUInt16LE(i);
	if (value <= 32) buffer.writeUInt16LE(32, i)
}
html = buffer.toString('utf16le');
buffer = undefined;

// find all paragraph tags
console.log('match');
html = html.match(/\<p.*?\<\/p\>/gi);

// remove white spaces, trim and remove html tags
html = html.map(l => {
	l = l.replace(/\s+/g, ' ');
	l = l.trim();
	l = l.replace(/\<.*?\>/g, '')
	return l;
});

// save the result
fs.writeFileSync('all.txt', html.join('\n'), 'utf8');
