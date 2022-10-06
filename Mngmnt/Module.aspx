<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Module.aspx.cs" Inherits="Mngmnt_Module" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>
    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <script src="js/Module.js"></script>
</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li class="active">ایجاد ماژول</li>
                <li class="search-box">
                    <form class="sidebar-search">
                        <div class="form-group">
                            <input type="text" placeholder="جستجو">
                            <button class="submit">
                                <i class="clip-search-3"></i>
                            </button>
                        </div>
                    </form>
                </li>
            </ol>
            <div class="page-header">
                <h1>ایجاد ماژول</h1>
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
                            نام
                        </label>
                        <div class="col-sm-9">
                            <input type="text" placeholder="نام" id="txtName" class="form-control InputRequire">
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">
                            کد html منو
                        </label>
                        <div class="col-sm-9">
                            <textarea placeholder=" کد html منو" id="txtMenuContent" rows="10" class="form-control InputRequire"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">
                            کد script منو
                        </label>
                        <div class="col-sm-9">
                            <textarea placeholder="کد script منو" id="txtMenuScript" rows="2" class="form-control"></textarea>
                        </div>
                    </div>                  
                    <div class="form-group">
                        <div id="DivCancel" class="col-sm-4 col-sm-offset-2" style="display: none">
                            <button id="btnCancel" class="btn btn-gra btn-block">
                                انصراف
                            </button>
                        </div>
                        <div id="DivSave" class="col-sm-4 col-sm-offset-2">
                            <button id="btnSaveModule" class="btn btn-blue next-step btn-block">
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
