using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;

/// <summary>
/// Summary description for Contact
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Contact : System.Web.Services.WebService
{
    [WebMethod]
    public string SelectOneComment(long id)
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = from t in db.MessageTables
                        where t.Id == id
                        select new
                        {
                            t.Id,
                            Name = t.Name + " " + t.Family,
                            t.Email,
                            t.Body,
                            SendDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.SendDate.Value).ToString("yy/mm/dd"),
                            SendTime = t.SendDate.Value.ToShortTimeString(),
                            t.UserIp,
                            t.Mobile
                        };



            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception)
        {
            return null;
        }
    }

    [WebMethod]
    public string CurrentDate()
    {
        try
        {
            var dates = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(DateTime.Now).ToString("yy//mm//dd");

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(dates, Formatting.None, jsSettings);
        }
        catch (Exception)
        {
            return null;
        }
    }
}
