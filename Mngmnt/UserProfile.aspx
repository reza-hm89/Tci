<%@ Page Language="C#" AutoEventWireup="true" CodeFile="UserProfile.aspx.cs" Inherits="Mngmnt_UserProfile" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link rel="stylesheet" href="assets/plugins/bootstrap-fileupload/bootstrap-fileupload.min.css">
    <link rel="stylesheet" href="assets/plugins/bootstrap-social-buttons/social-buttons-3.css">

    <script src="assets/plugins/bootstrap-fileupload/bootstrap-fileupload.min.js"></script>
    <script src="assets/plugins/jquery.pulsate/jquery.pulsate.min.js"></script>
    <script src="assets/js/pages-user-profile.js"></script>

    <script src="js/UserProfile.js"></script>
</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="Default.aspx">صفحه اصلی</a>
                </li>
                <li class="active">پروفایل کاربری</li>

                <li class="search-box">
                    <form class="sidebar-search">
                        <div class="form-group">
                            <input type="text" placeholder="جستجو ... ">
                            <button class="submit">
                                <i class="clip-search-3"></i>
                            </button>
                        </div>
                    </form>
                </li>
            </ol>
            <div class="page-header">
                <h1>پروفایل کاربری</h1>
            </div>

        </div>
    </div>

    <div class="row">
        <div class="col-sm-12">
            <div class="tabbable">
                <ul class="nav nav-tabs tab-padding tab-space-3 tab-blue" id="myTab4">
                    <li class="active">
                        <a data-toggle="tab" href="#panel_overview">بررسی اجمالی
										</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#panel_edit_account">ویرایش پروفایل
										</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#panel_Change_Password">تغییر رمز عبور
										</a>
                    </li>
                   
                </ul>
                <div class="tab-content">
                    <div id="panel_overview" class="tab-pane in active">
                        <div class="row">
                            <div class="col-sm-5 col-md-4">
                                <div class="user-left">
                                    <div class="center">
                                        <h4 id="NameFamily"></h4>
                                        <div class="fileupload fileupload-new" data-provides="fileupload">
                                            <div class="user-image">
                                                <div class="fileupload-new thumbnail">
                                                    <img id="ImageUrl" src="" alt="">
                                                </div>
                                                <div class="fileupload-preview fileupload-exists thumbnail" style="max-width: 200px; max-height: 150px; line-height: 20px;"></div>
                                                <div class="user-image-buttons">
                                                    <span class="btn btn-teal btn-file btn-sm"><span class="fileupload-new"><i class="fa fa-pencil"></i></span><span class="fileupload-exists"><i class="fa fa-pencil"></i></span>
                                                        <input type="file">
                                                    </span>
                                                    <a href="#" class="btn fileupload-exists btn-bricky btn-sm" data-dismiss="fileupload">
                                                        <i class="fa fa-times"></i>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                          <a id="UserChartView"  target="_blank" >
                                                مشاهده زیر مجموعه
                                            </a>
                                        <hr>
                                        <p>
                                            <a id="twitterLink" href="#" target="_blank" class="btn btn-twitter btn-sm btn-squared">
                                                <i class="fa fa-twitter"></i>
                                            </a>
                                            <a id="facebookLink" href="#" target="_blank" class="btn btn-facebook btn-sm btn-squared">
                                                <i class="fa fa-facebook"></i>
                                            </a>
                                            <a id="googleplusLink" href="#" target="_blank" class="btn btn-google-plus btn-sm btn-squared">
                                                <i class="fa fa-google-plus"></i>
                                            </a>
                                            <a id="githubLink" href="#" target="_blank" class="btn btn-github btn-sm btn-squared">
                                                <i class="fa fa-github"></i>
                                            </a>
                                            <a id="linkedinLink" href="#" target="_blank" class="btn btn-linkedin btn-sm btn-squared">
                                                <i class="fa fa-linkedin"></i>
                                            </a>
                                            <a id="skypeLink" href="#" target="_blank" class="btn btn-skype btn-sm btn-squared">
                                                <i class="fa fa-skype"></i>
                                            </a>
                                        </p>
                                        <hr>
                                    </div>
                                    <table class="table table-condensed table-hover">
                                        <thead>
                                            <tr>
                                                <th colspan="3">اطلاعات تماس</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>آدرس وب سایت:</td>
                                                <td>
                                                    <a id="websiteLink" href="#" target="_blank" style="font-family: 'arial'"></a></td>
                                            </tr>
                                            <tr>
                                                <td>ایمیل:</td>
                                                <td>
                                                    <a id="emailLink" href="#" style="font-family: 'arial'"></a></td>
                                            </tr>
                                            <tr>
                                                <td>تلفن:</td>
                                                <td id="tel"></td>
                                            </tr>
                                            <tr>
                                                <td>آدرس:</td>
                                                <td id="address"></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table class="table table-condensed table-hover">
                                        <thead>
                                            <tr>
                                                <th colspan="3">اطلاعات عمومی</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>نام:</td>
                                                <td id="name"></td>
                                            </tr>
                                            <tr>
                                                <td>نام خانوادگی:</td>
                                                <td id="family"></td>
                                            </tr>
                                            <tr>
                                                <td>نام کاربری:</td>
                                                <td id="username"></td>
                                            </tr>
                                            <tr>
                                                <td>تاریخ ثبت نام:</td>
                                                <td id="regDate"></td>
                                            </tr>
                                            <tr>
                                                <td>زمان ورود:</td>
                                                <td id="loginTime"></td>
                                            </tr>
                                            <tr>
                                                <td>زمان آخرین خروج:</td>
                                                <td id="logoutTime"></td>
                                            </tr>

                                            <tr>
                                                <td>تاریخ تولد:</td>
                                                <td id="birthDay"></td>
                                            </tr>
                                            <tr>
                                                <td>شهر:</td>
                                                <td id="city"></td>
                                            </tr>
                                            <tr>
                                                <td>کد پستی:</td>
                                                <td id="zipCode"></td>
                                            </tr>
                                            <tr>
                                                <td>توضیحات اضافه:</td>
                                                <td id="description"></td>
                                            </tr>
                                        </tbody>
                                    </table>

                                </div>
                            </div>

                        </div>
                    </div>
                    <div id="panel_edit_account" class="tab-pane">
                        <div class="row">
                            <div class="col-md-12">
                                <h3>اطلاعات حساب کاربری</h3>
                                <hr>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label">
                                        نام
													
                                    </label>
                                    <input type="text" placeholder="" class="form-control InputRequire" id="txtName" name="firstname">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        نام خانوادگی
													
                                    </label>
                                    <input type="text" placeholder="" class="form-control InputRequire" id="txtFamily" name="lastname">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        نام کاربری
													
                                    </label>
                                    <input type="text" placeholder="" class="form-control" id="txtUsername" readonly="readonly">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        آدرس
													
                                    </label>
                                    <input type="text" placeholder="" class="form-control" id="txtAddress" name="">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        تلفن
													
                                    </label>
                                    <input type="email" placeholder="" class="form-control" id="txtTel" name="email">
                                </div>

                                <div class="form-group">
                                    <label class="control-label">
                                        وب سایت
													
                                    </label>
                                    <input type="email" placeholder="" class="form-control" id="txtWebsite">
                                </div>

                                <div class="form-group">
                                    <label class="control-label">
                                        ایمیل
													
                                    </label>
                                    <input type="email" placeholder="" class="form-control" id="txtEmail" name="email">
                                </div>

                            </div>
                            <div class="col-md-6">

                                <div class="form-group">
                                    <label class="control-label">
                                        جنسیت
													
                                    </label>
                                    <div>
                                        <label class="radio-inline">
                                            <input type="radio" class="grey" value="" name="gender" id="gender_female">
                                            زن
														
                                        </label>
                                        <label class="radio-inline">
                                            <input type="radio" class="grey" value="" name="gender" id="gender_male" checked="checked">
                                            مرد
														
                                        </label>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="control-label">
                                                کد پستی
															
                                            </label>
                                            <input class="form-control" placeholder="" type="text" name="zipcode" id="txtZipCode">
                                        </div>
                                    </div>
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label class="control-label">
                                                شهر
															
                                            </label>
                                            <input class="form-control" placeholder="تهران" type="text" title="" name="city" id="txtCity">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label class="control-label">
                                        آپلود تصویر
                                    </label>

                                    <div class="input-group">
                                        <input id="txtUrl" type="text" readonly="readonly" placeholder="آدرس فایل" class="form-control uneditable-input ">
                                        <div class="input-group-btn">
                                            <div class="btn btn-light-grey btn-file">

                                                <span id="btnAddImage" class="fileupload-new"><i class="fa fa-folder-open-o"></i>انتخاب فایل</span>
                                                <input type="file" id="FileUpload" class="file-input" style="display: none">
                                            </div>

                                        </div>
                                    </div>

                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        توضیحات
                                                    	
                                    </label>
                                    <textarea class="form-control" placeholder="" id="txtDescription" rows="5" style="resize: none"></textarea>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-12">
                                <h3>اطلاعات اضافی</h3>
                                <hr>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label">
                                        Twitter
													
                                    </label>
                                    <span class="input-icon">
                                        <input class="form-control" type="text" id="txtTwitter">
                                        <i class="clip-twitter"></i></span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        Facebook
													
                                    </label>
                                    <span class="input-icon">
                                        <input class="form-control" type="text" id="txtFacebook">
                                        <i class="clip-facebook"></i></span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        Google Plus
													
                                    </label>
                                    <span class="input-icon">
                                        <input class="form-control" type="text" id="txtGooglePlus">
                                        <i class="clip-google-plus"></i></span>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="control-label">
                                        Github
													
                                    </label>
                                    <span class="input-icon">
                                        <input class="form-control" type="text" id="txtGithub">
                                        <i class="clip-github-2"></i></span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        Linkedin
													
                                    </label>
                                    <span class="input-icon">
                                        <input class="form-control" type="text" id="txtLinkedin">
                                        <i class="clip-linkedin"></i></span>
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        Skype
													
                                    </label>
                                    <span class="input-icon">
                                        <input class="form-control" type="text" id="txtSkype">
                                        <i class="clip-skype"></i></span>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-8">
                            </div>
                            <div class="col-md-4">
                                <button id="btnSaveUser" class="btn btn-blue btn-block">
                                    به روز رسانی اطلاعات <i class="fa fa-arrow-circle-right"></i>
                                </button>
                            </div>
                        </div>

                    </div>
                    <div id="panel_Change_Password" class="tab-pane">
                        <div class="row">
                            <div class="col-md-12">
                                <h3>اطلاعات حساب کاربری</h3>
                                <hr>
                            </div>
                            <div class="col-md-6">


                                <div class="form-group">
                                    <label class="control-label">
                                        رمز عبور فعلی
													
                                    </label>
                                    <input type="password" placeholder="" class="form-control" id="txtCurrentPassword" name="email">
                                </div>

                                <div class="form-group">
                                    <label class="control-label">
                                        رمز عبور جدید
													
                                    </label>
                                    <input type="password" placeholder="" class="form-control" name="password" id="txtNewPassword">
                                </div>
                                <div class="form-group">
                                    <label class="control-label">
                                        تکرار رمز عبور جدید
													
                                    </label>
                                    <input type="password" placeholder="" class="form-control" id="txtRepeatPassword" name="password_again">
                                </div>
                            </div>

                        </div>

                        <div class="row">
                            <div class="col-md-8">
                            </div>
                            <div class="col-md-4">
                                <button id="btnChangePassword" class="btn btn-blue btn-block">
                                    تغییر رمز عبور 
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
