using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;
using Newtonsoft.Json;

/// <summary>
/// Summary description for MessageWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class MessageWs : System.Web.Services.WebService
{

	[WebMethod(EnableSession = true)]
	public string ExistEmail(string email)
	{

		try
		{
			var message = new MessageClass();

			var query = message.ExistEmail(email);

			var jsSettings = new JsonSerializerSettings
			{
				ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
				PreserveReferencesHandling = PreserveReferencesHandling.None
			};

			return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
			return null;
		}
	}

	[WebMethod(EnableSession = true)]
	public string GetData()
	{
		if (GlobalFunction.CheckModulePermission("show") == false)
		{
			return null;
		}

		try
		{
			var message = new MessageClass();

			var query = message.SelectAll();

			var jsSettings = new JsonSerializerSettings
			{
				ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
				PreserveReferencesHandling = PreserveReferencesHandling.None
			};

			return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
			return null;
		}
	}

	[WebMethod(EnableSession = true)]
	public bool Insert(MessageEntity messageEntity, bool fromSite)
	{
		if (!fromSite)
		{
			if (GlobalFunction.CheckModulePermission("show") == false)
			{
				return false;
			}
		}

		try
		{
			var message = new MessageClass();

			messageEntity.UserIp = GlobalVariable.GetIp();
			messageEntity.SendDate = DateTime.Now;
			messageEntity.UserID = (long)Session["UserId"];
			messageEntity.GroupID = 0;

			if (string.IsNullOrEmpty(messageEntity.UserIp))
			{
				return false;
			}

			if (message.Insert(messageEntity))
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

	[WebMethod]
	public bool InsertReply(MessageEntity messageEntity)
	{

		try
		{
			var message = new MessageClass();


			if (message.InsertReply(messageEntity.Id, messageEntity.Reply))
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

	[WebMethod(EnableSession = true)]
	public string BindRecordToEdit(Int64 id)
	{
		if (GlobalFunction.CheckModulePermission("show") == false)
		{
			return null;
		}

		try
		{
			var message = new MessageClass();

			var query = message.SelectOne(id);

			var jsSettings = new JsonSerializerSettings
			{
				ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
				PreserveReferencesHandling = PreserveReferencesHandling.None
			};

			return JsonConvert.SerializeObject(query, Formatting.None, jsSettings);
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
			return null;
		}
	}

	[WebMethod(EnableSession = true)]
	public void DeleteRecord(long id)
	{
		if (GlobalFunction.CheckModulePermission("delete") == false)
		{
			return;
		}

		try
		{
			var message = new MessageClass();

			message.DeleteOne(id);
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
		}
	}

	[WebMethod(EnableSession = true)]
	public void DeleteMultiRecord(List<string> idList)
	{
		if (GlobalFunction.CheckModulePermission("delete") == false)
		{
			return;
		}

		try
		{
			var message = new MessageClass();

			for (int i = 0; i < idList.Count; i++)
			{
				message.DeleteOne(Convert.ToInt64(idList[i]));
			}
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
		}

	}

	[WebMethod(EnableSession = true)]
	public void ReadMessage(long id)
	{
		try
		{
			var message = new MessageClass();

			message.ReadMessage(id);
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
		}

	}
}
