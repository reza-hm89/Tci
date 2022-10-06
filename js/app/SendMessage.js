
$(document).ready(function() {
    $("#btnSendMessage").click(function() {
        if (ValidateData() == true) {
            insertMessage($("#txtName").val(), $("#txtFamily").val(), $("#txtMobile").val()
                , $("#txtEmail").val(), $("#txtTitle").val(), $("#txtBody").val(), $("#cmbCategory").val());
        }
    });

    $("#btnSearch").click(function () {
      
        if (ValidateCode() == true) {
            $("#btnSearch").attr('disabled','disabled').val("لطفا منتظر بمانید...");
            ShowReply($("#txtCode").val());
        }
    });
});

function insertMessage(name, family, mobile, email, title, body, category) {

    var obj = new Object();

    obj.Name = name;
    obj.Family = family;
    obj.Mobile = mobile;
    obj.Email = email;
    obj.Title = title;
    obj.Body = body;   
    obj.Category = category;
    obj.FileUrl = "";
    obj.Tel = "";

    // ob.FileUrl = fileUrl;


    $.ajax({
        type: "POST",
        url: "WebServices/MessageSiteWs.asmx/Insert",
        data: "{ messageEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            //var msg = eval('(' + data.d + ')');
            var msg = data.d ;

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

function ShowReply(code) {

    //ShowLoading();


    $.ajax({
        type: "POST",
        url: "WebServices/MessageSiteWs.asmx/SelectOne",
        data: "{code:'" + code + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function(response) {
            // var msg = eval('(' + response.d + ')');
            var msg = response.d;
            $("#btnSearch").attr('disabled', false).val("جستجو");
           
            if (response.d == null) {
                $("#mytable").css("display", "none"); 
                $("#NoResultPanel").css("display", "block");

            } else {
                $("#NoResultPanel").css("display", "none");
                $("#mytable").css("display", "block");

                $("#txtName").val(msg.Name + " " + msg.Family);
                $("#lblBody2").text(msg.Body);
                $("#mytable").css("display", "block");
                if (msg.Reply == "" || msg.Reply == null) {
                    $("#lblReply").text("متاسفانه هنوز پاسخی برای پرسش شما ارسال نشده است.");
                } else {                                    
                    $("#lblReply").text(msg.Reply);
                }
            }
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
           // HideLoading();
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

function ValidateCode() {

    var check = true;

    $(".InputRequire").each(function () {

        if ($(this).val() == "") {
            check = false;
            $(this).css({ "border-color": "#fe0303" });
        } else {
            $(this).css({ "border-color": "#e4e8eb" });
        }
    });
    //alert(check);
    return check;
}