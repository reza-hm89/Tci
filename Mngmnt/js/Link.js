var linkId = -1;

$(document).ready(function () {

    LoadBuilder();

    LoadLanguageDropDown();

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("LinkList.aspx");
    });

    $("#btnSaveLink").click(function () {

        if (ValidateData() == true) {

            $("#btnSaveLink").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            if ($("#txtUrl").val() != "") {

                if ($("#EditMode").val() == "false") {
                    UploadImage();
                } else {
                    if (checkUrl(linkId) != $("#txtUrl").val()) {
                        UploadImage();
                    }
                }
            } else {
                if ($("#EditMode").val() == "false") {

                    insertLink($("#txtTitle").val(), $("#txtUrl").val(),
                        $("#txtLink").val(), $("#DrpOpenLink").val(), $("#DrpLanguage").val());
                } else {

                    updateLink(linkId, $("#txtTitle").val(), $("#txtUrl").val(),
                        $("#txtLink").val(), $("#DrpOpenLink").val(), $("#DrpLanguage").val());
                };
            }
        }

    });

    $("#btnAddImage, #txtUrl").click(function () {
        $("#FileUpload").click();
    });

    $("#FileUpload").change(function () {

        var files = $('#FileUpload')[0].files;
        for (var i = 0; i < files.length; i++) {
            $("#txtUrl").val(files[i].name);
        }
    });


    $("#DrpPageBuilder").change(function () {
        $("#txtLink").val("page.aspx?id=" + $(this).val());
    });
});

function LoadBuilder() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/PageWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var drpPage = "";

            for (var i = 0; i < msg.length; i++) {
                drpPage += '  <option value="' + msg[i].Id + '">' + msg[i].Title + '</option>';
            }

            $("#DrpPageBuilder").append(drpPage);

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });
}


function LoadLanguageDropDown() {

    $.ajax({
        type: "POST",
        url: "WebServices/LanguageWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var drpLanguage = "";

            for (var i = 0; i < msg.length; i++) {
                drpLanguage += '  <option value="' + msg[i].Id + '">' + msg[i].Name + '</option>';
            }

            $("#DrpLanguage").append(drpLanguage);

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function UploadImage() {

    ShowLoading();

    var uploadfiles = $("#FileUpload").get(0);
    var uploadedfiles = uploadfiles.files;
    var fromdata = new FormData();

    for (var i = 0; i < uploadedfiles.length; i++) {
        fromdata.append(uploadedfiles[i].name, uploadedfiles[i]);
    }


    var choice = {};
    choice.url = "Handler/ImageHandler.ashx";
    choice.type = "POST";
    choice.data = fromdata;
    choice.contentType = false;
    choice.processData = false;
    choice.success = function () {

        HideLoading();

        if ($("#EditMode").val() == "false") {

            insertLink($("#txtTitle").val(), $("#txtUrl").val(),
                $("#txtLink").val(), $("#DrpOpenLink").val(), $("#DrpLanguage").val());
        } else {

            updateLink(linkId, $("#txtTitle").val(), $("#txtUrl").val(),
                $("#txtLink").val(), $("#DrpOpenLink").val(), $("#DrpLanguage").val());
        };
    }

    $.ajax(choice);
    event.preventDefault();
}

function checkUrl(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/LinkWs.asmx/CheckUrl",
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

function insertLink(title, icon, link, openLink, languageId) {

    var obj = new Object();

    obj.Title = title;
    obj.Icon = icon;
    obj.Link = link;
    obj.OpenLink = openLink;
    obj.LanguageId = languageId;
    obj.Visibility = true;

    $.ajax({
        type: "POST",
        url: "WebServices/LinkWs.asmx/Insert",
        data: "{ linkEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtUrl").val("");
            $("#txtTitle").val("");
            $("#txtLink").val("");
          
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveLink').css({ "background": "#364F6A" });
        }
    });
}

function updateLink(id, title, icon, link, openLink, languageId) {

    var obj = new Object();

    obj.Id = id;
    obj.Title = title;
    obj.Icon = icon;
    obj.Link = link;
    obj.OpenLink = openLink;
    obj.LanguageId = languageId;

    $.ajax({
        type: "POST",
        url: "WebServices/LinkWs.asmx/Update",
        data: "{linkEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("linkList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveLink').css({ "background": "#364F6A" });
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