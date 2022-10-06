using System;
using System.Collections.Generic;
using System.Data.Linq.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for UserGroupClass
/// </summary>
public class UserGroupClass
{
	public UserGroupClass()
	{
		
	}

    public long Insert(UserGroupEntity userGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var userGroup = new UserGroupTable();

            userGroup.Name = userGroupEntity.Name;
            userGroup.Visibility = userGroupEntity.Visibility;

            db.UserGroupTables.InsertOnSubmit(userGroup);
            db.SubmitChanges();

            return userGroup.Id;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return -1;
        }
    }

    public void InsertUserGroup(UserGroupAccessEntity userGroupAccessEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var userGroupAcess = new UserGroupAccessTable();

            userGroupAcess.UserID = userGroupAccessEntity.UserID;
            userGroupAcess.GroupID = userGroupAccessEntity.GroupID;

            db.UserGroupAccessTables.InsertOnSubmit(userGroupAcess);
            db.SubmitChanges();
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    public bool Update(UserGroupEntity userGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var userGroup = (from t in db.UserGroupTables
                         where t.Id == userGroupEntity.Id
                         select t).Single();

            if (userGroup != null)
            {
                userGroup.Name = userGroupEntity.Name;
             
                db.SubmitChanges();
            }

            return true;
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

            var query = (from t in db.UserGroupTables
                where t.Id == id
                select t).Single();

            if (query != null)
            {
                db.UserGroupTables.DeleteOnSubmit(query);               
                db.SubmitChanges();
            }         
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    public void DeleteUsersOfGroup(Int64 groupId)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.UserGroupAccessTables
                        where t.GroupID == groupId
                select t;

            db.UserGroupAccessTables.DeleteAllOnSubmit(query);

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
            var query = from t in db.UserGroupTables
                select new {t.Id, t.Name};

            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }    
    }

    public IEnumerable<object> SelectUserGroup(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = from t in db.UserGroupAccessTables
                from u in db.UserTables
                where t.GroupID == id && u.Id == t.UserID
                select new {u.Id, u.Username};

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
            var query = from t in db.UserGroupTables
                        join userGroupAccessTable in db.UserGroupAccessTables on t.Id equals userGroupAccessTable.GroupID into temp
                        from t2 in temp.DefaultIfEmpty()
                        join userTables in db.UserTables on t2.UserID equals userTables.Id into temp2
                        from t3 in temp2.DefaultIfEmpty()
                where t.Id == id             
                select new {t.Name, t3.Username};

            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }       
    }

   
    public IEnumerable<object> NotExitInGroup(Int64 groupId)
    {
        try
        {
            var db = new DataClassesDataContext();
            
            var query = from t in db.UserTables
                select new {t.Id, t.Username};

            var query2 = from t in db.UserGroupAccessTables
                         from u in db.UserTables
                where t.GroupID == groupId && t.UserID== u.Id
                select new {u.Id, u.Username};

            var result = query.Except(query2);


            return result;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}