
if (window.location.href.indexOf("spiralsolutions")>-1) { alert("Please stop linking directly to the JS file on mattkruse.com! Please copy the JS files to your server instead!"); window.location.href="http://www.mattkruse.com/"; }
var isLeapYear = false;
var userDirection = "";

function getAnchorPosition(anchorname) {
	var useWindow=false;
	var coordinates=new Object();
	var x=0,y=0;
	var use_gebi=false, use_css=false, use_layers=false;
	if (document.getElementById) { use_gebi=true; }
	else if (document.all) { use_css=true; }
	else if (document.layers) { use_layers=true; }
	// Logic to find position
 	if (use_gebi && document.all) {
		x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
		y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
		}
	else if (use_gebi) {
		var o=document.getElementById(anchorname);
		x=AnchorPosition_getPageOffsetLeft(o);
		y=AnchorPosition_getPageOffsetTop(o);
		}
 	else if (use_css) {
		x=AnchorPosition_getPageOffsetLeft(document.all[anchorname]);
		y=AnchorPosition_getPageOffsetTop(document.all[anchorname]);
		}
	else if (use_layers) {
		var found=0;
		for (var i=0; i<document.anchors.length; i++) {
			if (document.anchors[i].name==anchorname) { found=1; break; }
			}
		if (found==0) {
			coordinates.x=0; coordinates.y=0; return coordinates;
			}
		x=document.anchors[i].x;
		y=document.anchors[i].y;
		}
	else {
		coordinates.x=0; coordinates.y=0; return coordinates;
		}
	coordinates.x=x;
	coordinates.y=y;
	return coordinates;
	}
function getAnchorWindowPosition(anchorname) {
	var coordinates=getAnchorPosition(anchorname);
	var x=0;
	var y=0;
	if (document.getElementById) {
		if (isNaN(window.screenX)) {
			x=coordinates.x-document.body.scrollLeft+window.screenLeft;
			y=coordinates.y-document.body.scrollTop+window.screenTop;
			}
		else {
			x=coordinates.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
			y=coordinates.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
			}
		}
	else if (document.all) {
		x=coordinates.x-document.body.scrollLeft+window.screenLeft;
		y=coordinates.y-document.body.scrollTop+window.screenTop;
		}
	else if (document.layers) {
		x=coordinates.x+window.screenX+(window.outerWidth-window.innerWidth)-window.pageXOffset;
		y=coordinates.y+window.screenY+(window.outerHeight-24-window.innerHeight)-window.pageYOffset;
		}
	coordinates.x=x;
	coordinates.y=y;
	return coordinates;
	}

function AnchorPosition_getPageOffsetLeft (el) {
	var ol=el.offsetLeft;
	while ((el=el.offsetParent) != null) { ol += el.offsetLeft; }
	return ol;
	}
function AnchorPosition_getWindowOffsetLeft (el) {
	return AnchorPosition_getPageOffsetLeft(el)-document.body.scrollLeft;
	}	
function AnchorPosition_getPageOffsetTop (el) {
	var ot=el.offsetTop;
	while((el=el.offsetParent) != null) { ot += el.offsetTop; }
	return ot;
	}
function AnchorPosition_getWindowOffsetTop (el) {
	return AnchorPosition_getPageOffsetTop(el)-document.body.scrollTop;
	}

var MONTH_NAMES=new Array("فروردين","ارديبهشت","خرداد","تير","مرداد","شهريور","مهر","آبان","آذر","دي","بهمن","اسفند","فروردين","ارديبهشت","خرداد","تير","مرداد","شهريور","مهر","آبان","آذر","دي","بهمن","اسفند");
//var MONTH_NAMES=new Array('ÝÑæÑÏíä','ÇÑÏíÈåÔÊ','ÎÑÏÇÏ','ÊíÑ','ãÑÏÇÏ','ÔåÑíæÑ','ãåÑ','ÂÈÇä','ÂÐÑ','Ïí','Èåãä','ÇÓÝäÏ','ÝÑæ','ÇÑÏ','ÎÑÏ','ÊíÑ','ãÑÏ','ÔåÑ','ãåÑ','ÂÈÇ','ÂÐÑ','Ïí ','Èåã','ÇÓÝ');
var DAY_NAMES=new Array("يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه");
//var DAY_NAMES=new Array('ÌãÚå','ÔäÈå','í˜ÔäÈå','ÏæÔäÈå','Óå ÔäÈå','åÇÑÔäÈå','äÌ ÔäÈå','Sun','Mon','Tue','Wed','Thu','Fri','Sat');
function LZ(x) {return(x<0||x>9?"":"0")+x}
function isDate(val,format) {
	var date=getDateFromFormat(val,format);
	if (date==0) { return false; }
	return true;
	}
function compareDates(date1,dateformat1,date2,dateformat2) {
	var d1=getDateFromFormat(date1,dateformat1);
	var d2=getDateFromFormat(date2,dateformat2);
	if (d1==0 || d2==0) {
		return -1;
		}
	else if (d1 > d2) {
		return 1;
		}
	return 0;
	}

function formatDate(date,format) {
	format=format+"";
	var result="";
	var i_format=0;
	var c="";
	var token="";
	var y=date.getYear()+"";
	var M=date.getMonth()+1;
	var d=date.getDate();
	var E=date.getDay();
	var H=date.getHours();
	var m=date.getMinutes();
	var s=date.getSeconds();
	var yyyy,yy,MMM,MM,dd,hh,h,mm,ss,ampm,HH,H,KK,K,kk,k;
	// Convert real date parts into formatted versions
	var value=new Object();
	//mon if (y.length < 4) {y=""+(y-0+1900);}
	if (y.length < 4) {y=""+(y-0+1300);}
	value["y"]=""+y;
	value["yyyy"]=y;
	value["yy"]=y.substring(2,4);
	value["M"]=M;
	value["MM"]=LZ(M);
	value["MMM"]=MONTH_NAMES[M-1];
	value["NNN"]=MONTH_NAMES[M+11];
	value["d"]=d;
	value["dd"]=LZ(d);
	value["E"]=DAY_NAMES[E+7];
	value["EE"]=DAY_NAMES[E];
	value["H"]=H;
	value["HH"]=LZ(H);
	if (H==0){value["h"]=12;}
	else if (H>12){value["h"]=H-12;}
	else {value["h"]=H;}
	value["hh"]=LZ(value["h"]);
	if (H>11){value["K"]=H-12;} else {value["K"]=H;}
	value["k"]=H+1;
	value["KK"]=LZ(value["K"]);
	value["kk"]=LZ(value["k"]);
	if (H > 11) { value["a"]="PM"; }
	else { value["a"]="AM"; }
	value["m"]=m;
	value["mm"]=LZ(m);
	value["s"]=s;
	value["ss"]=LZ(s);
	while (i_format < format.length) {
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		if (value[token] != null) { result=result + value[token]; }
		else { result=result + token; }
		}
	return result;
	}
function _isInteger(val) {
	var digits="1234567890";
	for (var i=0; i < val.length; i++) {
		if (digits.indexOf(val.charAt(i))==-1) { return false; }
		}
	return true;
	}
function _getInt(str,i,minlength,maxlength) {
	for (var x=maxlength; x>=minlength; x--) {
		var token=str.substring(i,i+x);
		if (token.length < minlength) { return null; }
		if (_isInteger(token)) { return token; }
		}
	return null;
	}
	
