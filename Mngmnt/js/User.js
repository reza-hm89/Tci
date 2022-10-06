var userId;

$(document).ready(function () {

    LoadUsers();

    if (ModulePermission.Insert == false || ModulePermission.Update == false) {

        $("#container").empty();
        $("#container").load("404.aspx");
    }

    if ($("#EditMode").val() == "false") {
        $("#DivSave").addClass("col-md-offset-8");
    }

    if ($("#EditMode").val() == "true") {
        $("#txtUsername").attr("readonly", "readonly");
        $("#txtPassword").attr("readonly", "readonly");
        $("#txtRepeatPassword").attr("readonly", "readonly");

        $("#txtPassword").removeClass("InputRequire");
        $("#txtRepeatPassword").removeClass("InputRequire");
        
    }

    $("#btnCancel").click(function () {
        $("#container").load("UserList.aspx");
    });


    $("#btnSaveUser").click(function() {

        if (ValidateData() == true) {

            if ($("#txtUrl").val() != "") {

                if ($("#EditMode").val() == "false") {
                    UploadImage();
                } else {
                    if (checkUrl(userId) != $("#txtUrl").val()) {
                        UploadImage();
                    }
                }
            } else {

                var gender;
                if ($("#gender_male").is(":checked") == true) {
                    gender = true;
                } else {
                    gender = false;
                }


                if ($("#EditMode").val() == "false") {

                    InsertUser($("#txtName").val(), $("#txtFamily").val(), $("#txtAddress").val(), $("#txtTel").val(),
                        $("#txtUrl").val(), gender, $("#txtZipCode").val(),
                        $("#txtCity").val(), $("#txtWebsite").val(), $("#txtEmail").val(), $("#txtTwitter").val(),
                        $("#txtFacebook").val(), $("#txtGooglePlus").val(), $("#txtGithub").val(),
                        $("#txtLinkedin").val(), $("#txtSkype").val(),
                        $("#txtUsername").val(), $("#txtPassword").val(), $("#txtDescription").val(), $("#drpUsers").val(),
                        $("#txtCardNumber").val(), $("#txtAccountNumber").val());
                } else if ($("#EditMode").val() == "true") {
                    UpdateUser(userId, $("#txtName").val(), $("#txtFamily").val(), $("#txtAddress").val(), $("#txtTel").val(),
                        $("#txtUrl").val(), gender, $("#txtZipCode").val(),
                        $("#txtCity").val(), $("#txtWebsite").val(), $("#txtEmail").val(), $("#txtTwitter").val(),
                        $("#txtFacebook").val(), $("#txtGooglePlus").val(), $("#txtGithub").val(),
                        $("#txtLinkedin").val(), $("#txtSkype").val(),
                        $("#txtDescription").val(), $("#drpUsers").val(),$("#txtCardNumber").val(), $("#txtAccountNumber").val());
                }

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

    $("#txtUsername").focusout(function () {
        if ($("#EditMode").val() == "false") {
            ExistUsername($("#txtUsername").val());
        }              
    });

    $("#txtEmail").focusout(function () {
        ExistEmail($("#txtEmail").val());
    });

    $("#txtPassword").focusout(function () {
        if ($("#EditMode").val() == "false") {
            if ($(this).val().length < 6) {
                MessageBox(9);
                $(this).val("");
                $("#txtRepeatPassword").val("");
            }
        }
    });
});

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

            var users = '<option value="-1">ندارد</option>';

            for (var i = 0; i < msg.length; i++) {
                users += '  <option value="' + msg[i].Id + '">' + msg[i].Name +" "+ msg[i].Family + '</option>';
            }

            $("#drpUsers").empty();
            $("#drpUsers").append(users);
           
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function UploadImage() {

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
    choice.success = function(result) {

       
        var gender;
        if ($("#gender_male").is(":checked") == true) {
            gender = true;
        } else {
            gender = false;
        }

        if ($("#EditMode").val() == "false") {

            InsertUser($("#txtName").val(), $("#txtFamily").val(), $("#txtAddress").val(), $("#txtTel").val(),
                $("#txtUrl").val(), gender, $("#txtZipCode").val(),
                $("#txtCity").val(), $("#txtWebsite").val(), $("#txtEmail").val(), $("#txtTwitter").val(),
                $("#txtFacebook").val(), $("#txtGooglePlus").val(), $("#txtGithub").val(),
                $("#txtLinkedin").val(), $("#txtSkype").val(),
                $("#txtUsername").val(), $("#txtPassword").val(), $("#txtDescription").val(), $("#drpUsers").val(),
                $("#txtCardNumber").val(), $("#txtAccountNumber").val());
        } else if ($("#EditMode").val() == "true") {
            UpdateUser(userId, $("#txtName").val(), $("#txtFamily").val(), $("#txtAddress").val(), $("#txtTel").val(),
                $("#txtUrl").val(), gender, $("#txtZipCode").val(),
                $("#txtCity").val(), $("#txtWebsite").val(), $("#txtEmail").val(), $("#txtTwitter").val(),
                $("#txtFacebook").val(), $("#txtGooglePlus").val(), $("#txtGithub").val(),
                $("#txtLinkedin").val(), $("#txtSkype").val(),
                $("#txtDescription").val(), $("#drpUsers").val(), $("#txtCardNumber").val(), $("#txtAccountNumber").val());
        }
    };
    $.ajax(choice);
}

function ExistUsername(username) {

    return $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/ExistUsername",
        data: "{username:'" + username + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "false",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            if (msg == true) {
                MessageBox(7);
                $("#txtUsername").val("");
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

function ExistEmail(email) {

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/ExistEmail",
        data: "{email:'" + email + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "false",
        success: function (response) {
            var msg = eval('(' + response.d + ')');
          
            if (msg == true) {
                MessageBox(8);
                $("#txtEmail").val("");
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

function checkUrl(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/CheckUrl",
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

function InsertUser(name, family, address, tel, imageUrl, gender, zipCode, city,
    website, email, twitter, facebook, googlePlus, github, linkedin, skype,
    username, password, description, parentId, card, account) {
 
    var obj = new Object();

    obj.Name = name;
    obj.Family = family;  
    obj.Address = address;
    obj.Tel = tel;
    obj.ImageUrl = imageUrl;
    obj.Gender = gender;
    obj.ZipCode = zipCode;
    obj.City = city;
    obj.Website = website;
    obj.Email = email;
    obj.Twitter = twitter;
    obj.Facebook = facebook;
    obj.GooglePlus = googlePlus;
    obj.Github = github;
    obj.Linkedin = linkedin;
    obj.Skype = skype;
    obj.Username = username;
    obj.Password = password;
    obj.Description = description;
    obj.parentId = parentId;
    obj.CardNumber = card;
    obj.AccountNumber = account;

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/Insert",
        data: "{userEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            if (msg != -1) {

                userId = msg;

                MessageBox(1);

                $("#txtName").val("");
                $("#txtFamily").val("");
                $("#txtAddress").val("");
                $("#txtTel").val("");
                $("#txtUrl").val("");
                $("#txtZipCode").val("");
                $("#txtCity").val("");
                $("#txtWebsite").val("");
                $("#txtEmail").val("");
                $("#txtTwitter").val("");
                $("#txtFacebook").val("");
                $("#txtGooglePlus").val("");
                $("#txtGithub").val("");
                $("#txtLinkedin").val("");
                $("#txtSkype").val("");
                $("#txtUsername").val("");
                $("#txtPassword").val("");
                $("#txtRepeatPassword").val("");
                $("#txtDescription").val("");
                $("#drpUsers").val(-1);

                $("#txtCardNumber").val("");
                $("#txtAccountNumber").val("");

                LoadUsers();
            } else {
                MessageBox(7);
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


function UpdateUser(id, name, family, address, tel, imageUrl, gender, zipCode, city,
    website, email, twitter, facebook, googlePlus, github, linkedin, skype,
    description, parentId, card, account) {

    var obj = new Object();

    obj.Id = id;   
    obj.Name = name;
    obj.Family = family;
    obj.Address = address;
    obj.Tel = tel;
    obj.ImageUrl = imageUrl;
    obj.Gender = gender;
    obj.ZipCode = zipCode;
    obj.City = city;
    obj.Website = website;
    obj.Email = email;
    obj.Twitter = twitter;
    obj.Facebook = facebook;
    obj.GooglePlus = googlePlus;
    obj.Github = github;
    obj.Linkedin = linkedin;
    obj.Skype = skype;
    obj.Description = description;
    obj.parentId = parentId;
    obj.CardNumber = card;
    obj.AccountNumber = account;
  
    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/Update",
        data: "{userEntity:" + JSON.stringify(obj) + "}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
          
            var msg = eval('(' + response.d + ')');

            if (msg == true) {

                MessageBox(2);
                $("#container").load("UserList.aspx");

            } else {
                MessageBox(7);
            }
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

        if ($(this).val() == "") {
            check = false;
            $(this).css({ "border-color": "#fe0303" });
        }
        else {
            $(this).css({ "border-color": "#e4e8eb" });
        }
    });

    var txtPassword = $("#txtPassword").val();
    var txtRepeatPassword = $("#txtRepeatPassword").val();

    if (txtPassword != txtRepeatPassword) {

        MessageBox(4);

        $("#txtPassword").css({ "border-color": "#fe0303" });
        $("#txtRepeatPassword").css({ "border-color": "#fe0303" });
        check = false;
    }

    return check;
}

