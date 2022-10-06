var auctionGroupId = -1;

$(document).ready(function () {

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("AuctionGroupList.aspx");
    });

    $("#btnSaveAuctionGroup").click(function () {

        if (ValidateData() == true) {

            $("#btnSaveAuctionGroup").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            if ($("#EditMode").val() == "false") {
                insertAuctionGroup($("#txtName").val());
            } else {
                updateAuctionGroup(auctionGroupId, $("#txtName").val());
            };
        }
    });

});

function insertAuctionGroup(name) {

    var obj = new Object();

    obj.Name = name;

    $.ajax({
        type: "POST",
        url: "WebServices/AuctionGroupWs.asmx/Insert",
        data: "{ auctionGroupEntity:" + JSON.stringify(obj) + "}",
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
            $('#btnSaveAuctionGroup').css({ "background": "#364F6A" });
        }
    });
}

function updateAuctionGroup(id, name) {

    var obj = new Object();

    obj.Id = id;
    obj.Name = name;

    $.ajax({
        type: "POST",
        url: "WebServices/AuctionGroupWs.asmx/Update",
        data: "{auctionGroupEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("AuctionGroupList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveAuctionGroup').css({ "background": "#364F6A" });
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