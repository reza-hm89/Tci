var menuId = -1;

$(document).ready(function () {

    LoadLanguageDropDown();

    LoadBuilder();

    LoadMenuGroupDropDown();

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }
   

    $("#DrpPageBuilder").change(function () {
        $("#txtLink").val("page.aspx?id=" + $(this).val());
    });

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("MenuList.aspx");
    });

    $("#btnSaveMenu").click(function () {

        if (ValidateData() == true) {

            $("#btnSaveMenu").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });


            if ($("#EditMode").val() == "false") {

                insertMenu($("#txtName").val(), $("#DrpParent").val(),
                    $("#txtLink").val(), $("#DrpOpenLink").val(), $("#DrpLanguage").val(), $("#DrpMenuGroup").val());
            } else {

                updateMenu(menuId, $("#txtName").val(), $("#DrpParent").val(),
                    $("#txtLink").val(), $("#DrpOpenLink").val(), $("#DrpLanguage").val(), $("#DrpMenuGroup").val());
            }
        }
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

function LoadMenuGroupDropDown() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/MenuGroupWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var drpGroup = '';

            for (var i = 0; i < msg.length; i++) {
                drpGroup += '  <option value="' + msg[i].Id + '">' + msg[i].Name + '</option>';
            }

            $("#DrpMenuGroup").append(drpGroup);

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });
}

function LoadParentDropDown() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/MenuWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var drpParent = '  <option value="-1">ندارد</option>';;

            for (var i = 0; i < msg.length; i++) {
                drpParent += '  <option value="' + msg[i].Id + '">' + msg[i].Name + '</option>';
            }

            $("#DrpParent").append(drpParent);

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

    ShowLoading();

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
            if ($("#EditMode").val() == "false") {
                LoadParentDropDown();
            }
            HideLoading();
        }
    });
}

function insertMenu(name, parent, link, openLink, languageId, menuGroupId) {

    var obj = new Object();

    obj.Name = name;
    obj.Parent = parent;
    obj.Link = link;
    obj.OpenLink = openLink;
    obj.LanguageId = languageId;
    obj.MenuGroupId = menuGroupId;
    obj.Visibility = true;

    var addParam = $("#DrpPageParam").val();

    $.ajax({
        type: "POST",
        url: "WebServices/MenuWs.asmx/Insert",
        data: "{ menuEntity:" + JSON.stringify(obj) + " , addParam :" + addParam + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtName").val("");
            $("#txtLink").val("");

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveMenu').css({ "background": "#364F6A" });
        }
    });
}

function updateMenu(id, name, parent, link, openLink, languageId, menuGroupId) {

    var obj = new Object();

    obj.Id = id;
    obj.Name = name;
    obj.Parent = parent;
    obj.Link = link;
    obj.OpenLink = openLink;
    obj.MenuGroupId = menuGroupId;
    obj.LanguageId = languageId;

    var addParam = $("#DrpPageParam").val();

    $.ajax({
        type: "POST",
        url: "WebServices/MenuWs.asmx/Update",
        data: "{menuEntity:" + JSON.stringify(obj) + " , addParam :" + addParam + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("MenuList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveMenu').css({ "background": "#364F6A" });
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

    if ($("#DrpMenuGroup").val() == null) {

        MessageBox(6);
        check = false;
    }

    return check;
}