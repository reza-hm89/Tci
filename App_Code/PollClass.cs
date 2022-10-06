using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PollClass
/// </summary>
public class PollClass
{
    public PollClass()
    {

    }

    public bool Insert(PollEntity pollEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var poll = new PollTable();

            poll.Name = pollEntity.Name;
            poll.RegDate = pollEntity.RegDate;
            poll.IsActive = pollEntity.IsActive;

            db.PollTables.InsertOnSubmit(poll);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public void Update(PollEntity pollEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PollTables
                         where t.Id == pollEntity.Id
                         select t).Single();

            if (query != null)
            {
                query.Name = pollEntity.Name;

                db.SubmitChanges();
            }

        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
        }
    }

    public void DeleteOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PollTables
                         where t.Id == id
                         select t).Single();

            if (query != null)
            {
                db.PollTables.DeleteOnSubmit(query);
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

            var query = from t in db.PollTables
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

            var query = from t in db.PollTables

                        select
                            new
                            {
                                t.Id,
                                t.Name,
                                RegDate =
                                    FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.RegDate.Value).ToString("yy/mm/dd"),
                                t.IsActive
                            };

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public bool ActivePoll(long id, bool active)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PollTables
                         where t.Id == id
                         select t).SingleOrDefault();

            if (query != null)
            {
                query.IsActive = active;
                
                db.SubmitChanges();
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

}