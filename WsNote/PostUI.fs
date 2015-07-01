namespace WsNote

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Html
 
[<JavaScript>]
module PostUI = 

    open UINextUtils

    [<AutoOpen>]
    module private ``закрытые члены`` =

        let on'edit post doc'edit doc = Doc'Map post.IsEditMode.View <| function
            | true -> doc'edit
            | _ -> doc

        let doc'date post = 
            Div[ Attr.Class "post-date-block" ] [   
                    txt "Дата создания:"
                    txt post.CreateDate
                    txt "Дата изменения:"
                    Doc.TextView post.EditDate.View]

        let doc'crud blog post =            
            on'edit post 
                (   Span0[
                        button0 "Применить" (fun () -> ClientBlogData.update'post post )
                        button0 "Отмена" (fun () -> post.IsEditMode.Value <- false ) ] )
                (   LoginUI.protect <| Span0[   
                        button0 "Удалить"  (fun () -> ClientBlogData.delete'post blog post) 
                        button0 "Изменить" (fun () -> post.IsEditMode.Value <- true ) ] )

        let doc'header blog post = 
            Div[Attr.Class "post-header-block"] [ 
                Div [ Attr.Class "post-title-text-block"] [ Doc.TextView post.Title.View ]                    
                doc'crud blog post
                txt "№" 
                Doc'Map post.Num.View <| fun n ->
                    txt (string n)                        
                doc'date post ]

        let doc'static'content post = 
            Div0[
                Doc'Map post.Content.View <| fun content ->
                    let htmlElem = JQuery.JQuery.Of("<div class=\"post-content-block\">" + content + "</div>").Get(0)
                    try
                        Doc.Static (htmlElem :?> _) 
                    with _ -> txt content ]             

    let doc blog post  =             
        LI [Attr.Create "id" ( sprintf "post-%d-article" post.Id) ] [
            doc'header blog post
            on'edit post 
                (Div0[  P0[ txt "Название статьи";  Doc.Input [ Attr.Style "width" "100%" ]  post.EditedTitle ]
                        //P0[ txt "Текст статьи";     doc'edit'content'input'area post.EditedContent]
                        ] )
                (doc'static'content post)]
        