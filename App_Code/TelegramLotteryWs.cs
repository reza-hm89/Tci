using System;
using System.Activities.DurableInstancing;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Services;
using FarsiLibrary.Utils;
using Newtonsoft.Json;

/// <summary>
/// Summary description for TelegramLotteryWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class TelegramLotteryWs : System.Web.Services.WebService
{

    [WebMethod(EnableSession = true)]
    public string GetData()
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var telegramLottery = new TelegramLotteryClass();

            var query = telegramLottery.SelectAll();

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

    public string CreateRandomString()
    {
        char[] chars = new char[62];
        var maxSize = 16;
        chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
        RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider();
        byte[] data = new byte[maxSize];
        crypto.GetNonZeroBytes(data);
        StringBuilder result = new StringBuilder(maxSize);
        foreach (byte b in data)
        {
            result.Append(chars[b % (chars.Length)]);
        }
        return result.ToString();
    }

    [WebMethod(EnableSession = true)]
    public bool Insert(TelegramLotteryEntity telegramLotteryEntity)
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return false;
        }

        try
        {
            var telegramLottery = new TelegramLotteryClass();

            
            string code = CreateRandomString();
            string link = "http://tci-khn.ir/social/lottery.aspx?Id=" + telegramLotteryEntity.Year + telegramLotteryEntity.MonthNumber + "_" + code;

            telegramLotteryEntity.Link = link;
            telegramLotteryEntity.Code = code;
            if (telegramLottery.Insert(telegramLotteryEntity)>0)
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

    [WebMethod(EnableSession = true)]
    public string BindRecordToEdit(Int64 id)
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var telegramLottery = new TelegramLotteryClass();

            var query = telegramLottery.Select(id);
            query.MonthNumber = query.MonthNumber;
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
    public bool Update(TelegramLotteryEntity telegramLotteryEntity)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var telegramLottery = new TelegramLotteryClass();
            var oldLotteryEntity = telegramLottery.Select(telegramLotteryEntity.Id);
            if (string.IsNullOrEmpty(oldLotteryEntity.Code))
                oldLotteryEntity.Code = CreateRandomString();

            telegramLotteryEntity.Code = oldLotteryEntity.Code;
            telegramLotteryEntity.Link = "http://tci-khn.ir/social/lottery.aspx?Id=" + telegramLotteryEntity.Year + telegramLotteryEntity.MonthNumber + "_" + oldLotteryEntity.Code;

            telegramLottery.Update(telegramLotteryEntity);

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    [WebMethod(EnableSession = true)]
    public void DeleteRecord(long id)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        try
        {
            var telegramLottery = new TelegramLotteryClass();

            telegramLottery.Delete(id);
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
            var telegramLottery = new TelegramLotteryClass();

            for (int i = 0; i < idList.Count; i++)
            {
                telegramLottery.Delete(Convert.ToInt64(idList[i]));
            }
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }

    }
}
