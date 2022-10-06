using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

public partial class admin_TelegramLotteryUsersExcel : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        Write2ExcelFile();
    }

    private void Write2ExcelFile()
    {
        List<TelegramLotteryUserEntity> dt1;
        var telegramClass = new TelegramLotteryUserRegisterClass();
        long lotteryId = 0;
        if (Request.Params["Id"] != null)
            lotteryId = Int64.Parse(Request.Params["Id"]);
        if (lotteryId > 0)
            dt1 = telegramClass.SelctAllByLotteryId(lotteryId);

        else
            dt1 = telegramClass.SelctAll();
        try
        {

            HttpContext.Current.Response.Clear();
            HttpContext.Current.Response.ClearHeaders();
            HttpContext.Current.Response.Buffer = true;
            HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";

            HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=TelegramLotteryUsers.xls");
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.Write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>");
            Response.BinaryWrite(System.Text.Encoding.Unicode.GetPreamble());
            HttpContext.Current.Response.Write(
                "<font style='direction:rtl;font-size:10.0pt; font-family:tahoma;'>");
            HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
                                               "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
                                               "style='font-size:10.0pt; font-family:arial; background:white;'> <TR>");
            int columnscount = dt1.Count;

            string[] columnName = { "نام", "نام خانوداگی", "تلفن ثابت", "شماره موبایل", "تاریخ ثبت نام", "ساعت ثبت نام"};

            HttpContext.Current.Response.Write("<TR>");
            for (int j = 0; j < columnName.Length; j++)
            {
                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write("<B>");
                HttpContext.Current.Response.Write(columnName[j]);
                HttpContext.Current.Response.Write("</B>");
                HttpContext.Current.Response.Write("</Td>");

            }
            HttpContext.Current.Response.Write("</TR>");

            List<TelegramLotteryUserEntity> lst = new List<TelegramLotteryUserEntity>();
            for (int k = 0; k < dt1.Count; k++)
            {

                var customer = new TelegramLotteryUserEntity();

                customer.CustomerName = dt1[k].CustomerName;
                customer.CustomerLastName = dt1[k].CustomerLastName;
                customer.CustomerId = dt1[k].CustomerId;
                customer.CustomerMobile = dt1[k].CustomerMobile;
                customer.RegisterDate = dt1[k].RegisterDate;
                customer.RegisterTime = dt1[k].RegisterTime;
                //customer.Winner = dt1[k].Winner;

                lst.Add(customer);
            }

            string Winner = "";


            for (int j = 0; j < lst.Count; j++)
            {
                if (lst[j].Winner)
                    Winner = "برنده";
                else
                    Winner = "-";

                HttpContext.Current.Response.Write("<TR>");

                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write(lst[j].CustomerName);
                HttpContext.Current.Response.Write("</Td>");

                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write(lst[j].CustomerLastName);
                HttpContext.Current.Response.Write("</Td>");


                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write(lst[j].CustomerId);
                HttpContext.Current.Response.Write("</Td>");

                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write(lst[j].CustomerMobile);
                HttpContext.Current.Response.Write("</Td>");

                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write(lst[j].RegisterDate);
                HttpContext.Current.Response.Write("</Td>");

                HttpContext.Current.Response.Write("<Td>");
                HttpContext.Current.Response.Write(lst[j].RegisterTime);
                HttpContext.Current.Response.Write("</Td>");

                //HttpContext.Current.Response.Write("<Td>");
                //HttpContext.Current.Response.Write(Winner);
                //HttpContext.Current.Response.Write("</Td>");

                HttpContext.Current.Response.Write("</TR>");

            }

            HttpContext.Current.Response.Write("</Table>");
            HttpContext.Current.Response.Write("</font>");
            HttpContext.Current.Response.Flush();
            HttpContext.Current.Response.Close();

            Response.BufferOutput = false;
            // Response.AddHeader("Content-Length", "1000000");

            //HttpContext.Current.Response.End();
            // }

        }
        catch (Exception ex)
        {
        }

    }
}