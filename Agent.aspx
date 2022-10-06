<%@ Page Language="C#" MasterPageFile="AdslMasterPage.master" AutoEventWireup="true" CodeFile="Agent.aspx.cs" Inherits="Adsl_Agent" %>

<asp:Content runat="server" ContentPlaceHolderID="Menu">

    <li><a href="AdslMain.aspx">
        <span><i class="fa fa-home font-size-fa"></i></span>
        <span>صفحه نخست</span>
    </a></li>
    <li><a href="AdslServices.aspx">خدمات و سرویس ها</a></li>
    <li><a href="AdslTechnicalSupport.aspx">پشتیبانی فنی</a></li>
    <li class="active"><a href="Agent.aspx">نمایندگان فروش</a></li>
    <li><a href="AdslNewsList.aspx">آرشیو اخبار</a></li>

</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Main">    
    
    <div class="container">
    <div class="row jadvale-namayandegan">

        <h3 class="news-box-title">
            <span>نمایندگان فروش</span>
        </h3>
        <div class="devider"><i class="fa fa-users fa-2x"></i></div>


        <h4>بازدید کننده محترم، برای استفاده از جداول زیر به این موارد دقت فرمایید:</h4>
        <ul>
            <li>برای جستجو و یافتن نزدیکترین نمایندگی به محل شما از جعبه جستجو استفاده فرمایید.</li>
           <%-- <li>از نمایندگان محترمی که اطلاعاتشان در جدول بصورت ناقص نمایش داده میشود درخواست میگردد در اسرع وقت اطلاعات
                بروز شده خود را از طریق تلفن به بخش امور نمایندگان (داخلی ۴) برای درج در جدول اعلام نمایند.
            </li>--%>
            <li>مشترکین میتوانند شکایات خود از عملکرد نمایندگان را با درج کد نماینده از طریق فرم تماس با برای ما ارسال
                فرمایند.
            </li>
        </ul>


        <table data-toggle="table"
               data-pagination="true"
               data-page-size="20"
               data-page-list="[5,10,20,50]"
               data-pagination-first-text="اولین"
               data-pagination-pre-text="قبلی"
               data-pagination-next-text="بعدی"
               data-pagination-last-text="آخرین"
               data-advanced-search="true"
               data-search="true"
               data-sort-order="desc"
               id="hbsoft">
            <thead>
            <tr>
                <th data-sortable="true" data-align="center" data-field="city">شهرستان</th>
                <th data-sortable="true" data-align="center" data-field="sale">عاملیت فروش</th>                
                <th data-sortable="true" data-align="center">نام خانوادگی</th>
                <th data-align="center">آدرس</th>
                <th data-sortable="true" data-align="center">تلفن ثابت</th>
            </tr>
            </thead>
            <tbody runat="server" id="AgentList">                    

            </tbody>
        </table>
    </div>
</div>

</asp:Content>