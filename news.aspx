<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="news.aspx.cs" Inherits="news" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <style>
        #mn2 ul.dropdown-menu {
            background: #fff url("images/mn1bg_94463.jpg") no-repeat left bottom !important;
        }

        #mn1 ul.dropdown-menu {
            background: #fff url("images/sunet_94315.png") no-repeat left bottom !important;
        }

        #mn4 ul.dropdown-menu {
            background: #fff url("images/mn4bg.jpg") no-repeat left bottom !important;
        }

        .bread font:last-child {
            color: #000 !important;
        }
    </style>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" runat="Server">
    <div class="bread-bar">
        <div class="container">

            <div class="row">
                <div class="col-md-9 ptit">
                    <h1>
                        <span id="newsTitr" runat="server"></span>
                    </h1>
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
                    <font style='font-size: 1px;'>&nbsp;</font>
                    <div id="PrintArea">
                        <br>
                        <div align="center">
                            <br>
                            <div align="center">
                                <table border='0' dir='rtl' width='100%' cellspacing='0' cellpadding='0' id='table1'
                                    style='text-align: right'>
                                  
                                    <tr>
                                        <td align="center">
                                            <br>
                                            <table name='toph1' id='toph1' border='0' cellpadding='2'
                                                style='border-collapse: collapse; text-align: right'
                                                bordercolor='#111111' width='96%' height='1'>
                                                <tr>
                                                    <td height='1' dir="rtl" valign='top'>
                                                        <img id="newsImage" runat="server" border='0'
                                                            alt='' src=''
                                                            align='left'
                                                            style='width: 250px; height: 166px; border: 5px solid transparent; padding-left: 4px; padding-right: 4px; padding-top: 1px; padding-bottom: 1px; margin: 10px 10px 10px 10px'>
                                                        </img>
                                                        <div>
                                                            <font id="newsRoTitlr" runat="server" face='Tahoma' style='font-size: 7pt'
                                                                color='#228cc2'></font>
                                                            <br>
                                                            <br>
                                                            <b>
                                                                <font id="newsTitr2" runat="server"
                                                                    face='Tahoma' style='font-size: 10pt'
                                                                    color='#002b5a'></font></b>
                                                            <div name='mc1' id=''
                                                                style='font-size: 10pt'
                                                                face='Tahoma' color='#000000'>
                                                                <br>
                                                                <br>
                                                                <div align='justify' style='line-height: 230%;'></div>
                                                                <p><strong id="newsZirTitr" runat="server"></strong></p>
                                                                <p id="newsBody" runat="server"></p>
                                                            </div>
                                                        </div>
                                            </table>

                                        </td>
                                    </tr>
                                </table>

                                <div id="txtDetail" runat="server"></div>


                                <br>
                                <br>
                                <div style="text-align: center; font-family: Tahoma; font-size: 8pt; line-height: 30px">
                                    برای این خبر نظری ثبت نشده است
                                   
                                </div>

                                <div id="votehelper" style="display: none">
                                    <div id="votevotemsg"
                                        style="display: none; line-height: 28px; direction: rtl; color: red">
                                    </div>
                                    <div id="votevotecon" dir="ltr"
                                        style="font-family: Tahoma; font-size: 8pt; color: black; line-height: 28px">
                                        <div align="right">
                                            <table cellpadding='2' dir='rtl'
                                                style='font-family: Tahoma; font-size: 9pt'>
                                                <tr>
                                                    <td>نام :</td>
                                                    <td>
                                                        <input name='votevotename' id='votevotename' value=''
                                                            type='text'
                                                            style='font-family: IRANSans, Tahoma, Arial, sans-serif; font-size: 9pt; width: 170px;' />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>ايميل :&nbsp;</td>
                                                    <td>
                                                        <input name='votevoteemail' id='votevoteemail' value=''
                                                            type='text' dir='ltr'
                                                            style='font-family: IRANSans, Tahoma, Arial, sans-serif; font-size: 9pt; width: 170px;' />
                                                    </td>
                                                </tr>
                                                <input type="hidden" name="votecomuser" id="votecomuser" value="" />
                                                <tr>
                                                    <td>*نظرات :</td>
                                                    <td>
                                                        <textarea name='votevotematn' id='votevotematn'
                                                            style='height: 72px; font-family: Tahoma; font-size: 9pt; width: 250px'></textarea>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style='height: 20px'></td>
                                                    <td style='height: 20px'>
                                                        <img src='images/cap.png' width='120'
                                                            height='60' id='votenewscap' />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style='height: 20px'>متن تصویر را وارد کنید:</td>
                                                    <td style='height: 20px'>
                                                        <input type='text' name='votecap'
                                                            id='votecap' size='10'
                                                            style='font-family: IRANSans, Tahoma, Arial, sans-serif; font-size: 8pt; text-transform: uppercase'
                                                            dir='ltr' value=''></td>
                                                </tr>
                                                <tr>
                                                    <td style='height: 40px'></td>
                                                    <td style='height: 40px'>
                                                        <input name='Submit1' type='submit'
                                                            value='ارسال'
                                                            style='font-family: IRANSans, Tahoma, Arial, sans-serif; font-size: 9pt; width: 75px;'
                                                            onclick="savevotevote()" />&nbsp;
                                                        </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div id="votevotecon2" style="display: none; line-height: 28px; direction: ltr">
                                        ...در حال ثبت نظر&nbsp;&nbsp;<img src="images/rating.gif"
                                            style="margin-bottom: -5px" />
                                    </div>
                                </div>
                            </div>
                            <div style="background-image: url('images/tabback.png'); border: 1px #D9DBE0 solid; margin: 10px 2px; direction: rtl; padding-top: 4px; text-align: right">
                                <div onclick="if(document.getElementById('newsvote').style.display=='none'){document.getElementById('newsvote').style.display='';}else{document.getElementById('newsvote').style.display='none'};Set_Cookie( 'newsvotestate', document.getElementById('newsvote').style.display, 400, '/', '', '' );"
                                    style="font-family: Tahoma; font-size: 8pt; font-weight: bold; cursor: pointer; color: white; text-align: center; width: 100px; background-color: #6699cc; background-image: url('/images/tabgrid.png'); line-height: 20px; margin: 0px 4px">
                                    نظر شما
                                   
                                </div>
                                <div style="height: 3px; background-color: #6699cc"></div>
                                <div id="newsvote" style="text-align: center; padding: 15px;">
                                    <script>document.getElementById('newsvote').style.display = newsvotestate</script>
                                    <div id="newsvotemsg"
                                        style="display: none; line-height: 28px; direction: rtl; color: red">
                                    </div>
                                    <div id="newsvotecon" dir="ltr"
                                        style="font-family: Tahoma; font-size: 8pt; color: black; line-height: 28px">
                                        <div align="right">
                                            <table cellpadding='2' dir='rtl'
                                                style='font-family: Tahoma; font-size: 9pt'>
                                                <tr>
                                                    <td>نام :</td>
                                                    <td>
                                                        <input name='votename' id='votename' value='' type='text'
                                                            style='font-family: Tahoma; font-size: 9pt; width: 170px;' />
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>ايميل :&nbsp;</td>
                                                    <td>
                                                        <input name='voteemail' id='voteemail' value='' type='text'
                                                            dir='ltr'
                                                            style='font-family: Tahoma; font-size: 9pt; width: 170px;' />
                                                    </td>
                                                </tr>
                                                <input type="hidden" name="comuser" id="comuser" value="" />
                                                <tr>
                                                    <td>*نظرات :</td>
                                                    <td>
                                                        <textarea name='votematn' id='votematn'
                                                            style='height: 72px; font-family: Tahoma; font-size: 9pt; width: 250px'></textarea>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style='height: 20px'></td>
                                                    <td style='height: 20px'>
                                                        <img src='images/cap_2.png'
                                                            width='120' height='60'
                                                            id='newscap' /></td>
                                                </tr>
                                                <tr>
                                                    <td style='height: 20px'>متن تصویر را وارد کنید:</td>
                                                    <td style='height: 20px'>
                                                        <input type='text' name='cap' id='cap'
                                                            size='10'
                                                            style='font-family: Tahoma; font-size: 8pt; text-transform: uppercase'
                                                            dir='ltr' value=''>
                                                        <span
                                                            id='invalidcap'
                                                            style="color: red; font-family: Tahoma; font-size: 8pt; font-weight: bold; display: none; direction: rtl">خطا! متن تصویر را اشتباه وارد کرده اید.</span>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td style='height: 40px'></td>
                                                    <td style='height: 40px'>
                                                        <input name='Submit1' type='submit'
                                                            value='ارسال'
                                                            style='font-family: Tahoma; font-size: 9pt; width: 75px;'
                                                            onclick="savenewsvote()" />&nbsp;
                                                        </td>
                                                </tr>
                                            </table>
                                        </div>
                                    </div>
                                    <div id="newsvotecon2" style="display: none; line-height: 28px; direction: ltr">
                                        ...در حال ثبت نظر&nbsp;&nbsp;<img src="images/rating.gif"
                                            style="margin-bottom: -5px" />
                                    </div>
                                </div>

                                <br>
                                <b><font face='Tahoma' size='2'>
                                    <div align=center><font color='#0000FF' onclick='window.close()'
                                                            style='cursor:pointer'>خروج</font>
                                </font></b>
                            </div>
                        </div>
                        <br>
                        <br>
                    </div>
                    <br>
                    <br>
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

   

    <div style="clear: both;"></div>



</asp:Content>