function getDateFromFormat(val,format) {
	val=val+"";
	format=format+"";
	var i_val=0;
	var i_format=0;
	var c="";
	var token="";
	var token2="";
	var x,y;
	var now = calcPersianDate();
	var t = new Date();
	var year=now.substring(0,4);
	var month=now.substring(5,7);
	var date=1;
	var hh=t.getHours();
	var mm=t.getMinutes();
	var ss=t.getSeconds();
	var ampm="";
	
	while (i_format < format.length) {
		// Get next token from format string
		c=format.charAt(i_format);
		token="";
		while ((format.charAt(i_format)==c) && (i_format < format.length)) {
			token += format.charAt(i_format++);
			}
		// Extract contents of value based on format token
		if (token=="yyyy" || token=="yy" || token=="y") {
			if (token=="yyyy") { x=4;y=4; }
			if (token=="yy")   { x=2;y=2; }
			if (token=="y")    { x=2;y=4; }
			year=_getInt(val,i_val,x,y);
			if (year==null) { return 0; }
			i_val += year.length;
			if (year.length==2) {
				//mon if (year > 70) { year=1900+(year-0); }
				//mon else { year=2000+(year-0); }
				//mon }
				year=1300+(year-0); 
				}
				
			}
		else if (token=="MMM"||token=="NNN"){
			month=0;
			for (var i=0; i<MONTH_NAMES.length; i++) {
				var month_name=MONTH_NAMES[i];
				if (val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()) {
					if (token=="MMM"||(token=="NNN"&&i>11)) {
						month=i+1;
						if (month>12) { month -= 12; }
						i_val += month_name.length;
						break;
						}
					}
				}
			if ((month < 1)||(month>12)){return 0;}
			}
		else if (token=="EE"||token=="E"){
			for (var i=0; i<DAY_NAMES.length; i++) {
				var day_name=DAY_NAMES[i];
				if (val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()) {
					i_val += day_name.length;
					break;
					}
				}
			}
		else if (token=="MM"||token=="M") {
			month=_getInt(val,i_val,token.length,2);
			if(month==null||(month<1)||(month>12)){return 0;}
			i_val+=month.length;}
		else if (token=="dd"||token=="d") {
			date=_getInt(val,i_val,token.length,2);
			if(date==null||(date<1)||(date>31)){return 0;}
			i_val+=date.length;}
		else if (token=="hh"||token=="h") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>12)){return 0;}
			i_val+=hh.length;}
		else if (token=="HH"||token=="H") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>23)){return 0;}
			i_val+=hh.length;}
		else if (token=="KK"||token=="K") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<0)||(hh>11)){return 0;}
			i_val+=hh.length;}
		else if (token=="kk"||token=="k") {
			hh=_getInt(val,i_val,token.length,2);
			if(hh==null||(hh<1)||(hh>24)){return 0;}
			i_val+=hh.length;hh--;}
		else if (token=="mm"||token=="m") {
			mm=_getInt(val,i_val,token.length,2);
			if(mm==null||(mm<0)||(mm>59)){return 0;}
			i_val+=mm.length;}
		else if (token=="ss"||token=="s") {
			ss=_getInt(val,i_val,token.length,2);
			if(ss==null||(ss<0)||(ss>59)){return 0;}
			i_val+=ss.length;}
		else if (token=="a") {
			if (val.substring(i_val,i_val+2).toLowerCase()=="am") {ampm="AM";}
			else if (val.substring(i_val,i_val+2).toLowerCase()=="pm") {ampm="PM";}
			else {return 0;}
			i_val+=2;}
		else {
			if (val.substring(i_val,i_val+token.length)!=token) {return 0;}
			else {i_val+=token.length;}
			}
		}

	if (i_val != val.length) { return 0; }
	if (month==12) { 
		// Check for leap year
		if ( ( (year%4==0)&&(year%100 != 0) ) || (year%400==0) ) { // leap year
			if (date > 30){ return 0; }
			}
		else { if (date > 29) { return 0; } }
		}

	if ((month==7)||(month==8)||(month==9)||(month==10)||(month==11)) {
		if (date > 30) { return 0; }
		}

	if (hh<12 && ampm=="PM") { hh=hh-0+12; }
	else if (hh>11 && ampm=="AM") { hh-=12; }
	var newdate=new Date(year,month-1,date,hh,mm,ss);
	return newdate.getTime();
	}
function parseDate(val) {
	var preferEuro=(arguments.length==2)?arguments[1]:false;
	generalFormats=new Array('y-M-d','MMM d, y','MMM d,y','y-MMM-d','d-MMM-y','MMM d');
	monthFirst=new Array('M/d/y','M-d-y','M.d.y','MMM-d','M/d','M-d');
	dateFirst =new Array('d/M/y','d-M-y','d.M.y','d-MMM','d/M','d-M');
	var checkList=new Array('generalFormats',preferEuro?'dateFirst':'monthFirst',preferEuro?'monthFirst':'dateFirst');
	var d=null;
	for (var i=0; i<checkList.length; i++) {
		var l=window[checkList[i]];
		for (var j=0; j<l.length; j++) {
			d=getDateFromFormat(val,l[j]);
			if (d!=0) { return new Date(d); }
			}
		}
	return null;
	}
function PopupWindow_getXYPosition(anchorname) {
	var coordinates;
			this.x = 0;
	this.y = 0;

	}

function PopupWindow_setSize(width,height) {
	this.width = width;
	this.height = height;
	}

function PopupWindow_populate(contents) {
	this.contents = contents;
	this.populated = false;
	}

function PopupWindow_setUrl(url) {
	this.url = url;
	}

function PopupWindow_setWindowProperties(props) {
	this.windowProperties = props;
	}
function PopupWindow_refresh() {
	if (this.divName != null) {
		// refresh the DIV object
		if (this.use_gebi) {		
			document.getElementById(this.divName).innerHTML = this.contents;
			}
		else if (this.use_css) { 
			document.all[this.divName].innerHTML = this.contents;
			}
		else if (this.use_layers) { 
			var d = document.layers[this.divName]; 
			d.document.open();
			d.document.writeln(this.contents);
			d.document.close();
			}
		}
	else {
		if (this.popupWindow != null && !this.popupWindow.closed) {
			if (this.url!="") {
				this.popupWindow.location.href=this.url;
				}
			else {
				this.popupWindow.document.open();
				this.popupWindow.document.writeln(this.contents);
				this.popupWindow.document.close();
			}
			this.popupWindow.focus();
			}
		}
	}

function PopupWindow_showPopup(anchorname) {
	this.getXYPosition(anchorname);
	this.x += this.offsetX;
	this.y += this.offsetY;
	if (!this.populated && (this.contents != "")) {
		this.populated = true;
		this.refresh();
		}

	if (this.divName != null) {
		// Show the DIV object
		if (this.use_gebi) {
			document.getElementById(this.divName).style.left = this.x + "px";
			document.getElementById(this.divName).style.top = this.y + "px";
			document.getElementById(this.divName).style.visibility = "visible";
			}
		else if (this.use_css) {
			document.all[this.divName].style.left = this.x;
			document.all[this.divName].style.top = this.y;
			document.all[this.divName].style.visibility = "visible";
			}
		else if (this.use_layers) {
			document.layers[this.divName].left = this.x;
			document.layers[this.divName].top = this.y;
			document.layers[this.divName].visibility = "visible";
			}
		}
	else {
		if (this.popupWindow == null || this.popupWindow.closed) {
			// If the popup window will go off-screen, move it so it doesn't
			if (this.x<0) { this.x=0; }
			if (this.y<0) { this.y=0; }
			if (screen && screen.availHeight) {
				if ((this.y + this.height) > screen.availHeight) {
					this.y = screen.availHeight - this.height;
					}
				}
			if (screen && screen.availWidth) {
				if ((this.x + this.width) > screen.availWidth) {
					this.x = screen.availWidth - this.width;
					}
				}
			var avoidAboutBlank = window.opera || ( document.layers && !navigator.mimeTypes['*'] ) || navigator.vendor == 'KDE' || ( document.childNodes && !document.all && !navigator.taintEnabled );
			this.popupWindow = window.open(avoidAboutBlank?"":"about:blank","window_"+anchorname,this.windowProperties+",width="+this.width+",height="+this.height+",screenX="+this.x+",left="+this.x+",screenY="+this.y+",top="+this.y+"");
			}
		this.refresh();
		}
	}
