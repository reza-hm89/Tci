<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="messageTracking.aspx.cs" Inherits="messageTracking" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
<script src="js/app/SendMessage.js"></script>

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
            background-position: 0 0 !important;
        }

        .ls-fullwidth .ls-nav-prev:hover {
            background-position: 0 -82px !important;
        }

        .ls-fullwidth .ls-nav-next {
            background-position: -150px 0 !important;
        }

        .ls-fullwidth .ls-nav-next:hover {
            background-position: -150px -82px !important;
        }

        .ls-fullwidth .ls-bottom-slidebuttons a {
            background-position: 0 -165px !important;
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
            left: 0 !important;
        }

        .ls-fullwidth .ls-nav-next {
            right: 0 !important;
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
            font-weight: bold
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
            background-color: #ffffff
        }

        .bordersimgr {
            background-position: right;
            background-repeat: repeat-y
        }

    </style>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <div class="main payam">
                <div class="bread-bar">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 bread">
                        <a class=b1 href='Default.html'>صفحه اصلی</a>&nbsp;<font
                            color='#ff9800'>&gt;</font>&nbsp;<font color='#ff9800'>فرم پیگیری</font>&nbsp;
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 ptit">
                        <h1><i class="icon-followup"></i>
                            فرم پیگیری
                        </h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="">
            <div class="container">
                <div class="row">
                    <div class="col-md-12" style="margin-bottom:40px;">
                        <font style='font-size:1px;'>&nbsp;</font>
                        <div id="PrintArea">
                            <div id="tempDiv" style="display:none"></div>
                            <form id="advformid" name="advformid" method=post onsubmit='return aformsubmit()'><input
                                    name='aform' value='add' type='hidden'/><input name='rc' value='35XZ7919XVR7MCY7'
                                                                                   type='hidden'/><input type=hidden
                                                                                                         name=duration
                                                                                                         id=duration
                                                                                                         value="0"/>
                                <div class="peidesc">
                                    <p>برای پیگیری پاسخ جواب سوال&zwnj; ارسالی&zwnj;تان لطفا شماره پیگیری سوال را در بخش
                                        زیر وارد کنید.</p>
                                </div>

                                <div class="peiform">

                                    <div class="row">
                                        <div class="form-group">
                                            <div class="col-md-4 "></div>
                                            <div class="col-md-4 center peinum">
                                                <label>شماره پیگیری</label>
                                                <input id="txtCode" class="form-control InputRequire" valid2="Disabled" valid1="required"
                                                       fieldt="string" name="unicid1" id="unicid1" maxlength="150"
                                                       value="" dir="ltr"><span style="color: red">*</span>
                                            </div>
                                            <div class="col-md-4"></div>
                                        </div>
                                    </div>


                                    <div class="row">
                                        <div class="col-md-4"></div>
                                        <div class="col-md-4">
                                            <input   type="button" class="btn btn-primary btn-lg mb-xlg" table=""
                                                   vfield="" tfield="" conn="" name="searchbutton"
                                                  
                                                   id="btnSearch" maxlength="0" value="جستجو">
                                        </div>
                                        <div class="col-md-4"></div>
                                    </div>
                                    
                                     <div id="NoResultPanel" class="sqff" style="display: none">
                                    <font style="font-size:1px;">&nbsp;</font>
                             <div>
                                 <div class="sqconf">
                                    
                                    <h3>کد پیگیری موجود نیست</h3>
                                  
                                </div>
                                
                             </div>
                        </div>

                                    <div id="mytable" class="ppei">
                                        <div class="brb"></div>

                                        <div class="row">
                                            <div class="form-group">
                                                <div class="col-md-4 "></div>
                                                <div class="col-md-4 peifamily">
                                                    <label>نام و نام خانوادگی ارسال کننده پرسش</label>
                                                    <input class="form-control center" valid2="Disabled"
                                                           valid1="Disabled" fieldt="string" name="lastname"
                                                           id="txtName" size="50" maxlength="50" value="" dir="rtl">
                                                </div>
                                                <div class="col-md-4"></div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="form-group">
                                                <div class="col-md-6 peiq">
                                                    <label>متن پرسش </label>
                                                    <textarea id="lblBody2" class="form-control" uname="سوال" maxlength=""
                                                              valid2="Disabled" valid1="Disabled" fieldt="string"
                                                              name="payam" id="payam" cols="50" rows="14"
                                                              dir="rtl"></textarea>
                                                </div>
                                                <div class="col-md-6 peir">
                                                    <label>متن پاسخ</label>
                                                    <textarea id="lblReply" class="form-control"
                                                              placeholder=""
                                                              uname="جواب" maxlength="" valid2="Disabled"
                                                              valid1="Disabled" fieldt="string" name="javab" id="javab"
                                                              cols="50" rows="14" dir="rtl"></textarea>
                                                </div>
                                            </div>
                                        </div>

                                    </div>


                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</asp:Content>

