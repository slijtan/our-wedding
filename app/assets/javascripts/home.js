var $window = $(window);
var documentHeight;
var windowHeight;
var debugOutput;

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

function resizePage(ele, size) {
    documentHeight = $(document).height();
    windowHeight = $window.height();

    var newHeight = size * windowHeight;

    // $('.page').each(function() {
    // 	var pageHeight = $(this).height();
    // 	newHeight = Math.max(newHeight, pageHeight);
    // });

    if ( ele.height() < newHeight ) {
	ele.height(newHeight);
    }

    documentHeight = $(document).height();
    windowHeight = $window.height();
}

function resizeImage(ele, size) {

    documentHeight = $(document).height();
    windowHeight = $window.height();

    var newHeight =  size * windowHeight;
    var elementHeight =  ele.outerHeight();

    if (elementHeight > newHeight) {
	ele.height(newHeight);
    }
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
    timeline.add("bg-dark-blue", 450);
    timeline.add("bg-black", 650);

    timeline.add("foreground-out", 800);

    timeline.add("sun-in", 0);
    timeline.add("sun-out", 300);

    timeline.add("moon-in", 400);
    timeline.add("moon-up", 800);

    timeline.add("night-sky-in", 600);
    timeline.add("day-sky-out", 675);

    timeline.add("night-sky-out", 800);

    timeline.add("stars-in", 750);

    timeline.add("shadow-night", 400);

    timeline.add("transportation-in", 100);
    timeline.add("babys-in", 700);

    // Tweens
    timeline.to("#animation-percent", 1000, { bottom: '100%', ease: Linear.easeNone }, 'start');

    // timeline.to("#sky", 100, { backgroundColor: 'rgb(219,207,32)', ease: Linear.easeNone }, 'bg-yellow');
    // timeline.to("#sky", 100, { backgroundColor: 'rgb(0,215,255)', ease: Linear.easeNone }, 'bg-light-blue');

    timeline.to("#sky", 100, { backgroundColor: 'rgb(77,227,255)', ease: Linear.easeNone }, 'bg-light-blue');

    timeline.to("#sky", 100, { backgroundColor: 'rgb(2,50,221)', ease: Linear.easeNone }, 'bg-blue');
    // timeline.to("#sky", 100, { backgroundColor: 'rgb(49,47,102)', ease: Linear.easeNone }, 'bg-dark-blue');

    timeline.to("#sky", 300, { backgroundColor: 'rgb(0,0,0)', ease: Linear.easeNone }, 'bg-black');

    timeline.to("#landscape", 200, { bottom: -400, ease: Linear.easeNone }, 'foreground-out');
    timeline.to("#cityscape", 200, { bottom: -400, ease: Linear.easeNone }, 'foreground-out');

    timeline.to("#sun", 300, { top: "15%", ease: Power3.easeNone }, 'sun-in');
    timeline.to("#sun", 300, { top: "120%", ease: Power3.easeIn }, 'sun-out');

    timeline.to("#moon", 300, { top: "25%", ease: Power3.easeNone }, 'moon-in');
    timeline.to("#moon", 300, { top: "10%", ease: Power3.easeNone }, 'moon-up');

    timeline.to("#night-sky", 200, { css: { autoAlpha: 0.7 }, ease: Power3.easeNone }, 'night-sky-in');
    timeline.to("#day-sky", 100, { css: { autoAlpha: 0 }, ease: Power3.easeNone }, 'day-sky-out');
    timeline.to("#stars", 300, { css: { autoAlpha: 1 } }, 'stars-in');

    timeline.to("#night-sky", 200, { css: { autoAlpha: 0 }, ease: Power3.easeNone }, 'night-sky-out');
    timeline.to("#stars", 200, { css: { 'background-position': "50px 200px" } }, 'night-sky-out');

    timeline.to("#shadow", 0, { css: { className: '+=night' } }, 'shadow-night');

    timeline.to("#transportation", 400, { left: "100%", top: "17%", ease: Linear.easeNone }, 'transportation-in');
    timeline.to("#babys", 400, { top: "-20%", ease: Linear.easeNone }, 'babys-in');



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

	if (debugOutput) {
	    $('#scroll-percent').text(scrollPercent * 1000);
	}

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

function alignElement($ele, percentAlign) {
    var alignment = $ele.hasClass('right') ? 'right' : 'left';
    var elementWidth = $ele.outerWidth();
    var windowWidth = $window.width();
    var margin = windowWidth * percentAlign / 100;
    var maxWidth = 1200;

    if (windowWidth > maxWidth) {
	if (alignment === 'left') {
	    margin = (windowWidth - maxWidth) / 2;
	} else {
	    margin = windowWidth - ( (windowWidth - maxWidth) / 2) - elementWidth;
	}

    } else if ((windowWidth - elementWidth) / 2 < margin) {
	margin = (windowWidth - elementWidth) / 2;

    } else if (alignment == 'right') {
	margin = windowWidth - elementWidth - margin;
    }

    $ele.css('margin-left', margin);
}


$(document).ready(function() {

    $('.page').each(function(){
	resizePage($(this), 1.1);
    });

    $('.hotel-expand').on('click', function(event) {
	event.preventDefault();

	var id = $(this).attr('id');
	$('.hotel').slideUp();
	$('#' + id + '-content').slideDown();
    });

    $('.lead').on('click', function(event) {
	event.preventDefault();

	$(this).toggleClass('full');
	$(this).parent().find('.details').fadeToggle();
    });

    $( window ).resize(function() {
	$('.page').each(function(){
	    resizePage($(this), 1.1);
	});
    });


    initializeSprites2();
    scrollToBottom();

    debugOutput = $('body').data('debug');

    if (debugOutput) {
	$('.debug-output').show();
    }

});
