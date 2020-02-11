'use strict';

(function () {
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
  var ADVERTISEMENT_AMOUT = 8;
  var MAP_WIDTH = 1062;

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
    return locationX + ', ' + locationY;
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

  window.data = {
    advertisements: advertisements,
    advertisementAmount: ADVERTISEMENT_AMOUT
  };
})();
