"use strict"

const fs = require('fs');

var html = fs.readFileSync('all.html', 'utf8');

console.log('replace');
html = html.replace(/\s+/g, ' ');

console.log('match');
html = html.match(/\<p.*?\<\/p\>/gi);

html = html.map(l => l.replace(/\<.*?\>/g, ''));

fs.writeFileSync('text.txt', html.join('\n'), 'utf8');
//console.log(html);