var moduleId = -1;

$(document).ready(function () {

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("ModuleList.aspx");
    });

    $("#btnSaveModule").click(function () {

        if (ValidateData() == true) {

            $("#btnSaveModule").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            if ($("#EditMode").val() == "false") {

                insertModule($("#txtName").val(), $("#txtMenuContent").val(), $("#txtMenuScript").val());
            } else {

                updateModule(moduleId, $("#txtName").val(), $("#txtMenuContent").val(), $("#txtMenuScript").val());
            };
        }
    });

   
});

function insertModule(name, content, script) {

    var obj = new Object();

    obj.Name = name;
    obj.MenuContent = content;
    obj.MenuScript = script;

    $.ajax({
        type: "POST",
        url: "WebServices/ModuleWs.asmx/Insert",
        data: "{ moduleEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtName").val("");
            $("#txtMenuContent").val("");
            $("#txtMenuScript").val("");
            
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveModule').css({ "background": "#364F6A" });
        }
    });
}

function updateModule(id, name, content, script) {

    var obj = new Object();

    obj.Id = id;
    obj.Name = name;
    obj.MenuContent = content;
    obj.MenuScript = script;

    $.ajax({
        type: "POST",
        url: "WebServices/ModuleWs.asmx/Update",
        data: "{moduleEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("ModuleList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveModule').css({ "background": "#364F6A" });
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
