var agentId = -1;

$(document).ready(function () {

    LoadLanguageDropDown();

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("AgentList.aspx");
    });

    $("#btnSaveAgent").click(function () {

        if (ValidateData() == true) {

            $("#btnSaveAgent").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            if ($("#txtUrl").val() != "") {

                if ($("#EditMode").val() == "false") {
                    UploadImage();
                } else {
                    if (checkUrl(agentId) != $("#txtUrl").val()) {
                        UploadImage();
                    }
                }
            } else {
                if ($("#EditMode").val() == "false") {

                    insertAgent($("#txtName").val(), $("#txtCompany").val(),
                        $("#txtCode").val(), $("#txtActivity").val(), $("#txtAddress").val()
                        , $("#txtTel").val(), $("#txtMobile").val(), $("#txtUrl").val()
                        , $("#DrpLanguage").val());
                } else {

                    updateAgent(agentId, $("#txtName").val(), $("#txtCompany").val(),
                        $("#txtCode").val(), $("#txtActivity").val(), $("#txtAddress").val()
                        , $("#txtTel").val(), $("#txtMobile").val(), $("#txtUrl").val()
                        , $("#DrpLanguage").val());
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

            insertAgent($("#txtName").val(), $("#txtCompany").val(),
                $("#txtCode").val(), $("#txtActivity").val(), $("#txtAddress").val()
                , $("#txtTel").val(), $("#txtMobile").val(), $("#txtUrl").val()
                , $("#DrpLanguage").val());
        } else {

            updateAgent(agentId, $("#txtName").val(), $("#txtCompany").val(),
                $("#txtCode").val(), $("#txtActivity").val(), $("#txtAddress").val()
                , $("#txtTel").val(), $("#txtMobile").val(), $("#txtUrl").val()
                , $("#DrpLanguage").val());
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
        url: "WebServices/AgentWs.asmx/CheckUrl",
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

function insertAgent(name, company, code, activity, address, tel, mobile, image, languageId) {

    var obj = new Object();

    obj.Name = name;
    obj.Company = company;
    obj.Code = code;
    obj.Activity = activity;
    obj.Address = address;
    obj.Tel = tel;
    obj.Mobile = mobile;
    obj.Image = image;
    obj.LanguageId = languageId;
    obj.Visibility = true;

    $.ajax({
        type: "POST",
        url: "WebServices/AgentWs.asmx/Insert",
        data: "{ agentEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtName").val("");
            $("#txtCompany").val("");
            $("#txtCode").val("");
            $("#txtActivity").val("");
            $("#txtAddress").val("");                
            $("#txtTel").val("");
            $("#txtMobile").val("");
            $("#txtUrl").val("");                
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveAgent').css({ "background": "#364F6A" });
        }
    });
}

function updateAgent(id, name, company, code, activity, address, tel, mobile, image, languageId) {

    var obj = new Object();

    obj.Id = id;
    obj.Name = name;
    obj.Company = company;
    obj.Code = code;
    obj.Activity = activity;
    obj.Address = address;
    obj.Tel = tel;
    obj.Mobile = mobile;
    obj.Image = image;
    obj.LanguageId = languageId;

    $.ajax({
        type: "POST",
        url: "WebServices/AgentWs.asmx/Update",
        data: "{agentEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("AgentList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveAgent').css({ "background": "#364F6A" });
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