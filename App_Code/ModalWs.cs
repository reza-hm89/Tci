using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for ModalWs
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class ModalWs : System.Web.Services.WebService
{

	[WebMethod(EnableSession = true)]
	public bool SetVisibility(long id, bool visibility)
	{
		try
		{
			var modal = new ModalClass();

			bool result = modal.SetVisibility(id, visibility);

			return result;
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
			return false;
		}
	}

	[WebMethod(EnableSession = true)]
	public string CheckUrl(long id)
	{
		var modal = new ModalClass();

		string url = modal.ReturnUrl(id);

		var jsSettings = new JsonSerializerSettings
		{
			ReferenceLoopHandling = ReferenceLoopHandling.Ignore,
			PreserveReferencesHandling = PreserveReferencesHandling.None
		};

		return JsonConvert.SerializeObject(url, Formatting.None, jsSettings);
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
			var modal = new ModalClass();

			var query = modal.SelectAll();

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
	public bool Insert(ModalEntity modalEntity)
	{
		if (GlobalFunction.CheckModulePermission("insert") == false)
		{
			return false;
		}

		try
		{
			var modal = new ModalClass();

			
			if (modalEntity.Image != "")
			{
				modalEntity.Image = Session["CurrentTime"] + modalEntity.Image;
			}


			if (modal.Insert(modalEntity))
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
			var modal = new ModalClass();

			var query = modal.SelectOne(id);

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
	public bool Update(ModalEntity modalEntity)
	{
		if (GlobalFunction.CheckModulePermission("update") == false)
		{
			return false;
		}

		try
		{
			var modal = new ModalClass();

			
			if (modal.ReturnUrl(modalEntity.Id) == modalEntity.Image)
			{
				modal.Update(modalEntity);
			}
			else
			{
				string newUrl = Session["CurrentTime"] + modalEntity.Image;

				modalEntity.Image = newUrl;

				string oldUrl = modal.Update(modalEntity);

				if (newUrl != oldUrl && File.Exists(Server.MapPath("~/Mngmnt/images/" + oldUrl)))
				{
					File.Delete(Server.MapPath("~/Mngmnt/images/" + oldUrl));
				}
			}

			return true;
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
			return false;
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
			var modal = new ModalClass();

			string logoUrl = modal.DeleteOne(id);

			if (logoUrl != null)
			{
				if (File.Exists(Server.MapPath("~/Mngmnt/images/" + logoUrl)))
				{
					File.Delete(Server.MapPath("~/Mngmnt/images/" + logoUrl));
				}
			}
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
			var modal = new ModalClass();

			for (int i = 0; i < idList.Count; i++)
			{
				string imageUrl = modal.DeleteOne(Convert.ToInt64(idList[i]));

				string url = Server.MapPath("~/Mngmnt/images/" + imageUrl);

				if (imageUrl != "")
				{
					if (File.Exists(url))
					{
						File.Delete(url);
					}
				}
			}
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
		}
	}

}
