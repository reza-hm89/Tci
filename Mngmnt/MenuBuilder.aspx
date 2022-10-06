<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MenuBuilder.aspx.cs" Inherits="Mngmnt_User" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>
    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <script src="js/Menu.js"></script>
</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="#">صفحه اصلی</a>
                </li>
                <li class="active">ایجاد منو</li>
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
                <h1>ایجاد منو</h1>
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
                            نام/ عنوان
													
                        </label>
                        <div class=" col-sm-9">
                            <input type="text" placeholder="نام" class="form-control InputRequire" id="txtName" name="lastname">
                        </div>

                    </div>
                     <div class="form-group">
                        <label class="col-sm-2 control-label " >
                            گروه منو
									
                        </label>
                        <div class="col-sm-9">
                            <select id="DrpMenuGroup" class="form-control">
                            </select>
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label " >
                            والد
									
                        </label>
                        <div class="col-sm-9">
                            <select id="DrpParent" class="form-control InputRequire">
                            </select>
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label">
                            لینک
													
                        </label>
                        <div class=" col-sm-9">
                            <input type="text" placeholder="لینک" class="form-control InputRequire" id="txtLink" name="">
                        </div>

                    </div>
                  
                     <div class="form-group">
                        <label class="col-sm-2 control-label " >
                            اضافه شدن پارامتر منو به لینک
									
                        </label>
                        <div class="col-sm-9">
                            <select id="DrpPageParam" class="form-control">
                                 <option value="0">خیر</option>
                                <option value="1">بله</option>
                            </select>
                        </div>

                    </div>

                    <div class="form-group">
                        <label class="col-sm-2 control-label " >
                            انتخاب از صفحه ساز
									
                        </label>
                        <div class="col-sm-9">
                            <select id="DrpPageBuilder" class="form-control">
                            </select>
                        </div>

                    </div>
                    <div class="form-group">
                        <label class="col-sm-2 control-label " >
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
                        <label class="col-sm-2 control-label " >
                            زبان
									
                        </label>
                        <div class="col-sm-9">
                            <select id="DrpLanguage" class="form-control">
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
                            <button id="btnSaveMenu" class="btn btn-blue next-step btn-block">
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
