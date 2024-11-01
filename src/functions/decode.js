/**
 * Vanilla JS version of decode HE:
 * https://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it#answer-7394787
 * 
 * @param {string} str
 * @returns string
 */
export default function decode(str) {
	var txt = document.createElement("textarea");
	txt.innerHTML = str;
	return txt.value;
}
