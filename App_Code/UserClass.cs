using System;
using System.Collections.Generic;
using System.Data.Linq.SqlClient;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for UserClass
/// </summary>
public class UserClass
{
	public UserClass()
	{
		
	}

    public bool ExistUsername(string username)
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = (from t in db.UserTables
                where t.Username == username
                select t).FirstOrDefault();

            if (query!=null)
            {
                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public bool ExistEmail(string email)
    {
        try
        {
            var db = new DataClassesDataContext();
            var query = (from t in db.UserTables
                         where t.Email == email
                         select t).FirstOrDefault();

            if (query != null)
            {
                return true;
            }

            return false;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public long Insert(UserEntity userEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var user = new UserTable();

            user.Name = userEntity.Name;
            user.Family = userEntity.Family;
            user.Address = userEntity.Address;
            user.Tel = userEntity.Tel;
            user.ImageUrl = userEntity.ImageUrl;
            user.Birthday = Convert.ToDateTime(userEntity.Birthday);
            user.Gender = userEntity.Gender;
            user.ZipCode = userEntity.ZipCode;
            user.City = userEntity.City;
            user.Website = userEntity.Website;
            user.Email = userEntity.Email;
            user.Twitter = userEntity.Twitter;
            user.Facebook = userEntity.Facebook;
            user.GooglePlus = userEntity.GooglePlus;
            user.Github = userEntity.Github;
            user.Linkedin = userEntity.Linkedin;
            user.Skype = userEntity.Skype;
            user.Username = userEntity.Username;
            user.Password = userEntity.Password;
            user.Description = userEntity.Description;                     
            user.IsDelete = true;
            user.Ip = userEntity.Ip;
            user.ParentID = userEntity.ParentID;

            user.EmailConfirmed = false;
            user.MobileConfirmed = false;
            user.AccessFailedCount = 0;

            user.CardNumber = userEntity.CardNumber;
            user.AccountNumber = userEntity.AccountNumber;
            user.RegUserID = userEntity.RegUserID;

            if (userEntity.RegDate!="")
            {
                user.RegDate = Convert.ToDateTime(userEntity.RegDate);
            }

            if (userEntity.LoginDate != "")
            {
                user.LoginDate = Convert.ToDateTime(userEntity.LoginDate);
            }

            if (userEntity.LogoutDate != "")
            {
                user.LogoutDate = Convert.ToDateTime(userEntity.LogoutDate);
            }      

            db.UserTables.InsertOnSubmit(user);
            db.SubmitChanges();

            return user.Id;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return -1;
        }
    }

    public bool Update(UserEntity userEntity, out string oldImage)
    {
        try
        {
            var db = new DataClassesDataContext();
            var user = (from t in db.UserTables
                where t.Id == userEntity.Id
                select t).FirstOrDefault();

            if (user != null)
            {
                oldImage = user.ImageUrl;

                user.Name = userEntity.Name;
                user.Family = userEntity.Family;
                user.Address = userEntity.Address;
                user.Tel = userEntity.Tel;
                user.ImageUrl = userEntity.ImageUrl;
                //user.Birthday = Convert.ToDateTime(userEntity.Birthday);
                user.Gender = userEntity.Gender;
                user.ZipCode = userEntity.ZipCode;
                user.City = userEntity.City;
                user.Website = userEntity.Website;
                user.Email = userEntity.Email;
                user.Twitter = userEntity.Twitter;
                user.Facebook = userEntity.Facebook;
                user.GooglePlus = userEntity.GooglePlus;
                user.Github = userEntity.Github;
                user.Linkedin = userEntity.Linkedin;
                user.Skype = userEntity.Skype;
                user.Description = userEntity.Description;
                user.Ip = userEntity.Ip;
                user.ParentID = userEntity.ParentID;
                user.CardNumber = userEntity.CardNumber;
                user.AccountNumber = userEntity.AccountNumber;

                db.SubmitChanges();

                return true;
            }

            oldImage = null;
            return false;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            oldImage = null;
            return false;
        }
    }

    public string DeleteOne(long id)
    {
        try
        {
            var db = new DataClassesDataContext();
            var user = (from t in db.UserTables
                                where t.Id == id && t.IsDelete==true
                                select t).Single();

            if (user != null)
            {
                string oldImage = user.ImageUrl;

                db.UserTables.DeleteOnSubmit(user);
                db.SubmitChanges();

                return oldImage;
            }

            return null;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public IEnumerable<object> SelectOne(long id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.UserTables
                where t.Id == id
                select new
                {
                    t.Id,
                    t.Name,
                    t.Family,
                    t.Address,
                    t.Tel,
                    t.ImageUrl,
                    t.Gender,
                    t.ZipCode,
                    t.City,
                    t.Website,
                    t.Email,
                    t.Twitter,
                    t.Facebook,
                    t.GooglePlus,
                    t.Github,
                    t.Linkedin,
                    t.Skype,
                    t.Username,
                    LoginDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.LoginDate.Value).ToString("yy/mm/dd"),
                    LogoutDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.LogoutDate.Value).ToString("yy/mm/dd"),
                    //RegDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.RegDate.Value).ToString("yy/mm/dd"),
                    t.Description,
                    t.Ip,
                    t.ParentID,
                    t.CardNumber,
                    t.AccountNumber
                };

            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public IEnumerable<object> SelectChildrenForParent(long parentId)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.UserTables
                        orderby t.EmailConfirmed==false descending 
                        where t.ParentID == parentId
                        select new
                        {
                            t.Id,
                            t.Name,
                            t.Family,
                            t.Address,
                            t.Tel,
                            t.ImageUrl,
                            t.Gender,
                            t.ZipCode,
                            t.City,
                            t.Website,
                            t.Email,
                            t.Twitter,
                            t.Facebook,
                            t.GooglePlus,
                            t.Github,
                            t.Linkedin,
                            t.Skype,
                            t.Username,
                            LoginDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.LoginDate.Value).ToString("yy/mm/dd"),
                            LogoutDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.LogoutDate.Value).ToString("yy/mm/dd"),
                            RegDate = FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(t.RegDate.Value).ToString("yy/mm/dd"),
                            t.Description,
                            t.Ip,
                            t.ParentID,
                            t.CardNumber,
                            t.AccountNumber,
                            t.EmailConfirmed,
                            t.IsDelete
                        };

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

            var query = from t in db.UserTables
                        select new
                        {
                            t.Id,
                            t.Name,
                            t.Family,
                            t.Address,
                            t.Tel,
                            t.ImageUrl,
                            t.Gender,
                            t.ZipCode,
                            t.City,
                            t.Website,
                            t.Email,
                            t.Twitter,
                            t.Facebook,
                            t.GooglePlus,
                            t.Github,
                            t.Linkedin,
                            t.Skype,
                            t.Username,                          
                            t.Description,
                            t.Ip,
                            t.EmailConfirmed
                        };

            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public IEnumerable<object> Search(string username, string name)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.UserTables
                where
                    SqlMethods.Like(t.Username, "%" + username + "%") &&
                    (SqlMethods.Like(t.Name, "%" + name + "%") ||
                     SqlMethods.Like(t.Family, "%" + name + "%"))
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

            var query = (from t in db.UserTables
                         where t.Id == id
                         select t).Single();


            return query.ImageUrl;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public List<UserLevel> ShowChildrenTree(List<UserLevel> idList, Queue<UserLevel> userQueue, long parentId, int level)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.UserTables
                        where parentId == t.ParentID
                        select t;

            foreach (var item in query)
            {
                var userLevel = new UserLevel();

                userLevel.UserId = item.Id;
                userLevel.LevelNumber = level;
                userLevel.ParentId = parentId;
                userLevel.Username = item.Username;

                userQueue.Enqueue(userLevel);

            }

            if (userQueue.Count > 0)
            {
                var userLevel = new UserLevel();

                userLevel = userQueue.Dequeue();

                long deQueue = userLevel.UserId;

                idList.Add(userLevel);

                ShowChildrenTree(idList, userQueue, deQueue, ++userLevel.LevelNumber);
            }

            return idList;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

   
}