namespace WsNote

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Html

[<JavaScript>]
[<AutoOpen>]
module ClientBlogData =

    // Модель записи блога
    type PostModel =
        {   Id : int            
            Title : Var<string>
            Content : Var<string>
            CreateDate : string
            EditDate : Var<string> 
            Num : Var<int>
            EditedTitle : Var<string>
            EditedContent : Var<string>
            IsEditMode : Var<bool> }

    // Модель блога
    type BlogModel = 
        {   Posts : Var<PostModel list>
            TotlaCount : Var<int>}

    [<AutoOpen>]
    module private ``асинхронная работа с локальными моделями на аснове агентов и сообщений`` =

        // преобразование удалённых данных поста в локальную модель поста
        let create'post (x:RemoteBlogData.Post) = 
            {   Id = x.Id
                Title = Var.Create x.Title
                Content = Var.Create x.Content
                CreateDate = x.CreateDate
                EditDate = Var.Create x.EditDate 
                Num = Var.Create x.Num
                EditedTitle = Var.Create x.Title
                EditedContent = Var.Create x.Content
                IsEditMode = Var.Create false }

        // изменить локальную модель поста в соответствии с удалёнными данными поста
        let update'post (m:PostModel) (x:RemoteBlogData.Post) =             
            m.Title.Value       <- x.Title
            m.Content.Value     <- x.Content
            m.EditDate.Value    <- x.EditDate 
            m.Num.Value         <- x.Num

        // асинхронные сообщения на клиенте для CRUD операций     
        type CRUDBlogMessage = 
            | ReadBlog      of int * int *string * AsyncReplyChannel<BlogModel>
            | UpdatePost    of PostModel
            | DeletePost    of BlogModel * int
            | AddPost       of BlogModel * string * string  

        let crud = MailboxProcessor.Start(fun agent ->             
            let rec loop () : Async<unit> = async {
                let! msg = agent.Receive()
                match msg with 
                | ReadBlog ( page'number, page'post'count, context, reply ) ->                      
                    let! total'count, posts = RemoteBlogData.getPage page'number page'post'count context
                    
                    let blog = 
                        {   Posts = 
                                posts 
                                |> List.map create'post
                                |> Var.Create
                            TotlaCount = Var.Create total'count}
                        
                    reply.Reply blog
                        
                | UpdatePost post -> 
                    post.IsEditMode.Value <- false
                    let! x = RemoteBlogData.setPostContent post.Id post.EditedTitle.Value post.EditedContent.Value
                    post.Content.Value <- x.Content
                    post.Title.Value <- x.Title
                    post.EditDate.Value <- x.EditDate

                | DeletePost (blog,id) ->
                    RemoteBlogData.deletePost id
                    blog.Posts.Value <- blog.Posts.Value |> List.filter( function {Id=id'} -> id<>id' )
                    blog.TotlaCount.Value <- blog.TotlaCount.Value - 1
                | AddPost (blog, title, content) ->
                    let! x = RemoteBlogData.addNewPost title content                    
                    blog.Posts.Value <- (create'post x) :: blog.Posts.Value
                return! loop () }
            loop () )        

    let read'page page'number posts'count context =
        crud.PostAndAsyncReply( fun reply -> ReadBlog(page'number, posts'count, context, reply) )

    let delete'post blog post = (blog, post.Id) |> DeletePost |> crud.Post

    let update'post post = post |> UpdatePost |> crud.Post

    let add'post blog title content  = (blog, title, content ) |> AddPost |> crud.Post