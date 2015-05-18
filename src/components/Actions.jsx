require('es5-shim');
var Reflux = require('reflux');

module.exports = Reflux.createActions([
  "filterByTag",
  "filterByDate",
  "showAll",
  "showMorePosts",
  "searchPosts",
  "changeClass",
  "switchActive"
]);
