var ourServiceId = -1;

$(document).ready(function () {
   
    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("OurServiceList.aspx");
    });

    $("#btnSaveOurService").click(function () {

        if (ValidateData() == true) {

            $("#btnSaveOurService").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            if ($("#txtUrl").val() != "") {

                if ($("#EditMode").val() == "false") {
                    UploadImage();
                } else {
                    if (checkUrl(ourServiceId) != $("#txtUrl").val()) {
                        UploadImage();
                    }
                }
            } else {
                if ($("#EditMode").val() == "false") {

                    insertOurService($("#txtTitle").val(), $("#txtDescription").val(),
                        1, $("#txtUrl").val());
                } else {

                    updateOurService(ourServiceId, $("#txtTitle").val(), $("#txtDescription").val(),
                       1, $("#txtUrl").val());
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

});

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

            insertOurService($("#txtTitle").val(), $("#txtDescription").val(),
                1, $("#txtUrl").val());
        } else {

            updateOurService(ourServiceId, $("#txtTitle").val(), $("#txtDescription").val(),
               1, $("#txtUrl").val());
        };
    }
    choice.error = function () {
        MessageBox(5);
    }

    $.ajax(choice);
    event.preventDefault();
}

function checkUrl(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/OurServiceWs.asmx/CheckUrl",
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

function insertOurService(title, description, priority, image) {

    var obj = new Object();

    obj.Title = title;
    obj.Description = description;
    obj.Priority = priority;
    obj.Image = image;
    obj.Visibility = true;

    $.ajax({
        type: "POST",
        url: "WebServices/OurServiceWs.asmx/Insert",
        data: "{ ourServiceEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtTitle").val("");
            $("#txtDescription").val("");
            $("#txtPriority").val("");
            $("#txtUrl").val("");
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveOurService').css({ "background": "#364F6A" });
        }
    });
}

function updateOurService(id, title, description, priority, image) {

    var obj = new Object();

    obj.ID = id;
    obj.Title = title;
    obj.Description = description;
    obj.Priority = priority;
    obj.Image = image;
   
    $.ajax({
        type: "POST",
        url: "WebServices/OurServiceWs.asmx/Update",
        data: "{ourServiceEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("OurServiceList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveOurService').css({ "background": "#364F6A" });
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