// Hide the popup
function PopupWindow_hidePopup() {
	if (this.divName != null) {
		if (this.use_gebi) {
			document.getElementById(this.divName).style.visibility = "hidden";
			}
		else if (this.use_css) {
			document.all[this.divName].style.visibility = "hidden";
			}
		else if (this.use_layers) {
			document.layers[this.divName].visibility = "hidden";
			}
		}
	else {
		if (this.popupWindow && !this.popupWindow.closed) {
			this.popupWindow.close();
			this.popupWindow = null;
			}
		}
	}

function PopupWindow_isClicked(e) {
	if (this.divName != null) {
		if (this.use_layers) {
			var clickX = e.pageX;
			var clickY = e.pageY;
			var t = document.layers[this.divName];
			if ((clickX > t.left) && (clickX < t.left+t.clip.width) && (clickY > t.top) && (clickY < t.top+t.clip.height)) {
				return true;
				}
			else { return false; }
			}
		else if (document.all) { // Need to hard-code this to trap IE for error-handling
			var t = window.event.srcElement;
			while (t.parentElement != null) {
				if (t.id==this.divName) {
					return true;
					}
				t = t.parentElement;
				}
			return false;
			}
		else if (this.use_gebi && e) {
			var t = e.originalTarget;
			while (t.parentNode != null) {
				if (t.id==this.divName) {
					return true;
					}
				t = t.parentNode;
				}
			return false;
			}
		return false;
		}
	return false;
	}


function PopupWindow_hideIfNotClicked(e) {
	if (this.autoHideEnabled && !this.isClicked(e)) {
		this.hidePopup();
		}
	}

function PopupWindow_autoHide() {
	this.autoHideEnabled = true;
	}

function PopupWindow_hidePopupWindows(e) {
	for (var i=0; i<popupWindowObjects.length; i++) {
		if (popupWindowObjects[i] != null) {
			var p = popupWindowObjects[i];
			p.hideIfNotClicked(e);
			}
		}
	}
// Run this immediately to attach the event listener
function PopupWindow_attachListener() {
	if (document.layers) {
		document.captureEvents(Event.MOUSEUP);
		}
	window.popupWindowOldEventListener = document.onmouseup;
	if (window.popupWindowOldEventListener != null) {
		document.onmouseup = new Function("window.popupWindowOldEventListener(); PopupWindow_hidePopupWindows();");
		}
	else {
		document.onmouseup = PopupWindow_hidePopupWindows;
		}
	}
function PopupWindow() {
	if (!window.popupWindowIndex) { window.popupWindowIndex = 0; }
	if (!window.popupWindowObjects) { window.popupWindowObjects = new Array(); }
	if (!window.listenerAttached) {
		window.listenerAttached = true;
		PopupWindow_attachListener();
		}
	this.index = popupWindowIndex++;
	popupWindowObjects[this.index] = this;
	this.divName = null;
	this.popupWindow = null;
	this.width=0;
	this.height=0;
	this.populated = false;
	this.visible = false;
	this.autoHideEnabled = false;
	
	this.contents = "";
	this.url="";
	this.windowProperties="toolbar=no,location=no,status=no,menubar=no,scrollbars=auto,resizable,alwaysRaised,dependent,titlebar=no";
	if (arguments.length>0) {
		this.type="DIV";
		this.divName = arguments[0];

		}
	else {
		this.type="WINDOW";
		}
	this.use_gebi = false;
	this.use_css = false;
	this.use_layers = false;
	if (document.getElementById) { this.use_gebi = true; }
	else if (document.all) { this.use_css = true; }
	else if (document.layers) { this.use_layers = true; }
	else { this.type = "WINDOW"; }
	this.offsetX = 0;
	this.offsetY = 0;
	// Method mappings
	this.getXYPosition = PopupWindow_getXYPosition;
	this.populate = PopupWindow_populate;
	this.setUrl = PopupWindow_setUrl;
	this.setWindowProperties = PopupWindow_setWindowProperties;
	this.refresh = PopupWindow_refresh;
	this.showPopup = PopupWindow_showPopup;
	this.hidePopup = PopupWindow_hidePopup;
	this.setSize = PopupWindow_setSize;
	this.isClicked = PopupWindow_isClicked;
	this.autoHide = PopupWindow_autoHide;
	this.hideIfNotClicked = PopupWindow_hideIfNotClicked;
	}
function CalendarPopup() {
	var c;
	if (arguments.length>0) {
		c = new PopupWindow(arguments[0]);
		}
	else {
		c = new PopupWindow();
		c.setSize(150,175);
		}
	c.offsetX = -152;
	c.offsetY = 25;
	//c.autoHide();
	// Calendar-specific properties
	c.monthNames = new Array("فروردين","ارديبهشت","خرداد","تير","مرداد","شهريور","مهر","آبان","آذر","دي","بهمن","اسفند");
	//c.monthNames = new Array("ÝÑæÑÏíä","ÇÑÏíÈåÔÊ","ÎÑÏÇÏ","ÊíÑ","ãÑÏÇÏ","ÔåÑíæÑ","ãåÑ","ÂÈÇä","ÂÐÑ","Ïí","Èåãä","ÇÓÝäÏ");
	c.monthAbbreviations = new Array("فروردين","ارديبهشت","خرداد","تير","مرداد","شهريور","مهر","آبان","آذر","دي","بهمن","اسفند");
	c.dayHeaders = new Array("يكشنبه","دوشنبه","سه شنبه","چهارشنبه","پنجشنبه","جمعه","شنبه");
	//c.dayHeaders = new Array("í","Ï","Ó","","","Ì","Ô");
	c.returnFunction = "CP_tmpReturnFunction";
	c.returnMonthFunction = "CP_tmpReturnMonthFunction";
	c.returnQuarterFunction = "CP_tmpReturnQuarterFunction";
	c.returnYearFunction = "CP_tmpReturnYearFunction";
    //c.userDirection = "ltr";
	c.weekStartDay = 0;
	c.isShowYearNavigation = false;
	c.displayType = "date";
	c.disabledWeekDays = new Object();
	c.disabledDatesExpression = "";
	c.yearSelectStartOffset = 2;
	c.currentDate = null;
	c.currentDate_year = 0;
	c.currentDate_month = 0;
	c.currentDate_day = 0;
	c.todayText="امروز";
	c.cssPrefix="";
	c.isShowNavigationDropdowns=false;
	c.isShowYearNavigationInput=false;
	window.CP_calendarObject = null;
	window.CP_targetInput = null;
	window.CP_dateFormat = "MM/dd/yyyy";
	// Method mappings
	c.copyMonthNamesToWindow = CP_copyMonthNamesToWindow;
	c.setReturnFunction = CP_setReturnFunction;
	c.setDirection = CP_setDirection;
	c.setReturnMonthFunction = CP_setReturnMonthFunction;
	c.setReturnQuarterFunction = CP_setReturnQuarterFunction;
	c.setReturnYearFunction = CP_setReturnYearFunction;
	c.setMonthNames = CP_setMonthNames;
	c.setMonthAbbreviations = CP_setMonthAbbreviations;
	c.setDayHeaders = CP_setDayHeaders;
	c.setWeekStartDay = CP_setWeekStartDay;
	c.setDisplayType = CP_setDisplayType;
	c.setDisabledWeekDays = CP_setDisabledWeekDays;
	c.addDisabledDates = CP_addDisabledDates;
	c.setYearSelectStartOffset = CP_setYearSelectStartOffset;
	c.setTodayText = CP_setTodayText;
	c.showYearNavigation = CP_showYearNavigation;
	c.showCalendar = CP_showCalendar;
	c.hideCalendar = CP_hideCalendar;
	c.getStyles = getCalendarStyles;
	c.refreshCalendar = CP_refreshCalendar;
	c.getCalendar = CP_getCalendar;
	c.select = CP_select;
	c.setCssPrefix = CP_setCssPrefix;
	c.showNavigationDropdowns = CP_showNavigationDropdowns;
	c.showYearNavigationInput = CP_showYearNavigationInput;
	c.copyMonthNamesToWindow();
	// Return the object
	return c;
	}
