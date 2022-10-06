using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for AgentClass
/// </summary>
public class AgentClass
{
	public AgentClass()
	{		
	}

    public bool Insert(AgentEntity agentEntity)
    {
        try
        {
            var db = new DataClassesDataContext();
            var agent = new AgentTable();

            agent.Name = agentEntity.Name;
            agent.Company = agentEntity.Company;
            agent.Code = agentEntity.Code;
            agent.Activity = agentEntity.Activity;
            agent.Address = agentEntity.Address;
            agent.Tel = agentEntity.Tel;
            agent.Mobile = agentEntity.Mobile;
            agent.Image = agentEntity.Image;
            agent.Visibility = agentEntity.Visibility;
            agent.LanguageID = agentEntity.LanguageID;
            agent.UserID = agentEntity.UserID;

            db.AgentTables.InsertOnSubmit(agent);
            db.SubmitChanges();

            agent.Priority = agent.Id;
            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }

    public string Update(AgentEntity agentEntity)
    {
        try
        {
            var db = new DataClassesDataContext();

            var agent = (from t in db.AgentTables
                             where t.Id == agentEntity.Id
                             select t).Single();

            string oldUrl = agent.Image;

            agent.Name = agentEntity.Name;
            agent.Company = agentEntity.Company;
            agent.Code = agentEntity.Code;
            agent.Activity = agentEntity.Activity;
            agent.Address = agentEntity.Address;
            agent.Tel = agentEntity.Tel;
            agent.Mobile = agentEntity.Mobile;
            agent.Image = agentEntity.Image;          
            agent.LanguageID = agentEntity.LanguageID;
            agent.UserID = agentEntity.UserID;

            db.SubmitChanges();

            return oldUrl;
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

            var query = (from t in db.AgentTables
                         where t.Id == id
                         select t).Single();

            string oldUrl = query.Image;

            db.AgentTables.DeleteOnSubmit(query);
            db.SubmitChanges();

            return oldUrl;
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

            var query = from t in db.AgentTables
                        select t;

            return query;
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

            var query = from t in db.AgentTables
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

    public IEnumerable<object> SelectOneWithCode(string code)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = from t in db.AgentTables
                        where t.Code == code
                        select t;

            return query;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public string ReturnUrl(Int64 id)
    {
        try
        {
            var db = new DataClassesDataContext();

            var query = (from t in db.AgentTables
                         where t.Id == id
                         select t).Single();

            return query.Image;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return null;
        }
    }

    public bool SetVisibility(long id, bool visibility)
    {
        if (GlobalFunction.CheckModulePermission("update") == false)
        {
            return false;
        }

        try
        {
            var db = new DataClassesDataContext();

            var agent = (from t in db.AgentTables
                         where t.Id == id
                         select t).Single();

            agent.Visibility = visibility;

            db.SubmitChanges();

            return true;
        }
        catch (Exception ex)
        {
           ErrorClass.Insert(ex.Message, ex.StackTrace);
            return false;
        }
    }
}