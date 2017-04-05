var chrono = require('chrono-node');
var moment = require('moment');
var dateTimeUtils = require('../Utils/dateTimeUtils');
var dateTypes = require('../Utils/dateTypes');

var sinceWords = [
	'since',
	'from'
]
var PATTERN = new RegExp('(\\W|^)' +
    '('+sinceWords.join('|')+')\\s*' +
    '(?=\\W|$)', 'i'
);

var sinceRefiner = new chrono.Refiner();

sinceRefiner.pattern = function () { return PATTERN };

sinceRefiner.addTag = function(result){
	if(!result.tags){
		result.tags = {};
	}
	result.tags["ENCustomSinceParser"] = true;
    result.tags["customData"] = {
        'isSince':1,
        'dateType':dateTypes.YEARLY
    }
}

sinceRefiner.refine = function(text, results, opt) {
    // If there is no AM/PM (meridiem) specified, 
    //  let all time between 1:00 - 4:00 be PM (13.00 - 16.00)
    if(this.isValid(text,results)){
    	var result = results[0];
    	var endDate = moment(result.ref);
    	if(result.end == null){
            result.end = new chrono.ParsedComponents(null, result.start.date());
        }
        result.end.assign('year', endDate.year());
        result.end.assign('month', endDate.month() + 1);
        result.end.assign('day', endDate.date());
        this.addTag(result);
    }
    return results;
};

sinceRefiner.isValid = function(text,results){
	 var match = this.pattern().exec(text);
     if (match) {
     	if(results && results.length == 1 && !results[0].end){
        	return true;
        }
     }
     return false;
};

exports.refiner = sinceRefiner;