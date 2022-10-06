using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
/// <summary>
/// Summary description for TelegramLotteryClass
/// </summary>
public class TelegramLotteryClass
{
    public TelegramLotteryClass()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public long Insert(TelegramLotteryEntity lotteryEntity)
    {
        var db = new DataClassesDataContext();
        var entity = new TelegramLottery
        {
            Title = lotteryEntity.Title,
            Year = lotteryEntity.Year,
            MonthNumber = lotteryEntity.MonthNumber,
            StartDate = lotteryEntity.StartDate,
            StartTime = lotteryEntity.StartTime,
            EndDate = lotteryEntity.EndDate,
            EndTime = lotteryEntity.EndTime,
            Link = lotteryEntity.Link,
            IsActive = lotteryEntity.IsActive,
            Code = lotteryEntity.Code,
        };
        db.TelegramLotteries.InsertOnSubmit(entity);
        db.SubmitChanges();

        return entity.Id;
    }

    public bool Update(TelegramLotteryEntity lotteryEntity)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramLotteries
                     where t.Id == lotteryEntity.Id
                     select t).FirstOrDefault();
        if (query != null)
        {
            query.Title = lotteryEntity.Title;
            query.Year = lotteryEntity.Year;
            query.MonthNumber = lotteryEntity.MonthNumber;
            query.StartDate = lotteryEntity.StartDate;
            query.StartTime = lotteryEntity.StartTime;
            query.EndDate = lotteryEntity.EndDate;
            query.EndTime = lotteryEntity.EndTime;
            query.Link = lotteryEntity.Link;
            query.IsActive = lotteryEntity.IsActive;
            query.Code = lotteryEntity.Code;

            db.SubmitChanges();
            return true;
        }
        return false;

    }

    public bool Delete(long lottteryId)
    {

        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramLotteries
                     where t.Id == lottteryId
                     select t).FirstOrDefault();
        if (query != null)
        {
            var lotteryUserClass = new TelegramLotteryUserRegisterClass();
            lotteryUserClass.DeleteAll(lottteryId);

            db.TelegramLotteries.DeleteOnSubmit(query);
            db.SubmitChanges();
            return true;
        }
        return false;
    }

    public TelegramLotteryEntity Select(long lotteryId)
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = (from t in db.TelegramLotteries
                         where t.Id == lotteryId
                         select t).FirstOrDefault();
            if (query != null)
            {
                var entity = new TelegramLotteryEntity()
                {
                    Id = query.Id,
                    Title = query.Title,
                    Year = query.Year,
                    MonthNumber = query.MonthNumber.Value,
                    StartDate = query.StartDate,
                    StartTime = query.StartTime,
                    EndDate = query.EndDate,
                    EndTime = query.EndTime,
                    IsActive = (bool)query.IsActive,
                    Link = query.Link,
                    Code = query.Code

                };
                return entity;
            }
            else
                return null;
        }
        catch (Exception ex)
        {
            //ErrorClass.Insert(ex.Message, ex.StackTrace, GlobalVariable.Username);
            return null;
        }
    }
    public List<TelegramLotteryEntity> SelectAll()
    {
        try
        {
            var lst = new List<TelegramLotteryEntity>();
            var db = new DataClassesDataContext();
            var query = (from t in db.TelegramLotteries
                         select t);

            foreach (var lottery in query)
            {
                var lotteryEntity = new TelegramLotteryEntity()
                {
                    Id = lottery.Id,
                    Title = lottery.Title,
                    StartDate = lottery.StartDate + " - " + lottery.StartTime,
                    EndDate = lottery.EndDate + " - " + lottery.EndTime,
                    // StartTime = lottery.StartTime,
                    // EndTime = lottery.EndTime,
                    Year = lottery.Year,
                    MonthNumber = lottery.MonthNumber.Value,
                    IsActive = lottery.IsActive != null && (bool)lottery.IsActive,
                    Link = lottery.Link,
                };
                lst.Add(lotteryEntity);
            }

            return lst;

        }
        catch (Exception ex)
        {
            //ErrorClass.Insert(ex.Message, ex.StackTrace, GlobalVariable.Username);
            return null;
        }
    }

    public long ExistLotteryByYearMonth(int year, int month)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramLotteries
                     where t.Year == year && t.MonthNumber == month
                     select t.Id).FirstOrDefault();

        return query;
    }

    public long ExistLotteryByCode(string code)
    {
        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramLotteries
                     where t.Code == code
                     select t.Id).FirstOrDefault();

        return query;
    }
    public long IsActiveLottery(string code)
    {
        var dateBll = new BLL.DateAndTime();
        string nowDate = dateBll.PersianDate(DateTime.Now);
        nowDate = nowDate.Replace(" ", "");
        string nowTime = DateTime.Now.ToString("HH:mm");

        var db = new DataClassesDataContext();
        var query = (from t in db.TelegramLotteries
                     where t.IsActive == true && t.Code == code

                     && (((string.Compare(nowDate, t.StartDate) > 0)
                     && (string.Compare(nowDate, t.EndDate) < 0))
                     || ((string.Compare(t.StartDate, nowDate) == 0) && (string.Compare(nowTime, t.StartTime) >= 0))
                     || ((string.Compare(t.EndDate, nowDate) == 0) && (string.Compare(nowTime, t.EndTime) <= 0))
                     )

                     select t.Id).FirstOrDefault();
        return query;
    }


    public static DateTime GetDateTime(string strDate, string strTime)
    {
        DateTime dt;
        int yy = Convert.ToInt32(strDate.Substring(0, 4));
        int mm = Convert.ToInt32(strDate.Substring(5, 2));
        string dd1 = strDate.Substring(8, 2);
        int dd = Convert.ToInt32(strDate.Substring(8, 2));

        TimeSpan ts = GetTimeFromString(strTime);

        dt = new DateTime(yy, mm, dd, ts.Hours, ts.Minutes, 0);

        return dt;
    }

    public static TimeSpan GetTimeFromString(string strTime)
    {
        int hh = Convert.ToInt32(strTime.Substring(0, 2));
        string mins1 = strTime.Substring(3, 2);
        int mins = Convert.ToInt32(strTime.Substring(3, 2));
        return new TimeSpan(hh, mins, 0);
    }

}