function CP_copyMonthNamesToWindow() {
	// Copy these values over to the date.js 
	if (typeof(window.MONTH_NAMES)!="undefined" && window.MONTH_NAMES!=null) {
		window.MONTH_NAMES = new Array();
		for (var i=0; i<this.monthNames.length; i++) {
			window.MONTH_NAMES[window.MONTH_NAMES.length] = this.monthNames[i];
		}
		for (var i=0; i<this.monthAbbreviations.length; i++) {
			window.MONTH_NAMES[window.MONTH_NAMES.length] = this.monthAbbreviations[i];
		}
	}
}
// Temporary default functions to be called when items clicked, so no error is thrown
function CP_tmpReturnFunction(y,m,d) { 
	if (window.CP_targetInput!=null) {
		var dt = new Date(y,m-1,d,0,0,0);
		if (window.CP_calendarObject!=null) { window.CP_calendarObject.copyMonthNamesToWindow(); }
		window.CP_targetInput.value = formatDate(dt,window.CP_dateFormat);
		}
	else {
		alert('Use setReturnFunction() to define which function will get the clicked results!'); 
		}
	}
function CP_tmpReturnMonthFunction(y,m) { 
	alert('Use setReturnMonthFunction() to define which function will get the clicked results!\nYou clicked: year='+y+' , month='+m); 
	}
function CP_tmpReturnQuarterFunction(y,q) { 
	alert('Use setReturnQuarterFunction() to define which function will get the clicked results!\nYou clicked: year='+y+' , quarter='+q); 
	}
function CP_tmpReturnYearFunction(y) { 
	alert('Use setReturnYearFunction() to define which function will get the clicked results!\nYou clicked: year='+y); 
	}

// Set the name of the functions to call to get the clicked item
function CP_setReturnFunction(name) { this.returnFunction = name; }
function CP_setReturnMonthFunction(name) { this.returnMonthFunction = name; }
function CP_setReturnQuarterFunction(name) { this.returnQuarterFunction = name; }
function CP_setReturnYearFunction(name) { this.returnYearFunction = name; }
function CP_setDirection(name){
    /*
      use this function to set the year in right or left position
      parameters is "yleft" and "yright"
      Creates by Mohammad Norouzi (1383/11/15)
    */
    userDirection = name;
}
// Over-ride the built-in month names
function CP_setMonthNames() {
	for (var i=0; i<arguments.length; i++) { this.monthNames[i] = arguments[i]; }
	this.copyMonthNamesToWindow();
	}

// Over-ride the built-in month abbreviations
function CP_setMonthAbbreviations() {
	for (var i=0; i<arguments.length; i++) { this.monthAbbreviations[i] = arguments[i]; }
	this.copyMonthNamesToWindow();
	}

// Over-ride the built-in column headers for each day
function CP_setDayHeaders() {
	for (var i=0; i<arguments.length; i++) { this.dayHeaders[i] = arguments[i]; }
	}

// Set the day of the week (0-7) that the calendar display starts on
// This is for countries other than the US whose calendar displays start on Monday(1), for example
function CP_setWeekStartDay(day) { this.weekStartDay = day; }

// Show next/last year navigation links
function CP_showYearNavigation() { this.isShowYearNavigation = (arguments.length>0)?arguments[0]:true; }

// Which type of calendar to display
function CP_setDisplayType(type) {
	if (type!="date"&&type!="week-end"&&type!="month"&&type!="quarter"&&type!="year") { alert("Invalid display type! Must be one of: date,week-end,month,quarter,year"); return false; }
	this.displayType=type;
	}


// How many years back to start by default for year display
function CP_setYearSelectStartOffset(num) { this.yearSelectStartOffset=num; }

// Set which weekdays should not be clickable
function CP_setDisabledWeekDays() {
	this.disabledWeekDays = new Object();
	for (var i=0; i<arguments.length; i++) { this.disabledWeekDays[arguments[i]] = true; }
	}
	
// Disable individual dates or ranges
// Builds an internal logical test which is run via eval() for efficiency
function CP_addDisabledDates(start, end) {
	if (arguments.length==1) { end=start; }
	if (start==null && end==null) { return; }
	if (this.disabledDatesExpression!="") { this.disabledDatesExpression+= "||"; }
	if (start!=null) { start = parseDate(start); start=""+start.getFullYear()+LZ(start.getMonth()+1)+LZ(start.getDate());}
	if (end!=null) { end=parseDate(end); end=""+end.getFullYear()+LZ(end.getMonth()+1)+LZ(end.getDate());}
	if (start==null) { this.disabledDatesExpression+="(ds<="+end+")"; }
	else if (end  ==null) { this.disabledDatesExpression+="(ds>="+start+")"; }
	else { this.disabledDatesExpression+="(ds>="+start+"&&ds<="+end+")"; }
	}
	
// Set the text to use for the "Today" link
function CP_setTodayText(text) {
	this.todayText = text;
	}

// Set the prefix to be added to all CSS classes when writing output
function CP_setCssPrefix(val) { 
	this.cssPrefix = val; 
	}

// Show the navigation as an dropdowns that can be manually changed
function CP_showNavigationDropdowns() { this.isShowNavigationDropdowns = (arguments.length>0)?arguments[0]:true; }

// Show the year navigation as an input box that can be manually changed
function CP_showYearNavigationInput() { this.isShowYearNavigationInput = (arguments.length>0)?arguments[0]:true; }

// Hide a calendar object
function CP_hideCalendar(myval) {

	
	if (cal1[myval]!=null){document.getElementById('caldes1').style.display='block';document.getElementById('caldes1').innerHTML='&nbsp;<font style:color=navy>&#9679;</font>&nbsp;' + cal1[myval]}else{document.getElementById('caldes1').style.display='none';document.getElementById('caldes1').innerHTML=""}
	if (cal2[myval]!=null){document.getElementById('caldes2').style.display='block';document.getElementById('caldes2').innerHTML='&nbsp;<font style:color=#800000>&#9679;</font>&nbsp;' +cal2[myval]}else{document.getElementById('caldes2').style.display='none';document.getElementById('caldes2').innerHTML=""}
	
	}

// Refresh the contents of the calendar display
function CP_refreshCalendar(index) {
	var calObject = window.popupWindowObjects[index];
	if (arguments.length>1) { 
		calObject.populate(calObject.getCalendar(arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]));
		}
	else {
		calObject.populate(calObject.getCalendar());
		}
	calObject.refresh();
	}

// Populate the calendar and display it
function CP_showCalendar(anchorname) {
	if (arguments.length>1) {
		if (arguments[1]==null||arguments[1]=="") {
			//this.currentDate=new Date();
			/*var n = calcPersianDate();
			this.currentDate_year = parseInt(n.toString().substring(0,4));
			this.currentDate_month = parseInt(n.toString().substring(5,7));
			this.currentDate_day = parseInt(n.toString().substring(8,10));*/
			//this.currentDate=new Date("1383","02","11",0,0,0);
			}
		else {alert("this is my alert plz look here"); 
			//this.currentDate=new Date(parseDate(arguments[1]));
			}
		}

	this.populate(this.getCalendar());
	this.showPopup(anchorname);

	}

