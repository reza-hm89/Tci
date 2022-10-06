var RowId = [];

$(document).ready(function () {

    LoadMenu();

    $("#divData").on("click", ".Visibility", function () {

        ShowLoading();

        if ($(this).attr("spellcheck") == "false") {
            $(this).css({ "background-color": "green", "border-color": "green" });
            $(this).empty();
            $(this).append('<i class="fa fa-2x fa-check-circle fa fa-white"></i>');
            $(this).attr("spellcheck", "true");
        } else {
            $(this).css({ "background-color": "#C83A2A", "border-color": "#C83A2A" });
            $(this).empty();
            $(this).append('<i class="fa fa-2x fa-times-circle fa fa-white"></i>');
            $(this).attr("spellcheck", "false");
        }

        SetVisibility(this.id, $(this).attr("spellcheck"));

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

function SetVisibility(id, visibility) {

    $.ajax({
        type: "POST",
        url: "WebServices/MenuWs.asmx/SetVisibility",
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

function LoadMenu() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/MenuWs.asmx/GetData",
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
                '<th>عنوان</th>' +
                '<th>گروه منو</th>' +
                '<th>منوی والد</th>' +
                '<th>لینک</th>' +
                '<th>وضعیت نمایش</th>' +
                '<th><i class="fa fa-time"></i>عملیات</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            if (ModulePermission.Delete == true) {
                $("#btnDelete").show();
            }

            var visibility;

            var parent = '';

            for (var i = 0; i < msg.length; i++) {

                parent = msg[i].ParentName;

                if (msg[i].ParentName == null) {
                    parent = "ندارد";
                }

                if (ModulePermission.Update == true) {
                    editRow = '<a onclick="bindRecordToEdit(' + msg[i].Id + ')" style="margin-left:3px" class="btn btn-xs btn-teal tooltips" data-placement="top" data-original-title="مشاهده"><i class="fa fa-edit"></i></a>';
                }
                if (ModulePermission.Delete == true) {
                    deleteRow = '<a onclick="deleteRecord(' + msg[i].Id + ')" class="btn btn-xs btn-bricky tooltips" data-placement="top" data-original-title="حذف"><i class="fa fa-times fa fa-white"></i></a>';
                }

                if (msg[i].Visibility == false) {
                    visibility = '<a id="' + msg[i].Id + '" spellcheck="' + msg[i].Verify + '" class="btn btn-bricky Visibility" ><i class="fa fa-2x fa-times-circle fa fa-white"></i></a>';
                } else {
                    visibility = '<a id="' + msg[i].Id + '" style="background-color:green; border:green" spellcheck="' + msg[i].Verify + '" class="btn btn-bricky Visibility" ><i class="fa fa-2x fa-check-circle fa fa-white"></i></a>';
                }

                table += '<tr>' +
                    '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                    '<td class="center"><label>' + (i + 1) + '</label></div></td>' +
                    '<td>' + msg[i].Name + '</td>' +
                    '<td>' + msg[i].MenuGroup + '</td>' +
                    '<td>' + parent + '</td>' +
                    '<td>' + msg[i].Link + '</td>' +
                   '<td class="center">' + visibility + '</td>' +
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

    $("#container").load("MenuBuilder.aspx", function () {

        $("h1").text("ویرایش منو");

        $(".active").text("ویرایش منو");

        $("#btnSaveMenu").text("ثبت تغییرات");

        $("#DivCancel").show();

        $("#DivSave").removeClass("col-sm-offset-2");

        menuId = id;

        LoadParentDropDown();

        $.ajax({
            type: "POST",
            url: "WebServices/MenuWs.asmx/BindRecordToEdit",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {
                var msg = eval('(' + response.d + ')');

                $("#txtName").val(msg[0].Name);
                $("#DrpParent").val(msg[0].Parent);
                $("#txtLink").val(msg[0].Link);
                $("#DrpOpenLink").val(msg[0].OpenLink);
                $("#DrpLanguage").val(msg[0].LanguageID);
                $("#DrpMenuGroup").val(msg[0].MenuGroupID);

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
            url: "WebServices/MenuWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadMenu();

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
        url: "WebServices/MenuWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadMenu();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}
