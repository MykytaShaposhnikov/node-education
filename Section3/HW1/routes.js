const routes=(req,res)=>{
    if(req.url==='/'){
        res.write('<html><p>Hello user</p><form method="POST" action="/create-user"><input type="text" name="user"/><button type="submit">Send</button></form></html>');

        res.end()
    }
    if(req.url==='/users'){
        res.write('<html><ul><li>User1<li/><li>User2<li/><li>User3<li/></ul></html>');
        res.end()
    }

    if(req.url==='/create-user' && req.method==='POST'){
        const data = [];
    req.on('data',(chunk)=>{
data.push(chunk)
    })
        req.on('end',()=>{
            console.log(Buffer.concat(data).toString().split('=')[1]);
            res.statusCode=302;
            res.setHeader('Location','/users');
            res.end() })
    }
}

module.exports=routes;
