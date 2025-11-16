$(document).ready(function () {
    function loadJSON() {
        return $.when(
            $.getJSON('./assets/js/artists.json'),
            $.getJSON('./assets/js/themes.json')
        );
    }

    function findArtist(artists, id) {
        return artists.find(a => a.id === id) || null;
    }

    function createThemeCard(theme, artist) {

        const artistIcon = artist?.icon ?? './assets/images/artists/artist_blank.webp';
        const artistName = artist?.name ?? '미상';

        return `
            <div class="swiper-slide">
                <div class="popular__card-daily card-theme">
                    <a href="#popular" class="card-theme__link">
                        <div class="card-theme__img-wrap">
                            <img src="${theme.thumbnail}" alt="테마이미지" class="card-theme__img">
                        </div>

                        <div class="card-theme__overlay"></div>

                        <div class="card-theme__text-wrap">
                            <h3 class="card-theme__title">${theme.title}</h3>

                            <div class="card-theme__artist">
                                <div class="card-theme__artist-img">
                                    <img src="${artistIcon}" alt="작가아이콘">
                                </div>
                                <p class="card-theme__artist-name">${artistName}</p>
                            </div>
                        </div>
                    </a>
                </div>
            </div>
        `;
    }

    function renderByIds(wrapper, idArray, artists, themes) {
        $(wrapper).empty();

        idArray.forEach(id => {
            const theme = themes.find(t => t.id === id);
            if (!theme) return;

            const artist = findArtist(artists, theme.artistId);
            $(wrapper).append(createThemeCard(theme, artist));
        });
    }

    loadJSON().done(function (artistsData, themesData) {

        const artists = artistsData[0];
        const themes = themesData[0];

        const DAILY_IDS = [126, 142, 125, 150, 122];
        const WEEKLY_IDS = [143, 151, 157, 165, 149];
        const MONTHLY_IDS = [147, 154, 180, 190, 200];

        const $daily = $('#popular-daily');
        const $weekly = $('#popular-weekly');
        const $monthly = $('#popular-monthly');

        renderByIds($daily, DAILY_IDS, artists, themes);
        renderByIds($weekly, WEEKLY_IDS, artists, themes);
        renderByIds($monthly, MONTHLY_IDS, artists, themes);

        console.log('✔ 인기테마 자동 삽입 완료!');
    });

});


$(function () {
    $(".btn-theme").on("click", function (e) {
        e.preventDefault();
        const parentWrap = $(this).parent();

        parentWrap.find(".btn-theme").removeClass("btn-theme--active");
        $(this).addClass("btn-theme--active");

        if (parentWrap.hasClass("popular__button-wrap")) {
            let idx = $(this).index();

            $(".popular__swiper-wrap > .popular__swiper").hide();
            $(".popular__swiper-wrap > .popular__swiper").eq(idx).show();
        }

        if (parentWrap.hasClass("category__button-wrap")) {
            let idx = $(this).index();

            $(".category__swiper-wrap > .category__swiper").hide();
            $(".category__swiper-wrap > .category__swiper").eq(idx).show();
        }
    });
});