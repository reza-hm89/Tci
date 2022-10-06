using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using System.IO;

/// <summary>
/// Summary description for LanguageWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class LanguageWs : System.Web.Services.WebService {

    [WebMethod (EnableSession = true)]
    public bool SetVisibility(long id, bool visibility)
    {
        try
        {
            var language = new LanguageClass();

            bool result = language.SetVisibility(id, visibility);

            return result;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    [WebMethod (EnableSession = true)]
    public string CheckUrl(long id)
    {
        var language = new LanguageClass();

        string url = language.ReturnIconUrl(id);

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
            var language = new LanguageClass();

            var query = language.SelectAll();

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
    public bool Insert(LanguageEntity languageEntity)
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return false;
        }

        try
        {
            var language = new LanguageClass();

            var db = new DataClassesDataContext();

            if (languageEntity.Icon!="")
            {
                languageEntity.Icon = Session["CurrentTime"] + languageEntity.Icon;
            }

            if (languageEntity.Code != "")
            {
                if (!Directory.Exists(Server.MapPath("~/" + languageEntity.Code)))
                {
                    Directory.CreateDirectory(Server.MapPath("~/" + languageEntity.Code));
                }
            }

            if (language.Insert(languageEntity))
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
            var language = new LanguageClass();

            var query = language.SelectOne(id);

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
    public bool Update(LanguageEntity languageEntity)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var language = new LanguageClass();

            if (language.ReturnIconUrl(languageEntity.Id) == languageEntity.Icon)
            {
                language.Update(languageEntity);
            }
            else
            {
                string newUrl = Session["CurrentTime"] + languageEntity.Icon;

                languageEntity.Icon = newUrl;

                string oldUrl = language.Update(languageEntity);

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
            return;
        }

        try
        {
            var language = new LanguageClass();

            string logoUrl = language.DeleteOne(id);

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
            var language = new LanguageClass();

            for (int i = 0; i < idList.Count; i++)
            {
                string imageUrl = language.DeleteOne(Convert.ToInt64(idList[i]));

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
