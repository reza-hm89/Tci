using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PageClass
/// </summary>
public class PageClass
{
	public PageClass()
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

            var page = (from t in db.PageTables
                         where t.Id == id
                         select t).Single();

            page.Visibility = visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public long Insert(PageEntity pageEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var page = new PageTable();

            page.FileName = pageEntity.FileName;
            page.Title = pageEntity.Title;
            page.Body = pageEntity.Body;
            page.Keywords = pageEntity.Keywords;
            page.Image = pageEntity.Image;
            page.Template = pageEntity.Template;
            page.Css = pageEntity.Css;
            page.Js = pageEntity.Js;
            page.Visibility = pageEntity.Visibility;
            page.LanguageID = pageEntity.LanguageID;

            db.PageTables.InsertOnSubmit(page);
            db.SubmitChanges();

            return page.Id;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return -1;
        }
    }

    public string Update(PageEntity pageEntity,out string  oldUrl)
    {
        try
        {
            var db = new DataClassesDataContext();
            var page = (from t in db.PageTables
                where t.Id == pageEntity.Id
                select t).Single();

            string oldFileName = page.FileName;
            oldUrl = page.Image;

            page.FileName = pageEntity.FileName;
            page.Title = pageEntity.Title;
            page.Body = pageEntity.Body;
            page.Keywords = pageEntity.Keywords;
            page.Image = pageEntity.Image;
            page.Template = pageEntity.Template;
            page.Css = pageEntity.Css;
            page.Js = pageEntity.Js;           
            page.LanguageID = pageEntity.LanguageID;

            db.SubmitChanges();
          
            return oldFileName;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);

            oldUrl = "";
            return null;
        }
    }

    public string DeleteOne(Int64 id, out string imageUrl, out string languageCode)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PageTables
                         where t.Id == id
                         select t).Single();

            if (query != null)
            {
                var query1 = (from t in db.LanguageTables
                             where t.Id == query.LanguageID
                              select t).Single();

                imageUrl = query.Image;
                languageCode = query1.Code;

                db.PageTables.DeleteOnSubmit(query);
                db.SubmitChanges();

                return query.FileName;
            }

            imageUrl = "";
            languageCode = "";
            return null;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            imageUrl = "";
            languageCode = "";
            return "";
        }
    }

    public IEnumerable<object> SelectAll()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.PageTables
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

            var query = from t in db.PageTables
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

    public string ReturnUrl(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PageTables
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

}