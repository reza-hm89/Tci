$(document).ready(function () {

    $(".pollr").on("click", ".btnPoll", function () {
        Vote($(this).val());
      
    });
});

function Vote(id) {

    $.ajax({
        type: "POST",
        url: "../mngmnt/WebServices/PollAnswerWs.asmx/Vote",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            if (msg == true) {
                $(".showpoll").hide();
                $(".showthank").show();
            } else {

            }
        },
        error: function (xhr) {

        },
        complete: function () {

        }
    });
}