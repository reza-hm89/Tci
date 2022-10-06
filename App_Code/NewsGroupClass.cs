using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for NewsGroupClass
/// </summary>
public class NewsGroupClass
{
	public NewsGroupClass()
	{
	
	}

    public bool SetVisibility(long id, bool visibility)
    {
        try
        {
            var db = new DataClassesDataContext();

            var newsGroup = (from t in db.NewsGroupTables
                         where t.Id == id
                         select t).Single();

            newsGroup.Visibility = visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Insert(NewsGroupEntity newsGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
           
            var newsGroup = new NewsGroupTable();

            newsGroup.Name = newsGroupEntity.Name;
            newsGroup.LanguageID = newsGroupEntity.LanguageID;
            newsGroup.Visibility = newsGroupEntity.Visibility;

            db.NewsGroupTables.InsertOnSubmit(newsGroup);
            db.SubmitChanges();

            newsGroup.Priority = newsGroup.Id;
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Update(NewsGroupEntity newsGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var productGroup = (from t in db.NewsGroupTables
                                where t.Id == newsGroupEntity.Id
                                select t).Single();

            if (productGroup != null)
            {
                productGroup.Name = newsGroupEntity.Name;
                productGroup.LanguageID = newsGroupEntity.LanguageID;

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

            var query = (from t in db.NewsGroupTables
                         where t.Id == id
                         select t).Single();

            db.NewsGroupTables.DeleteOnSubmit(query);
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

            var query = from t in db.NewsGroupTables
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

            var query = from t in db.NewsGroupTables
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