using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;



/// <summary>
/// Summary description for TelegramLotteryUserClass
/// </summary>
public class TelegramLotteryUserRegisterClass
{
    public TelegramLotteryUserRegisterClass()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public bool Insert(TelegramLotteryUserEntity telegramLotteryUserEntity)
    {
        var db = new DataClassesDataContext();
        var userEntity = new TelegramLotteryUser();
        userEntity.UserId = telegramLotteryUserEntity.UserId;
        userEntity.LotteryId = telegramLotteryUserEntity.LotteryId;
        userEntity.RegisterDate = telegramLotteryUserEntity.RegisterDate;
        userEntity.RegisterTime = telegramLotteryUserEntity.RegisterTime;
        userEntity.Winner = telegramLotteryUserEntity.Winner;

        db.TelegramLotteryUsers.InsertOnSubmit(userEntity);
        db.SubmitChanges();
        return true;

    }

    public bool Delete(long Id)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramLotteryUsers
            where t.Id == Id
            select t).FirstOrDefault();
        if (query != null)
        {
            db.TelegramLotteryUsers.DeleteOnSubmit(query);
            db.SubmitChanges();
            return true;
        }
        return false;
    }


    public bool DeleteAll(long lottteryId)
    {

        var db = new DataClassesDataContext();
        var query = from t in db.TelegramLotteryUsers
                     where t.LotteryId == lottteryId
                     select t;
        if (query != null)
        {
            db.TelegramLotteryUsers.DeleteAllOnSubmit(query);
            db.SubmitChanges();
            return true;
        }
        return false;
    }


    public List<TelegramLotteryUserEntity> SelctAll()
    {
        try
        {
            var userList = new List<TelegramLotteryUserEntity>();
            var db = new DataClassesDataContext();
            var query = from t in db.TelegramLotteryUsers
                        join u in db.TelegramUsers on t.UserId equals u.Id               
                        select new { t , u.CustomerName , u.CustomerLastName, u.CustomerID, u.CustomerMobile};

            foreach(var LotteryUser in query )
            {
                var userEntity = new TelegramLotteryUserEntity();
                userEntity.Id = LotteryUser.t.Id;
                userEntity.UserId = LotteryUser.t.UserId;
                userEntity.LotteryId = LotteryUser.t.LotteryId;
                userEntity.RegisterDate = LotteryUser.t.RegisterDate;
                userEntity.RegisterTime = LotteryUser.t.RegisterTime;
                userEntity.Winner = (bool)LotteryUser.t.Winner ;

                userEntity.CustomerName = LotteryUser.CustomerName;
                userEntity.CustomerLastName = LotteryUser.CustomerLastName;
                userEntity.CustomerId = LotteryUser.CustomerID;
                userEntity.CustomerMobile = LotteryUser.CustomerMobile;

                userList.Add(userEntity);

            }
            return userList;


        }
        catch (Exception ex)
        {
            //ErrorClass.Insert(ex.Message, ex.StackTrace, GlobalVariable.Username);
            return null;
        }
    }

    public bool SetWinner()
    {

        return true;
    }
    public List<TelegramLotteryUserEntity> SelctAllByLotteryId(long lotteryId)
    {
        try
        {
            var userList = new List<TelegramLotteryUserEntity>();
            var db = new DataClassesDataContext();
            var query = from t in db.TelegramLotteryUsers
                        where t.LotteryId== lotteryId
                        join u in db.TelegramUsers on t.UserId equals u.Id
                        select new { t, u.CustomerName, u.CustomerLastName, u.CustomerID, u.CustomerMobile };

            foreach (var LotteryUser in query)
            {
                var userEntity = new TelegramLotteryUserEntity();
                userEntity.Id = LotteryUser.t.Id;
                userEntity.UserId = LotteryUser.t.UserId;
                userEntity.LotteryId = LotteryUser.t.LotteryId;
                userEntity.RegisterDate = LotteryUser.t.RegisterDate;
                userEntity.RegisterTime = LotteryUser.t.RegisterTime;
                userEntity.Winner = (bool)LotteryUser.t.Winner;

                userEntity.CustomerName = LotteryUser.CustomerName;
                userEntity.CustomerLastName = LotteryUser.CustomerLastName;
                userEntity.CustomerId = LotteryUser.CustomerID;
                userEntity.CustomerMobile = LotteryUser.CustomerMobile;

                userList.Add(userEntity);

            }
            return userList;


        }
        catch (Exception ex)
        {
            //ErrorClass.Insert(ex.Message, ex.StackTrace, GlobalVariable.Username);
            return null;
        }
    }

    public long ExistLotteryUser(long lotteryId, long userId, int year , int month)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramLotteryUsers
                     join u in db.TelegramLotteries on t.LotteryId equals u.Id 
                     where t.LotteryId == lotteryId && t.UserId == userId &&
                     u.Year== year && u.MonthNumber==month
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
}