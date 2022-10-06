using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;


/// <summary>
/// Summary description for TelegramLotteryUserRegister
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class TelegramLotteryUserRegister : System.Web.Services.WebService
{

    public TelegramLotteryUserRegister()
    {

    }

    [WebMethod(EnableSession = true)]
    public string Insert(TelegramLotteryUserEntity telegramEntity)

    {
        try
        {
            var dateBll = new BLL.DateAndTime();
            string nowDate = dateBll.PersianDate(DateTime.Now);
            nowDate = nowDate.Replace(" ", "");
            string nowTime = DateTime.Now.ToString("HH:mm");

            telegramEntity.RegisterDate = nowDate;
            telegramEntity.RegisterTime = nowTime;
            telegramEntity.Winner = false;

            var telegramClass = new TelegramRegisterClass();
            var telegramLotteryClass = new TelegramLotteryUserRegisterClass();
            telegramEntity.UserId = telegramClass.ExistUser(telegramEntity.CustomerId, telegramEntity.CustomerMobile);
            if (telegramEntity.UserId > 0)
            {
                if (telegramLotteryClass.ExistLotteryUser(telegramEntity.LotteryId, telegramEntity.UserId, telegramEntity.Year, telegramEntity.MonthNumber) == 0)
                {
                    var query = telegramLotteryClass.Insert(telegramEntity);
                    
                    return "1";// return "اطلاعات شما با موفقیت ثبت گردید";
                }
                else
                    return "3";
            }
            else
                
                return "2";//return "کاربر وارد شده قبلا در صفحه کاربران تلگرام عضو نشده است.";


        }
        catch (Exception ex)
        {
            // ErrorClass.Insert(ex.Message, ex.StackTrace, GlobalVariable.Username);
           
            return "0"; //return "خطا در ثبت اطلاعات";
        }

    }



    [WebMethod]
    public string GetData()
    {
        try
        {
            var telegramUser = new TelegramLotteryUserRegisterClass();

            var query = telegramUser.SelctAll();

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

    [WebMethod(EnableSession = true)]
    public void DeleteRecord(int id)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        try
        {
            var telegramUser = new TelegramLotteryUserRegisterClass();

            telegramUser.Delete(id);


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
            var telegramUser = new TelegramLotteryUserRegisterClass();

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


}
