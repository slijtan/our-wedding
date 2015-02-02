var $window = $(window);
var documentHeight;
var windowHeight;

function resizeComponents() {
    documentHeight = $(document).height();
    windowHeight = $window.height();

    var pageHeightPercentage = 1.7;
    var textDistanceFromTop = 0.45;

    var pageHeight =  pageHeightPercentage * windowHeight;
    var textMarginTop = textDistanceFromTop * pageHeight;

    $('.page').height(pageHeight);
    $('.page .text').css( "margin-top", textMarginTop );

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

$(document).ready(function() {
    resizeComponents();
    initializeSprites();
    scrollToBottom();

    $( window ).resize(function() {
	resizeComponents();
    });
});
