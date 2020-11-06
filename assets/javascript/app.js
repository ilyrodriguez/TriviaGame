$(document).ready(function() {

    $("#btnSubmit").hide();
    $("#btnReset").hide();
    var audio = document.getElementById("myAudio"); 
    var timeLeft = 35;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var intervalId;
 
var allQuestions = [{
    question: "At the beginning of the series, how many children do Ned and Catelyn Stark have?",
    choices: [" 4 ", " 5 ", " 6 ", " 3 "],
    answer: " 5 "
},
{
    question: "Who is the first character in the series to be called King in the North?",
    choices: ["Jon Snow", "Ned Stark", "Robb Stark", "Edmure Tully"],
    answer: "Robb Stark"
},
{
    question: "How does Daenerys hatch her dragon eggs?",
    choices: ["In a funeral pyre", "With the help of a sorceress", "With a lightning strike", "Using wildfire"],
    answer: "In a funeral pyre"
},
{
    question: "Who is Sansa Stark's first fiancé?",
    choices: ["Tyrion Lannister", "Joffrey Baratheon", "Loras Tyrell", "Tommen Baratheon"],
    answer: "Joffrey Baratheon"
},
{
    question: "What is Jon Snow's real name?",
    choices: ["Jon", "Aerys", "Aegon", "Rhaegar"],
    answer:"Aegon"
}]

$(document).on('click', "#btnStart", function(){
    start();
    $("#btnStart").hide();
    $("#btnSubmit").show();
    playAudio();
 });
  
 $(document).on('click', "#btnSubmit", function() {
     done();
 });

 function start() {
    $("#questionArea").empty();
    for (i = 0; i < allQuestions.length; i++) {
        $("#questionArea").append('<h3 class="question-line">' + allQuestions[i].question + '</h3><div class="form-check form-check-inline"><label class="form-check-label" for="inlineRadio1' + [i] + '"><input class="form-check-input" type="radio" name="inlineRadioOptions' + [i] + '" id="inlineRadio1' + [i] + '">' + allQuestions[i].choices[0] + '</label></div><div class="form-check form-check-inline"><label class="form-check-label" for="inlineRadio2' + [i] + '"><input class="form-check-input" type="radio" name="inlineRadioOptions' + [i] + '" id="inlineRadio2' + [i] + '">' + allQuestions[i].choices[1] + '</label></div><div class="form-check form-check-inline"><label class="form-check-label" for="inlineRadio2' + [i] + '"><input class="form-check-input" type="radio" name="inlineRadioOptions' + [i] + '" id="inlineRadio2' + [i] + '">' + allQuestions[i].choices[2] + '</label></div><div class="form-check form-check-inline"><label class="form-check-label" for="inlineRadio3' + [i] + '"><input class="form-check-input" type="radio" name="inlineRadioOptions' + [i] + '" id="inlineRadio3' + [i] + '">' + allQuestions[i].choices[3] + '</label></div>');
    }
    
    $("#timer").html("<h2>Time Remaining: " + timeLeft + " Seconds</h2>");
    clearInterval(intervalId);
    intervalId = setInterval(decrement, 1000);
    $("#btnSubmit").show();
    $("#btnStart").hide();
    $("#rules").hide();
}

function playAudio() { 
    console.log(audio);
  audio.play(); 
} 

function pauseAudio() { 
  audio.pause(); 
  audio.currentTime= 0;
} 

$(".volmute").click(function(){
    $(".volmute").css("color", "gray");
    $(".volunmute").css("color", "white");
    pauseAudio();
})
$(".volunmute").click(function(){
    $(".volunmute").css("color", "gray");
    $(".volmute").css("color", "white");
    playAudio();
});

function decrement() {
    timeLeft--;
    $("#timer").html("<h2>Time Remaining: " + timeLeft + " Seconds</h2>");
    if (timeLeft === 0) {
      done();
      results();
    }
  }
 function done() {
    clearInterval(intervalId);
    $("#questionArea").hide();
    $("#btnSubmit").hide();
    $("#btnStart").hide();
    $("#btnReset").show();
    $("#resultArea").show();
    results();
    $("#resultArea").html("<h2>All done</h2><h3>Correct: " + correct + "</h3><h3>Incorrect: " + incorrect + "</h3><h3>Unanswered: " + unanswered);
    pauseAudio();
};
function results() {
    for (i = 0; i < allQuestions.length; i++) {
        if ($("input[name='inlineRadioOptions" + i + "']:checked").parent().text() === allQuestions[i].answer) {
            correct++;
        }
        else if ($("input[name='inlineRadioOptions" + i + "']:checked").parent().text().length === 0) {
            unanswered++;
        }
        else {
            incorrect++;
        }
        ;
    }
    ;
}

$("#btnReset").on("click", function () {
    $("#btnReset").hide();
    timeLeft = 35;
    correct = 0;
    incorrect = 0;
    unanswered = 0;
    $("#questionArea").show();
    $("#resultArea").hide();
    $("#btnStart").show();
    start();
    audio.play(); 
});
});