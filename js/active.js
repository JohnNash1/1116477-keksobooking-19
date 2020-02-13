'use strict';

(function () {
  var PIN_INACTIVE_OFFSET = 32;
  var PIN_ACTIVE_OFFSET_Y = 43;
  var KEY_ENTER = 'Enter';
  var KEY_ESC = 'Escape';

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
    window.backend.load(window.pins.renderAllPins, window.pins.errorHandler);

    addressInput.value = getPinActiveAddress();

    setPinsHandler();

    pinMain.removeEventListener('keydown', onPinKeydown);
  };

  var isItFirst = 0;

  var onPinMousedown = function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      isItFirst += 1;
    }
    if (evt.button === 0 && isItFirst === 1) {
      setActive();
    }

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

      if (startCoords.y < 130 || startCoords.y > 630) {
        pinMain.style.top = pinMain.offsetTop + 'px';
      } else if (startCoords.x < 350 || startCoords.x > 1550) {
        pinMain.style.left = pinMain.offsetLeft + 'px';
      } else {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }

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
    for (var f = 0; f < adsPins.length; f++) {
      setCardShow(adsPins[f], adsCards[f]);
      setCardHide(closeButtons[f], adsCards[f]);
    }
  };

  window.active = setDisplayNone;
})();
