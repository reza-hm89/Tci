<%@ Page Language="C#" MasterPageFile="AdslMasterPage.master" AutoEventWireup="true" CodeFile="AdslContactUs.aspx.cs" Inherits="Adsl_ContactUs" %>

<asp:Content runat="server" ContentPlaceHolderID="Head">

    <script type="text/javascript"
        src="http://maps.google.com/maps/api/js?sensor=false">
    </script>

    <script type="text/javascript"
        src="https://maps.googleapis.com/maps/api/js?key=AIzaSyAsfooeYG0U5lOLxZYFXQcUwdk0AePEhL4&callback=initMap">
    </script>

    <script type="text/javascript">
        function initialize() {
            var position = new google.maps.LatLng(37.4753091, 57.341435);
            var myOptions = {
                zoom: 10,
                center: position,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(
                    document.getElementById("map_canvas"),
                    myOptions);

            var marker = new google.maps.Marker({
                position: position,
                map: map,
                title: "This is the place."
            });

            var contentString = 'Hello <strong>World</strong>!';
            var infowindow = new google.maps.InfoWindow({
                content: contentString
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            ////////////////   namayesh dar vasate safhe bar asase marker    /////////
            map.addListener('center_changed', function () {
                // 3 seconds after the center of the map has changed, pan back to the
                // marker.
                window.setTimeout(function () {
                    map.panTo(marker.getPosition());
                }, 3000);
            });

            marker.addListener('click', function () {
                map.setZoom(8);
                map.setCenter(marker.getPosition());
            });

        }

    </script>

</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Menu">

    <li><a href="AdslMain.aspx">
        <span><i class="fa fa-home font-size-fa"></i></span>
        <span>صفحه نخست</span>
    </a></li>
    <li><a href="AdslServices.aspx">خدمات و سرویس ها</a></li>
    <li><a href="AdslTechnicalSupport.aspx">پشتیبانی فنی</a></li>
    <li><a href="Agent.aspx">نمایندگان فروش</a></li>
    <li><a href="AdslNewsList.aspx">آرشیو اخبار</a></li>

</asp:Content>

<asp:Content runat="server" ContentPlaceHolderID="Main">

  <%--  <div class="container-fluid google-map">
        <div class="row">
            <div class="col-lg-12 col-sm-12 col-md-12 col-xs-12">
                <div id="map_canvas" style="width: 100%; height: 500px"></div>
            </div>
        </div>
    </div>--%>
    <!-- Googgle Map -->


    <div id="exTab1" class="container">

        <h3 class="news-box-title">
            <span>ارتباط با ما</span>
        </h3>
        <div class="devider"><i class="fa fa-phone-square fa-2x"></i></div>


        <ul class="nav nav-pills">
            <li class="active">
                <a href="#moshtarian" data-toggle="tab">واحد فروش و امور مشتریان</a>
            </li>
            <li><a href="#fanni" data-toggle="tab">واحد پشتیبانی فنی</a>
            </li>
            <li><a href="#ravabet-omumi" data-toggle="tab">واحد روابط عمومی</a>
            </li>
            <li><a href="#sedaye-moshtari" data-toggle="tab">واحد صدای مشتری</a>
            </li>
        </ul>

        <div class="tab-content clearfix">
            <div class="tab-pane active" id="moshtarian">
                <div class="row">

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-map-marker fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-phone fa-2x"></i></h2>
                        <h4 class="text-center">شماره تماس</h4>
                        <p class="text-center">تلفن: ۱۵۱۵ داخلی ۱</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-envelope fa-2x"></i></h2>
                        <h4 class="text-center">آدرس ایمیل</h4>
                        <p class="text-center">info [at] adsl [dot] ir</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-user-circle fa-2x"></i></h2>
                        <h4 class="text-center">گفتگوی آنلاین</h4>
                        <p class="text-center">گفتگوی آنلاین با تیم پشتیبانی</p>
                    </div>

                </div>
            </div>
            <div class="tab-pane" id="fanni">
                <div class="row">

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                </div>
            </div>
            <div class="tab-pane" id="ravabet-omumi">
                <div class="row">

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                </div>
            </div>
            <div class="tab-pane" id="sedaye-moshtari">
                <div class="row">

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                    <div class="col-xs-12 col-sm-6 col-md-3 col-lg-3">
                        <h2 class="text-center"><i class="fa fa-address-book fa-2x"></i></h2>
                        <h4 class="text-center">آدرس</h4>
                        <p class="text-center">خراسان شمالی بجنورد خیابان شریعتی شمالی چهارراه مخابرات</p>
                    </div>

                </div>
            </div>
        </div>
    </div>


    <div class="container">

        <h3 class="news-box-title">
            <span>فرم ارسال پیام</span>
        </h3>
        <div class="devider"><i class="fa fa-envelope fa-2x"></i></div>

        <div class="row form-tamas-ba-ma">
            <div class="col-md-6 col-md-offset-3">
                <form>
                    <div class="form-group">
                        <label for="txtName">نام:</label>
                        <input type="text" class="form-control InputRequire" id="txtName">
                    </div>

                    <div class="form-group">
                        <label for="txtFamily">نام خانوادگی:</label>
                        <input type="text" class="form-control InputRequire" id="txtFamily">
                    </div>

                    <div class="form-group">
                        <label for="txtEmail">پست الکترونیکی:</label>
                        <input type="email" class="form-control InputRequire" id="txtEmail">
                    </div>

                    <div class="form-group">
                        <label for="txtSubject">موضوع:</label>
                        <input type="text" class="form-control InputRequire" id="txtSubject">
                    </div>

                    <div class="form-group">
                        <label for="txtComment">متن:</label>
                        <textarea class="form-control InputRequire" rows="5" id="txtComment"></textarea>
                    </div>

                    <button type="button" id="btnSendMessage" class="btn btn-primary col-md-6">ارسال</button>
                </form>
            </div>
        </div>
    </div>


</asp:Content>
