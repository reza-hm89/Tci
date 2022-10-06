<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PermissionList.aspx.cs" Inherits="Mngmnt_PermissionList" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <script src="js/PermissionList.js"></script>

</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="Default.aspx">صفحه اصلی</a>
                </li>
                <li class="active">لیست مجوزات</li>

                <li class="search-box">
                    <form class="sidebar-search">
                        <div class="form-group">
                            <input type="text" placeholder="جستجو ... ">
                            <button class="submit">
                                <i class="clip-search-3"></i>
                            </button>
                        </div>
                    </form>
                </li>
            </ol>
            <div class="page-header">
                <h1>لیست مجوزات</h1>
            </div>

        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <i class="fa fa-external-link-square"></i>
            لیست مجوزات
								
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
                <div class="col-sm-6">
                    <label class="radio-inline">
                        <input type="radio" id="radioUsers"  name="optionsRadios" class="grey">
                        انتخاب از کاربران
								
                    </label>
                    <label class="radio-inline">
                        <input type="radio" id="radioGroups" checked="checked" name="optionsRadios" class="grey">
                        انتخاب از گروه های کاربری
								
                    </label>
                    <label class="Button">
                        <button id="btnChangeRadio" class="grey">اعمال</button>                       								
                    </label>
                </div>
            </div>

            <div class="form-group">
                <div class="col-sm-4">
                    <select id="drpSelected" class="form-control">
                    </select>
                </div>
            </div>
            <div style="clear: both"></div>
            <a id="btnSavePermission" class="btn  btn-green" style="float: left; margin-bottom: 3px" ><i class="fa fa-save"></i> ذخیره همه مجوزها </a>             
             <a id="btnSelectAll" class="btn  btn-primary" style="float: left; margin-bottom: 3px; margin-left: 10px" ><i class="fa fa-thumbs-up"></i> انتخاب همه مجوزها </a>
             <a id="btnDeselectAll" class="btn  btn-primary" style="float: left; margin-bottom: 3px; margin-left: 10px" ><i class="fa fa-thumbs-down"></i> لغو انتخاب همه مجوزها </a>
            <div id="divData" class="table-responsive">
            </div>
        </div>
    </div>

</body>
</html>
