$(function(){

$(document).ready(function() {
  $('#fullpage').fullpage({
    anchors: ['m', 'd'],
    scrollingSpeed: 300,
    sectionsColor : ['#f2f2f2', '#4BBFC3'],
    verticalCentered: false,
  });

});

$(".flipper").flip({
  axis: 'y',
  trigger: 'manual'
});

$("#hyoushiki-img").click(function() {
	$(".flipper").flip('toggle');
})
$("#ura-hyoushiki-img").click(function() {
	$(".flipper").flip('toggle');
})
})