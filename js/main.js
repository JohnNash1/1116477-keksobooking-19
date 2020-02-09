'use strict';

var AVATAR_URLS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
];
var TITLES = [
  'квартира',
  'гараж',
  'торговое помещение',
  'студия',
  'пент-хаус',
  'дом',
  'коттедж',
  'офис'
];
var PRICES = [
  '10000',
  '15000',
  '25000',
  '30000',
  '35000',
  '40000',
  '45000',
  '50000'
];
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var DESCRIBTIONS = [
  'Уютная квартира, только после ремонта',
  'Удобная квартира, сдаётся впервые',
  'Сдаётся на длительный срок',
  'Есть всё для комфортного проживания',
  'Просторная квартира с удобным расположением',
  'Помещение для разнообразных нужд',
  'Сдаётся от собственника, без комиссии',
  'Квартира бизнес-класса для деловых людей'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var MAP_WIDTH = 1062;
var ADVERTISEMENT_AMOUT = 8;
var OFFSET_X = 20;
var OFFSET_Y = 40;
var PIN_INACTIVE_OFFSET = 32;
var PIN_ACTIVE_OFFSET_Y = 43;
var KEY_ENTER = 'Enter';
var KEY_ESC = 'Escape';

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var mapFiltersContainer = document.querySelector('.map__filters-container');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElements = document.querySelectorAll('.ad-form__element');
var addressInput = adForm.querySelector('#address');
var roomsInput = adForm.querySelector('select[name="rooms"]');
var capacityInput = adForm.querySelector('select[name="capacity"]');
var adsPins = mapPins.getElementsByClassName('map__pin--ads');
var adsCards = map.getElementsByClassName('map__card');
var closeButtons = map.getElementsByClassName('popup__close');
var typeInput = adForm.querySelector('select[name="type"]');
var priceInput = adForm.querySelector('input[name="price"]');
var timeinInput = adForm.querySelector('select[name="timein"]');
var timeoutInput = adForm.querySelector('select[name="timeout"]');


var onRoomsSelectChange = function (evt) {
  var target = evt.target;

  if (target.value !== capacityInput.value) {
    target.setCustomValidity('К-во комнат должно соответствовать к-ву гостей');
  } else {
    target.setCustomValidity('');
  }
};

var onCapacitySelectChange = function (evt) {
  var target = evt.target;

  if (target.value !== roomsInput.value) {
    target.setCustomValidity('К-во гостей должно соответствовать к-ву комнат');
  } else {
    target.setCustomValidity('');
  }
};

var onTypeInputChange = function () {
  switch (typeInput.value) {
    case 'bungalo':
      priceInput.min = 0;
      priceInput.placeholder = 0;
      break;
    case 'flat':
      priceInput.min = 1000;
      priceInput.placeholder = 1000;
      break;
    case 'house':
      priceInput.min = 5000;
      priceInput.placeholder = 5000;
      break;
    case 'palace':
      priceInput.min = 10000;
      priceInput.placeholder = 10000;
      break;
  }
};

var onTimeinChange = function (evt) {
  timeoutInput.value = evt.target.value;
};

var onTimeoutChange = function (evt) {
  timeinInput.value = evt.target.value;
};

roomsInput.addEventListener('change', onRoomsSelectChange);
capacityInput.addEventListener('change', onCapacitySelectChange);
typeInput.addEventListener('change', onTypeInputChange);
timeinInput.addEventListener('change', onTimeinChange);
timeoutInput.addEventListener('change', onTimeoutChange);


adFormHeader.setAttribute('disabled', 'disabled');
for (var d = 0; d < adFormElements.length; d++) {
  adFormElements[d].setAttribute('disabled', 'disabled');
}

var setFormActive = function () {
  adFormHeader.removeAttribute('disabled', 'disabled');
  for (var f = 0; f < adFormElements.length; f++) {
    adFormElements[f].removeAttribute('disabled', 'disabled');
  }
};

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomAvatar = function (min, max) {
  return AVATAR_URLS[getRandomNumber(min, max)];
};

var getRandomTitle = function (min, max) {
  return TITLES[getRandomNumber(min, max)];
};

var getRandomPrice = function (min, max) {
  return PRICES[getRandomNumber(min, max)];
};

var getRandomType = function (min, max) {
  return TYPES[getRandomNumber(min, max)];
};

var getRandomTime = function (min, max) {
  return TIMES[getRandomNumber(min, max)];
};

var getRandomDescribtion = function (min, max) {
  return DESCRIBTIONS[getRandomNumber(min, max)];
};

var getRandomAddress = function () {
  var locationX = getRandomNumber(0, MAP_WIDTH);
  var locationY = getRandomNumber(130, 630);
  return locationX.toString() + ', ' + locationY.toString();
};

var getRandomFeatures = function () {
  var randomFeatures = [];
  for (var i = 0; i < getRandomNumber(1, FEATURES.length); i++) {
    randomFeatures[i] = FEATURES[i];
  }

  return randomFeatures;
};

var getRandomPhotos = function () {
  var randomPhotos = [];
  for (var j = 0; j < getRandomNumber(1, PHOTOS.length); j++) {
    randomPhotos[j] = PHOTOS[j];
  }

  return randomPhotos;
};


var getAdvertisement = function () {
  var advertisement = {
    'author': {
      'avatar': getRandomAvatar(0, 7)
    },
    'offer': {
      'title': getRandomTitle(0, 7),
      'address': getRandomAddress(),
      'price': getRandomPrice(0, 7),
      'type': getRandomType(0, 3),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 10),
      'checkin': getRandomTime(0, 2),
      'checkout': getRandomTime(0, 2),
      'features': getRandomFeatures(),
      'description': getRandomDescribtion(0, 7),
      'photos': getRandomPhotos()
    },
    'location': {
      'x': getRandomNumber(0, MAP_WIDTH),
      'y': getRandomNumber(130, 630)
    }
  };
  return advertisement;
};

