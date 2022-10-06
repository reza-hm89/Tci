var pollId = -1;

$(document).ready(function () {

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("PollList.aspx");
    });

    $("#btnSavePoll").click(function () {

        if (ValidateData() == true) {

            $("#btnSavePoll").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            if ($("#EditMode").val() == "false") {
                insertPoll($("#txtName").val());
            } else {
                updatePoll(pollId, $("#txtName").val());
            };
        }
    });

});

function insertPoll(name) {

    var obj = new Object();

    obj.Name = name;

    $.ajax({
        type: "POST",
        url: "WebServices/PollWs.asmx/Insert",
        data: "{ pollEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtName").val("");
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSavePoll').css({ "background": "#364F6A" });
        }
    });
}

function updatePoll(id, name) {

    var obj = new Object();

    obj.Id = id;
    obj.Name = name;

    $.ajax({
        type: "POST",
        url: "WebServices/PollWs.asmx/Update",
        data: "{pollEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("PollList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSavePoll').css({ "background": "#364F6A" });
        }
    });
}

function ValidateData() {

    var check = true;

    $(".InputRequire").each(function () {

        if ($(this).val() == "") {
            check = false;
            $(this).css({ "border-color": "#fe0303" });
        } else {
            $(this).css({ "border-color": "#e4e8eb" });
        }
    });

    return check;
}