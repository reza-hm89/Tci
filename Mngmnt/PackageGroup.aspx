<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PackageGroup.aspx.cs" Inherits="Mngmnt_PackageGroup" %>

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

    <script src="js/PackageGroup.js"></script>
          
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
                <li class="active">ثبت نمایندگی</li>
            </ol>
            <div class="page-header">
                <h1>ثبت گروه</h1>
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
            <div class="panel-body form-horizontal">

                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        نام گروه
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="نام واحد" id="txtName" class="form-control InputRequire">
                    </div>
                </div>
              <div class="form-group">
                    <label class="col-sm-2 control-label">
                        توضیحات
                    </label>
                    <div class="col-sm-9">
                        <textarea class="ckeditor form-control" id="txtBody"  cols="10" rows="10"></textarea>
                    </div>
                </div>

                <div class="form-group">
                    <div id="DivCancel" class="col-sm-4 col-sm-offset-2" style="display: none">
                        <button id="btnCancel" class="btn btn-gra btn-block">
                            انصراف
                        </button>
                    </div>
                    <div id="DivSave" class="col-sm-4 col-sm-offset-2">
                        <button id="btnSavePackageGroup" class="btn btn-blue  btn-block">
                            ثبت اطلاعات 
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>


</body>
</html>
