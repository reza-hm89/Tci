using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;


/// <summary>
/// Summary description for TelegramRegisterClass
/// </summary>
public class TelegramRegisterClass 
{
    public TelegramRegisterClass()
	{
       
	}

    public bool Insert(TelegramUserEntity telegramUserEntity)
    {
    

        var db = new DataClassesDataContext();
        var userEntity = new TelegramUser();
        userEntity.Id = telegramUserEntity.Id;
        userEntity.OS = telegramUserEntity.Os;
        userEntity.CustomerID = telegramUserEntity.CustomerId;
        userEntity.CustomerName = telegramUserEntity.CustomerName;
        userEntity.CustomerLastName = telegramUserEntity.CustomerLastName;
        userEntity.CustomerMobile = telegramUserEntity.CustomerMobile;
        userEntity.CustomerEmail = telegramUserEntity.CustomerEmail;
        userEntity.FavoriteContent = telegramUserEntity.FavoriteContent;
        userEntity.RegisterDate = telegramUserEntity.RegisterDate;
        userEntity.RegisterTime = telegramUserEntity.RegisterTime;
        userEntity.Active = telegramUserEntity.Active;
        userEntity.TceUser = telegramUserEntity.TceUser;

        db.TelegramUsers.InsertOnSubmit(userEntity);
        db.SubmitChanges();

        return true;
    }

    public bool Delete(long Id)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramUsers
                     where t.Id == Id
                     select t).FirstOrDefault();
        if (query != null)
        {
            db.TelegramUsers.DeleteOnSubmit(query);
            db.SubmitChanges();
            return true;
        }
        return false;
    }

    public List<TelegramUserEntity> SelectAll()
    {
        try
        {
            var telegramCustomerEntitiesList = new List<TelegramUserEntity>();

            var db = new DataClassesDataContext();
            var telegramUsers = from t in db.TelegramUsers
                               select t;

            foreach (var telegramCustomerTable in telegramUsers)
            {
                var userEntity = new TelegramUserEntity();

                userEntity.Id = telegramCustomerTable.Id;
                userEntity.Os = telegramCustomerTable.OS;
                userEntity.CustomerId = telegramCustomerTable.CustomerID;
                userEntity.CustomerName = telegramCustomerTable.CustomerName;
                userEntity.CustomerLastName = telegramCustomerTable.CustomerLastName;
                userEntity.CustomerMobile = telegramCustomerTable.CustomerMobile;
                userEntity.CustomerEmail = telegramCustomerTable.CustomerEmail;
                userEntity.FavoriteContent = telegramCustomerTable.FavoriteContent;
                userEntity.RegisterDate = telegramCustomerTable.RegisterDate;
                userEntity.RegisterTime = telegramCustomerTable.RegisterTime;

                userEntity.Active = (bool) telegramCustomerTable.Active;

                userEntity.TceUser = (bool)telegramCustomerTable.TceUser;

                telegramCustomerEntitiesList.Add(userEntity);
            }

            return telegramCustomerEntitiesList;
        }
        catch (Exception ex)
        {
            //ErrorClass.Insert(ex.Message, ex.StackTrace, GlobalVariable.Username);
            return null;
        }
    }

    public long ExistUser(string tel , string mobile)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramUsers
                     where t.CustomerID == tel && t.CustomerMobile == mobile
                     select t.Id).FirstOrDefault();
        if (query == null)
        {
            return 0;
        }
        else
        {
            return query;
        }
    }

    public bool ExistEmail(string email)
    {
        if (!string.IsNullOrEmpty(email))
        {
            var db = new DataClassesDataContext();
            var query = (from t in db.TelegramUsers
                where t.CustomerEmail == email
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
        else
        {
            return true;
        }
    }

    public bool ExistMobile(string mobile)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramUsers
                     where t.CustomerMobile == mobile
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


    public bool ExistCustomerId(string customerId)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramUsers
                     where t.CustomerID == customerId
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
}
