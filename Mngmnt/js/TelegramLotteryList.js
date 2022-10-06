var RowId = [];

$(document).ready(function () {

    LoadTelegramLottery();


    $("#btnDelete").click(function () {

        var cnt = 0;

        $("input:checkbox").not("#allChecktic").each(function () {

            if ($(this).parent("div").hasClass("checked") == true) {

                RowId.push($(this).attr('id'));
                cnt++;
            }
        });

        if (cnt > 0) {

            var ans = confirm("آیا برای حذف  " + cnt + " رکورد انتخاب شده مطمئن هستید؟");

            if (ans == true) {

                ShowLoading();

                deleteSelected(RowId);
            }
        }
    });
});

function SetVisibility(id, visibility) {

    $.ajax({
        type: "POST",
        url: "WebServices/TelegramLotteryWs.asmx/SetVisibility",
        data: "{id:'" + id + "', visibility:'" + visibility + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            if (msg == true) {

            } else {
                MessageBox(5);
            }
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });
}

function LoadTelegramLottery() {

    ShowLoading();
    $.ajax({
        type: "POST",
        url: "WebServices/TelegramLotteryWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var table = '<table class="table table-bordered table-hover" id="sample-table-1">' +
                '<thead>' +
                '<tr>' +
                '<th class="center"><a spellcheck="false" id="SelectAll" class="btn btn-light-grey" style="background-color:lightgray; border-color:lightgray" ><i class="fa fa-square-o"></i></a></th>' +
                '<th class="center"><label>ردیف</label></div></th>' +
                '<th>عنوان</th>' +
                '<th>سال</th>' +
                '<th>ماه</th>' +
                '<th>تاریخ شروع</th>' +
                '<th>تاریخ پایان</th>' +
                '<th>لینک قرعه کشی</th>' +
                '<th><i class="fa fa-time"></i>عملیات</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            if (ModulePermission.Delete == true) {
                $("#btnDelete").show();
            }

            var kind;

            for (var i = 0; i < msg.length; i++) {

                if (ModulePermission.Update == true) {
                    editRow = '<a onclick="bindRecordToEdit(' + msg[i].Id + ')" style="margin-left:3px" class="btn btn-xs btn-teal tooltips" data-placement="top" data-original-title="مشاهده"><i class="fa fa-edit"></i></a>';
                }
                if (ModulePermission.Delete == true) {
                    deleteRow = '<a onclick="deleteRecord(' + msg[i].Id + ')" class="btn btn-xs btn-bricky tooltips" data-placement="top" data-original-title="حذف"><i class="fa fa-times fa fa-white"></i></a>';
                }

                table += '<tr>' +
                    '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                    '<td class="center"><label>' + (i + 1) + '</label></div></td>' +
                    '<td>' + msg[i].Title + '</td>' +
                    '<td>' + msg[i].Year + '</td>' +
                    '<td>' + msg[i].MonthNumber + '</td>' +
                    '<td>' + msg[i].StartDate + '</td>' +
                    '<td>' + msg[i].EndDate + '</td>' +
                    '<td>' + '<a href="' + msg[i].Link + '" target="_blank" >' + msg[i].Link + '</a></td>' +
                    '<td class="center">' +
                    '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                    editRow +
                    deleteRow +
                    '</div>' +
                    '</div></div>' +
                    '</td>' +
                    '</tr>';
            }

            table += '</tbody></table>';

            $('#divData').html(table);

            Main.init2();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });
}

function bindRecordToEdit(id) {
  
    ShowLoading();

    $("#EditMode").val(true);

    $("#container").load("TelegramLottery.aspx", function () {

        $("h1").text("ویرایش قرعه کشی ماهانه");

        $(".active").text("ویرایش قرعه کشی ماهانه");

        $("#btnSaveLottery").text("ثبت تغییرات");

        $("#DivCancel").show();

        $("#DivSave").removeClass("col-sm-offset-2");

        telegramLotteryId = id;
        
        $.ajax({
            type: "POST",
            url: "WebServices/TelegramLotteryWs.asmx/BindRecordToEdit",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {
             
                var msg = eval('(' + response.d + ')');
                if (msg.IsActive)
                    $("#drpStatus").val(1);
                else
                    $("#drpStatus").val(0);
                $("#txtTitle").val(msg.Title);
                $("#drpYear").val(msg.Year);
                $("#drpMonth").val(msg.MonthNumber);
                $("#txtStartDate").val(msg.StartDate);
                $("#txtStartTime").val(msg.StartTime);
                $("#txtEndDate").val(msg.EndDate);
                $("#txtEndTime").val(msg.EndTime);              
                $("#lblLink").val(msg.Link);

            },
            error: function (xhr) {
                MessageBox(5);
            },
            complete: function () {
                HideLoading();
            }
        });

    });

}

function deleteRecord(id) {

    var ans = confirm("آیا برای حذف رکورد مطمئن هستید؟");

    if (ans == true) {
        $.ajax({
            type: "POST",
            url: "WebServices/TelegramLotteryWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadTelegramLottery();

            },
            error: function (xhr) {
                MessageBox(5);
            },
            complete: function () {
                HideLoading();
            }
        });
    }
}

function deleteSelected(idList) {

    $.ajax({
        type: "POST",
        url: "WebServices/TelegramLotteryWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadTelegramLottery();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}
