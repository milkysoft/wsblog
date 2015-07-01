namespace WsNote

open WebSharper
open WebSharper.UI.Next
open WebSharper.UI.Next.Html

[<JavaScript>]
module UINextUtils =

    let addViewListener (view: View<'T>) (f: 'T -> unit) (doc: Doc) =
        view
        |> View.Map (fun x -> f x; Doc.Empty)
        |> Doc.EmbedView
        |> Doc.Append doc

    let Doc'Map<'A> (view:View<'A>) f = 
        View.Map f view |> Doc.EmbedView       

    let var'str'to'int def =            
        Var.Create <| function
            | ClientUtils.Str'Int n -> n
            | _ -> def 

    let ( <*> ) f x = View.Apply f x  

    let txt = Doc.TextNode

    let input0 = Doc.Input []

    let button0 txt = Doc.Button txt []

    let doc'on'off var doc'yes doc'no = 
            Doc'Map (View.FromVar var) <| function
                | false -> doc'no
                | _ -> doc'yes

    //let doc'edit'content'input'area var'content = 
    //    Doc.InputArea [ Attr.Class "edit-post-input-area"] var'content
    //    |> addViewListener var'content.View (fun x ->
    //        JQuery.JQuery.Of(".edit-post-input-area").Each( fun x -> 
    //            x.SetAttribute( "style", "height:5px")                                    
    //            x.SetAttribute( "style", "height:" + (max x.ScrollHeight 300.).ToString() +  "px")) |> ignore )

    