var Activate = false,
    WindowHeight = '',
    WindowWidth = '',
    SearchActive = false,
    StatusSTR = '',
    Page = '',
    BackURL = '',
    BackHoastName = '',
    OS = '',
    FavoriteContent = '',
    CustomerName = '',
    CustomerLastName = '',
    CustomerEmail = '',
    CustomerMobile = '',
    CustomerID = '',
    loader = '',
    Device = '';
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
        }else{
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
        CustomerName = $('#POLuserForm #CustomerName').val();
        CustomerLastName = $('#POLuserForm #CustomerLastName').val();
        CustomerEmail = $('#POLuserForm #CustomerEmail').val();
        CustomerMobile = $('#POLuserForm #CustomerMobile').val();
        OS = $('#POLuserForm #OS').val();
        FavoriteContent = $('#POLuserForm #FavoriteContent').val();

        var CIDNumber = CustomerID.split("");
		var CMobileNumber = CustomerMobile.split("");
         
		if (OS == '' || OS == null || OS == '0') {
		    $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">نوع سیستم عامل موبایل خود را انتخاب نمایید.</div>');
		    $('#POLuserForm #OS').addClass('alert-warning').focus();
		    return false;
		} else {
		    $('#PolResult').fadeOut(200).html('');
		    $('#POLuserForm #OS').removeClass('alert-warning');
		}
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

		if (CustomerName == '' || CustomerName == null) {
		    $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">نام خود را وارد نمایید.</div>');
            $('#POLuserForm #CustomerName').addClass('alert-warning').focus();
            return false;
        } else {
		    $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerName').removeClass('alert-warning');
        }
		if (CustomerLastName == '' || CustomerLastName == null) {
		    $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">نام خانوادگی خود را وارد نمایید.</div>');
            $('#POLuserForm #CustomerLastName').addClass('alert-warning').focus();
            return false;
        } else {
		    $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #CustomerLastName').removeClass('alert-warning');
        }
		if (CustomerEmail == '' || CustomerEmail == null) {
		//    $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را وارد نمایید.</div>');
        //    $('#POLuserForm #CustomerEmail').addClass('alert-warning').focus();
        //    return false;
        //} else {
		//    $('#PolResult').fadeOut(200).html('');
        //    $('#POLuserForm #CustomerEmail').removeClass('alert-warning');
	     }

		else{
		  
	         if (!CustomerEmail.match(emailRegex)) {
	             $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	             $('#POLuserForm #CustomerEmail').addClass('alert-warning').focus();
	             return false;
	         } else {
	             $('#PolResult').fadeOut(200).html('');
	             $('#POLuserForm #CustomerEmail').removeClass('alert-warning');
	         }
	         if (CustomerEmail.match(NotEMail)) {
	             $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	             $('#POLuserForm #CustomerEmail').addClass('alert-warning').focus();
	             return false;
	         } else {
	             $('#PolResult').fadeOut(200).html('');
	             $('#POLuserForm #CustomerEmail').removeClass('alert-warning');
	         }
	         if (CustomerEmail.match(NotUserMailCheck)) {
	             $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	             $('#POLuserForm #CustomerEmail').addClass('alert-warning').focus();
	             return false;
	         } else {
	             $('#PolResult').fadeOut(200).html('');
	             $('#POLuserForm #CustomerEmail').removeClass('alert-warning');
	         }
	         if (CustomerEmail.match(NotHostMailCheck)) {
	             $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	             $('#POLuserForm #CustomerEmail').addClass('alert-warning').focus();
	             return false;
	         } else {
	             $('#PolResult').fadeOut(200).html('');
	             $('#POLuserForm #CustomerEmail').removeClass('alert-warning');
	         }
	         if (CustomerEmail.match(NotExtMailCheck)) {
	             $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	             $('#POLuserForm #CustomerEmail').addClass('alert-warning').focus();
	             return false;
	         } else {
	             $('#PolResult').fadeOut(200).html('');
	             $('#POLuserForm #CustomerEmail').removeClass('alert-warning');
	         }
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
        if (FavoriteContent == '' || FavoriteContent == null || FavoriteContent == '0') {
            $('#PolResult').fadeIn(800).html('<div class="alert alert-warning">یکی از مطالب مورد علاقه خود را انتخاب نمایید.</div>');
            $('#POLuserForm #FavoriteContent').addClass('alert-warning').focus();
            return false;
        } else {
            $('#PolResult').fadeOut(200).html('');
            $('#POLuserForm #FavoriteContent').removeClass('alert-warning');
        }
         
        $('#POLuserForm .loading').fadeIn(800);

        $('#POLuserForm button.registeration').attr('disabled','disabled').html('در حال پردازش...');
		$('#PolResult').fadeIn(800).html('<div class="alert alert-info">لطفا منتظر بمانید...</div>');
		var TceUser = true;
	    
	     var obj = new Object()
	     obj.OS = OS;
	     obj.CustomerID = CustomerID;
	     obj.CustomerName = CustomerName;
	     obj.CustomerLastName = CustomerLastName;
	     obj.CustomerEmail = CustomerEmail;
	     obj.CustomerMobile = CustomerMobile;
	     obj.FavoriteContent = FavoriteContent;
	     obj.TceUser = TceUser;
	     
		//var FormData = { os: OS, customerId: CustomerID, customerName: CustomerName, customerLastName: CustomerLastName, customerEmail: CustomerEmail, customerMobile: CustomerMobile, favoriteContent: FavoriteContent, tceUser: TceUser /*, BackURL: BackURL, BackHoastName: BackHoastName, StatusSTR: StatusSTR */ };
       // function sendFileToServer(FormData) {
            $.ajax({
                type: 'POST',
                url: "WebServices/TelegramRegisterWS.asmx/Insert",
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
                        msg = "شماره موبایل وارد شده تکراری می باشد.";
                        $('#PolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
                    } else if (data.d == "3") {
                        $('#POLuserForm button.registeration').attr('disabled', false).html('ثبت اطلاعات...');
                        msg = "ایمیل وارد شده تکراری می باشد.";
                        $('#PolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
                    } else if (data.d == "4") {
                        $('#POLuserForm button.registeration').attr('disabled', false).html('ثبت اطلاعات...');
                        msg = "شماره عضویت (تلفن ثابت ) شما تکراری می باشد.";
                        $('#PolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
                    }
                    //alert(msg);

                },
                error: function (xhr, status, error) {
                    $('#PolResult').fadeIn(800).html(status + ': ' + error);
                    $('#POLuserForm .loading').fadeOut(800);
                }
            });
       // }
        //sendFileToServer(FormData);
	}) ;

    /*notpol*/
	$('#NotPOLuserForm button.registeration').on('click', function () {
	    StatusSTR = "NotPOLuserSubmit";
	    CustomerID = $('#NotPOLuserForm #PhoneNumber2').val();
	    CustomerName = $('#NotPOLuserForm #Name2').val();
	    CustomerLastName = $('#NotPOLuserForm #LastName2').val();
	    CustomerEmail = $('#NotPOLuserForm #Email2').val();
	    CustomerMobile = $('#NotPOLuserForm #Mobile2').val();
	    OS = $('#NotPOLuserForm #OS2').val();
	    FavoriteContent = $('#NotPOLuserForm #FavoriteContent2').val();

	    var PhoneNumber = CustomerID.split("");
	    var MobileNumber = CustomerMobile.split("");
	    //alert(OS);
	    if (OS == '' || OS == null || OS == '0') {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">نوع سیستم عامل موبایل خود را انتخاب نمایید.</div>');
	        $('#NotPOLuserForm #OS').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #OS').removeClass('alert-warning');
	    }
	    if (CustomerID == '' || CustomerID == null) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">تلفنی که بر روی آن اینترنت پرسرعت می خواهید را به همراه کد شهر وارد نمایید.</div>');
	        $('#NotPOLuserForm #PhoneNumber').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #PhoneNumber').removeClass('alert-warning');
	    }
	    if (!IsNumeric(CustomerID)) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن خود را به همراه کد شهر صحیح وارد نمایید.</div>');
	        $('#NotPOLuserForm #PhoneNumber').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #PhoneNumber').removeClass('alert-warning');
	    }
	    if (CustomerID.length < 8) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن ثابت خود را به همراه کد شهر صحیح وارد نمایید.</div>');
	        $('#NotPOLuserForm #PhoneNumber').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #PhoneNumber').removeClass('alert-warning');
	    }
	    if (PhoneNumber[0] == 0) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن ثابت خود را بدون کد شهر (0) وارد نمایید.</div>');
	        $('#NotPOLuserForm #PhoneNumber').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #PhoneNumber').removeClass('alert-warning');
	    }
	    if (PhoneNumber[0] == 9) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن ثابت خود را به همراه کد شهر صحیح وارد نمایید.</div>');
	        $('#NotPOLuserForm #PhoneNumber').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #PhoneNumber').removeClass('alert-warning');
	    }

	    if (CustomerName == '' || CustomerName == null) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">نام خود را وارد نمایید.</div>');
	        $('#NotPOLuserForm #Name').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #Name').removeClass('alert-warning');
	    }
	    if (CustomerLastName == '' || CustomerLastName == null) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">نام خانوادگی خود را وارد نمایید.</div>');
	        $('#NotPOLuserForm #LastName').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #LastName').removeClass('alert-warning');
	    }
	    if (CustomerEmail == '' || CustomerEmail == null) {
	        //    $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را وارد نمایید.</div>');
	        //    $('#NotPOLuserForm #Email').addClass('alert-warning').focus();
	        //    return false;
	        //} else {
	        //    $('#NotPolResult').fadeOut(200).html('');
	        //    $('#NotPOLuserForm #Email').removeClass('alert-warning');
	    } else {
	        if (!CustomerEmail.match(emailRegex)) {
	            $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	            $('#NotPOLuserForm #Email').addClass('alert-warning').focus();
	            return false;
	        } else {
	            $('#NotPolResult').fadeOut(200).html('');
	            $('#NotPOLuserForm #Email').removeClass('alert-warning');
	        }
	        if (CustomerEmail.match(NotEMail)) {
	            $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	            $('#NotPOLuserForm #Email').addClass('alert-warning').focus();
	            return false;
	        } else {
	            $('#NotPolResult').fadeOut(200).html('');
	            $('#NotPOLuserForm #Email').removeClass('alert-warning');
	        }
	        if (CustomerEmail.match(NotUserMailCheck)) {
	            $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	            $('#NotPOLuserForm #Email').addClass('alert-warning').focus();
	            return false;
	        } else {
	            $('#NotPolResult').fadeOut(200).html('');
	            $('#NotPOLuserForm #Email').removeClass('alert-warning');
	        }
	        if (CustomerEmail.match(NotHostMailCheck)) {
	            $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	            $('#NotPOLuserForm #Email').addClass('alert-warning').focus();
	            return false;
	        } else {
	            $('#NotPolResult').fadeOut(200).html('');
	            $('#NotPOLuserForm #Email').removeClass('alert-warning');
	        }
	        if (CustomerEmail.match(NotExtMailCheck)) {
	            $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">پست الکترونیک خود را صحیح وارد نمایید.</div>');
	            $('#NotPOLuserForm #Email').addClass('alert-warning').focus();
	            return false;
	        } else {
	            $('#NotPolResult').fadeOut(200).html('');
	            $('#NotPOLuserForm #Email').removeClass('alert-warning');
	        }
	    }
	    if (CustomerMobile == '' || CustomerMobile == null) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن همراه خود را وارد نمایید.</div>');
	        $('#NotPOLuserForm #rMobile').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #Mobile').removeClass('alert-warning');
	    }
	    if (!IsNumeric(CustomerMobile)) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن همراه خود را صحیح وارد نمایید.</div>');
	        $('#NotPOLuserForm #Mobile').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #Mobile').removeClass('alert-warning');
	    }
	    if (CustomerMobile.length < 11) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">تلفن همراه خود را صحیح وارد نمایید.</div>');
	        $('#NotPOLuserForm #Mobile').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #Mobile').removeClass('alert-warning');
	    }
	    if (MobileNumber[0] != 0) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">شماره موبایل خود را صحیح وارد نمایید. شماره موبایل با 0 شروع می شود.</div>');
	        $('#NotPOLuserForm #Mobile').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #Mobile').removeClass('alert-warning');
	    }
	    if (MobileNumber[1] != 9) {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">شماره موبایل خود را صحیح وارد نمایید. شماره موبایل با 09 شروع می شود.</div>');
	        $('#NotPOLuserForm #Mobile').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #Mobile').removeClass('alert-warning');
	    }
	    if (FavoriteContent == '' || FavoriteContent == null || FavoriteContent == '0') {
	        $('#NotPolResult').fadeIn(800).html('<div class="alert alert-warning">یکی از مطالب مورد علاقه خود را انتخاب نمایید.</div>');
	        $('#NotPOLuserForm #FavoriteContent').addClass('alert-warning').focus();
	        return false;
	    } else {
	        $('#NotPolResult').fadeOut(200).html('');
	        $('#NotPOLuserForm #FavoriteContent').removeClass('alert-warning');
	    }
	    $('#NotPOLuserForm .loading').fadeIn(800);

	    $('#NotPOLuserForm button.registeration').attr('disabled','disabled').html('در حال پردازش...');
		$('#NotPolResult').fadeIn(800).html('<div class="alert alert-info">لطفا منتظر بمانید...</div>');

		var TceUser = false;
	    var obj2 = new Object();
		obj2.OS = OS;
		obj2.CustomerID = CustomerID;
		obj2.CustomerName = CustomerName;
		obj2.CustomerLastName = CustomerLastName;
		obj2.CustomerEmail = CustomerEmail;
		obj2.CustomerMobile = CustomerMobile;
		obj2.FavoriteContent = FavoriteContent;
		obj2.TceUser = TceUser;

		//var FormData = { os: OS, customerId: CustomerID, customerName: CustomerName, customerLastName: CustomerLastName, customerEmail: CustomerEmail, customerMobile: CustomerMobile, favoriteContent: FavoriteContent, tceUser: TceUser /*, BackURL: BackURL, BackHoastName: BackHoastName, StatusSTR: StatusSTR */ };
		//function sendFileToServer(FormData) {
		$.ajax({
		    type: 'POST',
		        url: "WebServices/TelegramRegisterWS.asmx/Insert",
		        //url: '__DataSubmit.php?' + Math.random(),
		        //data: FormData,
		        data: "{telegramEntity: " + JSON.stringify(obj2) + " }",
		        contentType: "application/json; charset=utf-8",
		        datatype: "jsondata",
		        async: "true",
		        success: function (data) {
		         
		       
		            $('#NotPOLuserForm .loading').fadeOut(800);
		            var msg = "";
		            //alert(data.d);
		            if (data.d == "1") {
		                msg = "اطلاعات شما با موفقیت ثبت گردید";
		                $('#NotPolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');

		                $('inpute').val('');
		                $('select').val('0');
		                $('inpute', 'select', 'button').attr('disabled', 'disabled');
		                $('#NotPOLuserForm button.registeration').html('<span class="glyphicon glyphicon-shopping-cart"></span> ثبت اطلاعات');
		                $('#NotPOLuserForm form').slideUp();
		                // $("#NotPolResult").val("");
		            } else if (data.d == "2") {
		                $('#NotPOLuserForm button.registeration').attr('disabled', false).html('ثبت اطلاعات...');
		                msg = "شماره موبایل وارد شده تکراری می باشد.";
		                $('#NotPolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
		            } else if (data.d == "3") {
		                $('#NotPOLuserForm button.registeration').attr('disabled', false).html('ثبت اطلاعات...');
		                msg = "ایمیل وارد شده تکراری می باشد.";
		                $('#NotPolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
		            } else if (data.d == "4") {
		                $('#NotPOLuserForm button.registeration').attr('disabled', false).html('ثبت اطلاعات...');
		                msg = "شماره عضویت (تلفن ثابت ) شما تکراری می باشد.";
		                $('#NotPolResult').fadeIn(800).html('<div class="alert alert-success">' + msg + '</div>');
		            }
		            //alert(msg);
		        },
		        error: function (xhr, status, error) {
		            $('#NotPolResult').fadeIn(800).html(status + ': ' + error);
		            $('#NotPOLuserForm .loading').fadeOut(800);
		        }
		        


		    });
	    //}
	    //sendFileToServer(FormData);
	});
});