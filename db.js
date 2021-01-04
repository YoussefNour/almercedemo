const admin = require("firebase-admin");

var serviceAccount = require("./admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://almerce-demo-default-rtdb.firebaseio.com/",
  storageBucket: "gs://almerce-demo.appspot.com",
  authDomain: "almerce-demo.firebaseapp.com",
});

var db = admin.database();
var answerRef = db.ref("answers");

const answerOperation = {
  addAnswer(obj, res) {
    var oneAnswer = answerRef.child(obj.roll);
    oneAnswer.update(obj, (err) => {
      if (err) {
        res.status(300).json({ msg: "Something went wrong", error: err });
      } else {
        res.status(200).json({ msg: "answer created sucessfully" });
      }
    });
  },
  demoAnswer(obj, res) {
    var answerRefdemo = db.ref("demoanswers");
    var oneAnswer = answerRefdemo.child(obj.roll);
    oneAnswer.push(obj, (err) => {
      if (err) {
        res.status(300).json({ msg: "Something went wrong", error: err });
      } else {
        res.status(200).json({ msg: "answer created sucessfully" });
      }
    });
  },
  getAnswers(res) {
    answerRef.once("value", function (snap) {
      res.status(200).json({ answers: snap.val() });
    });
  },
  getOneAnswer(obj, res) {
    var answerRefdemo = db.ref("answers");
    var oneAnswer = answerRefdemo.child(obj.roll);
    oneAnswer.once("value", function (snap) {
      res.status(200).json({ answer: snap.val() });
    });
  },
};

module.exports = answerOperation;
