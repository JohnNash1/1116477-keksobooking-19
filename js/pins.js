'use strict';

(function () {
  var OFFSET_X = 20;
  var OFFSET_Y = 40;

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var mapPins = document.querySelector('.map__pins');

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

  var renderAllPins = function () {
    var fragment = document.createDocumentFragment();

    for (var n = 0; n < window.data.advertisements.length; n++) {
      fragment.appendChild(getPin(window.data.advertisements[n]));
    }

    mapPins.appendChild(fragment);
  };

  window.pins = renderAllPins;
})();
