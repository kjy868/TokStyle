$(function () {
    let themes = [];
    let artists = [];
    let filteredThemes = [];

    let currentPage = 1;
    let itemsPerPage = 20;

    // 반응형 카드 갯수
    function setItemsPerPage() {
        const w = window.innerWidth;
        if (w < 480) itemsPerPage = 8;
        else if (w < 768) itemsPerPage = 10;
        else if (w < 1024) itemsPerPage = 12;
        else itemsPerPage = 20;
    }
    setItemsPerPage();

    $(window).on("resize", function () {
        const oldValue = itemsPerPage;
        setItemsPerPage();
        if (oldValue !== itemsPerPage) {
            currentPage = 1;
            render();
        }
    });

    // JSON 불러오기
    $.when(
        $.getJSON("./assets/js/themes.json"),
        $.getJSON("./assets/js/artists.json")
    ).done(function (t, a) {
        themes = t[0];
        artists = a[0];
        initSearch();
    });

    // 검색 초기화
    function initSearch() {
        const params = new URLSearchParams(window.location.search);
        const q = params.get("q")?.trim() ?? "";
        $("#searchInput").val(q);

        filteredThemes = themes.filter(t => t.title.includes(q));
        render();
    }

    // 정렬 기능
    $(document).on("click", ".filter-tabs__btn", function () {
        $(".filter-tabs__btn").removeClass("filter-tabs__btn--active");
        $(this).addClass("filter-tabs__btn--active");

        const sortType = $(this).data("sort");

        if (sortType === "recent") {
            filteredThemes.sort((a, b) => b.id - a.id); // 최신순
        } else if (sortType === "popular") {
            filteredThemes.sort((a, b) => a.id - b.id); // 인기순
        }

        currentPage = 1;
        render();

        window.scrollTo({ top: 0, behavior: "smooth" }); // 클릭 시 최상단으로 이동
    });

    // 카드 HTML
    function createCard(theme) {
        const artist = artists.find(a => a.id === theme.artistId);
        const artistIcon = artist?.icon ?? "./assets/images/artists/artist_blank.webp";

        return `
        <a href="./theme-detail.html" class="card-theme-list">
            <div class="card-theme-list__img-wrap">
                <img src="${theme.thumbnail}" class="card-theme-list__img">
            </div>
            <h4 class="card-theme-list__title">${theme.title}</h4>

            <div class="card-theme-list__artist">
                <div class="card-theme-list__artist-img">
                    <img src="${artistIcon}" alt="${artist?.name}">
                </div>
                <p class="card-theme-list__artist-name">${artist?.name ?? "미상"}</p>
            </div>

            <div class="card-theme-list__tag-wrap">
                ${theme.platform.map(p => `<div class="tag tag--platform">${p}</div>`).join("")}
                <div class="tag tag--platform">${theme.free ? "무료" : "유료"}</div>
            </div>
        </a>
        `;
    }

    // 페이지 렌더링
    function renderPage() {
        const start = (currentPage - 1) * itemsPerPage;
        const pageItems = filteredThemes.slice(start, start + itemsPerPage);

        return pageItems.map(createCard).join("");
    }

    function render() {
        if (filteredThemes.length === 0) {
            $("#searchResults .card-theme-grid").html(`<p class="no-result">검색 결과가 없습니다.</p>`);
            $("#pagination").hide();
            return;
        }

        $("#pagination").show();
        $("#searchResults .card-theme-grid").html(renderPage());

        buildPagination(
            filteredThemes.length,
            itemsPerPage,
            currentPage,
            (newPage) => {
                currentPage = newPage;
                render();
            }
        );
    }

    // 검색창 submit
    $("#searchForm").on("submit", function (e) {
        e.preventDefault();
        const keyword = $("#searchInput").val().trim();
        window.location.href = `/search.html?q=${keyword}`;
    });
});
