var auctionId;

$(document).ready(function () {

    

});

function LoadAuctionDownloader(id) {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/AuctionDownloadWs.asmx/GetData",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var table = '<table class="table table-bordered table-hover" id="sample-table-1">' +
                '<thead>' +
                '<tr>' +
                 '<th class="center"><a spellcheck="false" id="SelectAll" class="btn btn-light-grey" style="background-color:lightgray; border-color:lightgray" ><i class="fa fa-square-o"></i></a></th>' +
                '<th class="center"><label>ردیف</label></div></th>' +
                '<th>نام</th>' +
                '<th>نام خانوادگی</th>' +
                '<th>شماره تماس</th>' +
                '<th>توضیحات</th>' +                          
                '</tr>' +
                '</thead>' +
                '<tbody>';


            for (var i = 0; i < msg.length; i++) {
                          
                table += '<tr>' +
                    '<td class="center"><div class="checkbox-table"><label><input id="' + msg[i].Id + '"  type="checkbox" class="flat-grey"></label></div></td>' +
                    '<td class="center"><label>' + (i + 1) + '</label></div></td>' +                 
                    '<td>' + msg[i].Name + '</td>' +
                    '<td>' + msg[i].Family + '</td>' +
                    '<td>' + msg[i].Tel + '</td>' +
                    '<td>' + msg[i].Description + '</td>' +
                    '</tr>';
            }

            table += '</tbody></table>';

            $('#divData').html(table);

            Main.init2();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });
}

