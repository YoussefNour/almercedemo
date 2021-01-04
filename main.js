const express = require("express");
const route = require("express").Router();
const answerOperation = require("./db");
const app = express();
const bodyparser = require("body-parser");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
const port = 3000;
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

// route.post("/",(req,res)=>{
//     const { name,age,gender,skills,material,category,montesory,price } = req.body;
//     console.log(req.body);
//     return res.send({pass:true,reply});
// });

route.post("/addAnswer", (req, res) => {
  answerOperation.addAnswer(req.body, res);
});

route.post("/demoAnswer", (req, res) => {
  answerOperation.demoAnswer(req.body, res);
});

route.get("/getAnswers", (req, res) => {
  answerOperation.getAnswers(res);
});

route.post("/getOneAnswer", (req, res) => {
  answerOperation.getOneAnswer(req.body, res);
});

module.exports = route;

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);