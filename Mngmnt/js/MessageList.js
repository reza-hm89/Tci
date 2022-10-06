var RowId = [];
var messageID = 0;

$(document).ready(function () {


    if ($("#EditMode").val() == "false") {
        LoadMessage();
    }

    $("#btnSendMessage").click(function () {
        if (ValidateData() == true) {
            insertMessage($("#txtName").val(), $("#txtEmail").val(), $("#txtBody").val());
        }
    });

    $("#btnSendReply").click(function () {
        if ($("#txtReply").val() != '' && messageID > 0) {
            insertReply(messageID, $("#txtReply").val());
        }
    });

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

function LoadMessage() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/MessageWs.asmx/GetData",
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
                '<th>دسته بندی</th>' +
                '<th>نام</th>' +
                '<th>شماره تماس</th>' +
                '<th>ایمیل</th>' +
                '<th>تاریخ ارسال</th>' +
                '<th>پرینت</th>' +
                '<th><i class="fa fa-time"></i>عملیات</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            if (ModulePermission.Delete == true) {
                $("#btnDelete").show();
            }

            for (var i = 0; i < msg.length; i++) {

                if (msg[i].UserGroupID == 0) {

                    if (ModulePermission.Update == true) {
                        editRow = '<a data-toggle="modal" onclick="bindRecordToEdit(' + msg[i].Id + ')" href="#myModal1" style="margin-left:3px" class="btn btn-xs btn-teal tooltips" data-placement="top" data-original-title="مشاهده"><i class="fa fa-edit"></i></a>';
                    }
                    if (ModulePermission.Delete == true) {
                        deleteRow = '<a onclick="deleteRecord(' + msg[i].Id + ')" class="btn btn-xs btn-bricky tooltips" data-placement="top" data-original-title="حذف"><i class="fa fa-times fa fa-white"></i></a>';
                    }


                    table += '<tr style="background-color: palevioletred">' +
                        '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                        '<td class="center"><label>' + (i + 1) + '</label></div></td>' +
                        '<td>' + msg[i].Category + '</td>' +
                        '<td>' + msg[i].Name + ' ' + msg[i].Family + '</td>' +
                        '<td>' + msg[i].Mobile + '</td>' +
                        '<td>' + msg[i].Email + '</td>' +
                        '<td>' + msg[i].SendDate + '</td>' +
                        '<td class="center">' +
                        '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                        '<a  href="ContactPrint.html?id=' + msg[i].Id + '" target="_blank" class="btn btn-xs"  ><i class="fa fa-edit "></i></a>' +
                        '</div></td>' +
                        '<td class="center">' +
                        '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                        editRow +
                        deleteRow + '</div>' +
                        '</div></div>' +
                        '</td>' +
                        '</tr>';
                }
                else if (msg[i].UserGroupID == 1 || msg[i].UserGroupID == null) {

                    if (ModulePermission.Update == true) {
                        editRow = '<a data-toggle="modal" onclick="bindRecordToEdit(' + msg[i].Id + ')" href="#myModal1" style="margin-left:3px" class="btn btn-xs btn-teal tooltips" data-placement="top" data-original-title="مشاهده"><i class="fa fa-edit"></i></a>';
                    }
                    if (ModulePermission.Delete == true) {
                        deleteRow = '<a onclick="deleteRecord(' + msg[i].Id + ')" class="btn btn-xs btn-bricky tooltips" data-placement="top" data-original-title="حذف"><i class="fa fa-times fa fa-white"></i></a>';
                    }


                    table += '<tr>' +
                        '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                        '<td class="center"><label>' + (i + 1) + '</label></div></td>' +
                        '<td>' + msg[i].Category + '</td>' +
                        '<td>' + msg[i].Name + ' ' + msg[i].Family + '</td>' +
                        '<td>' + msg[i].Mobile + '</td>' +
                        '<td>' + msg[i].Email + '</td>' +
                        '<td>' + msg[i].SendDate + '</td>' +
                        '<td class="center">' +
                        '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                        '<a  href="ContactPrint.html?id=' + msg[i].Id + '" target="_blank" class="btn btn-xs"  ><i class="fa fa-edit "></i></a>' +
                        '</div></td>' +
                        '<td class="center">' +
                        '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                        editRow +
                        deleteRow + '</div>' +
                        '</div></div>' +
                        '</td>' +
                        '</tr>';
                }

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

function insertMessage(name, mobile, email, title, body) {

    var obj = new Object();

    obj.Name = name;
    obj.Mobile = mobile;
    obj.Email = email;
    obj.Title = title;
    obj.Body = body;

    $.ajax({
        type: "POST",
        url: "mngmnt/WebServices/MessageWs.asmx/Insert",
        data: "{ messageEntity:" + JSON.stringify(obj) + ", fromSite:'false'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            if (msg == true) {
                alert("پیام شما با موفقیت ارسال شد");
            } else {
                alert("خطا در ارسال پیام. لطفا مجددا تلاش نمایید");
            }

            $("#txtName").val("");
            $("#txtEmail").val("");
            $("#txtBody").val("");

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function insertReply(id, text) {

    var obj = new Object();

    obj.Id = id;
    obj.Reply = text;


    $.ajax({
        type: "POST",
        url: "WebServices/MessageWs.asmx/InsertReply",
        data: "{ messageEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            if (msg == true) {
                alert("پیام شما با موفقیت ارسال شد");
            } else {
                alert("خطا در ارسال پیام. لطفا مجددا تلاش نمایید");
            }

            $("#txtReply").val("");

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function bindRecordToEdit(id) {

    ShowLoading();

    messageID = id;

    $.ajax({
        type: "POST",
        url: "WebServices/MessageWs.asmx/BindRecordToEdit",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            $("#txtName").text(msg[0].Name);
            $("#txtEmail").text(msg[0].Email);
            $("#txtBody").text("متن پیام : " + msg[0].Body);
            $("#txtUserIp").text("آی پی : " + msg[0].UserIp);
            $("#txtSendDate").text(msg[0].SendDate);

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
            url: "WebServices/MessageWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadMessage();

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
        url: "WebServices/MessageWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadMessage();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
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