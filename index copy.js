// server.js
const express = require('express'), cors = require('cors');
const app = express();
app.use(cors()); app.use(express.json());

let last = null;
app.post('/data', (req,res)=>{ last = {...req.body, receivedAt: Date.now()}; console.log('RX:dara?', last); res.json({ok:true}); });
app.get('/latest', (req,res)=> res.json(last || {ok:false}));

app.listen(3000, ()=> console.log('Node en http://0.0.0.0:3000'));
