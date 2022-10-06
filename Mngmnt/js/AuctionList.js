var RowId = [];

$(document).ready(function () {

    LoadAuction();


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
        url: "WebServices/AuctionWs.asmx/SetVisibility",
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

function LoadAuction() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/AuctionWs.asmx/GetData",
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
                '<th>نوع</th>' +
                '<th>موضوع</th>' +
                '<th>شماره</th>' +
                '<th>مهلت دريافت سند</th>' +
                '<th>لیست دانلود کنندگان</th>' +
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

                if (msg[i].Kind == 2) {
                    kind = "مزایده";
                } else if (msg[i].Kind == 1) {
                    kind = "مناقصه";
                }

                table += '<tr>' +
                    '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                    '<td class="center"><label>' + (i + 1) + '</label></div></td>' +
                   '<td>' + kind + '</td>' +
                    '<td>' + msg[i].Subject + '</td>' +
                    '<td>' + msg[i].Number + '</td>' +
                   '<td>' + msg[i].StartRecieveDate + '</td>' +
                    '<td><a onclick="ShowDownloader(' + msg[i].Id + ')" ' +
                    'style="margin-left:3px" class="btn btn-xs btn-teal tooltips" data-placement="top" data-original-title="مشاهده"><i class="fa fa-edit"></i></a>' +
                    '</td>' +
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

function ShowDownloader(id) {

    ShowLoading();
   
    $("#container").load("AuctionDownloader.aspx", function () {
       
        auctionId = id;

        LoadAuctionDownloader(auctionId);

    });

}

function bindRecordToEdit(id) {

    ShowLoading();

    $("#EditMode").val(true);

    $("#container").load("Auction.aspx", function () {

        window.Dropzone.discover();

        $("h1").text("ویرایش مزایده/مناقصه");

        $(".active").text("ویرایش مزایده/مناقصه");

        $("#btnSaveAuction").text("ثبت تغییرات");

        $("#DivCancel").show();

        $("#DivSave").removeClass("col-sm-offset-2");

        auctionId = id;

        $.ajax({
            type: "POST",
            url: "WebServices/AuctionWs.asmx/BindRecordToEdit",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {
                var msg = eval('(' + response.d + ')');

                $("#drpAuctionGroup").val(msg[0].AuctionGroupID);
                $("#DrpKind").val(msg[0].Kind);
                $("#txtSubject").val(msg[0].Subject);
                $("#txtNumber").val(msg[0].Number);
                $("#txtRegDate").val(msg[0].RegDate);
                $("#StartRecieveDate").val(msg[0].StartRecieveDate);
                $("#EndRecieveDate").val(msg[0].EndRecieveDate);
                $("#SendDate").val(msg[0].SendDate);
                $("#ReOpeningDate").val(msg[0].ReOpeningDate);
                $("#txtDescription").val(msg[0].Description);
                CKEDITOR.instances['txtDescription'].setData(msg[0].Description);

                GetImages(auctionId);
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
            url: "WebServices/AuctionWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadAuction();

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
        url: "WebServices/AuctionWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadAuction();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}
