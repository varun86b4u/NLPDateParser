var chrono = require('chrono-node');
var moment = require('moment');
var dateTimeUtils = require('../Utils/dateTimeUtils');

var currentParser = new chrono.Parser();

var currentWords = [
	'this',
	'current'
];

var PATTERN = new RegExp('(\\W|^)' +
    '('+currentWords.join('|')+')\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?|quartars?)(?=\\s*)' +
    '(?=\\W|$)', 'i'
);

var MODIFIER_WORD_GROUP = 2;
var RELATIVE_WORD_GROUP = 3;

// Provide search pattern
currentParser.pattern = function () { return PATTERN };

currentParser.extract = function(text, ref, match, opt) { 
	var index = match.index + match[1].length;
    var text  = match[0];
    text  = match[0].substr(match[1].length, match[0].length - match[1].length);

    var result = new chrono.ParsedResult({
        index: index,
        text: text,
        ref: ref
    });
    result.tags['ENCurrentDateCustomFormatParser'] = true;
    var num = -1;
    var date = moment(ref);
    if (match[RELATIVE_WORD_GROUP].match(/day|week|month|year|quartar/i)) {
    	if(result.end == null){
            result.end = new chrono.ParsedComponents(null, result.start.date());
        }

    	var startDate = null;
    	var endDate = null;
        if (match[RELATIVE_WORD_GROUP].match(/day/i)) {
            startDate = date;
        } else if (match[RELATIVE_WORD_GROUP].match(/week/i)) {
            startDate = dateTimeUtils.getCurrentWeekStartDate(date);
        } else if (match[RELATIVE_WORD_GROUP].match(/month/i)) {
            startDate = dateTimeUtils.getBeginOfCurrentMonth(date);
        } else if (match[RELATIVE_WORD_GROUP].match(/year/i)) {
            startDate = dateTimeUtils.getBeginOfCurrentYear(date);
        } else if (match[RELATIVE_WORD_GROUP].match(/quartar/i)) {
            startDate = dateTimeUtils.getBeginOfCurrentQuarter(date);
        }
        endDate = date;

        result.start.assign('year', startDate.year());
        result.start.assign('month', startDate.month() + 1);
        result.start.assign('day', startDate.date());

        result.end.assign('year', endDate.year());
        result.end.assign('month', endDate.month() + 1);
        result.end.assign('day', endDate.date());
        
    }
    return result;
    /*if (match[RELATIVE_WORD_GROUP].match(/hour/i)) {

        date.add(num, 'hour');
        result.start.imply('minute', date.minute());
        result.start.imply('second', date.second());

    } else if (match[RELATIVE_WORD_GROUP].match(/min/i)) {

        date.add(num, 'minute');
        result.start.assign('minute', date.minute());
        result.start.imply('second', date.second());

    } else if (match[RELATIVE_WORD_GROUP].match(/second/i)) {

        date.add(num, 'second');
        result.start.assign('second', date.second());
        result.start.assign('minute', date.minute());
    }

    result.start.assign('hour', date.hour());
    result.start.assign('year', date.year());
    result.start.assign('month', date.month() + 1);
    result.start.assign('day', date.date());
    return result;*/
}

exports.currentParser = currentParser;