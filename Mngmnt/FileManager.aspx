<%@ Page Language="C#" AutoEventWireup="true" CodeFile="FileManager.aspx.cs" Inherits="Mngmnt_FileManager" %>

<!DOCTYPE html>
<html lang="fa" class="no-js">
<head>

    <meta charset="utf-8" />
    <!--[if IE]><meta http-equiv='X-UA-Compatible' content="IE=edge,IE=9,IE=8,chrome=1" /><![endif]-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">

    <%--<link href="assets/plugins/ckfinder/_samples/sample.css" rel="stylesheet" type="text/css" />--%>
    <script type="text/javascript" src="assets/plugins/ckfinder/ckfinder.js"></script>

    <script type="text/javascript">

        function showFileInfo(fileUrl, data, allFiles) {
            var msg = 'The last selected file is: <a href="' + fileUrl + '">' + fileUrl + '</a><br /><br />';

            if (fileUrl != data['fileUrl'])
                msg += '<b>File url:</b> ' + data['fileUrl'] + '<br />';
            msg += '<b>File size:</b> ' + data['fileSize'] + 'KB<br />';
            msg += '<b>Last modified:</b> ' + data['fileDate'];

            if (allFiles.length > 1) {
                msg += '<br /><br /><b>Selected files:</b><br /><br />';
                msg += '<ul style="padding-left:20px">';
                for (var i = 0 ; i < allFiles.length ; i++) {
                    // See also allFiles[i].url
                    msg += '<li>' + allFiles[i].data['fileUrl'] + ' (' + allFiles[i].data['fileSize'] + 'KB)</li>';
                }
                msg += '</ul>';
            }
            // this = CKFinderAPI object
            this.openMsgDialog("Selected file", msg);
        }


        var finder = new CKFinder();

        finder.basePath = '../';

        finder.height = 600;

        finder.selectActionFunction = showFileInfo;
        //  finder.create();
        finder.appendTo("divData");
    </script>
</head>

<body class="rtl">

    <div class="row">
        <div class="col-sm-12">

            <ol class="breadcrumb">
                <li>
                    <i class="clip-file"></i>
                    <a href="Default.aspx">صفحه اصلی</a>
                </li>
                <li class="active">مدیریت فایل</li>

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
        </div>
    </div>
    
  <br />    

    <div id="divData" style="font-family: 'BYekan' !important;"></div>

</body>
</html>
