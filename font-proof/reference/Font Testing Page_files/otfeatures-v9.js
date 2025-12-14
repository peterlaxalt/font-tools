// Pablo Impallari
// Version 8.4 CSS3 Syntax only

function refreshFeatures() {

	// CSS3 Syntax
	var codeCSS3 = "";
	codeCSS3 += !document.getElementById("kern").checked ? '"kern" off, ' : '"kern" on, ';
	codeCSS3 += !document.getElementById("liga").checked ? '"liga" off, ' : '"liga" on, ';
	codeCSS3 += !document.getElementById("calt").checked ? '"calt" off, ' : '"calt" on, ';
	codeCSS3 += !document.getElementById("dlig").checked ? '' : '"dlig", ';
	codeCSS3 += !document.getElementById("hlig").checked ? '' : '"hlig", ';
	codeCSS3 += !document.getElementById("smcp").checked ? '' : '"smcp", ';
	codeCSS3 += !document.getElementById("c2sc").checked ? '' : '"c2sc", ';
	codeCSS3 += !document.getElementById("lnum").checked ? '' : '"lnum", ';
	codeCSS3 += !document.getElementById("onum").checked ? '' : '"onum", ';
	codeCSS3 += !document.getElementById("tnum").checked ? '' : '"tnum", ';
	codeCSS3 += !document.getElementById("pnum").checked ? '' : '"pnum", ';
	codeCSS3 += !document.getElementById("frac").checked ? '' : '"frac", ';
	codeCSS3 += !document.getElementById("zero").checked ? '' : '"zero", ';
	codeCSS3 += !document.getElementById("swsh").checked ? '' : '"swsh", ';
	codeCSS3 += !document.getElementById("salt").checked ? '' : '"salt", ';
	codeCSS3 += !document.getElementById("ss01").checked ? '' : '"ss01", ';
	codeCSS3 += !document.getElementById("ss02").checked ? '' : '"ss02", ';
	codeCSS3 += !document.getElementById("ss03").checked ? '' : '"ss03", ';
	codeCSS3 += !document.getElementById("ss04").checked ? '' : '"ss04", ';
	codeCSS3 += !document.getElementById("ss05").checked ? '' : '"ss05", ';
	codeCSS3 += !document.getElementById("ss06").checked ? '' : '"ss06", ';
	codeCSS3 += !document.getElementById("ss07").checked ? '' : '"ss07", ';
	codeCSS3 += !document.getElementById("ss08").checked ? '' : '"ss08", ';
	codeCSS3 += !document.getElementById("ss09").checked ? '' : '"ss09", ';
	codeCSS3 += !document.getElementById("ss10").checked ? '' : '"ss10", ';
	codeCSS3 += !document.getElementById("ordn").checked ? '' : '"ordn", ';
	codeCSS3 += !document.getElementById("numr").checked ? '' : '"numr", ';
	codeCSS3 += !document.getElementById("dnom").checked ? '' : '"dnom", ';
	codeCSS3 += !document.getElementById("sups").checked ? '' : '"sups", ';
	codeCSS3 += !document.getElementById("sinf").checked ? '' : '"sinf", ';
	// codeCSS3 += !document.getElementById("init").checked ? '' : '"init", ';
	// codeCSS3 += !document.getElementById("fina").checked ? '' : '"fina", ';
	
	codeCSS3 = codeCSS3.substring(0, codeCSS3.length - 2);
	
	// Special Case for Fake Small Caps
	var fakeSC = !document.getElementById("fake-smcp").checked ? 'normal' : 'small-caps';

	// Show Recommended Code
	var recommendedCSS = "";
	if (fakeSC == 'small-caps') recommendedCSS += "font-variant: " + fakeSC + "<br/>";
	recommendedCSS += "font-feature-settings: " + codeCSS3 + "<br/>";
	recommendedCSS += "-moz-font-feature-settings: " + codeCSS3 + "<br/>";
	recommendedCSS += "-webkit-font-feature-settings: " + codeCSS3 + "<br/>";
	recommendedCSS += "-ms-font-feature-settings: " + codeCSS3 + "<br/>";
	recommendedCSS += "-o-font-feature-settings: " + codeCSS3 ;
    $('#csscode').html( recommendedCSS );
	
	// Apply the Code
	$('#custom').css("font-variant", fakeSC );
	$('#custom').css("font-feature-settings", codeCSS3 );
	$('#custom').css("-moz-font-feature-settings", codeCSS3 );
	$('#custom').css("-webkit-font-feature-settings", codeCSS3 );
	$('#custom').css("-ms-font-feature-settings", codeCSS3 );
	$('#custom').css("-o-font-feature-settings", codeCSS3 );
	
};	