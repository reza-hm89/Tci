<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="Default" %>

<!DOCTYPE html>

<meta http-equiv="X-UA-Compatible" content="IE=Edge" />

<!--[if IE 8]><html class="ie8 no-js" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9 no-js" lang="en"><![endif]-->
<!--[if !IE]><!-->
<html lang="fa" class="no-js">
<!--<![endif]-->

<head>
    <title>Terend Team - پنل مدیریت ترند</title>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="" name="description" />
    <meta content="" name="author" />

    <link rel="stylesheet" href="assets/plugins/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="assets/plugins/font-awesome/css/font-awesome.min.css">
    <link rel="stylesheet" href="assets/fonts/style.css">
    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/main-responsive.css">
    <link rel="stylesheet" href="assets/plugins/icheck/skins/all.css">
    <link rel="stylesheet" href="assets/plugins/bootstrap-colorpalette/css/bootstrap-colorpalette.css">
    <link rel="stylesheet" href="assets/plugins/perfect-scrollbar/src/perfect-scrollbar-rtl.css">
    <link rel="stylesheet" href="assets/css/theme_light.css" type="text/css" id="skin_color">
    <link rel="stylesheet" href="assets/css/print.css" type="text/css" media="print" />
    <link rel="stylesheet" href="assets/css/rtl-version.css">


    <!-- The Stylesheets -->
    <!--[if IE 7]>
		<link rel="stylesheet" href="assets/plugins/font-awesome/css/font-awesome-ie7.min.css">
		<![endif]-->

    <link rel="shortcut icon" href="favicon.ico" />


</head>

