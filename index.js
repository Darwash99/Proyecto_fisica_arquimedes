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

app.get('/latest', (req,res)=> res.json(last || {ok:false}));

// ==== RUTA DASHBOARD ====
app.get('/', (req,res)=>{
  res.render('dashboard', { sensor: last });
});

// Server
app.listen(3000, ()=> console.log("Node en http://localhost:3000"));
