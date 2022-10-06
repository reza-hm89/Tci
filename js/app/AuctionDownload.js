var fileUrl;

$(document).ready(function () {

    $("#btnInsertDownload").click(function () {

        if (ValidateData() == true) {

            Insert(GetParameterValues('id'), $("#txtName").val(), $("#txtFamily").val(),
                    $("#txtTel").val(), $("#txtDescription").val());
        }
    });


});

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}

function Insert(auctionId, name, family, tel, description) {

    var obj = new Object();

    obj.AuctionID = auctionId;
    obj.Name = name;
    obj.Family = family;
    obj.Tel = tel;
    obj.Description = description;

    $.ajax({
        type: "POST",
        url: "../mngmnt/WebServices/AuctionDownloadWs.asmx/Insert",
        data: "{auctionDownloadEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            if (msg == true) {

                LoadFile(auctionId);
            } else {

            }
        },
        error: function (xhr) {

        },
        complete: function () {

        }
    });
}

function LoadFile(auctionId) {


    $.ajax({
        type: "POST",
        url: "../mngmnt/WebServices/AuctionFilesWs.asmx/GetData",
        data: "{id:'" + auctionId + "',fromSite:'true'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            if (msg != "") {
                $("#ContentPlaceHolder_divDownloadForm").slideUp();
                $("#divShowDownloadFile").slideDown();

                var files = "";

                for (var i = 0; i < msg.length; i++) {
                    fileUrl = msg[i].Name;
                   
                    files += '<a  href="../mngmnt/asnad/' + fileUrl + '" target="_blank"> فایل ' + (i+1) + '</a><br/>';

                }
                $("#FileList").html(files);
            }

        },
        error: function (xhr) {

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