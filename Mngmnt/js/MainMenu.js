var UserPermission = [];
var ModuleID = -1;
var ModulePermission = [];
var editRow = '';
var deleteRow = '';
var extraRow = '';

$(document).ready(function () {

    // load module after permission is loaded

    ModulePermission.Insert = ModulePermission.Update = ModulePermission.Delete = ModulePermission.Show = true;;

    BindUser($("#userId").val());

    LoadModules();

    //GetPermissions();  

    MenuEvent();

    $('.main-navigation-menu ').on("click", "li", function () {



        if ($(this).attr("name") != null) {
            ModuleID = $(this).attr("name");

            //for (var i = 0; i < UserPermission.length; i++) {

            //    if (UserPermission[i].ModuleId == ModuleID) {
            //        ModulePermission = UserPermission[i];
            //        break;
            //    }
            //}

            editRow = deleteRow = extraRow = "";

            //CheckPermission();
        }

    });

    $('#container').on("click", "#SelectAll", function () {

        if ($(this).attr("spellcheck") == "false") {
            $(this).css({ "background-color": "gray", "border-color": "gray" });
            $(this).empty();
            $(this).append('<i class="fa fa-check-square fa fa-white"></i>');
            $(this).attr("spellcheck", "true");

            $("table input:checkbox").each(function () {

                $(this).attr("checked", true);
                $(this).parent().addClass("checked");
            });
        } else {
            $(this).css({ "background-color": "lightgray", "border-color": "lightgray" });
            $(this).empty();
            $(this).append('<i class="fa fa-square-o "></i>');
            $(this).attr("spellcheck", "false");

            $("table input:checkbox").each(function () {

                $(this).attr("checked", false);
                $(this).parent().removeClass("checked");
            });
        }


    });

    $("#txtSearchMenu").on('input', function (e) {

        var filter = $(this).val();
        $("#MenuList li").each(function () {
            if ($(this).text().search(new RegExp(filter, "i")) < 0) {
                $(this).hide();
            } else {
                $(this).show();
            }
        });

    });
});