var advertisements = [];

for (var k = 0; k < ADVERTISEMENT_AMOUT; k++) {
  advertisements[k] = getAdvertisement();
}

var getStyle = function (x, y) {
  return 'left: ' + (x + OFFSET_X) + 'px; top: ' + (y + OFFSET_Y) + 'px;';
};

var getPin = function (pinSample) {
  var pinLocationX = pinSample.location.x;
  var pinLocationY = pinSample.location.y;
  var avatarSrc = pinSample.author.avatar;
  var avatarAlt = pinSample.offer.title;

  var pin = pinTemplate.cloneNode(true);
  pin.style = getStyle(pinLocationX, pinLocationY);

  var pinImage = pin.querySelector('img');
  pinImage.src = avatarSrc;
  pinImage.alt = avatarAlt;
  pin.classList.add('map__pin--ads');

  return pin;
};

var renderAllPins = function () {
  var fragment = document.createDocumentFragment();

  for (var n = 0; n < advertisements.length; n++) {
    fragment.appendChild(getPin(advertisements[n]));
  }

  mapPins.appendChild(fragment);
};

var getPinMainAddress = function () {
  var pinMainLeft = parseInt(pinMain.style.left, 10) + PIN_INACTIVE_OFFSET;
  var pinMainTop = parseInt(pinMain.style.top, 10) + PIN_INACTIVE_OFFSET;

  return pinMainLeft + ', ' + pinMainTop;
};

var getPinActiveAddress = function () {
  var pinMainLeft = parseInt(pinMain.style.left, 10) + PIN_INACTIVE_OFFSET;
  var pinMainTop = parseInt(pinMain.style.top, 10) + PIN_ACTIVE_OFFSET_Y;

  return pinMainLeft + ', ' + pinMainTop;
};

addressInput.value = getPinMainAddress();

var setActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  setFormActive();
  renderAllPins();

  addressInput.value = getPinActiveAddress();

  setPinsHandler();

  pinMain.removeEventListener('mousedown', onPinMousedown);
  pinMain.removeEventListener('keydown', onPinKeydown);
};

var onPinMousedown = function (evt) {
  if (evt.button === 0) {
    setActive();
  }
};

var onPinKeydown = function (evt) {
  if (evt.key === 'Enter') {
    setActive();
  }
};

pinMain.addEventListener('mousedown', onPinMousedown);
pinMain.addEventListener('keydown', onPinKeydown);

