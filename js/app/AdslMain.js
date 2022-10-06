
$(document).ready(function () {

    $("#btnSearchAdsl").click(function () {

        //$("#search-number").show();
        if (ValidateData2() == true) {
            CheckAdsl($("#txtPreCode").val(), $("#txtTel").val());
        }
    });
  
    $("#btnSendMessage").click(function () {
        if (ValidateData() == true) {
            insertMessage($("#txtName").val(), $("#txtFamily").val(), $("#txtEmail").val(), $("#txtSubject").val(), $("#txtComment").val());
        }
    });

    $(".polling-buttons").on("click", ".btn-polling", function () {
        Vote($(this).val());

    });
});

function Vote(id) {

    $.ajax({
        type: "POST",
        url: "../mngmnt/WebServices/PollAnswerWs.asmx/Vote",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            if (msg == true) {
                $("#showpoll").hide();
                $("#showthank").show();
            } else {

            }
        },
        error: function (xhr) {

        },
        complete: function () {

        }
    });
}

function CheckAdsl(preCode, tel) {  
   
    $.ajax({
        type: "POST",
        url: "Adsl.asmx/SearchAdsl",
        data: "{ preCode:'" + preCode + "' , tel:'" + tel + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');
           // var msg = data.d;

            $('#search-number').modal('show');
            $("#lblResultTel").text(msg[0].OutMessage);
            $("#lblResultCenter").text("مرکز مخابراتی: "+ msg[0].AreaName);
          
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}


function insertMessage(name, family, email, title, body) {

    var obj = new Object();

    obj.Name = name;
    obj.Family = family;  
    obj.Email = email;
    obj.Title = title;
    obj.Body = body;
    obj.Category = "بخش Adsl";
 
    $.ajax({
        type: "POST",
        url: "WebServices/MessageSiteWs.asmx/Insert",
        data: "{ messageEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            //var msg = eval('(' + data.d + ')');
            var msg = data.d;

            if (msg == "") {

            
            } else {
             
            }

            $("#txtName").val("");
            $("#txtFamily").val("");
            $("#txtEmail").val("");           
            $("#txtSubject").val("");
            $("#txtComment").val("");

        },
        error: function (xhr) {
           
        },
        complete: function () {

        }
    });
}

function ValidateData2() {

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

