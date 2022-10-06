var auctionId = -1;

$(document).ready(function () {

    LoadGroups();

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("auctionList.aspx");
    });

    $("#btnSaveAuction").click(function () {

        if (ValidateData() == true) {

            $("#btnSaveAuction").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            var items = new Array;

            $('.groups').each(function () {
                if ($(this).is(":checked") == true) {

                    items.push($(this).val());
                }
            });

            items = $.grep(items, function (n) { return (n); });

            if ($("#EditMode").val() == "false") {

                insertAuction($("#drpAuctionGroup").val(), $("#DrpKind").val(),
                    $("#txtSubject").val(), $("#txtNumber").val(), $("#txtRegDate").val(),
                    $("#StartRecieveDate").val(), $("#EndRecieveDate").val(), $("#SendDate").val(),
                     $("#ReOpeningDate").val(), CKEDITOR.instances['txtDescription'].getData());
            } else {
                updateAuction(auctionId, $("#drpAuctionGroup").val(), $("#DrpKind").val(),
                    $("#txtSubject").val(), $("#txtNumber").val(), $("#txtRegDate").val(),
                    $("#StartRecieveDate").val(), $("#EndRecieveDate").val(), $("#SendDate").val(),
                     $("#ReOpeningDate").val(), CKEDITOR.instances['txtDescription'].getData());
            };
        }

    });

    $("#btnAddImage").click(function () {
        $("#my-awesome-dropzone").css("display", "block");
        $("#my-awesome-dropzone").click();
    });

    $(".picUploadList").on("click", ".picUpload", function () {

        var ans = confirm("آیا برای حذف تصویر انتخاب شده مطمئن هستید؟");

        if (ans == true) {

            DeleteImage(this.id);
            $(this).remove();
        }
    });
});

function GetImages(id) {

    $.ajax({
        type: "POST",
        url: "../mngmnt/WebServices/AuctionWs.asmx/SelectEventImages",
        data: "{ id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            var msg = eval('(' + response.d + ')');

            if ($('.picUploadList').children().length > 0) // remove table if it exists
            {
                $(".picUploadList").empty();
            }

            for (var i = 0; i < msg.length  ; i++) {

                $(".picUploadList").append('<div  class="picUpload" id="' + msg[i].Id + '"' +
                    ' style="background:url(\'..\\/mngmnt\\/asnad\\/' + msg[i].Name + '\') no-repeat; background-size:100%; display:block"></div>');
            }

            if (msg.length == 0) {
                $(".picUploadList").css("display", "none");
            } else {
                $(".picUploadList").show();
            }

        },
        error: function (xhr) {

        },
        complete: function () {

        }
    });
}

function DeleteImage(id) {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "../mngmnt/WebServices/AuctionWs.asmx/DeleteImage",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            if (msg == true) {

                MessageBox(3);

                $(id).remove();
            }

        },
        error: function (xhr) {

        },
        complete: function () {
            HideLoading();
        }
    });
}



function LoadGroups() {

    $.ajax({
        type: "POST",
        url: "WebServices/AuctionGroupWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var drpGroup = '';

            for (var i = 0; i < msg.length; i++) {
                drpGroup += '  <option value="' + msg[i].Id + '">' + msg[i].Name + '</option>';
            }

            $("#drpAuctionGroup").append(drpGroup);

            if ($("#EditMode").val() == "true") {


            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function insertAuction(auctionGroupID, kind, subject, number, regDate, startRecieveDate,
    endRecieveDate, sendDate, reOpeningDate, description) {

    var obj = new Object();

    obj.AuctionGroupID = auctionGroupID;
    obj.Kind = kind;
    obj.Subject = subject;
    obj.Number = number;
    obj.RegDate1 = regDate;
    obj.StartRecieveDate1 = startRecieveDate;
    obj.EndRecieveDate1 = endRecieveDate;
    obj.SendDate1 = sendDate;
    obj.ReOpeningDate1 = reOpeningDate;
    obj.Description = description;

    $.ajax({
        type: "POST",
        url: "WebServices/AuctionWs.asmx/Insert",
        data: "{ auctionEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#drpAuctionGroup").val("");
            $("#drpKind").val("");
            $("#txtSubject").val("");
            $("#txtNumber").val("");
            $("#txtRegDate").val("");
            $("#StartRecieveDate").val("");
            $("#EndRecieveDate").val("");
            $("#SendDate").val("");
            $("#ReOpeningDate").val("");
            $("#txtDescription").val("");

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveAuction').css({ "background": "#364F6A" });
        }
    });
}

function updateAuction(id, auctionGroupID, kind, subject, number, regDate, startRecieveDate,
    endRecieveDate, sendDate, reOpeningDate, description) {

    var obj = new Object();

    obj.Id = id;
    obj.AuctionGroupID = auctionGroupID;
    obj.Kind = kind;
    obj.Subject = subject;
    obj.Number = number;
    obj.RegDate1 = regDate;
    obj.StartRecieveDate1 = startRecieveDate;
    obj.EndRecieveDate1 = endRecieveDate;
    obj.SendDate1 = sendDate;
    obj.ReOpeningDate1 = reOpeningDate;
    obj.Description = description;

    $.ajax({
        type: "POST",
        url: "WebServices/AuctionWs.asmx/Update",
        data: "{ auctionEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("AuctionList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveauction').css({ "background": "#364F6A" });
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