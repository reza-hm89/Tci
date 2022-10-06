using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Globalization;
using System.Linq;
using System.Net.Configuration;
using System.Net.Mail;
using System.Web;

/// <summary>
/// Summary description for GlobalVariable
/// </summary>
public static class GlobalVariable
{
   
    //public static string CurrentTime { get; set; }
     //public static string CurrentPage { set; get; }
    //public static List<Permissions> PermissionList { get; set; }

    //public static Permissions ModulePermission{ get; set; }

    public static string GetIp()
    {
        try
        {
            string ipString;
            System.Net.IPAddress result;

            if (string.IsNullOrEmpty(HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"]))
            {
                ipString = HttpContext.Current.Request.ServerVariables["REMOTE_ADDR"];
            }
            else
            {
                ipString =
                    HttpContext.Current.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].Split(",".ToCharArray(),
                        StringSplitOptions.RemoveEmptyEntries)
                        .FirstOrDefault();
            }

            if (ipString != null && !System.Net.IPAddress.TryParse(ipString, out result))
            {
                ipString = System.Net.IPAddress.None.ToString();
            }

            return ipString;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

   
    public static string GetCurrentTime()
    {     
        return Guid.NewGuid().ToString();
    }

    public static DataTable ToTable<T>(this IEnumerable<T> items)
    {
        try
        {
            var tb = new DataTable(typeof(T).Name);

            System.Reflection.PropertyInfo[] props = typeof(T).GetProperties(System.Reflection.BindingFlags.Public | System.Reflection.BindingFlags.Instance);
            foreach (var prop in props)
            {
                Type propType = prop.PropertyType;

                if (propType.IsGenericType && propType.GetGenericTypeDefinition().Equals(typeof(Nullable<>)))
                    propType = new NullableConverter(propType).UnderlyingType;
                tb.Columns.Add(prop.Name, propType);
            }
            foreach (var item in items.ToList())
            {
                var values = new object[props.Length];
                for (var i = 0; i < props.Length; i++)
                {
                    values[i] = props[i].GetValue(item, null);
                }
                tb.Rows.Add(values);
            }
            return tb;

        }
        catch (Exception)
        {

            return null;
        }

    }

}

public class GlobalFunction
{

    public static bool SendEmail(string email, string title, string description)
    {
        try
        {
                        
            SmtpClient SmtpServer = new SmtpClient();
            SmtpServer.Credentials = new System.Net.NetworkCredential("tameshkiha.com@gmail.com", "ForRezaHosseini");
            SmtpServer.Host = "smtp.gmail.com";
            SmtpServer.Port = 587;

            SmtpServer.EnableSsl = true;
            MailMessage maill = new MailMessage();
            String[] addr = email.Split(',');

            maill.From = new MailAddress("info@terendteam.com", "تیم نرم افزاری ترند", System.Text.Encoding.UTF8);
            Byte i;

            maill.To.Add(email);
            maill.Subject = title;
            maill.Body = description;

            maill.ReplyTo = new MailAddress(email);
            SmtpServer.Send(maill);

            return true;
        }

        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public static bool CheckModulePermission(string crud)
    {
        //if (GlobalVariable.ModulePermission == null)
        //{
        //    return false;
        //}

        //if (crud=="insert")
        //{          
        //    if (GlobalVariable.ModulePermission.Insert == false)
        //    {
        //        return false;
        //    }
        //}
        //else if (crud == "update")
        //{
        //    if (GlobalVariable.ModulePermission.Update == false)
        //    {
        //        return false;
        //    }
        //}
        //else if (crud == "delete")
        //{
        //    if (GlobalVariable.ModulePermission.Delete == false)
        //    {
        //        return false;
        //    }
        //}
        //else if (crud == "show")
        //{
        //    if (GlobalVariable.ModulePermission.Show == false)
        //    {
        //        return false;
        //    }
        //}

        return true;
    }

    public static string ChangeNumbers(string input)
    {
        return
             input.Replace("۰", "0")
                .Replace("۱", "1")
                .Replace("۲", "2")
                .Replace("۳", "3")
                .Replace("۴", "4")
                .Replace("۵", "5")
                .Replace("۶", "6")
                .Replace("۷", "7")
                .Replace("۸", "8")
                .Replace("۹", "9");
    }
}

public class UserLevel
{
    public int LevelNumber;
    public long UserId;
    public long ParentId;
    public string Username;
    public string Mobile;
}
public class ChildPercent
{
    public long FactorId;
    public long ProductId;
    public long Prices;
    public long Percent;   
}
