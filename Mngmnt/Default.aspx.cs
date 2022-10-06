using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Default : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Session["username"] == null)
        {
            Response.Redirect("Login.aspx", true);
        }

        userId.Value = Session["UserId"].ToString();

        //Configuration config = WebConfigurationManager.OpenWebConfiguration("~/Web.Config");
        //SessionStateSection section = (SessionStateSection)config.GetSection("system.web/sessionState");
        //Response.Write("<script>alert('" + section.Timeout + "')</script>"); ;
    }
}