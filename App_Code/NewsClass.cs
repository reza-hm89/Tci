using System;
using System.Collections.Generic;
using System.Data.Linq.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for NewsClass
/// </summary>
public class NewsClass
{
    public NewsClass()
    {

    }

    public bool Insert(NewsEntity newsEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var news = new NewsTable();

            news.RoTitr = newsEntity.RoTitr;
            news.Titr = newsEntity.Titr;
            news.ZirTitr = newsEntity.ZirTitr;
            news.Body = newsEntity.Body;
            news.Image = newsEntity.Image;
            news.Keywords = newsEntity.Keywords;
            news.NewsGroupID = newsEntity.NewsGroupID;
            news.PublishStatus = newsEntity.PublishStatus;
            news.ShowInSlide = newsEntity.ShowInSlide;
            news.Special = newsEntity.Special;
            news.Comment = newsEntity.Comment;
            news.Rate = newsEntity.Rate;
            news.PublishDate = newsEntity.PublishDate;
            news.PublishTime = newsEntity.PublishTime;
            news.UserID = newsEntity.UserID;
            news.LanguageID = newsEntity.LanguageID;
            news.NumberOfView = newsEntity.NumberOfView;

            db.NewsTables.InsertOnSubmit(news);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public string Update(NewsEntity newsEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var news = (from t in db.NewsTables
                        where t.Id == newsEntity.Id
                        select t).Single();

            string oldUrl = news.Image;


            news.RoTitr = newsEntity.RoTitr;
            news.Titr = newsEntity.Titr;
            news.ZirTitr = newsEntity.ZirTitr;
            news.Body = newsEntity.Body;
            news.Image = newsEntity.Image;
            news.Keywords = newsEntity.Keywords;
            news.NewsGroupID = newsEntity.NewsGroupID;
            news.PublishStatus = newsEntity.PublishStatus;
            news.ShowInSlide = newsEntity.ShowInSlide;
            news.Special = newsEntity.Special;
            news.Comment = newsEntity.Comment;
            news.Rate = newsEntity.Rate;
            news.UserID = newsEntity.UserID;
            news.LanguageID = newsEntity.LanguageID;

            db.SubmitChanges();

            return oldUrl;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public string Delete(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.NewsTables
                         where t.Id == id
                         select t).Single();


            string oldUrl = query.Image;

            db.NewsTables.DeleteOnSubmit(query);
            db.SubmitChanges();

            return oldUrl;

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

            var query = from t in db.NewsTables
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

    public NewsEntity SelectOneForWeb(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.NewsTables
                         join user in db.UserTables on t.UserID equals user.Id into temp1
                         from user2 in temp1.DefaultIfEmpty()
                         join g in db.NewsGroupTables on t.NewsGroupID equals g.Id into temp2
                         from g2 in temp2.DefaultIfEmpty()
                         where t.Id == id
                         select new { newsId = t.Id, t.PublishStatus, PublishDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.PublishDate.Value.Date).ToString("yy/mm/dd"), t.PublishTime, t.Titr, t.Body, t.Image, t.RoTitr, user2.Family, groupName = g2.Name }).FirstOrDefault();
            var newsEntity = new NewsEntity()
            {
                Id = query.newsId,
                PublishDate = Convert.ToDateTime(query.PublishDate),
                PublishTime = (TimeSpan)query.PublishTime,
                Titr = query.Titr,
                Body = query.Body,
                Image = query.Image,
                UserName = query.Family,
                RoTitr = query.RoTitr,
                NewsGroupName = query.groupName
            };
            return newsEntity;
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

            var query = from t in db.NewsTables
                         join grp in db.NewsGroupTables on t.NewsGroupID equals grp.Id
                         orderby t.Id descending
                         select new
                         {
                             t.Id,
                             t.PublishStatus,
                             PublishDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.PublishDate.Value).ToString("yy/mm/dd"),
                             t.PublishTime,
                             t.Titr,
                             GroupName = grp.Name,
                             t.Image
                         };

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public IEnumerable<object> Search(string titr, string pubDate, string author)
    {
        //try
        //{
        //    var db = new DataClassesDataContext();

        //    var query = from t in db.NewsTables
        //                join user in db.UserTables on t.UserID equals user.Id
        //                where
        //                    SqlMethods.Like(t.Titr, "%" + titr + "%") &&
        //                    SqlMethods.Like(t.PublishDate, "%" + pubDate + "%")
        //                select new { t.NewsID, t.PublishStatus, t.PublishDate, t.PublishTime, t.Titr, user.Family };

        //    return query;
        //}
        //catch (Exception ex)
        //{
        //   ErrorClass.Insert(ex.Message, ex.StackTrace);

        //    return null;
        //}
        return null;
    }

    public IEnumerable<object> SearchPublication(int status)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.NewsTables
                        join user in db.UserTables on t.UserID equals user.Id
                        where
                            t.PublishStatus == status
                        select new { t.Id, t.PublishStatus, t.PublishDate, t.PublishTime, t.Titr, user.Family };

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);

            return null;
        }
    }

    public IEnumerable<object> SearchUser(long userId)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.NewsTables
                        join u in db.UserTables on t.UserID equals userId
                        where u.Id == userId

                        select new { t.Id, t.PublishStatus, t.PublishDate, t.PublishTime, t.Titr, u.Family };

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);

            return null;
        }
    }

    public string ReturnUrl(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.NewsTables
                         where t.Id == id
                         select t).Single();

            return query.Image;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public List<NewsEntity> SelectAllForWeb()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.NewsTables
                        join user in db.UserTables on t.UserID equals user.Id into temp1
                        from user2 in temp1.DefaultIfEmpty()
                        where t.PublishStatus == 1
                        select new { newsId = t.Id, t.PublishStatus, PublishDate = t.PublishDate.Value, t.PublishTime, t.Titr, t.Body, user2.Family, t.Image, t.RoTitr };

            var newsList = new List<NewsEntity>();
            foreach (var news in query)
            {
                var newsEntity = new NewsEntity()
                {
                    Id = news.newsId,
                    PublishDate = news.PublishDate,
                    PublishTime = (TimeSpan)news.PublishTime,
                    Titr = news.Titr,
                    Body = news.Body,
                    Image = news.Image,
                    UserName = news.Family,
                    RoTitr = news.RoTitr
                };
                newsList.Add(newsEntity);
            }

            return newsList;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}