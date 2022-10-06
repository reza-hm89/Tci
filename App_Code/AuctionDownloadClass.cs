using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AuctionDownload
/// </summary>
public class AuctionDownloadClass
{
    public AuctionDownloadClass()
    {
       
    }

    public bool Insert(AuctionDownloadEntity auctionDownloadEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var auctionDownload = new AuctionDownloadTable();

            auctionDownload.AuctionID = auctionDownloadEntity.AuctionID;
            auctionDownload.Name = auctionDownloadEntity.Name;
            auctionDownload.Family = auctionDownloadEntity.Family;
            auctionDownload.Tel = auctionDownloadEntity.Tel;
            auctionDownload.Description = auctionDownloadEntity.Description;

            db.AuctionDownloadTables.InsertOnSubmit(auctionDownload);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Update(AuctionDownloadEntity auctionDownloadEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var auctionDownload = (from t in db.AuctionDownloadTables
                                where t.Id == auctionDownloadEntity.Id
                                select t).Single();

            if (auctionDownload != null)
            {
                auctionDownload.AuctionID = auctionDownloadEntity.AuctionID;
                auctionDownload.Name = auctionDownloadEntity.Name;
                auctionDownload.Family = auctionDownloadEntity.Family;
                auctionDownload.Tel = auctionDownloadEntity.Tel;
                auctionDownload.Description = auctionDownloadEntity.Description;

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

    public void DeleteOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.AuctionDownloadTables
                         where t.Id == id
                         select t).Single();

            db.AuctionDownloadTables.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    public IEnumerable<object> SelectAllFromOne(long id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.AuctionDownloadTables
                        where t.AuctionID==id
                        select t;

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }


    public IEnumerable<object> SelectOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.AuctionDownloadTables
                        where t.Id == id
                        select t;

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}