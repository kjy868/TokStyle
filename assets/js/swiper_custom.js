// key swiper
let swiper01 = new Swiper(".key__swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});

// popular swiper
let swiper02 = new Swiper(".popular__swiper", {
    loopFillGroupWithBlank: true,
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 20
});

// category swiper
let swiper03 = new Swiper(".category__swiper", {
    loopFillGroupWithBlank: true,
    loop: false,
    slidesPerView: 'auto',
    spaceBetween: 20,
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    }
});
