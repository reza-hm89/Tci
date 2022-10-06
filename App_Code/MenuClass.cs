using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI.WebControls;

/// <summary>
/// Summary description for MenuClass
/// </summary>
public class MenuClass
{

    public MenuClass()
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

            var menu = (from t in db.MenuTables
                         where t.Id == id
                         select t).Single();

            menu.Visibility = visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Insert(MenuEntity menuEntity,int addParam)
    {
        try
        {
            var db = new DataClassesDataContext();
            var menu = new MenuTable();

            menu.Name = menuEntity.Name;
            menu.Parent = menuEntity.Parent;
            menu.Link = menuEntity.Link;
            menu.OpenLink = menuEntity.OpenLink;
            menu.Priority = menuEntity.Priority;
            menu.Visibility = menuEntity.Visibility;
            menu.LanguageID = menuEntity.LanguageID;
            menu.MenuGroupID = menuEntity.MenuGroupID;

            db.MenuTables.InsertOnSubmit(menu);
            db.SubmitChanges();

            menu.Priority = menu.Id;
            db.SubmitChanges();

            if(addParam==1)
            {
                menu.Link = menu.Link + "?id=" + menu.Id;
                db.SubmitChanges();
            }
            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message,ex.StackTrace);
            return false;
        }
    }

    public void Update(MenuEntity menuEntity,int addParam)
    {
        try
        {
            var db = new DataClassesDataContext();
            var menu = (from t in db.MenuTables
                        where t.Id == menuEntity.Id
                select t).Single();

            if (menu != null)
            {
                menu.Name = menuEntity.Name;
                menu.Parent = menuEntity.Parent;
                menu.Link = menuEntity.Link;
                menu.OpenLink = menuEntity.OpenLink;               
                menu.LanguageID = menuEntity.LanguageID;
                menu.MenuGroupID = menuEntity.MenuGroupID;

                db.SubmitChanges();
            }
            if (addParam == 1)
            {
                menu.Link = menu.Link + "?id=" + menu.Id;
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

            var query = (from t in db.MenuTables
                where t.Id == id 
                select t).FirstOrDefault();

            if (query != null)
            {
                db.MenuTables.DeleteOnSubmit(query);
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

            var query = from t in db.MenuTables
                where t.Id == id
                select t;

            db.MenuTables.DeleteAllOnSubmit(query);
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

            var query = from t in db.MenuTables
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

    public IEnumerable<object> SelectChildren(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.MenuTables
                        where t.Parent == id
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

            var query = from t in db.MenuTables
                join menuGroup in db.MenuGroupTables on t.MenuGroupID equals menuGroup.Id into temp2
                from t4 in temp2.DefaultIfEmpty()                       
                join t2 in db.MenuTables on t.Parent equals t2.Id into temp
                from t3 in temp.DefaultIfEmpty()
                select
                    new {t.Id, t.Name, t.Parent, MenuGroup = t4.Name, ParentName = t3.Name, t.Link, t.Visibility};


            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
    
    public bool HaveChildren(long id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.MenuTables
                         where t.Parent == id
                         select t).FirstOrDefault();

            if (query != null)
            {
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

}

