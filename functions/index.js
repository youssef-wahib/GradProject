const functions = require("firebase-functions");
var express = require('express');
var regression = require('regression');
const admin = require('firebase-admin');
admin.initializeApp();
var app = express();

let prediction = []
const dataa = [];
const root = admin.database().ref();
admin.database().ref("Emergency_Readings/").on("value", (snapshot) => {
  const points = snapshot.val();
  Object.entries(points).map((values) => {
    dataa.push(createData(values[0], values[1]));
  });
  
  for (let l in dataa){
    let y = dataa[l].amount
    let x = parseInt(dataa[l].time.slice(0,2))
    dataa[l] = ([x, y]);
    
 }
 
 const result = regression.polynomial(dataa, { order: 1 });
 
 function fix(inp){
   if(inp > 24){
   return (inp % 24) - 1
   }
   else{
     return inp
   }
 }
 
 

 for (let l = dataa.length; l < dataa.length+8;l++ ){
   prediction.push(result.predict(l))
 }
 
});



function createData(time, amount) {
  return { time, amount };
}



app.get('/', function (req, res) {
  
  
  res.json({ "prediction": prediction })
});

var port = process.env.PORT || 5001

app.listen(port, function () {
  console.log('Example app listening on port ' + port + '!');
});