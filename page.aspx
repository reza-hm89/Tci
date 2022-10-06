<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="page.aspx.cs" Inherits="page" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style type="text/css">
        A.b1:link {
            COLOR: #ff9800;
            TEXT-DECORATION: none;
        }

        A.b1:visited {
            COLOR: #ff9800;
            TEXT-DECORATION: none;
        }

        A.b1:hover {
            COLOR: #ff9800;
            TEXT-DECORATION: none;
        }

        .Soff {
            background-image: url('images/stars.png');
            background-position: left top;
            text-align: center;
            width: 28px;
            height: 28px;
            padding: 0px;
            margin: 0px;
        }

        .Son {
            background-image: url('images/stars.png');
            background-position: left center;
            text-align: center;
            width: 28px;
            height: 28px;
            padding: 0px;
            margin: 0px;
        }

        .Sdo {
            background-image: url('images/stars.png');
            background-position: left bottom;
            text-align: center;
            width: 28px;
            height: 28px;
            padding: 0px;
            margin: 0px;
        }

        A.b2:link {
            COLOR: #0000FF;
            TEXT-DECORATION: none;
        }

        A.b2:visited {
            COLOR: #0000FF;
            TEXT-DECORATION: none;
        }

        A.b2:hover {
            COLOR: #0000FF;
            TEXT-DECORATION: underline;
        }

        .logo img {
            height: auto !important;
            width: auto !important;
        }

        .nwspicitempic2 a img {
            width: 140px !important;
            height: 140px !important;
        }

        .nwspicitempic a img {
            width: 140px !important;
            height: 140px !important;
        }

        .ls-fullwidth .ls-playvideo,
        .ls-fullwidth .ls-nav-sides,
        .ls-fullwidth .ls-bottom-slidebuttons a,
        .ls-fullwidth .ls-nav-prev,
        .ls-fullwidth .ls-nav-next,
        .ls-fullwidth .ls-nav-start,
        .ls-fullwidth .ls-nav-stop,
        .ls-fullwidth .ls-fullscreen,
        .ls-fullwidth .ls-loading-container {
            background-image: url('images/sskin.png') !important;
        }

        .ls-fullwidth .ls-nav-prev {
            background-position: 0px 0px !important;
        }

            .ls-fullwidth .ls-nav-prev:hover {
                background-position: 0px -82px !important;
            }

        .ls-fullwidth .ls-nav-next {
            background-position: -150px 0px !important;
        }

            .ls-fullwidth .ls-nav-next:hover {
                background-position: -150px -82px !important;
            }

        .ls-fullwidth .ls-bottom-slidebuttons a {
            background-position: 0px -165px !important;
        }

            .ls-fullwidth .ls-bottom-slidebuttons a.ls-nav-active,
            .ls-fullwidth .ls-bottom-slidebuttons a:hover {
                background-position: -80px -165px !important;
            }

        .ls-fullwidth .ls-nav-prev,
        .ls-fullwidth .ls-nav-next {
            width: 27px !important;
            height: 78px !important;
            margin-top: -39px !important;
        }

        .ls-fullwidth .ls-bottom-slidebuttons a {
            width: 42px !important;
        }

        .ls-fullwidth .ls-nav-prev {
            left: 0px !important;
        }

        .ls-fullwidth .ls-nav-next {
            right: 0px !important;
        }

        .ls-fullwidth .ls-bottom-slidebuttons,
        .ls-fullwidth .ls-nav-start,
        .ls-fullwidth .ls-nav-stop,
        .ls-fullwidth .ls-nav-sides {
            top: -75px !important;
        }

        .ls-fullwidth .ls-nav-prev, .ls-fullwidth .ls-nav-next {
            z-index: 99 !important;
        }

        @media (max-width: 990px) {
            .ls-fullwidth .ls-bottom-slidebuttons, .ls-fullwidth .ls-nav-start, .ls-fullwidth .ls-nav-stop, .ls-fullwidth .ls-nav-sides {
                display: none !important;
            }
        }

        .orgchartdiv2 p {
            color: white;
        }

        .orgchartdiv3 p {
            color: white;
        }

        .orgchartdiv4 p {
            color: white;
        }

        .orgchartdiv1 p {
            color: white;
        }

        .image-gallery-item {
            height: 320px !important;
            margin-bottom: 20px;
        }

        .thumb-info img {
            height: 250px !important;
        }

        .mfp-counter {
            direction: ltr !important;
        }

        .boximg {
            margin: 5px;
        }

        .topcenterimg {
            background-image: url('images/insBox_t_44.png');
            background-position: center;
            height: 50px;
            padding: 0px 5px 0px 5px;
            line-height: 50px;
            text-align: right;
            font-family: tahoma;
            font-size: 9pt;
            color: #015484;
            font-weight: bold;
        }

        .botcenterimg {
            background-image: url('images/insBox_b_47.png');
            background-position: center;
            height: 5px;
        }

        .bordersimg {
            background-position: left;
            background-repeat: repeat-y;
            border-left: 1px #aaaaaa solid;
            border-right: 1px #aaaaaa solid;
            border-bottom: 0px #aaaaaa solid;
            border-top: 0px #aaaaaa solid;
            background-color: #ffffff;
        }

        .bordersimgr {
            background-position: right;
            background-repeat: repeat-y;
        }
    </style>

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" runat="Server">
    <div class="bread-bar">
        <div class="container">

            <div class="row">
                <div class="col-md-9 ptit">
                    <h1 id="pageTitle" runat="server"></h1>
                </div>
                <div class="col-md-3 plink">
                   
                </div>
            </div>
        </div>
    </div>

    <div class="">
        <div class="container">
            <div class="row">
                <div class="col-md-9 nopadr" style="margin-top: 20px;">
                    
                    <div id="PrintArea">
                        <div id="pageBody" runat="server"></div>
                    </div>
                </div>
                <div class="col-md-3 nopadr nopadl">
                    <div class="calm" style="margin-top: 50px;">
                        <script language="JavaScript">var holydays;
                            var cal1 = [];
                            var cal2 = [];
                            cal2[13920611] = '&nbsp;1392/06/11&nbsp;شهادت امام جعفر صادق';
                            cal2[13920617] = '&nbsp;1392/06/17&nbsp;قیام 17 شهریور';
                            cal2[13940704] = '&nbsp;1394/07/04&nbsp;افتتاحیه و روز اول نمایشگاه تلکام';
                            cal2[13940705] = '&nbsp;1394/07/05&nbsp;روز دوم نمایشگاه تلکام';
                            cal2[13940706] = '&nbsp;1394/07/06&nbsp;روز سوم نمایشگاه تلکام';
                            cal2[13940707] = '&nbsp;1394/07/07&nbsp;اختتامیه و روز چهارم نمایشگاه تلکام';
                            holydays = '';</script>
                        <link rel="stylesheet" href="css/calender.css" />
                        <script language="JavaScript"
                            src="js/Calendar.js"></script>
                        <script language="javascript"
                            src="js/Tooltip.js"></script>
                        <script language="JavaScript"> startmove = 1;
                            document.write('<div id="testdiv" name="testdiv" ></div><INPUT TYPE="hidden" id="date1" name="date1" VALUE="" SIZE=25>');
                            var cal = new CalendarPopup('testdiv');
                            cal.setReturnFunction("returnMyFormat");
                            cal.setDayHeaders("ی", "د", "س", "چ", "پ", "ج", "ش");
                            cal.setWeekStartDay(6);
                            cal.offsetX = 60;
                            cal.offsetY = 30;
                            document.onmousemove = mouseMove;
                            function mouseMove(ev) {
                                ev = ev || window.event;
                                get_mouse(ev);
                            }
                            cal.select(document.getElementById('date1'), 'anchor1', 'MM/dd/yyyy');
                            now = calcPersianDate();
                            CP_hideCalendar('' + now.substring(0, 4) + '' + now.substring(5, 7) + '' + now.substring(8, 10));</script>
                        <div id="topdeck" class="popper"></div>
                    </div>

                    <div style="clear: both"></div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>

