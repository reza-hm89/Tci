using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;

/// <summary>
/// Summary description for UserGroupWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class UserGroupWs : System.Web.Services.WebService {

    [WebMethod (EnableSession = true)]
    public string GetData()
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var userGroup = new UserGroupClass();
            var query = userGroup.SelectAll();

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }

    }

   [WebMethod (EnableSession = true)]
    public string LoadUsers()
    {
        try
        {
            var user = new UserClass();
            var query = user.SelectAll();

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }

    }

    [WebMethod (EnableSession = true)]
    public string LoadUsersGroup(Int64 id)
    {
        try
        {
            var userGroup = new UserGroupClass();
            var query = userGroup.SelectUserGroup(id);

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    [WebMethod (EnableSession = true)]
    public void Insert(UserGroupEntity userGroupEntity, List<string> userId )
    {
        if (GlobalFunction.CheckModulePermission("insert") == false)
        {
            return;
        }

        try
        {
            var userGroup = new UserGroupClass();

            long userGroupId = userGroup.Insert(userGroupEntity);

            if (userGroupId != -1)
            {
                foreach (string t in userId)
                {
                    var userGroupAccess = new UserGroupAccessEntity();

                    userGroupAccess.UserID = Convert.ToInt64(t);
                    userGroupAccess.GroupID = userGroupId;

                    userGroup.InsertUserGroup(userGroupAccess);
                }
            }
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    [WebMethod (EnableSession = true)]
    public string BindRecordToEdit(Int64 id)
    {
        if (GlobalFunction.CheckModulePermission("show") == false)
        {
            return null;
        }

        try
        {
            var userGroup = new UserGroupClass();

            var query = userGroup.SelectOne(id);

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);

        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    [WebMethod (EnableSession = true)]
    public bool Update(UserGroupEntity userGroupEntity, List<string> userId)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var userGroup = new UserGroupClass();

            if (userGroup.Update(userGroupEntity))
            {
                userGroup.DeleteUsersOfGroup(userGroupEntity.Id);

                foreach (string t in userId)
                {
                    var userGroupAccess = new UserGroupAccessEntity();

                    userGroupAccess.UserID = Convert.ToInt64(t);
                    userGroupAccess.GroupID = userGroupEntity.Id;

                    userGroup.InsertUserGroup(userGroupAccess);
                }
            }

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    [WebMethod (EnableSession = true)]
    public void DeleteRecord(int id)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        try
        {
            var userGroup = new UserGroupClass();

            userGroup.DeleteOne(id);

        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    [WebMethod (EnableSession = true)]
    public void DeleteMultiRecord(List<string> idList)
    {
        if (GlobalFunction.CheckModulePermission("delete") == false)
        {
            return;
        }

        var userGroup = new UserGroupClass();

        for (int i = 0; i < idList.Count; i++)
        {
            userGroup.DeleteOne(Convert.ToInt64(idList[i]));         
        }
    }

    [WebMethod (EnableSession = true)]
    public string NotExitInGroup(Int64 groupId)
    {
        try
        {
            var userGroup = new UserGroupClass();

            var query = userGroup.NotExitInGroup(groupId);

            var jsSettings = new JsonSerializerSettings
            {
                ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
                PreserveReferencesHandling = PreserveReferencesHandling.None
            };

            return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
    
}
