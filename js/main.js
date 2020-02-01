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
var AMOUT_OF_ADVERTISMETS = 8;
var OFFSET_X = 20;
var OFFSET_Y = 40;

var getAvatar = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return AVATAR_URLS[randomNumber];
};

var getTitle = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return TITLES[randomNumber];
};

var getPrice = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return PRICES[randomNumber];
};

var getType = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return TYPES[randomNumber];
};

var getNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
};

var getTime = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return TIMES[randomNumber];
};

var getDescribtion = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return DESCRIBTIONS[randomNumber];
};

var getAddress = function () {
  var locationX = getNumber(0, MAP_WIDTH);
  var locationY = getNumber(130, 630);
  return locationX.toString() + ', ' + locationY.toString();
};

var randomFeatures = [];
for (var i = 0; i < getNumber(1, FEATURES.length); i++) {
  randomFeatures[i] = FEATURES[i];
}

var randomPhotos = [];
for (var j = 0; j < getNumber(1, PHOTOS.length); j++) {
  randomPhotos[j] = PHOTOS[j];
}

var getAdvertisment = function () {
  var advertisment = {
    'author': {
      'avatar': getAvatar(0, 7)
    },
    'offer': {
      'title': getTitle(0, 7),
      'address': getAddress(),
      'price': getPrice(0, 7),
      'type': getType(0, 3),
      'rooms': getNumber(1, 5),
      'guests': getNumber(1, 30),
      'checkin': getTime(0, 2),
      'checkout': getTime(0, 2),
      'features': randomFeatures,
      'description': getDescribtion(0, 7),
      'photos': randomPhotos
    },
    'location': {
      'x': getNumber(0, MAP_WIDTH),
      'y': getNumber(130, 630)
    }
  };
  return advertisment;
};

var advertisements = [];

for (var k = 0; k < AMOUT_OF_ADVERTISMETS; k++) {
  advertisements[k] = getAdvertisment();
}

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var getStyle = function (x, y) {
  return 'left: ' + (x + OFFSET_X).toString() + 'px; top: ' + (y + OFFSET_Y).toString() + 'px;';
};

var fragment = document.createDocumentFragment();

for (var n = 0; n < advertisements.length; n++) {
  var pinLocationX = advertisements[n].location.x;
  var pinLocationY = advertisements[n].location.y;
  var avatarSrc = advertisements[n].author.avatar;
  var avatarAlt = advertisements[n].offer.title;

  var pin = pinTemplate.cloneNode(true);
  pin.style = getStyle(pinLocationX, pinLocationY);

  var pinImage = pin.querySelector('img');
  pinImage.src = avatarSrc;
  pinImage.alt = avatarAlt;

  fragment.appendChild(pin);
}
var mapPins = document.querySelector('.map__pins');
mapPins.appendChild(fragment);
