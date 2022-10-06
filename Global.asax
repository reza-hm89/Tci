<%@ Application Language="C#" %>

<script runat="server">

    void Application_Start(object sender, EventArgs e)
    {
        //Application["OnlineUsers"] = 0;  
    }

    void Application_End(object sender, EventArgs e)
    {
        //  Code that runs on application shutdown

        //Session.RemoveAll();

        //GlobalVariable.PermissionList = null;
        //GlobalVariable.ModulePermission = null;

    }

    void Application_Error(object sender, EventArgs e)
    {
        // Code that runs when an unhandled error occurs

    }

    void Session_Start(object sender, EventArgs e)
    {
        //Application.Lock();
        //Application["OnlineUsers"] = (int)Application["OnlineUsers"] + 1;
        //Application.UnLock();  
    }

    void Session_End(object sender, EventArgs e)
    {
        //Application.Lock();
        //Application["OnlineUsers"] = (int)Application["OnlineUsers"] - 1;
        //Application.UnLock();

        //Session.RemoveAll();

        //GlobalVariable.PermissionList = null;
        //GlobalVariable.ModulePermission = null;
    }

</script>
