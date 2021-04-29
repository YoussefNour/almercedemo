const express = require("express");
const app = express();
const answerOperations = require("./db");
const bodyparser = require("body-parser");
const cors = require("cors");
const http = require("http");
const server = http.createServer(app);
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.static("public"));

app.post("/addAnswer", (req, res) => {
  //answerOperation.addAnswer(req.body, res);
  //console.log(req.body);
  answerOperations.sendData(req.body);
  return res.send({pass:true}); 
});


app.get("/getAnswers", (req, res) => {
  answerOperations.getData(res);
});

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);
