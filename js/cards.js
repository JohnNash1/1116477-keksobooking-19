'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var typeFilter = document.querySelector('#housing-type');
  var priceFilter = document.querySelector('#housing-price');
  var roomsFilter = document.querySelector('#housing-rooms');
  var guestsFilter = document.querySelector('#housing-guests');
  var mapCheckboxes = document.querySelectorAll('.map__checkbox');
  var mapFeatures = document.querySelector('.map__features');

  var FILTERS = [
    typeFilter,
    priceFilter,
    roomsFilter,
    guestsFilter
  ];

  var translateCardTypes = function (toTranslate, translated) {
    switch (toTranslate) {
      case 'palace':
        translated.textContent = 'Дворец';
        break;
      case 'flat':
        translated.textContent = 'Квартира';
        break;
      case 'house':
        translated.textContent = 'Дом';
        break;
      case 'bungalo':
        translated.textContent = 'Бунгало';
        break;
      default:
        throw new Error('Неизвестный тип жилья: «' + toTranslate + '»');
    }
  };

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

    translateCardTypes(offerType, cardType);

    var conditioner = 0;
    var elevator = 0;
    var washer = 0;
    var parking = 0;
    var dishwasher = 0;
    var wifi = 0;

    for (var i = 0; i < offerFeatures.length; i++) {
      switch (offerFeatures[i]) {
        case 'conditioner':
          conditioner += 1;
          break;
        case 'elevator':
          elevator += 1;
          break;
        case 'washer':
          washer += 1;
          break;
        case 'parking':
          parking += 1;
          break;
        case 'dishwasher':
          dishwasher += 1;
          break;
        case 'wifi':
          wifi += 1;
          break;
        default:
          throw new Error('Неизвестный тип удобства: «' + offerFeatures[i] + '»');
      }
    }

    if (conditioner === 0) {
      window.active.setDisplayNone(cardConditioner);
    }
    if (elevator === 0) {
      window.active.setDisplayNone(cardElevator);
    }
    if (washer === 0) {
      window.active.setDisplayNone(cardWasher);
    }
    if (parking === 0) {
      window.active.setDisplayNone(cardParking);
    }
    if (dishwasher === 0) {
      window.active.setDisplayNone(cardDishwasher);
    }
    if (wifi === 0) {
      window.active.setDisplayNone(cardWifi);
    }

    cardPhotos.innerHTML = '';

    if (offerPhotos.length > 0) {
      for (i = 0; i < offerPhotos.length; i++) {
        var clonedPhoto = cardPhoto.cloneNode();
        clonedPhoto.src = offerPhotos[i];
        cardPhotos.appendChild(clonedPhoto);
      }
    } else {
      window.active.setDisplayNone(cardPhotos);
    }

    window.active.setDisplayNone(card);

    return card;
  };

  var renderCards = function (advertisements) {
    if (window.active.adsCards.length > 0) {
      for (var i = window.active.adsCards.length - 1; i >= 0; i--) {
        window.active.map.removeChild(window.active.adsCards[i]);
      }
    }
    for (i = 0; i < advertisements.length; i++) {
      map.insertBefore(getCard(advertisements[i]), mapFiltersContainer);
    }
  };

  var pinsArray = [];

  var adsUpdate = function () {
    if (typeFilter.value === 'any') {
      var sortedByType = pinsArray;
    } else {
      sortedByType = pinsArray.filter(function (it) {
        return it.offer.type === typeFilter.value;
      });
    }

    switch (priceFilter.value) {
      case 'middle':
        var sortedByTypePrice = sortedByType.filter(function (it) {
          return it.offer.price >= 10000 || it.offer.type <= 50000;
        });
        break;
      case 'low':
        sortedByTypePrice = sortedByType.filter(function (it) {
          return it.offer.price < 10000;
        });
        break;
      case 'high':
        sortedByTypePrice = sortedByType.filter(function (it) {
          return it.offer.price > 50000;
        });
        break;
      default: sortedByTypePrice = sortedByType;
    }

    if (roomsFilter.value === 'any') {
      var sortedByTypePriceRooms = sortedByTypePrice;
    } else {
      sortedByTypePriceRooms = sortedByTypePrice.filter(function (it) {
        return it.offer.rooms === parseInt(roomsFilter.value, 10);
      });
    }

    if (guestsFilter.value === 'any') {
      var sortedByAll = sortedByTypePriceRooms;
    } else {
      sortedByAll = sortedByTypePriceRooms.filter(function (it) {
        return it.offer.guests === parseInt(guestsFilter.value, 10);
      });
    }

    var featuresFilter = {
      'wifi': false,
      'dishwasher': false,
      'parking': false,
      'washer': false,
      'elevator': false,
      'conditioner': false
    };

    Array.from(mapCheckboxes).forEach(function (feature) {
      if (feature.checked) {
        featuresFilter[feature.value] = true;
      }
    });

    if (featuresFilter.wifi) {
      var sortedByWifi = sortedByAll.filter(function (it) {
        return it.offer.features.indexOf('wifi') !== -1;
      });
    } else {
      sortedByWifi = sortedByAll;
    }
    if (featuresFilter.dishwasher) {
      var sortedByDishwasher = sortedByWifi.filter(function (it) {
        return it.offer.features.indexOf('dishwasher') !== -1;
      });
    } else {
      sortedByDishwasher = sortedByWifi;
    }
    if (featuresFilter.parking) {
      var sortedByParking = sortedByDishwasher.filter(function (it) {
        return it.offer.features.indexOf('parking') !== -1;
      });
    } else {
      sortedByParking = sortedByDishwasher;
    }
    if (featuresFilter.washer) {
      var sortedByWasher = sortedByParking.filter(function (it) {
        return it.offer.features.indexOf('washer') !== -1;
      });
    } else {
      sortedByWasher = sortedByParking;
    }
    if (featuresFilter.elevator) {
      var sortedByElevator = sortedByWasher.filter(function (it) {
        return it.offer.features.indexOf('elevator') !== -1;
      });
    } else {
      sortedByElevator = sortedByWasher;
    }
    if (featuresFilter.conditioner) {
      var sortedByConditioner = sortedByElevator.filter(function (it) {
        return it.offer.features.indexOf('conditioner') !== -1;
      });
    } else {
      sortedByConditioner = sortedByElevator;
    }

    window.pins.renderAllPins(sortedByConditioner);
    renderCards(sortedByConditioner);

    window.active.setPinsHandler();
  };

  var successHandler = function (response) {
    pinsArray = response;
    adsUpdate();
    window.active.setFilterActive();
  };

  var lastTimeout;

  document.addEventListener('change', function (evt) {
    if (evt.target.parentNode === mapFeatures || FILTERS.indexOf(evt.target) !== -1) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        adsUpdate();
      }, 500);
    }
  });

  window.cards = {
    successHandler: successHandler
  };
})();
