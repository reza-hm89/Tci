using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class NewsList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString.Count>0)
        {
            var archive = Request.QueryString["archive"];

            if (archive == "true")
            {
                LoadArchives();
            }
        }
        else
        {
            LoadLastNews();
        }
      
        LoadLastToseeNews();
    }

    public void LoadLastNews()
    {
        var newsClass = new NewsClassSite();
        var lst = newsClass.SelectAllLastNewsForWeb();
        string zirTitr = "";
        if (lst != null)
            foreach (var news in lst)
            {
                if (string.IsNullOrEmpty(news.ZirTitr))
                {                
                    string str = GetContent(news.Body);
                    if (str.Length > 150)
                        str = str.Substring(0, 160);
                    str = str + "...";
                    zirTitr = str;
                }
                else
                    zirTitr = news.ZirTitr;

                BLL.MaftooxCalendar.MaftooxPersianCalendar.DateWork prd = new BLL.MaftooxCalendar.MaftooxPersianCalendar.DateWork();
                DateTime dt1 = news.PublishDate;
                prd.Upate(dt1);
                string date = prd.GetNameDayInMonth() + "   " + prd.GetNumberDayInMonth().ToString() + "   " + prd.GetNameMonth() + "  " + prd.GetNumberYear().ToString() ;

                NewsListPanel.Controls.Add(new LiteralControl(@"<div class='ncbox'>
                            <img alt ='" + news.Titr + @"' class='img-responsive'
                                 src='Mngmnt/images/" + news.Image + @"'>
                            <h3><a href = 'news.aspx?id=" + news.Id + "' >" + news.Titr + @"</a></h3>
                            <p class='short-news'>" + zirTitr + @"
                                <span class='ncmore'> <a href = 'news.aspx?id=" + news.Id + @"' >
                                <i class='icon-a3-left'></i> ادامه خبر</a></span>
                            </p>
                            <p>
                                <span class='ncdate'>" + date + @" </span>
                            </p>
                        </div>"));
            }
    }

    public void LoadArchives()
    {
        var newsClass = new NewsClassSite();
        var lst = newsClass.SelectAllLastNewsForWeb2();
        string zirTitr = "";
        if (lst != null)
            foreach (var news in lst)
            {
                if (string.IsNullOrEmpty(news.ZirTitr))
                {
                    string str = GetContent(news.Body);
                    if (str.Length > 150)
                        str = str.Substring(0, 160);
                    str = str + "...";
                    zirTitr = str;
                }
                else
                    zirTitr = news.ZirTitr;

                BLL.MaftooxCalendar.MaftooxPersianCalendar.DateWork prd = new BLL.MaftooxCalendar.MaftooxPersianCalendar.DateWork();
                DateTime dt1 = news.PublishDate;
                prd.Upate(dt1);
                string date = prd.GetNameDayInMonth() + "   " + prd.GetNumberDayInMonth().ToString() + "   " + prd.GetNameMonth() + "  " + prd.GetNumberYear().ToString();

                NewsListPanel.Controls.Add(new LiteralControl(@"<div class='ncbox'>
                            <img alt ='" + news.Titr + @"' class='img-responsive'
                                 src='Mngmnt/images/" + news.Image + @"'>
                            <h3><a href = 'news.aspx?id=" + news.Id + "' >" + news.Titr + @"</a></h3>
                            <p class='short-news'>" + zirTitr + @"
                                <span class='ncmore'> <a href = 'news.aspx?id=" + news.Id + @"' >
                                <i class='icon-a3-left'></i> ادامه خبر</a></span>
                            </p>
                            <p>
                                <span class='ncdate'>" + date + @" </span>
                            </p>
                        </div>"));
            }
    }

    public void LoadLastToseeNews()
    {
        var newsClass = new NewsClassSite();
        var lst = newsClass.SelectAllNewsByGroupForWeb(1);
        if (lst != null)
            foreach (var news in lst)
            {
                ToseeListPanel.Controls.Add(new LiteralControl(@"<div class='col-md-3 col-sm-3 tonbox'>
                        <span class='ton-man'><a href = 'news.aspx?id=" + news.Id + "' >" +news.RoTitr + @"</a></span>
                         <h3> 
                             <a href='news.aspx?id=" + news.Id+"'>" + news.Titr + @"</a></h3>
                        <p class='short-tosee-news'>" + news.ZirTitr+ @"</p><br>
                        <a href = 'news.aspx?id=" + news.Id + @"' class='ton-more'><i class='icon-a3-left'></i> مشاهده بیشتر</a>
                    </div>"));



            }
    }


    public string Convert_HTML_To_NormalText(string HTMLText)
    {
        StringWriter sw = new StringWriter();
        Server.HtmlDecode(HTMLText, sw);
        return sw.ToString();
    }

    public string GetContent(string str)
    {

        string myPlainTextString = Regex.Replace(str, "<[^>]*>", String.Empty);

        return myPlainTextString;

    }
}