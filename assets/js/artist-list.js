$(function () {

    let artists = [];
    let currentPage = 1;
    let itemsPerPage = 9;

    function setItemsPerPage() {
        const w = window.innerWidth;

        if (w <= 480) {
            itemsPerPage = 6;
        } else if (w <= 1023) {
            itemsPerPage = 8;
        } else {
            itemsPerPage = 12;
        }
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

    // Shuffle 함수 (랜덤)
    function shuffle(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    }

    // JSON 로드
    $.getJSON("./assets/js/artists.json", function (data) {
        artists = data;
        artists = shuffle(artists);
        render();
    });

    // 카드 렌더링
    function render() {

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const list = artists.slice(start, end);

        let html = "";

        list.forEach(a => {
            html += `
                <a href="#" class="card-artist">
                    <div class="card-artist__img-wrap">
                        <img src="${a.bg ?? './assets/images/artists/artist_blank.webp'}">
                    </div>

                    <div class="card-artist__info">
                        <div class="card-artist__left">
                            <div class="card-artist__avatar">
                                <img src="${a.icon ?? './assets/images/artists/artist_blank.webp'}">
                            </div>
                            <div>
                                <p class="card-artist__name">${a.name}</p>
                                <p class="card-artist__bio">${a.bio ?? ''}</p>
                            </div>
                        </div>

                        <div class="card-artist__count">
                            ${Math.floor(Math.random() * 30) + 1}
                        </div>
                    </div>
                </a>
            `;
        });

        $(".card-artist-grid").html(html);

        buildPagination(
            artists.length,
            itemsPerPage,
            currentPage,
            function (newPage) {
                currentPage = newPage;
                render();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        );
    }

    // 필터 클릭
    $(".filter-tabs__btn").on("click", function () {

        $(".filter-tabs__btn").removeClass("filter-tabs__btn--active");
        $(this).addClass("filter-tabs__btn--active");

        artists = shuffle(artists);

        currentPage = 1;
        render();

        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});
