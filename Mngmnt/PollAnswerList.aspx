<%@ Page Language="C#" AutoEventWireup="true" CodeFile="PollAnswerList.aspx.cs" Inherits="Mngmnt_PollAnswerList" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <script src="js/PollAnswerList.js"></script>

</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="Default.aspx">صفحه اصلی</a>
                </li>
                <li class="active">جواب های نظرسنجی</li>
            </ol>
            <div class="page-header">
                <h1>جواب های نظرسنجی</h1>
            </div>

        </div>
    </div>



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

            <div>
                <div class="form-group">
                    <label class="col-sm-1 control-label">
                        عنوان
                    </label>
                    <div class="col-sm-4">
                        <input type="text" id="txtAnswer" class="form-control InputRequire1" />
                    </div>
                </div>

                <div id="div1" class="form-group">
                    <div id="DivCancel1" class="col-sm-2 col-sm-offset-1" style="display: none">
                        <button id="btnCancel1" class="btn btn-gra btn-block">
                            انصراف
                        </button>
                    </div>
                    <div id="DivSave1" class="col-sm-2 col-sm-offset-1">
                        <button id="btnSavePollAnswer" class="btn btn-blue  btn-block">
                            ثبت اطلاعات
                        </button>
                    </div>
                </div>
            </div>

            <a id="btnDelete1" class="btn  btn-bricky" style="display: none; float: left; margin-bottom: 3px" href="#"><i class="fa fa-trash-o"></i>حذف رکورد </a>
            <div style="clear: both"></div>
            <div id="divData1" class="table-responsive">
            </div>
        </div>
    </div>
</body>
</html>
