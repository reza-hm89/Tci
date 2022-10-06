
$(document).ready(function () {
    $("#btnSendMessage").click(function () {
        if (ValidateData() == true) {

            var kind = "";

            if ($("#chk1").is(":checked")==true) {
                kind += 'نوآوری در محصول ,';
            }
            if ($("#chk2").is(":checked") == true) {
                kind += 'نوآوری در فرآیند ,';
            }
            if ($("#chk3").is(":checked") == true) {
                kind += 'نوآوری در عملکرد';
            }
            insertMessage($("#txtTitle").val(), $("#txtName").val(), $("#txtMobile").val()
                , $("#txtEmail").val(), $("#txtTel").val(), $("#txtIdea").val(), kind,
                $("#txtDescription").val(), $("#txtAdvantage").val());
        }
    });

   
});

function insertMessage(title, name, mobile, email, tel, idea,kind, desc, advantage) {

    var obj = new Object();

    obj.Name = name;
    obj.Tel = tel;
    obj.Mobile = mobile;
    obj.Email = email;
    obj.Title = title;
    obj.Idea = idea;
    obj.Kind = kind;
    obj.Description = desc;
    obj.Advantage = advantage;

    // ob.FileUrl = fileUrl;


    $.ajax({
        type: "POST",
        url: "WebServices/IdeaWs.asmx/Insert",
        data: "{ ideaEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            //var msg = eval('(' + data.d + ')');
            var msg = data.d;

            if (msg == "") {

                $("#NoResultPanel").css("display", "block");
            } else {
                $("#SendMessagePanel").css("display", "none");
                $("#ResultPanel").css("display", "block");
                $("#lblCode").text(msg);
            }

            $("#txtName").val("");
            $("#txtFamily").val("");
            $("#txtEmail").val("");
            $("#txtMobile").val("");
            $("#txtTitle").val("");
            $("#txtBody").val("");

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}


function ValidateData() {

    var check = true;

    $(".InputRequire").each(function () {

        if ($(this).val().trim() == "") {
            check = false;
            $(this).css({ "border-color": "#fe0303" });
        } else {
            $(this).css({ "border-color": "#e4e8eb" });
        }
    });


    if ($("#txtEmail").val() == "") {
        check = false;
        $("#txtEmail").css({ "border-color": "#fe0303 " });
    } else {

        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test($("#txtEmail").val())) {
            $("#txtEmail").css({ "border-color": "#fe0303" });
            check = false;
        } else {
            $("#txtEmail").css({ "border-color": "#e4e8eb" });
        }
    }

    return check;
}
