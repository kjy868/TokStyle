$(function () {
    // 스크롤바 너비 계산 및 body에 padding 추가/제거
    function lockScroll() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        $("body").css("padding-right", scrollbarWidth + "px").addClass("scroll-lock");
        $(".header").css("padding-right", scrollbarWidth + "px");
    }

    function unlockScroll() {
        $("body").css("padding-right", "").removeClass("scroll-lock");
        $(".header").css("padding-right", "");
    }

    // 햄버거 메뉴 토글
    $("#hamburger").on("click", function () {
        if ($("#header__nav").hasClass("active")) {
            $("#header__nav").removeClass("active");
            $("#header__bg").removeClass("active").fadeOut(200);
            unlockScroll();
            $(this).removeClass("active");
        } else {
            if ($("#search__wrap").hasClass("active")) {
                $("#search__wrap").removeClass("active");
                $("#search__icon").removeClass("active");
            } else {
                lockScroll();
            }
            $("#header__nav").addClass("active");
            $("#header__bg").addClass("active").fadeIn(200);
            $(this).addClass("active");
        }
    });

    // 검색창 토글
    $("#search__icon").on("click", function () {
        if ($("#search__wrap").hasClass("active")) {
            $("#search__wrap").removeClass("active");
            $("#header__bg").removeClass("active").fadeOut(200);
            unlockScroll();
            $(this).removeClass("active");
        } else {
            if ($("#header__nav").hasClass("active")) {
                $("#header__nav").removeClass("active");
                $("#hamburger").removeClass("active");
            } else {
                lockScroll();
            }
            $("#search__wrap").addClass("active");
            $("#header__bg").addClass("active").fadeIn(200);
            $(this).addClass("active");
        }
    });

    // 오버레이 클릭
    $("#header__bg").on("click", function () {
        $("#header__nav").removeClass("active");
        $("#search__wrap").removeClass("active");
        $("#header__bg").removeClass("active").fadeOut(200);
        unlockScroll();
        $("#search__icon, #hamburger").removeClass("active");
    });

    // 검색 추천 태그
    $(".search__tags .tag").on("click", function () {
        const keyword = $(this).text();
        window.location.href = `/search.html?q=${keyword}`;
    });

    // 화면 크기 변경 시 모바일 메뉴 닫기
    $(window).on("resize", function () {
        if ($(window).width() > 1023) {
            $("#header__nav").removeClass("active");
            $("#search__wrap").removeClass("active");
            $("#header__bg").removeClass("active").hide();
            unlockScroll();
            $("#search__icon, #hamburger").removeClass("active");
        }
    });
});
