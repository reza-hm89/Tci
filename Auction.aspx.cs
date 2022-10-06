using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Auction : System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
	{
		if (Request.QueryString.Count > 0)
		{
			long id = Convert.ToInt64(Request.QueryString["id"]);

			var db = new DataClassesDataContext();
			var query = (from t in db.AuctionTables
						 where t.Id == id
						 select t).SingleOrDefault();

			if (query != null)
			{
				Number.InnerText = query.Number;
				pageTitle.InnerText = query.Subject;
				Subject.InnerText = query.Subject;
				Subject2.InnerText = query.Subject;
				RegDate.InnerText =
					FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(query.RegDate.Value).ToString("yy/mm/dd");
				RegDate2.InnerText =
				   FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(query.RegDate.Value).ToString("yy/mm/dd");
				EndReciveDate.InnerText =
				   FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(query.EndRecieveDate.Value).ToString("yy/mm/dd");
				ReopningDate.InnerText =
				   FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(query.ReOpeningDate.Value).ToString("yy/mm/dd");

				Description.InnerHtml = query.Description;

				if (query.EndRecieveDate.HasValue && query.EndRecieveDate > DateTime.Now)
				{
					divDownloadForm.Style["display"] = "block"; 
				}
				else
				{
					divDownloadForm.Style["display"] = "none";
					divShowDownloadFile1.Style["display"] = "block";
				}
			}
		}
	}
}