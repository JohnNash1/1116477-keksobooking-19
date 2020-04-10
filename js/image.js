'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avaInput = document.querySelector('.ad-form-header__input');
  var avaPreview = document.querySelector('.ad-form-header__preview');
  var avaImg = avaPreview.querySelector('img');
  var adsImgInput = document.querySelector('.ad-form__input');
  var adsPreview = document.querySelector('.ad-form__photo');
  var adsImg = document.createElement('img');

  var defaultSrc = avaImg.src;

  avaInput.addEventListener('change', function () {
    var file = avaInput.files[0];

    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avaImg.src = reader.result;
        avaImg.width = '70';
        avaImg.height = '70';
        avaImg.parentNode.style.padding = '0';
      });

      reader.readAsDataURL(file);
    }
  });

  adsImgInput.addEventListener('change', function () {
    var adsFile = adsImgInput.files[0];

    var adsFileName = adsFile.name.toLowerCase();

    var adsMatches = FILE_TYPES.some(function (it) {
      return adsFileName.endsWith(it);
    });

    if (adsMatches) {
      var adsReader = new FileReader();

      adsReader.addEventListener('load', function () {
        adsImg.src = adsReader.result;
        adsImg.width = '70';
        adsImg.height = '70';
        adsPreview.appendChild(adsImg);
      });

      adsReader.readAsDataURL(adsFile);
    }
  });

  window.image = {
    avaImg: avaImg,
    defaultSrc: defaultSrc,
    adsPreview: adsPreview
  };
})();
