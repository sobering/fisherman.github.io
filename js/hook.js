$(document).ready(function(){
    //Check to see if the window is top if not then display button

    $(window).scroll(function(){
        if ($(this).scrollTop() > 1800) {
            $('.scrollToTop').fadeIn().show()
        } else {
            $('.scrollToTop').fadeOut()
        }
    })

    //Click event to scroll to top

    $('.scrollToTop').click(function(){
        $('html, body').animate({
            scrollTop : $("#search").offset().top - 10
        }, 800)

        return false
    })
})
