using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using FarsiLibrary.Utils;
using Newtonsoft.Json;

/// <summary>
/// Summary description for AuctionWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class AuctionWs : System.Web.Services.WebService
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
            var auction = new AuctionClass();

            var query = auction.SelectAll();

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
    public string SelectEventImages(long id)
    {

        try
        {
            var auctionFile = new AuctionFilesClass();

            var query = auctionFile.SelectAllFromOne(id);

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
    public bool Insert(AuctionEntity auctionEntity)
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return false;
        }

        try
        {
            var auction = new AuctionClass();

            auctionEntity.RegDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.RegDate1);
            auctionEntity.StartRecieveDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.StartRecieveDate1);
            auctionEntity.EndRecieveDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.EndRecieveDate1);
            auctionEntity.SendDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.SendDate1);
            auctionEntity.ReOpeningDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.ReOpeningDate1);

            long id = auction.Insert(auctionEntity);

            if (id > -1)
            {
                if (Directory.Exists(Server.MapPath("~/Mngmnt/upload/")))
                {

                    var dirInfo = new DirectoryInfo(Server.MapPath("~/Mngmnt/upload/"));

                    FileInfo[] fileInfo = dirInfo.GetFiles();

                    var files = new AuctionFilesWs();                    

                    foreach (FileInfo info in fileInfo)
                    {
                        var fileEntity = new AuctionFilesEntity();

                        fileEntity.AuctionID = id;
                        fileEntity.Name = info.Name;

                        files.Insert(fileEntity);

                        info.CopyTo(Server.MapPath("~/Mngmnt/asnad/") + info.Name, false);
                    }


                    foreach (FileInfo info in fileInfo)
                    {
                        info.Delete();
                    }

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

    [WebMethod(EnableSession = true)]
    public string BindRecordToEdit(Int64 id)
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var auction = new AuctionClass();

            var query = auction.SelectOne(id);

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
    public bool Update(AuctionEntity auctionEntity)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var auction = new AuctionClass();

            auctionEntity.RegDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.RegDate1);
            auctionEntity.StartRecieveDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.StartRecieveDate1);
            auctionEntity.EndRecieveDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.EndRecieveDate1);
            auctionEntity.SendDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.SendDate1);
            auctionEntity.ReOpeningDate = PersianDateConverter.ToGregorianDateTime(auctionEntity.ReOpeningDate1);

            auction.Update(auctionEntity);
                      
            if (Directory.Exists(Server.MapPath("~/Mngmnt/upload/")))
            {

                var files = new AuctionFilesWs();              

                var dirInfo = new DirectoryInfo(Server.MapPath("~/Mngmnt/upload/"));

                FileInfo[] fileInfo = dirInfo.GetFiles();

               
                foreach (FileInfo info in fileInfo)
                {
                    var fileEntity = new AuctionFilesEntity();

                    fileEntity.AuctionID = auctionEntity.Id;
                    fileEntity.Name = info.Name;

                    files.Insert(fileEntity);

                    info.CopyTo(Server.MapPath("~/Mngmnt/asnad/") + info.Name, false);

                }

                foreach (FileInfo info in fileInfo)
                {
                    info.Delete();
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

    [WebMethod(EnableSession = true)]
    public void DeleteRecord(long id)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        try
        {
            var auction = new AuctionClass();

            auction.DeleteOne(id);
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
            var auction = new AuctionClass();

            for (int i = 0; i < idList.Count; i++)
            {
                auction.DeleteOne(Convert.ToInt64(idList[i]));
            }
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }

    }


    [WebMethod(EnableSession = true)]
    public bool DeleteImage(long id)
    {

        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.AuctionFilesTables
                         where t.Id == id
                         select t).Single();

            if (File.Exists(Server.MapPath("~/Mngmnt/asnad/") + query.Name))
            {
                File.Delete(Server.MapPath("~/Mngmnt/asnad/") + query.Name);
                
                db.AuctionFilesTables.DeleteOnSubmit(query);
                db.SubmitChanges();

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
}
