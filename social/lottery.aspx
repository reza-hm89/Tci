<%@ Page Language="C#" AutoEventWireup="true" CodeFile="lottery.aspx.cs" Inherits="social_lottery" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head>

    <meta charset="utf-8" />
    <title>قرعه کشی کانال شرکت مخابرات در تلگرام</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, max-scale=1">
    <meta http-equiv="Content-Language" content="fa" />
    <!--[if IE]>
    <!--<link rel="shortcut icon" href="favicon.ico" rel="icon" type="image/x-icon">-->
    <!--[endif]-->
    <link href="library/bootstrap/css/bootstrap.css" rel="stylesheet" />
    s
    <link href="library/bootstrap/css/bootstrap-theme.css" rel="stylesheet" />
    <link href="library/bootstrap/css/bootstrap-rtl.min.css" rel="stylesheet" />
    <link href="style.css" rel="stylesheet" media="all" />


    <!--[if lt IE 9]>
    <script src="library/js/html5shiv.min.js"></script>
    <script src="library/js/respond.min.js"></script>
    <![endif]-->
    <script src="library/js/jquery-1.11.2.min.js"></script>
    <script src="library/bootstrap/js/bootstrap.js"></script>

    <script src="library/js/FarsiType.js"></script>
    <script src="library/js/jquery.currency.js"></script>

    <script src="lotteryScript.js"></script>
</head>
<body class="home pages">

    <div class="container-fluid">

        <!--<img src="images/socialbanner.jpg" width="100%" alt=""/>-->
        <section class="section-pol">
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 content text-center">
                        <div class="content-post">
                            <div class="content-header">
                                <h1><span style="color: #ff0000">قرعه کشی</span> <span style="color: #005baa">کانال شرکت مخابرات در تلگرام</span>
                                </h1>

                            </div>
                            <div id="LetteryRegisterPanel" runat="server" visible="false" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center col-lg-push-2 col-md-pull-2">
                                <!--
                                    <div class="packages notpolform" id="PolPackageSection">
                                     
                                        <br>
                                        <span class="glyphicon glyphicon-ok-circle poluser"></span>
                                        <h2 style="font-size: 22px;">مشترک شرکت مخابرات هستم</h2>
                                        <br/>
                                        <style>
                                            .poluser {
                                                font-size: 200px;
                                                color: green;
                                            }
                                        </style>
                                        <button class="btn btn-info sales-btn">ثبت نام</button>
                                    </div> -->
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="POLuserForm" style="margin-top: 50px">
                                    <div class="content-post">

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                            <img src="images/loader.gif" width="20" height="20" alt="" class="loading" />
                                            <div id="PolResult"></div>
                                        </div>
                                        <form>

                                            <input type="hidden" id="LotteryId" runat="server" />
                                            <input type="hidden" id="hidLotteryYear" runat="server" />
                                            <input type="hidden" id="hidLotteryMonth" runat="server" />
                                            <div class="form-group">

                                                <input type="text" class="form-control number" id="CustomerID"
                                                    placeholder=" تلفن اینترنت پرسرعت به همراه کد شهر"
                                                    maxlength="10" />
                                            </div>

                                            <div class="form-group">
                                                <input type="text" class="form-control number" id="CustomerMobile"
                                                    placeholder="شماره موبایل" maxlength="11" />
                                            </div>

                                            <div class="row">
                                                <button type="button" class="btn btn-success registeration">
                                                    <span
                                                        class="glyphicon glyphicon-check"></span>شرکت در قرعه کشی 
                                                </button>
                                            </div>

                                            <br />
                                            <div style="clear: both"></div>
                                            <a href="telegram" target="_blank">ثبت نام در لیست کاربران تلگرام</a>
                                        </form>
                                    </div>
                                </div>
                            </div>

                            <div id="LetteryNoActivePanel" style="min-height: 260px" runat="server" visible="false" class="col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center col-lg-push-2 col-md-pull-2">
                                <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12" id="POLuserForm2" style="margin-top: 50px">
                                    <div class="content-post">

                                        <div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-center">
                                            <img src="images/loader.gif" width="20" height="20" alt="" class="loading" />
                                            <div id="PolResult2">قرعه کشی مورد نظر فعال نمی باشد. </div>
                                            <div style="clear: both"></div>
                                            <br />
                                            <a href="telegram" target="_blank">ثبت نام در لیست کاربران تلگرام</a>
                                            <br />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br>
    <br />

    <div class="hb_footer">
        <div class="container">
            <div id="footer-top">
                <div class="row">
                    <div class="col-md-2">
                    </div>
                    <div class="col-md-4">
                        <h5>نشانی : خراسان شمالی - بجنورد - چهار راه شریعتی</h5>
                        <h5>کد پستی : 57155 - 94148</h5>
                    </div>
                    <div class="col-md-4">
                        <h5>ملاقات مردمی با مدیرعامل : دوشنبه هر هفته</h5>
                        <h5>سامانه پاسخگویی خودکار: 2021</h5>
                    </div>
                    <div class="col-md-2">
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="container-fluid hb-footer-bottom">
        <h6>
            <span>
                <a href="">
                    <img src="images/siteMap.png" alt="نقشه سایت">
                </a>
            </span>
            <span>کلیه حقوق این وب سایت متعلق به شرکت مخابرات خراسان شمالی می باشد.
        </span>
        </h6>
    </div>

    <script>
        $(document).ready(function () {
            $(".gototop").remove();
        });

</script>
</body>
</html>
