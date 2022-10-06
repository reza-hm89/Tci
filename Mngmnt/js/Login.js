$(document).ready(function () {

    CheckRememberMe();

    $("#LoginBtn").click(function () {
       
        if (ValidateData() == true) {
            
            $("#LoginBtn").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "27px", "background-position": "2px" });

            var remember;
            if ($("#rememberMe").is(":checked") == true) {
                remember = true;
            } else {
                remember = false;
            }

            Login($("#txtUsername").val(), $("#txtPassword").val(), $("#CptchaUserCode").val(), remember);
        }
     
    });

    $("#btnResetPass").click(function () {

        if ($("#resetEmail").val() != "") {

            $("#btnResetPass").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "27px", "background-position": "2px" });

            CheckEmail($("#resetEmail").val());
        } else {
            $("#resetEmail").css({ "border-color": "#fe0303" });
        }

    });

    $(".Erorr").hide();

    $(".mnuwidth").mouseenter(function () {
        var hlp = $(this).width();
        var calc = '<span style="display:none">' + $(this).children('a').text() + '</span>';
        $('body').append(calc);
        var txtwidth = $('body').find('span:last').width();
        $('body').find('span:last').remove();
        //
        $("#Menuimgefct").stop(true, true).fadeTo(300, 1.0);
        $("#Menuimgefct").stop(true, true).animate({ "left": $(this).position().left + ((hlp - txtwidth) / 2), "width": txtwidth + "px" }, 500);
        $("#MenuimgefctInner").stop(true, true).fadeTo(300, 1.0);
        $("#MenuimgefctInner").stop(true, true).animate({ "left": $(this).position().left + ((hlp - txtwidth) / 2), "width": txtwidth + "px" }, 500);
    });

    $(".mnuwidth").mouseleave(function () {
        $("#Menuimgefct").stop(true, true).fadeTo(300, 0.3);
        $("#MenuimgefctInner").stop(true, true).fadeTo(300, 0.3);
    });
   

    $(".txtvlu").focus(function () {
        if ($(this).val() == $(this).attr('title')) {
            $(this).css({ "color": "#000" });
            $(this).val(""); 
        }
    });

    $(".txtvlu").focusout(function () {
        if ($(this).val() == "") {
            $(this).css({ "color": "#898888" });
            $(this).fadeTo(500, 1).val($(this).attr('title'));
        }
    });

    $('#txtUsername, #txtPassword, #CptchaUserCode').focus(function (e) {
        $("#loginDialog").hide();
        $("#loginDialog").text('');
    });

    $('#txtUsername, #txtPassword, #CptchaUserCode').keyup(function (e) {
        if (e.keyCode == 13) {

            $("#LoginBtn").click();
        }
    });
});

function CheckEmail(email) {
    
    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "WebServices/UserWs.asmx/CheckEmail",
        data: "{email: '" + email + "'}",
        dataType: "json",
        success: function (data) {

            var msg = eval('(' + data.d + ')');

            if (msg==0) {
                alert('ایمیل ارسالی در پایگاه داده وجود ندارد.');
            } 
            else if (msg == 1) {
                alert('ایمیل برای بازیابی رمز عبور به ایمیل شما ارسال شده است. لطفا ایمیل خود را بررسی نمایید.');
            }

            else if (msg == -1) {
                alert('خطا در ارسال ایمیل');
            }
        },
        error: function (xhr, status, error) {

        }, complete: function () {
            $('#btnResetPass').css({ "background": "#333" });
        }
    });

}

function CheckRememberMe() {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "WebServices/UserWs.asmx/CheckRememberMe",
        data: "{}",
        dataType: "json",
        success: function (data) {

            var msg = eval('(' + data.d + ')');

            if (msg != null) {

                $("#txtUsername").val(msg[0]);
                $("#txtPassword").val(msg[1]);
            }

        },
        error: function (xhr, status, error) {
          
        }, complete: function () {

        }
    });
}

function Login(username, password, captcha, rememberMe) {

    $.ajax({
        type: "POST",
        contentType: "application/json; charset=utf-8",
        url: "WebServices/UserWs.asmx/Login",
        data: "{userName:'" + username + "',pass:'" + password + "', cptchaCode: '" + captcha + "', rememberMe: '" + rememberMe + "'}",
        dataType: "json",
        success: function (data) {
            
            $(".Erorr").hide();

            if (data.d == -1) {
                $("#loginDialog").show(function () {
                    $("#loginDialog").text('کد امنیتی اشتباه است');
                    Captcha();
                });
            } else if (data.d == -2) {
                $("#loginDialog").show( function () {
                    $("#loginDialog").text('نام کاربری یا رمز عبور اشتباه است');
                    Captcha();
                });
            }
            else if (data.d == 0) {
                $("#loginDialog").show(function () {
                    $("#loginDialog").text('وضعیت کاربر غیرفعال است');
                    Captcha();
                });
            }
            else if (data.d == 1) {
                $("#loginDialog").hide( function () {                  
                  
                    window.location.replace("../Mngmnt/Default.aspx");
                });               
            }
                
        },
        error: function (xhr, status, error) {
            var err = eval("(" + xhr.responseText + ")");
            alert(err.Message);

            MessageBox(5);

        }, complete: function() {

            $('#LoginBtn').css({ "background": "#333" });
        }
    });
}

function Captcha() {

    var NewImage = document.getElementById("Image1");
    NewImage.src = "_CaptchaHandler.ashx?captcha=" + Math.random();
}

function ValidateData() {

    var check = true;

    $(".loginInput").each(function () {
       
        if ($(this).val() == "") {
            check = false; 
            $(this).css({ "border-color": "#fe0303" });
        }
        else {
            $(this).css({ "border-color": "#e4e8eb" });
        }
    });

    return check;
}

