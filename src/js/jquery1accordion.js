// $(".acordeao > h2").next().hide();
// $(".acordeao > h2").eq(0).next().show();
$(".acordeao > h2").on("click", function() {
    // if ($(this).next().is(":visible")) {
    //     $(this).next().hide();
    // } else {
    //     $(this).next().show();
    // }
    // $(this).next().toggle();
    // $(this).next().slideToggle('slow');
    // $(this).next().slideToggle(3000); // ms

    // $(this).next().slideToggle();
    // $(".acordeao > h2").not($(this)).next().slideUp();
    // $(".acordeao > h2").each(function() {
    //     if ($(this).next().is(":visible")) {
    //         $(this).find("span").addClass("seta_aberta").removeClass("seta_fechada");
    //     } else {
    //         $(this).find("span").addClass("seta_fechada").removeClass("seta_aberta");
    //     }
    // });

    $(this).next().slideToggle();
    if ($(this).next().is(":visible")) {
        $(this).find("span").addClass("seta_aberta").removeClass("seta_fechada");
    } else {
        $(this).find("span").addClass("seta_fechada").removeClass("seta_aberta");
    }
    $(".acordeao > h2").not($(this)).next().slideUp().prev().find("span").addClass("seta_fechada").removeClass("seta_aberta");
});