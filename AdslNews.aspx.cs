using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AdslNews : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["id"] != null)
            ShowPage(Int64.Parse(Request.QueryString["id"]));
    }

    public void ShowPage(long id)
    {
        try
        {
            var newsClass = new NewsClassSite();
            var newsEntity = newsClass.SelectOneForWeb(id);

            txtTitle.InnerText = newsEntity.Titr;
            txtBody.InnerHtml = newsEntity.Body;
            ImageNews.Src = "../mngmnt/images/" + newsEntity.Image;

        }
        catch (Exception ex)
        {
        }
    }
}