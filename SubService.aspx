<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="subService.aspx.cs" Inherits="SubService" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" runat="Server">
    <div class="main sub1 sub2">
        <div class="bread-bar">
            <div class="container">

                <div class="row">
                    <div class="col-md-12 ptit">
                        <h1 id="pageTitle2" runat="server"><i class="icon-internet"></i>
                           
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        <div class="">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 stit" id="stit">
                        <!--عنوان صفحه-->
                        <h1 id="pageTitle" runat="server"></h1>
                    </div>

                    <div id="ServicePanel" runat="server">
                    </div>
                </div>
            </div>
        </div>

        <div class="featured-boxes-full">
            <div class="col-md-2">
                <div class="featured-box-full fb11 hidden-sm hidden-xs">
                </div>
            </div>
            <div class="col-md-8">
                <div class=" featured-boxes-full">
                    <!--باکس ها (3 تایی) - زیر اخبار-->
                    <div class="col-md-4">
                        <div class="featured-box-full fb1">
                            <a href="#">
                                <img alt="" src="images/tehran%20online%20shape%20s1.png"></a>
                            <h4></h4>
                            <p><a href="#">مشاهده <i class="icon-a3-left"></i></a></p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="featured-box-full fb2">
                            <a href="#">
                                <img alt="" src="images/mokhabarat1881.png"></a>
                            <h4></h4>
                            <p><a href="#">مشاهده <i class="icon-a3-left"></i></a></p>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="featured-box-full fb3">
                            <a href="#">
                                <img alt="" src="images/ganjine-shohadas(1).png"></a>
                            <h4></h4>
                            <p><a href="#">مشاهده <i class="icon-a3-left"></i></a></p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-md-2">
                <div class="featured-box-full fb33 hidden-sm hidden-xs">
                </div>
            </div>
        </div>
        <div style="clear: both;"></div>
    </div>

</asp:Content>


