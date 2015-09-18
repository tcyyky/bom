$(function(){

$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['m', 'd'],
    scrollingSpeed: 300,
    sectionsColor : ['#f2f2f2', '#62C4E4'],
    verticalCentered: false,
  });

});

$(".flipper").flip({
  axis: 'y',
  trigger: 'manual'
});

$("#hyoushiki-img-1").click(function() {
	$(".flipper").flip('toggle');
})
$("#ura-hyoushiki-img-1").click(function() {
	$(".flipper").flip('toggle');
})
})