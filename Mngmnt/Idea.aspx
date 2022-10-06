<%@ Page Language="C#" AutoEventWireup="true" CodeFile="Idea.aspx.cs" Inherits="Mngmnt_js_Idea" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

       
</head>

<body class="rtl">
   

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
                        <input type="text" placeholder="عنوان" id="txtTitle" class="form-control InputRequire">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        نام و نام خانوادگی
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="نام/نام خانوادگی" id="txtName" class="form-control InputRequire">
                    </div>
                </div>
               
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        موبایل
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="کد نمایندگی" id="txtMobile" class="form-control ">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        شماره تلفن
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="تلفن" id="txtTel" class="form-control ">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        ایمیل
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="همراه" id="txtEmail" class="form-control ">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        نام ایده
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="همراه" id="txtIdea" class="form-control ">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        نوآوری شما در کدام حوزه قرار دارد؟
                    </label>
                    <div class="col-sm-9">
                        <input type="text" placeholder="" id="txtKind" class="form-control ">
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        شرح کامل ایده
                    </label>
                    <div class="col-sm-9">
                        <textarea placeholder="" id="txtDescription" class="form-control" rows="5"></textarea>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-2 control-label">
                        مزیتهای ایده
                    </label>
                    <div class="col-sm-9">
                        <textarea placeholder="" id="txtAdvantage" class="form-control" rows="5"></textarea>
                    </div>
                </div>
               
            
         
            </div>
        </div>
    </div>


</body>
</html>
