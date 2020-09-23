//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");


const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {
  const cityName=req.body.city;
  const url="https:api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid=275dd4a3b2f2933c5057a05537e53a59&units=metric";
  https.get(url, function(response){
    console.log('statusCode:', response.statusCode);

    response.on("data", function(data){
      const weatherData=JSON.parse(data);
    var temperature=weatherData.main.temp;
    var weatherDescription=weatherData.weather[0].description;
    const image=weatherData.weather[0].icon;
    const icon="http://openweathermap.org/img/wn/"+image+"@2x.png";
    res.write("<p><h2>The Temperature in "+cityName+" is "+temperature+" Degree Celcius "+"<h2></p>");
    res.write("<p>The Weather Description is "+weatherDescription+"</p>");
    res.write("<img src="+icon+">");
    res.send();
  });
});
});
app.listen(3000, function() {
  console.log("Server running at port no 3000");
});
