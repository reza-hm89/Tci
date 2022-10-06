using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for MessageClassSite
/// </summary>
public class MessageClassSite
{
    public MessageClassSite()
    {
        //
        // TODO: Add constructor logic here
        //


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
            message.UserGroupID = messageEntity.GroupID;
            // message.UnitID = messageEntity.UnitID;

            message.Family = messageEntity.Family;
            message.Body2 = messageEntity.Body2;
            message.Tel = messageEntity.Tel;
            message.FileUrl = messageEntity.FileUrl;
            message.Category = messageEntity.Category;
            message.TrackingCode = messageEntity.TrackingCode;

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

    public MessageEntity SelectOne(string code)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.MessageTables
                        where t.TrackingCode == code
                        select t).FirstOrDefault();

           
            if (query != null)
            {
                var messageEntity = new MessageEntity()
                {
                    Id = query.Id,
					Body = query.Body,
                    Body2 = query.Body2,
                    Name = query.Name,
                    Family = query.Family,
                    Reply = query.Reply
                };
                return messageEntity;
            }
            else
            {
                return null;
            }
           
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}