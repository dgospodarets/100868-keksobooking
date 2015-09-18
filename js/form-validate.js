var formElement = document.forms['searchform'];

var guestsNumber = formElement['searchform-guests-number'];
var roomsNumber = formElement['searchform-guests-rooms'];

var MAX_GUESTS_AVAILABLE = 6;
var MAX_GUESTS_PER_ROOM = 3;
var MIN_GUESTS_PER_ROOM = 1;

guestsNumber.value = 2;
roomsNumber.value = 1;

guestsNumber.min = 1;
roomsNumber.min = 1;

roomsNumber.onchange = function(evt) {
  guestsNumber.min = parseInt(roomsNumber.value, 10) * MIN_GUESTS_PER_ROOM;
  guestsNumber.max = parseInt(roomsNumber.value, 10) * MAX_GUESTS_PER_ROOM;
};

guestsNumber.onchange = function(evt) {
  roomsNumber.min = parseInt(parseInt(guestsNumber.value, 10) / MAX_GUESTS_PER_ROOM, 10);
  roomsNumber.max = parseInt(parseInt(guestsNumber.value, 10) / MIN_GUESTS_PER_ROOM, 10);
};
