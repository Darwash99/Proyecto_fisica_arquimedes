const express = require('express');
const cors = require('cors');
// const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views'); // carpeta donde estarán los .ejs

// Variable global para guardar última lectura
let last = null;

// ==== ROUTES API ====
app.post('/data', (req,res)=>{
  last = { ...req.body, receivedAt: Date.now() };
  console.log("RX:data:", last);
  res.json({ ok: true });
});

// Variables para simular los datos dinámicos
let esp32_1 = {
  Esp32_1: true,
  distance: 43.8,
  unit: "cm",
  temperature: 22.5,
  humidity: 64,
  ts: 7527,
  receivedAt: Date.now(),
};

let esp32_2 = {
  Esp32_2: true,
  flame: 1,
  rpm: 0,
  ts: 14646,
  receivedAt: Date.now(),
};

app.get('/latest', (req,res)=> {
  const merged = {
    ok: true,
    timestamp: Date.now(),
    data: [esp32_2, esp32_1],
  };
  res.json(merged);
});

// ==== RUTA DASHBOARD ====
app.get('/', (req,res)=>{
  res.render('dashboard', { sensor: last });
});


// Server
app.listen(4000, ()=> console.log("Node en http://localhost:4000"));
