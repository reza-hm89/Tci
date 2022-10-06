using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AuctionGroupClass
/// </summary>
public class AuctionGroupClass
{
    public AuctionGroupClass()
    {
      
    }
    public bool Insert(AuctionGroupEntity auctionGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var auctionGroup = new AuctionGroupTable();

            auctionGroup.Name = auctionGroupEntity.Name;
            auctionGroup.Description = auctionGroupEntity.Description;
           
            db.AuctionGroupTables.InsertOnSubmit(auctionGroup);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Update(AuctionGroupEntity auctionGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var productGroup = (from t in db.AuctionGroupTables
                                where t.Id == auctionGroupEntity.Id
                                select t).Single();

            if (productGroup != null)
            {
                productGroup.Name = auctionGroupEntity.Name;
                productGroup.Description = auctionGroupEntity.Description;

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

            var query = (from t in db.AuctionGroupTables
                         where t.Id == id
                         select t).Single();

            db.AuctionGroupTables.DeleteOnSubmit(query);
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

            var query = from t in db.AuctionGroupTables
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

            var query = from t in db.AuctionGroupTables
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