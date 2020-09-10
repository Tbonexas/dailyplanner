// global variables //
var scheduledHours = [];
var availableHours = {};
var m = moment();
var newDay = moment().hour(0);
var currentTime = m.hour();

// adds clock to currentDay // 
function clock() {
  var dateString = moment().format('MMMM Do YYYY, h:mm:ss a');
  $('#currentDay').html(dateString);
}
// allows clock to tick in real time on header // 
setInterval(clock, 1000);

//generates text on BS columns //
for (var hour = 9; hour < 22; hour++) {
  scheduledHours.push(moment({hour}).format('h  a'));
  $('.container').append(`<div class='row time-block' data-time='${hour}'>
       <!--hour column-->
           <div class='col-sm col-md-2 hour'>
             <p>${moment({hour}).format('h  a')}</p>
           </div>
        <!--scheduling column-->
           <div class='col-sm col-md-10 d-flex description'>
              <div class='input-group'>
                <textarea class="form-control text-area"></textarea>
                <div class='input-group-append'>
                  <button class='save-button d-flex justify-center align-center'>
                    <i class='far fa-save fa-2x save-icon'></i>
                  </button>
                </div>
              </div>
            </div>
          </div>`);
// End BS columns generation // 
}


// Checks time for present, past, or future //
$.each($('.time-block'), function(index, value) {
  let dateHour = $(value).attr('data-time');
  if (Number(dateHour) === m.hour()) {
    $(this).find('textarea').addClass('present');
  } else if (Number(dateHour) < m.hour()) {
    $(this).find('textarea').addClass('past').attr('disabled', 'disabled');
    $(this).find('.save-button').addClass('disabled').attr('disabled', true);
  } else {
    $(this).find('textarea').addClass('future');
  }
});
// logs current time in console to determine accuracy with moment.js // 
console.log(currentTime);

if (currentTime >=0 && currentTime < 9){
  localStorage.clear();
}

//Checks local storage and sets value to the object or clears if currentTime is between 12am and 9am // 
if (localStorage.getItem('availableHours')) {
  availableHours = JSON.parse(localStorage.getItem('availableHours'));
} else {
    // Time blocks 9am - 9pm // 
  availableHours = {
    '9': {
      time: '9',
      value: ''
    },
    '10': {
      time: '10',
      value: ''
    },
    '11': {
      time: '11',
      value: ''
    },
    '12': {
      time: '12',
      value: ''
    },
    '13': {
      time: '13',
      value: ''
    },
    '14': {
      time: '14',
      value: ''
    },
    '15': {
      time: '15',
      value: ''
    },
    '16': {
      time: '16',
      value: ''
    },
    '17': {
      time: '17',
      value: ''
    },
    '18': {
      time: '18',
      value: ''
    },
    '19': {
      time: '19',
      value: ''
    },
    '20': {
      time: '20',
      value: ''
    },
    '21': {
      time: '21',
      value: ''
    },
  };
}

//set value of availableHours to equal the user input for each row
$('.time-block').each(function() {
  $(this).find('.text-area').val(availableHours[$(this).attr('data-time')].value);
});

// Saves to local storage with on click //
$('.save-button').on('click', function(event){
  event.preventDefault();

  //set availableHours time attribute
  var timeValue = $(this).closest('.time-block').attr('data-time');

  // set availableHours attributes // 
    var textValue = $(this).closest('.time-block').find('.text-area').val();
    availableHours[timeValue].value = textValue;

  //save user input of each object to local storage // 
    localStorage.setItem('availableHours', JSON.stringify(availableHours));
});
