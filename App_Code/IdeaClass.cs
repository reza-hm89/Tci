using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for IdeaClass
/// </summary>
public class IdeaClass
{
    public IdeaClass()
    {

    }

    public bool Insert(IdeaEntity ideaEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var idea = new IdeaTable();

            idea.Name = ideaEntity.Name;
            idea.Mobile = ideaEntity.Mobile;
            idea.Email = ideaEntity.Email;
            idea.Title = ideaEntity.Title;
            idea.Tel = ideaEntity.Tel;
            idea.Description = ideaEntity.Description;
            idea.Idea = ideaEntity.Idea;
            idea.RefCode = ideaEntity.RefCode;
            idea.Kind = ideaEntity.Kind;
            idea.RegDate = ideaEntity.RegDate;
            idea.Advantage = ideaEntity.Advantage; // for read/unread

            db.IdeaTables.InsertOnSubmit(idea);
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

            var query = (from t in db.IdeaTables
                         where t.Id == id
                         select t).Single();

            if (query != null)
            {
                db.IdeaTables.DeleteOnSubmit(query);
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

            var query = from t in db.IdeaTables
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

            var query = from t in db.IdeaTables
                        orderby t.Id descending
                        select
                        new
                        {
                            t.Id,
                            t.Name,
                            t.Tel,
                            t.Mobile,
                            t.Email,
                            t.Title,
                            t.Description,
                            SendDate =
                            FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.RegDate.Value).ToString("yy/mm/dd"),
                            t.RefCode,

                        };


            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

}