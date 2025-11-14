import artists from './artists.json' assert { type: 'json' };
import themes from './themes.json' assert { type: 'json' };

$(function () {
    $(".btn-theme").on("click", function (e) {
        e.preventDefault();
        const parentWrap = $(this).parent();

        parentWrap.find(".btn-theme").removeClass("btn-theme--active");
        $(this).addClass("btn-theme--active");

        if (parentWrap.hasClass("popular__button-wrap")) {
            let idx = $(this).index();

            $(".popular__swiper-wrap > .popular__swiper").hide();
            $(".popular__swiper-wrap > .popular__swiper").eq(idx).show();
        }

        if (parentWrap.hasClass("category__button-wrap")) {
            let idx = $(this).index();

            $(".category__swiper-wrap > .category__swiper").hide();
            $(".category__swiper-wrap > .category__swiper").eq(idx).show();
        }
    });
});