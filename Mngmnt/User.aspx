<%@ Page Language="C#" AutoEventWireup="true" CodeFile="User.aspx.cs" Inherits="Mngmnt_User" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link rel="stylesheet" href="assets/plugins/bootstrap-fileupload/bootstrap-fileupload.min.css">

    <script src="assets/plugins/bootstrap-fileupload/bootstrap-fileupload.min.js"></script>

   <%-- <link rel="stylesheet" href="assets/plugins/chart/js/jquery/ui-lightness/jquery-ui-1.10.2.custom.css" />
    <script type="text/javascript" src="assets/plugins/chart/js/jquery/jquery-1.9.1.js"></script>
    <script type="text/javascript" src="assets/plugins/chart/js/jquery/jquery-ui-1.10.2.custom.min.js"></script>--%>

    <script type="text/javascript" src="assets/plugins/chart/js/primitives.latest.js"></script>
    <link href="assets/plugins/chart/css/primitives.latest.css" media="screen" rel="stylesheet" type="text/css" />

    <script src="js/User.js"></script>
   
</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li class="active">ثبت کاربر</li>

            </ol>
            <div class="page-header">
                <h1>ثبت کاربر</h1>
            </div>

        </div>
    </div>

    <div class="row">
        <div class="col-sm-12">
            <div class="tabbable">
                <ul class="nav nav-tabs tab-padding tab-space-3 tab-blue" id="myTab4">
                    <li class="active">
                        <a data-toggle="tab" href="#group1">اطلاعات شخصی</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#group2">شبکه های اجتماعی</a>
                    </li>
                     <li>
                        <a data-toggle="tab" href="#group4">اطلاعات حساب بانکی</a>
                    </li>
                    <li>
                        <a data-toggle="tab" href="#group3">اطلاعات کاربری</a>
                    </li>
                   

                </ul>
                <div class="tab-content">
                    <div id="group1" class="tab-pane in active">

                        <div class="row">

                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <i class="fa fa-external-link-square"></i>

                                    <div class="panel-tools">
                                        <a class="btn btn-xs btn-link panel-collapse collapses" href="#"></a>
                                        <a class="btn btn-xs btn-link panel-config" href="#panel-config" data-toggle="modal">
                                            <i class="fa fa-wrench"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-refresh" href="#">
                                            <i class="fa fa-refresh"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-expand" href="#">
                                            <i class="fa fa-resize-full"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-close" href="#">
                                            <i class="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
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

                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="group2" class="tab-pane">
                        <div class="row">

                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <i class="fa fa-external-link-square"></i>

                                    <div class="panel-tools">
                                        <a class="btn btn-xs btn-link panel-collapse collapses" href="#"></a>
                                        <a class="btn btn-xs btn-link panel-config" href="#panel-config" data-toggle="modal">
                                            <i class="fa fa-wrench"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-refresh" href="#">
                                            <i class="fa fa-refresh"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-expand" href="#">
                                            <i class="fa fa-resize-full"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-close" href="#">
                                            <i class="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
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

                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="group3" class="tab-pane">
                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <i class="fa fa-external-link-square"></i>

                                    <div class="panel-tools">
                                        <a class="btn btn-xs btn-link panel-collapse collapses" href="#"></a>
                                        <a class="btn btn-xs btn-link panel-config" href="#panel-config" data-toggle="modal">
                                            <i class="fa fa-wrench"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-refresh" href="#">
                                            <i class="fa fa-refresh"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-expand" href="#">
                                            <i class="fa fa-resize-full"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-close" href="#">
                                            <i class="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-md-6">

                                            <div class="form-group">
                                                <label class="control-label">
                                                    نام کاربری والد
													
                                                </label>
                                                <select class="form-control " id="drpUsers"></select>
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">
                                                    نام کاربری
													
                                                </label>
                                                <input type="text" placeholder="" class="form-control InputRequire" id="txtUsername" name="">
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">
                                                    رمز عبور
													
                                                </label>
                                                <input type="password" placeholder="" class="form-control InputRequire" id="txtPassword" name="">
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">
                                                    تکرار رمز عبور
													
                                                </label>
                                                <input type="password" placeholder="" class="form-control InputRequire" id="txtRepeatPassword" name="">
                                            </div>
                                        </div>

                                    </div>

                                    <div class="row">
                                        <div id="DivCancel" class="col-md-2 col-sm-offset-6" style="display: none">
                                            <button id="btnCancel" class="btn btn-gra btn-block">
                                                انصراف
                                            </button>
                                        </div>
                                        <div id="DivSave" class="col-md-4">
                                            <button id="btnSaveUser" class="btn btn-blue btn-block">
                                                ثبت اطلاعات
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div id="group4" class="tab-pane">
                        <div class="row">
                            <div class="panel panel-default">
                                <div class="panel-heading">
                                    <i class="fa fa-external-link-square"></i>

                                    <div class="panel-tools">
                                        <a class="btn btn-xs btn-link panel-collapse collapses" href="#"></a>
                                        <a class="btn btn-xs btn-link panel-config" href="#panel-config" data-toggle="modal">
                                            <i class="fa fa-wrench"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-refresh" href="#">
                                            <i class="fa fa-refresh"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-expand" href="#">
                                            <i class="fa fa-resize-full"></i>
                                        </a>
                                        <a class="btn btn-xs btn-link panel-close" href="#">
                                            <i class="fa fa-times"></i>
                                        </a>
                                    </div>
                                </div>
                                <div class="panel-body">
                                    <div class="row">
                                        <div class="col-md-6">

                                            <div class="form-group">
                                                <label class="control-label">
                                                   شماره کارت بانکی
													
                                                </label>
                                                <input type="text" placeholder=" شماره کارت بانکی" class="form-control " id="txtCardNumber" >
                                            </div>
                                            <div class="form-group">
                                                <label class="control-label">
                                                   شماره حساب
													
                                                </label>
                                                <input type="text" placeholder=" شماره حساب" class="form-control " id="txtAccountNumber" >
                                            </div>
                                           
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    </div>


</body>
</html>
