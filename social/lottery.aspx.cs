using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class social_lottery : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        //int LotteryYear = 0;
        //int LotteryMonth = 0;
        if (Request.Params["Id"] != null)
        {
            if(Request.Params["Id"].Length==21)
            { 
            string code = Request.Params["Id"].Substring(5,16);
           // LotteryYear = Int32.Parse(Request.Params["Id"].Substring(0, 2));
            //LotteryMonth = Int32.Parse(Request.Params["Id"].Substring(2, 2));


            var lotteryClass = new TelegramLotteryClass();
                if (lotteryClass.ExistLotteryByCode(code) > 0)
                {
                   // LotteryId.Value = lotteryClass.IsActiveLottery(LotteryYear, LotteryMonth, code).ToString();
                    LotteryId.Value = lotteryClass.IsActiveLottery( code).ToString();

                    if (Int64.Parse(LotteryId.Value) > 0)
                    {

                        hidLotteryYear.Value = Request.Params["Id"].Substring(0, 2);
                        hidLotteryMonth.Value = Request.Params["Id"].Substring(2, 2);

                        LetteryRegisterPanel.Visible = true;
                    }
                    else
                        LetteryNoActivePanel.Visible = true;
                }
                else
                    Response.Redirect("telegram");
            }
            else
                Response.Redirect("telegram");
        }
        else
            Response.Redirect("telegram");
    }
}