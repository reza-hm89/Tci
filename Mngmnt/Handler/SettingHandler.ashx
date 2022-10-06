<%@ WebHandler Language="C#" Class="SettingHandler" %>

using System;
using System.Web;

public class SettingHandler : IHttpHandler,System.Web.SessionState.IRequiresSessionState {

    public void ProcessRequest(HttpContext context)
    {
        HttpContext.Current.Session["CurrentTime"] = null;
        if (context.Request.Files.Count > 0)
        {
            HttpFileCollection selectedFiles = context.Request.Files;
            for (int i = 0; i < selectedFiles.Count; i++)
            {
                HttpPostedFile postedFile = selectedFiles[i];

                HttpContext.Current.Session["CurrentTime"] = GlobalVariable.GetCurrentTime();

                string fileName = context.Server.MapPath("~/Mngmnt/asnad/" +  postedFile.FileName);
                postedFile.SaveAs(fileName);
            }
        }

    }
    public bool IsReusable {
        get {
            return false;
        }
    }

}