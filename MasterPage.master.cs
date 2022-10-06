using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class MasterPage : System.Web.UI.MasterPage
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LoadMainMenu(-1);      
        LoadLinks();
    }

    private void LoadNewsMenu()
    {
        var db = new DataClassesDataContext();

        var query = (from t in db.NewsTables
                     where t.ShowInSlide == true || t.Special == true
                     orderby t.Id descending
                     select t).Take(1);

        foreach (var item in query)
        {
            mainMenu.Controls.Add(new LiteralControl("<ul class='dropdown-menu animated slideDown'>" +
                                                     "<li>" +
                                                     "<div class='mega-menu-content'>" +
                                                     "<div class='row'>" +
                                                     "<div class='col-md-3  brl'>" +                                                    
                                                     "<span class='mega-menu-sub-title'>" +
                                                     "<a href='NewsList.aspx'>مشاهده آخرین اخبار</a>" +
                                                     "<span class='mmore'><a href='NewsList.aspx'><i class='icon-a3-left'></i> بیشتر</a></span>" +
                                                     "</span>" +
                                                     "<ul class='sub-menu'>" +
                                                     "<li><img alt='' class='img-responsive' src='../mngmnt/images/" +
                                                     item.Image + "'></li>" +
                                                     "<li class='mmntit'><a href='news.aspx?id=" + item.Id + "'>" +
                                                     item.Titr + "</a></li>" +
                                                     "</ul>" +
                                                     "</div>" +
                                                     "<div class='col-md-3 brl'>"));
        }

        mainMenu.Controls.Add(new LiteralControl("<span class='mega-menu-sub-title'>" +
                                                 "<a href='NewsList.aspx'>مخابرات از نگاه مطبوعات</a>" +
                                                 "</span>" +
                                                 "<ul class='sub-menu'>" +
                                                 "<li><a href='NewsList.aspx'><img alt='' class='img-responsive' src='uploads/tci-khn.jpg'></a></li>" +
                                                 "</ul>" +
                                                 "</div>" +
                                                 "<div class='col-md-3'>"));

        var query2 = (from t in db.NewsTables
                      where t.ShowInSlide == false && t.NewsGroupID== 9
                      orderby t.Id descending
                      select t).Take(3);

        mainMenu.Controls.Add(new LiteralControl("<!--اخبار توسعه-->" +
                                                 "<span class='mega-menu-sub-title'>" +
                                                 "<a href='NewsList.aspx'>اخبار توسعه</a>" +
                                                 "<span class='mmore'><a href=''><i class='icon-a3-left'></i> بیشتر</a></span>" +
                                                 "</span>" +
                                                 "<ul class='sub-menu mmtn'>"));

        foreach (var item in query2)
        {
            mainMenu.Controls.Add(
                new LiteralControl(
                    "<li><span class='mmreg'></span><a href='News.aspx?id=" + item.Id + "'>" + item.Titr + "</a></li>"));

        }

        mainMenu.Controls.Add(new LiteralControl("</ul>" +
                                                 "</div>" +
                                                 "</div>" +
                                                 "</div>" +
                                                 "</li>" +
                                                 "</ul>"));
    }

    public void LoadMainMenu(long parentId)
    {
        var menuClass = new MenuClassSite();
        var lst = menuClass.SelectAllByParent(parentId);
        if (lst != null)
        {
            var i = 0;
            foreach (var menu in lst)
            {
                if (menu.MenuGroupID < 4)
                {
                    i++;
                    if (i == lst.Count)
                    {
                        mainMenu.Controls.Add(new LiteralControl(@"<li id='headerAccount'" + @" class='dropdown signin'>
                                       
                                        <a class='dropdown-toggle' href='" + menu.Link +
                                                                 @"'> <span class='cfbr' style='border-right: 1px solid rgb(77, 129, 210); '></span>
                                                   <i class='icon-customer'></i>&nbsp;" + menu.Name + @"
                                                   <span class='cfbl' style='border-left: 1px solid rgb(77, 129, 210);'></span>
                                            <i class='icon-a-down'></i> </a>"));
                    }
                    else if (menu.MenuGroupID == 1 || menu.MenuGroupID == 2)
                    {
                        mainMenu.Controls.Add(
                            new LiteralControl(@"<li id='" + menu.Id +
                                               @"' class='dropdown mega-menu-item mega-menu-fullwidth'>
                                        <style>#" + menu.Id + @"ul.dropdown-menu {
                                                background: #fff url('images/sunet_94315.png') no-repeat left bottom !important;
                                         }
                                        </style >
                                        <a class='dropdown-toggle' href='" + menu.Link + @"'>
                                           " + menu.Name + "&nbsp;</a>"));
                    }
                    else if (menu.MenuGroupID == 3)
                    {
                        mainMenu.Controls.Add(new LiteralControl(@"<li id=''" + @" class='dropdown'>
                                        <style>#" + menu.Id + @"ul.dropdown-menu {
                                                background: #fff url('images/sunet_94315.png') no-repeat left bottom !important;
                                         }
                                        </style >
                                        <a class='dropdown-toggle' href='" + menu.Link + @"'>
                                           " + menu.Name + "&nbsp;</a>"));
                    }
                    var lst1 = menuClass.SelectAllByParent(menu.Id);

                    if (menu.Id == 3)
                    {
                        LoadNewsMenu();
                    }
                    else
                    {
                        if (lst1.Count > 0)
                        {


                            if (menu.MenuGroupID == 1)
                            {
                                mainMenu.Controls.Add(new LiteralControl(@"<ul class='dropdown-menu animated slideDown'>
                                            <li><div class='mega-menu-content'>
                                                    <div class='row'>
                                                        <div class='col-md-10'>"));
                                foreach (var item in lst1)
                                {
                                    mainMenu.Controls.Add(new LiteralControl(@"<div class='col-md-2 nopadr brl'>
                                                                <span class='mega-menu-sub-title'><a
                                                                       href='" + item.Link + @"'>" + item.Name +
                                                                             " </a></span>"));
                                    var lst2 = menuClass.SelectAllByParent(item.Id);
                                    if (lst2.Count > 0)
                                    {
                                        mainMenu.Controls.Add(new LiteralControl(@"<ul class='sub-menu'>"));
                                        foreach (var item2 in lst2)
                                        {
                                            mainMenu.Controls.Add(
                                                new LiteralControl(@"<li><a href='" + item2.Link + @"'>" + item2.Name +
                                                                   "</a></li>"));
                                        }
                                        mainMenu.Controls.Add(new LiteralControl("</ul>"));
                                    }
                                    mainMenu.Controls.Add(new LiteralControl("</div>"));
                                }
                                mainMenu.Controls.Add(new LiteralControl(" </div></li></ul>"));
                            }
                            else if (menu.MenuGroupID == 3) //لیستی
                            {
                                mainMenu.Controls.Add(new LiteralControl(@"<ul class='dropdown-menu'>"));
                                foreach (var item in lst1)
                                {

                                    mainMenu.Controls.Add(
                                        new LiteralControl(@"<li><a href='" + item.Link + @"'>" + item.Name + "</a></li>"));
                                }
                                mainMenu.Controls.Add(new LiteralControl("</ul>"));
                            }
                        }
                    }
                   
                    mainMenu.Controls.Add(new LiteralControl("</li>"));
                }
            }
        }
    }

  
    void LoadLinks()
    {
        var menuClass = new MenuClassSite();

        var lst = menuClass.SelectAllByGroup(5);

        if (lst != null)
        {
            CustomerMessageMenu.Controls.Add(new LiteralControl(@"<ul class='dropdown-menu animated slideDown'>"));


            foreach (var menu in lst)
            {
                CustomerMessageMenu.Controls.Add(new LiteralControl(@"<li><a href='" + menu.Link + "'></i>" + menu.Name + "</a></li>"));
            }
            CustomerMessageMenu.Controls.Add(new LiteralControl(@"</ul></li>"));
        }

    }

}
