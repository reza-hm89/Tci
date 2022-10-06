<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Slide.aspx.cs" Inherits="Mngmnt_User" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <script src="js/Slide.js"></script>

</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li class="active">ثبت اسلاید</li>

            </ol>
            <div class="page-header">
                <h1>ثبت اسلاید - <span style="color: red">سایز مناسب 574 * 1920</span></h1>
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

            <div class=" panel-body">

                <div class=" form-horizontal">
                  
                    <div class="form-group">
                        <label class="col-sm-2 control-label">
                            انتخاب تصویر
                        </label>
                        <div class="col-sm-9">
                            <div class="input-group">
                                <input id="txtUrl" type="text" readonly="readonly" placeholder="آدرس فایل" class="form-control uneditable-input InputRequire">
                                <div class="input-group-btn">
                                    <div class="btn btn-light-grey btn-file">

                                        <span id="btnAddImage" class="fileupload-new"><i class="fa fa-folder-open-o"></i>انتخاب فایل</span>
                                        <input type="file" id="FileUpload" class="file-input" style="display: none">
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>


                    <div class="form-group">
                        <label class="col-sm-2 control-label">
                            نام جایگزین
													
                        </label>
                        <div class=" col-sm-9">
                            <input type="text" placeholder="نام جایگزین" class="form-control InputRequire" id="txtAlternative" name="lastname">
                        </div>

                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label">
                            لینک
													
                        </label>
                        <div class=" col-sm-9">
                            <input type="text" placeholder="لینک" class="form-control" id="txtLink">
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label ">
                            نحوه باز شدن
									
                        </label>
                        <div class="col-sm-9">
                            <select id="DrpOpenLink" class="form-control">
                                <option value="_self">باز شدن در خود پنجره</option>
                                <option value="_blank">باز شدن در پنجره جدید</option>
                            </select>
                        </div>

                    </div>
                  
                    <div class="form-group">
                        <label class="col-sm-2 control-label">
                            قرارگرفتن در بخش
									
                        </label>
                        <div class="col-sm-9">
                            <select id="DrpLanguage" class="form-control">
                                <option value="1">سایت اصلی</option>
                                <option value="2">بخش ADSL</option>
                            </select>
                        </div>

                    </div>
                    <div class="form-group">
                        <div id="DivCancel" class="col-sm-4 col-sm-offset-2" style="display: none">
                            <button id="btnCancel" class="btn btn-gra btn-block">
                                انصراف
                            </button>
                        </div>
                        <div id="DivSave" class="col-sm-4 col-sm-offset-2">
                            <button id="btnSaveSlide" class="btn btn-blue  btn-block">
                                ثبت اطلاعات 
                            </button>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </div>


</body>
</html>
