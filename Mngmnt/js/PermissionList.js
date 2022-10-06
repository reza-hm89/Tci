var Group_User = false; //   false = group / true = user

var userId = -1, groupId = -1, selectedId = -1;

$(document).ready(function () {
   
    LoadModules();

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    $("#divData").on("click", ".Allshow", function () {

        $(".show").each(function () {
            $(this).attr("checked", true);
            $(this).parent().addClass("checked");
        });
    });

    $("#divData").on("click", ".Allinsert", function () {

        $(".insert").each(function () {
            $(this).attr("checked", true);
            $(this).parent().addClass("checked");
        });
    });

    $("#divData").on("click", ".Allupdate", function () {

        $(".update").each(function () {
            $(this).attr("checked", true);
            $(this).parent().addClass("checked");
        });
    });

    $("#divData").on("click", ".Alldelete", function () {

        $(".delete").each(function () {
            $(this).attr("checked", true);
            $(this).parent().addClass("checked");
        });
    });

    $("#btnChangeRadio").click(function() {

        ShowLoading();

        if ($("#radioUsers").is("input:checked") == true) {
            LoadUsers();

            Group_User = true;
            groupId = -1;
        }

        if ($("#radioGroups").is("input:checked") == true) {
            LoadGroups();

            Group_User = false;
            userId = -1;
        }

    });

    $("#drpSelected").change(function() {
      
        ShowLoading();

        if (Group_User == false) {
            groupId = $(this).val();

            bindPermission(groupId, Group_User);

        } else if (Group_User == true) {
            userId = $(this).val();

            bindPermission(userId, Group_User);
        }
    });

    $("#btnSelectAll").click(function () {
        $("input:checkbox").attr("checked", true);       
        $("input:checkbox").parent().addClass("checked");
    });

    $("#btnDeselectAll").click(function () {
        $("input:checkbox").attr("checked", false);
        $("input:checkbox").parent().removeClass("checked");
    });
 
    $("#btnSavePermission").click(function () {

        if (userId == -1 && groupId == -1) {

            alert("لطفا گروه کاربری یا کاربر را از  لیست انتخاب نمایید");
        } else {

            ShowLoading();

            $("tbody tr").each(function() {

                var page = this.id;
                var del = $(this).find(".delete").parent().hasClass("checked");
                var update = $(this).find(".update").parent().hasClass("checked");
                var insert = $(this).find(".insert").parent().hasClass("checked");
                var show = $(this).find(".show").parent().hasClass("checked");


                Insert(page, userId, groupId, show, insert, update, del, Group_User);

            });

            GetPermissions(); // for update UserPermission property
        }
    });

});


function LoadModules()
{
    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/ModuleWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var table = '<table class="table table-bordered table-hover" id="sample-table-1">' +
                '<thead>' +
                '<tr>' +
                '<th class="center"><label>ردیف</label></div></th>' +
                '<th>نام ماژول</th>' +
                '<th>مجوز نمایش</th>' +
                '<th>مجوز ثبت</th>' +
                '<th>مجوز ویرایش</th>' +
                '<th>مجوز حذف</th>' +
                '<th><i class="fa fa-time"></i>ذخیره مجوز</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>' +

                '<tr id="0">' +
                '<td class="center"></td>' +
                '<td></td>' +
                '<td class="center"><div class="button-table"><label><input type="button" value="انتخاب همه" class="flat-grey Allshow"></label></div></td>' +
                '<td class="center"><div class="button-table"><label><input type="button" value="انتخاب همه" class="flat-grey Allinsert"></label></div></td>' +
                '<td class="center"><div class="button-table"><label><input type="button" value="انتخاب همه" class="flat-grey Allupdate"></label></div></td>' +
                '<td class="center"><div class="button-table"><label><input type="button" value="انتخاب همه" class="flat-grey Alldelete"></label></div></td>' +
                '<td class="center">' +                
                '</td>' +
                '</tr>';
        
            for (var i = 0; i < msg.length; i++) {

                table += '<tr id="' + msg[i].Id + '">' +
                    '<td class="center"><label>'+(i+1)+'</label></div></td>' +
                    '<td>' + msg[i].Name + '</td>' +
                    '<td class="center"><div class="checkbox-table"><label><input type="checkbox" class="flat-grey show"></label></div></td>' +
                    '<td class="center"><div class="checkbox-table"><label><input type="checkbox" class="flat-grey insert"></label></div></td>' +
                    '<td class="center"><div class="checkbox-table"><label><input type="checkbox" class="flat-grey update"></label></div></td>' +
                    '<td class="center"><div class="checkbox-table"><label><input type="checkbox" class="flat-grey delete"></label></div></td>' +
                    '<td class="center">' +
                    '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                    '<a onclick="Update(' + msg[i].Id + ')" style="margin-left:3px" class="btn btn-md" ><i class="fa fa-save fa-2x"></i></a>' +
                    '</div>' +
                    '</div></div>' +
                    '</td>' +
                    '</tr>';
            }

            table += '</tbody></table>';

            $('#divData').html(table);
            $("#divData").slideDown("slow");
                       
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

function LoadGroups() {

    $.ajax({
        type: "POST",
        url: "WebServices/UserGroupWs.asmx/GetData",
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

            $("#drpSelected").empty();
            $("#drpSelected").append(drpGroup);

            if (msg[0]!=null) {
                groupId = msg[0].Id;
            }
           


        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            bindPermission(groupId, Group_User);
        }
    });
}

