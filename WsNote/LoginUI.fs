namespace WsNote

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Html
 
[<JavaScript>]
module LoginUI = 

    open UINextUtils

    [<AutoOpen>]
    module private ``закрытые члены`` =

        let localStorage = WebSharper.JavaScript.JS.Window.LocalStorage
        let key = "4B929568-625C-4CD0-BED4-8EACC78D21E6-blog-"
        let key'user = key + "user"
        let key'pass = key + "pass"
        let (~%%) = localStorage.GetItem 
        let (<==) k v = localStorage.SetItem(k,v)

        // выполняется вход на сайт
        let var'is'visible = Var.Create false

        let var'is'loginign'process = Var.Create false

        let var'user =  %% key'user |> Var.Create
        let var'pass =  %% key'pass |> Var.Create
        let var'error : Var<string option> =  Var.Create None
        // выполнен ли вход на сайт
        let var'is'logged'in = Var.Create false
        let go'to'logining() = var'is'visible.Value <- true

        let login() =  
            async {
                var'is'loginign'process.Value <- true
                let! is'logged'in = Protect.login(var'user.Value, var'pass.Value)
                var'is'loginign'process.Value <- false
                if is'logged'in then 
                    var'is'visible.Value <- false 
                    key'user <== var'user.Value
                    key'pass <== var'pass.Value
                    var'is'logged'in.Value <- true
                    var'error.Value <- None
                else
                    var'error.Value <- Some "Не правильное имя пользователя или пароль" }
            |> Async.Start              
            
        let button'logout = 
            button0 "Выход"  <| fun () -> 
                async{
                    do! Protect.logout()
                    var'is'logged'in.Value <- false }
                |> Async.Start      

        let button'login = button0 "Войти" go'to'logining

    let set'logged'in = Var.Set var'is'logged'in

    let on'visible = doc'on'off var'is'visible

    let is'logged'in = doc'on'off var'is'logged'in

    let protect doc = is'logged'in doc Doc.Empty

    let button = is'logged'in button'logout button'login

    let doc'logining = 
        

        Div0[
            H10 [txt "Вход на сайт"]
            Table0[
                TR0[TD0 [txt "Имя пользователя"]
                    TD0 [ input0  var'user ] ]
                TR0[TD0 [txt "Пароль"]
                    TD0 [ Doc.PasswordBox [] var'pass ] ] ]

            P0[ Doc'Map var'is'loginign'process.View <| function
                    | true -> txt "Выполняется вход..."
                    | _ ->  button0 "Войти" login
                button0 "Отмена" <| fun () -> 
                    var'is'visible.Value <- false
                    var'error.Value <- None 
                    %% key'user |> Var.Set var'user
                    %% key'pass |> Var.Set var'pass ]

            Doc'Map var'error.View <| function
                | None -> Doc.Empty
                | Some error -> Div[ Attr.Style "color" "red" ] [H20 [ txt error] ] ]

    

    
