'use strict';

(function () {
  var PIN_INACTIVE_OFFSET = 32;
  var PIN_ACTIVE_OFFSET_Y = 43;
  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';
  var PIN_DEFAULT_LEFT = '570px';
  var PIN_DEFAULT_TOP = '375px';

  var MapSize = {
    MIN_X: -32,
    MAX_X: 1168,
    MIN_Y: 130,
    MAX_Y: 630,
  };

  var map = document.querySelector('.map');
  var pinMain = document.querySelector('.map__pin--main');
  var adFormHeader = document.querySelector('.ad-form-header');
  var adFormElements = document.querySelectorAll('.ad-form__element');
  var adForm = document.querySelector('.ad-form');
  var addressInput = adForm.querySelector('#address');
  var mapPins = document.querySelector('.map__pins');
  var adsPins = mapPins.getElementsByClassName('map__pin--ads');
  var adsCards = map.getElementsByClassName('map__card');
  var closeButtons = map.getElementsByClassName('popup__close');
  var resetButton = adForm.querySelector('.ad-form__reset');
  var mapFilters = document.querySelectorAll('.map__filter');
  var mapFeatures = document.querySelector('.map__features');

  var setDisabled = function (elem) {
    elem.setAttribute('disabled', 'disabled');
  };

  var setFilterInactive = function () {
    Array.from(mapFilters).forEach(function (filter) {
      setDisabled(filter);
    });

    setDisabled(mapFeatures);
  };


  var setFormInactive = function () {
    setDisabled(adFormHeader);
    for (var i = 0; i < adFormElements.length; i++) {
      setDisabled(adFormElements[i]);
    }
  };

  var setInactive = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    setFilterInactive();
    setFormInactive();
    window.pins.removeAllPins();

    pinMain.style.top = PIN_DEFAULT_TOP;
    pinMain.style.left = PIN_DEFAULT_LEFT;
  };

  setInactive();

  var onResetButtonClick = function () {
    setInactive();
  };

  resetButton.addEventListener('click', onResetButtonClick);

  var removeDisabled = function (elem) {
    elem.removeAttribute('disabled', 'disabled');
  };

  var setFilterActive = function () {
    Array.from(mapFilters).forEach(function (filter) {
      removeDisabled(filter);
    });

    removeDisabled(mapFeatures);
  };

  var setFormActive = function () {
    removeDisabled(adFormHeader);
    for (var j = 0; j < adFormElements.length; j++) {
      removeDisabled(adFormElements[j]);
    }
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

    window.backend.load(window.cards.successHandler, window.pins.errorHandler);

    setFormActive();

    addressInput.value = getPinActiveAddress();

    setPinsHandler();

    pinMain.removeEventListener('keydown', onPinKeydown);
  };

  var onPinMousedown = function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      setActive();
    }

    var limitMove = function (x, min, max) {
      if (x < min) {
        x = min;
      } else if (x > max) {
        x = max;
      }
      return x;
    };

    var calculatePinCoords = function (xCoord, yCoord) {
      var mainPinCoords = {
        x: limitMove(xCoord, MapSize.MIN_X, MapSize.MAX_X),
        y: limitMove(yCoord, MapSize.MIN_Y, MapSize.MAX_Y),
      };

      pinMain.style.left = mainPinCoords.x + 'px';
      pinMain.style.top = mainPinCoords.y + 'px';
    };

    var xCoord = parseInt(pinMain.style.left, 10);
    var yCoord = parseInt(pinMain.style.top, 10);

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      xCoord = xCoord - shift.x;
      yCoord = yCoord - shift.y;

      calculatePinCoords(xCoord, yCoord);

      // if (startCoords.y < 130 || startCoords.y > 630) {
      //   pinMain.style.top = pinMain.offsetTop + 'px';
      // } else if (startCoords.x < 350 || startCoords.x > 1550) {
      //   pinMain.style.left = pinMain.offsetLeft + 'px';
      // } else {
      //   pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      //   pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      // }

      addressInput.value = getPinActiveAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  var onPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      setActive();
    }
  };

  pinMain.addEventListener('mousedown', onPinMousedown);
  pinMain.addEventListener('keydown', onPinKeydown);

  var setDisplayBlock = function (elem) {
    elem.style.display = 'block';
  };

  var setDisplayNone = function (elem) {
    elem.style.display = 'none';
  };

  var setCardShow = function (advertisementPin, advertisementCard) {
    advertisementPin.addEventListener('click', function () {
      Array.from(adsCards).forEach(function (card) {
        if (card.style.display === 'block') {
          setDisplayNone(card);
        }
      });
      setDisplayBlock(advertisementCard);
    });
    advertisementPin.addEventListener('keydown', function (evt) {
      if (evt.key === KEY_ENTER) {
        setDisplayBlock(advertisementCard);
      }
    });
  };

  var setCardHide = function (advertisementCloseButton, advertisementCard) {
    advertisementCloseButton.addEventListener('click', function () {
      setDisplayNone(advertisementCard);
    });
    document.addEventListener('keydown', function (keyEvt) {
      if (keyEvt.key === KEY_ESC) {
        setDisplayNone(advertisementCard);
      }
    });
  };

  var setPinsHandler = function () {
    for (var l = 0; l < adsPins.length; l++) {
      setCardShow(adsPins[l], adsCards[l]);
      setCardHide(closeButtons[l], adsCards[l]);
    }
  };

  window.active = {
    keyEscape: KEY_ESC,
    setDisplayNone: setDisplayNone,
    setInactive: setInactive,
    adsPins: adsPins,
    adsCards: adsCards,
    map: map,
    setPinsHandler: setPinsHandler,
    setFilterActive: setFilterActive
  };
})();
