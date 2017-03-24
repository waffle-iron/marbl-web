$(window).load( function(){
  $('.main_h').addClass('sticky');
});

$(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
        $('.main_h').removeClass('sticky');
    } else {
        $('.main_h').addClass('sticky');
    }
});

function checkScroll(){
    var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

    if($(window).scrollTop() > startY){
        $('.main_h').addClass("scrolled");
    }else{
        $('.main_h').removeClass("scrolled");
    }
}

if($('.main_h').length > 0){
    $(window).on("scroll load resize", function(){
        checkScroll();
    });
}

$('.btn-join').click(function(e) {
  document.getElementById('about').scrollIntoView();
});

// intercept signups
$('#form').submit(function(e) {
  e.preventDefault();
  e.stopPropagation();

  console.log('we did it');
});
