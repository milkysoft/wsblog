namespace WsNote

open FSharp.Data
open System
open System.Data.SqlClient

module Database = 
    
    module Sql = 
        [<Literal>]
        //let connectionString = """Data Source=(LocalDB)\v11.0;AttachDbFilename="C:\Users\User\Documents\Visual Studio 2013\Projects\Blog1\ConsoleApplication1\DatabaseBlog.mdf";Integrated Security=True"""        

        //let connectionString = "Server=TF5ALEXEYZUO\SQLSRV2012;Database=trunk;User Id=sa;Password=1!password;"
        let connectionString = "Server=52.74.177.104\SQLEXPRESS;Database=blog;User Id=milky;Password=Qwerty123;"
        type GetBlog = SqlCommandProvider<"SELECT * FROM Post" , connectionString>

        type DeletePost = SqlCommandProvider<"DELETE FROM Post WHERE Id=@id" , connectionString>

        type SetPost = SqlCommandProvider<"""
    UPDATE Post
    SET EditDate = GETDATE(), Content = @content, Title = @title    
    OUTPUT INSERTED.*
    WHERE Id=@id""" , connectionString>

        type CreateNewPost = SqlCommandProvider<"""
    INSERT INTO Post(CreateDate, EditDate, Title, Content)
    OUTPUT INSERTED.*
    VALUES(GETDATE(), GETDATE(), @title, @content);""", connectionString>

        let conn = 
            let conn = new SqlConnection(connectionString)
            conn.Open()
            conn

    let getBlog() = 
        (new Sql.GetBlog()).AsyncExecute() 

    let addNewPost title content = 
        (new Sql.CreateNewPost()).AsyncExecute(title = title, content = content ) 

    let setPost id title content =
        (new Sql.SetPost()).AsyncExecute(id = id, title = title, content = content ) 

