<%@ Page Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="Auction.aspx.cs" Inherits="Auction" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
   
    <script src="js/app/AuctionDownload.js"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" runat="Server">
    <div class="bread-bar">
        <div class="container">

            <div class="row">
                <div class="col-md-9 ptit">
                    <h1 id="pageTitle" runat="server"></h1>
                </div>

            </div>
        </div>
    </div>

    <div class="">
        <div class="container">
            <div class="row">
                <div class="col-md-9 nopadr" style="margin-top: 20px;">
                    <font style='font-size: 1px;'>&nbsp;</font>
                    <div id="PrintArea">
                        <table style="width: 100%" cellspacing="1">
                            <tbody>
                                <tr>
                                    <td>
                                        <table style="width: 100%; direction: rtl; font-family: Tahoma; font-size: 8pt" cellspacing="0" cellpadding="0">
                                            <tbody>
                                                <tr style="line-height: 22px; padding: 5px 2px">
                                                    <td style="background-color: #A6A6A6"></td>
                                                    <td runat="server" id="Subject" style="background-color: #A6A6A6; color: #000080; font-weight: 700; text-align: right;" width="60%"></td>
                                                    <td style="background-color: #A6A6A6; color: #FFFFFF; text-align: right;" width="40%">تاریخ ثبت : <span runat="server" id="RegDate" dir="ltr"></span></td>
                                                </tr>
                                                <tr>
                                                    <td style="background-color: #F8F8F8" colspan="3">
                                                        <table style="width: 100%" cellspacing="0" cellpadding="0">
                                                            <tbody>
                                                                <tr style="line-height: 22px; padding: 2px; display: none">
                                                                    <td nowrap="nowrap" style="text-align: right">طبقه بندي :</td>
                                                                    <td runat="server" id="GroupName" width="100%" style="text-align: right"></td>
                                                                </tr>
                                                                <tr style="line-height: 22px; padding: 2px; display: ">
                                                                    <td nowrap="nowrap" style="text-align: right">عنوان مناقصه :</td>
                                                                    <td runat="server" id="Subject2" width="100%" style="text-align: right"></td>
                                                                </tr>
                                                                <tr style="line-height: 22px; padding: 2px; display: ">
                                                                    <td nowrap="nowrap" style="text-align: right">شماره مناقصه :</td>
                                                                    <td runat="server" id="Number" width="100%" style="text-align: right"></td>
                                                                </tr>

                                                                <tr style="line-height: 22px; padding: 2px; display: ">
                                                                    <td nowrap="nowrap" style="text-align: right">تاریخ انتشار :</td>
                                                                    <td runat="server" id="RegDate2" width="100%" style="text-align: right"></td>
                                                                </tr>
                                                                <tr style="line-height: 22px; padding: 2px; display: ">
                                                                    <td nowrap="nowrap" style="text-align: right">پایان فروش اسناد :</td>
                                                                    <td runat="server" id="EndReciveDate" width="100%" style="text-align: right"></td>
                                                                </tr>
                                                                <tr style="line-height: 22px; padding: 2px; display: ">
                                                                    <td nowrap="nowrap" style="text-align: right">بازگشایی پاکات :</td>
                                                                    <td runat="server" id="ReopningDate" width="100%" style="text-align: right"></td>
                                                                </tr>
                                                                <tr style="line-height: 22px; padding: 2px; display: ">
                                                                    <td nowrap="nowrap" style="text-align: right">متن آگهی :</td>
                                                                    <td runat="server" id="Description" width="100%" style="text-align: right"></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <%--<td style="line-height: 18px; background-color: #A6A6A6; padding: 2px; text-align: right" colspan="2">تعداد نمایش : ۷۰</td>
                                                    <td style="line-height: 18px; background-color: #A6A6A6; padding: 2px; text-align: right" colspan="1"><a href="#" style="text-decoration: none; color: #FFFFFF" onmouseover=" this.style.textDecoration = &#39;underline&#39; " onmouseout=" this.style.textDecoration = &#39;none&#39; ">&lt;&lt;بازگشت</a></td>--%>
                                                </tr>

                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                    <div style="clear: both"></div>
                    <br />
                    <div id="divDownloadForm" runat="server">
                        <span style="color: red">برای دریافت فایل ها لطفا مشخصات خود را ثبت نمایید</span>
                        <br />
                        <div class="row">
                            <div class="form-group">
                                <div class="col-md-6">
                                    <label>نام *</label>
                                    <input id="txtName" class="form-control InputRequire" dir="rtl" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6">
                                    <label>نام خانوادگی *</label>
                                    <input id="txtFamily" class="form-control InputRequire" dir="rtl" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6">
                                    <label>شماره تماس *</label>
                                    <input id="txtTel" class="form-control InputRequire" dir="rtl" />
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-md-6">
                                    <label>توضیحات *</label>
                                    <textarea id="txtDescription" class="form-control InputRequire" dir="rtl" rows="5"></textarea>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-6 mt-md">
                                <input id="btnInsertDownload" type="button" class="btn btn-primary btn-lg mb-xlg" size="21"
                                    value="ارسال" />
                            </div>
                        </div>
                    </div>
                    <div id="divShowDownloadFile" style="display: none">
                        <div class="row">
                            <div id="FileList" class="col-md-12 mt-md">
                                
                            </div>
                        </div>
                    </div>
					<div id="divShowDownloadFile1"  runat="server" style="display: none">
                        <div class="row">
                            <div  class="col-md-12 mt-md">
                                <span style="color:red">مهلت دانلود فایل به اتمام رسیده است.</span>
                            </div>
                        </div>
                    </div>
                    <div class="brb"></div>
                    <div style="clear: both"></div>
                    <br />
                </div>
                <div class="col-md-3 nopadr nopadl" style="margin-top: 30px;">
                    <div class="calm" style="margin-top: 20px;">
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
                        <script language="JavaScript" src="js/Calendar.js"></script>
                        <script language="javascript" src="js/Tooltip.js"></script>
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

                </div>
            </div>
    </div>
    </div>
</asp:Content>

