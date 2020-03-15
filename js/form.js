'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var roomsInput = adForm.querySelector('select[name="rooms"]');
  var capacityInput = adForm.querySelector('select[name="capacity"]');
  var typeInput = adForm.querySelector('select[name="type"]');
  var priceInput = adForm.querySelector('input[name="price"]');
  var timeinInput = adForm.querySelector('select[name="timein"]');
  var timeoutInput = adForm.querySelector('select[name="timeout"]');
  var successTemp = document.querySelector('#success').content.querySelector('.success');

  var success = successTemp.cloneNode(true);

  var onSelectChange = function () {
    if (roomsInput.value === '100' && capacityInput.value !== '0') {
      capacityInput.setCustomValidity('Это помещение не для гостей');
      roomsInput.setCustomValidity('Это помещение не для гостей');
    } else if (roomsInput.value !== '100' && capacityInput.value === '0') {
      capacityInput.setCustomValidity('Это помещение только для гостей');
      roomsInput.setCustomValidity('Это помещение только для гостей');
    } else if (roomsInput.value !== '100' && capacityInput.value > roomsInput.value) {
      capacityInput.setCustomValidity('К-во гостей не должно превышать к-во комнат');
      roomsInput.setCustomValidity('К-во гостей не должно превышать к-во комнат');
    } else {
      capacityInput.setCustomValidity('');
      roomsInput.setCustomValidity('');
    }
  };

  var onTypeInputChange = function () {
    switch (typeInput.value) {
      case 'bungalo':
        priceInput.min = 0;
        priceInput.placeholder = 0;
        break;
      case 'flat':
        priceInput.min = 1000;
        priceInput.placeholder = 1000;
        break;
      case 'house':
        priceInput.min = 5000;
        priceInput.placeholder = 5000;
        break;
      case 'palace':
        priceInput.min = 10000;
        priceInput.placeholder = 10000;
        break;
      default:
        throw new Error('Неизвестный тип жилья: «' + typeInput.value + '»');
    }
  };

  var onTimeinChange = function (evt) {
    timeoutInput.value = evt.target.value;
  };

  var onTimeoutChange = function (evt) {
    timeinInput.value = evt.target.value;
  };

  capacityInput.addEventListener('change', onSelectChange);
  roomsInput.addEventListener('change', onSelectChange);
  typeInput.addEventListener('change', onTypeInputChange);
  timeinInput.addEventListener('change', onTimeinChange);
  timeoutInput.addEventListener('change', onTimeoutChange);

  var removeSuccessMessage = function () {
    adForm.removeChild(success);
    document.removeEventListener('click', onSuccsessMessageClick);
    document.removeEventListener('keydown', onSuccsessMessageKeydown);
  };

  var onSuccsessMessageClick = function () {
    removeSuccessMessage();
  };

  var onSuccsessMessageKeydown = function (evt) {
    if (evt.key === window.active.keyEscape) {
      removeSuccessMessage();
    }
  };

  var setSuccessClosed = function () {
    document.addEventListener('click', onSuccsessMessageClick);
    document.addEventListener('keydown', onSuccsessMessageKeydown);
  };

  var onSaveSuccess = function () {
    adForm.appendChild(success);
    adForm.reset();
    window.active.setInactive();
    setSuccessClosed();
  };

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(adForm), onSaveSuccess, window.pins.errorHandler);
  });
})();