function LoadUsers() {

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var drpGroup = '';

            for (var i = 0; i < msg.length; i++) {
                drpGroup += '  <option value="' + msg[i].Id + '">' + msg[i].Username + '</option>';
            }

            $("#drpSelected").empty();
            $("#drpSelected").append(drpGroup);

            userId = msg[0].Id;
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            bindPermission(userId, Group_User);
        }
    });
}

function bindPermission(Id, group_user) {

    Group_User = group_user;

    if (group_user == false) {

        groupId = Id;
    }
    else {
        userId = Id;
    }

    $.ajax({
        type: "POST",
        url: "WebServices/PermissionWs.asmx/GetData",
        data: "{groupId:'" + Id + "', group_user:'" + group_user + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            ClearCheckbBox();

            for (var i = 0; i < msg.length; i++) {

                $("tbody tr").each(function() {
                 
                    if (msg[i].ModuleID == this.id) {

                        if (msg[i].Show == true) {

                            $(this).find(".show").attr("checked", true);
                            $(this).find(".show").parent().addClass("checked");
                        }
                        if (msg[i].Insert == true) {
                            $(this).find(".insert").attr("checked", true);
                            $(this).find(".insert").parent().addClass("checked");
                        }
                        if (msg[i].Update == true) {
                            $(this).find(".update").attr("checked", true);
                            $(this).find(".update").parent().addClass("checked");
                        }
                        if (msg[i].Delete == true) {
                            $(this).find(".delete").attr("checked", true);
                            $(this).find(".delete").parent().addClass("checked");
                        }
                    }

                });
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

function Insert(pageId, userId, groupId, show, insert, update, del, selected) {

   
    $.ajax({
        type: "POST",
        url: "WebServices/PermissionWs.asmx/Insert",
        data: "{moduleId: '" + pageId + "', userId:'" + userId + "', groupId:'" + groupId + "', insert:'" + insert + "', " +
            "update:'" + update + "', delete:'" + del + "' , show:'" + show + "' , selected:'" + selected + "' }",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "false",
        success: function (response) {

            ClearCheckbBox();
           
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
         
            HideLoading();
        }
    });
}

function Update(pageId) {

    ShowLoading();

    var del, update, insert, show;

    $("tbody tr").each(function() {

        if (this.id == pageId) {

            del = $(this).find(".delete").parent().hasClass("checked");
            update = $(this).find(".update").parent().hasClass("checked");
            insert = $(this).find(".insert").parent().hasClass("checked");
            show = $(this).find(".show").parent().hasClass("checked");

        }

    });

    $.ajax({
        type: "POST",
        url: "WebServices/PermissionWs.asmx/Update",
        data: "{ moduleId: '" + pageId + "', userId:'" + userId + "', groupId:'" + groupId + "', insert:'" + insert + "', update:'" + update + "', delete:'" + del + "' , show:'" + show + "' , selected:'" + Group_User + "' }",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "false",
        success: function (response) {

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
           
            HideLoading();
        }
    });
}

function ClearCheckbBox() {

    
    $("tbody tr").each(function () {

        $(this).find(".show").attr("checked", false);
        $(this).find(".show").parent().removeClass("checked");

        $(this).find(".insert").attr("checked", false);
        $(this).find(".insert").parent().removeClass("checked");

        $(this).find(".update").attr("checked", false);
        $(this).find(".update").parent().removeClass("checked");

        $(this).find(".delete").attr("checked", false);
        $(this).find(".delete").parent().removeClass("checked");
    });
}