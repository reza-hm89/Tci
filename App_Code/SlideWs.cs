using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;

/// <summary>
/// Summary description for SlideWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class SlideWs : System.Web.Services.WebService {

    [WebMethod (EnableSession = true)]
    public string CheckUrl(long id)
    {
        var slide = new SlideClass();

        string url = slide.ReturnImageUrl(id);

        var jsSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            PreserveReferencesHandling = PreserveReferencesHandling.None
        };

        return JsonConvert.SerializeObject(url, Formatting.None, jsSettings);
    }

    [WebMethod (EnableSession = true)]
    public string GetData()
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var slide = new SlideClass();

            var query = slide.SelectAll();

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public string GetFirstData()
    {
        try
        {
            var slide = new SlideClass();

            var query = slide.SelectFirst();

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    [WebMethod (EnableSession = true)]
    public bool Insert(SlideEntity slideEntity)
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return false;
        }

        try
        {
            var slide = new SlideClass();

            slideEntity.UserID = (long) Session["UserId"];

            slideEntity.Image = Session["CurrentTime"] + slideEntity.Image;

            slide.Insert(slideEntity);
            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
       
    }

    [WebMethod (EnableSession = true)]
    public string BindRecordToEdit(Int64 id)
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var slide = new SlideClass();
            var query = slide.SelectOne(id);

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    [WebMethod (EnableSession = true)]
    public bool Update(SlideEntity slideEntity)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var slide = new SlideClass();

            slideEntity.UserID = (long)Session["UserId"];

            if (slide.ReturnImageUrl(slideEntity.Id) == slideEntity.Image)
            {
                slide.Update(slideEntity);
            }
            else
            {
                slideEntity.Image = Session["CurrentTime"] + slideEntity.Image;
                string oldUrl = slide.Update(slideEntity);

                if (slideEntity.Image != oldUrl && File.Exists(Server.MapPath("~/Mngmnt/images/" + oldUrl)))
                {
                    File.Delete(Server.MapPath("~/Mngmnt/images/" + oldUrl));
                }
            }

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
       
    }

    [WebMethod (EnableSession = true)]
    public void DeleteRecord(long id)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        var slide = new SlideClass();

        string logoUrl = slide.DeleteOne(id);

        if (logoUrl != null)
        {
            if (File.Exists(Server.MapPath("~/Mngmnt/images/" + logoUrl)))
            {
                File.Delete(Server.MapPath("~/Mngmnt/images/" + logoUrl));
            }
        }

    }

    [WebMethod (EnableSession = true)]
    public void DeleteMultiRecord(List<string> idList)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        try
        {
            var slide = new SlideClass();

            for (int i = 0; i < idList.Count; i++)
            {
                string imageUrl = slide.DeleteOne(Convert.ToInt64(idList[i]));

                string url = Server.MapPath("~/Mngmnt/images/" + imageUrl);

                if (imageUrl != "")
                {
                    if (File.Exists(url))
                    {
                        File.Delete(url);
                    }
                }
            }
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }
}
