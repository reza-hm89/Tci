using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AuctionClass
/// </summary>
public class AuctionClass
{
    public AuctionClass()
    {
    }

    public long Insert(AuctionEntity auctionEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var auction = new AuctionTable();

            auction.AuctionGroupID = auctionEntity.AuctionGroupID;
            auction.Kind = auctionEntity.Kind;
            auction.Subject = auctionEntity.Subject;
            auction.Number = auctionEntity.Number;
            auction.RegDate = auctionEntity.RegDate;
            auction.StartRecieveDate = auctionEntity.StartRecieveDate;
            auction.EndRecieveDate = auctionEntity.EndRecieveDate;
            auction.SendDate = auctionEntity.SendDate;
            auction.ReOpeningDate = auctionEntity.ReOpeningDate;
            auction.Description = auctionEntity.Description;

            db.AuctionTables.InsertOnSubmit(auction);
            db.SubmitChanges();

            return auction.Id;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return -1;
        }
    }

    public bool Update(AuctionEntity auctionEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var auction = (from t in db.AuctionTables
                           where t.Id == auctionEntity.Id
                           select t).Single();

            if (auction != null)
            {
                auction.AuctionGroupID = auctionEntity.AuctionGroupID;
                auction.Kind = auctionEntity.Kind;
                auction.Subject = auctionEntity.Subject;
                auction.Number = auctionEntity.Number;
                auction.RegDate = auctionEntity.RegDate;
                auction.StartRecieveDate = auctionEntity.StartRecieveDate;
                auction.EndRecieveDate = auctionEntity.EndRecieveDate;
                auction.SendDate = auctionEntity.SendDate;
                auction.ReOpeningDate = auctionEntity.ReOpeningDate;
                auction.Description = auctionEntity.Description;

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

            var query = (from t in db.AuctionTables
                         where t.Id == id
                         select t).Single();

            db.AuctionTables.DeleteOnSubmit(query);
            db.SubmitChanges();
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    public IEnumerable<object> SelectAll()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.AuctionTables
                        orderby t.Id descending
                        select new
                        {
                            t.Id,
                            t.Kind,
                            t.Number,
                            t.Subject,
                            StartRecieveDate =
                                FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.StartRecieveDate.Value)
                                    .ToString("yy/mm/dd")
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

            var query = from t in db.AuctionTables
                        where t.Id == id
                        select new
                        {
                            t.Id,
                            t.AuctionGroupID,
                            t.Kind,
                            t.Number,
                            t.Subject,
                            RegDate =
                        FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.RegDate.Value)
                            .ToString("yy/mm/dd"),
                            StartRecieveDate =
                        FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.StartRecieveDate.Value)
                            .ToString("yy/mm/dd"),
                            EndRecieveDate =
                        FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.EndRecieveDate.Value)
                            .ToString("yy/mm/dd"),
                            SendDate =
                        FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.SendDate.Value)
                            .ToString("yy/mm/dd"),
                            ReOpeningDate =
                        FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.ReOpeningDate.Value)
                            .ToString("yy/mm/dd"),
                            t.Description
                        };

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

}