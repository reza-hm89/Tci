using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using System.IO;
using System.Text;

/// <summary>
/// Summary description for PageWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class PageWs : System.Web.Services.WebService {

    [WebMethod (EnableSession = true)]
    public bool SetVisibility(long id, bool visibility)
    {
        try
        {
            var page = new PageClass();

            bool result = page.SetVisibility(id, visibility);

            return result;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    [WebMethod (EnableSession = true)]
    public string GetTemplate()
    {
        string [] templates= Directory.GetFiles(Server.MapPath("~/"));
        List<string> result = new List<string>();
        
        foreach (string template in templates)
        {
            if (template.EndsWith(".master"))
            {
                result.Add(template.Remove(0,template.LastIndexOf('\\')+1));
            }   
        }
        
        var jsSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            PreserveReferencesHandling = PreserveReferencesHandling.None
        };

        return JsonConvert.SerializeObject(result, Formatting.None, jsSettings);
    }

    [WebMethod (EnableSession = true)]
    public string CheckUrl(long id)
    {
        var page = new PageClass();

        string url = page.ReturnUrl(id);

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
            var page = new PageClass();

            var query = page.SelectAll();

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
    public bool Insert(PageEntity pageEntity)
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return false;
        }

        try
        {
            var page = new PageClass();

            var db = new DataClassesDataContext();

            var query = (from t in db.LanguageTables
                where t.Id == pageEntity.LanguageID
                select t).SingleOrDefault();

            if (pageEntity.Image != "")
            {
                pageEntity.Image = Session["CurrentTime"] + pageEntity.Image;
            }

            if (page.Insert(pageEntity)!=-1)
            {
               // CreatePage(pageEntity ,query.Code);

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
            var page = new PageClass();

            var query = page.SelectOne(id);

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
    public bool Update(PageEntity pageEntity)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            string oldName, oldUrl;
            var page = new PageClass();

            var db = new DataClassesDataContext();

            var query = (from t in db.LanguageTables
                         where t.Id == pageEntity.LanguageID
                         select t).SingleOrDefault();

            if (page.ReturnUrl(pageEntity.Id) == pageEntity.Image)
            {
                oldName = page.Update(pageEntity, out oldUrl);
            }
            else
            {
                string newUrl = Session["CurrentTime"] + pageEntity.Image;

                pageEntity.Image= newUrl;

                 oldName = page.Update(pageEntity, out oldUrl);

                if (newUrl != oldUrl && File.Exists(Server.MapPath("~/Mngmnt/images/" + oldUrl)))
                {
                    File.Delete(Server.MapPath("~/Mngmnt/images/" + oldUrl));
                }
            }

            DeletePage(oldName,query.Code);
            CreatePage(pageEntity, query.Code);

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
            var page = new PageClass();

            string Url, languageCode;

           
            DeletePage(page.DeleteOne(id, out Url, out languageCode), languageCode);

            if (Url != null)
            {
                if (File.Exists(Server.MapPath("~/Mngmnt/images/" + Url)))
                {
                    File.Delete(Server.MapPath("~/Mngmnt/images/" + Url));
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
            var page = new PageClass();

            for (int i = 0; i < idList.Count; i++)
            {
                string Url, languageCode;

                DeletePage(page.DeleteOne(Convert.ToInt64(idList[i]), out Url, out languageCode), languageCode);

                string url = Server.MapPath("~/Mngmnt/images/" + Url);

                if (Url != "")
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

    private void CreatePage(PageEntity pageEntity, string languageCode)
    {
        string masterPage = "MasterPageFile='" + pageEntity.Template + "'";
        string cssFile = "<link rel='stylesheet' href='" + pageEntity.Css + "'>";
        string jsFile = "<script src='" + pageEntity.Js + "'></script>";
        string keywords = "<meta name='keywords' content='" + pageEntity.Keywords + "'>";

        string fielName;

        if (Directory.Exists(Server.MapPath("~/" + languageCode)))
        {
            fielName = Server.MapPath("~/" + languageCode + "/" + pageEntity.FileName + ".aspx");
        }
        else
        {
            fielName = Server.MapPath("~/" + pageEntity.FileName + ".aspx");
        }


        using (FileStream fs = new FileStream(fielName, FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
        {
            using (StreamWriter StreamWriter = new StreamWriter(fs, Encoding.UTF8))
            {
                StreamWriter.WriteLine(@"<%@ Page Language='C#' " + masterPage + " AutoEventWireup='true'  CodeFile='" +
                                       pageEntity.FileName + ".aspx.cs' Inherits='" + pageEntity.FileName + "' %>" +

                                       "<asp:Content runat='server' ContentPlaceHolderID='head'>" +
                                       keywords +
                                       cssFile +
                                       jsFile +
                                       "</asp:Content>" +


                                       "<asp:Content runat='server' ContentPlaceHolderID='ContentPlaceHolder1'>" +
                                       "<div><div class='fltRight width70'>" +
                                       "<div class='headerLine'>" +
                                       pageEntity.Title.ToString(CultureInfo.InvariantCulture) + " </div>" +
                                       "  <div class='border1'></div>" +
                                       "<div class='headPic'><img style='width: inherit; height: inherit;'  src='mngmnt/images/" +
                                       pageEntity.Image + "' /></div>" +

                                       "<p>" + pageEntity.Body.ToString(CultureInfo.InvariantCulture) + "</p>" +
                                       "</div>" +
                                       "</div>" +
                                       "</asp:Content>");

                StreamWriter.Close();
            }           
        }

        using (FileStream fs = new FileStream(fielName + ".cs", FileMode.Append, FileAccess.Write, FileShare.ReadWrite))
        {
            using (StreamWriter StreamWriter2 = new StreamWriter(fs , Encoding.UTF8))
            {
                StreamWriter2.WriteLine(@"using System;
                       using System.Collections.Generic;
                       using System.Linq;
                       using System.Web;
                       using System.Web.UI;
                       using System.Web.UI.WebControls;
                       using System.IO;

                public partial class " + pageEntity.FileName + " : System.Web.UI.Page" +
                                        "{" +
                                        " protected void Page_Load(object sender, EventArgs e)" +
                                        "{" +
                                        "}" +
                                        "}");

                StreamWriter2.Close();
            }
        }
    }

    private void DeletePage(string name, string languageCode)
    {
        if (Directory.Exists(Server.MapPath("~/" + languageCode )) && File.Exists(Server.MapPath("~/" + languageCode + "/" + name + ".aspx")))
        {
            File.Delete(Server.MapPath("~/" + languageCode + "/" + name + ".aspx"));
            File.Delete(Server.MapPath("~/" + languageCode + "/" + name + ".aspx.cs"));
        }
        else
        {
            File.Delete(Server.MapPath("~/" +  name + ".aspx"));
            File.Delete(Server.MapPath("~/" +  name + ".aspx.cs"));

        }
       
    }
}
