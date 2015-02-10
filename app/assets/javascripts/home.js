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

    timeline.add("background-yellow", 0);
    timeline.add("background-light-blue", 200);
    timeline.add("background-blue", 350);
    timeline.add("background-dark-blue", 400);
    timeline.add("background-black", 650);

    timeline.add("foreground-out", 600);

    timeline.add("sun-in", 0);
    timeline.add("sun-up", 100);
    timeline.add("sun-out", 300);

    timeline.add("moon-in", 300);
    timeline.add("moon-up", 600);

    // Tweens
    timeline.to("#animation-percent", 1000, { bottom: '100%', ease: Linear.easeNone }, 'start');

    timeline.to("#background", 50, { backgroundColor: 'rgb(219,207,32)' }, 'bg-yellow');
    timeline.to("#background", 50, { backgroundColor: 'rgb(0,215,255)' }, 'bg-light-blue');
    timeline.to("#background", 50, { backgroundColor: 'rgb(2,50,221)' }, 'bg-blue');
    timeline.to("#background", 50, { backgroundColor: 'rgb(49,47,102)' }, 'bg-dark-blue');
    timeline.to("#background", 300, { backgroundColor: 'rgb(0,0,0)' }, 'bg-black');
    // timeline.to("#background", 10, { backgroundColor: 'rgb' }, 'bg-');


    timeline.to("#foreground", 200, { bottom: -400 }, 'foreground-out');

    timeline.to("#sun", 200, { top: "30%" }, 'sun-in');
    timeline.to("#sun", 50, { top: "10%" }, 'sun-up');
    timeline.to("#sun", 200, { top: "120%" }, 'sun-out');

    timeline.to("#moon", 200, { top: "40%" }, 'moon-in');
    timeline.to("#moon", 300, { top: "10%" }, 'moon-up');


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

	$('#scroll-percent').text(scrollPercent * 100);
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
