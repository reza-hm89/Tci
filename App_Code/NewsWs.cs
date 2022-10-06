using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using  System.IO;

/// <summary>
/// Summary description for NewsWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class NewsWs : System.Web.Services.WebService {

   [WebMethod (EnableSession = true)]
    public string GetDateTime()
    {
        var labelDate = FarsiLibrary.Utils.PersianDate.Now.ToString("yy/mm/dd");
        var labelTime = FarsiLibrary.Utils.PersianDate.Now.Time.Hours.ToString(CultureInfo.InvariantCulture) + ":" +
                         FarsiLibrary.Utils.PersianDate.Now.Time.Minutes.ToString(CultureInfo.InvariantCulture);

        var result = new DateTime2(labelDate, labelTime);

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
       var news = new NewsClass();

       string url = news.ReturnUrl(id);

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
            var news = new NewsClass();

            var query = news.SelectAll();

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
    public void Insert(NewsEntity newsEntity)
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return;
        }

        try
        {
            var news = new NewsClass();

            if (newsEntity.Image != "")
            {
                newsEntity.Image = Session["CurrentTime"] + newsEntity.Image;
            }

            newsEntity.UserID = Convert.ToInt64(Session["UserId"]);
            newsEntity.PublishDate = DateTime.Now;
            newsEntity.PublishTime = DateTime.Now.TimeOfDay;

            news.Insert(newsEntity);
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);           
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
            var news = new NewsClass();

            var query = news.SelectOne(id);

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
    public bool Update(NewsEntity newsEntity)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var news = new NewsClass();

            if (news.ReturnUrl(newsEntity.Id) == newsEntity.Image)
            {
                newsEntity.UserID = Convert.ToInt64(Session["UserId"]);

                newsEntity.PublishDate = DateTime.Now;
                newsEntity.PublishTime = DateTime.Now.TimeOfDay;

                news.Update(newsEntity);
            }
            else
            {
                string newUrl = Session["CurrentTime"] + newsEntity.Image;
                newsEntity.UserID = Convert.ToInt64(Session["UserId"]);

                newsEntity.PublishDate = DateTime.Now;
                newsEntity.PublishTime = DateTime.Now.TimeOfDay;

                newsEntity.Image = newUrl;

                string oldImgUrl = news.Update(newsEntity);

                if (newsEntity.Image != oldImgUrl && File.Exists(Server.MapPath("~/Mngmnt/images/" + oldImgUrl)))
                {
                    File.Delete(Server.MapPath("~/Mngmnt/images/" + oldImgUrl));
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
    public void DeleteRecord(int id)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        try
        {
            var news = new NewsClass();

            string imageUrl = news.Delete(id);

            if (imageUrl != null)
            {
                if (File.Exists(Server.MapPath("~/Mngmnt/images/" + imageUrl)))
                {
                    File.Delete(Server.MapPath("~/Mngmnt/images/" + imageUrl));
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
            var news = new NewsClass();

            for (int i = 0; i < idList.Count; i++)
            {
                string imageUrl = news.Delete(Convert.ToInt64(idList[i]));

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
    public string Search(string titr, string pubDate, string author)
    {
        try
        {
            var news = new NewsClass();

            var query = news.Search(titr, pubDate, author);

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
    public string SearchPublication(int status)
    {
        try
        {
            var news = new NewsClass();

            if (status != -1)
            {
                var query = news.SearchPublication(status);

                var jsSettings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.None
                };

                return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
            }
            else
            {
                var query = news.SelectAll();

                var jsSettings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.None
                };

                return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
            }
          
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    [WebMethod (EnableSession = true)]
    public string SearchUser(long userId)
    {
        try
        {
            var news = new NewsClass();

            if (userId!=-1)
            {
                var query = news.SearchUser(userId);

                var jsSettings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.None
                };

                return JsonConvert.SerializeObject(query, Formatting.None, jsSettings); 
            }
            else
            {
                var query = news.SelectAll();

                var jsSettings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.None
                };

                return JsonConvert.SerializeObject(query, Formatting.None, jsSettings); 
            }
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}

public class DateTime2
{
    public DateTime2(string date, string time)
    {
        Date = date;
        Time = time;
    }

    public string Date { get; set; }

    public string Time { get; set; }
}