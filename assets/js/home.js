$(document).ready(function () {

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]
        }
        return array;
    }

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
                <div class="popular__card card-theme">
                    <a href="#" class="card-theme__link"> 
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

    function renderThemesByFilter(wrapper, filterFn, artists, themes) {
        $(wrapper).empty();
        let filtered = themes.filter(filterFn);

        filtered = shuffle(filtered);

        filtered.forEach(theme => {
            const artist = findArtist(artists, theme.artistId);
            $(wrapper).append(createThemeCard(theme, artist));
        });
    }

    function createArtistCard(artist) {
        const icon = artist.icon && artist.icon.trim() !== ""
            ? artist.icon
            : './assets/images/artists/artist_blank.webp';

        return `
        <a href="#" class="artist__card" style="background-image:url('${artist.icon}');">
            <p>${artist.name}</p>
        </a>
    `;
    }

    function renderArtists(wrapper, artists) {
        $(wrapper).empty();

        let showCount = 5;

        const winW = window.innerWidth;

        if (winW <= 600) {
            showCount = 2;
        } else if (winW <= 767) {
            showCount = 3;
        } else if (winW <= 1023) {
            showCount = 4;
        } else {
            showCount = 5;
        }

        const limitedArtists = artists.slice(0, showCount);

        limitedArtists.forEach(artist => {
            $(wrapper).append(createArtistCard(artist));
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

        const $ARTIST_IDS = [];

        renderByIds($daily, DAILY_IDS, artists, themes);
        renderByIds($weekly, WEEKLY_IDS, artists, themes);
        renderByIds($monthly, MONTHLY_IDS, artists, themes);

        renderArtists('#artist-list', artists);
        $(window).resize(function () {
            renderArtists('#artist-list', artists);
        });


        const COLOR_KEYWORDS = ['블루', '핑크', '초록', '블랙', '분홍', '레드', '빨강', '연두', 'blue', 'pink', '그린', '흰'];
        const MOOD_KEYWORDS = ['따뜻', '시원', '포근', '심플', '말랑', '포실', '부드러운', '하찮', '귀여운', '고양이', '공룡'];
        const SEASON_KEYWORDS = ['봄', '여름', '가을', '겨울', '눈', '알로하', '호호', '도토리', '수박', '무화과'];
        const EVENT_KEYWORDS = ['크리스마스', '할로윈', '생일', '발렌타인', '졸업', '신년', '메리', '눈'];

        renderThemesByFilter(
            '#category-color',
            theme => COLOR_KEYWORDS.some(k => theme.title.includes(k)),
            artists,
            themes
        );
        renderThemesByFilter(
            '#category-mood',
            theme => MOOD_KEYWORDS.some(k => theme.title.includes(k)),
            artists,
            themes
        );

        renderThemesByFilter(
            '#category-season',
            theme => SEASON_KEYWORDS.some(k => theme.title.includes(k)),
            artists,
            themes
        );

        renderThemesByFilter(
            '#category-event',
            theme => EVENT_KEYWORDS.some(k => theme.title.includes(k)),
            artists,
            themes
        );
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