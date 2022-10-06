<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Auction.aspx.cs" Inherits="Mngmnt_Auction" %>


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

    <script src="assets/plugins/ckeditor/ckeditor.js"></script>
    <script src="assets/plugins/ckeditor/adapters/jquery.js"></script>

    <link rel="stylesheet" type="text/css" href="assets/css/dropzone.css" />
    <script src="assets/js/dropzone.js"></script>

    <script src="js/Auction.js"></script>

    <script>
        $(function () {

            CKEDITOR.replace('txtDescription', {
                language: 'fa',
                uiColor: '#c7cbd6',
                on: {
                    instanceReady: function (evt) {
                        CKEDITOR.instances["txtDescription"].setData($("#txtDescription").val());
                    }
                }
            });
        });

    </script>

    <script type="text/javascript">


        Dropzone.options.myAwesomeDropzone = {
            paramName: "file", // The name that will be used to transfer the file
            maxFilesize: 25, // MB
            maxFiles: 25,
            filesizeBase:5000,
            clickable: true,
            addRemoveLinks: true,

            url: "Auction.aspx?tid=<%=Request.QueryString["tid"]%>",
            init: function () {
                this.on("queuecomplete", function (file) {
                    //HideLoading();
                }),
                    this.on("totaluploadprogress", function (file) {
                        //ShowLoading();
                    }),
                    this.on("removedfile", function (file) {
                        // HideLoading();
                    });
            }
        };

    </script>


    <style>
        .picUpload {
            width: 90px;
            height: 90px;
            border: solid thin #9c999e;
            border-radius: 7px;
            margin-left: 8px;
            margin-top: 10px;
            float: right;
            display: none;
        }

            .picUpload:hover {
                opacity: 0.7;
                -khtml-opacity: 0.7;
                -moz-opacity: 0.7;
                -ms-filter: "progid:DXImageTransform.Microsoft.Alpha(Opacity=70)";
                cursor: pointer;
            }

        .picUploadList {
            width: 100%;
            height: 115px;
            overflow-y: auto;
            display: none;
        }
    </style>
</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li class="active">ثبت مزایده/مناقصه</li>
            </ol>
            <div class="page-header">
                <h1>ثبت مزایده/مناقصه</h1>
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
                    <label class="col-sm-2 control-label">
                        عنوان گروه
                    </label>
                    <div class="col-sm-9">
                        <select class="form-control " id="drpAuctionGroup"></select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        نوع سند
                    </label>
                    <div class="col-sm-9">
                        <select class="form-control " id="DrpKind">
                            <option value="2">مزایده</option>
                            <option value="1">مناقصه</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        عنوان/موضوع
                    </label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control InputRequire" id="txtSubject" placeholder="عنوان/موضوع " />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        شماره
                    </label>
                    <div class="col-sm-9">
                        <input type="text" class="form-control InputRequire" id="txtNumber" placeholder="شماره " />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        تاریخ انتشار مزایده/مناقصه
                    </label>
                    <div class="col-sm-9">
                        <input type="text" runat="server" readonly="readonly" class="form-control InputRequire" id="txtRegDate" placeholder=" تاریخ انتشار مزایده/مناقصه " />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        مهلت دریافت سند از
                    </label>
                    <div class="col-sm-9">
                        <input type="text" runat="server" readonly="readonly" class="form-control InputRequire" id="StartRecieveDate" placeholder="مهلت دریافت سند از" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        مهلت دریافت سند تا
                    </label>
                    <div class="col-sm-9">
                        <input type="text" runat="server" readonly="readonly" class="form-control InputRequire" id="EndRecieveDate" placeholder="مهلت دریافت سند تا" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        مهلت ارسال سند
                    </label>
                    <div class="col-sm-9">
                        <input type="text" runat="server" readonly="readonly" class="form-control InputRequire" id="SendDate" placeholder="مهلت ارسال سند" />
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        تاریخ بازگشایی پاکت ها
                    </label>
                    <div class="col-sm-9">
                        <input type="text" runat="server" readonly="readonly" class="form-control InputRequire" id="ReOpeningDate" placeholder="تاریخ بازگشایی پاکت ها" />
                    </div>
                </div>

                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        انتخاب فایل 
                    </label>
                    <label class="col-sm-5 control-label">
                                        (حداکثر سایز برای آپلود 25 مگابایت می باشد)
                                    </label>
                    </div>
                  <div class="form-group">
                    <div class="col-sm-12">
                        <div class="input-group">
                            <div class="input-group-btn">
                                <div class="btn btn-light-grey btn-file">
                                    

                                    <span id="btnAddImage" class="fileupload-new"><i class="fa fa-folder-open-o"></i>انتخاب فایل</span>
                                    <input type="file" id="FileUpload" class="file-input" style="display: none">
                                </div>

                            </div>
                        </div>
                        <div id="my-awesome-dropzone" class="dropzone"
                            style="max-height: 333px; overflow-y: auto; width: 103%; margin-top: 10px; border: 1px solid lightgray;">
                            <div class="fallback">
                                <input id="File1" name="file" type="file" multiple="multiple" runat="server" />
                                <input name="btnUpload" type="submit" /><br />
                                <br />
                                <asp:Label ID="lblFallbackMessage" runat="server" />
                            </div>
                        </div>
                        <div class="picUploadList">
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div id="DivCancel" class="col-sm-4 col-sm-offset-2" style="display: none">
                        <button id="btnCancel" class="btn btn-gra btn-block">
                            انصراف
                        </button>
                    </div>
                    <div id="DivSave" class="col-sm-4 col-sm-offset-2">
                        <button id="btnSaveAuction" class="btn btn-blue  btn-block">
                            ثبت اطلاعات 
                        </button>
                    </div>
                </div>

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
                    <label class="col-sm-2 control-label">
                        توضیحات
                    </label>
                    <div class="col-sm-9">
                        <textarea class="ckeditor form-control" id="txtDescription" cols="10" rows="10"></textarea>
                    </div>
                </div>

            </div>
        </div>
    </div>

</body>
</html>
