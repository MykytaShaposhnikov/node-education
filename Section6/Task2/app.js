const express=require('express')
const path = require("path");
const bodyParser=require('body-parser')

const formRoutes=require('./routes/form')
const usersRoutes=require('./routes/users')

const app=express()

app.set('view engine','ejs')
app.set('views','views')

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static(path.join(__dirname,'public')))

app.use(formRoutes.routes)
app.use(usersRoutes)

app.listen(4000)
