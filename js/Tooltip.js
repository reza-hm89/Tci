var nav = (document.layers); 
var iex = (document.all);
//var skn = (nav) ? document.topdeck : topdeck.style;
var skn=document.getElementById("topdeck");
//if (nav) document.captureEvents(Event.MOUSEMOVE);
//document.onmousemove = get_mouse;

var startmove=0;

function pop(mymatn) 
{
//var content ="<table width=130 border=0 cellpadding=2 cellspacing=0 bgcolor=#333366><tr><td><table width=100% border=0 cellpadding=2 cellspacing=0 bgcolor="+bak+"><tr><td dir=rtl><font size=1 face=Tahoma><center>"+msg+"</center></font></td></tr></table></td></tr></table>";
//var content ="<table dir=rtl border='0' width='223' cellspacing='0' cellpadding='3' id='table1' style='border: 1px solid #333399; font-family:Tahoma; font-size:8pt' bgcolor='#D9D9FF'><tr><td bgcolor='#333399' height='19' width='215' colspan='2'>	<font color='#FFFFFF' size='1'><b>&nbsp; &#1605;&#1588;&#1582;&#1589;&#1575;&#1578; &#1605;&#1581;&#1578;&#1608;&#1575;&#1740; &#1580;&#1583;&#1610;&#1583;</b></font></td></tr><tr><td width='140'>&#1705;&#1575;&#1585;&#1576;&#1585; : <span lang='en-us'>"+usr+"</span></td><td width='69'>&#1606;&#1608;&#1593; : <span lang='en-us'>"+mode+"</span> </td></tr><tr><td width='215' colspan='2'>&#1586;&#1605;&#1575;&#1606; :<span lang='en-us'>"+dt+"</span></td></tr><tr><td width='215' colspan='2'><span lang='en-us'>"+summery+"</span></td></tr></table>";
var content =mymatn;
var skn=document.getElementById("topdeck");
  if (nav)
  {
    skn.document.write(content); 
	  skn.document.close();
	  skn.style.visibility = "visible";
	   skn.style.display = "block";
  }
    else if (iex) 
  {
	  document.all("topdeck").innerHTML = content;
	  skn.style.visibility = "visible";  
	  	   skn.style.display = "block";
  }
  else
  {
  	  document.getElementById("topdeck").innerHTML = content;
	  skn.style.visibility = "visible";  
	  	   skn.style.display = "";

  }
}

function get_mouse(e) 
{
if (startmove==1){
var mousePos = mouseCoords(e);
var skn=document.getElementById("topdeck");
	//var x = (nav) ? e.pageX : event.x+document.body.scrollLeft; 
	


	var x=mousePos.x+document.body.scrollLeft; 

	//var y = (nav) ? e.pageY : event.y+document.body.scrollTop;
	var y=mousePos.y +document.body.scrollTop; 
	
	if (skn.style.visibility == "hidden") 
	{


		skn.style.left = -500;
  skn.style.top  = 200;
	}
	else
	{
if ((x +178)<document.body.clientWidth )
	{
	skn.style.left = x -2-document.body.scrollLeft;
  skn.style.top  = y+18-document.body.scrollTop;}
  else
{
	skn.style.left = x -180-document.body.scrollLeft;
  skn.style.top  = y+18-document.body.scrollTop;}
  }
}}
function kill() 
{
var skn=document.getElementById("topdeck");
  skn.style.visibility = "hidden";
    skn.style.display = "none";
}
   
   	
   
   function mouseCoords(ev){
   	ev         = ev || window.event;
	if(ev.pageX || ev.pageY){
		return {x:ev.pageX, y:ev.pageY};
	}
	return {
		x:ev.clientX + document.body.scrollLeft - document.body.clientLeft,
		y:ev.clientY + document.body.scrollTop  - document.body.clientTop
	};
}
