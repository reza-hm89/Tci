<%@ WebHandler Language="C#" Class="ImageHandler" %>

using System;
using System.Web;

public class ImageHandler : IHttpHandler,System.Web.SessionState.IRequiresSessionState
{

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

                string fileName = context.Server.MapPath("~/Mngmnt/images/" + HttpContext.Current.Session["CurrentTime"] + postedFile.FileName);
                postedFile.SaveAs(fileName);
            }
        }

        else
        {
            context.Response.ContentType = "text/plain";
            //context.Response.Write("لطفا فایل را انتخاب نمایید");
        }

        context.Response.ContentType = "text/plain";
        //context.Response.Write("فایل با موفقیت آپلود شد");
    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}