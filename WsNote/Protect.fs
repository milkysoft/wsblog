namespace WsNote

open WebSharper


module Protect =

    let users = 
        [   "Zorchenkov", "Alex"
            "binf", "pawel" ]
            
    [<Rpc>]
    let get'user () =        
        let ctx = Web.Remoting.GetContext()
        async {
            try
                return! ctx.UserSession.GetLoggedInUser()
            with _ -> 
                return None }
    
    [<Rpc>]
    let login (ToLower user, ToLower pass) =        
        let ctx = Web.Remoting.GetContext()
        async {
            try
                
                if users |> List.exists( function (ToLower user', ToLower pass') -> user' = user && pass' = pass ) then
                    do! ctx.UserSession.LoginUser user
                    return true
                else
                    return false 
            with _ -> 
                return false }

    [<Rpc>]
    let logout () =        
        let ctx = Web.Remoting.GetContext()
        async {
            try
                do! ctx.UserSession.Logout() 
            with _ -> () }

           
