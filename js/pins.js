'use strict';

(function () {
  var OFFSET_X = 20;
  var OFFSET_Y = 40;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');

  var error = errorTemplate.cloneNode(true);
  var errorText = error.querySelector('.error__message');
  // var errorButton = error.querySelector('.error__button');

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

    pin.style.display = 'none';

    return pin;
  };

  var renderAllPins = function (advertisements) {
    var fragment = document.createDocumentFragment();

    for (var n = 0; n < advertisements.length; n++) {
      fragment.appendChild(getPin(advertisements[n]));
    }

    mapPins.appendChild(fragment);
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
    // errorButton.addEventListener('click', onErrorMessageClick); если у меня навешан обработчик клика куда угодно и происходит закрытие сообщения, зачем мне ещё обработчик на кнопку "попробовать снова"?
  };

  var errorHandler = function (errorMessage) {
    errorText.textContent = errorMessage;
    main.appendChild(error);
    setErrorClosed();
  };

  window.pins = {
    renderAllPins: renderAllPins,
    errorHandler: errorHandler
  };
})();
