namespace WsNote

open WebSharper.Html.Server
open WebSharper
open WebSharper.Sitelets

type Action = Home
module Skin =
    open System.Web

    type Page =
        {   Title : string
            Content : Element list }

    let mainTemplate =
        Content.Template<Page>("~/Main.html")
            .With("title", fun x -> x.Title)
            .With("content", fun x -> x.Content)

    let withTemplate title content =
        Content.WithTemplate mainTemplate <| fun context ->
            {   Title = title
                Content = content context }

    let withTemplateAsync title content : Content<Action>  =
        Content.WithTemplateAsync mainTemplate <| fun context ->
            async{
                let! content = content context
                return 
                    {   Title = title
                        Content = content }  }
            

module Site =
    let HomePage = Skin.withTemplate "HomePage" <| fun ctx ->
        [ Div [ClientSide <@ BlogUI.main() @>] ] 

       
    let Main = Sitelet.Content "/" Home HomePage

[<Sealed>]
type Website() =
    interface IWebsite<Action> with
        member this.Sitelet = Site.Main
        member this.Actions = [Home]

type Global() =
    inherit System.Web.HttpApplication()

    member g.Application_Start(sender: obj, args: System.EventArgs) =
        ()

[<assembly: Website(typeof<Website>)>]
do ()
