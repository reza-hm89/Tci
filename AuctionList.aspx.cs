using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class AuctionList : System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
	{
		if (Request.QueryString.Count > 0)
		{
			byte id = Convert.ToByte(Request.QueryString["id"]);

			if (id == 2)
			{
				pageTitle.InnerText = "مزایده ها";
			}
			else if (id == 1)
			{
				pageTitle.InnerText = "مناقصه ها";
			}

			LoadAuctionList(id);
		}
	}

	void LoadAuctionList(byte id)
	{
		var db = new DataClassesDataContext();

		var query = (from t in db.AuctionTables
					 where t.Kind == id
					 orderby t.RegDate descending
					 select t);

		int i = 1;

		foreach (var item in query)
		{
			if (i % 2 == 1)
			{
				AuctionListData.Controls.Add(new LiteralControl("<tr>" +
																"<td >" + i + "</td>" +
																"<td >" + item.Number + "</td>" +
																"<td >" +
																"<a  href='Auction.aspx?id=" + item.Id + "'>" +
																item.Subject + "</a>" +
																"</td>" +
																"<td>" +
																FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(
																	item.RegDate.Value).ToString("yy/mm/dd") + "</td>" +

																"<td >" +
																FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(
																	item.EndRecieveDate.Value).ToString("yy/mm/dd") +
																"</td>" +
																"<td >" +
																FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(
																	item.SendDate.Value).ToString("yy/mm/dd") + "</td>" +
																	  "<td >" +
																FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(
																	item.ReOpeningDate.Value).ToString("yy/mm/dd") +
																"</td>" +
																"</tr>"));
			}
			else
			{
				AuctionListData.Controls.Add(new LiteralControl("<tr class='alt'>" +
																"<td >" + i + "</td>" +
																"<td >" + item.Number + "</td>" +
																"<td >" +
																"<a  href='Auction.aspx?id=" + item.Id + "'>" +
																item.Subject + "</a>" +
																"</td>" +
																"<td>" +
																FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(
																	item.RegDate.Value).ToString("yy/mm/dd") + "</td>" +
															
																"<td >" +
																FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(
																	item.EndRecieveDate.Value).ToString("yy/mm/dd") +
																"</td>" +
																"<td >" +
																FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(
																	item.SendDate.Value).ToString("yy/mm/dd") + "</td>" +
																		"<td >" +
																FarsiLibrary.Utils.PersianDateConverter.ToPersianDate(
																	item.ReOpeningDate.Value).ToString("yy/mm/dd") +
																"</td>" +
																"</tr>"));
			}
			i++;

		}

	}
}