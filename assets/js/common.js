$(function () {
    // 햄버거 메뉴 열기
    $("#hamburger").on("click", function () {
        $("#header__nav").addClass("active");
        $("#header__bg").addClass("active").fadeIn(200);
        $("body").addClass("scroll-lock");
    });

    // 검색창 열기
    $("#search__icon").on("click", function () {
        $("#search__full").addClass("active");
        $("#header__bg").addClass("active").fadeIn(200);
        $("body").addClass("scroll-lock");
    });

    // 오버레이 클릭 → 둘 다 닫기
    $("#header__bg").on("click", function () {
        $("#header__nav").removeClass("active");
        $("#search__full").removeClass("active");
        $("#header__bg").removeClass("active").fadeOut(200);
        $("body").removeClass("scroll-lock");
    });

    // 검색 추천 태그 → 검색 이동
    $(".search__tags .tag").on("click", function () {
        const keyword = $(this).text();
        window.location.href = `/search.html?q=${keyword}`;
    });
});
