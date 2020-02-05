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

var map = document.querySelector('.map');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
// var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
// var mapFiltersContainer = document.querySelector('.map__filters-container');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var adFormHeader = document.querySelector('.ad-form-header');
var adFormElements = document.querySelectorAll('.ad-form__element');
var addressInput = adForm.querySelector('#address');

adFormHeader.setAttribute('disabled', 'disabled');
for (var d = 0; d < adFormElements.length; d++) {
  adFormElements[d].setAttribute('disabled', 'disabled');
}

var getFormActive = function () {
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

var randomFeatures = [];
for (var i = 0; i < getRandomNumber(1, FEATURES.length); i++) {
  randomFeatures[i] = FEATURES[i];
}

var randomPhotos = [];
for (var j = 0; j < getRandomNumber(1, PHOTOS.length); j++) {
  randomPhotos[j] = PHOTOS[j];
}

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
      'features': randomFeatures,
      'description': getRandomDescribtion(0, 7),
      'photos': randomPhotos
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
  return 'left: ' + (x + OFFSET_X).toString() + 'px; top: ' + (y + OFFSET_Y).toString() + 'px;';
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

  return pin;
};

var getAllPins = function () {
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

var getActive = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');

  getFormActive();
  getAllPins();

  addressInput.value = getPinActiveAddress();
};

var onPinMousedown = function (evt) {
  if (evt.button === 0) {
    getActive();
  }
};

var onPinKeydown = function (evt) {
  if (evt.key === 'Enter') {
    getActive();
  }
};

pinMain.addEventListener('mousedown', onPinMousedown);
pinMain.addEventListener('keydown', onPinKeydown);

// var getCard = function (cardSample) {
//   var card = cardTemplate.cloneNode(true);
//   var cardImage = card.querySelector('.popup__avatar');
//   var cardTitle = card.querySelector('.popup__title');
//   var cardAddress = card.querySelector('.popup__text--address');
//   var cardPrice = card.querySelector('.popup__text--price');
//   var cardType = card.querySelector('.popup__type');
//   var cardCapacity = card.querySelector('.popup__text--capacity');
//   var cardTime = card.querySelector('.popup__text--time');
//   var cardConditioner = card.querySelector('.popup__feature--conditioner');
//   var cardElevator = card.querySelector('.popup__feature--elevator');
//   var cardWasher = card.querySelector('.popup__feature--washer');
//   var cardParking = card.querySelector('.popup__feature--parking');
//   var cardDishwasher = card.querySelector('.popup__feature--dishwasher');
//   var cardWifi = card.querySelector('.popup__feature--wifi');
//   var cardDescribtion = card.querySelector('.popup__description');
//   var cardPhotos = card.querySelector('.popup__photos');
//   var cardPhoto = card.querySelector('.popup__photo');
//
//   var avatarSrc = cardSample.author.avatar;
//   var offerTitle = cardSample.offer.title;
//   var offerAddress = cardSample.offer.address;
//   var offerPrice = cardSample.offer.price;
//   var offerType = cardSample.offer.type;
//   var offerRooms = cardSample.offer.rooms;
//   var offerGuests = cardSample.offer.guests;
//   var offerCheckin = cardSample.offer.checkin;
//   var offerCheckout = cardSample.offer.checkout;
//   var offerFeatures = cardSample.offer.features;
//   var offerDescribtion = cardSample.offer.description;
//   var offerPhotos = cardSample.offer.photos;
//
//   cardImage.src = avatarSrc;
//   cardTitle.textContent = offerTitle;
//   cardAddress.textContent = offerAddress;
//   cardPrice.textContent = offerPrice + ' ₽/мес';
//   cardCapacity.textContent = offerRooms + ' комнаты для ' + offerGuests + ' гостей';
//   cardTime.textContent = 'Заезд после ' + offerCheckin + ', выезд до ' + offerCheckout;
//   cardDescribtion.textContent = offerDescribtion;
//
//   if (offerType === 'palace') {
//     cardType.textContent = 'Дворец';
//   }
//   if (offerType === 'flat') {
//     cardType.textContent = 'Квартира';
//   }
//   if (offerType === 'house') {
//     cardType.textContent = 'Дом';
//   }
//   if (offerType === 'bungalo') {
//     cardType.textContent = 'Бунгало';
//   }
//
//   var conditioner = 0;
//   var elevator = 0;
//   var washer = 0;
//   var parking = 0;
//   var dishwasher = 0;
//   var wifi = 0;
//
//   for (var m = 0; m < offerFeatures.length; m++) {
//     if (offerFeatures[m] === 'conditioner') {
//       conditioner += 1;
//     }
//     if (offerFeatures[m] === 'elevator') {
//       elevator += 1;
//     }
//     if (offerFeatures[m] === 'washer') {
//       washer += 1;
//     }
//     if (offerFeatures[m] === 'parking') {
//       parking += 1;
//     }
//     if (offerFeatures[m] === 'dishwasher') {
//       dishwasher += 1;
//     }
//     if (offerFeatures[m] === 'wifi') {
//       wifi += 1;
//     }
//   }
//   if (conditioner === 0) {
//     cardConditioner.style = 'display: none;';
//   }
//   if (elevator === 0) {
//     cardElevator.style = 'display: none;';
//   }
//   if (washer === 0) {
//     cardWasher.style = 'display: none;';
//   }
//   if (parking === 0) {
//     cardParking.style = 'display: none;';
//   }
//   if (dishwasher === 0) {
//     cardDishwasher.style = 'display: none;';
//   }
//   if (wifi === 0) {
//     cardWifi.style = 'display: none;';
//   }
//
//   cardPhoto.src = offerPhotos[0];
//   if (offerPhotos.length > 1) {
//     for (var u = 1; u < offerPhotos.length; u++) {
//       var clonedPhoto = cardPhoto.cloneNode();
//       clonedPhoto.src = offerPhotos[u];
//       cardPhotos.appendChild(clonedPhoto);
//     }
//   }
//
//   return card;
// };

// map.insertBefore(getCard(advertisements[0]), mapFiltersContainer);
