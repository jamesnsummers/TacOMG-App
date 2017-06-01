$(document).ready(function() {
  $('.dropdown-toggle').dropdown()
});

var counter = 0;
console.log("I am listening");
$(".card").one('click', '.buttonPlus', function(e){
  var tacoId = $(this).data('taco_id');
  var count = $(this).prev().text();
  $(this).prev().text(++count);
    $.ajax({
      method: "POST",
      url: '/votes',
      data: {tacoId: tacoId},
      success: function(json){
        console.log(json);
      },
      error: function(error, code, balloons){
        console.log(error);
        console.log(code);
        console.log(balloons);
      }
    });
 });