// Simple method to interface popup calendar with a text-entry box
function CP_select(inputobj, linkname, format) {
	var selectedDate=(arguments.length>3)?arguments[3]:null;

	if (!window.getDateFromFormat) {
		alert("calendar.select: To use this method you must also include 'date.js' for date formatting");
		return;
		}
	if (this.displayType!="date"&&this.displayType!="week-end") {
		alert("calendar.select: This function can only be used with displayType 'date' or 'week-end'");
		return;
		}
	if (inputobj.type!="text" && inputobj.type!="hidden" && inputobj.type!="textarea") {
		alert("calendar.select: Input object passed is not a valid form input object");
		window.CP_targetInput=null;
		return;
		}

	if (inputobj.disabled) { return; } // Can't use calendar input on disabled form input!
	window.CP_targetInput = inputobj;
	window.CP_calendarObject = this;
	//this.currentDate=null;

	this.currentDate_year = 0;
	this.currentDate_month = 0;
	this.currentDate_day = 0;
	


	var time=0;
	if (selectedDate!=null) {
		time = getDateFromFormat(selectedDate,format)
		}
	else if (inputobj.value!="") {
		time = getDateFromFormat(inputobj.value,format);
		this.currentDate_year = parseInt(inputobj.value.substring(0,4));
		if (parseInt(inputobj.value.substring(5,7)==0))
			this.currentDate_month = parseInt(inputobj.value.substring(6,7));
		else
			this.currentDate_month = parseInt(inputobj.value.substring(5,7));				

		if (parseInt(inputobj.value.substring(8,10)==0))
			this.currentDate_day = parseInt(inputobj.value.toString().substring(9,10));
		else
			this.currentDate_day = parseInt(inputobj.value.toString().substring(8,10));
		//alert(time);
		}
	if (selectedDate!=null || inputobj.value!="") {
		if (time==0) { this.currentDate_year = 0; }
		else { 
			this.currentDate_year = parseInt(inputobj.value.toString().substring(0,4));
			if (parseInt(inputobj.value.substring(5,7))==0)
				this.currentDate_month = parseInt(inputobj.value.substring(6,7));
			else
				this.currentDate_month = parseInt(inputobj.value.substring(5,7));				

			if (parseInt(inputobj.value.substring(8,10))==0)
				this.currentDate_day = parseInt(inputobj.value.toString().substring(9,10));
			else
				this.currentDate_day = parseInt(inputobj.value.toString().substring(8,10));
			

		  }
		}
	window.CP_dateFormat = format;
	this.showCalendar(linkname);
	}
	
// Get style block needed to display the calendar correctly
function getCalendarStyles() {
	var result = "";
	var p = "";
	if (this!=null && typeof(this.cssPrefix)!="undefined" && this.cssPrefix!=null && this.cssPrefix!="") { p=this.cssPrefix; }
	result += "<STYLE>\n";
	result += "."+p+"cpYearNavigation,."+p+"cpMonthNavigation { background-color:#C0C0C0; text-align:center; vertical-align:center; text-decoration:none; color:#000000; font-weight:bold; }\n";
	result += "."+p+"cpDayColumnHeader, ."+p+"cpYearNavigation,."+p+"cpMonthNavigation,."+p+"cpCurrentMonthDate,."+p+"cpCurrentMonthDateDisabled,."+p+"cpOtherMonthDate,."+p+"cpOtherMonthDateDisabled,."+p+"cpCurrentDate,."+p+"cpCurrentDateDisabled,."+p+"cpTodayText,."+p+"cpTodayTextDisabled,."+p+"cpText { font-family:arial; font-size:8pt; }\n";
	result += "TD."+p+"cpDayColumnHeader { text-align:right; border:solid thin #C0C0C0;border-width:0 0 1 0; }\n";
	result += "."+p+"cpCurrentMonthDate, ."+p+"cpOtherMonthDate, ."+p+"cpCurrentDate  { text-align:right; text-decoration:none; }\n";
	result += "."+p+"cpCurrentMonthDateDisabled, ."+p+"cpOtherMonthDateDisabled, ."+p+"cpCurrentDateDisabled { color:#D0D0D0; text-align:right; text-decoration:line-through; }\n";
	result += "."+p+"cpCurrentMonthDate, .cpCurrentDate { color:#000000; }\n";
	result += "."+p+"cpOtherMonthDate { color:#808080; }\n";
	result += "TD."+p+"cpCurrentDate { color:white; background-color: #C0C0C0; border-width:1; border:solid thin #800000; }\n";
	result += "TD."+p+"cpCurrentDateDisabled { border-width:1; border:solid thin #FFAAAA; }\n";
	result += "TD."+p+"cpTodayText, TD."+p+"cpTodayTextDisabled { border:solid thin #C0C0C0; border-width:1 0 0 0;}\n";
	result += "A."+p+"cpTodayText, SPAN."+p+"cpTodayTextDisabled { height:20px; }\n";
	result += "A."+p+"cpTodayText { color:black; }\n";
	result += "."+p+"cpTodayTextDisabled { color:#D0D0D0; }\n";
	result += "."+p+"cpBorder { border:solid thin #808080; }\n";
	result += "</STYLE>\n";
	return result;
	}