function MenuEvent() {

    $("#MenuList").on("click", "#ModalMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Modal.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ModalListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("ModalList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#IdeaListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("IdeaList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#MapMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("GoogleMap.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#DashboardMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Dashboard.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AacOrderMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AacOrderList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AdminMessageMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AdminMessage.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AdminMessageListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AdminMessageList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AgentMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Agent.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AgentListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AgentList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AlbumMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Album.aspx", function () {
            Dropzone.discover();
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AlbumListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AlbumList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AdvertiseMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Advertise.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AdvertiseListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AdvertiseList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AdvertiseTariffMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AdvertiseTariff.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AdvertiseTariffListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AdvertiseTariffList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AuctionGroupMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AuctionGroup.aspx", function () {

            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AuctionGroupListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AuctionGroupList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AuctionMenu", function () {


        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Auction.aspx", function () {

            window.Dropzone.discover();


            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#AuctionListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("AuctionList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#BackupListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("BackupList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#CustomerMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Customer.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#CustomerListMenu", function () {

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("CustomerList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#DiscountMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Discount.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#DiscountListMenu", function () {

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("DiscountList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ErrorListMenu", function () {

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("ErrorList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#EventMenu", function () {

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Event.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#EventListMenu", function () {

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("EventList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#FactorListMenu", function () {

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("FactorList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#FactorStatusListMenu", function () {

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("FactorStatusList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#FaqMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Faq.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#FaqListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("FaqList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#FileManagementMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("FileManager.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#GrandeeProductMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("GrandeeProduct.aspx", function () {
            Dropzone.discover();
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#GrandeeProductListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("GrandeeProductList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoAdvertiseMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoAdvertise.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoAdvertiseListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoAdvertiseList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoAdvertiseReportMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoAdvertiseReport.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoPageSpaceListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoSpacePage.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoBoxListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoBoxList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoBoxPriceListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoBoxPriceList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoHolidayListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoHolidayList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoPageMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoPage.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#KhoPageListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("KhoPageList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#LanguageMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Language.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#LanguageListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("LanguageList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#LinkMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Link.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#LinkListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("LinkList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#LogListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("LogList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#MenuBiulderMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("MenuBuilder.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#MenuBiulderListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("MenuList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#MenuGroupListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("MenuGroupList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#MessageListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("MessageList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ModuleMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Module.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ModuleListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("ModuleList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#MultiLevelPercentMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("MultiLevelPercent.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#MultiLevelPercentListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("MultiLevelPercentList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#NewsMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("News.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#NewsListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("NewsList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#NewsGroupListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("NewsGroupList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#OurServiceMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("OurService.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#OurServiceListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("OurServiceList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PackageMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Package.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PackageListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PackageList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PackageAccessMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PackageAccess.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PackageAccessListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PackageAccessList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PackageGroupMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PackageGroup.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PackageGroupListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PackageGroupList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PageMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PageBuilder.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PageListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PageList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PlaceMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Place.aspx", function () {
            Dropzone.discover();
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PlaceListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PlaceList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PollMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Poll.aspx", function () {

            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PollListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PollList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ProductGroupAccessListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("ProductGroupAccessList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ProductGroupMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("ProductGroups.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ProductMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Product.aspx", function () {
            Dropzone.discover();
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ProductListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("ProductList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#QuestionMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Question.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#QuestionListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("QuestionList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#QuestionStatusMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("QuestionStatus.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#QuestionStatusListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("QuestionStatusList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#RegionMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Region.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#RegionListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("RegionList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#RequestExpertMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("RequestExpert.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#RequestExpertListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("RequestExpertList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#SettlementUserMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("SettlementUser.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#SettlementUserListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("SettlementUserList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#SettlementAdminMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("SettlementAdmin.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#SettlementListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("SettlementList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ShowWebUserFieldMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("ShowWebUserField.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#ShowWebUserFieldListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("ShowWebUserFieldList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#SlideMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Slide.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#SlideListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("SlideList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#TelegramLotteryMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("TelegramLottery.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#TelegramLotteryListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("TelegramLotteryList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#TelegramLotteryUsersMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("TelegramLotteryUsers.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#TelegramUsersMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("TelegramUsers.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#StoreSettingMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("StoreSetting.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#TagMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Tag.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#TagListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("TagList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#TameshkProductMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("TameshkProduct.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#TameshkProductListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("TameshkProductList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserAccountTypeMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserAccountType.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserAccountTypeListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserAccountTypeList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("User.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserFactorListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserFactorList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserGroupMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserGroup.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserGroupListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserGroupList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserPercentMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserPercent.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserPercentListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserPercentList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserPercentReportMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserPercentReport.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#UserChildrenReportMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserChildrenReport.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#PermissionMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("PermissionList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WalletMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WalletCharge.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WalletListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WalletList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WalletUserListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WalletUserList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WarehouseMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("Warehouse.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WarehouseListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WarehouseList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WarehouseProductMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WarehouseProduct.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WarehouseProductListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WarehouseProductList.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WebsiteSettingMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WebsiteSetting.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WebUserMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WebUser.aspx", function () {
            HideLoading2();
        });
    });

    $("#MenuList").on("click", "#WebUserListMenu", function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("WebUserList.aspx", function () {
            HideLoading2();
        });
    });

    $("#UserProfileMenu").click(function () {

        $("#container").empty();

        ShowLoading2();
        ShowLoading();

        $("#EditMode").val(false);

        $("#container").load("UserProfile.aspx", function () {
            HideLoading2();
        });
    });


    $("#DivExit").click(function () {

        ShowLoading2();
        ShowLoading();

        Logout();
    });
}

function LoadModules() {

    ShowLoading();

    $.ajax({
        type: "POST",
        url: "WebServices/ModuleWs.asmx/GetData",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            var table = '';

            var moduleArray = new Array();

            for (var i = 0; i < msg.length; i++) {

                table += msg[i].MenuContent + '\n';

                moduleArray.push(msg[i].Id);
                //for (var j = 0; j < UserPermission.length; j++) {

                //    if (msg[i].Id == UserPermission[j].ModuleId && UserPermission[j].Show == true) {
                //        table += msg[i].MenuContent + '\n';

                //        moduleArray.push(msg[i].Id);
                //    }
                //}

            }

            table += ' <li id=""><a href="#"><i class=""></i><span class="title"></span><span class="selected"></span></a></li > ';

            $('.main-navigation-menu').html(table);

            var j = 0;

            $('.main-navigation-menu li').each(function () {
                if (this.id != '' && $(this).parent().closest('ul').hasClass("sub-menu") == true) {
                    $(this).attr("name", moduleArray[j]);
                }
                if (this.id != '' && $(this).parent().closest('ul').hasClass("sub-menu") == false) {
                    $(this).attr("name", moduleArray[j++]);
                }
                if (this.id != '' && $(this).parent().closest('ul').hasClass("sub-menu") == true &&
                    $(this).is(':last-child')) {
                    j++;
                }

            });

            Main.init();

            //$("#container").load("Dashboard.aspx", function () {
            //    ShowLoading();
            //});
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {
            HideLoading();
        }
    });
}

function GetPermissions() {
    $.ajax({
        type: "POST",
        url: "WebServices/PermissionWs.asmx/CheckPermission",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            //UserPermission = msg;

            LoadModules();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function CheckPermission() {

    $.ajax({
        type: "POST",
        url: "WebServices/PermissionWs.asmx/CheckModulePermission",
        data: "{ id:'" + ModuleID + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {

            var msg = eval('(' + response.d + ')');

            if (msg == false) {
                window.location.replace("Login.aspx");
            }
        },
        complete: function () {

        }
    });
}

function CheckLogin() {

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/CheckLogin",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            if (msg == false) {
                window.location.replace("Login.aspx");
            } else {
                BindUser($("#userId").val());
            }
        },
        error: function (xhr) {
            MessageBox(5);
        }
    });
}

function Logout() {

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/Logout",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            window.location.replace("Login.aspx");

        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

            HideLoading();
        }
    });
}

function BindUser(id) {

    $.ajax({
        type: "POST",
        url: "WebServices/UserWs.asmx/BindRecordToEdit",
        data: "{id:'" + id + "'}",
        contentType: "application/json; charset=utf-8",
        datatype: "jsondata",
        async: "true",
        success: function (response) {
            var msg = eval('(' + response.d + ')');

            $(".username").text(msg[0].Name + " " + msg[0].Family);
            $("#UserProfileImage").attr("src", "images/" + msg[0].ImageUrl);

            //  GetPermissions();
        },
        error: function (xhr) {
            MessageBox(5);
        },
        complete: function () {

        }
    });
}

function ShowLoading() {

    var el = $('.panel-refresh').parents(".panel");
    el.block({
        overlayCSS: {
            backgroundColor: '#fff'
        },
        message: ' لطفا منتظر بمانید ... <br><img src="assets/images/loading.gif" />',
        css: {
            border: 'none',
            color: '#333',
            background: 'none'
        }
    });

    $(".black_overlay2").show();

    var el = $('.black_overlay2');
    el.block({
        overlayCSS: {
            backgroundColor: '#fff'
        },
        message: ' لطفا منتظر بمانید ... <br><img src="assets/images/loading.gif" />',
        css: {
            border: 'none',
            color: '#333',
            background: 'none'
        }
    });

}

function ShowLoading2() {

    $("#black-overlay").show();
}

function HideLoading() {

    var el = $('.panel-refresh').parents(".panel");
    el.unblock();

    $(".black_overlay2").hide();

    var el = $('.black_overlay2');
    el.unblock();

}

function HideLoading2() {

    $("#black-overlay").hide();
}

function MessageBox(kind) {

    switch (kind) {

        case 1:

            $("#SuccessInsert").slideDown();

            setTimeout(function () {
                $("#SuccessInsert").slideUp();
            }, 3000);
            break;
        case 2:
            $("#SuccessUpdate").slideDown();

            setTimeout(function () {
                $("#SuccessUpdate").slideUp();
            }, 3000);
            break;
        case 3:
            $("#SuccessDelete").slideDown();

            setTimeout(function () {
                $("#SuccessDelete").slideUp();
            }, 3000);
            break;
        case 4:
            $("#PasswordAlert").slideDown();

            setTimeout(function () {
                $("#PasswordAlert").slideUp();
            }, 3000);
            break;
        case 5:
            $("#ErrorAlert").slideDown();

            setTimeout(function () {
                $("#ErrorAlert").slideUp();
            }, 3000);
            break;
        case 6:
            $("#GroupAlert").slideDown();

            setTimeout(function () {
                $("#GroupAlert").slideUp();
            }, 3000);
            break;

        case 7:
            $("#UsernameAlert").slideDown();

            setTimeout(function () {
                $("#UsernameAlert").slideUp();
            }, 3000);
            break;

        case 8:
            $("#EmailAlert").slideDown();

            setTimeout(function () {
                $("#EmailAlert").slideUp();
            }, 3000);
            break;

        case 9:
            $("#PasswordLengthAlert").slideDown();

            setTimeout(function () {
                $("#PasswordLengthAlert").slideUp();
            }, 3000);
            break;
        default:
    }
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}