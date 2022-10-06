using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MessageClass
/// </summary>
public class MessageClass
{
    public MessageClass()
    {
    }

    public bool Insert(MessageEntity messageEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var message = new MessageTable();

            message.Name = messageEntity.Name;
            message.Mobile = messageEntity.Mobile;
            message.Email = messageEntity.Email;
            message.Title = messageEntity.Title;
            message.Body = messageEntity.Body;
            message.SendDate = messageEntity.SendDate;
            message.UserIp = messageEntity.UserIp;
            message.UserID = messageEntity.UserID;
            message.Category = messageEntity.Category;
            message.UserGroupID = messageEntity.GroupID; // for read/unread

            db.MessageTables.InsertOnSubmit(message);
            db.SubmitChanges();

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

            var query = (from t in db.MessageTables
                         where t.Id == id
                         select t).Single();

            if (query != null)
            {
                db.MessageTables.DeleteOnSubmit(query);
                db.SubmitChanges();
            }

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

            var query = from t in db.MessageTables
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

    public IEnumerable<object> SelectAll()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.MessageTables
                        orderby t.Id descending
                        select
                        new
                        {
                            t.Id,
                            t.Name,
                            t.Family,
                            t.Mobile,
                            t.Email,
                            t.Title,
                            t.Body,
                            SendDate =
                            FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.SendDate.Value).ToString("yy/mm/dd"),
                            t.UserIp,
                            t.UserID,
                            t.Category,
                            t.UserGroupID
                        };


            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public bool ExistEmail(string email)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.MessageTables
                         where t.Email == email
                         select t).FirstOrDefault();

            if (query == null)
            {
                return true;
            }
            else
            {
                return false;
            }

        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }


    public bool InsertReply(long id, string reply)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.MessageTables
                         where t.Id == id
                         select t).FirstOrDefault();

            if (query != null)
                query.Reply = reply;
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool ReadMessage(long id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.MessageTables
                         where t.Id == id
                         select t).SingleOrDefault();

            if (query != null)
                query.UserGroupID = 1;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }
}