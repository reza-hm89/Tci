<%@ Page Language="C#" MasterPageFile="AdslMasterPage.master" AutoEventWireup="true" CodeFile="AdslMain.aspx.cs" Inherits="Adsl_Default" %>

<asp:Content runat="server" ContentPlaceHolderID="Menu">

    <li class="active"><a href="AdslMain.aspx">
        <span><i class="fa fa-home font-size-fa"></i></span>
        <span>صفحه نخست</span>
    </a></li>
    <li><a href="AdslServices.aspx">خدمات و سرویس ها</a></li>
    <li><a href="AdslTechnicalSupport.aspx">پشتیبانی فنی</a></li>
    <li><a href="Agent.aspx">نمایندگان فروش</a></li>
    <li><a href="AdslNewsList.aspx">آرشیو اخبار</a></li>

</asp:Content>


<asp:Content runat="server" ContentPlaceHolderID="Main">


    <!-- Slider
       ==================================== -->
    <div class="slider">
        <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
            <ol runat="server" id="NavList" class="carousel-indicators">
            </ol>
            <div runat="server" id="SlideList" class="carousel-inner">
            </div>
            <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                <!--<span class="glyphicon glyphicon-chevron-left"></span>-->
                <span class="glyphicon glyphicon-circle-arrow-left"></span>
            </a>
            <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">
                <!--<span class="glyphicon glyphicon-chevron-right"></span>-->
                <span class="glyphicon glyphicon-circle-arrow-right"></span>

            </a>
        </div>
    </div>
    <!--End slider
==================================== -->

    <!-- Services
       ==================================== -->
    <section class="container services">
        <div class="row services-items">
            <div class="col-md-4 clearfix">
                <span class="image-service">
                    <img src="images/search.png" class="img-responsive img-circle" alt="search-icon">
                </span>
                <h4 class="items-services-title">بررسی پوشش خدمات +ADSL2</h4>

                <!--<form class="form-horizontal" id="search-number-form">-->
                <div class="form-group inputs-div clearfix">
                    <div class="col-sm-7 tel-sabet">
                        <input type="text" tabindex="2" class="form-control InputRequire" id="txtTel" placeholder="شماره تلفن ثابت">
                    </div>
                    <div class="col-sm-5 pish-shomare">
                        <input type="text" tabindex="1" class="form-control InputRequire" id="txtPreCode" placeholder="پیش شماره">
                    </div>

                </div>
                <div class="form-group clearfix">
                    <div class="col-sm-12 btn-barrasi">
                        <button type="button" class="btn btn-primary col-md-12" id="btnSearchAdsl">  <%--data-toggle="modal" data-target="#search-number"--%>
                            <span><i class="fa fa-search"></i></span>
                            <span>بررسی شماره تلفن</span>
                        </button>
                    </div>
                </div>
                <!--</form>-->

            </div>
            <a href="AdslServices.aspx">
                <div class="col-md-4 clearfix">
                    <div class="image-service">
                        <img src="images/money.png" class="img-responsive img-circle" alt="search-icon">
                    </div>
                    <h4 class="items-services-title">تعرفه خدمات +ADSL2</h4>
                    <p class="items-services-text">
                        تعرفه خدمات اینترنت پرسرعت مخابرات را برای مقایسه خدمات و انتخاب سرویس مورد نیاز خود مشاهده فرمایید..
               
                    </p>
                </div>
            </a>
            <a href="#">
                <div class="col-md-4 clearfix">
                    <span class="image-service">
                        <img src="images/services.png" class="img-responsive img-circle" alt="search-icon">
                    </span>
                    <h4 class="items-services-title">سفارش آنلاین خدمات +ADSL2</h4>
                    <p class="items-services-text">
                        همین حالا سرویس مورد نیازتان را به سادگی و به صورت آنلاین خریداری کنید..
               
                    </p>
                </div>
            </a>

        </div>
    </section>
    <!--End Services
==================================== -->

    <!-- Last News
       ==================================== -->
    <section class="last-news">
        <div class="container">
            <div class="row">
                <h3 class="news-box-title">
                    <span>آخرین اخبار</span>
                </h3>

                <div class="devider"><i class="fa fa-newspaper-o fa-2x"></i></div>

                <!--<div class="row">-->
                <asp:PlaceHolder runat="server" ID="NewsList"></asp:PlaceHolder>

                <!--</div>-->

            </div>
        </div>

    </section>
    <!--End Last News
==================================== -->

    <!-- Polling
       ==================================== -->
    <section class="polling">
        <div class="container">
            <div class="row" id="showpoll">
                <div class="col-md-7">
                    <img src="images/polling.png" alt="polling">
                    <span id="divPollTitle" runat="server" class="polling-question">نظر شما در رابطه با طرح زمستانه اینترنت مخابرات چیست؟</span>
                </div>
                <div runat="server" id="PollAnswers" class="col-md-5 polling-buttons">
                </div>
            </div>
            <div class="row" id="showthank" style="display: none;text-align: center">
                <span > با سپاس فراوان از شرکت در نظر سنجی</span>
               
            </div>
        </div>

    </section>
    <!--End Polling
==================================== -->


    <!-- Options ADSL
       ==================================== -->
    <section class="options-adsl">
        <div class="container">
            <div class="row">
                <h3 class="options-adsl-box-title">
                    <span>سرویس ها و خدمات</span>
                </h3>
                <div class="devider"><i class="fa fa-cogs fa-2x"></i></div>
                
                <div runat="server" id="OurServiceList"></div>        

            </div>
        </div>

    </section>
    <!--End Options ADSL
==================================== -->


</asp:Content>
