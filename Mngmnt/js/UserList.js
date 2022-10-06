
var RowId = new Array;

$(document).ready(function() {

    LoadUser();   

    $("#btnDelete").click(function () {

        var cnt = 0;
       
        $("input:checkbox").not("#allChecktic").each(function () {

            if ($(this).parent("div").hasClass("checked") == true) {

                RowId.push($(this).attr('id'));
                cnt++;
            }
        });
       
        if (cnt > 0) {

            var ans = confirm("آیا برای حذف  " + cnt + " رکورد انتخاب شده مطمئن هستید؟");

            if (ans == true) {

                ShowLoading();

                deleteSelected(RowId);
            }
        }
    });

});

function LoadUser() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function(response) {
            var msg = eval('(' + response.d + ')');

            var table = '<table class="table table-bordered table-hover" id="sample-table-1">' +
                '<thead>' +
                '<tr>' +
                '<th class="center"><a spellcheck="false" id="SelectAll" class="btn btn-light-grey" style="background-color:lightgray; border-color:lightgray" ><i class="fa fa-square-o"></i></a></th>' +
                '<th class="center"><label>ردیف</label></div></th>' +
                '<th>تصویر</th>' +
                '<th>نام کاربری</th>' +
                '<th>تاریخ آخرین ورود</th>' +
                '<th>تاریخ آخرین خروج</th>' +
                 '<th>مشاهده زیر مجموعه</th>' +
                '<th><i class="fa fa-time"></i>عملیات</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            if (ModulePermission.Delete == true) {
                $("#btnDelete").show();
            }

            for (var i = 0; i < msg.length; i++) {

                if (ModulePermission.Update == true) {
                    editRow = '<a onclick="bindRecordToEdit(' + msg[i].Id + ')" style="margin-left:3px" class="btn btn-xs btn-teal tooltips" data-placement="top" data-original-title="مشاهده"><i class="fa fa-edit"></i></a>';
                }
                if (ModulePermission.Delete == true) {
                    deleteRow = '<a onclick="deleteRecord(' + msg[i].Id + ')" class="btn btn-xs btn-bricky tooltips" data-placement="top" data-original-title="حذف"><i class="fa fa-times fa fa-white"></i></a>';
                }

                table += '<tr>' +
                    '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                    '<td class="center"><label>' + (i + 1) + '</label></div></td>' +
                    '<td class="center" ><img style="width:100px; height:100px;" src="images/' + msg[i].ImageUrl + '" alt="image"></td>' +
                    '<td>' + msg[i].Username + '</td>' +
                    '<td>' + msg[i].LoginDate + '</td>' +
                    '<td>' + msg[i].LogoutDate + '</td>' +
                     '<td class="center">' +
                    '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                    '<a href="UserChart.aspx?id=' + msg[i].Id + '" target="_blank" class="btn btn-xs btn-green tooltips" data-placement="top" data-original-title="مشاهده زیر مجموعه"><i class="fa fa-group fa fa-white"></i></a>' +
                    '</div></td>' +
                    '<td class="center">' +
                    '<div class="visible-md visible-lg hidden-sm hidden-xs">' +
                    editRow +
                    deleteRow +
                    '</div>' +
                    '</div></div>' +
                    '</td>' +
                    '</tr>';
            }

            table += '</tbody></table>';

            $('#divData').html(table);

            Main.init2();
        },
        error: function(xhr) {
            MessageBox(5);
        },
        complete: function() {

            HideLoading();
        }
    });
}

function bindRecordToEdit(id) {

    ShowLoading();

    $("#EditMode").val(true);

   

    $("#container").load("User.aspx", function() {
        
        $("h1").text("ویرایش کاربر");

       
        $("#btnSaveUser").text("ثبت تغییرات");

        $("#DivCancel").show();

        $("#DivSave").removeClass("col-sm-offset-2");

        userId = id;

        $.ajax({
            type: "POST",
            url: "WebServices/UserWs.asmx/BindRecordToEdit",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {
                var msg = eval('(' + response.d + ')');

                $("#txtName").val(msg[0].Name);
                $("#txtFamily").val(msg[0].Family);               
                $("#txtAddress").val(msg[0].Address);
                $("#txtTel").val(msg[0].Tel);
                $("#txtUrl").val(msg[0].ImageUrl);
                $("#txtWebsite").val(msg[0].Website);
                $("#txtEmail").val(msg[0].Email);
                $("#txtTwitter").val(msg[0].Twitter);
                $("#txtFacebook").val(msg[0].Facebook);
                $("#txtGooglePlus").val(msg[0].GooglePlus);
                $("#txtGithub").val(msg[0].Github);
                $("#txtLinkedin").val(msg[0].Linkedin);
                $("#txtSkype").val(msg[0].Skype);               
                $("#birthDay").val(msg[0].Birthday);
                $("#txtCity").val(msg[0].City);
                $("#txtZipCode").val(msg[0].ZipCode);
                $("#txtUsername").val(msg[0].Username);
                $("#txtPassword").val(msg[0].Password);
                $("#txtRepeatPassword").val(msg[0].Password);
                $("#txtDescription").val(msg[0].Description);
                $("#drpUsers").val(msg[0].ParentID);
                $("#txtCardNumber").val(msg[0].CardNumber);
                $("#txtAccountNumber").val(msg[0].AccountNumber);

                if (msg[0].Gender == false) {
                    $("#gender_female").attr("checked", true);
                }
                if (msg[0].Gender == true) {
                    $("#gender_male").attr("checked", true);
                }

            
            },
            error: function (xhr) {
                MessageBox(5);
            },
            complete: function () {
                HideLoading();
            }
        });

    });   
}

function deleteRecord(id) {

    var ans = confirm("آیا برای حذف رکورد مطمئن هستید؟");

    if (ans == true) {
        $.ajax({
            type: "POST",
            url: "WebServices/UserWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                LoadUser();               

            },
            error: function (xhr) {
                MessageBox(5);
            },
            complete: function() {
                HideLoading();
            }
        });
    }
}

function deleteSelected(idList) {
   
    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            LoadUser();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
           
        }
    });
}