var getCard = function (cardSample) {
  var card = cardTemplate.cloneNode(true);
  var cardImage = card.querySelector('.popup__avatar');
  var cardTitle = card.querySelector('.popup__title');
  var cardAddress = card.querySelector('.popup__text--address');
  var cardPrice = card.querySelector('.popup__text--price');
  var cardType = card.querySelector('.popup__type');
  var cardCapacity = card.querySelector('.popup__text--capacity');
  var cardTime = card.querySelector('.popup__text--time');
  var cardConditioner = card.querySelector('.popup__feature--conditioner');
  var cardElevator = card.querySelector('.popup__feature--elevator');
  var cardWasher = card.querySelector('.popup__feature--washer');
  var cardParking = card.querySelector('.popup__feature--parking');
  var cardDishwasher = card.querySelector('.popup__feature--dishwasher');
  var cardWifi = card.querySelector('.popup__feature--wifi');
  var cardDescribtion = card.querySelector('.popup__description');
  var cardPhotos = card.querySelector('.popup__photos');
  var cardPhoto = card.querySelector('.popup__photo');

  var avatarSrc = cardSample.author.avatar;
  var offerTitle = cardSample.offer.title;
  var offerAddress = cardSample.offer.address;
  var offerPrice = cardSample.offer.price;
  var offerType = cardSample.offer.type;
  var offerRooms = cardSample.offer.rooms;
  var offerGuests = cardSample.offer.guests;
  var offerCheckin = cardSample.offer.checkin;
  var offerCheckout = cardSample.offer.checkout;
  var offerFeatures = cardSample.offer.features;
  var offerDescribtion = cardSample.offer.description;
  var offerPhotos = cardSample.offer.photos;

  cardImage.src = avatarSrc;
  cardTitle.textContent = offerTitle;
  cardAddress.textContent = offerAddress;
  cardPrice.textContent = offerPrice + ' ₽/ночь';
  cardCapacity.textContent = offerRooms + ' комнаты для ' + offerGuests + ' гостей';
  cardTime.textContent = 'Заезд после ' + offerCheckin + ', выезд до ' + offerCheckout;
  cardDescribtion.textContent = offerDescribtion;

  if (offerType === 'palace') {
    cardType.textContent = 'Дворец';
  }
  if (offerType === 'flat') {
    cardType.textContent = 'Квартира';
  }
  if (offerType === 'house') {
    cardType.textContent = 'Дом';
  }
  if (offerType === 'bungalo') {
    cardType.textContent = 'Бунгало';
  }

  var conditioner = 0;
  var elevator = 0;
  var washer = 0;
  var parking = 0;
  var dishwasher = 0;
  var wifi = 0;

  for (var m = 0; m < offerFeatures.length; m++) {
    if (offerFeatures[m] === 'conditioner') {
      conditioner += 1;
    }
    if (offerFeatures[m] === 'elevator') {
      elevator += 1;
    }
    if (offerFeatures[m] === 'washer') {
      washer += 1;
    }
    if (offerFeatures[m] === 'parking') {
      parking += 1;
    }
    if (offerFeatures[m] === 'dishwasher') {
      dishwasher += 1;
    }
    if (offerFeatures[m] === 'wifi') {
      wifi += 1;
    }
  }
  if (conditioner === 0) {
    cardConditioner.style = 'display: none;';
  }
  if (elevator === 0) {
    cardElevator.style = 'display: none;';
  }
  if (washer === 0) {
    cardWasher.style = 'display: none;';
  }
  if (parking === 0) {
    cardParking.style = 'display: none;';
  }
  if (dishwasher === 0) {
    cardDishwasher.style = 'display: none;';
  }
  if (wifi === 0) {
    cardWifi.style = 'display: none;';
  }

  cardPhoto.src = offerPhotos[0];
  if (offerPhotos.length > 1) {
    for (var u = 1; u < offerPhotos.length; u++) {
      var clonedPhoto = cardPhoto.cloneNode();
      clonedPhoto.src = offerPhotos[u];
      cardPhotos.appendChild(clonedPhoto);
    }
  }

  card.style.display = 'none';

  return card;
};

for (k = 0; k < ADVERTISEMENT_AMOUT; k++) {
  map.insertBefore(getCard(advertisements[k]), mapFiltersContainer);
}

var setCardShow = function (advertisementPin, advertisementCard) {
  advertisementPin.addEventListener('click', function () {
    advertisementCard.style.display = 'block';
  });
  advertisementPin.addEventListener('keydown', function (evt) {
    if (evt.key === KEY_ENTER) {
      advertisementCard.style.display = 'block';
    }
  });
};

var setCardHide = function (advertisementCloseButton, advertisementCard) {
  advertisementCloseButton.addEventListener('click', function () {
    advertisementCard.style.display = 'none';
  });
  document.addEventListener('keydown', function (keyEvt) {
    if (keyEvt.key === KEY_ESC) {
      advertisementCard.style.display = 'none';
    }
  });
};

var setPinsHandler = function () {
  for (var f = 0; f < adsPins.length; f++) {
    setCardShow(adsPins[f], adsCards[f]);
    setCardHide(closeButtons[f], adsCards[f]);
  }
};
