console.log("hello world")
const address="ain ouusera";
fetch('http://localhost:3020/weather?address=algeria').then((response)=>{
    response.json().then((data)=>{
        console.log(data.location);
        console.log(data.forcast)  
    })
})

const weather_form=document.querySelector('form')
const search =document.querySelector('input')
const message_01=document.querySelector('#message-01')
const message_02=document.querySelector('#message-02')

weather_form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const location=search.value
    fetch('/weather?address='+location).then((response)=>{
    response.json().then((data)=>{
        message_01.textContent="loading ..."
        if(data.error){
            message_01.textContent=data.error;
            message_01.style.color='red';
        }else{
            message_01.style.color='black'
            message_01.textContent=data.location;
            message_02.textContent=data.forcast;
        }
    })
})
})