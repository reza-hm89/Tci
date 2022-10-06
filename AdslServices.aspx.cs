using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Adsl_Services : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        LoadPackageGroups();
    }

    void LoadPackageGroups()
    {
        var db = new DataClassesDataContext();

        var query = from t in db.PackageGroupTables
                    select t;

        bool i = false;

        foreach (var item in query)
        {
            if (!i)
            {
                GroupList.Controls.Add(new LiteralControl(" <li class='active'>" +
                                                     "<a href='#adsl" + item.Id + "' id=" + item.Id + " data-toggle='tab'>" + item.Name + "</a>" +
                                                     "</li>"));

                i = true;
            }
            else
            {
                GroupList.Controls.Add(new LiteralControl(" <li>" +
                                                    "<a href='#adsl" + item.Id + "' id=" + item.Id + " data-toggle='tab'>" + item.Name + "</a>" +
                                                    "</li>"));
            }
        }

        //i = false;

        //foreach (var item in query)
        //{
        //    if (!i)
        //    {
        //        GroupList.Controls.Add(new LiteralControl("<div class='tab-pane active' id='adsl" + item.Id + ">" +
        //       "<div class='row'>" + item.Description + "</div></div>"));

        //        i = true;
        //    }
        //    else
        //    {
        //        GroupList.Controls.Add(new LiteralControl("<div class='tab-pane ' id='adsl" + item.Id + ">" +
        //      "<div class='row'>" + item.Description + "</div></div>"));
        //    }
        //}

    }
}