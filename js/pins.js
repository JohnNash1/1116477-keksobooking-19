'use strict';

(function () {
  var OFFSET_X = 20;
  var OFFSET_Y = 40;
  var PINS_AMOUNT = 5;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
  var pinsCollection = document.getElementsByClassName('map__pin--ads');

  var error = errorTemplate.cloneNode(true);
  var errorText = error.querySelector('.error__message');

  var getStyle = function (x, y) {
    return 'left: ' + (x + OFFSET_X) + 'px; top: ' + (y + OFFSET_Y) + 'px;';
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
    pin.classList.add('map__pin--ads');

    return pin;
  };

  var removeAllPins = function functionName() {
    if (pinsCollection.length > 0) {
      for (var i = pinsCollection.length - 1; i >= 0; i--) {
        mapPins.removeChild(pinsCollection[i]);
      }
    }
  };

  var renderAllPins = function (data) {
    var takeNumber = data.length > PINS_AMOUNT ? PINS_AMOUNT : data.length;

    removeAllPins();

    for (var n = 0; n < takeNumber; n++) {
      mapPins.appendChild(getPin(data[n]));
    }
  };

  var removeErrorMessage = function () {
    main.removeChild(error);
    document.removeEventListener('click', onErrorMessageClick);
    document.removeEventListener('keydown', onErrorMessageKeydown);
  };

  var onErrorMessageClick = function () {
    removeErrorMessage();
  };

  var onErrorMessageKeydown = function (evt) {
    if (evt.key === window.active.keyEscape) {
      removeErrorMessage();
    }
  };

  var setErrorClosed = function () {
    document.addEventListener('click', onErrorMessageClick);
    document.addEventListener('keydown', onErrorMessageKeydown);
  };

  var errorHandler = function (errorMessage) {
    errorText.textContent = errorMessage;
    main.appendChild(error);
    setErrorClosed();
  };

  window.pins = {
    renderAllPins: renderAllPins,
    removeAllPins: removeAllPins,
    errorHandler: errorHandler
  };
})();