<body class="rtl footer-fixed">
       
    <a data-toggle="modal" id="AlertsLink" href="#AlertModal"></a>

    <div id="black-overlay" style="display: none; position: fixed; width: 100%; height: 100%; z-index: 1000; background-color: gray; opacity: 0.6; background: url(pics/Preloader.gif) 45% 40%  no-repeat #eeeeee;">
    </div>

    <input type="hidden" id="EditMode" value="false" />

    <input runat="server" type="hidden" id="userId" value="1" />

    <div class="navbar navbar-inverse navbar-fixed-top">

        <div class="container">
            <div class="navbar-header">

                <button data-target=".navbar-collapse" data-toggle="collapse" class="navbar-toggle" type="button">
                    <span class="clip-list-2"></span>
                </button>

                <a class="navbar-brand" href="http://www.terend.com/" target="_blank">Terend<i class="clip-clip"></i>Team
                </a>

            </div>
            <div class="navbar-header">
                <a href="http://online.1abzar.com/" target="_blank" class="btn btn-success btn-lg">مدیریت چت آنلاین</a>
            </div>
            <div class="navbar-tools">

                <ul class="nav navbar-right">

                    <li class="dropdown current-user">
                        <a data-toggle="dropdown" data-hover="dropdown" class="dropdown-toggle" data-close-others="true" href="#">
                            <img id="UserProfileImage" style="width: 30px; height: 30px;" src="" class="circle-img" alt="">
                            <span class="username"></span>
                            <i class="clip-chevron-down"></i>
                        </a>
                        <ul class="dropdown-menu">
                            <li id="UserProfileMenu">
                                <a><i class="clip-user-2"></i>
                                    &nbsp;پروفایل من
                                </a>
                            </li>


                            <li class="divider"></li>
                            <li>
                                <a href="LockScreen.html"><i class="clip-locked"></i>
                                    &nbsp;قفل صفحه نمایش </a>
                            </li>
                            <li id="DivExit">
                                <a><i class="clip-exit"></i>
                                    &nbsp;خارج شدن
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <div class="main-container">
        <div class="navbar-content">

            <div class="main-navigation navbar-collapse collapse">
                <input type="text" id="txtSearchMenu" placeholder="جستجو منو" style="width: 100%" />

                <div class="navigation-toggler">
                    <i class="clip-chevron-left"></i>
                    <i class="clip-chevron-right"></i>
                </div>

                <ul id="MenuList" class="main-navigation-menu">
                </ul>

            </div>

        </div>

        <div class="main-content">

            <div id="container" class="container">

            </div>
        </div>

    </div>

    <div class="footer clearfix">
        <div class="footer-inner" style="font-family: 'Arial'">
            2015 &copy; Cms Manager By Terend Team
		
        </div>
        <div class="footer-items">
            <span class="go-top"><i class="clip-chevron-up"></i></span>
        </div>
    </div>


    <div id="SuccessInsert" class="alert alert-success">
        <button data-dismiss="alert" class="close">
            &times;
									
        </button>
        <i class="fa fa-check-circle"></i>
        <strong>اطلاعات با موفقیت ثبت شد</strong>

    </div>

    <div id="SuccessUpdate" class="alert alert-success">
        <button data-dismiss="alert" class="close">
            &times;
									
        </button>
        <i class="fa fa-check-circle"></i>
        <strong>اطلاعات با موفقیت بروز رسانی شد</strong>

    </div>

    <div id="SuccessDelete" class="alert alert-success">
        <button data-dismiss="alert" class="close">
            &times;
									
        </button>
        <i class="fa fa-check-circle"></i>
        <strong>اطلاعات با موفقیت حذف شد</strong>

    </div>

    <div id="PasswordAlert" class="alert alert-warning">
        <button data-dismiss="alert" class="close">
            &times;
									
        </button>
        <i class="fa fa-exclamation-triangle"></i>
        <strong>هشدار! </strong>رمز عبور با تکرار رمز عبور مطابقت ندارد
								
    </div>

    <div id="ErrorAlert" class="alert alert-danger">
        <button data-dismiss="alert" class="close">
            &times;
									
        </button>
        <i class="fa fa-times-circle"></i>
        <strong>هشدار! </strong>وقوع خطا در سمت سرور
								
    </div>

    <div id="GroupAlert" class="alert alert-info">
        <button data-dismiss="alert" class="close">
        </button>
        <i class="fa fa-info-circle"></i>
        <strong>پیغام</strong>  ابتدا گروه اصلی را انتخاب نمایید.
								
    </div>

    <div id="UsernameAlert" class="alert alert-info">
        <button data-dismiss="alert" class="close">
        </button>
        <i class="fa fa-info-circle"></i>
        <strong>هشدار!</strong>  نام کاربری در پایگاه داده موجود است. لطفا نام کاربری دیگری انتخاب نمایید.
								
    </div>

    <div id="EmailAlert" class="alert alert-info">
        <button data-dismiss="alert" class="close">
        </button>
        <i class="fa fa-info-circle"></i>
        <strong>هشدار!</strong>  ایمیل در پایگاه داده موجود است. لطفا ایمیل دیگری انتخاب نمایید.
								
    </div>

    <div id="PasswordLengthAlert" class="alert alert-warning">
        <button data-dismiss="alert" class="close">
        </button>
        <i class="fa fa-info-circle"></i>
        <strong>هشدار!</strong>  حداقل تعداد رمز عبور ۶ کاراکتر می باشد
								
    </div>

    <!--[if lt IE 9]>
		<script src="assets/plugins/respond.min.js"></script>
		<script src="assets/plugins/excanvas.min.js"></script>
		<script type="text/javascript" src="assets/plugins/jquery-lib/1.10.2/jquery.min.js"></script>
		<![endif]-->
    <!--[if gte IE 9]><!-->
    <%-- <script src="assets/plugins/jquery-lib/2.0.3/jquery.min.js"></script>--%>
    <!--<![endif]-->
    <script src="assets/js/jquery-2.1.3.min.js"></script>

    <script src="js/MainMenu.js"></script>
    <script src="assets/plugins/jquery-ui/jquery-ui-1.10.2.custom.min.js"></script>
    <script src="assets/plugins/bootstrap/js/bootstrap.min.js"></script>
    <script src="assets/plugins/bootstrap-hover-dropdown/bootstrap-hover-dropdown.min.js"></script>
    <script src="assets/plugins/blockui/jquery.blockui.js"></script>
    <script src="assets/plugins/icheck/jquery.icheck.min.js"></script>
    <script src="assets/plugins/perfect-scrollbar/src/jquery.mousewheel.js"></script>
    <script src="assets/plugins/perfect-scrollbar/src/perfect-scrollbar-rtl.js"></script>
    <script src="assets/plugins/less/less-1.5.0.min.js"></script>
    <script src="assets/plugins/jquery-cookie/jquery.cookie.js"></script>
    <script src="assets/plugins/bootstrap-colorpalette/js/bootstrap-colorpalette.js"></script>

    <script src="assets/js/main.js"></script>

</body>

</html>
