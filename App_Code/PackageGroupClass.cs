using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PackageGroupClass
/// </summary>
public class PackageGroupClass
{
    public PackageGroupClass()
    {
      
    }

    public bool Insert(PackageGroupEntity packageGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var packageGroup = new PackageGroupTable();

            packageGroup.Name = packageGroupEntity.Name;
            packageGroup.Description = packageGroupEntity.Description;
            packageGroup.Visibility = packageGroupEntity.Visibility;

            db.PackageGroupTables.InsertOnSubmit(packageGroup);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool Update(PackageGroupEntity packageGroupEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var packageGroup = (from t in db.PackageGroupTables
                        where t.Id == packageGroupEntity.Id
                        select t).Single();


            packageGroup.Name = packageGroupEntity.Name;
            packageGroup.Description = packageGroupEntity.Description;
            packageGroup.Visibility = packageGroupEntity.Visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool DeleteOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PackageGroupTables
                         where t.Id == id
                         select t).Single();

            db.PackageGroupTables.DeleteOnSubmit(query);
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
            ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public IEnumerable<object> SelectAll()
    {
        try
        {

            var db = new DataClassesDataContext();

            var query = from t in db.PackageGroupTables
                        select t;

            return query;
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

            var query = from t in db.PackageGroupTables
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
}