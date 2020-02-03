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
var ADVERTISMET_AMOUT = 8;
var OFFSET_X = 20;
var OFFSET_Y = 40;

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

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

var getAdvertisment = function () {
  var advertisment = {
    'author': {
      'avatar': getRandomAvatar(0, 7)
    },
    'offer': {
      'title': getRandomTitle(0, 7),
      'address': getRandomAddress(),
      'price': getRandomPrice(0, 7),
      'type': getRandomType(0, 3),
      'rooms': getRandomNumber(1, 5),
      'guests': getRandomNumber(1, 30),
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
  return advertisment;
};

var advertisements = [];

for (var k = 0; k < ADVERTISMET_AMOUT; k++) {
  advertisements[k] = getAdvertisment();
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

var fragment = document.createDocumentFragment();

for (var n = 0; n < advertisements.length; n++) {
  fragment.appendChild(getPin(advertisements[n]));
}

mapPins.appendChild(fragment);
