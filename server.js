var WordPOS = require('WordPOS');
var natural = require('natural');
var sentences = [
	'sum of amount in west for amount > 3',
	'sum of amount > 3 in west and east',
	'sum of amount > 3 in west and east',
	'sum of amount in west vs south and north',
	'sum of amount in west vs sum of quantity in north',
	'sum of amount for electronics for date greater than 1st apr less then 10th jun',
	'Give me electronics total amount for date 1apr to 10 jun'
	]
wordpos = new WordPOS({profile: true});
/*for(var i in sentences){
	var sent = sentences[i];
	
	wordpos.getPOS(sent,function(arguments){
		console.log(sent);
		console.log(arguments);
	});
}*/
wordpos.getPOS(sentences[5],function(arguments){
	console.log(sentences[5]);
	console.log(arguments);
});

var words = ["AccountManager","Sales Person","amount_refunded","Balance","Billing Address","Billing City","Billing Code","Billing Country","Billing Fax","Billing State","BillingCity","BillingCountry"];


function test(word){
	return wordpos.lookup(word);
}

var curr = 0;
console.log(natural.PorterStemmer.stem("approximated"));
test(natural.PorterStemmer.stem("approximated")).then(function(){
	console.log(JSON.stringify(arguments));
	curr+=1;
})

test('quantity').then(function(){
	console.log(JSON.stringify(arguments));
	curr+=1;
})

