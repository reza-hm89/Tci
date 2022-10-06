var RowId = [];

$(document).ready(function () {

    LoadSlides();

    $("#btnNewSlide").click(function() {

        $("#container").load("Slide.aspx");
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

function checkUrl(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/SlideWs.asmx/CheckUrl",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            return msg;
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });
}

function LoadSlides() {

    $.ajax({
        type: "POST",
        url: "WebServices/SlideWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function(response) {
            var msg = eval('(' + response.d + ')');

            var table = '';

            if (ModulePermission.Delete == true) {
                $("#btnDelete").show();
            }

            for (var i = 0; i < msg.length; i++) {

                if (ModulePermission.Update == true) {
                    editRow = '<a onclick="bindRecordToEdit(' + msg[i].Id + ')"  href="#"><i class="clip-pencil-3 "></i></a>';
                }
                if (ModulePermission.Delete == true) {
                    deleteRow = '<a onclick="deleteRecord(' + msg[i].Id + ')" href="#"><i class="clip-close-2"></i></a>';
                }

                table += '<div class="col-md-3 col-sm-4 gallery-img">' +
                    '<div class="wrap-image">' +
                    '<a class="group1" href="images/' + msg[i].Image + '" target="_blank" title="' + msg[i].AlternativeText + '">' +
                    '<img src="images/' + msg[i].Image + '" alt="" class="img-responsive" style="width:339px; height:232px">' +
                    '</a>' +
                    '<div id="' + msg[i].Id + '" class="chkbox"></div>' +
                    '<div class="tools tools-bottom">' +
                    editRow +
                    deleteRow +
                    '</div>' +
                    '</div>' +
                    '</div>';

            }


            $("#divData").empty();
            $("#divData").append(table);

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



    $("#container").load("Slide.aspx", function () {

        $("h1").text("ویرایش اسلاید");

        $(".active").text("ویرایش اسلاید");

        $("#btnSaveSlide").text("ثبت تغییرات");

        $("#DivCancel").show();

        $("#DivSave").removeClass("col-sm-offset-2");

        slideId = id;

        $.ajax({
            type: "POST",
            url: "WebServices/SlideWs.asmx/BindRecordToEdit",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {
                var msg = eval('(' + response.d + ')');

                $("#txtUrl").val(msg[0].Image);
                $("#txtAlternative").val(msg[0].AlternativeText);
                $("#txtLink").val(msg[0].Link);
                $("#DrpOpenLink").val(msg[0].OpenLink);
                $("#txtShowTime").val(msg[0].ShowTime);
                $("#DrpLanguage").val(msg[0].LanguageID);
                $("#txtTitle1").val(msg[0].Title1);
                $("#txtTitle2").val(msg[0].Title2);
                $("#txtTitle3").val(msg[0].Title3);
            
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
            url: "WebServices/SlideWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadSlides();

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
        url: "WebServices/SlideWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadSlides();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}
