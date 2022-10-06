using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Service : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["id"] != null)
            //ShowNews(Int64.Parse(Decrypt(HttpUtility.UrlDecode(Request.QueryString["id"]))));
            ShowService(Int64.Parse(Request.QueryString["id"]));
    }

    public void ShowService(long menuId)
    {
        var db = new DataClassesDataContext();

        var query = (from t in db.MenuTables
            where t.Id == menuId
            select new {t.Name}).SingleOrDefault();

        pageTitle.InnerText = query.Name;

        var menuClass = new MenuClassSite();
        var lst = menuClass.SelectAllByParent(menuId);
        if (lst != null)
        {
            var i = 0;
           

                List<string> colorList = new List<string>()
    {
        "stel",
        "sadsl",
        "sdata",
        "smisc",
        "stel",
        "sadsl",
        "sdata",
        "smisc",
        "stel",
        "sadsl",
        "sdata",
        "smisc"
    };

                foreach (var menu in lst)
                {
                if (i < 4)
                {
                    i++;
                    ServiceTitle.Controls.Add(new LiteralControl(@"<div class='col-md-3 col-sm-6 nopadr nopadl'>
                        <div class='banner-wrap banner_" + i + @"'><a class='page-scroll' href='" + menu.Link + @"'>
                                <h5><i class='icon-otherservices'></i>&nbsp;" + menu.Name + @"<i class='icon-a3-down arrowd'></i></h5>
                            </a>
                        </div>
                    </div>"));



                    ServicePanel.Controls.Add(new LiteralControl(@"<div class='" + colorList[i - 1] + @"'>
            <div class='container'>
                <div class='row'>
                    <div class='col-md-6 col-sm-6'>
                        <span><i class='icon-otherservices'></i></span>
                        <h3>" + menu.Name + @"</h3>
                        <p>" + menu.Name + @"</p>
                    </div><div class='col-md-6 col-sm-6 bor'>
                            <ul class='list-unstyled'>"));

                    var lst2 = menuClass.SelectAllByParent(menu.Id);
                    if (lst2 != null)
                    {
                        foreach (var item in lst2)
                        {
                            ServicePanel.Controls.Add(new LiteralControl(@"<li class='col-md-6'><a href='" + item.Link + "' > " + item.Name + " </a></li> "));
                        }

                    }

                    ServicePanel.Controls.Add(new LiteralControl("</ul></div></div></div></div>"));
                }
                else
                    break;
            }
        }
    }
}