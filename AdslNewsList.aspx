<%@ Page Language="C#" MasterPageFile="AdslMasterPage.master" AutoEventWireup="true" CodeFile="AdslNewsList.aspx.cs" Inherits="Adsl_NewsList" %>


<asp:Content runat="server" ContentPlaceHolderID="Menu">

    <li><a href="AdslMain.aspx">
        <span><i class="fa fa-home font-size-fa"></i></span>
        <span>صفحه نخست</span>
    </a></li>
    <li><a href="AdslServices.aspx">خدمات و سرویس ها</a></li>
    <li><a href="AdslTechnicalSupport.aspx">پشتیبانی فنی</a></li>
    <li><a href="Agent.aspx">نمایندگان فروش</a></li>
    <li class="active"><a href="AdslNewsList.aspx">آرشیو اخبار</a></li>

</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Main">
    
    <div class="container">
    <div class="row news-archive">
        <h3 class="news-box-title">
            <span>آرشیو اخبار</span>
        </h3>
        <div class="devider"><i class="fa fa-newspaper-o fa-2x"></i></div>

        <div id="NewsList" runat="server" class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
          
         <%-- 
            <div class="text-center">
                <ul class="pagination pagination">
                    <li><a href="#">قبلی</a></li>
                    <li><a href="#">1</a></li>
                    <li><a href="#">2</a></li>
                    <li><a href="#">3</a></li>
                    <li><a href="#">4</a></li>
                    <li><a href="#">5</a></li>
                    <li><a href="#">بعدی</a></li>
                </ul>
            </div>--%>
        </div>

        <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">

          

        </div>

    </div>
</div>


</asp:Content>