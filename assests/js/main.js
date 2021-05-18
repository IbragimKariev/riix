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
var dropdowns = $(".dropdown");

// Onclick on a dropdown, toggle visibility
dropdowns.find("dt").click(function(){
    dropdowns.find("dd ul").hide();
    $(this).next().children().toggle();
});

// Clic handler for dropdown
dropdowns.find("dd ul li a").click(function(){
    var leSpan = $(this).parents(".dropdown").find("dt a span");

    // Remove selected class
    $(this).parents(".dropdown").find('dd a').each(function(){
        $(this).removeClass('selected');
    });

    // Update selected value
    leSpan.html($(this).html());

    // If back to default, remove selected class else addclass on right element
    if($(this).hasClass('default')){
        leSpan.removeClass('selected')
    }
    else{
        leSpan.addClass('selected');
        $(this).addClass('selected');
    }

    // Close dropdown
    $(this).parents("ul").hide();
});

// Close all dropdown onclick on another element
$(document).bind('click', function(e){
    if (! $(e.target).parents().hasClass("dropdown")) $(".dropdown dd ul").hide();
});

$('.accordion h4').click(function(event) {
    $('.accordion > ul > li > ul:visible').not($(this).nextAll('ul')).stop().hide(200).parent().removeClass('open'); //
    $(this).nextAll('ul').slideToggle(200, function() {
        $(this).parent('.pagenav').toggleClass('open');
    });
});
// Вызов модального окна
$('.checked-item').click( function() {
    $('.bg-gray-d').fadeIn();
    $('.accordion').fadeIn();
});

// Закрытие окна на крестик
$('.close-lb').click( function() {
    $('.bg-gray-d').fadeOut();
    $('.accordion').fadeOut();
});


$(function () {


    /*
     * International Telephone Input v16.0.0
     * https://github.com/jackocnr/intl-tel-input.git
     * Licensed under the MIT license
    */
    var input = document.querySelectorAll("input[name=leyka_donor_phone]");
    var iti_el = $('.iti.iti--allow-dropdown.iti--separate-dial-code');
    if(iti_el.length){
        iti.destroy();
    }
    for(var i = 0; i < input.length; i++){
        iti = intlTelInput(input[i], {
            autoHideDialCode: false,
            autoPlaceholder: "aggressive" ,
            initialCountry: "auto",
            separateDialCode: true,
            preferredCountries: ['ru','th'],
            customPlaceholder:function(selectedCountryPlaceholder,selectedCountryData){
                return ''+selectedCountryPlaceholder.replace(/[0-9]/g,'X');
            },
            geoIpLookup: function(callback) {
                $.get('https://ipinfo.io', function() {}, "jsonp").always(function(resp) {
                    var countryCode = (resp && resp.country) ? resp.country : "";
                    callback(countryCode);
                });
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/16.0.0/js/utils.js" // just for
        });


        $('input[name="leyka_donor_phone"]').on("focus click countrychange", function(e, countryData) {

            var pl = $(this).attr('placeholder') + '';
            var res = pl.replace( /X/g ,'9');
            if(res != 'undefined'){
                $(this).inputmask(res, {placeholder: "X", clearMaskOnLostFocus: true});
            }
        });

        $('input[name="leyka_donor_phone"]').on("focusout", function(e, countryData) {
            var intlNumber = iti.getNumber();
            console.log(intlNumber);
        });

    }
})