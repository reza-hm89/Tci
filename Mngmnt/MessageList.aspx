<%@ Page Language="C#" AutoEventWireup="true" CodeFile="MessageList.aspx.cs" Inherits="Mngmnt_MessageList" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>
 
    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    
    <script src="js/MessageList.js"></script>

  
</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="Default.aspx">صفحه اصلی</a>
                </li>
                <li class="active">لیست پیام کاربران</li>

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
                <h1>لیست پیام کاربران</h1>
            </div>

        </div>
    </div>

    <div class="panel panel-default">
        <div class="panel-heading">
            <i class="fa fa-external-link-square"></i>
           لیست پیام کاربران
								
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
           <a id="btnDelete" class="btn  btn-bricky" style="display: none; float: left; margin-bottom: 3px" href="#"><i class="fa fa-trash-o"></i> حذف رکورد </a>
            <div style="clear: both"></div>
           <div id="divData" class="table-responsive"  >
            </div>
        </div>
    </div>
    
     <div class="modal fade" id="myModal1" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
												
                    </button>
                    <h4 class="modal-title">جزئیات پیام</h4>
                </div>
                <div class="modal-body">
                    <p id="txtUserIp"></p>
                    <p id="txtBody"></p>
					<p>پاسخ</p>
					<textarea id="txtReply" class="form-control" cols="10" rows="10"></textarea>
					<button id="btnSendReply" class="btn btn-blue btn-block">ارسال</button>
                </div>
                <div class="modal-footer">
                    <button id="closeModal" aria-hidden="true" data-dismiss="modal" class="btn btn-default">
                        بستن												
                    </button>                
                </div>
            </div>
        </div>
    </div>
</body>
</html>
