using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using System.IO;

/// <summary>
/// Summary description for OurServiceWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class OurServiceWs : System.Web.Services.WebService {

    [WebMethod (EnableSession = true)]
    public bool SetVisibility(long id, bool visibility)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }


        try
        {
            var ourSer = new OurServiceClass();

            bool result = ourSer.SetVisibility(id, visibility);

            return result;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
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
            var ourSer = new OurServiceClass();

            var query = ourSer.SelectAll();

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
    public bool Insert(OurServiceEntity ourServiceEntity)
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return false;
        }

        try
        {
            var ourSer = new OurServiceClass();

            if (ourServiceEntity.Image != "")
            {
                ourServiceEntity.Image = Session["CurrentTime"] + ourServiceEntity.Image;
            }

            if (ourSer.Insert(ourServiceEntity))
            {
                return true;
            }
            return false;
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
            var ourSer = new OurServiceClass();
            var query = ourSer.SelectOne(id);
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
    public bool Update(OurServiceEntity ourServiceEntity)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var ourSer = new OurServiceClass();

            if (ourSer.ReturnUrl(ourServiceEntity.Id) == ourServiceEntity.Image)
            {
                ourSer.Update(ourServiceEntity);
            }
            else
            {
                string newUrl = Session["CurrentTime"] + ourServiceEntity.Image;

                ourServiceEntity.Image = newUrl;

                string oldUrl = ourSer.Update(ourServiceEntity);

                if (newUrl != oldUrl && File.Exists(Server.MapPath("~/Mngmnt/images/" + oldUrl)))
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
            return ;
        }

        try
        {
            var ourSer = new OurServiceClass();

            string logoUrl = ourSer.DeleteOne(id);

            if (logoUrl != null)
            {
                if (File.Exists(Server.MapPath("~/Mngmnt/images/" + logoUrl)))
                {
                    File.Delete(Server.MapPath("~/Mngmnt/images/" + logoUrl));
                }
            }
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
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
            var ourSer = new OurServiceClass();

            for (int i = 0; i < idList.Count; i++)
            {
                string imageUrl = ourSer.DeleteOne(Convert.ToInt64(idList[i]));

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

    [WebMethod (EnableSession = true)]
    public string CheckUrl(long id)
    {
        var ourSer = new OurServiceClass();

        string url = ourSer.ReturnUrl(id);

        var jsSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            PreserveReferencesHandling = PreserveReferencesHandling.None
        };

        return JsonConvert.SerializeObject(url, Formatting.None, jsSettings);
    }
    
}
