var telegramLotteryId = -1;

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
        $("#container").load("TelegramLotteryList.aspx");
    });

    $("#btnSaveLottery").click(function () {

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
             
                insertLottery($("#txtTitle").val(), $("#drpYear").val(),
                    $("#drpMonth").val(), $("#txtStartDate").val(), $("#txtStartTime").val(),
                    $("#txtEndDate").val(), $("#txtEndTime").val(), $("#drpStatus").val());
            } else {
                updateLottery(telegramLotteryId, $("#txtTitle").val(), $("#drpYear").val(),
                    $("#drpMonth").val(), $("#txtStartDate").val(), $("#txtStartTime").val(),
                    $("#txtEndDate").val(), $("#txtEndTime").val(), $("#lblLink").val(), $("#drpStatus").val());
            };
        }
    });

});

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

function insertLottery(title, year, monthNumber, startDate, startTime, endDate,
    endTime, status) {

    var obj = new Object();

    obj.Title = title;
    obj.Year = year;
    obj.MonthNumber = monthNumber;
    obj.StartDate = startDate;
    obj.StartTime = startTime;
    obj.EndDate = endDate;
    obj.EndTime = endTime;
    if (status == 1)
        obj.IsActive = true;
    else
        obj.IsActive = false;

    $.ajax({
        type: "POST",
        url: "WebServices/TelegramLotteryWs.asmx/Insert",
        data: "{ telegramLotteryEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);
           
            $("#txtTitle").val("");
            $("#drpYear").val("");
            $("#drpMonth").val("");
            $("#txtStartDate").val("");
            $("#txtStartTime").val("");
            $("#txtEndDate").val("");
            $("#txtEndTime").val("");
       

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveAuction').css({ "background": "#364F6A" });
        }
    });
}

function updateLottery(id, title, year, monthNumber, startDate, startTime, endDate,
    endTime, link, status) {

    var obj = new Object();

    obj.Id = id;
    obj.Title = title;
    obj.Year = year;
    obj.MonthNumber = monthNumber;
    obj.StartDate = startDate;
    obj.StartTime = startTime;
    obj.EndDate = endDate;
    obj.EndTime = endTime;
    obj.Link = link;
    if (status == 1)
        obj.IsActive = true;
    else
        obj.IsActive = false;

    $.ajax({
        type: "POST",
        url: "WebServices/TelegramLotteryWs.asmx/Update",
        data: "{ telegramLotteryEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("TelegramLotteryList.aspx");
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