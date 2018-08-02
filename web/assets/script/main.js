
$(function () {
	var library = {}, dict;

	$('button[name=language]').click(function () {
		init($(this).val());
	})
	$('#input').on('change blur keyup', analyse);
	$('window').on('resize', resize);

	switch ((navigator.language || 'en').toLowerCase().slice(0,2)) {
		case 'de': init('german'); break;
		default: init('english');
	}

	function init(lang) {
		$('#menu button').each(function (index, button) {
			button = $(button);
			button.toggleClass('active', button.val() === lang)
		})
		$('#lead').text(lead[lang]);

		if (!library[lang]) {
			dict = (library[lang] = {});

			dict.stemmer = stemmer[lang];
			dict.demotext = demotext[lang];

			$.get('assets/data/'+lang+'.txt', function (data) {
				var lookup = {};
				data = data.split(',');
				data.forEach(function (word, index) {
					lookup[word] = index+1;
				});
				dict.lookup = lookup;
				dict.wordCount = data.length;
				dict.maxValue = Math.log(dict.wordCount);

				switch (lang) {
					case 'english': dict.optValue = Math.log(1e3); break;
					case 'german':  dict.optValue = Math.log(3e3); break;
				}
				finish();
			})
		} else {
			dict = library[lang];
			finish();
		}

		function finish() {
			$('#input').text(dict.demotext);
			analyse();
		}
	}

	function analyse() {
		if (!dict) return;
		
		text = $('#input').val();

		var html = text.replace(/[a-zäöüß]+/gi, function (chunk) {
			
			if (chunk.length <= 1) return chunk;

			var word = chunk.toLowerCase();
			word = dict.stemmer(word);

			var value = dict.lookup[word] || 1e10;
			value = Math.log(value);
			value = 1-(value-dict.maxValue)/(dict.optValue-dict.maxValue);

			if (value <= 0) return chunk;

			color = getColor(value);

			return '<span style="background:#'+color+'">'+chunk+'</span>';

		});
		$('#output').html(html);
		resize();
	}

	function resize () {
		$('#input').css('height', $('#output').outerHeight());
	}
})

var gradient = 'ffffff,f4fafe,ebf4fd,e3effa,dde9f7,d6e3f3,d3ddee,d0d6e8,d0cee0,d0c7d8,d3bfce,d7b7c3,dcafb6,e2a5a8,e99a98,f18e86,fa8072'.split(',').map(function (hex) {
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

var demotext = {
	german:'Vegetative Merkmale\nDie Tomatenpflanze ist eine krautige, einjährige, zweijährige oder gelegentlich auch ausdauernde Pflanze, die zunächst aufrecht, später aber niederliegend und kriechend wächst. Die einzelnen Äste können dabei bis zu 4 m lang werden. Die Stängel haben an der Basis einen Durchmesser von 10 bis 14 mm, sie sind grün, fein behaart und zur Spitze hin meist filzig behaart. Die Behaarung besteht aus einfachen, einzelligen Trichomen, die bis zu 0,5 mm lang werden, sowie spärlich verteilten meist aus bis zu zehn Zellen bestehenden, mehrzelligen Trichomen mit bis zu 3 mm Länge. Vor allem die längeren Trichome besitzen oft drüsige Spitzen, die der Pflanze einen starken Geruch verleihen.\nDie sympodialen Einheiten besitzen meist drei Laubblätter, die Internodien sind 1 bis 6 cm lang, gelegentlich auch länger. Die Laubblätter sind unterbrochen unpaarig gefiedert, 20 bis 35 cm (selten nur 10 cm oder mehr als 35 cm) lang und 7 bis 10 cm (selten nur 3 cm oder mehr als 10 cm) breit. Sie sind beidseitig spärlich behaart, die Trichome gleichen denen der Stängel. Der Blattstiel ist 1,2 bis 6 cm lang oder gelegentlich auch länger.\nDie Hauptteilblätter stehen in drei oder vier (selten auch fünf) Paaren. Sie sind eiförmig oder elliptisch geformt, die Basis ist schräg und zur Basis des Gesamtblattes hin herablaufend, abgeschnitten oder herzförmig. Die Ränder sind vor allem nahe der Basis gezahnt oder gekerbt, selten sind sie ganzrandig oder tiefgezähnt oder -gelappt. Die Spitze der Teilblätter ist spitz oder zugespitzt. Das oberste Teilblatt ist meist größer als die seitlichen Teilblätter, 3 bis 5 cm lang und 1,5 bis 3 cm breit. Das Stielchen ist 0,5 bis 1,5 cm lang. Die Spitze ist meist spitz zulaufend. Die seitlichen Teilblätter sind 2 bis 4,5 cm lang und 0,8 bis 2,5 cm breit, sie stehen an 0,3 bis 2 cm langen Stielchen.',
	english:'Fruit versus vegetable\nBotanically, a tomato is a fruit, a berry, consisting of the ovary, together with its seeds, of a flowering plant. However, the tomato is considered a "culinary vegetable" because it has a much lower sugar content than culinary fruits; it is typically served as part of a salad or main course of a meal, rather than as a dessert. Tomatoes are not the only food source with this ambiguity; bell peppers, cucumbers, green beans, eggplants, avocados, and squashes of all kinds (such as zucchini and pumpkins) are all botanically fruits, yet cooked as vegetables. This has led to legal dispute in the United States. In 1887, U.S. tariff laws that imposed a duty on vegetables, but not on fruits, caused the tomato\'s status to become a matter of legal importance. The U.S. Supreme Court settled this controversy on May 10, 1893, by declaring that the tomato is a vegetable, based on the popular definition that classifies vegetables by use—they are generally served with dinner and not dessert (Nix v. Hedden (149 U.S. 304)). The holding of this case applies only to the interpretation of the Tariff of 1883, and the court did not purport to reclassify the tomato for botanical or other purposes.',
}

var lead = {
	german:'Füge einen beliebigen Text ein. Komplizierte Wörter werden dann hervorgehoben.',
	english:'Enter or paste any text. Uncommon words will be highlighted.',
}
