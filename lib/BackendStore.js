;(function (name, definition) {
  // this is considered "safe":
  var hasDefine = typeof define === 'function';

  if (hasDefine) {
    // AMD Module or CMD Module
    define(definition);
  } else {
    // Assign to common namespaces or simply the global object (window)
    this[name] = definition();
  }
})('BackendStore', function () {
  var exports = {};

  var BackendStore = function () {
    var _exports = {};

    var _store = {};
    var _isReady = false;
    var _callback = [];

    var doReady = function () {
      var i, len;
      if (_isReady) {
        return;
      }
      _isReady = true;
      while (_callback.length > 0) {
        _callback.shift()(_exports);
      }
    };

    var onReady = function (callback) {
      if (_isReady) {
        callback(_exports);
      } else {
        _callback.push(callback);
      }
    };

    var ready = function (callback) {
      if (arguments.length === 0) {
        doReady();
      } else {
        onReady(callback);
      }
    };

    var set = function (key, data) {
      _store[key] = data;
    };

    var get = function (key, callback) {
      if (arguments.length === 1) {
        return _store[key];
      } else {
        onReady(function (store) {
          callback(store.get(key));
        });
      }
    };

    _exports.set = set;
    _exports.get = get;
    _exports.ready = ready;

    return _exports;
  };

  exports = new BackendStore();
  exports.BackendStore = BackendStore;

  return exports;

});
