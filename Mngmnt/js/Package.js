var packageId = -1;
var groupId ;

$(document).ready(function () {

    LoadGroups();

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }
 
    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("PackageList.aspx");
    });

    $("#btnSavePackage").click(function () {

        if (ValidateData() == true) {

            $("#btnSavePackage").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });
          
            var price = $("#txtPrice").val().replace(/,/g, '');
         
            if ($("#EditMode").val() == "false") {

                insertPackage($("#txtName").val(), price, $("#txtMinResponse").val(), $("#txtMaxResponse").val(),
                    $("#txtDescription").val(), $("#drpGroup").val());
            } else {

                updatePackage(packageId, $("#txtName").val(), price, $("#txtMinResponse").val(), $("#txtMaxResponse").val(),
                    $("#txtDescription").val(), $("#drpGroup").val());
            }
        }
    });

    $('#txtPrice').keyup(function (s) {
        var x = $(this).val();
        $(this).val(x.toString().replace(/,/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ","));
    });

    $('#txtPrice').keydown(function (event) {
        if (event.keyCode == 46 || event.keyCode == 8 || event.keyCode == 9
            || event.keyCode == 27 || event.keyCode == 13
            || (event.keyCode == 65 && event.ctrlKey === true)
            || (event.keyCode >= 35 && event.keyCode <= 39)) {


            return;
        } else {
            if (event.shiftKey || (event.keyCode < 48 || event.keyCode > 57) && (event.keyCode < 96 || event.keyCode > 105)) {
                event.preventDefault();
            }
        }

    });

});

function LoadGroups() {

    $.ajax({
        type: "POST",
        url: "WebServices/PackageGroupWs.asmx/GetData",
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

            $("#drpGroup").append(drpGroup);

            if ($("#EditMode").val() == "true") {
                alert(groupId);
                $("#drpGroup").val(groupId);
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function insertPackage(name, price, minResponse,
    maxResponse, description, group) {
  
    var obj = new Object();

    obj.Name = name;
    obj.Price = price;
    obj.Discount = 1;
    obj.Expire = 1;
    obj.MinResponse = minResponse;
    obj.MaxResponse = maxResponse;   
    obj.Description = description;
    obj.GroupID = group;
    obj.Visibility = true;

    $.ajax({
        type: "POST",
        url: "WebServices/PackageWs.asmx/Insert",
        data: "{ packageEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtName").val("");
            $("#txtPrice").val("0");          
            $("#txtMinResponse").val("");
            $("#txtMaxResponse").val("");
            $("#txtDescription").val("");

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSavePackage').css({ "background": "#364F6A" });
        }
    });
}

function updatePackage(id, name, price, minResponse,
    maxResponse, description, group) {

    var obj = new Object();

    obj.Id = id;
    obj.Name = name;
    obj.Price = price;
    obj.Discount = 1;
    obj.Expire = 1;
    obj.MinResponse = minResponse;
    obj.MaxResponse = maxResponse;
    obj.Description = description;
    obj.GroupID = group;
    obj.Visibility = true;

    $.ajax({
        type: "POST",
        url: "WebServices/PackageWs.asmx/Update",
        data: "{packageEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("PackageList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSavePackage').css({ "background": "#364F6A" });
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