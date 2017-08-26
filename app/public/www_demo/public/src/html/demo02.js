module.exports = function (arr) {
  var _obj = {};
  for (var i = 0; i < arr.length; i++) {
    _obj[arr[i].key] = _obj[arr[i].key] || [];
    _obj[arr[i].key].push(arr[i].value);
  }
  return _obj;
}
