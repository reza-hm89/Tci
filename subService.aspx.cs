using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class SubService : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["id"] != null)
            //ShowNews(Int64.Parse(Decrypt(HttpUtility.UrlDecode(Request.QueryString["id"]))));
            ShowSubService(Int64.Parse(Request.QueryString["id"]));
    }

    public void ShowSubService(long menuId)
    {
        var db = new DataClassesDataContext();

        var query = (from t in db.MenuTables
                     where t.Id == menuId
                     select new { t.Name }).SingleOrDefault();

        pageTitle.InnerText = query.Name;
        pageTitle2.InnerText = query.Name;

        var menuClass = new MenuClassSite();
        var lst = menuClass.SelectAllByParent(menuId);
        if (lst != null)
        {

            foreach (var menu in lst)
            {


                ServicePanel.Controls.Add(new LiteralControl(@"<div class='col-md-6 col-sm-6 ssbox ssboxl'>
                        <img alt = '' class='img-responsive' src='images/default-h300.png'>
                        <div class='sst'>
                            <h2>" + menu.Name + @"</h2>
                            <p>" + menu.Name + @"</p></div> <div class='ssb'>

                            <a href = '" + menu.Link + @" '  
                               class='btn btn-primary'> مشاهده </a>
                             <a href='" + menu.Link + @"' class='btn btn-trans'> </a>

                        </div>
                    </div> "));

            }

        }
    }
}