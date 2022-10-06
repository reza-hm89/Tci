using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

/// <summary>
/// Summary description for ModalClass
/// </summary>
public class ModalClass
{
	public ModalClass()
	{
		
	}


	public bool Insert(ModalEntity modalEntity)
	{
		try
		{
			var db = new DataClassesDataContext();
			var modal = new ModalTable();

			modal.Title = modalEntity.Title;
			modal.Description = modalEntity.Description;
			modal.Image = modalEntity.Image;
			modal.IsActive = modalEntity.IsActive;
		

			db.ModalTables.InsertOnSubmit(modal);
			db.SubmitChanges();

			return true;
		}
		catch (Exception ex)
		{
			ErrorClass.Insert(ex.Message, ex.StackTrace);
			return false;
		}
	}

	public string Update(ModalEntity modalEntity)
	{
		try
		{
			var db = new DataClassesDataContext();

			var modal = (from t in db.ModalTables
						 where t.Id == modalEntity.Id
						 select t).Single();

			string oldUrl = modal.Image;

			modal.Title = modalEntity.Title;
			modal.Description = modalEntity.Description;
			modal.Image = modalEntity.Image;
			modal.IsActive = modalEntity.IsActive;

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

			var query = (from t in db.ModalTables
						 where t.Id == id
						 select t).Single();

			string oldUrl = query.Image;

			db.ModalTables.DeleteOnSubmit(query);
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

			var query = from t in db.ModalTables
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

			var query = from t in db.ModalTables
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



	public string ReturnUrl(Int64 id)
	{
		try
		{
			var db = new DataClassesDataContext();

			var query = (from t in db.ModalTables
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

			var modal = (from t in db.ModalTables
						 where t.Id == id
						 select t).Single();

			modal.IsActive = visibility;

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