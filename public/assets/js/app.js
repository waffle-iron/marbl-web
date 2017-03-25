/* ==========================================================================
// Helper Functions
========================================================================== */

/**
 * Generate RFC-compliant uuid
 * @return {string}
 */
function uuid() {
  var d;
  d = Date.now();
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
    .replace(/[xy]/g, function(c) {
      var r;
      r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === "x" ? r : r & 0x7 | 0x8).toString(16);
    });
};

/**
 * checks if a string is a valid email
 * @param input {String} string to check
 * @returns {Boolean} whether or not the email is valid
 */
function isValidEmail(input) {
  return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/.test(input);
};

/**
 * checks how far the page is scrolled down, used to show & hide nav
 */
function checkScroll(){
    var startY = $('.navbar').height() * 2; //The point where the navbar changes in px

    if ($(window).scrollTop() > startY) {
        $('.main_h').addClass("scrolled");
    } else {
        $('.main_h').removeClass("scrolled");
    }
}

/* ==========================================================================
// Config functions
========================================================================== */

$(window).load( function(){
  $('.navbar').addClass('sticky');
});

$(window).scroll(function() {
    if ($(window).scrollTop() > 0) {
        $('.navbar').removeClass('sticky');
    } else {
        $('.navbar').addClass('sticky');
    }
});

if($('.navbar').length > 0){
  $(window).on("scroll load resize", function(){
    checkScroll();
  });
}

$('.btn-join').click(function(e) {
  document.getElementById('about').scrollIntoView();
});

// intercept signups
$('#form').submit(function(e) {
  console.log('e', e);
  e.preventDefault();
  e.stopPropagation();

  var
    name = $.trim($('#name').val()),
    email = $.trim($('#email').val()),
    instagram = $.trim($('#instagram').val()),
    $button = $('#submit'),
    browser = Cookies.get('_b_');

  if (!name) {
    alert('You must enter your name.');
    return;
  } else if (!isValidEmail(email)) {
    alert('You must enter a valid email.');
    return;
  } else if (!instagram) {
    alert('You must enter your Instagram.');
    return;
  }

  if (!browser) {
    browser = uuid();
    Cookies.set('_b_', browser);
  }

  $button.attr('disabled', true);
  $button.attr('value', 'APPLYING ...');

  var data = {
    browser: browser,
    name: name,
    email: email,
    instagram: instagram,
  };

  function handleError(err) {
    $button.attr('disabled', false);
    $button.attr('value', 'APPLY');

    var message = 'Uh-oh. We were unable to process your application. Please try again.';

    try {
      message = JSON.parse(err).message;
    } catch (e) {
      console.log(e);
    }

    alert(message);
  }

  var request = window.superagent;
  request.post('https://marbl-api.herokuapp.com/v1/invites')
    .send(data)
    .end(function(err, response) {
      if (err) {
        return handleError(err);
      } else if (!response || !response.body) {
        return handleError();
      }

      var
        code = response.body.code,
        place = response.body.placeInQueue,
        path = '/welcome?code=' + code + '&place=' + place;

      window.location = path;
    });

  console.log('we did it', name, email, instagram);
});
