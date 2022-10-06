<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="service.aspx.cs" Inherits="Service" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" Runat="Server">
  

</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" Runat="Server">
    <div class="main sub1">
        <div class="bread-bar">
            <div class="container">
              
                <div class="row">
                    <div class="col-md-12 ptit">
                        <h1 id="pageTitle" runat="server"><i class="icon-otherservices"></i>
                          
                        </h1>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="boxlink" style="margin:-58px 0 20px 0; position:relative; z-index:9;">
            <div class="container">
                <!--لینک های لنگر بالا -->
                <div id="ServiceTitle" runat="server" class="row" style="background:rgba(255, 255, 255, 0.9); padding:5px;">
             
                </div>
            </div>
        </div>

        <div id="ServicePanel"  runat="server"></div>
     
    </div>
</asp:Content>

