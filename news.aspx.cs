using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;


public partial class news : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        if (Request.QueryString["id"] != null)
            //ShowNews(Int64.Parse(Decrypt(HttpUtility.UrlDecode(Request.QueryString["id"]))));
            ShowNews(Int64.Parse(Request.QueryString["id"]));

    }

    public void ShowNews(long id)
    {
        try
        {
            var newsClass = new NewsClassSite();
            var newsEntity = newsClass.SelectOneForWeb(id);

            var viewNumber = newsEntity.NumberOfView + 1;
            newsClass.UpdateViewNumber(id, viewNumber);

            BLL.MaftooxCalendar.MaftooxPersianCalendar.DateWork prd = new BLL.MaftooxCalendar.MaftooxPersianCalendar.DateWork();
            DateTime dt1 = newsEntity.PublishDate;
            prd.Upate(dt1);
            string date = prd.GetNameDayInMonth() + "   " + prd.GetNumberDayInMonth().ToString() + "   " + prd.GetNameMonth() + "  " + prd.GetNumberYear().ToString() + " - " + newsEntity.PublishTime;

            newsTitr.InnerText = newsEntity.Titr;
            newsTitr2.InnerText = newsEntity.Titr;
            newsRoTitlr.InnerText = newsEntity.RoTitr;
            newsZirTitr.InnerText = newsEntity.ZirTitr;
            newsBody.InnerHtml = newsEntity.Body;
            if (!string.IsNullOrEmpty(newsEntity.Image))
                newsImage.Src = "Mngmnt/images/" + newsEntity.Image;
            else
                newsImage.Src = "Mngmnt/images/newsImg.jpg";
            Page.Title = newsEntity.Titr;

            txtDetail.InnerHtml= @" <font name='mc1' id='mc1' style='FONT-SIZE: 10pt'
                                                      face = 'Tahoma' ><br><span
                                                      dir = 'ltr' > " + date + " </span> " +
                                                      // "&nbsp;&nbsp;&nbsp - " + "&nbsp;&nbsp;&nbsp" + newsEntity.PublishTime 
                                                      "&nbsp;&nbsp;&nbsp / &nbsp;&nbsp;&nbsp" + @"عدد :" 
                                                      + newsEntity.Id + "&nbsp;&nbsp;&nbsp / &nbsp;&nbsp;&nbsp" + "تعداد نمایش : " + viewNumber + "</font>";
        }
        catch (Exception ex)
        {
        }
    }

    private string Decrypt(string cipherText)
    {
        string EncryptionKey = "MAKV2SPBNI99212";
        cipherText = cipherText.Replace(" ", "+");
        byte[] cipherBytes = Convert.FromBase64String(cipherText);
        using (Aes encryptor = Aes.Create())
        {
            Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(EncryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
            encryptor.Key = pdb.GetBytes(32);
            encryptor.IV = pdb.GetBytes(16);
            using (MemoryStream ms = new MemoryStream())
            {
                using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                {
                    cs.Write(cipherBytes, 0, cipherBytes.Length);
                    cs.Close();
                }
                cipherText = Encoding.Unicode.GetString(ms.ToArray());
            }
        }
        return cipherText;
    }
}