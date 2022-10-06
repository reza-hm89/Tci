<%@ Page Title="" Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="sendMessage.aspx.cs" Inherits="SendMessage" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="js/app/SendMessage.js"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" runat="Server">
    <div class="main payam">

        <div class="bread-bar">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 bread">
                        <a class="b1" href='#'>صفحه اصلی</a>&nbsp;<font
                            color='#ff9800'>&gt;</font>&nbsp;<font color='#ff9800'>فرم ارسال پیام</font>&nbsp;
                   
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 ptit">
                        <h1><i class="icon-send"></i>
                            فرم ارسال پیام
                        </h1>
                    </div>
                </div>
            </div>
        </div>

        <div class="">
            <div class="container">
                <div class="row">
                    <div class="col-md-9 col-sm-9 sqfw">
                        <div class="sqfdesc">
                            <h3>فرم ارسال پرسش</h3>
                            <p>
                                پرسش‌های خود درباره سرویس‌های شرکت مخابرات استان خراسان شمالی از طریق فرم زیر برای ما ارسال
                                کنید تا کارشناسان ما درسریعترین زمان ممکن به آن‌ها پاسخ دهند.
                            </p>
                        </div>
                        <div class="sqfalert">پرکردن مواردی که با علامت <span>*</span> مشخص شده‌اند الزامی است.</div>

                        <div id="SendMessagePanel" class="sqff">
                            <font style='font-size: 1px;'>&nbsp;</font>
                            <div id="PrintArea">
                                <div id="tempDiv" style="display: none"></div>

                                <input
                                    name='aform' value='add' type='hidden' /><input name='rc'
                                        value='2BAJWRYXAG8Y8T6T'
                                        type='hidden' /><input type="hidden"
                                            name="duration"
                                            id="duration"
                                            value="0" />
                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-6">
                                            <label>نام *</label>
                                            <input id="txtName" class="form-control InputRequire" uname="نام" valid2="Disabled"
                                                valid1="required" fieldt="string" size="50" value=""
                                                maxlength="100" name="firstname2" id="firstname2" dir="rtl" /><span
                                                    style="color: red">*</span>
                                        </div>
                                        <div class="col-md-6">
                                            <label>نام خانوادگی *</label>
                                            <input id="txtFamily" class="form-control InputRequire" uname="نام خانوادگی" valid2="Disabled"
                                                valid1="required" fieldt="string" size="50" value=""
                                                maxlength="150" name="lastname" id="lastname" dir="rtl"><span
                                                    style="color: red" />*
                                           
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-6">
                                            <label>شماره تلفن *</label>
                                            <input id="txtMobile" class="form-control InputRequire" valid2="Disabled" valid1="Disabled"
                                                fieldt="string" size="40" value="" maxlength="40" name="tel"
                                                id="tel" dir="rtl" />
                                        </div>
                                        <div class="col-md-6">
                                            <label>رایانامه *</label>
                                            <input id="txtEmail" class="form-control InputRequire" uname="ایمیل" valid2="Disabled"
                                                valid1="Disabled" fieldt="string" size="50" value=""
                                                maxlength="100" name="email" id="email" dir="ltr" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-6">
                                            <label>عنوان *</label>
                                            <input id="txtTitle" class="form-control InputRequire" uname="عنوان" valid2="Disabled"
                                                valid1="Disabled" fieldt="string" size="50" value=""
                                                maxlength="150" name="title" id="title" dir="rtl" />
                                        </div>
                                        <div class="col-md-6 sselect">
                                            <label>شاخه *</label>
                                            <select id="cmbCategory" class="form-control" relation="none" equal="text" maxlength="10"
                                                valid1="Disabled" fieldt="string" name="shakhe" id="shakhe"
                                                dir="rtl">
                                                <option value="خدمات تلفن ثابت">خدمات تلفن ثابت</option>
                                                <option value="صدور و پرداخت قبض">صدور و پرداخت قبض</option>
                                                <option value="adsl(اینترنت پر سرعت)">adsl(اینترنت پر سرعت)</option>
                                                <option value="شبکه هوشمند (IN)">شبکه هوشمند (IN)</option>
                                                <option value="IPTV">IPTV</option>
                                                <option value="پیام کوتاه">پیام کوتاه</option>
                                                <option value="سایر خدمات">سایر خدمات</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label>متن پیام شما *</label>
                                            <textarea id="txtBody" class="form-control InputRequire" maxlength="" uname="پیام"
                                                valid2="Disabled" valid1="required" fieldt="string"
                                                name="payam" id="payam" rows="7" cols="35"
                                                dir="rtl"></textarea><span style="color: red">*</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <p>
                                        <input type="hidden" class="form-control" value="0" maxlength="100"
                                            name="confi" id="confi"><br>
                                        <input type="hidden" class="form-control" value="" maxlength="0"
                                            name="tarikhtaeed" id="tarikhtaeed">
                                    </p>
                                    <p>
                                        <input type="hidden" class="form-control" value="" maxlength="0"
                                            name="tarikhjavab" id="tarikhjavab">
                                    </p>
                                </div>


