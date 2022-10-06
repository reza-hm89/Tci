using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Adsl_NewsList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LoadNewsList();
    }

    void LoadNewsList()
    {
        var db = new DataClassesDataContext();

        var query = from t in db.NewsTables
                    where t.NewsGroupID == 10
                    select t;

        foreach (var item in query)
        {
            NewsList.Controls.Add(new LiteralControl("<div class='row news-box-archive'>" +
                                                     "<div class='col-md-4 text-center img-archive'>" +
                                                     "<img src='../mngmnt/images/" + item.Image + "' class='archive-img-thumbnail' alt='" + item.Titr + "'>" +
                                                     "</div>" +
                                                     "<div class='col-md-8'>" +
                                                     "<a href='AdslNews.aspx?id="+item.Id+"' class='text-archive-news'>" +
                                                     "<h4>" + item.Titr + "</h4>" +
                                                     "</a>" +
                                                     "<p class='archive-text-news'>" +
                                                     item.Body +
                                                     "</p>" +
                                                     "<p class='btn-archive'>" +
                                                     "<a href='AdslNews.aspx?id=" + item.Id + "'><button type='button' class='btn btn-primary'>ادامه مطلب</button></a>" +
                                                     "</p>" +
                                                     "</div>" +
                                                     "</div>"));
        }

    }
}