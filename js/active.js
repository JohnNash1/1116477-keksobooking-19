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
  var resetButton = adForm.querySelector('.ad-form__reset');

  var onResetButtonClick = function () {
    setInactive();
  };

  resetButton.addEventListener('click', onResetButtonClick);

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

  var setFormInactive = function () {
    adFormHeader.setAttribute('disabled', 'disabled');
    for (var f = 0; f < adFormElements.length; f++) {
      adFormElements[f].setAttribute('disabled', 'disabled');
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
    setPinsVisible(adsPins);

    addressInput.value = getPinActiveAddress();

    setPinsHandler();

    pinMain.removeEventListener('keydown', onPinKeydown);
  };

  var onPinMousedown = function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
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

  var setPinsVisible = function (pins) {
    for (var i = 0; i < pins.length; i++) {
      setDisplayBlock(pins[i]);
    }
  };

  var setPinsHidden = function () {
    for (var i = 0; i < adsPins.length; i++) {
      setDisplayNone(adsPins[i]);
    }
  };

  var setInactive = function () {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');

    setFormInactive();
    setPinsHidden();
  };

  window.active = {
    keyEscape: KEY_ESC,
    setDisplayNone: setDisplayNone,
    setInactive: setInactive,
    setPinsVisible: setPinsVisible,
    adsPins: adsPins,
    adsCards: adsCards,
    map: map,
    setPinsHandler: setPinsHandler
  };
})();
