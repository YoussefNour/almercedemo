const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const port = 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(cors());
app.use(express.static("public"));

app.post("/",(req,res)=>{
    const { questionIndex, reply } = req.body;
    console.log(req.body);
    return res.send({pass:true,reply});
});

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);