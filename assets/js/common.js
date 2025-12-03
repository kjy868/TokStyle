// pagination 공용 기능
/*
 * @param {*} totalItems 전체 아이템 개수
 * @param {*} itemsPerPage 페이지 당 아이템 개수
 * @param {*} currentPage 현재 페이지
 * @param {*} onChangePage 페이지 변경 콜백 함수
 */
$(function () {
    window.buildPagination = function (totalItems, itemsPerPage, currentPage, onChangePage) {
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const $pagination = $("#pagination");
        const $pages = $(".pagination__pages");

        if (totalPages === 0) {
            $pagination.hide();
            return;
        }
        $pagination.show();

        $pages.empty();

        const pageGroupSize = 5;
        const currentGroup = Math.ceil(currentPage / pageGroupSize);

        const startPage = (currentGroup - 1) * pageGroupSize + 1;
        const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

        for (let i = startPage; i <= endPage; i++) {
            const active = i === currentPage ? "is-current" : "";
            $pages.append(`<span class="pagination__page ${active}" data-page="${i}">${i}</span>`);
        }

        $(".pagination__first, .pagination__prev").toggleClass("disabled", currentPage === 1);

        $(".pagination__next[data-page='next'], .pagination__next[data-page='last']")
            .toggleClass("disabled", currentPage === totalPages);

        $(document).off("click.page").on("click.page", ".pagination__page", function () {
            const page = Number($(this).data("page"));
            onChangePage(page);
        });

        $(".pagination__first").off("click.page").on("click.page", function () {
            if ($(this).hasClass("disabled")) return;
            onChangePage(1);
        });

        $(".pagination__prev").off("click.page").on("click.page", function () {
            if ($(this).hasClass("disabled")) return;
            onChangePage(currentPage - 1);
        });

        $(".pagination__next[data-page='next']")
            .off("click.page")
            .on("click.page", function () {
                if ($(this).hasClass("disabled")) return;
                onChangePage(currentPage + 1);
            });

        $(".pagination__next[data-page='last']")
            .off("click.page")
            .on("click.page", function () {
                if ($(this).hasClass("disabled")) return;
                onChangePage(totalPages);
            });
    }
});

// =====================================================================
// header 공용 기능

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

    const currentPage = window.location.pathname.split("/").pop();

    $(".header__menu a").each(function () {
        const linkPage = $(this).attr("href").split("/").pop().replace("./", "");

        if (currentPage === linkPage) {
            $(this).addClass("active");
        }
    });

    // PC 헤더 검색
    $(".header__search input").on("keypress", function (e) {
        if (e.key === "Enter") {
            const keyword = $(this).val().trim();
            if (keyword) {
                window.location.href = `/search.html?q=${encodeURIComponent(keyword)}`;
            }
        }
    });

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

    // 태블릿~모바일 검색 실행
    $(".header__search i").on("click", function () {
        const input = $(this).siblings("input");
        const keyword = input.val().trim();
        if (keyword) {
            window.location.href = `/search.html?q=${encodeURIComponent(keyword)}`;
        }
    });

    $("#search__wrap input").on("keypress", function (e) {
        if (e.key === "Enter") {
            const keyword = $(this).val().trim();
            if (keyword) {
                window.location.href = `/search.html?q=${encodeURIComponent(keyword)}`;
            }
        }
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
