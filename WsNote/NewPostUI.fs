namespace WsNote

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Html

[<JavaScript>]
module NewPostUI = 
    
    open UINextUtils

    [<AutoOpen>]
    module private ``закрытые члены`` =

        let var'title = Var.Create ""
        let var'content = Var.Create ""
        // выполняется создание нового поста
        let var'is'creating = Var.Create false

        let reset() = 
            var'title.Value <- ""
            var'content.Value <- ""
            var'is'creating.Value <- false

    let button =  button0 "Создать запись" <| fun () -> var'is'creating.Value <- true
    let on = doc'on'off var'is'creating

    let doc blog =             
        Div0[  
            H10 [txt "Создание новой записи"]
            P0[ txt "Название статьи";  Doc.Input [ Attr.Style "width" "100%" ]  var'title ]
            P0[ txt "Текст статьи";     doc'edit'content'input'area var'content] 
            P0[ button0 "Создать" (fun () -> 
                    ClientBlogData.add'post blog var'title.Value var'content.Value 
                    reset() )
                button0 "Отмена" reset ] ] 
            
    

