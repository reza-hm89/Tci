<%@ Page Language="C#" MasterPageFile="~/MasterPage.master" AutoEventWireup="true" CodeFile="Idea.aspx.cs" Inherits="Idea" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="Server">
    <script src="js/app/Idea.js"></script>
</asp:Content>

<asp:Content ID="Content3" ContentPlaceHolderID="ContentPlaceHolder" runat="Server">
    <div class="main payam">



        <div class="">
            <div class="container">
                <div class="row">
                    <div class="col-md-9 col-sm-9 sqfw">
                        <div class="sqfdesc">
                            <h3>فرم اولیه ثبت ایده</h3>

                        </div>
                        <div class="sqfalert">پرکردن مواردی که با علامت <span>*</span> مشخص شده‌اند الزامی است.</div>

                        <div id="SendMessagePanel" class="sqff">
                            <font style='font-size: 1px;'>&nbsp;</font>
                            <div id="PrintArea">
                                <div id="tempDiv" style="display: none"></div>

                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label>عنوان اختراع/ نوآوری/ ایده: *</label>
                                            <input id="txtTitle" type="text" class="form-control InputRequire" dir="rtl" />
                                            <span style="color: red">*</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-6">
                                            <label>نام و نام خانوادگی *</label>
                                            <input id="txtName" type="text" class="form-control InputRequire" dir="rtl" /><span
                                                style="color: red">*</span>
                                        </div>
                                        <div class="col-md-6">
                                            <label>همراه *</label>
                                            <input id="txtMobile" type="number" maxlength="11" minlength="11"
                                                class="form-control InputRequire" dir="rtl" /><span
                                                    style="color: red" />*
                                           
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-6">
                                            <label>شماره تلفن *</label>
                                            <input id="txtTel" type="text" class="form-control InputRequire" dir="rtl" />
                                        </div>
                                        <div class="col-md-6">
                                            <label>پست الکتروویک *</label>
                                            <input id="txtEmail" type="email" class="form-control InputRequire" dir="ltr" />
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-6">
                                            <label>نام ایده به فارسی *</label>
                                            <input id="txtIdea" type="text" class="form-control InputRequire" dir="rtl" />
                                        </div>
                                        <div class="col-md-6 sselect">
                                            <label>نوآوری شما در کدام حوزه قرار دارد؟ *</label>
                                            <br/>
                                            <label for="chk1">نوآوری در محصول</label>
                                            <input id="chk1" type="checkbox" />
                                            <label for="chk2">نوآوری در فرآیند</label>
                                            <input id="chk2" type="checkbox" />
                                            <label for="chk3">نوآوری در عملکرد</label>
                                            <input id="chk3" type="checkbox" />
                                        </div>
                                    </div>
                                </div>

                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label>شرح کامل ایده - بیان مسئله و ضرورت انجام كار *</label>
                                            <textarea id="txtDescription" class="form-control InputRequire" rows="7" cols="35"
                                                dir="rtl"></textarea><span style="color: red">*</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="form-group">
                                        <div class="col-md-12">
                                            <label>مزیتهای ایده *</label>
                                            <textarea id="txtAdvantage" class="form-control InputRequire" rows="4" cols="35"
                                                dir="rtl"></textarea><span style="color: red">*</span>
                                        </div>
                                    </div>
                                </div>


                                <div class="brb"></div>
                                <div class="row">
                                    <div class="col-md-6 mt-md">
                                        <input id="btnSendMessage" type="button" class="btn btn-primary btn-lg mb-xlg" size="21"
                                            value="ارسال " name="submit" id="submit" />
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div id="ResultPanel" class="sqff" style="display: none">
                            <font style="font-size: 1px;">&nbsp;</font>
                            <div id="PrintArea1">
                                <div class="sqconf">

                                    <h3>اطلاعات شما با موفقیت ارسال شد</h3>

                                </div>
                                <div class="sqcd">
                                    <p>کد پیگیری </p>
                                    <span id="lblCode" class="sqcode"></span>
                                </div>
                            </div>
                        </div>

                        <div id="NoResultPanel" class="sqff" style="display: none">
                            <font style="font-size: 1px;">&nbsp;</font>
                            <div id="PrintArea2">
                                <div class="sqconf">

                                    <h3>خطا در ارسال اطلاعات</h3>
                                    <p>لطفا مجددا اطلاعات خود را ارسال نمایید.</p>
                                </div>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>

