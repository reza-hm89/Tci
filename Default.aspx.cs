using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class _Default : System.Web.UI.Page
{
	protected void Page_Load(object sender, EventArgs e)
	{

		LoadImageSlider();
		LoadLastNews();

		LoadTopService();

		LoadModal();

		LoadPoll();
		///LoadLinks();
	}

	private void LoadModal()
	{
		try
		{
			var db = new DataClassesDataContext();

			var query = (from t in db.ModalTables
						 where t.IsActive == true
						 select t).FirstOrDefault();


			if (query != null)
			{
				Page.ClientScript.RegisterStartupScript(this.GetType(), "myKey", "<script type='text/javascript'> $('#ContentPlaceHolder_myModal').modal(); </script>", false);
				myModal.Style["display"] = "block";
				modalTitle.InnerText = query.Title;
				modalImage.Src = "../mngmnt/images/" + query.Image;
			}

		}
		catch (Exception exception)
		{
			ErrorClass.Insert(exception.Message, exception.StackTrace);
		}
	}

	//private void LoadLinks()
	//{
	//    var db = new DataClassesDataContext();
	//    var query = from t in db.LinkTables
	//                select t;

	//    int i = 1;

	//    foreach (var item in query)
	//    {
	//        if (i % 2 == 1)
	//        {
	//            LinkList.Controls.Add(new LiteralControl(" <div>" +
	//                                                     "<a href='" + item.Link + "'>" +
	//                                                     "<img alt='" + item.Title + "' class='img-responsive' src='../mngmnt/images/" +
	//                                                     item.Icon + "'>" +
	//                                                     "</a>"));
	//        }
	//        else
	//        {
	//            LinkList.Controls.Add(new LiteralControl(
	//                "<a href='" + item.Link + "'>" +
	//                "<img alt='" + item.Title + "' class='img-responsive' src='../mngmnt/images/" + item.Icon + "'>" +
	//                "</a>" +
	//                "</div>"));
	//        }
	//        i++;

	//    }

	//}

	private void LoadPoll()
	{
		try
		{
			var db = new DataClassesDataContext();

			var query = from t in db.PollTables
						join answer in db.PollAnswerTables on t.Id equals answer.PollsID
						where t.IsActive == true
						select new { t.Id, t.Name, answer.Answer, answerId = answer.Id };


			foreach (var item in query)
			{
				divPollTitle.InnerText = item.Name;


				PollAnswers.Controls.Add(new LiteralControl("<button class='btn btn-borders btn-primary btnPoll' type='button' value='" + item.answerId + "'>" + item.Answer + "</button>"));
			}
		}
		catch (Exception exception)
		{
			ErrorClass.Insert(exception.Message, exception.StackTrace);
		}
	}

	public void LoadImageSlider()
	{
		var slider = new SlideClassSite();
		var lst = slider.SelectAll();

		int i = 0;

		if (lst != null)
		{
			string link = "#";

			foreach (var slide in lst)
			{

				if (slide.Link != "")
				{
					link = slide.Link;
				}
				else
				{
					link = "#";
				}

				if (i == 0)
				{
					circles.Controls.Add(new LiteralControl("<li data-target='#myCarousel' data-slide-to='" + i + "' class='active'></li>"));

					SliderPanel.Controls.Add(new LiteralControl(@"<div class='item active'>" +
															   "<a href='" + link + "' target='_blank'><img src='../mngmnt/images/" + slide.Image + "' alt='" + slide.AlternativeText + "'></a>" +
															   "<div class='carousel-caption badane-slider'>" +
															   "</div>" +
															   "</div>"));


				}
				else
				{
					circles.Controls.Add(new LiteralControl("<li data-target='#myCarousel' data-slide-to='" + i + "' ></li>"));

					SliderPanel.Controls.Add(new LiteralControl(@"<div class='item'>" +
																"<a href='" + link + "' target='_blank'><img src='../mngmnt/images/" + slide.Image + "' alt='" + slide.AlternativeText + "'></a>" +
																 "<div class='carousel-caption badane-slider'>" +
																 "</div>" +
																 "</div>"));



				}
				i++;
			}
		}
	}

	public void LoadLastNews()
	{
		var newsClass = new NewsClassSite();
		var lst = newsClass.SelectAllLastNewsForWeb();
		string zirTitr = "";
		if (lst != null)
		{
			int cnt = 0;
			foreach (var news in lst)
			{
				if (cnt < 4)
				{

					if (string.IsNullOrEmpty(news.ZirTitr))
					{
						string str = GetContent(news.Body);
						if (str.Length > 140)
							str = str.Substring(0, 141);
						str = str + "...";
						zirTitr = str;
					}
					else
						zirTitr = news.ZirTitr;

					BLL.MaftooxCalendar.MaftooxPersianCalendar.DateWork prd = new BLL.MaftooxCalendar.MaftooxPersianCalendar.DateWork();
					DateTime dt1 = news.PublishDate;
					prd.Upate(dt1);
					string date = prd.GetNameDayInMonth() + "   " + prd.GetNumberDayInMonth().ToString() + "   " + prd.GetNameMonth() + "  " + prd.GetNumberYear().ToString();

					NewsListPanel.Controls.Add(new LiteralControl(@"<div class='ncbox'>
                            <img alt ='" + news.Titr + @"' class='img-responsive' style='width:190px'
                                 src='Mngmnt/images/" + news.Image + @"'>
                            <h3><a href = 'news.aspx?id=" + news.Id + "' >" + news.Titr + @"</a></h3>
                            <p class='short-news'>" + zirTitr + @"
                                <span class='ncmore'> <a href = 'news.aspx?id=" + news.Id + @"' >
                                <i class='icon-a3-left'></i> ادامه خبر</a></span>
                            </p>
                            <p>
                                <span class='ncdate'>" + date + @" </span>
                            </p>
                        </div>"));
				}

				cnt++;
			}
		}
	}

	//public void LoadLastNews()
	//{
	//    var newsClass = new NewsClassSite();
	//    var lst = newsClass.SelectLastNewsForWeb();
	//    string zirTitr = "";
	//    if (lst != null)
	//        foreach (var news in lst)
	//        {
	//            if (string.IsNullOrEmpty(news.ZirTitr))
	//            {
	//                string str = GetContent(news.Body);
	//                if (str.Length > 150)
	//                    str = str.Substring(0, 160);
	//                str = str + "...";
	//                zirTitr = str;
	//            }
	//            else
	//                zirTitr = news.ZirTitr;

	//            NewsPanel.Controls.Add(new LiteralControl(@"<div class='tctn'>
	//                            <div><span class='tctn-rot'></span></div>
	//                            <h2><a href ='news.aspx?id=" + news.Id + "' >" + news.Titr + @"</a>
	//                            </h2>
	//                            <p class='left-news-box'> " + zirTitr + "</p></div>"));
	//        }
	//}

	//public void LoadNewsSlider()
	//{
	//    var newsClass = new NewsClassSite();
	//    var lst = newsClass.SelectSliderNewsForWeb();
	//    if (lst != null)
	//        foreach (var news in lst)
	//        {
	//            SliderNewsPanel.Controls.Add(new LiteralControl(@"<div class='ow-contnt'>
	//                                <a href = 'news.aspx?id=" + news.Id + @"' >
	//                                <img alt ='' class='img-responsive' src='Mngmnt/images/" + news.Image + "'></a>"
	//                                + "<div class='itn'><span>" + news.RoTitr + "</span>"
	//                                + "<h2> <a href ='news.aspx?id=" + news.Id + "' > " + news.Titr + "</a></h2>"
	//                                + "<p class='news-itn-content' style='margin: 0 0 15px;'>" + news.ZirTitr +
	//                                "</p></div></div>"));
	//        }
	//}

	public void LoadTopService()
	{
		var menuClass = new MenuClassSite();
		var lst = menuClass.SelectAllByParent(1);
		if (lst != null)
		{
			var i = 0;
			string icon = "";

			foreach (var menu in lst)
			{
				if (i < 4)
				{

					if (i == 0)
					{
						icon = "tel";
					}
					else if (i == 1)
					{
						icon = "internet";
					}
					else if (i == 2)
					{
						icon = "data";
					}
					else if (i == 3)
					{
						icon = "otherservices";
					}

					i++;

					TopServicePanel.Controls.Add(new LiteralControl(@"<div class='col-md-3 col-sm-6 nopadr nopadl'>
                        <div class='banner-wrap banner_" + i + @"'>
                                <h5><i class='icon-" + icon + "'></i> " + menu.Name + @"</h5>
                            <ul class='nav nav-list primary'>
                           
                        "));


					var lst2 = menuClass.SelectAllByParent(menu.Id);
					if (lst2 != null)
					{
						int j = 0;
						foreach (var item in lst2)
						{
							if (j < 5)
							{
								TopServicePanel.Controls.Add(new LiteralControl(@"
                          <li><a href='" + item.Link + "'>" + item.Name + "</a></li> "));
								j++;
							}

						}

					}
					TopServicePanel.Controls.Add(new LiteralControl(@"</ul>
                            <div class='link-align banner-btn'>
                               " +
							"</div></div></div>"));

				}
			}
		}
	}

	public string GetContent(string str)
	{

		string myPlainTextString = Regex.Replace(str, "<[^>]*>", String.Empty);

		return myPlainTextString;

	}
}