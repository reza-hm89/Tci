var newsId = -1;
var newsGroupId = -1;

$(document).ready(function () {

  
    LoadLanguageDropDown();

    
    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-md-offset-8");

        LoadNewsGroup();
    }

    $("#btnCancel").click(function () {
        $("#container").load("NewsList.aspx");
    });

    $("#btnSaveNews").click(function() {          

        if (ValidateData() == true) {

            var ShowInSlide;
            if ($("#ShowInSlide").is(":checked") == true) {
                ShowInSlide = true;
            } else {
                ShowInSlide = false;
            }

            var Special;
            if ($("#Special").is(":checked") == true) {
                Special = true;
            } else {
                Special = false;
            }

            var Comment;
            if ($("#Comment").is(":checked") == true) {
                Comment = true;
            } else {
                Comment = false;
            }

            var Rate;
            if ($("#Rate").is(":checked") == true) {
                Rate = true;
            } else {
                Rate = false;
            }

            var PublishStatus = 0;

            $(".PublishStatus").each(function () {
                if ($(this).is(":checked") == true) {
                    PublishStatus = $(this).val();
                }
            });

            var NewsGroup = 0;

            $(".NewsGroups").each(function () {
                if ($(this).is(":checked") == true) {
                    NewsGroup = $(this).val();
                }
            });

            $("#btnSaveNews").css({ "background-image": "url('pics/loading1.gif')", "background-repeat": "no-repeat", "background-size": "25px", "background-position": "2px" });

            if ($("#txtUrl").val() != "") {
                if ($("#EditMode").val() == "false") {
                    UploadImage();
                } else {
                    if (checkUrl(newsId) != $("#txtUrl").val()) {
                        UploadImage();
                    }
                }
            } else {
                if ($("#EditMode").val() == "false") {

                    insertNews($("#txtRoTitr").val(), $("#txtTitr").val(), $("#txtZirTitr").val(),
                        CKEDITOR.instances['txtBody'].getData(), $("#txtUrl").val(), $("#txtKeywords").val(), NewsGroup,
                        PublishStatus, ShowInSlide, Special, Comment, Rate, $("#DrpLanguage").val());
                } else {

                    updateNews(newsId, $("#txtRoTitr").val(), $("#txtTitr").val(), $("#txtZirTitr").val(),
                        CKEDITOR.instances['txtBody'].getData(), $("#txtUrl").val(), $("#txtKeywords").val(), NewsGroup,
                        PublishStatus, ShowInSlide, Special, Comment, Rate, $("#DrpLanguage").val());
                };
            }
        }

    });

    $("#btnAddImage, #txtUrl").click(function () {
        $("#FileUpload").click();
    });

    $("#FileUpload").change(function () {

        var files = $('#FileUpload')[0].files;
        for (var i = 0; i < files.length; i++) {
            $("#txtUrl").val(files[i].name);
        }
    });

   
});

function LoadNewsGroup() {

    $.ajax({
        type: "POST",
        url: "WebServices/NewsGroupWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function(response) {
            var msg = eval('(' + response.d + ')');

            var newsGroups = "";

            for (var i = 0; i < msg.length; i++) {
                newsGroups += '<div class="checkbox">' +
                    '<label>' +
                    msg[i].Name +
                    '<input type="radio" value="' + msg[i].Id + '" name="NewsGroups" class="grey NewsGroups">' +
                    '</label>' +
                    '</div>';
            }

            $("#newsGroupData").append(newsGroups);

            Main.init2();

            if ($("#EditMode").val() == "false") {
                $(".NewsGroups").each(function() {

                    if ($(this).val() == msg[0].Id) {
                        $(this).attr("checked", true);
                        $(this).parent().addClass("checked");
                    }
                });
            }

        },
        error: function(xhr) {
            MessageBox(5);
        },
        complete: function() {
            if ($("#EditMode").val() == "true") {

                $(".NewsGroups").each(function() {
                    
                    if ($(this).val() == newsGroupId) {
                        $(this).attr("checked", true);
                        $(this).parent().addClass("checked");
                    }
                });
            }
        }
    });
}

