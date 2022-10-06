var RowId = [];

$(document).ready(function () {

    LoadLink();

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
        url: "WebServices/LinkWs.asmx/SetVisibility",
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

function LoadLink() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/LinkWs.asmx/GetData",
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
                '<th>آیکن</th>' +
                '<th>عنوان</th>' +
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

            for (var i = 0; i < msg.length; i++) {

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
                    '<td class="center" ><img style="width:100px; height:100px;" src="images/' + msg[i].Icon + '" alt="image"></td>' +
                    '<td>' + msg[i].Title + '</td>' +
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

    $("#container").load("Link.aspx", function () {

        $("h1").text("ویرایش لینک");

        $(".active").text("ویرایش لینک");

        $("#btnSaveLink").text("ثبت تغییرات");

        $("#DivCancel").show();

        $("#DivSave").removeClass("col-sm-offset-2");

        linkId = id;

        $.ajax({
            type: "POST",
            url: "WebServices/LinkWs.asmx/BindRecordToEdit",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {
                var msg = eval('(' + response.d + ')');

                $("#txtTitle").val(msg[0].Title);
                $("#txtUrl").val(msg[0].Icon);
                $("#txtLink").val(msg[0].Link);
                $("#DrpOpenLink").val(msg[0].OpenLink);               
                $("#DrpLanguage").val(msg[0].LanguageID);

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
            url: "WebServices/LinkWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadLink();

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
        url: "WebServices/LinkWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadLink();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}
