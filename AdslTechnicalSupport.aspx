<%@ Page Language="C#" MasterPageFile="AdslMasterPage.master" AutoEventWireup="true" CodeFile="AdslTechnicalSupport.aspx.cs" Inherits="Adsl_TechnicalSupport" %>

<asp:Content runat="server" ContentPlaceHolderID="Menu">

    <li><a href="AdslMain.aspx">
        <span><i class="fa fa-home font-size-fa"></i></span>
        <span>صفحه نخست</span>
    </a></li>
    <li><a href="AdslServices.aspx">خدمات و سرویس ها</a></li>
    <li class="active"><a href="AdslTechnicalSupport.aspx">پشتیبانی فنی</a></li>
    <li><a href="Agent.aspx">نمایندگان فروش</a></li>
    <li><a href="AdslNewsList.aspx">آرشیو اخبار</a></li>

</asp:Content>


<asp:Content runat="server" ContentPlaceHolderID="Main">


    <div class="container">
        <div class="row news-archive">
            <h3 class="news-box-title">
                <span runat="server" id="txtTitle"></span>
            </h3>
            <div class="devider"><i class="fa fa-support fa-2x"></i></div>

            <div runat="server" id="txtBody" class="col-xs-12 col-sm-12 col-md-8 col-lg-8">
              

            </div>

            <div class="col-xs-12 col-sm-12 col-md-4 col-lg-4">


                <div class="left-box-news-archive">
                    <!--<div class="widget widget_text">-->
                    <!---->
                    <!--</div>-->
                    <div class="panel panel-primary">
                        <div class="panel-heading">پشتیبانی</div>
                        <div class="panel-body">

                            <div runat="server" id="MenuList" class="list-group">
                              
                            </div>

                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>

</asp:Content>
