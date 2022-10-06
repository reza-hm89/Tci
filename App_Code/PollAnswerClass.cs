using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Kavenegar.SDK.Models;

/// <summary>
/// Summary description for PollAnswerClass
/// </summary>
public class PollAnswerClass
{
    public PollAnswerClass()
    {       
    }

    public bool Insert(PollAnswerEntity pollAnswerEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var pollAnswer = new PollAnswerTable();

            pollAnswer.PollsID = pollAnswerEntity.PollsID;
            pollAnswer.Answer = pollAnswerEntity.Answer;
            pollAnswer.Count = pollAnswerEntity.Count;

            db.PollAnswerTables.InsertOnSubmit(pollAnswer);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public void Update(PollAnswerEntity pollAnswerEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PollAnswerTables
                         where t.Id == pollAnswerEntity.Id
                         select t).Single();

            if (query != null)
            {
                query.PollsID = pollAnswerEntity.PollsID;
                query.Answer = pollAnswerEntity.Answer;

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

            var query = (from t in db.PollAnswerTables
                         where t.Id == id
                         select t).Single();

            if (query != null)
            {
                db.PollAnswerTables.DeleteOnSubmit(query);
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

            var query = from t in db.PollAnswerTables
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

    public IEnumerable<object> SelectAllFromOnePoll(long id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.PollAnswerTables
                        where  t.PollsID == id
                        select
                            new
                            {
                                t.Id,
                                t.PollsID,
                                t.Answer,
                                t.Count
                            };

            return query;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public bool Vote(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PollAnswerTables
                        where t.Id == id
                        select t).SingleOrDefault();

            if (query!=null)
            {
                query.Count++;
                db.SubmitChanges();
            }

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }
}