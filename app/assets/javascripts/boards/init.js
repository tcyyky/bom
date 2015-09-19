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

$("#good-button").click(function() {
  $.get("/boards/sendFeedback/"+this.id+"/0/0", null, null);
  var good = $("#good-count").text();
  $("#good-count").text(Number(good)+1);
  $("#good-button").off();
});

$("#bad-button").click(function() {
  $.get("/boards/sendFeedback/"+this.id+"/1/0", null, null);
  var bad = $("#bad-count").text();
  $("#bad-count").text(Number(bad)+1);
  $("#bad-button").off();
});

})