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

    pin.style.display = 'none';

    return pin;
  };

  var renderAllPins = function (advertisements) {
    var fragment = document.createDocumentFragment();

    for (var n = 0; n < window.data.advertisementAmount; n++) {
      fragment.appendChild(getPin(advertisements[n]));
    }

    mapPins.appendChild(fragment);
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.pins = {
    renderAllPins: renderAllPins,
    errorHandler: errorHandler
  };
})();
