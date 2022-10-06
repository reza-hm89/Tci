using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for MessagesiteWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
 [System.Web.Script.Services.ScriptService]
public class MessageSiteWs : System.Web.Services.WebService
{

    public MessageSiteWs()
    {

        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    [WebMethod(EnableSession = true)]
    public string Insert(MessageEntity messageEntity)
    {     

        try
        {
            var message = new MessageClassSite();

            messageEntity.UserIp = GlobalVariable.GetIp();
            messageEntity.SendDate = DateTime.Now;
            messageEntity.GroupID = 0;
            // messageEntity.UserID = (long)Session["UserId"];
            char[] chars = new char[62];
            var maxSize = 8;
            chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
            RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider();
            byte[] data = new byte[maxSize];
            crypto.GetNonZeroBytes(data);
            StringBuilder result = new StringBuilder(maxSize);
            foreach (byte b in data)
            {
                result.Append(chars[b % (chars.Length)]);
            }
            string rdmString = result.ToString();

            messageEntity.TrackingCode = rdmString;

            if (string.IsNullOrEmpty(messageEntity.UserIp))
            {
                return "";
            }

            if (message.Insert(messageEntity))
            {
                return rdmString;
            }

            return "";
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return "";
        }
    }

    [WebMethod(EnableSession = true)]
    public MessageEntity SelectOne(string code)
    {

        try
        {
            var message = new MessageClassSite();
            return message.SelectOne(code);

        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

}
