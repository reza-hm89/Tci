<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="newsList.aspx.cs" Inherits="NewsList" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
  

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <div class="ncat">
      <div class="bread-bar">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 bread">
                        <a class=b1 href='Default.aspx'>صفحه اصلي</a>&nbsp;<font
                            color='#ff9800'>&gt;</font>&nbsp;<font color='#ff9800'>اخبار مخابرات</font>&nbsp;
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 ptit">
                        <h1><i class="icon-news"></i>
                            اخبار مخابرات
                        </h1>
                    </div>
                </div>
            </div>
        </div>


        <div class="">
            <div class="container">
                <div class="row">
                    <div class="col-md-9 nopadr ncwarp">
                        <!-- اخبار سایت و لینک آرشیو-->
                        <div id="NewsListPanel" runat="server" >
                     
                        </div>

                        <div style="clear:both"></div>
                      <%--  <div class="ncarch"><a
                                href="#"><i
                                class="icon-a3-left"></i> آرشیو اخبار شرکت</a></div>--%>
                    </div>
                    <div class="col-md-3 nopadr nopadl" style="margin-top:30px;">
                        <div class="calm" style="margin-top:20px;">
                            <SCRIPT LANGUAGE="JavaScript">var holydays;
                            var cal1 = [];
                            var cal2 = [];
                            cal2[13920611] = '&nbsp;1392/06/11&nbsp;شهادت امام جعفر صادق';
                            cal2[13920617] = '&nbsp;1392/06/17&nbsp;قیام 17 شهریور';
                            cal2[13940704] = '&nbsp;1394/07/04&nbsp;افتتاحیه و روز اول نمایشگاه تلکام';
                            cal2[13940705] = '&nbsp;1394/07/05&nbsp;روز دوم نمایشگاه تلکام';
                            cal2[13940706] = '&nbsp;1394/07/06&nbsp;روز سوم نمایشگاه تلکام';
                            cal2[13940707] = '&nbsp;1394/07/07&nbsp;اختتامیه و روز چهارم نمایشگاه تلکام';
                            holydays = '';</script>
                            <link rel="stylesheet" href="css/calender.css"/>
                            <script language="JavaScript" src="js/Calendar.js"></script>
                            <script language="javascript" src="js/Tooltip.js"></script>
                            <SCRIPT LANGUAGE="JavaScript"> startmove = 1;
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

        <div class="tonews">
            <div class="container">
                <!--اخبار توسعه و لینک آرشیو-->
                <div class="row">
                    <div class="col-md-3">
                    </div>
                    <div class="col-md-6 tomtit">
                        <h2>اخبار توسعه</h2>
                    </div>
                    <div class="col-md-3 toarch">
                        <a href="newslist.aspx?archive=true"><i
                                class="icon-a3-left"></i> آرشیو اخبار توسعه</a>
                    </div>
                </div>
                <div class="row" style="margin:20px -30px 50px -30px">
                    <div id="ToseeListPanel" runat="server" >
               
                    </div>
                    <script>
                        $(".tonbox:last").css({border: "0"});
                    </script>
                </div>
            </div>
        </div>

     
        <div style="clear:both"></div>
        

 </div>
</asp:Content>


