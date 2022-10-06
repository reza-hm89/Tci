
$(document).ready(function () {

    bindRecordToEdit($("#userId").val());


    $("#UserChartView").attr("href", "UserChart.aspx?id=" + $("#userId").val());

    $("#btnSaveUser").click(function () {
        if (ValidateData() == true) {

            UploadImage();
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

    $("#btnChangePassword").click(function () {
        ChangePassword($("#txtCurrentPassword").val(), $("#txtNewPassword").val(), $("#txtRepeatPassword").val());
    });

});

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

        UpdateUser($("#userId").val(), $("#txtName").val(), $("#txtFamily").val(), $("#txtAddress").val(), $("#txtTel").val(),
                 $("#txtUrl").val() , gender, $("#txtZipCode").val(),
                $("#txtCity").val(), $("#txtWebsite").val(), $("#txtEmail").val(), $("#txtTwitter").val(),
                $("#txtFacebook").val(), $("#txtGooglePlus").val(), $("#txtGithub").val(),
                $("#txtLinkedin").val(), $("#txtSkype").val(),
                $("#txtUsername").val(), $("#txtPassword").val(), $("#txtDescription").val());
    };
    $.ajax(choice);
}

function bindUserData(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/BindRecordToEdit",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            $("#ImageUrl").attr("src", "images/user/" + msg.ImageUrl);
            $("#NameFamily").text(msg.Name + " " + msg.Family);
            $("#twitterLink").attr("href", msg.Twitter);
            $("#facebookLink").attr("href", msg.Facebook);
            $("#googleplusLink").attr("href", msg.GooglePlus);
            $("#githubLink").attr("href", msg.Github);
            $("#linkedinLink").attr("href", msg.Linkedin);
            $("#skypeLink").attr("href", msg.Skype);
            $("#websiteLink").text(msg.Website);
            $("#websiteLink").attr("href", msg.Website);
            $("#emailLink").text(msg.Email);
            $("#tel").text(msg.Tel);
            $("#address").text(msg.Address);
            $("#name").text(msg.Name);
            $("#family").text(msg.Family);
            $("#username").text(msg.Username);
            $("#regDate").text(msg.RegDate);
            $("#loginTime").text(msg.LoginDate);
            $("#logoutTime").text(msg.LogoutDate);
            $("#birthDay").text(msg.Birthday);
            $("#city").text(msg.City);
            $("#zipCode").text(msg.ZipCode);
            $("#description").text(msg.Description);
          

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

    $("#userId").val(id);

    $(".head h4").text("ویرایش کاربر");

    $("#btnSaveUser").text("ثبت تغییرات");

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/BindRecordToEdit",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            $("#ImageUrl").attr("src", "images/" + msg[0].ImageUrl);
            $("#NameFamily").text(msg[0].Name + " " + msg[0].Family);
            $("#twitterLink").attr("href", msg[0].Twitter);
            $("#facebookLink").attr("href", msg[0].Facebook);
            $("#googleplusLink").attr("href", msg[0].GooglePlus);
            $("#githubLink").attr("href", msg[0].Github);
            $("#linkedinLink").attr("href", msg[0].Linkedin);
            $("#skypeLink").attr("href", msg[0].Skype);
            $("#websiteLink").text(msg[0].Website);
            $("#websiteLink").attr("href", msg[0].Website);
            $("#emailLink").text(msg[0].Email);
            $("#tel").text(msg[0].Tel);
            $("#address").text(msg[0].Address);
            $("#name").text(msg[0].Name);
            $("#family").text(msg[0].Family);
            $("#username").text(msg[0].Username);
            $("#regDate").text(msg[0].RegDate);
            $("#loginTime").text(msg[0].LoginDate);
            $("#logoutTime").text(msg[0].LogoutDate);
            $("#birthDay").text(msg[0].Birthday);
            $("#city").text(msg[0].City);
            $("#zipCode").text(msg[0].ZipCode);
            $("#description").text(msg[0].Description);



            $("#txtName").val(msg[0].Name);
            $("#txtFamily").val(msg[0].Family);
            $("#txtUsername").val(msg[0].Username);
            $("#txtPassword").val(msg[0].Password);
            $("#txtAddress").val(msg[0].Address);
            $("#txtTel").val(msg[0].Tel);
            $("#txtEmail").val(msg[0].Email);
            $("#txtTwitter").val(msg[0].Twitter);
            $("#txtFacebook").val(msg[0].Facebook);
            $("#txtGooglePlus").val(msg[0].GooglePlus);
            $("#txtGithub").val(msg[0].Github);
            $("#txtLinkedin").val(msg[0].Linkedin);
            $("#txtSkype").val(msg[0].Skype);
            $("#txtWebsite").val(msg[0].Website);
            $("#birthDay").val(msg[0].Birthday);
            $("#txtCity").val(msg[0].City);
            $("#txtZipCode").val(msg[0].ZipCode);
            $("#txtDescription").val(msg[0].Description);

            if (msg[0].Gender == false) {
                $("#gender_female").attr("checked", true);
            }
            if (msg[0].Gender == true) {
                $("#gender_male").attr("checked", true);
            }

            $("#txtUrl").val(msg[0].ImageUrl);
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
    username, password, description) {

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
    obj.Username = username;
    obj.Password = password;
    obj.Description = description;

    
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

function ChangePassword(curPassword, newPassword, repeatPassword) {

    if (curPassword == "" || newPassword == "" || repeatPassword == "") {

        $("#txtCurrentPassword").css({ "border-color": "#fe0303" });
        $("#txtNewPassword").css({ "border-color": "#fe0303" });
        $("#txtRepeatPassword").css({ "border-color": "#fe0303" });

        return false;
    }

    if (newPassword != repeatPassword) {

        MessageBox(4);

        $("#txtNewPassword").css({ "border-color": "#fe0303" });
        $("#txtRepeatPassword").css({ "border-color": "#fe0303" });
         
        return false;
    }

    var obj = new Object();

    obj.Id = $("#userId").val();
    obj.Password = curPassword;
  

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/ChangePassword",
        data: "{userEntity:" + JSON.stringify(obj) + ", password:'" + curPassword + "', newPassword:'" + newPassword + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            var msg = eval('(' + response.d + ')');

            if (msg == true) {
                MessageBox(2);
                window.location.replace("Login.aspx");

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

    return check;
}

