$(function () {
    var toolTop = $(".recom").offset().top;
    $(window).scroll(function () {
        if ($(document).scrollTop() >= toolTop) {
            $(".fixedtool").fadeIn();
        } else {
            $(".fixedtool").fadeOut();
        }
    })
})