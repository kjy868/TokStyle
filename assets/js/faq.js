$(function () {
    $(".faq__answer").hide();

    $(".faq__question").on("click", function () {

        const $item = $(this).closest(".faq__item");
        const $answer = $item.find(".faq__answer");
        const $icon = $(this).find(".faq__icon");

        if ($answer.is(":visible")) {
            $answer.slideUp(200);
            $icon.removeClass("is-open");
            return;
        }

        $(".faq__answer:visible").slideUp(200);
        $(".faq__icon").removeClass("is-open");

        $answer.slideDown(200);
        $icon.addClass("is-open");
    });
});
