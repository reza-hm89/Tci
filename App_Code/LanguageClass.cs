using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for LanguageClass
/// </summary>
public class LanguageClass
{
	public LanguageClass()
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

            var language = (from t in db.LanguageTables
                         where t.Id == id
                         select t).Single();

            language.Visibility = visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Insert(LanguageEntity languageEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var language = new LanguageTable();

            language.Name = languageEntity.Name;
            language.Icon = languageEntity.Icon;
            language.Link = languageEntity.Link;
            language.OpenLink = languageEntity.OpenLink;
            language.Visibility = languageEntity.Visibility;
            language.Code = languageEntity.Code;

            db.LanguageTables.InsertOnSubmit(language);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public string Update(LanguageEntity languageEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var language = (from t in db.LanguageTables
                where t.Id == languageEntity.Id
                select t).Single();

            string oldIcon = language.Icon;

            language.Name = languageEntity.Name;
            language.Icon = languageEntity.Icon;
            language.Link = languageEntity.Link;
            language.OpenLink = languageEntity.OpenLink;
            language.Code = languageEntity.Code;

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

            var query = (from t in db.LanguageTables
                where t.Id == id
                select t).Single();

            string oldIcon = query.Icon;

            db.LanguageTables.DeleteOnSubmit(query);
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

            var query = from t in db.LanguageTables
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

            var query = from t in db.LanguageTables
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

            var query = (from t in db.LanguageTables
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