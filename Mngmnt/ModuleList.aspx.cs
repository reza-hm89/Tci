using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Mngmnt_ModuleList : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
         if (Session["username"] == null)
        {
            Page.ClientScript.RegisterStartupScript(this.GetType(), "redirect", "window.location.href='login.aspx';", true);
            Response.Redirect("login.aspx",true);
        }
    }
}