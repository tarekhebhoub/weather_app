const path=require('path');
const express =require('express')
const hbs=require('hbs')
const app =express();
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

//define paths for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

//setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve like css,js and img
app.use(express.static(publicDirectoryPath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather app',
        name:'tarek'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about page',
        name:'tarek hebhoub'
    })
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return  res.send({
            error:'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide un address!'
        })
    }

    geocode(req.query.address,(error,data)=>{
        if (error){
          return res.send({error})
        }
        forecast(data[0],data[1],(error,forecast_data)=>{
          if(error){
            return res.send({error})
          }
          res.send({
              forcast:forecast_data,
              location:data[2],
              address:req.query.address
          })
        })
      })
})
app.get('/about/*',(req,res)=>{
    res.render('error',{
        errormessage:'articale not found'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        errormessage:'page not found'
    })
})
app.listen(3020,()=>{
    console.log('Server is up on port 3020.')
})