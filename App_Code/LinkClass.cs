using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;

/// <summary>
/// Summary description for LinkClass
/// </summary>
public class LinkClass
{
    public LinkClass()
    {
    }

    public bool SetVisibility(long id, bool visibility)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var db = new DataClassesDataContext();

            var linkTable = (from t in db.LinkTables
                         where t.Id == id
                         select t).Single();

            linkTable.Visibility = visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Insert(LinkEntity linkEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var linkTable = new LinkTable();

            linkTable.Title = linkEntity.Title;
            linkTable.Link = linkEntity.Link;
            linkTable.OpenLink = linkEntity.OpenLink;
            linkTable.Icon = linkEntity.Icon;
            linkTable.Visibility = linkEntity.Visibility;
            linkTable.LanguageID = linkEntity.LanguageID;           
          
            db.LinkTables.InsertOnSubmit(linkTable);            
            db.SubmitChanges();

            linkTable.Priority = linkTable.Id;
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public string Update(LinkEntity linkEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var linkTable = (from t in db.LinkTables
                where t.Id == linkEntity.Id
                select t).Single();

            string oldIcon = linkTable.Icon;

            linkTable.Title = linkEntity.Title;
            linkTable.Link = linkEntity.Link;
            linkTable.OpenLink = linkEntity.OpenLink;
            linkTable.Icon = linkEntity.Icon;          
            linkTable.LanguageID = linkEntity.LanguageID;
          
            db.SubmitChanges();

            return oldIcon;
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

            var query = (from t in db.LinkTables
                where t.Id == id
                select t).Single();

            string oldIcon = query.Icon;

            db.LinkTables.DeleteOnSubmit(query);
            db.SubmitChanges();

            return oldIcon;
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

            var query = from t in db.LinkTables                        
                        select t;

            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public IEnumerable<object> SelectOne(long id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.LinkTables
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

    public string ReturnIconUrl(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.LinkTables
                         where t.Id == id
                         select t).Single();

            return query.Icon;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}