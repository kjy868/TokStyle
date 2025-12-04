$(function () {
    let themes = [];
    let artists = [];
    let filteredThemes = [];
    let currentPage = 1;
    let itemsPerPage = 20;

    // 현재 선택된 필터
    let selectedFilters = {
        popular: null,
        sort: null,
        color: null,
        mood: null,
        season: null,
        event: null
    };

    // 배열 섞기
    function shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // 반응형 카드 개수
    function setItemsPerPage() {
        const w = window.innerWidth;
        if (w < 480) itemsPerPage = 8;
        else if (w < 768) itemsPerPage = 10;
        else if (w < 1024) itemsPerPage = 12;
        else itemsPerPage = 20;
    }

    setItemsPerPage();
    $(window).on("resize", function () {
        const before = itemsPerPage;
        setItemsPerPage();
        if (before !== itemsPerPage) {
            currentPage = 1;
            render();
        }
    });

    // JSON 불러오기
    $.when(
        $.getJSON("./assets/js/themes.json"),
        $.getJSON("./assets/js/artists.json")
    ).done(function (themesData, artistsData) {
        themes = themesData[0];
        artists = artistsData[0];
        filteredThemes = shuffle(themes);
        render();
    });

    // 필터 적용
    function applyFilters() {
        if (selectedFilters.popular || selectedFilters.sort) {
            filteredThemes = shuffle(themes);
        }
        else if (selectedFilters.color) {
            const filtered = themes.filter(theme => theme.color?.includes(selectedFilters.color));
            filteredThemes = shuffle(filtered);
        }
        else if (selectedFilters.mood) {
            const filtered = themes.filter(theme => theme.mood?.includes(selectedFilters.mood));
            filteredThemes = shuffle(filtered);
        }
        else if (selectedFilters.season) {
            const filtered = themes.filter(theme => theme.season?.includes(selectedFilters.season));
            filteredThemes = shuffle(filtered);
        }
        else if (selectedFilters.event) {
            const filtered = themes.filter(theme => theme.event?.includes(selectedFilters.event));
            filteredThemes = shuffle(filtered);
        }
        else {
            filteredThemes = shuffle(themes);
        }

        currentPage = 1;
        render();
    }

    // 드롭다운 토글
    $(".theme-list__filter-wrap").on("click", ".dropdown-btn", function (e) {
        e.stopPropagation();
        const $parent = $(this).parent();
        const wasOpen = $parent.hasClass("active");

        $(".filter-dropdown-group").removeClass("active");

        if (!wasOpen) {
            $parent.addClass("active");
        }
    });

    // 드롭다운 아이템 클릭
    $(".theme-list__filter-wrap").on("click", ".dropdown-list li", function () {
        const $list = $(this).closest(".dropdown-list");
        const filter = $list.data("filter");
        const value = $(this).data("value");
        const text = $(this).text();

        $list.closest(".filter-dropdown-group").find(".dropdown-btn").text(text + " ▾");
        $(".filter-dropdown-group").removeClass("active");

        selectedFilters = {
            popular: null,
            sort: null,
            color: null,
            mood: null,
            season: null,
            event: null
        };

        selectedFilters[filter] = value;

        applyFilters();
    });

    // 드롭다운 외부 클릭시 닫기
    $(document).on("click", function () {
        $(".filter-dropdown-group").removeClass("active");
    });

    // 카드 생성
    function createCard(theme) {
        const artist = artists.find(a => a.id === theme.artistId);
        const artistIcon = artist?.icon ?? "./assets/images/artists/artist_blank.webp";

        return `
            <a href="./theme-detail.html?id=${theme.id}" class="card-theme-list">
                <div class="card-theme-list__img-wrap">
                    <img src="${theme.thumbnail}" alt="${theme.title}" class="card-theme-list__img">
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
    function render() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageItems = filteredThemes.slice(start, end);

        $(".theme-list__card-wrap .card-theme-grid").html(
            pageItems.map(createCard).join("")
        );

        buildPagination(filteredThemes.length, itemsPerPage, currentPage, function (newPage) {
            currentPage = newPage;
            render();
        });
    }
});
