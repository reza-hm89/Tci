using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ModuleClass
/// </summary>
public class ModuleClass
{
	public ModuleClass()
	{		
	}

    public bool Insert(ModuleEntity moduleEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var module = new ModuleTable();

            module.Name = moduleEntity.Name;
            module.MenuContent = moduleEntity.MenuContent;
            module.MenuScript = moduleEntity.MenuScript; 

            db.ModuleTables.InsertOnSubmit(module);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public void Update(ModuleEntity moduleEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var module = (from t in db.ModuleTables
                           where t.Id == moduleEntity.Id
                           select t).Single();

            if (module != null)
            {
                module.Name = moduleEntity.Name;
                module.MenuContent = moduleEntity.MenuContent;
                module.MenuScript = moduleEntity.MenuScript; 
              
                db.SubmitChanges();
            }
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    public void DeleteOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.ModuleTables
                         where t.Id == id
                         select t).Single();

            if (query != null)
            {
                db.ModuleTables.DeleteOnSubmit(query);
                db.SubmitChanges();
            }

        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    public void DeleteChildren(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.ModuleTables
                        where t.Id == id
                        select t;

            db.ModuleTables.DeleteAllOnSubmit(query);
            db.SubmitChanges();
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    public IEnumerable<object> SelectOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.ModuleTables
                where t.Id == id
                select new {t.Id, t.Name, t.MenuContent, t.MenuScript};

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

            var query = from t in db.ModuleTables
                        orderby t.Id descending 
                select new {t.Id, t.Name, t.MenuContent};

            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}