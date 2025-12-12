$(function () {
    let allThemes = [];
    let currentPage = 1;
    const itemsPerPage = 20;

    $.getJSON("./assets/js/themes.json", function (themes) {
        allThemes = themes.filter(t => t.artistId === 5);
        renderPage();
    });

    function renderPage() {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageThemes = allThemes.slice(start, end);

        const $grid = $(".card-theme-grid");
        $grid.empty();

        // 카드 생성
        pageThemes.forEach(theme => {
            const isFree = theme.free ? "무료" : "유료";

            const card = `
                <a href="./theme-detail.html" class="card-theme-list">
                    <div class="card-theme-list__img-wrap">
                        <img src="${theme.thumbnail}" alt="${theme.title}" class="card-theme-list__img">
                    </div>
                    <h4 class="card-theme-list__title">${theme.title}</h4>
                    <p class="card-theme-list__desc">${theme.description || ""}</p>
                    <div class="card-theme-list__tag-wrap">
                        ${theme.platform.map(p => `<div class="tag tag--platform">${p.toUpperCase()}</div>`).join("")}
                        <div class="tag tag--platform">${isFree}</div>
                    </div>
                </a>
            `;
            $grid.append(card);
        });

        buildPagination(allThemes.length, itemsPerPage, currentPage, function (newPage) {
            currentPage = newPage;
            renderPage();
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
});
