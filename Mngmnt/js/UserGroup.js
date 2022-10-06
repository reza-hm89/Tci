var userGroupId = -1;

$(document).ready(function () {

    LoadUser();

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-sm-offset-2");
    }

    $("#btnCancel").click(function () {
        $("#container").load("UserGroupList.aspx");
    });

    $("#btnSaveUserGroup").click(function () {     

        if (ValidateData() == true) {

            $("#btnSaveUserGroup").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

        
            var items = new Array;

            $('.UserGroup').each(function () {
                if ($(this).is(":checked") == true) {

                    items.push($(this).val());
                }
            });

            items = $.grep(items, function (n) { return (n); });
           
            if ($("#EditMode").val() == "false") {

                insertUserGroup($("#txtName").val(), items);
            } else {

                updateUserGroup(userGroupId, $("#txtName").val(), items);
            }
        }
    });

});

function LoadUser() {

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var userGroup = '';

            for (var i = 0; i < msg.length; i++) {
                userGroup += '<div class="checkbox">' +
                    '<label>' +
                    msg[i].Username +
                    '<input type="checkbox" value="' + msg[i].Id + '" name="UserGroup" class="grey UserGroup">' +
                    '</label>' +
                    '</div>';
            }

            $("#UserGroups").append(userGroup);

            if ($("#EditMode").val() == "true") {

                $.ajax({
                    type: "POST",
                    url: "WebServices/UserGroupWs.asmx/LoadUsersGroup",
                    data: "{id:'" + userGroupId + "'}",
                    contentType: "application/json; charset=utf-8",
                    datatype: "jsondata",
                    async: "true",
                    success: function (response) {
                        var msg2 = eval('(' + response.d + ')');


                        $('.UserGroup').each(function() {
                            for (var j = 0; j < msg2.length; j++) {
                                if ($(this).val() == msg2[j].Id) {

                                    $(this).attr("checked", true);
                                    $(this).parent().addClass("checked");
                                    break;
                                }
                            }
                        });


                    },
                    error: function (xhr) {
                        MessageBox(5);
                    },
                    complete: function () {

                    }
                });
            }

            Main.init2();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function insertUserGroup(name, member) {

    var obj = new Object();

    obj.Name = name;   
    obj.Visibility = true;

    $.ajax({
        type: "POST",
        url: "WebServices/UserGroupWs.asmx/Insert",
        data: '{ userGroupEntity : ' + JSON.stringify(obj) + ', userId : ' + JSON.stringify(member) + '}',
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtName").val("");
           
            $('#UserGroups').each(function () {
                $(this).attr("checked", true);
                $(this).parent().addClass("checked");
            });
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveUserGroup').css({ "background": "#364F6A" });
        }
    });
}

function updateUserGroup(id, name, member) {

    var obj = new Object();

    obj.Id = id;
    obj.Name = name;   

    $.ajax({
        type: "POST",
        url: "WebServices/UserGroupWs.asmx/Update",
        data: '{ userGroupEntity : ' + JSON.stringify(obj) + ', userId : ' + JSON.stringify(member) + '}',
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("UserGroupList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveUserGroup').css({ "background": "#364F6A" });
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