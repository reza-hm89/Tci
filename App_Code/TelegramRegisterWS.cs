using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;

/// <summary>
/// Summary description for TelegramRegisterWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class TelegramRegisterWS : System.Web.Services.WebService {

    public TelegramRegisterWS () {

    }

    [WebMethod(EnableSession = true)]
    public string Insert(TelegramUserEntity telegramEntity)

    {
        try
        {
            var dateBll = new BLL.DateAndTime();
            string nowDate = dateBll.PersianDate(DateTime.Now);
            nowDate = nowDate.Replace(" ", "");
            string nowTime = DateTime.Now.ToString("HH:mm");

            telegramEntity.RegisterDate = nowDate;
            telegramEntity.RegisterTime = nowTime;
            telegramEntity.Active = true;

            var telegramClass = new TelegramRegisterClass();
            if (telegramClass.ExistCustomerId(telegramEntity.CustomerId))
            {
                if (telegramClass.ExistEmail(telegramEntity.CustomerEmail))
                    if (telegramClass.ExistMobile(telegramEntity.CustomerMobile))
                    {
                        telegramClass.Insert(telegramEntity);                       
                        return "1";// return "اطلاعات شما با موفقیت ثبت گردید";
                    }
                    else                       
                        return "2";//return "شماره موبایل وارد شده تکراری می باشد.";
                else                   
                    return "3";// return "ایمیل وارد شده تکراری می باشد.";
            }
            else
            {                
                return "4";//return "شماره عضویت (تلفن ثابت ) شما تکراری می باشد";
            }
        }
        catch (Exception ex)
        {
            // ErrorClass.Insert(ex.Message, ex.StackTrace, GlobalVariable.Username);
            return "خطا در ثبت اطلاعات";
        }

    }


    [WebMethod(EnableSession = true)]
    public void DeleteRecord(int id)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        try
        {
            var user = new TelegramRegisterClass();

             user.Delete(id);
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    [WebMethod(EnableSession = true)]
    public void DeleteMultiRecord(List<string> idList)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        try
        {
            var telegramUser = new TelegramRegisterClass();

            for (int i = 0; i < idList.Count; i++)
            {
                telegramUser.Delete(Convert.ToInt64(idList[i]));
            }
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    [WebMethod]
    public string GetData()
    {
        try
        {
            var telegramUser = new TelegramRegisterClass();

            var query = telegramUser.SelectAll();

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
            //ErrorClass.Insert(ex.Message, ex.StackTrace, GlobalVariable.Username);
            return null;
        }
    }
}
