using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for NewsClassSite
/// </summary>
public class NewsClassSite
{
    public NewsClassSite()
    {

    }

    public NewsEntity SelectOneForWeb(long id)
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
                         select new { newsId = t.Id, t.PublishStatus, PublishDate = t.PublishDate.Value.Date, t.PublishTime, t.Titr, t.Body, t.Image, t.RoTitr, t.ZirTitr, t.NumberOfView, user2.Family, groupName = g2.Name }).FirstOrDefault();

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
                NewsGroupName = query.groupName,
                ZirTitr = query.ZirTitr,
                NumberOfView = (long)query.NumberOfView
            };
            return newsEntity;
        }
        catch (Exception ex)
        {

            return null;
        }
    }

    public void UpdateViewNumber(long id, long viewNumber)
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = (from t in db.NewsTables
                         where t.Id == id
                         select t).Single();


            if (query != null)
            {
                query.NumberOfView = viewNumber;
                db.SubmitChanges();
            }
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
         
        }
    }
    public List<NewsEntity> SelectLastNewsForWeb()
    {
        try
        {

            var db = new DataClassesDataContext();

            var query = (from t in db.NewsTables
                         where t.PublishStatus == 1 && t.ShowInSlide == false && t.NewsGroupID!=10
                         orderby t.Id descending
                         select new
                         {
                             newsId = t.Id,
                             t.PublishStatus,
                             PublishDate = t.PublishDate.Value,
                             t.PublishTime,
                             t.Titr,
                             t.Body,
                             t.Image,
                             t.RoTitr,
                             t.ZirTitr

                         }
                         ).Take(3);

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
                    RoTitr = news.RoTitr,
                    ZirTitr = news.ZirTitr
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

    public List<NewsEntity> SelectSliderNewsForWeb()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.NewsTables
                         where t.PublishStatus == 1 && (t.ShowInSlide == true || t.Special==true) && t.NewsGroupID != 10
                         orderby t.Id descending
                         select new
                         {
                             newsId = t.Id,
                             t.PublishStatus,
                             PublishDate = t.PublishDate.Value,
                             t.PublishTime,
                             t.Titr,
                             t.Body,
                             t.Image,
                             t.RoTitr,
                             t.ZirTitr

                         }
                        ).Take(6);

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
                    RoTitr = news.RoTitr,
                    ZirTitr = news.ZirTitr
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


    public List<NewsEntity> SelectAllLastNewsForWeb()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.NewsTables                       
                         where t.PublishStatus == 1 && t.NewsGroupID != 10
                         orderby t.Id descending
                         select new
                         {
                             newsId = t.Id,
                             t.PublishStatus,
                             PublishDate = t.PublishDate.Value,
                             t.PublishTime,
                             t.Titr,
                             t.Body,                          
                             t.Image,
                             t.RoTitr,
                             t.ZirTitr

                         }
                         ).Take(8);

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
                    RoTitr = news.RoTitr,
                    ZirTitr = news.ZirTitr
                };
                newsList.Add(newsEntity);
            }

            return newsList;
        }
        catch (Exception ex)
        {

            return null;
        }
    }

    public List<NewsEntity> SelectAllLastNewsForWeb2()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.NewsTables
                         where t.PublishStatus == 1 && t.NewsGroupID != 10
                         orderby t.Id descending
                         select new
                         {
                             newsId = t.Id,
                             t.PublishStatus,
                             PublishDate = t.PublishDate.Value,
                             t.PublishTime,
                             t.Titr,
                             t.Body,
                             t.Image,
                             t.RoTitr,
                             t.ZirTitr

                         }
                         );

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
                    RoTitr = news.RoTitr,
                    ZirTitr = news.ZirTitr
                };
                newsList.Add(newsEntity);
            }

            return newsList;
        }
        catch (Exception ex)
        {

            return null;
        }
    }

    public List<NewsEntity> SelectAllNewsByGroupForWeb(long groupId)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.NewsTables
                         where t.PublishStatus == 1 && t.NewsGroupID == 1
                         orderby t.Id descending
                         select new
                         {
                             newsId = t.Id,
                             t.PublishStatus,
                             PublishDate = t.PublishDate.Value,
                             t.PublishTime,
                             t.Titr,
                             t.Body,
                             t.Image,
                             t.RoTitr,
                             t.ZirTitr

                         }
                         ).Take(4);

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
                    RoTitr = news.RoTitr,
                    ZirTitr = news.ZirTitr
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