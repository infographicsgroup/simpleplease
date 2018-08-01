  
function stemmer_de(word) {
	word = word.replace(/([aeiouyäöü])u([aeiouyäöü])/g, '$1U$2');
	word = word.replace(/([aeiouyäöü])y([aeiouyäöü])/g, '$1Y$2');
	word = word.replace(/ß/g, 'ss');
	var r1Index = word.search(/[aeiouyäöü][^aeiouyäöü]/);
	var r1 = '';
	if (r1Index != -1) {
		r1Index += 2;
		r1 = word.substring(r1Index);
	}
	
	var r2Index = -1;
	var r2 = '';
	
	if (r1Index != -1) {
		r2Index = r1.search(/[aeiouyäöü][^aeiouyäöü]/);
		if (r2Index != -1) {
			r2Index += 2;
			r2 = r1.substring(r2Index);
			r2Index += r1Index;
		} else {
			r2 = '';
		}
	}
	
	if (r1Index != -1 && r1Index < 3) {
		r1Index = 3;
		r1 = word.substring(r1Index);
	}

	var a1Index = word.search(/(em|ern|er)$/g);
	var b1Index = word.search(/(e|en|es)$/g);
	var c1Index = word.search(/([bdfghklmnrt]s)$/g);
	if (c1Index != -1) {
		c1Index++;
	}
	var index1 = 10000;
	var optionUsed1 = '';
	if (a1Index != -1 && a1Index < index1) {
		optionUsed1 = 'a';
		index1 = a1Index;
	}
	if (b1Index != -1 && b1Index < index1) {
		optionUsed1 = 'b';
		index1 = b1Index;
	}
	if (c1Index != -1 && c1Index < index1) {
		optionUsed1 = 'c';
		index1 = c1Index;
	}
	
	if (index1 != 10000 && r1Index != -1) {
		if (index1 >= r1Index) {
			word = word.substring(0, index1);
			if (optionUsed1 == 'b') {
				if (word.search(/niss$/) != -1) {
					word = word.substring(0, word.length -1);
				}
			}
		}
	}
	
	var a2Index = word.search(/(en|er|est)$/g);
	var b2Index = word.search(/(.{3}[bdfghklmnt]st)$/g);
	if (b2Index != -1) {
		b2Index += 4;
	}
	
	var index2 = 10000;
	var optionUsed2 = '';
	if (a2Index != -1 && a2Index < index2) {
		optionUsed2 = 'a';
		index2 = a2Index;
	}
	if (b2Index != -1 && b2Index < index2) {
		optionUsed2 = 'b';
		index2 = b2Index;
	}
	
	if (index2 != 10000 && r1Index != -1) {
		if (index2 >= r1Index) {
			word = word.substring(0, index2);
		}
	}
	
	var a3Index = word.search(/(end|ung)$/g);
	var b3Index = word.search(/[^e](ig|ik|isch)$/g);
	var c3Index = word.search(/(lich|heit)$/g);
	var d3Index = word.search(/(keit)$/g);
	if (b3Index != -1) {
		b3Index ++;
	}
	
	var index3 = 10000;
	var optionUsed3 = '';
	if (a3Index != -1 && a3Index < index3) {
		optionUsed3 = 'a';
		index3 = a3Index;
	}
	if (b3Index != -1 && b3Index < index3) {
		optionUsed3 = 'b';
		index3 = b3Index;
	}
	if (c3Index != -1 && c3Index < index3) {
		optionUsed3 = 'c';
		index3 = c3Index;
	}
	if (d3Index != -1 && d3Index < index3) {
		optionUsed3 = 'd';
		index3 = d3Index;
	}
	
	if (index3 != 10000 && r2Index != -1) {
		if (index3 >= r2Index) {
			word = word.substring(0, index3);
			var optionIndex = -1;
			// var optionSubsrt = '';
			if (optionUsed3 == 'a') {
				optionIndex = word.search(/[^e](ig)$/);
				if (optionIndex != -1) {
					optionIndex++;
					if (optionIndex >= r2Index) {
						word = word.substring(0, optionIndex);
					}
				}
			} else if (optionUsed3 == 'c') {
				optionIndex = word.search(/(er|en)$/);
				if (optionIndex != -1) {
					if (optionIndex >= r1Index) {
						word = word.substring(0, optionIndex);
					}
				}
			} else if (optionUsed3 == 'd') {
				optionIndex = word.search(/(lich|ig)$/);
				if (optionIndex != -1) {
					if (optionIndex >= r2Index) {
						word = word.substring(0, optionIndex);
					}
				}
			}
		}
	}

	word = word.replace(/U/g, 'u');
	word = word.replace(/Y/g, 'y');
	word = word.replace(/ä/g, 'a');
	word = word.replace(/ö/g, 'o');
	word = word.replace(/ü/g, 'u');
	
	return word;
}

