using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;
using Tci;

/// <summary>
/// Summary description for Adsl
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class Adsl : System.Web.Services.WebService
{


    [WebMethod]
    public string SearchAdsl(string preCode, string tel)
    {
        Tci.Service test = new Service();

        var tb = test.Outsider_Portal_AdslStatus(preCode, tel, "PortalUser", "pOrt@l");

        var jsSettings = new JsonSerializerSettings
        {
            ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
            PreserveReferencesHandling = PreserveReferencesHandling.None
        };
        
        if (tb.Tables.Count > 0)
        {
            return JsonConvert.SerializeObject(tb.Tables[0], Formatting.None, jsSettings);
        }
        else
        {
            return JsonConvert.SerializeObject("خطا در دریافت اطالاعات", Formatting.None, jsSettings);           
        }
    }

}
