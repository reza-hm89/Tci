using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MenuGroupClass
/// </summary>
public class MenuGroupClass
{
    public MenuGroupClass()
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

            var menuGroup = (from t in db.MenuGroupTables
                         where t.Id == id
                         select t).Single();

            menuGroup.Visibility = visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Insert(MenuGroupEntity menuGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var menuGroup = new MenuGroupTable();

            menuGroup.Name = menuGroupEntity.Name;
            menuGroup.Visibility = menuGroupEntity.Visibility;
            menuGroup.LanguageID = menuGroupEntity.LanguageID;

            db.MenuGroupTables.InsertOnSubmit(menuGroup);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Update(MenuGroupEntity menuGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var menuGroup = (from t in db.MenuGroupTables
                                where t.Id == menuGroupEntity.Id
                                select t).Single();

            if (menuGroup != null)
            {
                menuGroup.Name = menuGroupEntity.Name;
                menuGroup.LanguageID = menuGroupEntity.LanguageID;

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

            var query = (from t in db.MenuGroupTables
                         where t.Id == id
                         select t).Single();

            db.MenuGroupTables.DeleteOnSubmit(query);
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

            var query = from t in db.MenuGroupTables
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

            var query = from t in db.MenuGroupTables
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