function CP_getCalendar() {
	var now ;//= new Date();//mon ;this.currentDate=new Date("1383","02","11",0,0,0);

	now = calcPersianDate();
    
	if (this.type == "WINDOW") { var windowref = "window.opener."; }
	else { var windowref = ""; }
	var result = "";
		result += '<TABLE CLASS="'+this.cssPrefix+'cpBorder" WIDTH=100%  CELLSPACING=0 CELLPADDING=1>\n';
		result += '<TR><TD ALIGN=CENTER>\n';
		result += '<CENTER>\n';
		
	// Code for DATE display (default)
	// -------------------------------
	if (this.displayType=="date" || this.displayType=="week-end") {
		if (this.currentDate_year==0) {
		    this.currentDate_year = parseInt(now.substring(0,4));
		    
			if (parseInt(now.substring(5,7))==0)
				this.currentDate_month = parseInt(now.substring(6,7));
			else
				this.currentDate_month = parseInt(now.substring(5,7));				

			if (parseInt(now.substring(8,10))==0)
				this.currentDate_day = parseInt(now.substring(9,10));
			else
				this.currentDate_day = parseInt(now.substring(8,10));
		} 
		if (arguments.length > 0) { var month = arguments[0];}
			else { var month = this.currentDate_month;}//now.toString().substring(5,7);}//
		if (arguments.length > 1 && arguments[1]>0 && arguments[1]-0==arguments[1]) { var year = arguments[1]; }
			else { var year = this.currentDate_year; }//now.toString().substring(0,4);}//
		//mon var daysinmonth= new Array(0,31,28,31,30,31,30,31,31,30,31,30,31);
		var daysinmonth= new Array(0,31,31,31,31,31,31,30,30,30,30,30,29);
		if (isSolarLeapYear(year))
			daysinmonth[12] = 30;
		
		var ad = solar2ad(year,month,1);

		var current_month = new Date();
		
		current_month.setFullYear(parseInt(ad.substring(0,4)));
		if(ad.substring(5,7).charAt(0)=='0')
		  current_month.setMonth(parseInt(ad.substring(6,8))-1);
		else
		  current_month.setMonth(parseInt(ad.substring(5,8))-1);
		  			  
		current_month.setDate(parseInt(ad.substring(8,10)));

		var ourWeekday = current_month.getDay();
		   
		var display_year = year;
		var display_month = month;
		var display_date = 1;
		var weekday= ourWeekday;
		var offset = 0;
		
		offset = (weekday >= this.weekStartDay) ? weekday-this.weekStartDay : 7-this.weekStartDay+weekday ;
		if (offset > 0) {
			display_month--;
			if (display_month < 1) { display_month = 12; display_year--; }
			display_date = daysinmonth[display_month]-offset+1;
			} 
		var next_month = parseInt(month)+1;
		var next_month_year = parseInt(year);
		if (next_month > 12) { next_month=1; next_month_year++; }
		var last_month = month-1;
		var last_month_year = year;
		if (last_month < 1) { last_month=12; last_month_year--; }
		var date_class;

			result += "<div class='navi'><TABLE WIDTH=200 height=26 BORDER=0 BORDERWIDTH=0 CELLSPACING=0 CELLPADDING=0 class='myfonts'>";
			
		result += '<TR>\n';
		var refresh = windowref+'CP_refreshCalendar';
		var refreshLink = 'javascript:' + refresh;
			
result += '<TD CLASS="'+this.cssPrefix+'cpMonthNavigation" WIDTH="50"><A CLASS="'+this.cssPrefix+'cpTodayText" HREF="javascript:'+windowref+'CP_refreshCalendar('+this.index+','+now.toString().substring(5,7)+','+now.toString().substring(0,4)+');'+windowref+this.returnFunction+'(\''+now.toString().substring(0,4)+'\',\''+now.toString().substring(5,7)+'\',\''+now.toString().substring(8,10)+'\');'+windowref+'CP_hideCalendar(\''+now.toString().substring(0,4)+''+now.toString().substring(5,7)+''+now.toString().substring(8,10)+'\');">'+this.todayText+'</A>&nbsp;&nbsp;&nbsp;</TD>';			
				result += '<TD CLASS="'+this.cssPrefix+'cpMonthNavigation" WIDTH="10"><A CLASS="'+this.cssPrefix+'cpMonthNavigation" HREF="'+refreshLink+'('+this.index+','+last_month+','+last_month_year+');">&lt;</A></TD>';
				result += '<TD CLASS="'+this.cssPrefix+'cpMonthNavigation" WIDTH="58"><SPAN CLASS="'+this.cssPrefix+'cpMonthNavigation">'+this.monthNames[month-1]+'</SPAN></TD>';
				result += '<TD CLASS="'+this.cssPrefix+'cpMonthNavigation" WIDTH="10"><A CLASS="'+this.cssPrefix+'cpMonthNavigation" HREF="'+refreshLink+'('+this.index+','+next_month+','+next_month_year+');">&gt;</A></TD>';
				result += '<TD CLASS="'+this.cssPrefix+'cpMonthNavigation" WIDTH="10">&nbsp;</TD>';

				result += '<TD CLASS="'+this.cssPrefix+'cpYearNavigation" WIDTH="10"><A CLASS="'+this.cssPrefix+'cpYearNavigation" HREF="'+refreshLink+'('+this.index+','+month+','+(year-1)+');">&lt;</A></TD>';
				if (this.isShowYearNavigationInput) {
					result += '<TD CLASS="'+this.cssPrefix+'cpYearNavigation" WIDTH="36"><INPUT NAME="cpYear" CLASS="'+this.cssPrefix+'cpYearNavigation" SIZE="4" MAXLENGTH="4" VALUE="'+year+'" onBlur="'+refresh+'('+this.index+','+month+',this.value-0);"></TD>';
					}
				else {
					result += '<TD CLASS="'+this.cssPrefix+'cpYearNavigation" WIDTH="36"><SPAN CLASS="'+this.cssPrefix+'cpYearNavigation">'+year+'</SPAN></TD>';
					}
				result += '<TD CLASS="'+this.cssPrefix+'cpYearNavigation" WIDTH="10"><A CLASS="'+this.cssPrefix+'cpYearNavigation" HREF="'+refreshLink+'('+this.index+','+month+','+(year+1)+');">&gt;</A></TD>';
				
			
		result += '</TR></TABLE><div>\n';
		result += '<TABLE WIDTH=100% BORDER=0 CELLSPACING=0 CELLPADDING=1 ALIGN=CENTER  class="myfonts">\n';
		result += '<TR>\n';
		for (var j=0; j<7; j++) {

			result += '<TD CLASS="'+this.cssPrefix+'cpDayCH" WIDTH="14%">'+this.dayHeaders[(this.weekStartDay+j)%7]+'</TD>\n';
			}
		result += '</TR>\n';
		for (var row=1; row<=6; row++) {
			result += '<TR>\n';
			for (var col=1; col<=7; col++) {
				var disabled=false;
				if (this.disabledDatesExpression!="") {
					var ds=""+display_year+LZ(display_month)+LZ(display_date);
					eval("disabled=("+this.disabledDatesExpression+")");
					}
				var dateClass = "";
myindate=	''+	display_year + settwoo(display_month) + settwoo(display_date);						
				var isholyday=1;
				if (holydays.indexOf(','+myindate+',')>0){isholyday=2}
				if (col==7){isholyday=2;}				
				
				
				if ((display_month == this.currentDate_month) && (display_date==this.currentDate_day) && (display_year==this.currentDate_year)) {
								if (isholyday==1){dateClass = "cpCurrentDate"}else{dateClass = "cpCurrentDateH"};
					}
				else if (display_month == month) {
								if (isholyday==1){dateClass = "cpCurrentMonthDate";}else{dateClass = "cpCurrentMonthDateH";}
					}
				else {
					dateClass = "cpOtherMonthDate";
					}
				if (disabled || this.disabledWeekDays[col-1]) {
					result += '	<TD CLASS="'+this.cssPrefix+dateClass+'"  ><SPAN CLASS="'+this.cssPrefix+dateClass+'Disabled">'+display_date+'</SPAN></TD>\n';
					}
				else {
					var selected_date = display_date;
					var selected_month = display_month;
					var selected_year = display_year;
					if (this.displayType=="week-end") {
						var d;
						d.year = selected_year;
						d.month = selected_month;
						d.day = selected_date;//new Date(selected_year,selected_month-1,selected_date,0,0,0,0);
						d.day = (d.day + (7-col));
						selected_year = d.year;
						//if (selected_year < 1000) { selected_year += 1300; }
						if (selected_year < 100) { selected_year += 1300; }
						selected_month = d.month;
						selected_date = d.day;
						}
						
	
var myindatediv;
var myindatediv2;
if (cal1[myindate]!=null && display_month == month){myindatediv='<div class="syscalender" onmouseover="pop(\''+cal1[myindate]+'\')"  onmouseout ="kill()" ></div>';if (cal2[myindate]!=null && display_month == month){myindatediv2='<div class="usercalender2" onmouseover="pop(\''+cal2[myindate]+'\')"  onmouseout ="kill()" ></div>'}else{myindatediv2=''}}else{myindatediv='';if (cal2[myindate]!=null){myindatediv2='<div class="usercalender" onmouseover="pop(\''+cal2[myindate]+'\')"  onmouseout ="kill()" ></div>'}else{myindatediv2=''}}


if (display_month == month) {
mylink='javascript:'+windowref+this.returnFunction+'('+selected_year+','+selected_month+','+selected_date+');'+windowref+'CP_hideCalendar(\''+myindate+'\');'
}else
{mylink='javascript:';}
					result += '	<TD CLASS="'+this.cssPrefix+dateClass+'"    onmouseover="hi(this)" onmouseout="dhi(this)" onclick="' + mylink + '">'+myindatediv+myindatediv2+'<A HREF="' + mylink + '" CLASS="'+this.cssPrefix+dateClass+'">'+display_date+'</A></TD>\n';
					}
				display_date++;
				if (display_date > daysinmonth[display_month]) {
					display_date=1;
					display_month++;
					}
				if (display_month > 12) {
					display_month=1;
					display_year++;
					}
				}
			result += '</TR>';
			}
		var current_weekday = parseInt(now.toString().substring(8,10)) - this.weekStartDay;
		if (current_weekday < 0) {
			current_weekday += 7;
			}
		result += '<TR>\n';
		result += '	<TD COLSPAN=7 ALIGN=CENTER CLASS="'+this.cssPrefix+'cpTodayText">\n';
		if (this.disabledDatesExpression!="") {
			var ds=""+now.toString().substring(0,4)+LZ(parseInt(now.toString().substring(5,7)))+LZ(parseInt(now.toString().substring(8,10)));
			eval("disabled=("+this.disabledDatesExpression+")");
			}
		result += '		';
		result += '</TD></TR></TABLE></CENTER></TD></TR></TABLE><div id="caldes1" name="caldes1"  class="caldes1"></div><div id="caldes2" name="caldes2"  class="caldes2"></div>\n';
	}
		
	


	return result;

	//CP_hideCalendar(''+this.currentDate_year+''+this.currentDate_month+''+this.currentDate_day);
	
	}	
