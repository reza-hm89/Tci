using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class page : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["id"] != null)
            //ShowNews(Int64.Parse(Decrypt(HttpUtility.UrlDecode(Request.QueryString["id"]))));
            ShowPage(Int64.Parse(Request.QueryString["id"]));
    }

    public void ShowPage(long id)
    {
        try
        {
            var newsClass = new PageClassSite();
            var newsEntity = newsClass.SelectOne(id);

            pageTitle.InnerText = newsEntity.Title;
            pageBody.InnerHtml = newsEntity.Body;
           
         }
        catch (Exception ex)
        {
        }
    }

}