using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for OurServiceClass
/// </summary>
public class OurServiceClass
{
	public OurServiceClass()
	{
	}

    public bool Insert(OurServiceEntity ourSerEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var ourSer = new OurServiceTable();

            ourSer.Title = ourSerEntity.Title;
            ourSer.Image = ourSerEntity.Image;
            ourSer.Description = ourSerEntity.Description;
            ourSer.Visibility = ourSerEntity.Visibility;
            ourSer.Priority = ourSerEntity.Priority;
            
            db.OurServiceTables.InsertOnSubmit(ourSer);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public string Update(OurServiceEntity ourSerEntity)
    {
        try
        {

            var db = new DataClassesDataContext();

            var query = (from t in db.OurServiceTables
                         where t.Id == ourSerEntity.Id
                         select t).Single();

            string oldUrl = query.Image;

            query.Title = ourSerEntity.Title;
            query.Image = ourSerEntity.Image;
            query.Description = ourSerEntity.Description;
            query.Priority = ourSerEntity.Priority;

            db.SubmitChanges();

            return oldUrl;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public string DeleteOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.OurServiceTables
                         where t.Id == id
                         select t).Single();

            string oldUrl = query.Image;

            if (query != null)
            {
                db.OurServiceTables.DeleteOnSubmit(query);
                db.SubmitChanges();
            }
            return oldUrl;
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

            var query = from t in db.OurServiceTables
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

    public IEnumerable<object> SelectAll()
    {
        try
        {

            var db = new DataClassesDataContext();

            var query = from t in db.OurServiceTables
                        select
                    new
                    {
                        t.Id,
                        t.Title,
                        t.Image,
                        t.Description,
                        t.Visibility,
                        t.Priority,
                    };
            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }

    }     

    public string ReturnUrl(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.OurServiceTables
                         where t.Id == id
                         select t).Single();

            return query.Image;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public bool SetVisibility(long id, bool visibility)
    {
       
        try
        {
            var db = new DataClassesDataContext();

            var customer = (from t in db.OurServiceTables
                            where t.Id == id
                            select t).Single();

            customer.Visibility = visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }
}