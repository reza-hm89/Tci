using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;
using System.Web.Services;
using System.Web.UI;
using Newtonsoft.Json;

/// <summary>
/// Summary description for Permission
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
[System.Web.Script.Services.ScriptService]
public class PermissionWs : System.Web.Services.WebService
{


    [WebMethod(EnableSession = true)]
    public void Insert(int moduleId, long userId, long groupId,
        bool insert, bool update, bool delete, bool show, bool selected)
    {

        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return;
        }

        try
        {
            var db = new DataClassesDataContext();
            object query = null;

            if (userId > 0)
            {
                query = (from t in db.PermissionTables
                    where t.UserID == userId && t.ModuleID == moduleId
                    select t).FirstOrDefault();
            }

            if (groupId > 0)
            {
                query = (from t in db.PermissionTables
                    where t.GroupID == groupId && t.ModuleID == moduleId
                    select t).FirstOrDefault();
            }

            if (query != null)
            {
                Update(moduleId, userId, groupId, insert, update, delete, show, selected);
            }
            else
            {
                var per = new PermissionTable();

                per.ModuleID = moduleId;

                if (selected) // true
                {
                    per.UserID = userId;
                }
                else // false
                {
                    per.GroupID = groupId;
                }

                per.Insert = insert;
                per.Update = update;
                per.Delete = delete;
                per.Show = show;

                db.PermissionTables.InsertOnSubmit(per);
                db.SubmitChanges();
            }

        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    [WebMethod(EnableSession = true)]
    public void Update(int moduleId, Int64 userId, Int64 groupId, bool insert, bool update, bool delete, bool show,
        bool selected)
    {

        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return;
        }

        try
        {
            var db = new DataClassesDataContext();

            if (userId > 0)
            {
                var query = (from t in db.PermissionTables
                    where t.UserID == userId && t.ModuleID == moduleId
                    select t).FirstOrDefault();

                if (query != null)
                {
                    query.ModuleID = moduleId;

                    if (selected) // true
                    {
                        query.UserID = userId;
                    }
                    else // false
                    {
                        query.GroupID = groupId;
                    }

                    query.Insert = insert;
                    query.Update = update;
                    query.Delete = delete;
                    query.Show = show;

                    db.SubmitChanges();
                }

                else
                {
                    Insert(moduleId, userId, groupId, insert, update, delete, show, selected);
                }
            }

            if (groupId > 0)
            {
                var query = (from t in db.PermissionTables
                    where t.GroupID == groupId && t.ModuleID == moduleId
                    select t).FirstOrDefault();

                if (query != null)
                {
                    query.ModuleID = moduleId;

                    if (selected) // true
                    {
                        query.UserID = userId;
                    }
                    else // false
                    {
                        query.GroupID = groupId;
                    }

                    query.Insert = insert;
                    query.Update = update;
                    query.Delete = delete;
                    query.Show = show;

                    db.SubmitChanges();
                }

                else
                {
                    Insert(moduleId, userId, groupId, insert, update, delete, show, selected);
                }
            }

        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    [WebMethod(EnableSession = true)]
    public string GetData(Int64 groupId, bool group_user)
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var db = new DataClassesDataContext();


            if (group_user == false)
            {
                var query = from t in db.PermissionTables
                    where t.GroupID == groupId
                    select new {t.Id, t.UserID, t.GroupID, t.Show, t.Insert, t.Update, t.Delete, t.ModuleID};

                var jsSettings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.None
                };

                return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
            }
            else
            {
                var query = from t in db.PermissionTables
                    where t.UserID == groupId
                    select new {t.Id, t.UserID, t.GroupID, t.Show, t.Insert, t.Update, t.Delete, t.ModuleID};

                var jsSettings = new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                    PreserveReferencesHandling = PreserveReferencesHandling.None
                };

                return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
            }
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    [WebMethod(EnableSession = true)]
    public string CheckPermission()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.PermissionTables
                where t.UserID == Convert.ToInt64(Session["UserId"])
                select new {t.ModuleID, t.Show, t.Insert, t.Update, t.Delete};

            var query2 = from t in db.PermissionTables
                join userGroupTables in db.UserGroupTables on t.GroupID equals userGroupTables.Id into temp
                from userGroupTables2 in temp.DefaultIfEmpty()
                join userGroupAccessTables in db.UserGroupAccessTables on userGroupTables2.Id equals
                userGroupAccessTables.GroupID into temp2
                from userGroupAccessTables2 in temp2.DefaultIfEmpty()
                where userGroupAccessTables2.UserID == Convert.ToInt64(Session["UserId"])
                select new {t.ModuleID, t.Show, t.Insert, t.Update, t.Delete};

            var result = query.Union(query2).GroupBy(arg => arg.ModuleID);

            List<Permissions> perList = new List<Permissions>();

            bool show = false, insert = false, update = false, delete = false;

            long userId = -1;

            foreach (var item in result)
            {
                show = false;
                insert = false;
                update = false;
                delete = false;

                foreach (var t in item)
                {
                    userId = Convert.ToInt64(Session["UserId"]);
                    show |= t.Show;
                    insert |= t.Insert;
                    update |= t.Update;
                    delete |= t.Delete;
                }

                Permissions per = new Permissions();

                per.UserId = userId;
                per.ModuleId = item.Key;
                per.Show = show;
                per.Insert = insert;
                per.Update = update;
                per.Delete = delete;

                perList.Add(per);
            }

            //GlobalVariable.PermissionList = perList;

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(perList, Formatting.None, jsSettings);

        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    //[WebMethod(EnableSession = true)]
    //public bool CheckModulePermission(int id)
    //{
    //    //try
    //    //{
    //    //    if (Session["UserId"]!=null)
    //    //    {
    //    //        for (int i = 0; i < GlobalVariable.PermissionList.Count; i++)
    //    //        {
    //    //            if (GlobalVariable.PermissionList[i].ModuleId == id && GlobalVariable.PermissionList[i].UserId == (long)Session["UserId"])
    //    //            {
    //    //                GlobalVariable.ModulePermission = GlobalVariable.PermissionList[i];

    //    //                return true;
    //    //            }
    //    //        }
    //    //    }

    //    //    return false;

    //    //}
    //    //catch (Exception ex)
    //    //{
    //    //    ErrorClass.Insert(ex.Message, ex.StackTrace);
    //    //    return false;
    //    //}
    //}
}

