'use strict';

const check_lexicon = (str, ts) => {
  let lexicon = ts.getLexicons();
  if (lexicon[str]) {
    return lexicon[str];
  }
  return null;
};

const lexicon_pass = function(ts) {
  let found;
  let terms = ts.getTerms();
  //loop through each term
  ts.forEachTerm((t)=>{
     found = check_lexicon(t.normal, ts);
      if (found) {
        t.tag(found, 'lexicon-match');
        return;
      }
      found = check_lexicon(t.text, ts);
      if (found) {
        t.tag(found, 'lexicon-match-text');
        return;
      }
  });
  /*for (let i = 0; i < terms.length; i++) {
    let t = terms[i];
    //basic term lookup
    found = check_lexicon(t.normal, ts);
    console.log(found);
    if (found) {
      console.log(t.tag);
      t.tag(found, 'lexicon-match');
      console.log(123);
      continue;
    }
    found = check_lexicon(t.text, ts);
    if (found) {
      t.tag(found, 'lexicon-match-text');
      continue;
    }
  }*/
  return ts;
};

module.exports = lexicon_pass;
