(function()
{
 var Global=this,Runtime=this.IntelliFactory.Runtime,UI,Next,View,WsNote,UINextUtils,BlogUI,_____________________________________,Concurrency,ClientBlogData,Remoting,AjaxRemotingProvider,LoginUI,console,Html,List,NewPostUI,Doc,Operators,Seq,Attr,String,T,PostUI,Var,_______________________________________________________________________,Control,MailboxProcessor,Number,ClientUtils,_______________,window,_______________1,_______________2,jQuery,View1;
 Runtime.Define(Global,{
  WsNote:{
   BlogUI:{
    main:function()
    {
     var _builder_,x,_v_page,x1,x2;
     _builder_=View.get_Do();
     x=_builder_.Bind(UINextUtils.op_LessMultiplyGreater(UINextUtils["var'str'to'int"](0).get_View(),_____________________________________["var'page'number"]().get_View()),function(_arg1)
     {
      return _builder_.Bind(UINextUtils.op_LessMultiplyGreater(UINextUtils["var'str'to'int"](10).get_View(),_____________________________________["var'posts'count"]().get_View()),function(_arg2)
      {
       return _builder_.Bind(_____________________________________["var'context"]().get_View(),function(_arg3)
       {
        return _builder_.Return([_arg1,_arg2,_arg3]);
       });
      });
     });
     _v_page=View.MapAsync(function(tupledArg)
     {
      var _page_number,_posts_count,context;
      _page_number=tupledArg[0];
      _posts_count=tupledArg[1];
      context=tupledArg[2];
      return Concurrency.Delay(function()
      {
       return Concurrency.Bind(ClientBlogData["read'page"](_page_number,_posts_count,context),function(_arg4)
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("WsNote:5",[]),function(_arg5)
        {
         var s;
         (LoginUI["set'logged'in"]())(_arg5.$==1);
         s="render'blog "+Global.String(_arg4.Posts.get_Value().get_Length())+" posts";
         if(console)
          {
           console.log(s);
          }
         return Concurrency.Return(_____________________________________["b'page"](_arg4,{
          PageNum:_page_number,
          PageLen:_posts_count,
          TotlalLen:_arg4.TotlaCount.get_Value()
         }));
        });
       });
      });
     },x);
     x2=Html.Div0(List.ofArray([UINextUtils.txt("\u0421\u0442\u0440\u0430\u043d\u0438\u0446\u0430 \u2116"),(UINextUtils.input0())(_____________________________________["var'page'number"]()),UINextUtils.txt("\u041a\u043e\u043b\u043b\u0438\u0447\u0435\u0441\u0432\u043e \u0441\u0442\u0430\u0442\u0435\u0439 \u043d\u0430 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u0435"),(UINextUtils.input0())(_____________________________________["var'posts'count"]()),UINextUtils.txt("\u041f\u043e\u0438\u0441\u043a"),(UINextUtils.input0())(_____________________________________["var'context"]())]));
     x1=Html.Div0(List.ofArray([((NewPostUI.on())(Doc.get_Empty()))(x2),Doc.EmbedView(_v_page)]));
     return((LoginUI["on'visible"]())(LoginUI["doc'logining"]()))(x1);
    },
    "\u044f\u0434\u0440\u043e \u043a\u043b\u0438\u0435\u043d\u0442\u0441\u043a\u043e\u0439 \u0447\u0430\u0441\u0442\u0438 \u0432\u0435\u0431 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f":{
     "b'nav":function(nav)
     {
      var pagesCount,len,n0,n1;
      pagesCount=nav.TotlalLen/nav.PageLen>>0;
      len=Operators.Min(9,pagesCount);
      n0=nav.PageNum<9?0:Operators.Max(nav.PageNum-4,0);
      n1=Operators.Min(n0+9,pagesCount);
      return Seq.toList(Seq.delay(function()
      {
       return Seq.append(Seq.collect(function(n)
       {
        var x;
        x="C\u0442\u0430\u0440\u043d\u0438\u0446\u0430 "+Global.String(n);
        return[Html.LI0(Seq.toList(Seq.delay(function()
        {
         return n===nav.PageNum?[Html.Span(List.ofArray([Attr.Class("current-page")]),List.ofArray([UINextUtils.txt(x)]))]:[(UINextUtils.button0(x))(function()
         {
          return _____________________________________["var'page'number"]().set_Value(String(n));
         })];
        })))];
       },Operators.range(n0,n1)),Seq.delay(function()
       {
        return[Html.LI0(List.ofArray([UINextUtils.txt("\u0412\u0441\u0435\u0433\u043e "+Global.String(pagesCount)+" \u0441\u0442\u0440\u0430\u043d\u0438\u0446")]))];
       }));
      }));
     },
     "b'page":function(blog,nav)
     {
      var f;
      f=function(posts)
      {
       return Html.UL0(List.map(function(post)
       {
        return PostUI.doc(blog,post);
       },posts));
      };
      return((NewPostUI.on())(NewPostUI.doc(blog)))(Html.Div0(List.ofArray([Html.Nav(Runtime.New(T,{
       $:0
      }),List.ofArray([Html.UL(Runtime.New(T,{
       $:0
      }),Seq.toList(Seq.delay(function()
      {
       return Seq.append([Html.LI0(List.ofArray([LoginUI.button()]))],Seq.delay(function()
       {
        return Seq.append([Html.LI0(List.ofArray([LoginUI.protect(NewPostUI.button())]))],Seq.delay(function()
        {
         return _____________________________________["b'nav"](nav);
        }));
       }));
      })))])),UINextUtils["Doc'Map"](View.FromVar(blog.Posts),f)])));
     },
     "var'context":Runtime.Field(function()
     {
      return Var.Create("");
     }),
     "var'page'number":Runtime.Field(function()
     {
      return Var.Create("0");
     }),
     "var'posts'count":Runtime.Field(function()
     {
      return Var.Create("10");
     })
    }
   },
   ClientBlogData:{
    "add'post":function(blog,title,content)
    {
     var tupledArg,arg00,_this;
     tupledArg=[blog,title,content];
     arg00={
      $:3,
      $0:tupledArg[0],
      $1:tupledArg[1],
      $2:tupledArg[2]
     };
     _this=_______________________________________________________________________.crud();
     _this.mailbox.AddLast(arg00);
     return _this.resume();
    },
    "delete'post":function(blog,post)
    {
     var tupledArg,arg00,_this;
     tupledArg=[blog,post.Id];
     arg00={
      $:2,
      $0:tupledArg[0],
      $1:tupledArg[1]
     };
     _this=_______________________________________________________________________.crud();
     _this.mailbox.AddLast(arg00);
     return _this.resume();
    },
    "read'page":function(_page_number,_posts_count,context)
    {
     return _______________________________________________________________________.crud().PostAndAsyncReply(function(reply)
     {
      return{
       $:0,
       $0:_page_number,
       $1:_posts_count,
       $2:context,
       $3:reply
      };
     },{
      $:0
     });
    },
    "update'post":function(post)
    {
     var arg00,_this;
     arg00={
      $:1,
      $0:post
     };
     _this=_______________________________________________________________________.crud();
     _this.mailbox.AddLast(arg00);
     return _this.resume();
    },
    "\u0430\u0441\u0438\u043d\u0445\u0440\u043e\u043d\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430 \u0441 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u043c\u043e\u0434\u0435\u043b\u044f\u043c\u0438 \u043d\u0430 \u0430\u0441\u043d\u043e\u0432\u0435 \u0430\u0433\u0435\u043d\u0442\u043e\u0432 \u0438 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439":{
     "create'post":function(x)
     {
      return{
       Id:x.Id,
       Title:Var.Create(x.Title),
       Content:Var.Create(x.Content),
       CreateDate:x.CreateDate,
       EditDate:Var.Create(x.EditDate),
       Num:Var.Create(x.Num),
       EditedTitle:Var.Create(x.Title),
       EditedContent:Var.Create(x.Content),
       IsEditMode:Var.Create(false)
      };
     },
     crud:Runtime.Field(function()
     {
      return MailboxProcessor.Start(function(agent)
      {
       var loop;
       loop=function()
       {
        return Concurrency.Delay(function()
        {
         var x;
         x=agent.Receive({
          $:0
         });
         return Concurrency.Bind(x,function(_arg1)
         {
          var _,post,id,blog,blog1,reply;
          if(_arg1.$==1)
           {
            post=_arg1.$0;
            post.IsEditMode.set_Value(false);
            _=Concurrency.Bind(AjaxRemotingProvider.Async("WsNote:2",[post.Id,post.EditedTitle.get_Value(),post.EditedContent.get_Value()]),function(_arg3)
            {
             post.Content.set_Value(_arg3.Content);
             post.Title.set_Value(_arg3.Title);
             post.EditDate.set_Value(_arg3.EditDate);
             return Concurrency.Return(null);
            });
           }
          else
           {
            if(_arg1.$==2)
             {
              id=_arg1.$1;
              blog=_arg1.$0;
              AjaxRemotingProvider.Send("WsNote:1",[id]);
              blog.Posts.set_Value(List.filter(function(_arg4)
              {
               return id!==_arg4.Id;
              },blog.Posts.get_Value()));
              blog.TotlaCount.set_Value(blog.TotlaCount.get_Value()-1);
              _=Concurrency.Return(null);
             }
            else
             {
              if(_arg1.$==3)
               {
                blog1=_arg1.$0;
                _=Concurrency.Bind(AjaxRemotingProvider.Async("WsNote:0",[_arg1.$1,_arg1.$2]),function(_arg5)
                {
                 blog1.Posts.set_Value(Runtime.New(T,{
                  $:1,
                  $0:_______________________________________________________________________["create'post"](_arg5),
                  $1:blog1.Posts.get_Value()
                 }));
                 return Concurrency.Return(null);
                });
               }
              else
               {
                reply=_arg1.$3;
                _=Concurrency.Bind(AjaxRemotingProvider.Async("WsNote:3",[_arg1.$0,_arg1.$1,_arg1.$2]),function(_arg2)
                {
                 var _total_count;
                 _total_count=_arg2[0];
                 reply({
                  Posts:Var.Create(List.map(function(x1)
                  {
                   return _______________________________________________________________________["create'post"](x1);
                  },_arg2[1])),
                  TotlaCount:Var.Create(_total_count)
                 });
                 return Concurrency.Return(null);
                });
               }
             }
           }
          return Concurrency.Combine(_,Concurrency.Delay(function()
          {
           return loop(null);
          }));
         });
        });
       };
       return loop(null);
      },{
       $:0
      });
     }),
     "update'post":function(m,x)
     {
      m.Title.set_Value(x.Title);
      m.Content.set_Value(x.Content);
      m.EditDate.set_Value(x.EditDate);
      return m.Num.set_Value(x.Num);
     }
    }
   },
   ClientUtils:{
    isNumber:function($n)
    {
     var $0=this,$this=this;
     return!Global.isNaN(Global.parseFloat($n))&&Global.isFinite($n);
    },
    "strToInt'or'zero":function($x)
    {
     var $0=this,$this=this;
     return Global.Math.abs(~(~$x));
    },
    "|Str'Int|_|":function(s)
    {
     return String(~(~Number(s)))===s?{
      $:1,
      $0:ClientUtils["strToInt'or'zero"](s)
     }:{
      $:0
     };
    }
   },
   LoginUI:{
    button:Runtime.Field(function()
    {
     return((LoginUI["is'logged'in"]())(_______________["button'logout"]()))(_______________["button'login"]());
    }),
    "doc'logining":Runtime.Field(function()
    {
     var f,f1;
     f=function(_arg1)
     {
      return _arg1?UINextUtils.txt("\u0412\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f \u0432\u0445\u043e\u0434..."):(UINextUtils.button0("\u0412\u043e\u0439\u0442\u0438"))(function()
      {
       return _______________.login();
      });
     };
     f1=function(_arg2)
     {
      var error;
      if(_arg2.$==1)
       {
        error=_arg2.$0;
        return Html.Div(List.ofArray([Attr.Style("color","red")]),List.ofArray([Html.H20(List.ofArray([UINextUtils.txt(error)]))]));
       }
      else
       {
        return Doc.get_Empty();
       }
     };
     return Html.Div0(List.ofArray([Html.H10(List.ofArray([UINextUtils.txt("\u0412\u0445\u043e\u0434 \u043d\u0430 \u0441\u0430\u0439\u0442")])),Html.Table0(List.ofArray([Html.TR0(List.ofArray([Html.TD0(List.ofArray([UINextUtils.txt("\u0418\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f")])),Html.TD0(List.ofArray([(UINextUtils.input0())(_______________["var'user"]())]))])),Html.TR0(List.ofArray([Html.TD0(List.ofArray([UINextUtils.txt("\u041f\u0430\u0440\u043e\u043b\u044c")])),Html.TD0(List.ofArray([Doc.PasswordBox(Runtime.New(T,{
      $:0
     }),_______________["var'pass"]())]))]))])),Html.P0(List.ofArray([UINextUtils["Doc'Map"](_______________["var'is'loginign'process"]().get_View(),f),(UINextUtils.button0("\u041e\u0442\u043c\u0435\u043d\u0430"))(function()
     {
      var arg10,arg101;
      _______________["var'is'visible"]().set_Value(false);
      _______________["var'error"]().set_Value({
       $:0
      });
      arg10=(_______________.op_SpliceUntyped())(_______________["key'user"]());
      Var.Set(_______________["var'user"](),arg10);
      arg101=(_______________.op_SpliceUntyped())(_______________["key'pass"]());
      return Var.Set(_______________["var'pass"](),arg101);
     })])),UINextUtils["Doc'Map"](_______________["var'error"]().get_View(),f1)]));
    }),
    "is'logged'in":Runtime.Field(function()
    {
     return function(_doc_yes)
     {
      return function(_doc_no)
      {
       return UINextUtils["doc'on'off"](_______________["var'is'logged'in"](),_doc_yes,_doc_no);
      };
     };
    }),
    "on'visible":Runtime.Field(function()
    {
     return function(_doc_yes)
     {
      return function(_doc_no)
      {
       return UINextUtils["doc'on'off"](_______________["var'is'visible"](),_doc_yes,_doc_no);
      };
     };
    }),
    protect:function(doc)
    {
     return((LoginUI["is'logged'in"]())(doc))(Doc.get_Empty());
    },
    "set'logged'in":Runtime.Field(function()
    {
     var arg00;
     arg00=_______________["var'is'logged'in"]();
     return function(arg10)
     {
      return Var.Set(arg00,arg10);
     };
    }),
    "\u0437\u0430\u043a\u0440\u044b\u0442\u044b\u0435 \u0447\u043b\u0435\u043d\u044b":{
     "button'login":Runtime.Field(function()
     {
      return(UINextUtils.button0("\u0412\u043e\u0439\u0442\u0438"))(function()
      {
       return _______________["go'to'logining"]();
      });
     }),
     "button'logout":Runtime.Field(function()
     {
      return(UINextUtils.button0("\u0412\u044b\u0445\u043e\u0434"))(function()
      {
       return Concurrency.Start(Concurrency.Delay(function()
       {
        return Concurrency.Bind(AjaxRemotingProvider.Async("WsNote:7",[]),function()
        {
         _______________["var'is'logged'in"]().set_Value(false);
         return Concurrency.Return(null);
        });
       }),{
        $:0
       });
      });
     }),
     "go'to'logining":function()
     {
      return _______________["var'is'visible"]().set_Value(true);
     },
     key:Runtime.Field(function()
     {
      return"4B929568-625C-4CD0-BED4-8EACC78D21E6-blog-";
     }),
     "key'pass":Runtime.Field(function()
     {
      return _______________.key()+"pass";
     }),
     "key'user":Runtime.Field(function()
     {
      return _______________.key()+"user";
     }),
     localStorage:Runtime.Field(function()
     {
      return window.localStorage;
     }),
     login:function()
     {
      return Concurrency.Start(Concurrency.Delay(function()
      {
       var x;
       _______________["var'is'loginign'process"]().set_Value(true);
       x=AjaxRemotingProvider.Async("WsNote:6",[_______________["var'user"]().get_Value(),_______________["var'pass"]().get_Value()]);
       return Concurrency.Bind(x,function(_arg1)
       {
        _______________["var'is'loginign'process"]().set_Value(false);
        if(_arg1)
         {
          _______________["var'is'visible"]().set_Value(false);
          _______________.op_LessEqualsEquals(_______________["key'user"](),_______________["var'user"]().get_Value());
          _______________.op_LessEqualsEquals(_______________["key'pass"](),_______________["var'pass"]().get_Value());
          _______________["var'is'logged'in"]().set_Value(true);
          _______________["var'error"]().set_Value({
           $:0
          });
          return Concurrency.Return(null);
         }
        else
         {
          _______________["var'error"]().set_Value({
           $:1,
           $0:"\u041d\u0435 \u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u043e\u0435 \u0438\u043c\u044f \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044f \u0438\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c"
          });
          return Concurrency.Return(null);
         }
       });
      }),{
       $:0
      });
     },
     op_LessEqualsEquals:function(k,v)
     {
      return _______________.localStorage().setItem(k,v);
     },
     op_SpliceUntyped:Runtime.Field(function()
     {
      return function(arg00)
      {
       return _______________.localStorage().getItem(arg00);
      };
     }),
     "var'error":Runtime.Field(function()
     {
      return Var.Create({
       $:0
      });
     }),
     "var'is'logged'in":Runtime.Field(function()
     {
      return Var.Create(false);
     }),
     "var'is'loginign'process":Runtime.Field(function()
     {
      return Var.Create(false);
     }),
     "var'is'visible":Runtime.Field(function()
     {
      return Var.Create(false);
     }),
     "var'pass":Runtime.Field(function()
     {
      return Var.Create((_______________.op_SpliceUntyped())(_______________["key'pass"]()));
     }),
     "var'user":Runtime.Field(function()
     {
      return Var.Create((_______________.op_SpliceUntyped())(_______________["key'user"]()));
     })
    }
   },
   NewPostUI:{
    button:Runtime.Field(function()
    {
     return(UINextUtils.button0("\u0421\u043e\u0437\u0434\u0430\u0442\u044c \u0437\u0430\u043f\u0438\u0441\u044c"))(function()
     {
      return _______________1["var'is'creating"]().set_Value(true);
     });
    }),
    doc:function(blog)
    {
     return Html.Div0(List.ofArray([Html.H10(List.ofArray([UINextUtils.txt("\u0421\u043e\u0437\u0434\u0430\u043d\u0438\u0435 \u043d\u043e\u0432\u043e\u0439 \u0437\u0430\u043f\u0438\u0441\u0438")])),Html.P0(List.ofArray([UINextUtils.txt("\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u044c\u0438"),Doc.Input(List.ofArray([Attr.Style("width","100%")]),_______________1["var'title"]())])),Html.P0(List.ofArray([UINextUtils.txt("\u0422\u0435\u043a\u0441\u0442 \u0441\u0442\u0430\u0442\u044c\u0438"),UINextUtils["doc'edit'content'input'area"](_______________1["var'content"]())])),Html.P0(List.ofArray([(UINextUtils.button0("\u0421\u043e\u0437\u0434\u0430\u0442\u044c"))(function()
     {
      ClientBlogData["add'post"](blog,_______________1["var'title"]().get_Value(),_______________1["var'content"]().get_Value());
      return _______________1.reset();
     }),(UINextUtils.button0("\u041e\u0442\u043c\u0435\u043d\u0430"))(function()
     {
      return _______________1.reset();
     })]))]));
    },
    on:Runtime.Field(function()
    {
     return function(_doc_yes)
     {
      return function(_doc_no)
      {
       return UINextUtils["doc'on'off"](_______________1["var'is'creating"](),_doc_yes,_doc_no);
      };
     };
    }),
    "\u0437\u0430\u043a\u0440\u044b\u0442\u044b\u0435 \u0447\u043b\u0435\u043d\u044b":{
     reset:function()
     {
      _______________1["var'title"]().set_Value("");
      _______________1["var'content"]().set_Value("");
      return _______________1["var'is'creating"]().set_Value(false);
     },
     "var'content":Runtime.Field(function()
     {
      return Var.Create("");
     }),
     "var'is'creating":Runtime.Field(function()
     {
      return Var.Create(false);
     }),
     "var'title":Runtime.Field(function()
     {
      return Var.Create("");
     })
    }
   },
   PostUI:{
    doc:function(blog,post)
    {
     var arg10;
     arg10=post.EditedTitle;
     return Html.LI(List.ofArray([Attr.Create("id","post-"+Global.String(post.Id)+"-article")]),List.ofArray([_______________2["doc'header"](blog,post),_______________2["on'edit"](post,Html.Div0(List.ofArray([Html.P0(List.ofArray([UINextUtils.txt("\u041d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0441\u0442\u0430\u0442\u044c\u0438"),Doc.Input(List.ofArray([Attr.Style("width","100%")]),arg10)])),Html.P0(List.ofArray([UINextUtils.txt("\u0422\u0435\u043a\u0441\u0442 \u0441\u0442\u0430\u0442\u044c\u0438"),UINextUtils["doc'edit'content'input'area"](post.EditedContent)]))])),_______________2["doc'static'content"](post))]));
    },
    "\u0437\u0430\u043a\u0440\u044b\u0442\u044b\u0435 \u0447\u043b\u0435\u043d\u044b":{
     "doc'crud":function(blog,post)
     {
      return _______________2["on'edit"](post,Html.Span0(List.ofArray([(UINextUtils.button0("\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"))(function()
      {
       return ClientBlogData["update'post"](post);
      }),(UINextUtils.button0("\u041e\u0442\u043c\u0435\u043d\u0430"))(function()
      {
       return post.IsEditMode.set_Value(false);
      })])),LoginUI.protect(Html.Span0(List.ofArray([(UINextUtils.button0("\u0423\u0434\u0430\u043b\u0438\u0442\u044c"))(function()
      {
       return ClientBlogData["delete'post"](blog,post);
      }),(UINextUtils.button0("\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u044c"))(function()
      {
       return post.IsEditMode.set_Value(true);
      })]))));
     },
     "doc'date":function(post)
     {
      return Html.Div(List.ofArray([Attr.Class("post-date-block")]),List.ofArray([UINextUtils.txt("\u0414\u0430\u0442\u0430 \u0441\u043e\u0437\u0434\u0430\u043d\u0438\u044f:"),UINextUtils.txt(post.CreateDate),UINextUtils.txt("\u0414\u0430\u0442\u0430 \u0438\u0437\u043c\u0435\u043d\u0435\u043d\u0438\u044f:"),Doc.TextView(post.EditDate.get_View())]));
     },
     "doc'header":function(blog,post)
     {
      var f;
      f=function(n)
      {
       return UINextUtils.txt(Global.String(n));
      };
      return Html.Div(List.ofArray([Attr.Class("post-header-block")]),List.ofArray([Html.Div(List.ofArray([Attr.Class("post-title-text-block")]),List.ofArray([Doc.TextView(post.Title.get_View())])),_______________2["doc'crud"](blog,post),UINextUtils.txt("\u2116"),UINextUtils["Doc'Map"](post.Num.get_View(),f),_______________2["doc'date"](post)]));
     },
     "doc'static'content":function(post)
     {
      var f;
      f=function(content)
      {
       var htmlElem,matchValue;
       htmlElem=jQuery("<div class=\"post-content-block\">"+content+"</div>").get(0);
       try
       {
        return Doc.Static(htmlElem);
       }
       catch(matchValue)
       {
        return UINextUtils.txt(content);
       }
      };
      return Html.Div0(List.ofArray([UINextUtils["Doc'Map"](post.Content.get_View(),f)]));
     },
     "on'edit":function(post,_doc_edit,doc)
     {
      var f;
      f=function(_arg1)
      {
       return _arg1?_doc_edit:doc;
      };
      return UINextUtils["Doc'Map"](post.IsEditMode.get_View(),f);
     }
    }
   },
   UINextUtils:{
    "Doc'Map":function(view,f)
    {
     return Doc.EmbedView(View.Map(f,view));
    },
    addViewListener:function(view,f,doc)
    {
     return Doc.Append(doc,Doc.EmbedView(View.Map(function(x)
     {
      f(x);
      return Doc.get_Empty();
     },view)));
    },
    button0:function(txt)
    {
     var arg10;
     arg10=Runtime.New(T,{
      $:0
     });
     return function(arg20)
     {
      return Doc.Button(txt,arg10,arg20);
     };
    },
    "doc'edit'content'input'area":function(_var_content)
    {
     var doc;
     doc=Doc.InputArea(List.ofArray([Attr.Class("edit-post-input-area")]),_var_content);
     return UINextUtils.addViewListener(_var_content.get_View(),function()
     {
      jQuery(".edit-post-input-area").each(function()
      {
       var copyOfStruct;
       this.setAttribute("style","height:5px");
       copyOfStruct=Operators.Max(this.scrollHeight,300);
       return this.setAttribute("style","height:"+String(copyOfStruct)+"px");
      });
     },doc);
    },
    "doc'on'off":function(_var,_doc_yes,_doc_no)
    {
     var f;
     f=function(_arg1)
     {
      return _arg1?_doc_yes:_doc_no;
     };
     return UINextUtils["Doc'Map"](View.FromVar(_var),f);
    },
    input0:Runtime.Field(function()
    {
     var arg00;
     arg00=Runtime.New(T,{
      $:0
     });
     return function(arg10)
     {
      return Doc.Input(arg00,arg10);
     };
    }),
    op_LessMultiplyGreater:function(f,x)
    {
     return View1.Apply(f,x);
    },
    txt:function(arg00)
    {
     return Doc.TextNode(arg00);
    },
    "var'str'to'int":function(def)
    {
     return Var.Create(function(_arg1)
     {
      var activePatternResult;
      activePatternResult=ClientUtils["|Str'Int|_|"](_arg1);
      return activePatternResult.$==1?activePatternResult.$0:def;
     });
    }
   }
  }
 });
 Runtime.OnInit(function()
 {
  UI=Runtime.Safe(Global.WebSharper.UI);
  Next=Runtime.Safe(UI.Next);
  View=Runtime.Safe(Next.View);
  WsNote=Runtime.Safe(Global.WsNote);
  UINextUtils=Runtime.Safe(WsNote.UINextUtils);
  BlogUI=Runtime.Safe(WsNote.BlogUI);
  _____________________________________=Runtime.Safe(BlogUI["\u044f\u0434\u0440\u043e \u043a\u043b\u0438\u0435\u043d\u0442\u0441\u043a\u043e\u0439 \u0447\u0430\u0441\u0442\u0438 \u0432\u0435\u0431 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u044f"]);
  Concurrency=Runtime.Safe(Global.WebSharper.Concurrency);
  ClientBlogData=Runtime.Safe(WsNote.ClientBlogData);
  Remoting=Runtime.Safe(Global.WebSharper.Remoting);
  AjaxRemotingProvider=Runtime.Safe(Remoting.AjaxRemotingProvider);
  LoginUI=Runtime.Safe(WsNote.LoginUI);
  console=Runtime.Safe(Global.console);
  Html=Runtime.Safe(Next.Html);
  List=Runtime.Safe(Global.WebSharper.List);
  NewPostUI=Runtime.Safe(WsNote.NewPostUI);
  Doc=Runtime.Safe(Next.Doc);
  Operators=Runtime.Safe(Global.WebSharper.Operators);
  Seq=Runtime.Safe(Global.WebSharper.Seq);
  Attr=Runtime.Safe(Next.Attr);
  String=Runtime.Safe(Global.String);
  T=Runtime.Safe(List.T);
  PostUI=Runtime.Safe(WsNote.PostUI);
  Var=Runtime.Safe(Next.Var);
  _______________________________________________________________________=Runtime.Safe(ClientBlogData["\u0430\u0441\u0438\u043d\u0445\u0440\u043e\u043d\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430 \u0441 \u043b\u043e\u043a\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u043c\u043e\u0434\u0435\u043b\u044f\u043c\u0438 \u043d\u0430 \u0430\u0441\u043d\u043e\u0432\u0435 \u0430\u0433\u0435\u043d\u0442\u043e\u0432 \u0438 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439"]);
  Control=Runtime.Safe(Global.WebSharper.Control);
  MailboxProcessor=Runtime.Safe(Control.MailboxProcessor);
  Number=Runtime.Safe(Global.Number);
  ClientUtils=Runtime.Safe(WsNote.ClientUtils);
  _______________=Runtime.Safe(LoginUI["\u0437\u0430\u043a\u0440\u044b\u0442\u044b\u0435 \u0447\u043b\u0435\u043d\u044b"]);
  window=Runtime.Safe(Global.window);
  _______________1=Runtime.Safe(NewPostUI["\u0437\u0430\u043a\u0440\u044b\u0442\u044b\u0435 \u0447\u043b\u0435\u043d\u044b"]);
  _______________2=Runtime.Safe(PostUI["\u0437\u0430\u043a\u0440\u044b\u0442\u044b\u0435 \u0447\u043b\u0435\u043d\u044b"]);
  jQuery=Runtime.Safe(Global.jQuery);
  return View1=Runtime.Safe(Next.View1);
 });
 Runtime.OnLoad(function()
 {
  UINextUtils.input0();
  _______________1["var'title"]();
  _______________1["var'is'creating"]();
  _______________1["var'content"]();
  NewPostUI.on();
  NewPostUI.button();
  _______________["var'user"]();
  _______________["var'pass"]();
  _______________["var'is'visible"]();
  _______________["var'is'loginign'process"]();
  _______________["var'is'logged'in"]();
  _______________["var'error"]();
  _______________.op_SpliceUntyped();
  _______________.localStorage();
  _______________["key'user"]();
  _______________["key'pass"]();
  _______________.key();
  _______________["button'logout"]();
  _______________["button'login"]();
  LoginUI["set'logged'in"]();
  LoginUI["on'visible"]();
  LoginUI["is'logged'in"]();
  LoginUI["doc'logining"]();
  LoginUI.button();
  _______________________________________________________________________.crud();
  _____________________________________["var'posts'count"]();
  _____________________________________["var'page'number"]();
  _____________________________________["var'context"]();
  return;
 });
}());