<%--                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label>کد امنیتی</label>
                                            <br>
                                            <img id="capimg" alt="متن درون تصویر را در جعبه متن زیر وارد نمائید"
                                                src="images/captcha.png" width="200" height="60">&nbsp;<img height="16"
                                                    id="ch_capt"
                                                    style="cursor: pointer"
                                                    src="images/refresh.gif"
                                                    width="18"
                                                    border="0" /><br />
                                            <input id="captcha" name="capcha" id="capcha" type="text"
                                                style="width: 100px; text-transform: uppercase; text-align: left"
                                                maxlength="6" dir="ltr" /><span style="color: red">*</span>
                                        </div>
                                    </div>
                                </div>--%>
                                <div class="brb"></div>
                                <div class="row">
                                    <div class="col-md-6 mt-md">
                                        <input id="btnSendMessage" type="button" class="btn btn-primary btn-lg mb-xlg" size="21"
                                            value="ارسال پرسش" name="submit" id="submit" />
                                    </div>
                                </div>
                                <%-- </form>--%>
                                <script language='javascript'
                                    type='text/javascript'>$t = $("<label class='mt-md'>لطفا کد امنیتی بالا را در باکس زیر وارد کنید <span>*</span></label>")
                                    $t.insertBefore("#capcha");
                                    $("#capcha").addClass("form-control");
                                </script>
                            </div>
                        </div>

                        <div id="ResultPanel" class="sqff" style="display: none">
                            <font style="font-size: 1px;">&nbsp;</font>
                            <div id="PrintArea">
                                <div class="sqconf">

                                    <h3>پیام شما با موفقیت ارسال شد</h3>
                                    <p>برای پیگیری پاسخ پیام خود شماره پیگیری زیر را یادداشت نمایید و طی ۴۸ ساعت آینده از طریق بخش<a href="messageTracking.aspx"> پیگیری پاسخ </a>با وارد کردن کدپیگیری پاسخ&nbsp; را دریافت نمایید.</p>
                                </div>
                                <div class="sqcd">
                                    <p>کد پیگیری پاسخ</p>
                                    <span id="lblCode" class="sqcode"></span>
                                </div>
                            </div>
                        </div>

                        <div id="NoResultPanel" class="sqff" style="display: none">
                            <font style="font-size: 1px;">&nbsp;</font>
                            <div id="PrintArea">
                                <div class="sqconf">

                                    <h3>خطا در ارسال پیام</h3>
                                    <p>لطفا مجددا پیام خود را ارسال نمایید.</p>
                                </div>

                            </div>
                        </div>
                    </div>


                    <div class="col-md-3 col-sm-3 nopadr">
                        <!--باکس سوالات متداول-->
                        <div class="ibltit">
                            <h2><i class="icon-faq"></i>سوالات متداول</h2>
                            <div style="clear: both"></div>
                        </div>
                        <div class="iblcont faq">
                            <p>
                                آیا می‌دانستید که جواب بسیاری از پرسش‌های شما در صفحه پرسش‌های متداول درج شده است؟ برای
                                دیدن این سوالات و پاسخ آن‌ها بر روی دکمه زیر کلیک کنید.
                            </p>
                            <a class="btn btn-primary btn-md mt-md"
                                href="page.aspx?id=10005">مشاهده سوالات متداول</a>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>

