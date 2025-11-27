$(function () {
    let themes = [];
    let artists = [];
    let filteredThemes = [];

    let currentPage = 1;
    let itemsPerPage = 20;

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

    //JSON 불러오기
    $.when(
        $.getJSON("./assets/js/themes.json"),
        $.getJSON("./assets/js/artists.json")
    ).done(function (themesData, artistsData) {
        themes = themesData[0];
        artists = artistsData[0];

        initThemeList();
    });

    // 전체 리스트 렌더링
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    function initThemeList() {
        filteredThemes = shuffle([...themes]);


        render();
    }

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

        // 페이지네이션 생성
        buildPagination(
            filteredThemes.length,
            itemsPerPage,
            currentPage,
            function (newPage) {
                currentPage = newPage;
                render();
            }
        );
    }
});
