var Activate = false,
    WindowHeight = '',
    WindowWidth = '',
    SearchActive = false,
    StatusSTR = '',
    Page = '',
    BackURL = '',
    BackHoastName = '',



    CustomerMobile = '',
    CustomerID = '',
    lotteryId = 0;
  
function isNumberKey(evt) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;
    return true;
}
function IsNumeric(sText) {
    var ValidChars = "0123456789.";
    var IsNumber = true;
    var Char;
    for (i = 0; i < sText.length && IsNumber == true; i++) {
        Char = sText.charAt(i);
        if (ValidChars.indexOf(Char) == -1) {
            IsNumber = false;
        }
    }
    return IsNumber;
}

$(document).ready(function () {
    //General
    $.ajaxSetup({ cache: false });
    jQuery.support.cors = true;
    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })
    //carousel
    $('.carousel').carousel({
        interval: 6000
    })
    $('input.number').on('keypress', function () { return isNumberKey(event); });
    var emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    var NotEMail = /^[a-z0-9\_\.]{1,2}\@[a-z0-9\_\.]{1,2}\.[a-z]{1,6}$/;
    var NotUserMailCheck = /^[a-z0-9\_\.]{1,2}\@[a-z0-9\_\.]{1,50}\.[a-z]{1,6}$/;
    var NotHostMailCheck = /^[a-z0-9\_\.]{1,50}\@[a-z0-9\_\.]{1,2}\.[a-z]{1,6}$/;
    var NotExtMailCheck = /^[a-z0-9\_\.]{1,50}\@[a-z0-9\_\.]{1,50}\.[a-z]{1}$/;

    $('#PolResult').hide();
    $('#NotPolResult').hide();
    //Loading
    $('.loading').hide();

    $(window).resize(function () {
        WindowHeight = $(window).height();
        WindowWidth = $(window).width();
        if (WindowWidth < 800) {
            $('.section-tehran').css('height', WindowHeight / 2);
            $('.section-social').css('height', WindowHeight / 2);
            $('.section-movie').css('height', WindowHeight / 2)
        } else {
            $('.section-tehran').css('height', WindowHeight / 1.5);
            $('.section-social').css('height', WindowHeight / 1.5);
            $('.section-movie').css('height', WindowHeight / 1.5);
        }
    }).trigger('resize');


    // go to top
    $('body').append('<div class="gototop">^</div>');
    $(".gototop").hide();
    $(window).scroll(function () {
        if ($(window).scrollTop() > 200) {
            $(".gototop").fadeIn(800);
        }
        else {
            $(".gototop").fadeOut(800);
        }
    });
    $(".gototop").click(function () {
        $('html,body').animate({
            scrollTop: $('body').offset().top
        }, 1000);
    });

    //Search
    $('.search_form').on('click', function (event) {
        var SearchSTR = $('.search_form input.s').val();
        event.stopPropagation();
        if (!SearchActive || SearchSTR == '') {
            $('ul.nav li a').css('padding', '18px 10px');
            $('.search_form input.s').css('width', '160px').css('background', '#fff').focus();
            SearchActive = true;
        } else {
            //var SearchHTML ='' + SearchSTR;
            // window.open(SearchHTML, "_blank");
        }
    });
    $('body').on('click', function () {
        SearchActive = false;
        $('ul.nav li a').removeAttr('style');
        $('.search_form input.s').removeAttr('style').val('');
    });

    /*
    function GetVisit() {
        StatusSTR = "GetVisit";
        BackURL = document.referrer;
        if (BackURL == '') {
            BackURL = '_';
            BackHoastName = '_';
        }
        else if (BackURL.length > 0) {
            BackHoastName = BackURL.split('/')[2];
        } else {
            BackHoastName = '_';
        }
        var InfoData = { BackURL: BackURL, BackHoastName: BackHoastName, StatusSTR: StatusSTR };
        function SendInfo(FormData) {
            $.ajax({
                type: 'POST',
                url: '__DataInfo.php',
                data: InfoData,
                dataType: 'html',
                crossDomain: true,
                success: function (data) {
                },
                error: function (xhr, status, error) {
                    $('#Result').fadeIn(800).html(status + ': ' + error);
                }
            });
        }
        SendInfo(InfoData);
    } GetVisit();
    */
    //Close
    $('#POLuserForm .close-image').on('click', function () {
        $('#POLuserForm').slideUp();
        $('#POLuserForm input').val('').removeClass('alert-warning');
        $('#PolPackageSection').slideDown();
        $('#PolResult').fadeOut(200).html('');
        $('.sales-btn').removeClass('disabled').removeAttr('disabled');
        $('#NotPOLuserForm input').removeAttr('disabled');
        $('#NotPOLuserForm .registeration').removeAttr('disabled');
        $('#POLuserForm form').slideDown();
    });
    $('#NotPOLuserForm .close-image').on('click', function () {
        $('#NotPOLuserForm').slideUp();
        $('#NotPOLuserForm input').val('').removeClass('alert-warning');
        $('#NotPolPackageSection').slideDown();
        $('#NotPolResult').fadeOut(200).html('');
        $('.sales-btn').removeClass('disabled').removeAttr('disabled');
        $('#POLuserForm input').removeAttr('disabled');
        $('#POLuserForm .registeration').removeAttr('disabled');
        $('#NotPOLuserForm form').slideDown();
    });
    //Package click
    $('#PolPackageSection .sales-btn').on('click', function () {
        $('#POLuserForm').slideDown();
        $('#PolPackageSection').slideUp();
        $('#NotPolPackageSection .sales-btn').addClass('disabled').attr('disabled', 'disabled');
        $('#NotPOLuserForm input').attr('disabled', 'disabled');
        $('#NotPOLuserForm .registeration').attr('disabled', 'disabled');
    });
    $('#NotPolPackageSection .sales-btn').on('click', function () {
        $('#NotPOLuserForm').slideDown();
        $('#NotPolPackageSection').slideUp();
        $('#PolPackageSection .sales-btn').addClass('disabled').attr('disabled', 'disabled');
        $('#POLuserForm input').attr('disabled', 'disabled');
        $('#POLuserForm .registeration').attr('disabled', 'disabled');
    });

    //form
    /*pol*/
    $('#POLuserForm button.registeration').on('click', function () {
        StatusSTR = "POLuserSubmit";
        CustomerID = $('#POLuserForm #CustomerID').val();       
        CustomerMobile = $('#POLuserForm #CustomerMobile').val();
     
        var CIDNumber = CustomerID.split("");
        var CMobileNumber = CustomerMobile.split("");

       
        if (CustomerID == '' || CustomerID == null) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">شماره عضویت اینترنت پرسرعت خود(تلفن ثابت) را وارد نمایید.</div>');
            $('#POLuserForm #CustomerID').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerID').removeClass('alert-warning');
        }
        if (!IsNumeric(CustomerID)) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">شماره عضویت اینترنت پرسرعت خود(تلفن ثابت) را صحیح وارد نمایید.</div>');
            $('#POLuserForm #CustomerID').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerID').removeClass('alert-warning');
        }

        if (CustomerID.length < 8) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن ثابت خود را به همراه کد شهر صحیح وارد نمایید.</div>');
            $('#POLuserForm #CustomerID').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerID').removeClass('alert-warning');
        }

        if (CIDNumber[0] == 0) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن ثابت خود را بدون کد شهر (0) وارد نمایید..</div>');
            $('#POLuserForm #CustomerID').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerID').removeClass('alert-warning');
        }

        if (CIDNumber[0] == 9) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن ثابت خود را به همراه کد شهر صحیح وارد نمایید.</div>');
            $('#POLuserForm #CustomerID').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerID').removeClass('alert-warning');
        }

      
        if (CustomerMobile == '' || CustomerMobile == null) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن همراه خود را وارد نمایید.</div>');
            $('#POLuserForm #CustomerMobile').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerMobile').removeClass('alert-warning');
        }
        if (!IsNumeric(CustomerMobile)) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن همراه خود را صحیح وارد نمایید.</div>');
            $('#POLuserForm #CustomerMobile').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerMobile').removeClass('alert-warning');
        }
        if (CustomerMobile.length < 11) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن همراه خود را صحیح وارد نمایید.</div>');
            $('#POLuserForm #CustomerMobile').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerMobile').removeClass('alert-warning');
        }
        if (CMobileNumber[0] != 0) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">شماره موبایل خود را صحیح وارد نمایید. شماره موبایل با 0 شروع می شود.</div>');
            $('#POLuserForm #CustomerMobile').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerMobile').removeClass('alert-warning');
        }
        if (CMobileNumber[1] != 9) {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">شماره موبایل خود را صحیح وارد نمایید. شماره موبایل با 09 شروع می شود.</div>');
            $('#POLuserForm #CustomerMobile').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerMobile').removeClass('alert-warning');
        }
       

        $('#POLuserForm .loading').fadeIn(800);

        $('#POLuserForm button.registeration').attr('disabled', 'disabled').html('در حال پردازش...');
        $('#PolResult').fadeIn(800).html('<div class="alert alert-info">لطفا منتظر بمانید...</div>');
        var TceUser = true;

        var obj = new Object()
      
        obj.CustomerID = CustomerID;     
        obj.CustomerMobile = CustomerMobile;
        obj.LotteryId = $("#LotteryId").val();
        obj.Year = $("#hidLotteryYear").val();
        obj.MonthNumber = $("#hidLotteryMonth").val();


        //var FormData = { os: OS, customerId: CustomerID, customerName: CustomerName, customerLastName: CustomerLastName, customerEmail: CustomerEmail, customerMobile: CustomerMobile, favoriteContent: FavoriteContent, tceUser: TceUser /*, BackURL: BackURL, BackHoastName: BackHoastName, StatusSTR: StatusSTR */ };
        // function sendFileToServer(FormData) {
        $.ajax({
            type: 'POST',
            url: "WebServices/TelegramLotteryUserRegisterWS.asmx/Insert",
            //url: '__DataSubmit.php?' + Math.random(),
            //data: FormData,
            data: "{telegramEntity: " + JSON.stringify(obj) + " }",
            contentType: "application/json; charset=utf-8",
            datatype: "jsondata",
            async: "true",

            success: function (data) {
                $('#POLuserForm .loading').fadeOut(800);
                var msg = "";
                //alert(data.d);
                if (data.d == "1") {
                    msg = "اطلاعات شما با موفقیت ثبت گردید";
                    $('#PolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');

                    $('inpute').val('');
                    $('select').val('0');
                    $('inpute', 'select', 'button').attr('disabled', 'disabled');
                    $('#POLuserForm button.registeration').html('<span class="glyphicon glyphicon-shopping-cart"></span> ثبت اطلاعات');
                    $('#POLuserForm form').slideUp();
                    // $("#PolResult").val("");
                } else if (data.d == "2") {
                    $('#POLuserForm button.registeration').attr('disabled', false).html('ثبت اطلاعات...');
                    msg = "کاربر وارد شده قبلا در صفحه کاربران تلگرام عضو نشده است.";
                    $('#PolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
                }
                else if (data.d == "3") {
                    $('#POLuserForm button.registeration').attr('disabled', false).html('ثبت اطلاعات...');
                    msg = "کاربر وارد شده قبلا در قرعه کشی این ماه ثبت نام نموده است.";
                    $('#PolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
                }

                else if (data.d == "0") {
                    $('#POLuserForm button.registeration').attr('disabled', false).html('ثبت اطلاعات...');
                    msg = "خطا در ثبت اطلاعات.";
                    $('#PolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
                }
            },
            error: function (xhr, status, error) {
                $('#PolResult').fadeIn(800).html(status + ': ' + error);
                $('#POLuserForm .loading').fadeOut(800);
            }
        });
        // }
        //sendFileToServer(FormData);
    });

   
});