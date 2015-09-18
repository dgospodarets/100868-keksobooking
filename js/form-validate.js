var addLeadingZero = function(value) {
  if (value < 10) {
    return '0' + value;
  }

  return '' + value;
};

var getFormattedDate = function(date) {
  if (typeof date === 'undefined') {
    date = new Date();
  }

  var fullMonth = addLeadingZero(date.getMonth() + 1);
  var fullDate = addLeadingZero(date.getDate());

  return [date.getFullYear(), fullMonth, fullDate].join('-');
};

var formElement = document.forms['searchform'];

var dateFrom = formElement['form-from'];
var dateTo = formElement['form-to'];
var guestsNumber = formElement['searchform-guests-number'];
var roomsNumber = formElement['searchform-guests-rooms'];

var MAX_GUESTS_AVAILABLE = 6;
var MAX_GUESTS_PER_ROOM = 3;
var MIN_GUESTS_PER_ROOM = 1;
var MILLISECONDS_IN_DAY = 60 * 60 * 24 * 1000;

var minimalDifference = MILLISECONDS_IN_DAY;

guestsNumber.value = 2;
roomsNumber.value = 1;
dateFrom.value = getFormattedDate();
dateTo.value = getFormattedDate(new Date(new Date(dateFrom.value) + minimalDifference * 2));

guestsNumber.min = 1;
roomsNumber.min = 1;
dateFrom.min = getFormattedDate();

roomsNumber.onchange = function(evt) {
  guestsNumber.min = parseInt(roomsNumber.value, 10) * MIN_GUESTS_PER_ROOM;
  guestsNumber.max = parseInt(roomsNumber.value, 10) * MAX_GUESTS_PER_ROOM;
};

guestsNumber.onchange = function(evt) {
  roomsNumber.min = parseInt(parseInt(guestsNumber.value, 10) / MAX_GUESTS_PER_ROOM, 10);
  roomsNumber.max = parseInt(parseInt(guestsNumber.value, 10) / MIN_GUESTS_PER_ROOM, 10);
};

dateFrom.onchange = function(evt) {
  var dateFromValue = new Date(dateFrom.value);
  var dateToValue = new Date(dateTo.value);
  var minimalToDate = getFormattedDate(new Date(+dateFromValue + minimalDifference));

  if (dateToValue - dateFromValue < minimalDifference) {
    dateTo.value = minimalToDate;
  }

  dateTo.min = minimalToDate;
};
