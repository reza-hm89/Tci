<%@ Page Language="C#" MasterPageFile="MasterPage.master" AutoEventWireup="true" CodeFile="AuctionList.aspx.cs" Inherits="AuctionList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
   
    <link rel="stylesheet" href="css/Table.css" type="text/css"/>
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
                        <div id="pageBody" runat="server">
                            <div align="center" style="padding: 5px">
                              
                        
                                <div class="datagrid">
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>رديف</th>
                                                <th>شماره</th>
                                                <th>عنوان</th>
                                                <th>تاريخ انتشار</th>                                               
                                                <th>آخرین مهلت فروش</th>
                                                <th>آخرین مهلت تحویل اسناد</th>
												 <th>بازگشایی</th>
                                            </tr>
                                        </thead>
                                     <%--   <tfoot>
                                            <tr>
                                                <td colspan="7">
                                                    <div id="paging">
                                                        <ul>
                                                            <li><a href="#"><span>Previous</span></a></li>
                                                            <li><a href="#" class="active"><span>1</span></a></li>
                                                            <li><a href="#"><span>2</span></a></li>
                                                            <li><a href="#"><span>3</span></a></li>
                                                            <li><a href="#"><span>4</span></a></li>
                                                            <li><a href="#"><span>5</span></a></li>
                                                            <li><a href="#"><span>Next</span></a></li>
                                                        </ul>
                                                    </div>
                                            </tr>
                                        </tfoot>--%>
                                        <tbody>
                                        <asp:PlaceHolder runat="server" ID="AuctionListData"></asp:PlaceHolder>
                                            
                                         
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>



                    </div>
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

