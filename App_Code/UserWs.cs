using System;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.Services;
using Newtonsoft.Json;

/// <summary>
/// Summary description for UserWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UserWs : System.Web.Services.WebService
{

    [WebMethod (EnableSession = true)]
    public string ShowChildrenChart(long userId)
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var user = new UserClass();

            var list = new List<UserLevel>();
            var q = new Queue<UserLevel>();

            list = user.ShowChildrenTree(list, q, userId, 0);


            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(list, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public string GetCurrentUser()
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = (from t in db.UserTables
                         where t.Username == Session["username"]
                         select t).Single();

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
    public int CheckEmail(string email)
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = (from t in db.UserTables
                         where t.Email == email
                         select t).Single();

            if (query != null)
            {
                string guid = Guid.NewGuid().ToString();

                string emailBody = "کاربر گرامی: " + email + "\n" +
                                   "لینک زیر به درخواست شما برای بازیابی کلمه عبورتان در سایت ترند برای شما ارسال شده است." +
                                   "\n" +
                                   "لطفاً توجه داشته باشید لینک فوق از تاریخ ارسال برای مدت 48 ساعت معتبر می باشد و پس از آن منقضی می گردد." +
                                   "\n" +
                                   "تاریخ: " + FarsiLibrary.Utils.PersianDate.Now.ToString("yy/mm/dd") + "\n" + "\n" +

                                   "لطفا جهت تغییر رمز عبور خود بر روی لینک زیر کلیک نمائید :" + "\n" +
                                   "http://" + HttpContext.Current.Request.Url.Host + ":" + HttpContext.Current.Request.Url.Port + "/changepassword.aspx?email=" + email + "&guid=" + guid;

                if (GlobalFunction.SendEmail(email, "بازیابی رمز عبور", emailBody) == true)
                {
                    query.ChangePassRequestCode = guid;
                    query.ChangePassRequestDate = DateTime.Now;

                    db.SubmitChanges();
                    return 1;
                }

            }
            return 0;
        }
        catch (InvalidOperationException ex)
        {
            return -1;
        }

    }

    [WebMethod (EnableSession = true)]
    public string CheckUrl(long id)
    {
        var user = new UserClass();

        string url = user.ReturnImageUrl(id);

        var jsSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            PreserveReferencesHandling = PreserveReferencesHandling.None
        };

        return JsonConvert.SerializeObject(url, Formatting.None, jsSettings);
    }

    [WebMethod (EnableSession = true)]
    public bool CheckLogin()
    {
         if (Session["username"] == null)
        {
            return false;
        }

        return true;
    }

    [WebMethod(EnableSession = true)]
    public int Login(string userName, string pass, string cptchaCode, bool rememberMe)
    {

        //if (Session["Captcha"] == null)
        //    return -1;

        //if (Session["Captcha"].ToString() != cptchaCode)
        //    return -1;

        string password = FormsAuthentication.HashPasswordForStoringInConfigFile(pass, "md5");

        var db = new DataClassesDataContext();
        var query = (from t in db.UserTables
                     where t.Username == userName && t.Password == password
                     select t).FirstOrDefault();

        if (query == null)
            return -2;

        query = (from t in db.UserTables
                 where t.Username == userName && t.Password == password
                 select t).Single();

        if (query == null)
            return 0;

        Session["Username"] = query.Username;
        Session["UserId"] = Convert.ToInt64(query.Id);

        Session["Username"] = Session["Username"].ToString();
        Session["UserId"] = query.Id;

        Permissions per = new Permissions();

        per.UserId = query.Id;
        per.ModuleId = -1;
        per.Show = true;
        per.Insert = false;
        per.Update = false;
        per.Delete = false;

        //GlobalVariable.ModulePermission = per;

        query.LoginDate = DateTime.Now;

        db.SubmitChanges();

        RememberMe(userName, pass, rememberMe);

        //SmsWs sms = new SmsWs();

        //SmsEntity smsEntity=new SmsEntity();

        //smsEntity.Receptor = "09151865928";
        //smsEntity.Message = "کاربر " + Session["username"] + " با موفقیت وارد پنل مدیریت شد";

        //sms.Insert(smsEntity);

        return 1;
    }

    public void RememberMe(string username, string password, bool rememberMe)
    {
        if (rememberMe == true)
        {
            HttpCookie cookie = new HttpCookie("SaveUser");
            cookie.Values.Add("username", username);
            cookie.Values.Add("password", password);
            cookie.Expires = DateTime.Now.AddYears(1);
            HttpContext.Current.Response.Cookies.Set(cookie);
        }
    }

    [WebMethod(EnableSession = true)]
    public string CheckRememberMe()
    {
        if (HttpContext.Current.Request.Cookies["SaveUser"]["username"] != null && HttpContext.Current.Request.Cookies["SaveUser"]["password"] != null)
        {
            object[] names = new object[2];

            names[0] = HttpContext.Current.Request.Cookies["SaveUser"]["username"].ToString();
            names[1] = HttpContext.Current.Request.Cookies["SaveUser"]["password"].ToString();

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(names, Formatting.None, jsSettings);
        }
        return null;
    }

    [WebMethod(EnableSession = true)]
    public void Logout()
    {
        if (Session["username"] == null)
        {
            return;
        }
        var db = new DataClassesDataContext();
        var query = (from t in db.UserTables
                     where t.Username == Session["username"].ToString()
                     select t).Single();

        if (query != null)
        {
            query.LogoutDate = DateTime.Now;

            db.SubmitChanges();
        }
       
        Session["Username"] = null;
        Session["UserId"] = -1;
       // GlobalVariable.PermissionList = null;

    }

    [WebMethod (EnableSession = true)]
    public bool ExistUser(long userId)
    {
        var user = new UserClass();

        if (user.SelectOne(userId) == null)
        {
            return false;
        }
        else
        {
            return true;
        }
    }

    [WebMethod (EnableSession = true)]
    public bool ExistUsername(string username)
    {
        var user = new UserClass();

        if (user.ExistUsername(username) == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    [WebMethod (EnableSession = true)]
    public bool ExistEmail(string email)
    {
        var user = new UserClass();

        if (user.ExistEmail(email) == true)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    [WebMethod(EnableSession = true)]
    public bool ChangePassword(UserEntity userEntity, string password, string newPassword)
    {
        var db = new DataClassesDataContext();

        var query = (from t in db.UserTables
                     where t.Id == userEntity.Id
                     select t).Single();

        if (query != null)
        {
            password = FormsAuthentication.HashPasswordForStoringInConfigFile(password, "md5");

            if (query.Password.ToLower() == password.ToLower())
            {
                query.Password = FormsAuthentication.HashPasswordForStoringInConfigFile(newPassword, "md5");
                db.SubmitChanges();

                return true;
            }
        }

        return false;
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
            var users = new UserClass();

            var query = users.SelectAll();

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
    public long Insert(UserEntity userEntity)
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return -1;
        }

        try
        {
            var user = new UserClass();

            userEntity.RegDate = DateTime.Now.ToString(CultureInfo.InvariantCulture);
            userEntity.Birthday = DateTime.Now.ToString(CultureInfo.InvariantCulture);
            userEntity.LoginDate = DateTime.Now.ToString(CultureInfo.InvariantCulture);
            userEntity.LogoutDate = DateTime.Now.ToString(CultureInfo.InvariantCulture);

            userEntity.RegUserID = (long) Session["UserId"];

            if (userEntity.ImageUrl != "")
            {
                userEntity.ImageUrl = Session["CurrentTime"] + userEntity.ImageUrl;
            }

            userEntity.Password = FormsAuthentication.HashPasswordForStoringInConfigFile(userEntity.Password, "md5");

            return user.Insert(userEntity);

        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);

            return -1;
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
            var user = new UserClass();

            var query = user.SelectOne(id);

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
    public bool Update(UserEntity userEntity)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            bool result = false;

            string oldUrl = "";

            var user = new UserClass();

            if (user.ReturnImageUrl(userEntity.Id) == userEntity.ImageUrl)
            {
                result = user.Update(userEntity, out oldUrl);
            }
            else
            {
                userEntity.ImageUrl = Session["CurrentTime"] + userEntity.ImageUrl;

                result = user.Update(userEntity, out oldUrl);

                if (userEntity.ImageUrl != oldUrl && File.Exists(Server.MapPath("~/Mngmnt/images/" + oldUrl)))
                {
                    File.Delete(Server.MapPath("~/Mngmnt/images/" + oldUrl));
                }
            }

            return result;
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
            var user = new UserClass();

            string logoUrl = user.DeleteOne(id);

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
            var user = new UserClass();

            for (int i = 0; i < idList.Count; i++)
            {
                string imageUrl = user.DeleteOne(Convert.ToInt64(idList[i]));

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
    public string Search(string username, string name)
    {
        try
        {
            var user = new UserClass();

            var query = user.Search(username, name);

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
}