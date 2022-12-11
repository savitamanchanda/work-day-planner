
// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

$(document).ready(function() { 

//displays the current date and time in the header of the page.

var timeDisplay = $('#time-display');

function displayTime() {
  var rightNow = dayjs().format('MMM DD, YYYY [at] hh:mm:ss a')
  timeDisplay.text(rightNow);
}

displayTime();
setInterval(displayTime, 1000);

// gets the current hour 
var currentHour = new Date().getHours();
console.log(currentHour);

var hours = ['#9', '#10', '#11', '#12', '#13', '#14', '#15', '#16', '#17']

var index = hours.findIndex(element => element === `#${currentHour}`);

//id attribute of each time-block used to conditionally add or remove the past, present, and future classes
if (currentHour > 17) {
  for (i = 0; i < hours.length; i++) {
    $(hours[i]).removeClass('present');
    $(hours[i]).removeClass('future');
    $(hours[i]).addClass('past');
  }
} 
else if (currentHour < 9) {
  for (i = 0; i < hours.length; i++) {
    $(hours[i]).removeClass('present');
    $(hours[i]).removeClass('past');
    $(hours[i]).addClass('future');
  }
}
else {

for (i = index; i < hours.length; i++) {
  $(hours[i]).addClass('future');
  $(hours[i]).removeClass('present');
  $(hours[i]).removeClass('past');
}

for (i = index; i > 0; i--) {
  $(hours[i]).addClass('past');
  $(hours[i]).removeClass('present');
  $(hours[i]).removeClass('future');
}

$(hours[index]).addClass('present');
$(hours[index]).removeClass('past');
$(hours[index]).removeClass('future');
console.log(index);

};

// listener for click events on the save button to save the user input in local storage.

$(".saveBtn").on("click", function() {
  var time = $(this).siblings(".hour").text();
  var input = $(this).siblings(".description").val();
  $("#appt").text("✔️ Appointment added to calendar");
  $("#appt").delay(1000).fadeOut(500);

  localStorage.setItem(time, input);
  console.log(time,value);
});

// get the input saved from local storage

function getInput() {
  $(".hour").each(function () {
    var currentTime = $(this).text();
    var currentInput = localStorage.getItem(currentTime);

    if (currentInput !== null) {
      $(this).siblings(".description").val(currentInput)
    }
  });

}

getInput();

});