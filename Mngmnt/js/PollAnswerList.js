var RowId = [];
var pollId;
pollAnswerId = -1;

$(document).ready(function () {

    if ($("#EditMode").val() == "false") {
        $("#DivSave1").addClass("col-sm-offset-1");
    }

    $("#div1").on("click", "#btnCancel1", function () {

        ChangeMode();
    });

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    $("#btnSavePollAnswer").click(function () {

        if (ValidateData1() == true) {
            
            $("#btnSavePollAnswer").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            if ($("#EditMode").val() == "false") {

                insertPollAnswer(pollId, $("#txtAnswer").val());
            } else {
                updatePollAnswer(pollAnswerId, pollId, $("#txtAnswer").val());
            }
        }

       

    });


    $("#btnDelete1").click(function () {

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

function ValidateData1() {

    var check = true;

    $(".InputRequire1").each(function () {

        if ($(this).val() == "") {
            check = false;
            $(this).css({ "border-color": "#fe0303" });
        } else {
            $(this).css({ "border-color": "#e4e8eb" });
        }
    });

    return check;
}

function ChangeMode() {

    $("#txtAnswer").val("");
   
    $("#EditMode").val(false);
    $("#DivCancel1").hide();
    $("#DivSave1").addClass("col-sm-offset-1");
    $("#btnSavePollAnswer").text("ثبت اطلاعات");
}

function insertPollAnswer(pollId, answer) {

    var obj = new Object();

    obj.PollsID = pollId;
    obj.Answer = answer;


    $.ajax({
        type: "POST",
        url: "WebServices/PollAnswerWs.asmx/Insert",
        data: "{ pollAnswerEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            LoadPollAnswer(pollId);

            ChangeMode();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSavePollAnswer').css({ "background": "#364F6A" });
        }
    });
}

function updatePollAnswer(id, pollId, answer) {

    var obj = new Object();

    obj.Id = id;
    obj.PollsID = pollId;
    obj.Answer = answer;
    
    $.ajax({
        type: "POST",
        url: "WebServices/PollAnswerWs.asmx/Update",
        data: "{pollAnswerEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            ChangeMode();

            LoadPollAnswer(pollId);
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSavePollAnswer').css({ "background": "#364F6A" });
        }
    });
}


function LoadPollAnswer(id) {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/PollAnswerWs.asmx/GetData",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var table = '<table class="table table-bordered table-hover" id="sample-table-1">' +
                '<thead>' +
                '<tr>' +
                 '<th class="center"><a spellcheck="false" id="SelectAll" class="btn btn-light-grey" style="background-color:lightgray; border-color:lightgray" ><i class="fa fa-square-o"></i></a></th>' +
                '<th class="center"><label>ردیف</label></div></th>' +
                '<th>عنوان</th>' +
                '<th>تعداد</th>' +
                '<th><i class="fa fa-time"></i>عملیات</th>' +
                '</tr>' +
                '</thead>' +
                '<tbody>';

            if (ModulePermission.Delete == true) {
                $("#btnDelete1").show();
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
                    '<td>' + msg[i].Answer + '</td>' +
                    '<td>' + msg[i].Count + '</td>' +
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

            $('#divData1').html(table);

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

function bindRecordToEdit(id) {

    ShowLoading();

    $("#EditMode").val(true);

    $("#btnSavePollAnswer").text("ثبت تغییرات");

    $("#DivCancel1").show();

    $("#DivSave1").removeClass("col-sm-offset-1");

    pollAnswerId = id;

    $.ajax({
        type: "POST",
        url: "WebServices/PollAnswerWs.asmx/BindRecordToEdit",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            $("#txtAnswer").val(msg[0].Answer);


        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });

}

function deleteRecord(id) {

    var ans = confirm("آیا برای حذف رکورد مطمئن هستید؟");

    if (ans == true) {
        $.ajax({
            type: "POST",
            url: "WebServices/PollAnswerWs.asmx/DeleteRecord",
            data: "{id:'" + id + "'}",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",
            success: function (response) {

                MessageBox(3);

                ChangeMode();

                LoadPollAnswer(pollId);

            },
            error: function (xhr) {
                MessageBox(5);
            },
            complete: function () {
                HideLoading();
            }
        });
    }
}

function deleteSelected(idList) {

    $.ajax({
        type: "POST",
        url: "WebServices/PollAnswerWs.asmx/DeleteMultiRecord",
        data: "{idList:" + JSON.stringify(idList) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            MessageBox(3);

            ChangeMode();

            LoadPollAnswer(pollId);
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
        }
    });
}
