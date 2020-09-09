function Question(text,choices,answer){
  this.text=text;
  this.choices=choices;
  this.answer = answer ;
}

//QUESTİON PROTOTYPE -> Soru cevaplrını kontrol amaçlı.
Question.prototype.checkAnswer = function (answer){
  return this.answer === answer;  //questiondan türetilen nesnenin asnwerı dışarıdan gelen answerla aynı mı
}

{{ }}

//QUİZ CONSTRUCTOR
function Quiz(questions){
  this.questions = questions;
  this.score = 0;
  this.questionIndex = 0;
}

//QUİZ prototype
Quiz.prototype.getQuestion = function(){
  return this.questions[this.questionIndex];
}

//QUİZ İS FİNİSH
Quiz.prototype.isFinish = function(){
  return this.questions.length === this.questionIndex;
}

//QUİZ GUESS
Quiz.prototype.guess = function(answer){
  var question = this.getQuestion();

  if (question.checkAnswer(answer)) {
    this.score++;
  }
  this.questionIndex++;
}

var q1 = new Question("what is the most popular language?", ["java","c#","pyhton","javascript"],"javascript");
var q2 = new Question("which one do you use?", ["java","c#","pyhton","javascript"],"javascript");
var q3 = new Question("what is the easier language?", ["java","c#","pyhton","javascript"],"javascript");

console.log(q1.checkAnswer("c#"));
console.log(q1.checkAnswer("javascript"));
console.log(q2.checkAnswer("java"));
console.log(q2.checkAnswer("javascript"));

var questions = [q1,q2,q3];
 //START QUİZ
 var quiz = new Quiz(questions);
 loadQuestion();


//  console.log(quiz.isFinish);
// console.log(quiz.getQuestion);  //1. soru
// quiz.guess("javascript");
//
// console.log(quiz.getQuestion);  //2. soru
// quiz.guess("python");
//
// console.log(quiz.getQuestion);  //3. soru
// quiz.guess("javascript");

function loadQuestion(){
  if (quiz.isFinish()) {
    showScore();
  }else{
    var question = quiz.getQuestion();
    var choices = question.choices;

    document.querySelector('#question').textContent = question.text;

    for (var i = 0; i < choices.length; i++) {
      var element = document.querySelector('#choice'+i);
      element.innerHTML = choices[i];
      guess('btn'+i, choices[i]);
    }
    showProgress();
  }
}

    function guess(id,guess){
      var btn = document.getElementById(id);
      btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
      }
    }
  function showScore(){
    var html = `<h2>Score</h2><h4>${quiz.score}</h4>`;

    document.querySelector('.card-body').innerHTML = html;
  }

function showProgress(){
  var totalQuestion = quiz.questions.length;
  var questionNumber = quiz.questionIndex+1;
  document.querySelector('#progress').innerHTML = 'Question '+ questionNumber+'  of  '+ totalQuestion;
}
