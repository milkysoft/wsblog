// основной модуль UI
// var' - реактивные переменные UI Next
// v' - виртуальные вьюшки UI Next
// b' - элемент виртуальной разметки UI Next, произведённый от модели



namespace WsNote

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Html


[<JavaScript>]
module BlogUI = 

    open UINextUtils

    type NavPage = 
        {   PageNum : int
            PageLen : int
            TotlalLen : int }
    
    

    [<AutoOpen>]
    module private ``ядро клиентской части веб приложения`` =

        // ввод номера страницы
        let var'page'number = Var.Create "0"

        // ввод количества постов на странице
        let var'posts'count = Var.Create "10"

        // контекст поиска
        let var'context = Var.Create ""        

        let b'nav nav =
            let pagesCount = nav.TotlalLen / nav.PageLen
            let len = min 9 pagesCount
            let n0 = if nav.PageNum < 9 then 0 else max (nav.PageNum - 4) 0
            let n1 = min (n0 + 9) pagesCount
            [   for n in n0..n1 do
                    let s = sprintf "Cтарница %d" n 
                    yield LI0[ 
                        if n=nav.PageNum then 
                            yield Span [ Attr.Class "current-page" ] [txt s]
                        else
                            yield button0 s  <| fun () -> 
                                var'page'number.Value <- n.ToString() ] 
                yield LI0[ sprintf "Всего %d страниц" pagesCount |> txt  ] ]
                

        let b'page blog nav =
            NewPostUI.on (NewPostUI.doc blog) <|
                Div0[ 
                    Nav [][
                        UL[][
                            yield LI0 [ LoginUI.button ]
                            yield LI0 [ LoginUI.protect NewPostUI.button   ]
                            yield! b'nav nav ]]
                
                    Doc'Map (View.FromVar blog.Posts) <| fun posts ->
                        posts |> List.map (PostUI.doc blog ) |> UL0  ]


    // точка входа в клиентскую часть веб приложения
    let main() =        
        let v'page = 
            View.Do{
                let! page'number =      
                    (var'str'to'int 0).View <*> var'page'number.View
                let! page'posts'count = 
                    (var'str'to'int 10).View <*> var'posts'count.View
                let! context = var'context.View
                return page'number, page'posts'count, context }

            |> View.MapAsync ( fun (page'number, posts'count, context) -> async{
                let! blog = ClientBlogData.read'page page'number posts'count context
                let! user = Protect.get'user()
                LoginUI.set'logged'in (user.IsSome)
                
                printfn "render'blog %d posts" blog.Posts.Value.Length 
                return b'page blog {PageNum = page'number; PageLen = posts'count; TotlalLen = blog.TotlaCount.Value} } )
                        
        // представление списка постов
        Div0[
            
            Div0[
                txt "Страница №"
                input0 var'page'number
                txt "Колличесво статей на странице"
                input0 var'posts'count
                txt "Поиск"
                input0 var'context  ]
            |> NewPostUI.on Doc.Empty

            Doc.EmbedView v'page ]  
        |> LoginUI.on'visible LoginUI.doc'logining 
        

   
          
        