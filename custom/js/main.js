// Вызов модального окна
$('.button-open-pp').click( function() {
    $('.overlay').fadeIn();
});

// Закрытие окна на крестик
$('.close-popup').click( function() {
    $('.overlay').fadeOut();
});
$( ".open-close-btn" ).on('click touchstart', function(e) {
    // prevent default anchor click
    e.preventDefault();
    $(".header-right").toggleClass("header-right-open");
    $("#hamburger-icon").toggleClass("hamburger-open");
});

$(window).scroll(function(){
    if ($(this).scrollTop() > 50) {
        $('.header').addClass('scroll');
    } else {
        $('.header').removeClass('scroll');
    }
});
