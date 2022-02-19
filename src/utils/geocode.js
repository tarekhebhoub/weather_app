const request= require('request')
const geocode=(address,callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoidGFyZWtoZSIsImEiOiJja3lqZXhhcmQybG5hMnBvOGpzZDFsbGx3In0.1YV2OaXoromLrI3ETkId0w'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback("enable to connect with the server",undefined);
        }else if(response.body.features.length===0){
            callback("the location u search for not found",undefined)
        }else{
            const latitude=response.body.features[0].center[0];
            const longtitude=response.body.features[0].center[1];
            const location=response.body.features[0].place_name;
            callback(null,[longtitude,latitude,location])
        }
    })
}
module.exports=geocode