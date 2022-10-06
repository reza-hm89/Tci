var RowId = [];

$(document).ready(function () {

    LoadNews();

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

function LoadNews() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/NewsWs.asmx/GetData",
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
                '<th>تصویر</th>' +
                '<th>تیتر</th>' +
                '<th>گروه خبری</th>' +
                '<th>تاریخ</th>' +
                '<th>وضعیت</th>' +
                '<th><i class="fa fa-time"></i>عملیات</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            if (ModulePermission.Delete == true) {
                $("#btnDelete").show();
            }

            var publishStatus = '';

            for (var i = 0; i < msg.length; i++) {

                if (ModulePermission.Update == true) {
                    editRow = '<a onclick="bindRecordToEdit(' + msg[i].Id + ')" style="margin-left:3px" class="btn btn-xs btn-teal tooltips" data-placement="top" data-original-title="مشاهده"><i class="fa fa-edit"></i></a>';
                }
                if (ModulePermission.Delete == true) {
                    deleteRow = '<a onclick="deleteRecord(' + msg[i].Id + ')" class="btn btn-xs btn-bricky tooltips" data-placement="top" data-original-title="حذف"><i class="fa fa-times fa fa-white"></i></a>';
                }

                if (msg[i].PublishStatus == 0) {
                    publishStatus = "پیش نویس";
                } else if (msg[i].PublishStatus == 1) {
                    publishStatus = "منتشر شده";
                } else if (msg[i].PublishStatus == 2) {
                    publishStatus = "انتشار در آینده";
                }

                table += '<tr>' +
                    '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                    '<td class="center"><label>' + (i + 1) + '</label></div></td>' +
                    '<td class="center" ><img style="width:100px; height:100px;" src="images/' + msg[i].Image + '" alt="image"></td>' +
                    '<td>' + msg[i].Titr + '</td>' +
                      '<td>' + msg[i].GroupName + '</td>' +
                    '<td>' + msg[i].PublishDate + '</td>' +
                    '<td>' + publishStatus + '</td>' +
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

    $("#container").load("News.aspx", function () {


        $("h1").text("ویرایش خبر");

        $(".active").text("ویرایش خبر");

        $("#btnSaveNews").text("ثبت تغییرات");

        $("#DivCancel").show();

        $("#DivSave").removeClass("col-sm-offset-2");

        newsId = id;


        $.ajax({
            type: "POST",
            url: "WebServices/NewsWs.asmx/BindRecordToEdit",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {
                var msg = eval('(' + response.d + ')');

                $("#txtRoTitr").val(msg[0].RoTitr);
                $("#txtTitr").val(msg[0].Titr);
                $("#txtZirTitr").val(msg[0].ZirTitr);
                $("#txtBody").val(msg[0].Body);

                CKEDITOR.instances['txtBody'].setData(msg[0].Body);

                $("#txtUrl").val(msg[0].Image);
                $("#txtKeywords").val(msg[0].Keywords);
                $("#DrpLanguage").val(msg[0].LanguageID);

                newsGroupId = msg[0].NewsGroupID;

                LoadNewsGroup();

                $(".PublishStatus").each(function () {

                    //$(this).attr("checked", false);
                    //$(this).parent().removeClass("checked");

                    if ($(this).val() == msg[0].PublishStatus) {
                        $(this).attr("checked", true);
                        $(this).parent().addClass("checked");
                    }
                });

                if (msg[0].ShowInSlide == true) {
                    $("#ShowInSlide").attr("checked", true);
                    $("#ShowInSlide").parent().addClass("checked");
                }

                if (msg[0].Special == true) {
                    $("#Special").attr("checked", true);
                    $("#Special").parent().addClass("checked");
                }

                if (msg[0].Comment == true) {
                    $("#Comment").attr("checked", true);
                    $("#Comment").parent().addClass("checked");
                }

                if (msg[0].Rate == true) {
                    $("#Rate").attr("checked", true);
                    $("#Rate").parent().addClass("checked");
                }


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
            url: "WebServices/NewsWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadNews();

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
        url: "WebServices/NewsWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadNews();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}
