<%@ Page Language="C#" MasterPageFile="AdslMasterPage.master" AutoEventWireup="true" CodeFile="AdslServices.aspx.cs" Inherits="Adsl_Services" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">

    <link rel="stylesheet" href="node_modules/bootstrap-table/dist/bootstrap-table.css">
    <script src="node_modules/bootstrap-table/dist/locale/bootstrap-table-fa-IR.js"></script>
    <script src="js/app/AdslServices.js"></script>

</asp:Content>


<asp:Content runat="server" ContentPlaceHolderID="Menu">

    <li><a href="AdslMain.aspx">
        <span><i class="fa fa-home font-size-fa"></i></span>
        <span>صفحه نخست</span>
    </a></li>
    <li class="active"><a href="AdslServices.aspx">خدمات و سرویس ها</a></li>
    <li><a href="AdslTechnicalSupport.aspx">پشتیبانی فنی</a></li>
    <li><a href="Agent.aspx">نمایندگان فروش</a></li>
    <li><a href="AdslNewsList.aspx">آرشیو اخبار</a></li>

</asp:Content>


<asp:Content runat="server" ContentPlaceHolderID="Main">

    <div class="container">
        <div id="" class="row jadvale-namayandegan">

            <h3 class="news-box-title">
                <span>خدمات و سرویس ها</span>
            </h3>
            <div class="devider"><i class="fa fa-cog fa-2x"></i></div>

            <ul runat="server" id="GroupList" class="nav nav-pills">
            </ul>
            <br />
            <div id="ServiceList" class="tab-content clearfix">
            </div>

        </div>
    </div>

</asp:Content>
