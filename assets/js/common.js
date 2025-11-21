// 네비게이션, API fetch 함수 등 공통 기능
$(function () {
    // 햄버거 메뉴
    $("#hamburger").on("click", function () {
        $("#header__bg").fadeIn(200);
        $("#header__nav").css("right", "0");
    });
    $("#header__bg").on("click", function () {
        $("#header__bg").fadeOut(200);
        $("#header__nav").css("right", "-100%");
        $("#search__full").removeClass("active").fadeOut(200);
    });

    // 모바일 검색창
    $("#search__icon").on("click", function () {
        $("#search__full").fadeIn(200);
        setTimeout(() => {
            $("#search__full").addClass("active");
        }, 10);
    });

    // 태그 클릭 → 검색 페이지 이동
    $(".search__tags .tag").on("click", function () {
        const keyword = $(this).text();
        window.location.href = `/search.html?q=${keyword}`;
    });
});