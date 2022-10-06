<%@ Page Language="C#" AutoEventWireup="true" CodeFile="TelegramLottery.aspx.cs" Inherits="Mngmnt_TelegramLottery" %>


<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <link type="text/css" href="assets/css/datetimepicker/PersianDatePicker.css" rel="stylesheet" />
    <script type="text/javascript" src="assets/js/datetimepicker/PersianDatePicker.js"></script>

    <script src="js/TelegramLottery.js"></script>

</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li class="active">ثبت  قرعه کشی ماهانه</li>
            </ol>
            <div class="page-header">
                <h1>ثبت  قرعه کشی ماهانه</h1>
            </div>

        </div>
    </div>

    <div class="col-sm-6">
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-external-link-square"></i>

                <div class="panel-tools">
                    <a class="btn btn-xs btn-link panel-collapse collapses" href="#"></a>
                    <a class="btn btn-xs btn-link panel-config" href="#panel-config" data-toggle="modal">
                        <i class="fa fa-wrench"></i>
                    </a>
                    <a class="btn btn-xs btn-link panel-refresh" href="#">
                        <i class="fa fa-refresh"></i>
                    </a>
                    <a class="btn btn-xs btn-link panel-expand" href="#">
                        <i class="fa fa-resize-full"></i>
                    </a>
                    <a class="btn btn-xs btn-link panel-close" href="#">
                        <i class="fa fa-times"></i>
                    </a>
                </div>
            </div>
            <div class="panel-body form-horizontal">

                <div class="form-group">
                    <label id="LotteryLink" class="col-sm-2 control-label">
                    </label>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        عنوان
                    </label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control " id="txtTitle" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        وضعیت 
                    </label>
                    <div class="col-sm-9">
                        <select class="form-control " id="drpStatus">
                            <option data-value="true" value="1">فعال</option>
                            <option data-value="false" value="0">غیرفعال</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        سال
                    </label>
                    <div class="col-sm-9">
                        <select class="form-control " id="drpYear">
                            <option value="95">1395</option>
                            <option value="96">1396</option>
                            <option value="97">1397</option>
                            <option value="98">1398</option>
                            <option value="99">1399</option>
                        </select>
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        ماه
                    </label>
                    <div class="col-sm-9">
                        <select class="form-control " id="drpMonth">
                            <option data-value="01" value="01">فروردین</option>
                            <option data-value="02" value="02">اردیبهشت</option>
                            <option data-value="03" value="03">خرداد</option>
                            <option data-value="04" value="04">تیر</option>
                            <option data-value="05" value="05">مرداد</option>
                            <option data-value="06" value="06">شهریور</option>
                            <option data-value="07" value="07">مهر</option>
                            <option data-value="08" value="08">آبان</option>
                            <option data-value="09" value="09">آذر</option>
                            <option data-value="10" value="10">دی</option>
                            <option data-value="11" value="11">بهمن</option>
                            <option data-value="12" value="12">اسفند</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        تاریخ شروع
                    </label>
                    <div class="col-sm-9">
                        <input type="text" runat="server" readonly="readonly"
                            class="form-control InputRequire" id="txtStartDate" placeholder="تاریخ شروع" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        ساعت شروع
                    </label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control InputRequire" id="txtStartTime" placeholder="ساعت شروع" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        تاریخ پایان
                    </label>
                    <div class="col-sm-9">
                        <input type="text" runat="server" readonly="readonly"
                            class="form-control InputRequire" id="txtEndDate" placeholder="تاریخ پایان" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        ساعت پایان
                    </label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control InputRequire" id="txtEndTime" placeholder=" ساعت پایان" />
                    </div>
                </div>

                <div class="form-group">
                    <div id="DivCancel" class="col-sm-4 col-sm-offset-2" style="display: none">
                        <button id="btnCancel" class="btn btn-gra btn-block">
                            انصراف
                        </button>
                    </div>
                    <div id="DivSave" class="col-sm-4 col-sm-offset-2">
                        <button id="btnSaveLottery" class="btn btn-blue  btn-block">
                            ثبت اطلاعات 
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>


</body>
</html>
