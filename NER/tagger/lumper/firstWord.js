'use strict';
//index a lexicon by its first-word
// - used for the multiple-word-lumper
function firstWord (arr){
  var all = {};
  arr.forEach((obj) => {
    Object.keys(obj).forEach(function(str){
      var words = str.split(' ');
      if (words.length > 1) {
        var w = words[0];
        all[w] = all[w] || {};
        var rest = words.slice(1).join(' ');
        all[w][rest] = obj[str];
      }
    });
  });
  return all;
};
module.exports = firstWord;