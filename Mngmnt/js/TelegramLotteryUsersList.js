var RowId = [];

$(document).ready(function () {

    LoadTelegramLotteryUserRegister();

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

function LoadTelegramLotteryUserRegister() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/TelegramLotteryUserRegisterWs.asmx/GetData",
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
                '<th>نام</th>' +
                '<th>نام خانوادگی</th>' +             
                '<th>تلفن ثابت</th>' +             
                '<th>شماره موبایل</th>' +            
                '<th>تاریخ ثبت نام</th>' +
                '<th>ساعت ثبت نام</th>' +
                //'<th>برنده قرعه کشی</th>' +
                //'<th>اعمال برنده</th>' +
                '<th><i class="fa fa-time"></i>حذف</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';


            if (ModulePermission.Delete == true) {
                $("#btnDelete").show();
            }

            var winner;
            for (var i = 0; i < msg.length; i++) {

                if (ModulePermission.Delete == true) {
                    deleteRow = '<a onclick="deleteRecord(' + msg[i].Id + ')" class="btn btn-xs btn-bricky tooltips" data-placement="top" data-original-title="حذف"><i class="fa fa-times fa fa-white"></i></a>';
                }


                if (msg[i].Winner == false) {
                    winner = '<a id="' + msg[i].Id + '" spellcheck="' + msg[i].Verify + '" class="btn btn-bricky Visibility" ><i class="fa fa-2x fa-times-circle fa fa-white"></i></a>';
                } else {
                    winner = '<a id="' + msg[i].Id + '" style="background-color:green; border:green" spellcheck="' + msg[i].Verify + '" class="btn btn-bricky Visibility" ><i class="fa fa-2x fa-check-circle fa fa-white"></i></a>';
                }

                table += '<tr>' +
                    '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                    '<td class="center"><label>' + (i + 1) + '</label></div></td>' +
                    '<td>' + msg[i].CustomerName + '</td>' +
                    '<td>' + msg[i].CustomerLastName + '</td>' +
                    '<td>' + msg[i].CustomerId + '</td>' +
                    '<td>' + msg[i].CustomerMobile + '</td>' +                 
                    '<td>' + msg[i].RegisterDate + '</td>' +
                    '<td>' + msg[i].RegisterTime + '</td>' +
                    //'<td>' + winner + '</td>' +
                    //'<td class="center">' +
                    //'<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                    //'<a onclick=ActiveWinner("' + msg[i].Id + '" target="_blank" class="btn btn-xs btn-green tooltips" data-placement="top" data-original-title="اعمال برتده"><i class="fa fa-group fa fa-white"></i></a>' +
                    //'</div></td>' +
                    '<td class="center">' +
                    '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
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

function deleteRecord(id) {

    var ans = confirm("آیا برای حذف رکورد مطمئن هستید؟");

    if (ans == true) {
        $.ajax({
            type: "POST",
            url: "WebServices/TelegramLotteryUserRegisterWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadTelegramLotteryUserRegister();

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
        url: "WebServices/TelegramLotteryUserRegisterWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadTelegramLotteryUserRegister();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}

function ActiveWinner() {
    
}