
$(function () {
	var library = {}, dict;

	// initialize editor
	var quill = new Quill('#editor', {formats:['background']});
	quill.on('text-change', function (d1, d0, source) {
		if (source === 'api') return;
		analyse(d1);
	})

	// buttons for switching languages
	$('button[name=language]').click(function () {
		initLanguage($(this).val());
	})

	// initialize language based on browser config
	switch ((navigator.language || 'en').toLowerCase().slice(0,2)) {
		case 'de': initLanguage('german'); break;
		default: initLanguage('english');
	}

	function initLanguage(lang) {
		// toggle activity of the menu buttons
		$('#menu button').each(function (index, button) {
			button = $(button);
			button.toggleClass('active', button.val() === lang)
		})

		// toggle visibility of language dependent elements
		$('.language').each(function (index, node) {
			node = $(node);
			node.toggle(node.hasClass(lang));
		})

		// if library is not initialized yet ...
		if (!library[lang]) {
			dict = (library[lang] = {});

			// get stemmer and example texts
			dict.stemmer = stemmer[lang];
			dict.exampleText = exampleText[lang];

			// load wordlist
			$.get('assets/data/'+lang+'.txt', function (data) {
				var lookup = {};
				data = data.split('\n');
				data.forEach(function (word, index) {
					lookup[word] = index+1;
				});
				dict.lookup = lookup;
				dict.wordCount = data.length;
				dict.maxValue = Math.log(dict.wordCount);

				switch (lang) {
					case 'english': dict.optValue = Math.log(3e3); break;
					case 'german':  dict.optValue = Math.log(10e3); break;
				}
				finish();
			})
		} else {
			dict = library[lang];
			finish();
		}

		function finish() {
			quill.setText(dict.exampleText, 'user');
		}
	}

	// analyse the current text in the editor and highlight words
	function analyse(d) {
		if (!dict) return;
		
		var text = quill.getText();
		var startIndex = 0, endIndex = text.length-1;

		// as an optimization: find the first and last character, that was changed
		// so we only have to check that part of the text
		if (d && d.ops) {
			var i0 = 0, i1 = 0;
			d.ops.forEach(function (op) {
				if (op.delete) return;
				if (op.insert) return i1 += op.insert.length;
				if (op.retain) {
					if (i0 === 0) i0 = op.retain;
					i1 += op.retain
					return;
				}
			})
			startIndex = text.lastIndexOf(' ', i0-1);
			if (startIndex < 0) startIndex = 0;
			endIndex = text.indexOf(' ', i1+1);
			if (endIndex < 0) endIndex = text.length-1;
		}
		
		var textLength = endIndex-startIndex;


		// remove all formats of that text block
		quill.removeFormat(startIndex, textLength, 'api');

		text.replace(/[a-zäöüß]+/gi, function (chunk, offset) {
			if (offset < startIndex) return;
			if (offset > endIndex) return;

			var length = chunk.length;

			if (length <= 1) return;

			// hurray, we found a word. so lets clean it up and check it.
			var word = chunk.toLowerCase();
			word = dict.stemmer(word);

			var value = dict.lookup[word] || 1e10;
			
			value = Math.log(value);
			value = 1-(value-dict.maxValue)/(dict.optValue-dict.maxValue);

			if (value <= 0) return; // known word, so don't highlight it

			color = getColor(value);

			quill.formatText(offset, length, 'background', '#'+color, 'api');
		});
	}
})

var gradient = 'ffffff,fff9e2,fff2c5,ffecab,ffe595,ffdd7f,ffd56f,ffcc5c,ffc44d,ffbc3e,ffb433,ffaa26,ffa01b,ff9710,ff8c06,ff8301,ff7700'.split(',').map(function (hex) {
	return [
		parseInt(hex.slice(0,2),16),
		parseInt(hex.slice(2,4),16),
		parseInt(hex.slice(4,6),16)
	]
})
var slotCount = gradient.length-1;
function getColor(value) {
	if (value < 0) value = 0;
	if (value > 1) value = 1;

	var slot = Math.min(Math.floor(value*slotCount), slotCount-1);
	var a = value*slotCount - slot;

	var c0 = gradient[slot];
	var c1 = gradient[slot+1];

	return [
		('00'+Math.round(c0[0] + (c1[0]-c0[0])*a).toString(16)).slice(-2),
		('00'+Math.round(c0[1] + (c1[1]-c0[1])*a).toString(16)).slice(-2),
		('00'+Math.round(c0[2] + (c1[2]-c0[2])*a).toString(16)).slice(-2),
	].join('');
}

var exampleText = {
	german:[
		'Regen ist die am häufigsten auftretende Form flüssigen Niederschlags aus Wolken.',
		'Er besteht aus Wasser, das nach Kondensation von Wasserdampf infolge der Schwerkraft auf die Erde fällt.',
		'Regentropfen binden Staub und Aerosole, die in die Atmosphäre aufgestiegen sind. Diese Bestandteile bestimmen den pH-Wert des Regens.',
		'Die Regenformen werden nach Entstehung, Dauer, Intensität, Wirkung und geografischem Vorkommen unterschieden. Fester Niederschlag, z. B. Hagel, Graupel oder Schnee, besteht aus gefrorenem Wasser und Kondensationskeimen und tritt auch gemischt mit Regen auf.',
		'Die Kondensation des Wasserdampfes in der Atmosphäre tritt durch Abkühlung und durch Aerodynamik ein. Zusätzlich bestimmen der Staubgehalt und die Aerosole den Taupunkt abweichend vom Phasendiagramm der theoretischen Thermodynamik.',
	].join('\n'),
	english:[
		'Rain is liquid water in the form of droplets that have condensed from atmospheric water vapor and then becomes heavy enough to fall under gravity.',
		'Rain is a major component of the water cycle and is responsible for depositing most of the fresh water on the Earth. It provides suitable conditions for many types of ecosystems, as well as water for hydroelectric power plants and crop irrigation.',
		'The major cause of rain production is moisture moving along three-dimensional zones of temperature and moisture contrasts known as weather fronts. If enough moisture and upward motion is present, precipitation falls from convective clouds (those with strong upward vertical motion) such as cumulonimbus (thunder clouds) which can organize into narrow rainbands.',
		'In mountainous areas, heavy precipitation is possible where upslope flow is maximized within windward sides of the terrain at elevation which forces moist air to condense and fall out as rainfall along the sides of mountains. On the leeward side of mountains, desert climates can exist due to the dry air caused by downslope flow which causes heating and drying of the air mass.',
		'The movement of the monsoon trough, or intertropical convergence zone, brings rainy seasons to savannah climes.',
	].join('\n'),
}
