'use strict';

(function () {


  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var mapFilter = document.querySelector('#housing-type');

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

    cardPhoto.src = offerPhotos[0];

    if (offerPhotos.length > 1) {
      for (var u = 1; u < offerPhotos.length; u++) {
        var clonedPhoto = cardPhoto.cloneNode();
        clonedPhoto.src = offerPhotos[u];
        cardPhotos.appendChild(clonedPhoto);
      }
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
    for (var k = 0; k < advertisements.length; k++) {
      map.insertBefore(getCard(advertisements[k]), mapFiltersContainer);
    }
  };

  var pinsArray = [];

  var adsUpdate = function () {
    if (mapFilter.value === 'any') {
      window.pins.renderAllPins(pinsArray);
      renderCards(pinsArray);
    } else {
      var sortedByType = pinsArray.filter(function (it) {
        return it.offer.type === mapFilter.value;
      });
      window.pins.renderAllPins(sortedByType);
      renderCards(sortedByType);
    }

    window.active.setPinsHandler();
  };

  var successHandler = function (response) {
    pinsArray = response;
    adsUpdate();
  };

  mapFilter.addEventListener('change', function () {
    adsUpdate();
    window.active.setPinsVisible(window.active.adsPins);
  });
  window.backend.load(successHandler, window.pins.errorHandler);
})();
