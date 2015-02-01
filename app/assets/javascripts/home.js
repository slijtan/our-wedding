$(document).ready(function() {
    resize_components();
    window.scrollTo(0,document.body.scrollHeight); // scroll to bottom
});

function resize_components() {
    var pageHeightPercentage = 1.5;
    var textDistanceFromTop = 0.45;

    var windowHeight = $( window ).height();
    var pageHeight =  pageHeightPercentage * windowHeight;
    var textMarginTop = textDistanceFromTop * pageHeight;

    $('.page').height(pageHeight);
    console.log(textMarginTop);
    $('.page .text').css( "margin-top", textMarginTop );
}


$( window ).resize(function() {
    resize_components();
});
