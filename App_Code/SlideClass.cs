using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SlideClasss
/// </summary>
public class SlideClass
{
	public SlideClass()
	{
		
	}

    public long Insert(SlideEntity slideEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var slide = new SlideTable();

            slide.Image = slideEntity.Image;
            slide.AlternativeText = slideEntity.AlternativeText;
            slide.Link = slideEntity.Link;
            slide.OpenLink = slideEntity.OpenLink;
            slide.ShowTime = slideEntity.ShowTime;
            slide.Priority = slideEntity.Priority;
            slide.LanguageID = slideEntity.LanguageID;
            slide.Visibility = slideEntity.Visibility;
            slide.Title1 = slideEntity.Title1;
            slide.Title2 = slideEntity.Title2;
            slide.Title3 = slideEntity.Title3;
            slide.UserID = slideEntity.UserID;

            db.SlideTables.InsertOnSubmit(slide);
            db.SubmitChanges();

            slide.Priority = slide.Id;
            db.SubmitChanges();

            return slide.Id;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return -1;
        }
    }

    public string Update(SlideEntity slideEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var slide = (from t in db.SlideTables
                where t.Id == slideEntity.Id
                select t).Single();

            string oldImage = slide.Image;


            slide.Image = slideEntity.Image;
            slide.AlternativeText = slideEntity.AlternativeText;
            slide.Link = slideEntity.Link;
            slide.OpenLink = slideEntity.OpenLink;
            slide.ShowTime = slideEntity.ShowTime;           
            slide.LanguageID = slideEntity.LanguageID;
            slide.Title1 = slideEntity.Title1;
            slide.Title2 = slideEntity.Title2;
            slide.Title3 = slideEntity.Title3;
            slide.UserID = slideEntity.UserID;

            db.SubmitChanges();

            return oldImage;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public string DeleteOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.SlideTables
                where t.Id == id
                select t).Single();

            string oldImage = query.Image;


            db.SlideTables.DeleteOnSubmit(query);
            db.SubmitChanges();

            return oldImage;
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

            var query = from t in db.SlideTables
                select t;
                        
            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public object SelectFirst()
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.SlideTables
                         select t).FirstOrDefault();

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public IEnumerable<object> SelectOne(Int64 slideId)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.SlideTables
                        where t.Id == slideId
                        select t;


            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public string ReturnImageUrl(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.SlideTables
                         where t.Id== id
                         select t).Single();


            return query.Image;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}