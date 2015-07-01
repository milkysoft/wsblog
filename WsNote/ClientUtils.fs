namespace WsNote

open WebSharper
open WebSharper.JavaScript
open WebSharper.Html.Client


[<JavaScript>]
module ClientUtils =
    type jQ = WebSharper.JQuery.JQuery

    [<Inline "document.location = $url">]
    let redirect (url : string) = ()

    [<Direct "!isNaN(parseFloat($n)) && isFinite($n)" >]
    let isNumber (n:string) = X<bool>

    [<Direct "Math.abs(~~$x)" >]
    let strToInt'or'zero (x:string) = X<int>

    [<Inline "Date().toLocaleString()">]
    let now() = failwith "N/A"


    [<Inline "String( ~~Number($x) ) === $x">]
    let is'integer(x:string) = X<bool>

    
    let (|Str'Int|_|) s =         
        if is'integer s then Some <| strToInt'or'zero s else None