//--------------------
function returnMyFormat(y,m,d){
    //This function return date in persian format
    var mn;
    var dy;
    if (m < 10 && m.toString().length < 2)
		mn = "0" + m.toString();
	else
	    mn = m.toString();	

    if (d < 10 && d.toString().length < 2)
		dy = "0" + d.toString();
	else
		dy = d.toString();

	if (window.CP_targetInput!=null) {
		if (window.CP_calendarObject!=null) { window.CP_calendarObject.copyMonthNamesToWindow(); }
		if(userDirection == "yleft"){
		    window.CP_targetInput.value = y+"/"+mn+"/"+dy;//formatDate(dt,window.CP_dateFormat);
		}else if(userDirection == "yright"){
		    window.CP_targetInput.value = dy+"/"+mn+"/"+y;
		}else{
            window.CP_targetInput.value = y+"/"+mn+"/"+dy;
        }
	}
	else {
		alert('Use setReturnFunction() to define which function will get the clicked results!'); 
		}
}
function calcPersianDate(){

  var cda_day;
  var cda_mon;
  var cda_year;
  var nda_day;
  var nda_mon;
  var nda_year;

  var temp_date;
  var year_c;
  var mon_c;
  var day_c;
  var gcoup_date;
  var flag1;
  var flag2;
  var temp1;
  var temp2;
  var base;
  var indx;
  var d_end;
  var d_min;
  var today = new Date();

  if (arguments.length > 1){ 
	cda_year = arguments[0];
	cda_mon = arguments[1];
	cda_day = arguments[2];
  }
  else{
	cda_mon  = today.getMonth()+1;
	cda_year = today.getFullYear();
	cda_day  = today.getDate();	
  }
  //     determine Anno Domini leap year
  if (cda_year%100 ==0){
    if (cda_year%400==0){ 
      flag1=1;
      isLeapYear = true;
    }  
    else{
      flag1=0;     
      isLeapYear = false;
    }  
  }
  else{
    if (cda_year%4==0){
      isLeapYear = true;
      flag1=1;
    }  
    else{
      flag1=0;
      isLeapYear = false;
    }
  }
  //     determine Anno Domini leap year
  //     determine solar leap year
  base=cda_year-622;
  if((base+16)%33 == 0)
    temp1=(base+16)/33;
  else
    temp1=((base+16+(33-((base+16)%33)))/33)-1;
  temp2=temp1*33-16;
  if ((temp2+1)==base)
    flag2=0;
  else {
      if((base+15)%33 == 0)
        temp1=(base+15)/33;
      else
        temp1=((base+15+(33-((base+15)%33)))/33)-1;
    temp2=base-temp1-17;
    if ((temp2%4)==0){
      flag2=1;
      //isLeapYear = true;
    }  
    else{
      flag2=0;
      //isLeapYear = false;
    }  
  }
  // end  determine solar leap year

  if (flag1==1){
    if (flag2==1)
      indx=4;
    else
      indx=1;
  }    
  else{
    if (flag2==1)
      indx=2;
    else
	indx=3;
  }
  // determin first day Anno Domini
  d_min=0;
  if (cda_mon==1 || cda_mon==2){
    if (indx!=2)
      d_min=10+cda_mon;
    else
      d_min=10+cda_mon+1;
  }
  if(cda_mon==3){
    if (indx==3)
      d_min=10;
    else
      d_min=11;
  }
  if(d_min==0){
    if(cda_mon==4)
      base=12;
    else if(cda_mon==5 || cda_mon==6)
      base=11;
    else if(cda_mon==10)
      base=9;
    else
      base=10;
    if(indx!=1)
      d_min=base;
    else
      d_min=base+1;
  }
  // end  determin first day Anno Domini

  //     determine end day solar
  d_end=0;
  if(cda_mon==1 || cda_mon==2){
    if(indx==2)
      d_end=20-cda_mon;
    else
      d_end=20-cda_mon+1;
  }	
  if(d_end==0){
    if(cda_mon==5 ||cda_mon==6 || cda_mon==11||cda_mon==12){
      base=20;
    }  
    else if(cda_mon==7 ||cda_mon==8 ||cda_mon==9 ||cda_mon==10){
      base=21;
    }  
    else if(cda_mon==3 || cda_mon==4){
      base=19;
    }  
    if(indx==1)
      d_end=base;
    else
      d_end=base+1;
  }
  // end  determine end day solar
  if(cda_day <= d_end){
    nda_day=cda_day+d_min-1;
    nda_mon=((cda_mon+8)%12)+1;
    flag1=1;
  }
  else {
    nda_day=cda_day-d_end;
    nda_mon=((cda_mon+9)%12)+1;
    flag1=2;
  }
  if( (cda_mon > 3) || (cda_mon==3 && flag1==2))
    nda_year=cda_year-621;
  else
    nda_year=cda_year-622;

  year_c = nda_year.toString();//SUBSTR(TO_CHAR(new_date.da_year),1,4);
  day_c = nda_day.toString();
  if(day_c.toString().length==1){//substring(1,2)==" ")
    day_c = "0" + day_c.toString();//day_c.substring(0,1);
  }

  mon_c = nda_mon.toString();
  if(mon_c.toString().length ==1)
    mon_c="0" + mon_c.toString();
  
  gcoup_date =year_c + "/" + mon_c +"/" +day_c;

  
  var ndate = new Date();
  
  ndate.setFullYear(year_c);
  ndate.setMonth(mon_c-1);
  ndate.setDate(day_c);
  
  return gcoup_date;
}