var stemmer_en = (function () {
	"use strict";

	const regExps = {}
	regExps.c = '[^aeiou]';
	regExps.v = '[aeiouy]';
	regExps.C = regExps.c + '[^aeiouy]*';
	regExps.V = regExps.v + '[aeiou]*';
	regExps.M_gr_0 = new RegExp('^(' + regExps.C + ')?' + regExps.V + regExps.C);
	regExps.M_eq_1 = new RegExp('^(' + regExps.C + ')?' + regExps.V + regExps.C + '(' + regExps.V + ')?$');
	regExps.M_gr_1 = new RegExp('^(' + regExps.C + ')?' + regExps.V + regExps.C + regExps.V + regExps.C);
	regExps.v_in_stem = new RegExp('^(' + regExps.C + ')?' + regExps.v);
	regExps.nonstd_S = /^(.+?)(ss|i)es$/;
	regExps.std_S = /^(.+?)([^s])s$/;
	regExps.E = /^(.+?)e$/;
	regExps.LL = /ll$/;
	regExps.EED = /^(.+?)eed$/;
	regExps.ED_or_ING = /^(.+?)(ed|ing)$/;
	regExps.Y = /^(.+?)y$/;
	regExps.nonstd_gp1 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;
	regExps.nonstd_gp2 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;
	regExps.nonstd_gp3 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
	regExps.S_or_T_with_ION = /^(.+?)(s|t)(ion)$/;
	regExps.has_C_and_v_but_doesnt_end_with_AEIOUWXY = new RegExp('^' + regExps.C + regExps.v + '[^aeiouwxy]$');

	const suffixList = {
		group1: {
			'ational': 'ate',
			'tional': 'tion',
			'enci': 'ence',
			'anci': 'ance',
			'izer': 'ize',
			'bli': 'ble',
			'alli': 'al',
			'entli': 'ent',
			'eli': 'e',
			'ousli': 'ous',
			'ization': 'ize',
			'ation': 'ate',
			'ator': 'ate',
			'alism': 'al',
			'iveness': 'ive',
			'fulness': 'ful',
			'ousness': 'ous',
			'aliti': 'al',
			'iviti': 'ive',
			'biliti': 'ble',
			'logi': 'log'
		},
		group2: {
			'icate': 'ic',
			'ative': '',
			'alize': 'al',
			'iciti': 'ic',
			'ical': 'ic',
			'ful': '',
			'ness': ''
		}
	};

	return function (w) {
		if (w.length < 3)
			return w;
		if (w.charAt(0) === "y")
			w = w.charAt(0).toUpperCase() + w.substr(1);
		if (regExps.nonstd_S.test(w))
			w = w.replace(regExps.nonstd_S, '$1$2');
		else if (regExps.std_S.test(w))
			w = w.replace(regExps.std_S, '$1$2');
		if (regExps.EED.test(w)) {
			var stem = (regExps.EED.exec(w) || [])[1];
			if (regExps.M_gr_0.test(w))
				w = w.substr(0, w.length - 1);
		}
		else if (regExps.ED_or_ING.test(w)) {
			var stem = (regExps.ED_or_ING.exec(w) || [])[1];
			if (regExps.v_in_stem.test(stem)) {
				w = stem;
				if (/(at|bl|iz)$/.test(w))
					w = w + 'e';
				else if (new RegExp('([^aeiouylsz])\\1$').test(w))
					w = w.substr(0, w.length - 1);
				else if (new RegExp('^' + regExps.C + regExps.v + '[^aeiouwxy]$').test(w))
					w = w + 'e';
			}
		}
		if (regExps.Y.test(w)) {
			var stem = (regExps.Y.exec(w) || [])[1];
			if (regExps.v_in_stem.test(stem))
				w = stem + 'i';
		}
		if (regExps.nonstd_gp1.test(w)) {
			var result = regExps.nonstd_gp1.exec(w) || [];
			var stem = result[1];
			var suffix = result[2];
			if (regExps.M_gr_0.test(stem))
				w = stem + suffixList.group1[suffix];
		}
		if (regExps.nonstd_gp2.test(w)) {
			var result = regExps.nonstd_gp2.exec(w) || [];
			var stem = result[1];
			var suffix = result[2];
			if (regExps.M_gr_0.test(stem))
				w = stem + suffixList.group2[suffix];
		}
		if (regExps.nonstd_gp3.test(w)) {
			var result = regExps.nonstd_gp3.exec(w) || [];
			var stem = result[1];
			if (regExps.M_gr_1.test(stem))
				w = stem;
		}
		else if (regExps.S_or_T_with_ION.test(w)) {
			var result = regExps.S_or_T_with_ION.exec(w) || [];
			var stem = result[1] + result[2];
			if (regExps.M_gr_1.test(stem))
				w = stem;
		}
		if (regExps.E.test(w)) {
			var result = regExps.E.exec(w) || [];
			var stem = result[1];
			if (regExps.M_gr_1.test(stem) || (regExps.M_eq_1.test(stem) && !(regExps.has_C_and_v_but_doesnt_end_with_AEIOUWXY.test(stem))))
				w = stem;
		}
		if (regExps.LL.test(w) && regExps.M_gr_1.test(w))
			w = w.substr(0, w.length - 1);
		if (w.charAt(0) === "Y")
			w = w.charAt(0).toLowerCase() + w.substr(1);
		return w;
	};
})()

var stemmer = {
	english: stemmer_en,
	german: stemmer_de,
}

if (module && module.exports) module.exports = stemmer;