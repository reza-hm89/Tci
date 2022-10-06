using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AuctionFilesClass
/// </summary>
public class AuctionFilesClass
{
    public AuctionFilesClass()
    {
       
    }

    public bool Insert(AuctionFilesEntity auctionFilesEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var auctionFiles = new AuctionFilesTable();

            auctionFiles.Name = auctionFilesEntity.Name;
            auctionFiles.AuctionID = auctionFilesEntity.AuctionID;
            
            db.AuctionFilesTables.InsertOnSubmit(auctionFiles);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Update(AuctionFilesEntity auctionFilesEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var auctionFiles = (from t in db.AuctionFilesTables
                                where t.AuctionID == auctionFilesEntity.AuctionID
                                select t).Single();

            if (auctionFiles != null)
            {
                auctionFiles.Name = auctionFilesEntity.Name;
               // auctionFiles.AuctionID = auctionFilesEntity.AuctionID;

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

            var query = (from t in db.AuctionFilesTables
                         where t.Id == id
                         select t).Single();

            db.AuctionFilesTables.DeleteOnSubmit(query);
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

            var query = from t in db.AuctionFilesTables
                join auc in db.AuctionTables on t.AuctionID equals auc.Id                        
                where t.AuctionID == id && auc.EndRecieveDate>=DateTime.Now
                select new
                {
                    t.Id,
                    t.Name
                };

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

            var query = from t in db.AuctionFilesTables
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