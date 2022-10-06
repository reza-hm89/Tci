var packageGroupId = -1;

$(document).ready(function () {

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("PackageGroupList.aspx");
    });

    $("#btnSavePackageGroup").click(function () {

        if (ValidateData() == true) {

            $("#btnSavePackageGroup").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });


            if ($("#EditMode").val() == "false") {

                insertPackageGroup($("#txtName").val(), CKEDITOR.instances['txtBody'].getData());
            } else {

                updatePackageGroup(packageGroupId, $("#txtName").val(), CKEDITOR.instances['txtBody'].getData());
            }
        }
    });


});

function insertPackageGroup(name, description) {

    var obj = new Object();

    obj.Name = name;
    obj.Description = description;
    obj.Visibility = true;


    $.ajax({
        type: "POST",
        url: "WebServices/PackageGroupWs.asmx/Insert",
        data: "{ packageGroupEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtName").val("");
            $("#txtDescription").val("");

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSavePackageGroup').css({ "background": "#364F6A" });
        }
    });
}

function updatePackageGroup(id, name, description) {

    var obj = new Object();

    obj.Id = id;
    obj.Name = name;
    obj.Description = description;

    $.ajax({
        type: "POST",
        url: "WebServices/PackageGroupWs.asmx/Update",
        data: "{packageGroupEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("PackageGroupList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSavePackageGroup').css({ "background": "#364F6A" });
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