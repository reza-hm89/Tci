var date;

$(document).ready(function () {

    CurrentDate();

   
});

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
    }
}

function CurrentDate() {

    $.ajax({
        type: "POST",
        url: "WebServices/Contact.asmx/CurrentDate",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function(response) {
            var msg = eval('(' + response.d + ')');

            date = msg;

            LoadContact(GetParameterValues('id'));
        },
        error: function(xhr) {
            
        },
        complete: function() {

        }
    });
}

function LoadContact(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/Contact.asmx/SelectOneComment",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function(response) {
            var msg = eval('(' + response.d + ')');

            var d = new Date(); 
          
            $("#Name").text(msg[0].Name);          
            $("#Tel").text(msg[0].Mobile);
            $("#Email").text(msg[0].Email);
            $("#Address").text(msg[0].UserIp);
            $("#Time").text(msg[0].SendTime);
            $("#CurDate").text(date);
            $("#CurTime").text(d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds());
            $("#Body").text(msg[0].Body);

            ReadMessage(id);
        },
        error: function(xhr) {
            
        },
        complete: function() {

        }
    });
}

function ReadMessage(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/MessageWs.asmx/ReadMessage",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            
          
        },
        error: function (xhr) {

        },
        complete: function () {

        }
    });
}
