using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MenuClassSite
/// </summary>
public class MenuClassSite
{
    public MenuClassSite()
    {
       
    }

    public List<MenuEntity> SelectAll()
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
                            t;

            var lst = new List<MenuEntity>();
            foreach(var menu in query)
            {
                var menuEntity = new MenuEntity()
                {
                    Id = menu.Id,
                    LanguageID = (long)menu.LanguageID,
                    Link = menu.Link,
                    MenuGroupID = (long)menu.MenuGroupID,
                    Name = menu.Name,
                    OpenLink = menu.OpenLink,
                    Parent = menu.Parent,
                    Priority = (long)menu.Priority,
                    Visibility = menu.Visibility
                };
                lst.Add(menuEntity);
            }
            return lst;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public List<MenuEntity> SelectAllByParent(long parentId)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.MenuTables
                        join menuGroup in db.MenuGroupTables on t.MenuGroupID equals menuGroup.Id into temp2
                        from t4 in temp2.DefaultIfEmpty()
                        join t2 in db.MenuTables on t.Parent equals t2.Id into temp
                        from t3 in temp.DefaultIfEmpty()
                        where t.Parent == parentId                        
                        select t;

            var lst = new List<MenuEntity>();
            foreach (var menu in query)
            {
                var menuEntity = new MenuEntity()
                {
                    Id = menu.Id,
                    LanguageID = (long)menu.LanguageID,
                    Link = menu.Link,
                    MenuGroupID = (long)menu.MenuGroupID,
                    Name = menu.Name,
                    OpenLink = menu.OpenLink,
                    Parent = menu.Parent,
                    Priority = (long)menu.Priority,
                    Visibility = menu.Visibility
                };
                lst.Add(menuEntity);
            }
            return lst;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public List<MenuEntity> SelectAllByGroup(long groupId)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.MenuTables
                        join menuGroup in db.MenuGroupTables on t.MenuGroupID equals menuGroup.Id into temp2
                        from t4 in temp2.DefaultIfEmpty()
                        join t2 in db.MenuTables on t.Parent equals t2.Id into temp
                        from t3 in temp.DefaultIfEmpty()
                        where  t.MenuGroupID == groupId
                        select t;

            var lst = new List<MenuEntity>();
            foreach (var menu in query)
            {
                var menuEntity = new MenuEntity()
                {
                    Id = menu.Id,
                    LanguageID = (long)menu.LanguageID,
                    Link = menu.Link,
                    MenuGroupID = (long)menu.MenuGroupID,
                    Name = menu.Name,
                    OpenLink = menu.OpenLink,
                    Parent = menu.Parent,
                    Priority = (long)menu.Priority,
                    Visibility = menu.Visibility
                };
                lst.Add(menuEntity);
            }
            return lst;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}