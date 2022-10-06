using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Configuration;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Mngmnt_Login : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string firstRun = ConfigurationManager.AppSettings["FirstRun"];

        if (firstRun == "true")
        {
            FirstRun();
        }
    }

    private void FirstRun()
    {
        try
        {
            var db = new DataClassesDataContext();

            FileInfo scriptFile = new FileInfo(Server.MapPath("~/Script/script.sql"));

            string script = scriptFile.OpenText().ReadToEnd();

            db.ExecuteQuery<string>(script);

            FileInfo dataFile = new FileInfo(Server.MapPath("~/Script/data.sql"));

            string data = dataFile.OpenText().ReadToEnd();

            db.ExecuteQuery<string>(data);

            Configuration config = WebConfigurationManager.OpenWebConfiguration(Request.ApplicationPath);
            config.AppSettings.Settings["FirstRun"].Value = "false";
            config.Save();
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message,ex.StackTrace);           
        }
    
    }
}