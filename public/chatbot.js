var questionIndex = 0;
var answers = [];
const questions = [
  "مساء الخير يا فندم اخبارك ايه اتشرف بالاسم",
  "ممكن اعرف سن الطفل اللي هيلعب باللعبة ؟",
  "الطفل ولد و لا بنت ؟",
  "ايه هي المهارات اللي عايز اللعبة تنميها عند الطفل باللعبة ؟",
  "حضرتك تحب اللعبة من اني قسم ؟",
  "حضرتك تحب تكون اللعبه بنظام التعليم مونتيسوري ؟",
  "هل تشطرت الخامة بتاعة اللعبة تكون ضد الكسر ؟",
  "تحب ادورلك في الاسعار من كام لكام ؟",
  "شكرا لوقتك انتهت الأسألة ممكن تزور موقع الصفوة لو نفسك فى لعبة لطفلك"
];

const sendmessage = () => {
  let texts = document.getElementById("chat");
  if (questionIndex < questions.length) {
    texts.innerHTML += outputmessage();
  }
  scrollToBottom("chat");
  if(questionIndex >= questions.length){
    $("#message").css("display","none");
    $("#sendbutton").css("display","none");
  }
};

const receivemessage = () => {
  let input = document.getElementById("message").value;
  answers.push(input);
  if (input != "" && questionIndex < questions.length) {
    let texts = document.getElementById("chat");
    texts.innerHTML += inputmessage(input);
    sendmessage(texts, questionIndex);
    document.getElementById("message").value = "";
    console.log(answers);
    console.log(questionIndex);
    console.log(questions.length);
  }
  if(questionIndex === questions.length){
    console.log("sending data");
    $.ajax({
      type: "POST",
      url: "http://localhost:3000/addAnswer",
      //url: "https://almerce-demo.herokuapp.com/addAnswer",
      data: {
        name:answers[0],
        age:answers[1],
        gender:answers[2],
        skills:answers[3],
        material:answers[4],
        category:answers[5],
        montesory:answers[6],
        price:answers[7]
      },
      success: (res) => {
        if(res.pass){
          console.log("success");
        } else {
          alert("Error your message was not sent");
        }
        console.log(res);
      },
    });
  }
};

const outputmessage = () => {
  return `<div class="outputmessage">
        <img class="messageprofile" src="/images/robot.jpg">
        <label>${questions[questionIndex++]}</label>
    </div>`;
};

const inputmessage = (userMessage) => {
  return `<div class="inputmessage">
    <img class="messageprofile" src="/images/flat-business-man-user-profile-avatar-icon-vector-4333097.jpg">
    <label>${userMessage}</label>
    </div>`;
};

function scrollToBottom(id) {
  var div = document.getElementById(id);
  div.scrollTop = div.scrollHeight - div.clientHeight;
}

// Make sure this code gets executed after the DOM is loaded.
document.querySelector("#message").addEventListener("keyup", (event) => {
  if (event.key !== "Enter") return; // Use `.key` instead.
  document.querySelector("#sendbutton").click(); // Things you want to do.
  event.preventDefault(); // No need to `return false;`.
});
