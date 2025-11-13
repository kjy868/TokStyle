$(function () {
    $(".btn-theme").on("click", function () {
        $(".btn-theme").removeClass("btn-theme--active");
        $(this).addClass("btn-theme--active");
        let idx = $(this).index();

        $(".popular__swiper-wrap > .popular__swiper").hide();
        $(".popular__swiper-wrap > .popular__swiper").eq(idx).show();
    });
});