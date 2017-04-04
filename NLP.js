//var nlp = require('nlp_compromise');
//nlp.plugin(require('nlp-links'));
var BrainJSClassifier = require('natural-brain');
var classifier = new BrainJSClassifier();

/*classifier.addDocument('my unit-tests failed.', 'software');
classifier.addDocument('tried the program, but it was buggy.', 'software');
classifier.addDocument('tomorrow we will do standup.', 'meeting');
classifier.addDocument('the drive has a 2TB capacity.', 'hardware');
classifier.addDocument('i need a new power supply.', 'hardware');
classifier.addDocument('can you play some new music?', 'music');

classifier.train();

console.log(classifier.classify('did the tests pass?')); // -> software
console.log(classifier.classify('did you buy a new drive?')); // -> hardware
console.log(classifier.classify('What is the capacity?')); // -> hardware
console.log(classifier.classify('Lets meet tomorrow?')); // -> meeting
console.log(classifier.classify('Can you play some stuff?')); // -> music*/


var action = 
{
  "text": "what's the weather in Vancouver",
  "action": {
    "type": "weather"
  },
  "tags": [
    {
      "label": "location",
      "start": 6,
      "end": -1
    }
  ],
  "_id": "l0QZr5Ya52rHVk2B"
};

classifier.addDocument(action.text,action._id);



function getSentencesAndTermLength(sent){
	/*console.log(nlp.text(sent).sentences.length);
	console.log(nlp.text(sent).terms().length);
	console.log(nlp.text(sent).terms());*/
	var lexObj = { 'opportunity':'domain_num',
						'create':'date domain',
						'sum of amount':'region',
						'sayali kam':"account manager",
						"sayali kam":"sales person",
					  };
	for(var key in lexObj){
		var text = nlp.noun(key).pluralize();
		if(text){
			lexObj[text] = lexObj[key];
		}
	}
	
	console.log(lexObj);

	console.log(nlp.text('SFDC-DM|SMS Magic | 2-way Communication').normal());
	console.log(nlp.text('SFDC-DM|SMS Magic | 2-way Communication').root());
	//console.log(nlp.text('SFDC-DM|SMS Magic | 2-way Communication').root());

	/*console.log(nlp.text("Opportunities created in last 6 months").root());
	console.log(nlp.text("Opportunities has been created in last 6 months").root());
	console.log(nlp.text("Opportunities creates in last 6 months").root());
	console.log(nlp.text("Opportunities is creating in next 6 months").tags());

	console.log(nlp.text("will create").to_present().text());
	console.log(nlp.text("will create").root());
	console.log(nlp.text("will create").to_present().root());
	console.log(nlp.text("is creating").root());*/

  var lex = nlp.lexicon(lexObj);

	var sen = nlp.sentence(sent,{lexicon:lex});
	console.log(sen.tags());
	console.log(nlp.value('last months').number);
	var terms = nlp.text(sent).terms();
	for(var i in terms){
		var term = terms[i];
		console.log(term);
	}
	//var sen = nlp.sentence(sent).withLinks()
}

//getSentencesAndTermLength("Opportunities created in last 6 months");