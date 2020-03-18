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

    switch (offerType) {
      case 'palace':
        cardType.textContent = 'Дворец';
        break;
      case 'flat':
        cardType.textContent = 'Квартира';
        break;
      case 'house':
        cardType.textContent = 'Дом';
        break;
      case 'bungalo':
        cardType.textContent = 'Бунгало';
        break;
      default:
        throw new Error('Неизвестный тип жилья: «' + offerType + '»');
    }

    var conditioner = 0;
    var elevator = 0;
    var washer = 0;
    var parking = 0;
    var dishwasher = 0;
    var wifi = 0;

    for (var m = 0; m < offerFeatures.length; m++) {
      switch (offerFeatures[m]) {
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
          throw new Error('Неизвестный тип удобства: «' + offerFeatures[m] + '»');
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
      for (var u = 0; u < offerPhotos.length; u++) {
        var clonedPhoto = cardPhoto.cloneNode();
        clonedPhoto.src = offerPhotos[u];
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
    for (var j = 0; j < advertisements.length; j++) {
      map.insertBefore(getCard(advertisements[j]), mapFiltersContainer);
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

    var renderSortedPins = function (checkbox) {
      if (checkbox.checked) {
        var sortedByFeatures = sortedByAll.filter(function (it) {
          return it.offer.features.indexOf(checkbox.value) !== -1;
        });
      } else {
        sortedByFeatures = sortedByAll;
      }
      window.pins.renderAllPins(sortedByFeatures);
      renderCards(sortedByFeatures);
    };

    Array.from(mapCheckboxes).forEach(function (feature) {
      renderSortedPins(feature);
    });

    window.active.setPinsHandler();
  };

  var successHandler = function (response) {
    pinsArray = response;
    adsUpdate();
    window.active.setFilterActive();
  };

  var lastTimeout;

  document.addEventListener('change', function (evt) {
    if (evt.target === typeFilter || evt.target === priceFilter || evt.target === roomsFilter || evt.target === guestsFilter) {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        adsUpdate();
      }, 500);
    }

    Array.from(mapCheckboxes).forEach(function (feature) {
      if (evt.target === feature) {
        if (lastTimeout) {
          window.clearTimeout(lastTimeout);
        }
        lastTimeout = window.setTimeout(function () {
          adsUpdate();
        }, 500);
      }
    });
  });

  window.cards = {
    successHandler: successHandler
  };
})();
