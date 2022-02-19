const { error } = require('console');
const request=require('request');

const forecast=(longitude,latitude,callback)=>{
    const url='http://api.weatherapi.com/v1/current.json?key=79d7c108e522498097b12210221801&q='+longitude+','+latitude+'&aqi=no'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("unable to connect with the server",undefined)
        }
        else{
            callback(undefined,"the day is "+response.body.current.condition.text+", temp_c: "+response.body.current.temp_c);
        }
    })
}
module.exports=forecast;