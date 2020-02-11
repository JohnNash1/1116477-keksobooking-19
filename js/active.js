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
    window.pins();

    addressInput.value = getPinActiveAddress();

    setPinsHandler();

    pinMain.removeEventListener('mousedown', onPinMousedown);
    pinMain.removeEventListener('keydown', onPinKeydown);
  };

  var onPinMousedown = function (evt) {
    if (evt.button === 0) {
      setActive();
    }
  };

  var onPinKeydown = function (evt) {
    if (evt.key === 'Enter') {
      setActive();
    }
  };

  pinMain.addEventListener('mousedown', onPinMousedown);
  pinMain.addEventListener('keydown', onPinKeydown);

  var setDisplayBlock = function (shown) {
    shown.style.display = 'block';
  };

  var setDisplayNone = function (hidden) {
    hidden.style.display = 'none';
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
