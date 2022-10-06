using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ErrorClass
/// </summary>
public static class ErrorClass
{
    public static IEnumerable<object> SelectAll()
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = from t in db.ErrorTables
                        orderby t.Date descending 
                        select t;

            return query;
        }
        catch
        {
            return null;
        }
       
    }

    public static void Insert(string title, string detail)
    {
        try
        {
            var db = new DataClassesDataContext();
            var error = new ErrorTable()
            {
                Title = title,
                Detail = detail,
                Date = FarsiLibrary.Utils.PersianDate.Now.ToString("yyyy/mm/dd") + " - " +
                       FarsiLibrary.Utils.PersianDate.Now.Time.ToString()
              
            };

            db.ErrorTables.InsertOnSubmit(error);
            db.SubmitChanges();
        }
        catch
        {

        }
    }

    public static IEnumerable<object> ShowDetails(Int32 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.ErrorTables
                        where t.Id == id
                        select t;

            return query;
        }
        catch
        {
            return null;
        }
    }

    public static void Delete(long id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.ErrorTables
                where t.Id == id
                select t;

            db.ErrorTables.DeleteAllOnSubmit(query);
            db.SubmitChanges();
        }
        catch
        {

        }
    }
}