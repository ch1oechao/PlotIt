(function() {
  'use strict';

  var config = {
    'aid': 'wxf22f393f544c7f24',
    'ase': '7a478172fdd6c82a80641e913cebeb0d'
  };

  function makeNonceStr() {
    var codes = [],
        codeSet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        codeSetLen = codeSet.length;
    for (var i = 0; i < 16; i++) {
      var random = Math.random() * 100,
          idx = random > codeSetLen ? (random % codeSetLen) : random;
      codes[i] = codeSet.substr(idx, 1);
    }

    return codes.join('');
  }

  
})();
