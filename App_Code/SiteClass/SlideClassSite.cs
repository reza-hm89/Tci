using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for SlideClassSite
/// </summary>
public class SlideClassSite
{
    public SlideClassSite()
    {
        //
        // TODO: Add constructor logic here
        //
    }

    public List<SlideEntity> SelectAll()
    {
        try
        {
            var lst = new List<SlideEntity>();
            var db = new DataClassesDataContext();

            var query = from t in db.SlideTables
                        where t.Visibility==true && t.LanguageID==1
                        select t ;

            foreach(var slide in query)
            {
                var slideEntity = new SlideEntity()
                {
                    Id = slide.Id,
                    AlternativeText = slide.AlternativeText,
                    Image = slide.Image,
                    LanguageID =(long)slide.LanguageID,
                    Link = slide.Link,
                    OpenLink = slide.OpenLink,
                    Priority = (long)slide.Priority,
                    ShowTime = (byte)slide.ShowTime,
                    Title1 = slide.Title1,
                    Title2 = slide.Title2,
                    Title3 = slide.Title3,
                    UserID = (long)slide.UserID,
                    Visibility = slide.Visibility
                };
                lst.Add(slideEntity);
            }
            return lst;
        }
        catch (Exception ex)
        {
            //ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }
}