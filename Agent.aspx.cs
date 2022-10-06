using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class Adsl_Agent : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
       
        LoadAgents();
    }

    void LoadAgents()
    {
        var db = new DataClassesDataContext();

        var query = from t in db.AgentTables
                    select t;

        foreach (var item in query)
        {
            AgentList.Controls.Add(new LiteralControl(" <tr>" +
                                                      "<td>" + item.Company + "</td>" +
                                                      "<td>" + item.Code + "</td>" +
                                                      "<td>" + item.Name + "</td>" +
                                                      "<td>" + item.Address + "</td>" +
                                                      "<td>" + item.Tel + "</td> " +
                                                      "</tr>"));
        }

    }
}