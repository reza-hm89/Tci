<%@ Page Language="C#" AutoEventWireup="true" CodeFile="News.aspx.cs" Inherits="Mngmnt_News" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />

    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <script src="assets/plugins/ckeditor/ckeditor.js"></script>
    <script src="assets/plugins/ckeditor/adapters/jquery.js"></script>

    <script src="js/News.js"></script>
    
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
                <li class="active">ثبت خبر </li>
            </ol>
            <div class="page-header">
                <h1>ثبت خبر</h1>
            </div>

        </div>
    </div>

    <div class="col-sm-8">
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
                    <div class="col-md-12">
                        <div class="form-group">
                            <label class="control-label">
                                روتیتر		
                            </label>
                            <input type="text" placeholder="روتیتر" class="form-control InputRequire" id="txtRoTitr">
                        </div>
                        <div class="form-group">
                            <label class="control-label">
                                تیتر	
                            </label>
                            <input type="text" placeholder="تیتر" class="form-control InputRequire" id="txtTitr">
                        </div>
                        <div class="form-group">
                            <label class="control-label">
                                زیرتیتر	
                            </label>
                            <input type="text" placeholder="زیرتیتر" class="form-control InputRequire" id="txtZirTitr">
                        </div>
                        <div class="form-group">
                            <label class="control-label">
                                انتخاب تصویر <span style="color: red">سایز مناسب 335 * 570</span>
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
                            <label class="control-label">
                                متن خبر
                            </label>
                            <div class="summernote"></div>
                            <textarea class="ckeditor form-control" id="txtBody"  cols="10" rows="10"></textarea>
                        </div>
                        <div class="form-group">

                            <label class="control-label">
                                کلمات کلیدی (وبرگول جداکننده کلمات است)
								
                            </label>
                            <input id="txtKeywords" type="text" class="form-control tags" placeholder="از،با،در">
                        </div>
                        <div class="form-group">
                            <label class="control-label">
                                زبان
									
                            </label>

                            <select id="DrpLanguage" class="form-control">
                            </select>

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
                        <button id="btnSaveNews" class="btn btn-blue btn-block" >
                            ثبت اطلاعات
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div class="col-sm-4">
        <div class="panel panel-default">
            <div class="panel-heading">
                <i class="fa fa-external-link-square"></i>
                تنظیمات

                <div class="panel-tools">
                    <a class="btn btn-xs btn-link panel-collapse collapses" href="#"></a>
                    <a class="btn btn-xs btn-link panel-config" href="#panel-config2" data-toggle="modal">
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
                    <div class="col-md-12">



                        <div class="form-group">
                            <label class="control-label " for="form-field-select-1">
                                <b>دسته بندی خبر (موضوعات)</b>

                            </label>
                            <div id="newsGroupData"></div>

                        </div>

                        <div class="form-group">
                            <label class="control-label " for="form-field-select-1">
                                <b>وضعیت انتشار </b>
                            </label>

                            <div class="radio">
                                <label>
                                    <input type="radio" value="0" checked="checked" name="PublishStatus" class="grey PublishStatus">
                                    پیش نویس									
                                </label>
                            </div>
                            <div class="radio">
                                <label>
                                    <input type="radio" value="1" name="PublishStatus" class="grey PublishStatus">
                                    انتشار									
                                </label>
                            </div>
                            <div class="radio">
                                <label>
                                    <input type="radio" value="2" name="PublishStatus" class="grey PublishStatus">
                                    انتشار در آینده									
                                </label>
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="control-label">
                                <b>سایر تنظیمات</b>

                            </label>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="ShowInSlide" value="" class="grey">
                                    نمایش در اسلایدشو
									
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="Special" value="" class="grey">
                                    خبر ویژه
									
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="Comment" value="" class="grey">
                                    ثبت نظر
									
                                </label>
                            </div>
                            <div class="checkbox">
                                <label>
                                    <input type="checkbox" id="Rate" value="" class="grey">
                                    امتیاز دهی
									
                                </label>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    </div>

</body>
</html>
