<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Default.aspx.cs" Inherits="_Default" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">

	<script src="js/jquery.cookie.js"></script>
	<script type="text/javascript" src="js/app/Default.js"></script>


</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" runat="Server">


	<div class="">
		<br>
		<div id="myCarousel" class="carousel slide" data-ride="carousel" style="margin-top: -21px;">
			<!-- Indicators -->
			<ol runat="server" id="circles" class="carousel-indicators">
			</ol>

			<!-- Wrapper for slides -->
			<div id="SliderPanel" runat="server" class="carousel-inner" role="listbox">
			</div>

			<!-- Left and right controls -->
			<a class="left carousel-control" href="#myCarousel" role="button" data-slide="prev">
				<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
				<span class="sr-only">Previous</span>
			</a>
			<a class="right carousel-control" href="#myCarousel" role="button" data-slide="next">
				<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
				<span class="sr-only">Next</span>
			</a>
		</div>
	</div>

	<div class="fbox" style="">
		<div class="container">
			<div id="TopServicePanel" runat="server" class="row" style="background: rgba(255, 255, 255, 0.9); padding: 5px;">
			</div>
		</div>
	</div>

	<div class="">
		<div class="container">
			<div class="row">
				<h1 class="newstit"><strong><i class="icon-news"></i>&nbsp;اخبار</strong></h1>
				<div class="col-md-9 nopadr ncwarp">
					<!-- اخبار سایت و لینک آرشیو-->
					<div id="NewsListPanel" runat="server">
					</div>

				</div>
				<%-- <div class="col-md-6 nopadr newsc">
                    <div class="bltit">
                        <h2><i class="icon-itnews"></i></h2>
                        <span><a href="NewsList.aspx"><i
                            class="icon-a3-left"></i>&nbsp;مشاهده همه خبر ها</a></span>
                        <div style="clear: both"></div>
                    </div>
                    <!--اخبار - باکس سمت راست-->
                    <div id="SliderNewsPanel" runat="server" class="owl-carousel"
                        data-plugin-options='{"items": 1, "autoplay": true, "autoplayTimeout": 3000}'>
                    </div>
                </div>
                <div class="col-md-6 nopadl redmt">
                    <div class="bltit">
                        <h2><i class="icon-tctnews"></i></h2>
                        <span><a href="NewsList.aspx"><i class="icon-a3-left"></i>&nbsp;مشاهده همه خبر ها</a></span>
                        <div style="clear: both"></div>
                    </div>
                    <div class="gwarp">
                        <div id="NewsPanel" runat="server">
                            <!--اخبار - باکس سمت چپ-->

                        </div>
                        <div style="clear: both;"></div>
                    </div>

                    <script type="text/javascript">
                        $(".tctn:last").css({ border: "0" });
                        </script>
                </div>--%>

				<div style="clear: both;"></div>
				<!--مشاهده صفحه خبر ها-->
				<h3 class="newsmore"><strong><a
					href="NewsList.aspx"><i
						class="icon-a3-left"></i>مشاهده صفحه خبر ها </a></strong></h3>

			</div>
		</div>
	</div>

	<div style="clear: both;"></div>

	<div style="margin-top: 50px;">
		<div class="container">
			<div class="row">
				<div class="col-md-6 col-sm-6 ads hidden-sm hidden-xs" style="border-left: 1px solid #e0e0e0;">
					<ul class="list list-icons list-icons-style-3 list-icons-lg">
						<li style="float: right; width: 50%">
							<img style="width: 30%" src="images/195.jpg" /><a
								href="https://195.ict.gov.ir/" target="_blank">سامانه سپاس</a></li>
						<li style="float: right; width: 50%; margin-top: 5px">
							<img style="width: 50%" src="images/logo-adsl.png" /><a
								href="AdslMain.aspx">بخش ADSL</a></li>
					</ul>
				</div>
				<%--  <div class="col-md-4 col-sm-4 ads hidden-sm hidden-xs" style="border-left: 1px solid #e0e0e0; dis">
                    <div class="owl-carousel"
                        data-plugin-options='{"items": 1, "autoplay": true, "autoplayTimeout": 3000}'>
                        <asp:PlaceHolder runat="server" ID="LinkList"></asp:PlaceHolder>

                    </div>
                </div>--%>
				<div class="col-md-6 col-sm-6 mmt">
					<div class="ann">
						<h2 style="padding-right: 15px;"><i class="icon-campaign"></i>آگهی ها</h2>
					</div>
					<div style="clear: both;"></div>
					<div class="col-md-4 col-sm-4 col-xs-4 notice">
						<ul class="list list-icons list-icons-style-3 list-icons-lg">
							<li><i class="fa icon-auction"></i><a
								href="AuctionList.aspx?id=2">مزایده
                                    ها</a></li>
						</ul>
					</div>
					<div class="col-md-4 col-sm-4 col-xs-4 notice">
						<ul class="list list-icons list-icons-style-3 list-icons-lg">
							<li><i class="fa icon-tender"></i><a
								href="AuctionList.aspx?id=1">مناقصه
                                    ها</a></li>
						</ul>
					</div>

					<div class="col-md-4 col-sm-4 col-xs-4 notice">
						<ul class="list list-icons list-icons-style-3 list-icons-lg">
							<li><i class="fa icon-call"></i><a href="#">فراخوان ها</a></li>
						</ul>
					</div>


					<div class="ann-more">
					</div>
				</div>
			</div>
		</div>
	</div>
	<!--نظر سنجی-->
	<h1 class="polltit"><strong><i class="">
		<img alt="" src="images/pollico.png"></i> نظر سنجی</strong></h1>
	<div class="mpoll">
		<div class="container">
			<div class="row">
				<div class="showpoll">
					<div runat="server" id="divPollTitle" class="col-md-6 pollq" data-id="10">
					</div>
					<div class="col-md-6 pollr">
						<asp:PlaceHolder runat="server" ID="PollAnswers"></asp:PlaceHolder>

					</div>
				</div>
				<div class="showthank">
					<div class="col-md-12 pollth">
						با سپاس فراوان از شرکت در نظر سنجی
                       
					</div>
				</div>
			</div>
		</div>
	</div>


	<!-- Modal -->
	<div class="modal fade" id="myModal" role="dialog" runat="server">
		<div class="modal-dialog">

			<!-- Modal content-->
			<div class="modal-content">
				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal">&times;</button>
					<h4 class="modal-title" id="modalTitle" runat="server"></h4>
				</div>
				<div class="modal-body">
					<img style="width:100%" runat="server" id="modalImage"  />
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-default" data-dismiss="modal">بستن</button>
				</div>
			</div>

		</div>
	</div>


</asp:Content>
