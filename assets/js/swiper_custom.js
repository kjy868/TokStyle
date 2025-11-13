// key swiper
let swiper01 = new Swiper(".key__swiper", {
    spaceBetween: 30,
    centeredSlides: true,
    // autoplay: {
    //     delay: 2500,
    //     disableOnInteraction: false,
    // },
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
    slidesPerView: 5,
    // spaceBetween: 25,
    // loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        1440: {
            slidesPerView: 5,
            spaceBetween: 30
        },
        1200: {
            slidesPerView: 4.5,
            spaceBetween: 20
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 3.5,
            spaceBetween: 20
        },
        640: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        480: {
            slidesPerView: 2.5,
            spaceBetween: 20
        },
        360: {
            slidesPerView: 2,
            spaceBetween: 20
        }
    }
});
// const popularSection = document.querySelector(".popular");

// function recommendSwiper(popularSection) {
//     let swiper02 = new Swiper(args.querySelector(".popular__swiper"), {
//         slidesPerView: 5,
//         spaceBetween: 20,
//         pagination: {
//             el: args.querySelector(".swiper-pagination"),
//             clickable: true,
//         },
//         breakpoints: {
//             1440: {
//                 slidesPerView: 4,
//                 spaceBetween: 30
//             },
//             1200: {
//                 slidesPerView: 3.5,
//                 spaceBetween: 20
//             },
//             1024: {
//                 slidesPerView: 3,
//                 spaceBetween: 20
//             },
//             768: {
//                 slidesPerView: 2.5,
//                 spaceBetween: 20
//             },
//             640: {
//                 slidesPerView: 2,
//                 spaceBetween: 20
//             },
//             480: {
//                 slidesPerView: 1.5,
//                 spaceBetween: 20
//             },
//             360: {
//                 slidesPerView: 1,
//                 spaceBetween: 20
//             }
//         }
//     }); return swiper;
// }