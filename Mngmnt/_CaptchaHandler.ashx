<%@ WebHandler Language="C#" Class="CaptchaHandler" %>

using System;
using System.Drawing.Drawing2D;
using System.Web;
using System.Drawing;
using System.Drawing.Imaging;
using System.Web.SessionState;

public class CaptchaHandler : IHttpHandler, IRequiresSessionState
{

    public void ProcessRequest(HttpContext context)
    {
        Bitmap NewBitmap = new Bitmap(130, 42, PixelFormat.Format32bppArgb);
        Graphics NewGraphics = Graphics.FromImage(NewBitmap);
        Rectangle NewRectangle = new Rectangle(0, 0, 130, 42);
        Pen pen = new Pen(Color.White, 2);
        pen.Alignment = PenAlignment.Inset; //<-- this
        //NewGraphics.DrawRectangle(pen, NewRectangle);
        NewGraphics.FillRectangle(Brushes.White, NewRectangle);

        Random random = new Random();
        String drawCaptchaString = string.Empty;
        int length = 5;
        for (int i = 0; i < length; i++)
        {
            if (random.Next(0, 3) == 0)
            {
                drawCaptchaString += ((char)random.Next(48, 57)).ToString();
            }
            else
            {
                drawCaptchaString += random.Next(0, 10);
            }
        }
        context.Session["Captcha"] = drawCaptchaString;
        Font drawCaptchaFont = new Font("Segoe Script", 20, FontStyle.Italic | FontStyle.Strikeout);
        SolidBrush drawCaptchaBrush = new SolidBrush(Color.Black);
        PointF Point = new PointF(15, 10);
        NewGraphics.DrawRectangle(pen, NewRectangle);
        NewGraphics.DrawString(drawCaptchaString, drawCaptchaFont, drawCaptchaBrush, Point);
        NewBitmap.Save(context.Response.OutputStream, ImageFormat.Jpeg);
        context.Response.ContentType = "image/jpeg";
        context.Response.End();

    }

    public bool IsReusable
    {
        get
        {
            return false;
        }
    }

}