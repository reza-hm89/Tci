<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PageBuilder.aspx.cs" Inherits="Mngmnt_User" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
   
    <script src="assets/plugins/ckeditor/ckeditor.js"></script>
    <script src="assets/plugins/ckeditor/adapters/jquery.js"></script>

    <script src="js/Page.js"></script>

    <script>
        $(function () {

            CKEDITOR.replace('txtBody', {
                language: 'fa',
                uiColor: '#c7cbd6',
                on: {
                    instanceReady: function(evt) {
                        CKEDITOR.instances["txtBody"].setData($("#txtBody").val());
                    }
                }
            });
        });
    
    </script>
</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li class="active">ایجاد صفحه جدید</li>
            </ol>
            <div class="page-header">
                <h1>ایجاد صفحه جدید</h1>
            </div>

        </div>
    </div>

    <div class="col-sm-12">
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
            <div class="panel-body">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label class="control-label">
                                نام صفحه/ فایل (به صورت انگلیسی) <span class="symbol required"></span>

                            </label>
                            <input type="text" placeholder="" class="form-control InputRequire" id="txtFileName" name="firstname">
                        </div>
                        <div class="form-group">
                            <label class="control-label">
                                عنوان صفحه <span class="symbol required"></span>

                            </label>
                            <input type="text" placeholder="" class="form-control InputRequire" id="txtTitle" name="lastname">
                        </div>

                        <div class="form-group">
                            <label class="control-label">
                                محتویات 
                            </label>
                            <div class="summernote"></div>
                            <%--<textarea class="form-control no-display" id="txtBody" name="editor1" cols="10" rows="10"></textarea>--%>
                             <textarea class="ckeditor form-control" id="txtBody" name="editor1" cols="10" rows="10"></textarea>
                        </div>
                        <div class="form-group">

                            <label class="control-label">
                                کلمات کلیدی (وبرگول جداکننده کلمات است)
								
                            </label>
                            <input id="txtKeywords" type="text" class="form-control tags" placeholder="از،با،در">
                        </div>

                    </div>


                    <div class="col-md-6">

                        <div class="form-group">
                            <label class="control-label">
                                انتخاب تصویر
                            </label>
                            <div class="">
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
                            <label class="control-label " for="form-field-select-1">
                                زبان
									
                            </label>
                            <div class="">
                                <select id="DrpLanguage" class="form-control">
                                </select>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="control-label " for="form-field-select-1">
                                قالب
                            </label>
                            <div class="">
                                <select id="DrpTemplate" class="form-control">
                                </select>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">
                                فایل css
													
                            </label>
                            <input type="text" placeholder="" class="form-control " id="txtCss" name="firstname">
                        </div>

                        <div class="form-group">
                            <label class="control-label">
                                فایل js
													
                            </label>
                            <input type="text" placeholder="" class="form-control " id="txtJs" name="firstname">
                        </div>

                    </div>

                </div>


                <div class="row">
                    <div id="DivCancel" class="col-md-2 col-sm-offset-6" style="display: none">
                        <button id="btnCancel" class="btn btn-gra btn-block">
                            انصراف
                        </button>
                    </div>
                    <div id="DivSave" class="col-md-4">
                        <button id="btnSavePage" class="btn btn-blue btn-block" >
                            ثبت اطلاعات
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

</body>
</html>
