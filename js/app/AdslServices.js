var table = "";

var cnt = 1;

$(document).ready(function () {

    $("#Main_GroupList li a").each(function () {

        LoadPackages(this.id);
    });


});

function LoadPackages(groupId) {

    $.ajax({
        type: "POST",
        url: "../mngmnt/Webservices/PackageGroupWs.asmx/BindRecordToEdit",
        data: "{ id:'" + groupId + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (data) {

            var msg = eval('(' + data.d + ')');

            if (cnt == 1) {
                table += '<div class="tab-pane active" id="adsl' + groupId + '">' +
               '<div class="row">' + msg[0].Description;
                cnt++;
            } else {
                table += '<div class="tab-pane" id="adsl' + groupId + '">' +
               '<div class="row">' + msg[0].Description;
            }

            table += '</div></div>';
            //if (cnt==1) {
            //    table += '<div class="tab-pane active" id="adsl' + groupId + '">' +
            //   '<div class="row">' +
            //   '<table data-toggle="table"' +
            //   'data-pagination="true"' +
            //   'data-page-size="5"' +
            //   'data-page-list="[5,8,10]"' +
            //   'data-pagination-first-text="اولین"' +
            //   'data-pagination-pre-text="قبلی"' +
            //   'data-pagination-next-text="بعدی"' +
            //   'data-pagination-last-text="آخرین"' +
            //   'data-advanced-search="true"' +
            //   'data-search="true"' +
            //   'data-sort-order="desc"' +
            //   'id="msg' + groupId + '" class="table table-hover ">' +
            //   '<thead>' +
            //   '<tr>' +
            //   '<th data-sortable="true" data-align="center">نام سرویس</th>' +
            //   '<th data-sortable="true" data-align="center">حجم ماهانه(گیگابایت)</th>' +
            //   '<th data-sortable="true" data-align="center">دانلود رایگان شبانه(سالانه)</th>' +
            //   '<th data-sortable="true" data-align="center">مکالمه رایگان درون استانی(ماهانه)</th>' +
            //   '<th data-align="center">قیمت سالانه(تومان)</th>' +
            //   '</tr>' +
            //   '</thead>' +
            //   '<tbody>';
            //    cnt++;
            //} else {
            //    table += '<div class="tab-pane" id="adsl' + groupId + '">' +
            //   '<div class="row">' +
            //   '<table data-toggle="table"' +
            //   'data-pagination="true"' +
            //   'data-page-size="5"' +
            //   'data-page-list="[5,8,10]"' +
            //   'data-pagination-first-text="اولین"' +
            //   'data-pagination-pre-text="قبلی"' +
            //   'data-pagination-next-text="بعدی"' +
            //   'data-pagination-last-text="آخرین"' +
            //   'data-advanced-search="true"' +
            //   'data-search="true"' +
            //   'data-sort-order="desc"' +
            //   'id="msg' + groupId + '" class="table table-hover ">' +
            //   '<thead>' +
            //   '<tr>' +
            //   '<th data-sortable="true" data-align="center">نام سرویس</th>' +
            //   '<th data-sortable="true" data-align="center">حجم ماهانه(گیگابایت)</th>' +
            //   '<th data-sortable="true" data-align="center">دانلود رایگان شبانه(سالانه)</th>' +
            //   '<th data-sortable="true" data-align="center">مکالمه رایگان درون استانی(ماهانه)</th>' +
            //   '<th data-align="center">قیمت سالانه(تومان)</th>' +
            //   '</tr>' +
            //   '</thead>' +
            //   '<tbody>';
            //}


            //for (var i = 0; i < msg.length; i++) {
            //    table += '<tr>' +
            //        '<td>' + msg[i].Name + '</td>' +
            //        '<td>' + msg[i].MinResponse + '</td>' +
            //        '<td>' + msg[i].MaxResponse + ' </td>' +
            //        '<td>' + msg[i].Description + '</td>' +
            //        '<td>' + msg[i].Price + '</td>' +
            //        '</tr>';

            //}

            // table += '</tbody></table></div></div>';
           

            $("#ServiceList").html(table);
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

