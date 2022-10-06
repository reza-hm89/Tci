<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Language.aspx.cs" Inherits="Mngmnt_Language" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>
    <title></title>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <script src="js/Language.js"></script>

</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li class="active">ثبت زبان</li>
            </ol>
            <div class="page-header">
                <h1>ثبت زبان</h1>
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
                        عنوان
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="عنوان" id="txtName" class="form-control InputRequire">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        آیکن
                    </label>
                    <div class="col-sm-9">
                        <div class="input-group">
                            <input id="txtUrl" type="text" readonly="readonly" placeholder="آدرس فایل" class="form-control uneditable-input ">
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
                        لینک 
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder=" لینک" id="txtLink" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label" for="form-field-select-1">
                        نحوه باز شدن لینک
                    </label>
                    <div class="col-sm-9">
                        <select id="drpOpenLink" class="form-control">
                            <option value="_self">باز شدن در خود پنجره</option>
                            <option value="_blank">باز شدن در پنجره جدید</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        کد اختصار زبان 
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="  کد اختصار زبان " id="txtCode" class="form-control">
                    </div>
                </div>
                <div class="form-group">
                    <div id="DivCancel" class="col-sm-4 col-sm-offset-2" style="display: none">
                        <button id="btnCancel" class="btn btn-gra btn-block">
                            انصراف
                        </button>
                    </div>
                    <div id="DivSave" class="col-sm-4 col-sm-offset-2">
                        <button id="btnSaveLanguage" class="btn btn-blue  btn-block">
                            ثبت اطلاعات 
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>

</body>
</html>
