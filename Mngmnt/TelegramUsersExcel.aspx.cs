using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace UI
{
    public partial class down : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Write2ExcelFile();
        }

        private void Write2ExcelFile()
        {
            var telegramClass = new TelegramRegisterClass();
            List<TelegramUserEntity> dt1 = telegramClass.SelectAll();
            if (dt1.Count > 0)
            {
                try
                {
                    HttpContext.Current.Response.Clear();
                    HttpContext.Current.Response.ClearHeaders();
                    HttpContext.Current.Response.Buffer = true;
                    HttpContext.Current.Response.ContentType = "application/vnd.ms-excel";
                    HttpContext.Current.Response.AddHeader("Content-Disposition", "attachment; filename=TelegramUsers.xls");
                    Response.ContentEncoding = System.Text.Encoding.UTF8;
                    Response.Write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"/>");
                    Response.BinaryWrite(System.Text.Encoding.Unicode.GetPreamble());
                    HttpContext.Current.Response.Write(
                        "<font style='direction:rtl;font-size:10.0pt; font-family:tahoma;'>");
                    HttpContext.Current.Response.Write("<Table border='1' bgColor='#ffffff' " +
                                                       "borderColor='#000000' cellSpacing='0' cellPadding='0' " +
                                                       "style='font-size:10.0pt; font-family:arial; background:white;'> <TR>");
                    int columnscount = dt1.Count;

                    string[] columnName = { "نام", "نام خانوداگی", "سیستم عامل", "تلفن ثابت", "ایمیل", "شماره موبایل", "محتوای مورد علاقه", "تاریخ ثبت نام", "ساعت ثبت نام", "مشترک مخابرات", "وضعیت ثبت نام " };

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

                    List<TelegramUserEntity> lst = new List<TelegramUserEntity>();
                    for (int k = 0; k < dt1.Count; k++)
                    {

                        var customer = new TelegramUserEntity();

                        customer.CustomerName = dt1[k].CustomerName;
                        customer.CustomerLastName = dt1[k].CustomerLastName;
                        customer.Os = dt1[k].Os;
                        customer.CustomerId = dt1[k].CustomerId;
                        customer.CustomerEmail = dt1[k].CustomerEmail;
                        customer.CustomerMobile = dt1[k].CustomerMobile;
                        customer.FavoriteContent = dt1[k].FavoriteContent;
                        customer.RegisterDate = dt1[k].RegisterDate;
                        customer.RegisterTime = dt1[k].RegisterTime;
                        customer.TceUser = dt1[k].TceUser;
                        customer.Active = dt1[k].Active;

                        lst.Add(customer);
                    }

                    string TceUser = "";
                    string Active = "";

                    for (int j = 0; j < lst.Count; j++)
                    {
                        if (lst[j].TceUser)
                            TceUser = "مشترک مخابرات";
                        else
                            TceUser = "-";

                        if (lst[j].TceUser)
                            Active = "فعال";
                        else
                            Active = "غیرفعال";


                        HttpContext.Current.Response.Write("<TR>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].CustomerName);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].CustomerLastName);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].Os);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].CustomerId);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].CustomerEmail);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].CustomerMobile);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].FavoriteContent);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].RegisterDate);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(lst[j].RegisterTime);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(TceUser);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("<Td>");
                        HttpContext.Current.Response.Write(Active);
                        HttpContext.Current.Response.Write("</Td>");

                        HttpContext.Current.Response.Write("</TR>");

                    }

                    HttpContext.Current.Response.Write("</Table>");
                    HttpContext.Current.Response.Write("</font>");
                    HttpContext.Current.Response.Flush();
                    HttpContext.Current.Response.Close();

                }
                catch (Exception ex)
                {
                }
            }
        }



    }
}