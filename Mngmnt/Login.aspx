<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Login.aspx.cs" Inherits="Mngmnt_Login" %>

<!DOCTYPE html>

<meta http-equiv="X-UA-Compatible" content="IE=Edge" />

<!--[if IE 8]><html class="ie8 no-js" lang="en"><![endif]-->
<!--[if IE 9]><html class="ie9 no-js" lang="en"><![endif]-->
<!--[if !IE]><!-->
<html lang="fa" class="no-js">
<!--<![endif]-->
<!-- start: HEAD -->
<head>
    <title>سیستم مدیریت محتوای ترند - ورود</title>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta content="" name="description" />
    <meta content="" name="author" />

    <!-- start: MAIN CSS -->
    <link rel="stylesheet" href="assets/plugins/bootstrap/css/bootstrap.min.css">

    <link rel="stylesheet" href="assets/css/main.css">
    <link rel="stylesheet" href="assets/css/main-responsive.css">

    <link rel="stylesheet" href="assets/css/rtl-version.css">
    <!--[if IE 7]>
		<link rel="stylesheet" href="assets/plugins/font-awesome/css/font-awesome-ie7.min.css">
		<![endif]-->
    <!-- end: MAIN CSS -->
    <%--<link rel="stylesheet" href="css/Login.css" />--%>
</head>

<body class="login example1 rtl">
    <div class="main-login col-md-4 col-md-offset-4 col-sm-6 col-sm-offset-3">
        <div class="logo">
            سیستم مدیریت محتوای ترند<i class="fa-circle"></i>
        </div>

        <div class="box-login">
            <h3>ورود به پنل کاربری</h3>
            <p>
                لطفا نام کاربری و رمز عبور خود را وارد نمایید			
            </p>

            <div id="loginDialog" class="loginDialog alert alert-danger no-display">
                <i class="fa fa-remove-sign"></i>

            </div>
            <fieldset>
                <div class="form-group">
                    <span class="input-icon input-icon-right">
                        <input id="txtUsername" type="text" class="form-control loginInput" placeholder="نام کاربری">
                        <i class="fa fa-user"></i></span>
                </div>

                <div class="form-group form-actions">
                    <span class="input-icon input-icon-right">
                        <input id="txtPassword" type="password" class="form-control loginInput password" placeholder="رمز عبور">
                        <i class="fa fa-lock"></i>
                        <a class="forgot" href="#">رمز عبور خود را فراموش کرده ام!</a>
                    </span>
                </div>

                <div class="form-actions" style="padding-top: 0;">
                    <input id="CptchaUserCode" type="text" style="width: 100px;" class="Input  captchaInput fltright txtvlu " placeholder="کد امنیتی" title="کد امنیتی" />
                    <asp:HyperLink ID="HyperLink1" runat="server" CssClass="fltleft" onclick="javascript:Captcha();"
                        ImageUrl="pics/recaptcha2.png">Refresh</asp:HyperLink>

                    <asp:Image ID="Image1" runat="server" CssClass="fltleft" ImageUrl="_CaptchaHandler.ashx" />

                </div>

                <div class="form-actions">
                    <label for="rememberMe" class="checkbox-inline">
                        <input type="checkbox" class="grey remember" id="rememberMe" />
                        مرا به خاطر بسپار
						
                    </label>
                    <button id="LoginBtn" class="btn btn-dark-grey pull-left" style="padding-left: 35px; padding-right: 35px;">
                        ورود <i class="fa fa-arrow-circle-right"></i>
                    </button>
                </div>

            </fieldset>

        </div>

        <div class="box-forgot">
            <h3>رمز عبور خود را فراموش کرده اید؟
            </h3>
            <p>
                ایمیل خود را وارد نمایید تا رمز عبور شما مجددا تنظیم شود
			
            </p>

            <div class="errorHandler alert alert-danger no-display">
                <i class="fa fa-remove-sign"></i>You have some form errors. Please check below.
				
            </div>
            <fieldset>
                <div class="form-group">
                    <span class="input-icon">
                        <input id="resetEmail" type="email" class="form-control" placeholder="ایمیل">
                        <i class="fa fa-envelope"></i></span>
                </div>
                <div class="form-actions">
                    <a class="btn btn-light-grey go-back">
                        <i class="fa fa-circle-arrow-left"></i>بازگشت
							</a>
                    <button id="btnResetPass" class="btn btn-dark-grey pull-left" style="padding-left: 35px; padding-right: 35px;">
                        ثبت <i class="fa fa-arrow-circle-right"></i>
                    </button>
                </div>
            </fieldset>

        </div>


        <div class="copyright">
            2015 &copy; Created by Terend Team		
        </div>

    </div>
    <!-- start: MAIN JAVASCRIPTS -->
    <!--[if lt IE 9]>
		<script src="assets/plugins/respond.min.js"></script>
		<script src="assets/plugins/excanvas.min.js"></script>
		<script type="text/javascript" src="assets/plugins/jquery-lib/1.10.2/jquery.min.js"></script>
		<![endif]-->
    <!--[if gte IE 9]><!-->
    <script src="assets/plugins/jquery-lib/2.0.3/jquery.min.js"></script>
    <!--<![endif]-->

    <script src="js/Login.js"></script>


    <script>
        jQuery(document).ready(function () {

            $('.box-login').show();

            $('.forgot').bind('click', function () {
                $('.box-login').hide();
                $('.box-forgot').show();
            });

            $('.go-back').click(function () {
                $('.box-login').show();
                $('.box-forgot').hide();
                $('.box-register').hide();
            });
        });
		</script>
</body>

</html>
