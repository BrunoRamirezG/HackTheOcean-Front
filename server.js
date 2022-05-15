const mysql = require('mysql');
const express = require('express');
var cors = require('cors');
const path = require('path');
const app = express()
const port = 3000

var conn=mysql.createConnection({host:"hackocean.mysql.database.azure.com", user:"daniel", password:"password1.0", database:"oceanhack", port:3306});

conn.connect((err)=>{
  if(err){ 
    console.log('Error in DB Connection');
    throw err;
  } else{
    console.log('Connected to the DB!');
  }
})

app.use(cors());
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/region1', (req, res) => {
  //res.send('Hello World!')
  conn.query(`SELECT es.nombre_especie, e.es_endemica, e.es_amenazada, e.fecha_inicio_veda, fecha_fin_veda FROM espregprod as e, especies as es WHERE e.id_especie=es.id_especie AND id_region='1';`, function (err, result) {
    console.log(JSON.stringify(result));
    if (err || result[0] == undefined){
      res.send('{"mensaje":"error db"}');
      throw err;
    } else{
      res.send(JSON.stringify(result));
    }
  });
})

app.get('/region2', (req, res) => {
  //res.send('Hello World!')
  conn.query(`SELECT es.nombre_especie, e.es_endemica, e.es_amenazada, e.fecha_inicio_veda, fecha_fin_veda FROM espregprod as e, especies as es WHERE e.id_especie=es.id_especie AND id_region='2';`, function (err, result) {
    console.log(JSON.stringify(result));
    if (err || result[0] == undefined){
      res.send('{"mensaje":"error db"}');
      throw err;
    } else{
      res.send(JSON.stringify(result));
    }
  });
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})