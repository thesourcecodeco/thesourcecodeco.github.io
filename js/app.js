$(document).foundation();
$(document).ready(function () {
  $(function () {

    $('#sb-container').swatchbook({
      // number of degrees that is between each item
      angleInc: -10,
      // amount in degrees for the opened item's next sibling
      proximity: -45,
      initclosed: true,
      neighbor: -4,
      // index of the element that when clicked, triggers the open/close function
      // by default there is no such element
      closeIdx: 11
    });

  });
});

$(window).scroll(function () {
  if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
    $('#return-to-top').fadeIn(200);    // Fade in the arrow
  } else {
    $('#return-to-top').fadeOut(200);   // Else fade out the arrow
  }
});
$('#return-to-top').click(function () {      // When arrow is clicked
  $('body,html').animate({
    scrollTop: 0                       // Scroll to top of body
  }, 1000);
});

$('#contact-us').on('submit', function (e) {
  e.preventDefault();

  disableSubmit();
  var contactName = $("#contactName").val().trim();
  var contactComments = $("#contactComments").val().trim();
  var contactEmail = $("#contactEmail").val().trim().toLocaleLowerCase();

  $.ajax({
    url: "/sendMail",
    dataType: "json",
    method: "POST",
    data: {
      email: contactEmail,
      name: contactName,
      comments: contactComments
    }
  }).done(function (data) {
    setTimeout(function () {
      notif({
        msg: "Su mensaje fue enviado!",
        type: "success",
        timeout: 3000
      });
      enableSubmit();
    }, 2000);
  }).fail(function (error) {
    notif({
      msg: "Error! escribenos a: <b>admin@thesourcecode.co</b>",
      type: "error",
      position: "center",
      timeout: 20000
    });

    enableSubmit();
  });
});

function disableSubmit() {
  $("#contact-us button[type=submit]").attr("disabled", "disabled");
}

function enableSubmit() {
  $("#contact-us button[type=submit]").removeAttr("disabled");
}

function goContactUs() {
  var top = $("#contact-us").offset().top;
  $("html, body").animate({ scrollTop: top }, 700);
}

