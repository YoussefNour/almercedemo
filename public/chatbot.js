var questionIndex = 0;
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
  if (input != "" && questionIndex < questions.length) {
    let texts = document.getElementById("chat");
    texts.innerHTML += inputmessage(input);
    $.ajax({
      type: "POST",
      url: "https://almerce-demo.herokuapp.com",
      data: {
        questionIndex: questionIndex,
        reply: input,
      },
      success: (res) => {
        if(res.pass){
          sendmessage(texts, questionIndex);
          document.getElementById("message").value = "";
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