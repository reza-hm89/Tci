using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Adsl_TechnicalSupport : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["id"] != null)
            ShowPage(Int64.Parse(Request.QueryString["id"]));

        LoadMenu();
    }

    public void ShowPage(long id)
    {
        try
        {
            var newsClass = new PageClassSite();
            var newsEntity = newsClass.SelectOne(id);

            txtTitle.InnerText = newsEntity.Title;
            txtBody.InnerHtml = newsEntity.Body;

        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    void LoadMenu()
    {
        var db = new DataClassesDataContext();

        var query = from t in db.MenuTables
                    where t.MenuGroupID == 6
                    select t;

        foreach (var item in query)
        {
            MenuList.Controls.Add(new LiteralControl("<a href='" + item.Link + "' class='list-group-item'>" + item.Name + "</a>"));
        }

    }
}