function LoadLanguageDropDown() {

    $.ajax({
        type: "POST",
        url: "WebServices/LanguageWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var drpLanguage = "";

            for (var i = 0; i < msg.length; i++) {
                drpLanguage += '  <option value="' + msg[i].Id + '">' + msg[i].Name + '</option>';
            }

            $("#DrpLanguage").append(drpLanguage);

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function UploadImage() {

    ShowLoading();

    var uploadfiles = $("#FileUpload").get(0);
    var uploadedfiles = uploadfiles.files;
    var fromdata = new FormData();

    for (var i = 0; i < uploadedfiles.length; i++) {
        fromdata.append(uploadedfiles[i].name, uploadedfiles[i]);
    }


    var choice = {};
    choice.url = "Handler/ImageHandler.ashx";
    choice.type = "POST";
    choice.data = fromdata;
    choice.contentType = false;
    choice.processData = false;
    choice.success = function () {

        HideLoading();

        var ShowInSlide;
        if ($("#ShowInSlide").is(":checked") == true) {
            ShowInSlide = true;
        } else {
            ShowInSlide = false;
        }

        var Special;
        if ($("#Special").is(":checked") == true) {
            Special = true;
        } else {
            Special = false;
        }

        var Comment;
        if ($("#Comment").is(":checked") == true) {
            Comment = true;
        } else {
            Comment = false;
        }

        var Rate;
        if ($("#Rate").is(":checked") == true) {
            Rate = true;
        } else {
            Rate = false;
        }

        var PublishStatus = 0;

        $(".PublishStatus").each(function () {
            if ($(this).is(":checked") == true) {
                PublishStatus = $(this).val();
            }
        });

        var NewsGroup = 0;

        $(".NewsGroups").each(function () {
            if ($(this).is(":checked") == true) {
                NewsGroup = $(this).val();
            }
        });

        if ($("#EditMode").val() == "false") {

            insertNews($("#txtRoTitr").val(), $("#txtTitr").val(), $("#txtZirTitr").val(),
                CKEDITOR.instances['txtBody'].getData(), $("#txtUrl").val(), $("#txtKeywords").val(), NewsGroup,
                PublishStatus, ShowInSlide, Special, Comment, Rate, $("#DrpLanguage").val());
        } else {

            updateNews(newsId, $("#txtRoTitr").val(), $("#txtTitr").val(), $("#txtZirTitr").val(),
                CKEDITOR.instances['txtBody'].getData(), $("#txtUrl").val(), $("#txtKeywords").val(), NewsGroup,
                PublishStatus, ShowInSlide, Special, Comment, Rate, $("#DrpLanguage").val());
        };
    }

    $.ajax(choice);
    event.preventDefault();
}

function checkUrl(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/NewsWs.asmx/CheckUrl",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            return msg;
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });
}

function insertNews(roTitr, titr, zirTitr, body, image, keywords, newsGroupId, publishStatus,
    showInSlide, special, comment, rate, languageId) {

    var obj = new Object();

    obj.RoTitr = roTitr;
    obj.Titr = titr;
    obj.ZirTitr = zirTitr;
    obj.Body = body;
    obj.Image = image;
    obj.Keywords = keywords;
    obj.NewsGroupID = newsGroupId;
    obj.PublishStatus = publishStatus;
    obj.ShowInSlide = showInSlide;
    obj.Special = special;
    obj.Comment = comment;
    obj.Rate = rate;
    obj.LanguageId = languageId;
    obj.NumberOfView = 0;

    $.ajax({
        type: "POST",
        url: "WebServices/NewsWs.asmx/Insert",
        data: "{ newsEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(1);

            $("#txtRoTitr").val("");
            $("#txtTitr").val("");
            $("#txtZirTitr").val("");
            CKEDITOR.instances['txtBody'].setData("");
            $("#txtUrl").val("");
            $("#txtKeywords").val("");
            
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveNews').css({ "background": "#364F6A" });
        }
    });
}

function updateNews(id, roTitr, titr, zirTitr, body, image, keywords, newsGroupId, publishStatus,
    showInSlide, special, comment, rate, languageId) {

    var obj = new Object();

    obj.Id = id;
    obj.RoTitr = roTitr;
    obj.Titr = titr;
    obj.ZirTitr = zirTitr;
    obj.Body = body;
    obj.Image = image;
    obj.Keywords = keywords;
    obj.NewsGroupID = newsGroupId;
    obj.PublishStatus = publishStatus;
    obj.ShowInSlide = showInSlide;
    obj.Special = special;
    obj.Comment = comment;
    obj.Rate = rate;
    obj.LanguageId = languageId;
  
    $.ajax({
        type: "POST",
        url: "WebServices/NewsWs.asmx/Update",
        data: "{newsEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {
            var msg = eval('(' + data.d + ')');

            MessageBox(2);

            $("#EditMode").val(false);

            if (msg == true) {
                $("#container").load("NewsList.aspx");
            }

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            $('#btnSaveNews').css({ "background": "#364F6A" });
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