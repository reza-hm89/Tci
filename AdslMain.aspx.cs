using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Adsl_Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LoadSlides();

        LoadNews();

        LoadPoll();

        LoadOurService();
    }

    void LoadSlides()
    {
        var db = new DataClassesDataContext();

        var query = from t in db.SlideTables
                    where t.LanguageID == 2
                    select t;

        int i = 0;

        foreach (var item in query)
        {
            if (i == 0)
            {
                SlideList.Controls.Add(new LiteralControl("<div class='item active'>" +
                                                        "<img class='slide-image' src='../mngmnt/images/" + item.Image +
                                                        "' alt='" + item.AlternativeText + "' style='height:570px'>" +
                                                        "</div>"));

                NavList.Controls.Add(new LiteralControl("<li data-target='#carousel-example-generic' data-slide-to='" + i + "' class='active'></li>"));

            }
            else
            {
                SlideList.Controls.Add(new LiteralControl("<div class='item'>" +
                                                     "<img class='slide-image' src='../mngmnt/images/" + item.Image +
                                                     "' alt='" + item.AlternativeText + "' style='height:570px'>" +
                                                     "</div>"));

                NavList.Controls.Add(new LiteralControl("<li data-target='#carousel-example-generic' data-slide-to='" + i + "' class=''></li>"));
            }

            i++;
        }

    }

    void LoadNews()
    {
        var db = new DataClassesDataContext();

        var query = (from t in db.NewsTables
                     where t.NewsGroupID == 10
                     select t).Take(4);


        foreach (var item in query)
        {
            NewsList.Controls.Add(new LiteralControl("<div class='boxes col-sm-6 col-lg-3 col-md-6'>" +
                "<div class='news-box'>" +
                    "<div class='img'>" +
                        "<img src='../mngmnt/images/" + item.Image + "' class='img-thumb' alt='" + item.Titr + "'>" +
                        "<a href='AdslNews.aspx?id=" + item.Id + "'>" +
                            "<div class='img -thumb-hover'>" +
                                "<i class='fa fa-search fa-lg search-hover-box'></i>" +
                            "</div>" +
                        "</a>" +
                    "</div>" +
                    "<div class='news-box-text'>" +
                        "<h4>" + item.Titr + "</h4>" +
                        "<p>" + item.ZirTitr + "</p>" +
                        "<a href='AdslNews.aspx?id=" + item.Id + "'><button class='btn btn-primary'>جزئیات بیشتر</button></a>" +
                    "</div>" +
                "</div>" +
            "</div>"));
        }
    }

    private void LoadPoll()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.PollTables
                        join answer in db.PollAnswerTables on t.Id equals answer.PollsID
                        where t.IsActive == true
                        select new { t.Id, t.Name, answer.Answer };

            int i = 0;



            foreach (var item in query)
            {
                divPollTitle.InnerText = item.Name;

                i++;
                PollAnswers.Controls.Add(new LiteralControl("<button class='btn btn-polling' type='button' value='" + i + "'>" + item.Answer + "</button>"));
            }
        }
        catch (Exception exception)
        {
            ErrorClass.Insert(exception.Message, exception.StackTrace);
        }
    }

    void LoadOurService()
    {
        var db = new DataClassesDataContext();

        var query = from t in db.OurServiceTables
                    select t;

        foreach (var item in query)
        {
            OurServiceList.Controls.Add(new LiteralControl("<div class='boxes col-md-3 col-lg-2 col-sm-6'>" +
                                                           "<a href='" + item.Description + "'> " +
                                                           "<div class='options-adsl-box wow animated zoomIn animated'>" +
                                                           "<div class='img'>" +
                                                           "<img src='../mngmnt/images/" + item.Image + "' class='' alt='" + item.Title + "'>" +
                                                           "</div>" +
                                                           "<div class='news-box-text'>" +
                                                           "<h5>" + item.Title + "</h5>" +
                                                           "</div>" +
                                                           "</div>" +
                                                           "</a>" +
                                                           "</div>"));
        }
    }
}