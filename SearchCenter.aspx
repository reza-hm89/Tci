<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" EnableEventValidation="false" AutoEventWireup="true" CodeFile="SearchCenter.aspx.cs" Inherits="SearchCenter" %>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" runat="Server">
    <div class="bread-bar">
        <div class="container">

            <div class="row">
                <div class="col-md-9 ptit">
                    <h1 id="pageTitle" runat="server">بررسی وضعیت خط adsl</h1>
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
                        <div id="pageBody" runat="server">
                            <div class="row">
                                <div class="form-group">
                                    <div class="col-md-2">
                                        <label>پیش شماره *</label>
                                        <input runat="server" id="txtName" class="form-control InputRequire" dir="rtl" /><span
                                            style="color: red">*</span>
                                    </div>
                                    <div class="col-md-3">
                                        <label>شماره *</label>
                                        <input runat="server" id="txtFamily" class="form-control InputRequire" dir="rtl" /><span
                                            style="color: red" />*
                                           
                                    </div>

                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <div class="col-md-2">
                                        <asp:Button id="btnSendMessage" UseSubmitBehavior="False" CausesValidation="False" 
                                            CssClass="btn btn-primary btn-lg mb-xlg"
                                            Text="بررسی"  runat="server" OnClick="btnSendMessage_OnClick"/>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <div class="col-md-6">
                                        <label runat="server" id="lblResult"></label>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="form-group">
                                    <div class="col-md-6">
                                        <label runat="server" id="lblCenter"></label>
                                    </div>
                                </div>
                            </div>

                        </div>
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

