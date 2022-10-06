var RowId = [];

$(document).ready(function () {
  
    LoadModule();

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

function LoadModule() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/ModuleWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function(response) {
            var msg = eval('(' + response.d + ')');

            var table = '<table class="table table-bordered table-hover" id="sample-table-1">' +
                '<thead>' +
                '<tr>' +
                '<th class="center"><a spellcheck="false" id="SelectAll" class="btn btn-light-grey" style="background-color:lightgray; border-color:lightgray" ><i class="fa fa-square-o"></i></a></th>' +
                '<th class="center"><label>ردیف</label></div></th>' +
                '<th>نام</th>' +
                '<th><i class="fa fa-time"></i>عملیات</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            if (ModulePermission.Delete == true) {
                $("#btnDelete").show();
            }

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
                    '<td>' + msg[i].Name + '</td>' +
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
        error: function(xhr) {
            MessageBox(5);
        },
        complete: function() {
            HideLoading();
        }
    });
}

function bindRecordToEdit(id) {

    ShowLoading();

    $("#EditMode").val(true);

    $("#container").load("Module.aspx", function () {

        $("h1").text("ویرایش ماژول");

        $(".active").text("ویرایش ماژول");

        $("#btnSaveModule").text("ثبت تغییرات");

        $("#DivCancel").show();

        $("#DivSave").removeClass("col-sm-offset-2");

        moduleId = id;

        $.ajax({
            type: "POST",
            url: "WebServices/ModuleWs.asmx/BindRecordToEdit",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function(response) {
                var msg = eval('(' + response.d + ')');

                $("#txtName").val(msg[0].Name);
                $("#txtMenuContent").val(msg[0].MenuContent);
                $("#txtMenuScript").val(msg[0].MenuScript);

            },
            error: function(xhr) {
                MessageBox(5);
            },
            complete: function() {
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
            url: "WebServices/ModuleWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadModule();

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
        url: "WebServices/ModuleWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadModule();

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}
