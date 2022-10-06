using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for PageClassSite
/// </summary>
public class PageClassSite
{
    public PageClassSite()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public PageEntity SelectOne(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.PageTables
                        where t.Id == id
                        select new { t.Body , t.Css, t.FileName , t.Id,t.Image,t.Js,t.Keywords,t.LanguageID,t.Template,t.Title,t.Visibility}).FirstOrDefault();
            var pageEntity = new PageEntity()
            {
                Body = query.Body,
                Css = query.Css,
                Id = query.Id,
                Image = query.Image,
                Js = query.Js,
                Keywords = query.Keywords,
                LanguageID = (long)query.LanguageID,
                Template = query.Template,
                Title = query.Title,
                Visibility = query.Visibility

            };
            return pageEntity;
        }
        catch (Exception ex)
        {
            //ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}