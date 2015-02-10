var $window = $(window);
var documentHeight;
var windowHeight;

function resizeComponents() {
    documentHeight = $(document).height();
    windowHeight = $window.height();

    var pageHeightPercentage = 1;
    var textDistanceFromTop = 0.45;

    var pageHeight =  pageHeightPercentage * windowHeight;
    var textMarginTop = textDistanceFromTop * pageHeight;

    $('.page').height(pageHeight);
    $('.page .text').css( "margin-top", textMarginTop );

    documentHeight = $(document).height();
    windowHeight = $window.height();
}

function resizeElement(ele, size) {
    documentHeight = $(document).height();
    windowHeight = $window.height();

    var pageHeight =  size * windowHeight;

    ele.height(pageHeight);

    documentHeight = $(document).height();
    windowHeight = $window.height();
}

function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

function initializeSprites() {
    var timeline = new TimelineMax({ paused: true });
    timeline.add("start", 0);
    timeline.add("bird-start", 0);
    timeline.add("sun-start", 40);

    timeline.to("#bird", 100, { top: "-31px" }, 'bird-start');
    timeline.to("#sun", 30, { top: "-150px" }, "sun-start");

    $window.on("scroll", function() {
	var scrollTop = $window.scrollTop();
	var scrollPercent = 1.0 - (scrollTop / (documentHeight - windowHeight));
	scrollPercent = Math.max(0, scrollPercent);
	scrollPercent = Math.min(1, scrollPercent);

	console.log("------------------------------------");
	console.log("Scroll percent: " + scrollPercent);
	console.log("Document Height: " + documentHeight);
	console.log("Scroll Top: " + scrollTop);
	console.log("Bird position: " + $("#bird").css('top'));

	timeline.progress(scrollPercent).pause();
    });
}

function initializeSprites2() {
    var timeline = new TimelineMax({ paused: true });
    timeline.add("start", 0);

    timeline.add("bg-yellow", 0);
    timeline.add("bg-light-blue", 100);
    timeline.add("bg-blue", 400);
    timeline.add("bg-dark-blue", 600);
    timeline.add("bg-black", 700);

    timeline.add("foreground-out", 700);

    timeline.add("sun-in", 0);
    timeline.add("sun-out", 300);

    timeline.add("moon-in", 400);
    timeline.add("moon-up", 700);

    // Tweens
    timeline.to("#animation-percent", 1000, { bottom: '100%', ease: Linear.easeNone }, 'start');

    timeline.to("#background", 100, { backgroundColor: 'rgb(219,207,32)', ease: Linear.easeNone }, 'bg-yellow');
    timeline.to("#background", 100, { backgroundColor: 'rgb(0,215,255)', ease: Linear.easeNone }, 'bg-light-blue');
    timeline.to("#background", 100, { backgroundColor: 'rgb(2,50,221)', ease: Linear.easeNone }, 'bg-blue');
    timeline.to("#background", 100, { backgroundColor: 'rgb(49,47,102)', ease: Linear.easeNone }, 'bg-dark-blue');
    timeline.to("#background", 300, { backgroundColor: 'rgb(0,0,0)', ease: Linear.easeNone }, 'bg-black');

    timeline.to("#foreground", 200, { bottom: -400, ease: Linear.easeNone }, 'foreground-out');

    timeline.to("#sun", 300, { top: "30%", ease: Power3.easeNone }, 'sun-in');
    timeline.to("#sun", 300, { top: "120%", ease: Power3.easeIn }, 'sun-out');

    timeline.to("#moon", 300, { top: "40%", ease: Power3.easeNone }, 'moon-in');
    timeline.to("#moon", 300, { top: "10%", ease: Power3.easeNone }, 'moon-up');


    $window.on("scroll", function() {
	var scrollTop = $window.scrollTop();
	var scrollPercent = 1.0 - (scrollTop / (documentHeight - windowHeight));
	scrollPercent = Math.max(0, scrollPercent);
	scrollPercent = Math.min(1, scrollPercent);

	// console.log("------------------------------------");
	// console.log("Scroll percent: " + scrollPercent);
	// console.log("Document Height: " + documentHeight);
	// console.log("Scroll Top: " + scrollTop);
	// console.log("Bird position: " + $("#bird").css('top'));

	$('#scroll-percent').text(scrollPercent * 1000);
	timeline.progress(scrollPercent).pause();
    });
}

function at(height, inCallback) {
    $window.on("scroll", function() {
	var scrollTop = $window.scrollTop();
	console.log("scrolling: " + scrollTop + " - " + height);

	if(scrollTop <= height) {
	    inCallback();
	}
    });
}


$(document).ready(function() {
    // resizeComponents();
    // initializeSprites();
    // scrollToBottom();

    // $( window ).resize(function() {
    // resizeComponents();
    // });


    // CONCEPT 2
    // resizeElement($('#scene-1'), 5);

    // switchHeight = $('#scene-1').height() - $window.height();

    // at(5000, function() {
    // 	if($('#pinned').css('position') != 'absolute') {
    // 		currentHeight = $window.scrollTop();
    // 		pinnedHeight = $('#pinned').height();
    // 		windowHeight = $(window).height();

    // 		$('#pinned').css('position', 'absolute').css('top', currentHeight + windowHeight - pinnedHeight);
    // 	}

    // });

    $('.page').each(function(){
	resizeElement($(this), 1);
    });

    initializeSprites2();
    scrollToBottom();


});