//***************************************************************************
//chack if the year is leap year for solar dates
function isSolarLeapYear(y){
var Temp1;
var Temp2;

if (y == 474)
	return true;

if(y < 474)
	Temp1 = y + 42;
else
	Temp1 = y + 38;

Temp2 = Temp1%128;
if(Temp2 == 0)
	return true;

if(Temp2 <= 30){
	if((Temp2%4) == 1 && Temp2 != 1)
		return true;
}		
else if(Temp2<=63){
	if((Temp2%4) == 2)
		return true;
}		
else if (Temp2<=96){
	if((Temp2%4) == 3)
		return true;
}		
else{
	if((Temp2%4) == 0)
		return true;
}
return false;
}
//*********************************************
// check if the year is leap year
function isADLeapYear(y){
var yr = parseInt(y);
if((yr%100) == 0){
	if((yr%400) == 0)
		return true;
	else
		return false;
}		
else{
	if(yr%4 == 0)
		return true;
	else
		return false;
}		
}
//******************************************
// no comment
function setIndex(Flag1,Flag2){
var Idx=0;

if (Flag1){
	if(Flag2)
		Idx = 4;
	else
		Idx = 1;
}		
else{
	if(Flag2) 
		Idx = 2;
	else
		Idx = 3;
}
return Idx;
}
//****************************************
// converting a solar date to anno dommini date
function solar2ad(y,m,d){
var Flag2_C = false;
var Flag1_C = false;
var Out_Date;
var AD_First_Day;
var AD_Year;
var AD_First;
var Idx1;
var D;
var Idx2;
var In_Date;
var Flag2_L = false;;
var Idx;
var Flag1_N = false;
var Month_Flag = 0;
var P;
var Base;
var Out_Date_Day;
var Out_Date_Month;
var Out_Date_Year;

//alert(y.toString()+"/"+m.toString()+"/"+d.toString());
var In_Date_Day = parseInt(d);
var In_Date_Month = parseInt(m);
var In_Date_Year = parseInt(y);

Flag2_C = isSolarLeapYear(In_Date_Year);
Flag2_L = isSolarLeapYear(In_Date_Year - 1);

AD_Year = In_Date_Year + 621;

Flag1_C = isADLeapYear(AD_Year);
Flag1_N = isADLeapYear(AD_Year + 1);

AD_First = AD2Solar(AD_Year+1,1,1);

AD_First_Day = parseInt(AD_First.substring(8,10));

if( 1 <= In_Date_Month && In_Date_Month <= 9) {
	Idx = setIndex(Flag1_C, Flag2_L);
}
else if(In_Date_Month ==11 ||In_Date_Month == 12)
	Idx = setIndex(Flag1_N, Flag2_C);
else { 
	Idx1 = setIndex(Flag1_C, Flag2_L);
	Idx2 = setIndex(Flag1_N, Flag2_C);
	if( In_Date_Day < AD_First_Day)
		Idx = Idx1;
	else
		Idx = Idx2;
}

// Determin first day solar year
if( In_Date_Month == 11 ||In_Date_Month == 12){
	if( Idx == 2 )
		D = 31 - In_Date_Month;
	else
		D = 32 - In_Date_Month;
}		
else if( 5 <= In_Date_Month  && In_Date_Month <=8 ){	
	if( Idx == 1)
		D = 22;
	else 
		D = 23;
}
else if( In_Date_Month == 3||In_Date_Month== 4||In_Date_Month== 9){
	if( Idx == 1)
		D = 21;
	else
		D = 22;
}		
else if( In_Date_Month == 10){
	if( Idx == Idx1 )
		if(Idx == 1)
			D = 21;
		else
			D = 22;
	else{
		if( Idx1 == 1 ||Idx1== 4)
			D = 22;
		else{
			if( Idx2 == 1)
				D = 21;
			else
				D = 22;
		}
	}			
}
else if( In_Date_Month == 1 || In_Date_Month == 2){
	if( Idx == 1 )
		D = 20;
	else
		D = 21;
}		
//	End determin first day Solar year

//	Determine end day Anno Domini

if( In_Date_Month == 4||In_Date_Month == 5||In_Date_Month == 6||In_Date_Month == 8||In_Date_Month == 9){
	if( Idx == 1)
		P = 10;
	else 
		P = 9;
}		
else if( In_Date_Month == 2||In_Date_Month == 3){
	if( Idx == 1)
		P = 11;
	else
		P = 10;
}		
else if( In_Date_Month ==10)
	P = AD_First_Day -1;
else if( In_Date_Month == 1||In_Date_Month == 7){
	if( Idx == 1 )
		P = 12 - In_Date_Month/2;
	else 
		P = 11 - In_Date_Month/2;
}		
else if( In_Date_Month == 11){
	if( Idx == 2)
		P = 12;
	else
		P = 11;
}		
else if( In_Date_Month == 12){
	if( Idx == 3)
		P = 9;
	else
		P = 10;
}		
//	End determine end day Anno Domini

if( In_Date_Day <= P){
	Out_Date_Day = In_Date_Day + D - 1;
	Out_Date_Month = ((In_Date_Month + 1)%12) + 1;
	Month_Flag = 1;
}	
else{
	Out_Date_Day = In_Date_Day - P;
	Out_Date_Month = ((In_Date_Month + 2)%12) + 1;
	Month_Flag = 2;
}

if( In_Date_Month > 10 || (In_Date_Month == 10 && Month_Flag == 2))
	Out_Date_Year = In_Date_Year + 622;
else
	Out_Date_Year = In_Date_Year + 621;
//alert(In_Date_Year+"/"+In_Date_Month+"/"+In_Date_Day);
if (Out_Date_Day < 10)
   var dy = "0"+Out_Date_Day.toString();
else
   var dy = Out_Date_Day.toString();
   
if (Out_Date_Month < 10)
   var mn = "0"+Out_Date_Month.toString();
else
   var mn = Out_Date_Month.toString();

return Out_Date_Year+"/"+mn+"/"+dy;
}
//************************************
function AD2Solar(y,m,d){
var Idx; 
var Base;
var D_End;
var Flag1 = false;
var Month_Flag;
var Flag2 = false;
var D_Min;

var In_Date_Day  = parseInt(d);
var In_Date_Month  = parseInt(m);
var In_Date_Year = parseInt(y);

var Out_Date_Day;
var Out_Date_Month;
var Out_Date_Year;

//	Determine Anno Domini leap year
Flag1 = isADLeapYear(In_Date_Year);

Base = In_Date_Year - 622;

//	Determine solar leap year
Flag2 = isSolarLeapYear(Base);

Idx = setIndex(Flag1, Flag2);

// Determin first day Anno Domini
D_Min = 0;
if( In_Date_Month == 1 || In_Date_Month == 2 )
	if( Idx != 2 )
		D_Min = 10 + In_Date_Month;
	else
		D_Min = 10 + In_Date_Month + 1;

if(  In_Date_Month == 3 )
	if( Idx == 3 )
		D_Min = 10;
	else
		D_Min = 11;
if(  D_Min == 0 ){
	if(  In_Date_Month == 4 )
		Base = 12;
	else if( In_Date_Month == 5 || In_date.Month == 6 )
		Base = 11;
	else if( In_Date_Month == 10 )
		Base = 9;
	else
		Base = 10;

	if( Idx != 1 )
		D_Min = Base;
	else
		D_Min = Base + 1;
}
//	End determin first day Anno Domini

//	Determine end day solar
D_End = 0;
if( In_Date_Month == 1 || In_Date_Month == 2 )
	if( Idx == 2  )
		D_End = 20 - In_Date_Month;
	else
		D_End = 20 - In_Date_Month + 1;

if(  D_End == 0 ){
	if( In_Date_Month == 5 || In_Date_Month == 6 || In_Date_Month == 11
		|| In_Date_Month == 12  )
		Base = 20;
	 else if( In_Date_Month == 7 || In_Date_Month == 8 ||
		In_Date_Month == 9 || In_Date_Month == 10 )
		Base = 21;
	 else if( In_Date_Month == 3 || In_Date_Month == 4 )
		Base = 19;

	if( Idx == 1  )
		D_End = Base;
	else
		D_End = Base + 1;
}
// end  determine end day solar

if(  In_Date_Day <= D_End ){
	Out_Date_Day = In_Date_Day + D_Min - 1;
	Out_Date_Month = ((In_Date_Month + 8)%12) + 1;
	Month_Flag = 1;
}	
else{
	Out_Date_Day = In_Date_Day - D_End;
	Out_Date_Month = ((In_Date_Month + 9)%12) + 1;
	Month_Flag = 2;
}

if( (In_Date_Month > 3) || (In_Date_Month == 3 && Month_Flag == 2) )
	Out_Date_Year = In_Date_Year - 621;
else
	Out_Date_Year = In_Date_Year - 622;

if (Out_Date_Day < 10)
   var dy = "0"+Out_Date_Day.toString();
else
   var dy = Out_Date_Day.toString();
   
if (Out_Date_Month < 10)
   var mn = "0"+Out_Date_Month.toString();
else
   var mn = Out_Date_Month.toString();

return Out_Date_Year+"/"+mn+"/"+dy;

}

function hi(mythis)
{mythis.className=mythis.className.replace("2","")+"2";}

function dhi(mythis)
{mythis.className=mythis.className.replace("2","");}
function settwoo(myval)
{myval=myval+'';
if (myval.length==1) {return '0'+''+myval}else{return myval}
}
