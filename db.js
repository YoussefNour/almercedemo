const admin = require("firebase-admin");
var fs = require('fs');

var serviceAccount = require("./admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

var db = admin.firestore();

const sendData = (answer) => {
  console.log(answer)
  db.collection('answers').add(answer).then( doc =>{

   console.log("Added")
  })
  .catch(err => {
    console.log(err);
  })
}

const getData = (res) => {
  db.collection('answers').get().then( data => {
    let answers = [];
    data.forEach( doc => {
      answers.push({
            answerId: doc.id,
            ...doc.data()
        });
    })
    let results = JSON.stringify(answers)
    console.log(results)
    fs.writeFile('./data.json', results, 'utf8',(err,data)=>{
      console.log(err)
    });
    return res.send("good");
})
.catch(err => {
    console.log(err);
});
}

module.exports = {sendData, getData}















// var answerRef = db.ref("answers");

// const answerOperation = {
//   addAnswer(obj, res) {
//     var oneAnswer = answerRef.child(obj.roll);
//     oneAnswer.update(obj, (err) => {
//       if (err) {
//         res.status(300).json({ msg: "Something went wrong", error: err });
//       } else {
//         res.status(200).json({ msg: "answer created sucessfully" });
//       }
//     });
//   },
//   demoAnswer(obj, res) {
//     var answerRefdemo = db.ref("demoanswers");
//     var oneAnswer = answerRefdemo.child(obj.roll);
//     oneAnswer.push(obj, (err) => {
//       if (err) {
//         res.status(300).json({ msg: "Something went wrong", error: err });
//       } else {
//         res.status(200).json({ msg: "answer created sucessfully" });
//       }
//     });
//   },
//   getAnswers(res) {
//     answerRef.once("value", function (snap) {
//       res.status(200).json({ answers: snap.val() });
//     });
//   },
//   getOneAnswer(obj, res) {
//     var answerRefdemo = db.ref("answers");
//     var oneAnswer = answerRefdemo.child(obj.roll);
//     oneAnswer.once("value", function (snap) {
//       res.status(200).json({ answer: snap.val() });
//     });
//   },
// };

// module.exports = answerOperation;
