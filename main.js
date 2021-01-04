const express = require("express");
const app = express();
const answerOperation = require("./db");
const bodyparser = require("body-parser");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.post("/addAnswer", (req, res) => {
  answerOperation.addAnswer(req.body, res);
  return res.send({pass:true}); 
});

app.post("/demoAnswer", (req, res) => {
  answerOperation.demoAnswer(req.body, res);
});

app.get("/getAnswers", (req, res) => {
  answerOperation.getAnswers(res);
});

app.post("/getOneAnswer", (req, res) => {
  answerOperation.getOneAnswer(req.body, res);
});

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);
