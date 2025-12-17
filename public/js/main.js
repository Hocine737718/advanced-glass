(function ($) {
    "use strict";

    // Spinner
    // var spinner = function () {
    //     setTimeout(function () {
    //         if ($('#spinner').length > 0) {
    //             $('#spinner').removeClass('show');
    //         }
    //         console.log("Spinner removed");
    //     }, 1);
    // };
    // spinner(0);


    // Initiate the wowjs
    new WOW().init();


    // Header carousel
    $(".header-carousel").owlCarousel({
        animateOut: 'fadeOut',
        items: 1,
        margin: 0,
        stagePadding: 0,
        autoplay: true,
        autoplayTimeout: 20000,
        smartSpeed: 1000,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });


    // Service-carousel
    $(".service-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 2000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 2
            },
            992: {
                items: 2
            },
            1200: {
                items: 2
            }
        }
    });


    // testimonial carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: false,
        dots: true,
        loop: true,
        margin: 25,
        nav: false,
        navText: [
            '<i class="fa fa-angle-right"></i>',
            '<i class="fa fa-angle-left"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1
            },
            576: {
                items: 1
            },
            768: {
                items: 1
            },
            992: {
                items: 1
            },
            1200: {
                items: 2
            }
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // $(".blog-carousel").owlCarousel({
    //     autoplay: true,
    //     autoplayTimeout: 4000,     // ⏱️ 4s delay between slides
    //     autoplayHoverPause: true,  // ⏸️ pause when hovering
    //     smartSpeed: 800,           // ⚡ smooth transition speed
    //     //smartSpeed: 1000,
    //     margin: 25,
    //     dots: false,
    //     loop: true,
    //     nav: true,
    //     navText: [
    //         '<span class="custom-owl-prev"><i class="bi bi-chevron-left"></i></span>',
    //         '<span class="custom-owl-next"><i class="bi bi-chevron-right"></i></span>'
    //     ],
    //     responsive: {
    //         0: { items: 1 },
    //         768: { items: 2 },
    //         992: { items: 3 }
    //     }
    // });

    $(".news-carousel").owlCarousel({
        items: 1,
        margin: 10,
        animateOut: 'fadeOut',
        autoplay: true,
        autoplayTimeout: 4000,     // ⏱️ 4s delay between slides
        autoplayHoverPause: true,  // ⏸️ pause when hovering
        smartSpeed: 800,           // ⚡ smooth transition speed
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
    });

    // Item modal carousel
    $(".item-carousel").each(function () {
        const $carousel = $(this);
        if ($carousel.hasClass("owl-loaded")) return; // avoid double init

        $carousel.owlCarousel({
            items: 1,
            loop: true,
            nav: true,
            dots: false,
            margin: 0,
            navText: [
                '<i class="bi bi-chevron-left"></i>',
                '<i class="bi bi-chevron-right"></i>'
            ],
            smartSpeed: 800,
            autoplay: false,
            autoplayHoverPause: true
        });
    });

})(jQuery);

