var chrono = require('chrono-node');
var moment = require('moment');
var dateTimeUtils = require('../Utils/dateTimeUtils');
var util = require('../Utils/EN');

var relativeDateParser = new chrono.Parser();

var sinceWords = [
	'last',
	'previous',
	'next',
	'past'
];

var PATTERN = new RegExp('(\\W|^)' +
    '('+sinceWords.join('|')+')\\s*' +
    '('+ util.INTEGER_WORDS_PATTERN + '|[0-9]+|few|half(?:\\s*an?)?)?\\s*' +
    '(seconds?|min(?:ute)?s?|hours?|days?|weeks?|months?|years?|quartars?)(?=\\s*)' +
    '(?=\\W|$)', 'i'
);

var MODIFIER_WORD_GROUP = 2;
var MULTIPLIER_WORD_GROUP = 3;
var RELATIVE_WORD_GROUP = 4;

// Provide search pattern
relativeDateParser.pattern = function () { return PATTERN };

relativeDateParser.extract = function(text, ref, match, opt) {
	console.log('test12121');
	var index = match.index + match[1].length;
    var modifier = match[MODIFIER_WORD_GROUP].toLowerCase().match(/^next/) ? 1 : -1;
    var text  = match[0];
    text  = match[0].substr(match[1].length, match[0].length - match[1].length);

    var result = new chrono.ParsedResult({
        index: index,
        text: text,
        ref: ref
    });
    result.tags['ENRelativeDateCustomFormatParser'] = true;

    var num = match[MULTIPLIER_WORD_GROUP] === undefined ? '' : match[3].toLowerCase();
    if (util.INTEGER_WORDS[num] !== undefined) {
        num = util.INTEGER_WORDS[num];
    } else if (num === ''){
        num = 1;
    /*} else if (num.match(/few/i)){
        num = 3;
    } else if (num.match(/half/i)) {
        num = 0.5;*/
    } else {
        num = parseInt(num);
    }

    var date = moment(ref);
    if (match[RELATIVE_WORD_GROUP].match(/day|week|month|year|quartar/i)) {
    	if(result.end == null){
            result.end = new chrono.ParsedComponents(null, result.start.date());
        }
    	var startDate = null;
    	var endDate = null;
        if (match[RELATIVE_WORD_GROUP].match(/day/i)) {
        	if(modifier > 0){
				startDate = dateTimeUtils.getTomorrowDate();
				endDate = dateTimeUtils.getDateAfterDays(startDate,num);
        	}
        	else{
            	startDate = (num==1)?dateTimeUtils.getDaysBeforeDate(date,num):dateTimeUtils.getDaysBeforeDate(date,num-1);
				endDate = (num==1)?dateTimeUtils.getDaysBeforeDate(date,num):date;
			}
        } else if (match[RELATIVE_WORD_GROUP].match(/week/i)) {
            if(modifier > 0){
				startDate = dateTimeUtils.getStartOfNextWeek();
				endDate = dateTimeUtils.getDateAfterWeeks(startDate,num);
        	}
        	else{
            	startDate = (num==1)?dateTimeUtils.getBeginOfWeekFromdate(date,num):dateTimeUtils.getBeginOfWeekFromdate(date,num-1);
				endDate = (num==1)?dateTimeUtils.getEndOfWeekFromdate(date,num):date;
			}
        } else if (match[RELATIVE_WORD_GROUP].match(/month/i)) {
            if(modifier > 0){
				startDate = dateTimeUtils.getStartOfNextMonth();
				endDate = dateTimeUtils.getDateAfterMonths(startDate,num);
        	}
        	else{
            	startDate = (num==1)?dateTimeUtils.getBeginOfMonthFromDate(date,num):dateTimeUtils.getBeginOfMonthFromDate(date,num-1);
				endDate = (num==1)?dateTimeUtils.getEndOfMonthFromDate(date,num):date;
			}
        } else if (match[RELATIVE_WORD_GROUP].match(/year/i)) {
            if(modifier > 0){
				startDate = dateTimeUtils.getTomorrowDate();
				endDate = dateTimeUtils.getDateAfterYears(startDate,num);
        	}
        	else{
            	startDate = (num==1)?dateTimeUtils.getBeginOfYearFromDate(date,num):dateTimeUtils.getBeginOfYearFromDate(date,num-1);
				endDate = (num==1)?dateTimeUtils.getEndOfYearFromDate(date,num):date;
			}
        } else if (match[RELATIVE_WORD_GROUP].match(/quartar/i)) {
            if(modifier > 0){
				startDate = dateTimeUtils.getStartOfNextQuarter();
				endDate = dateTimeUtils.getEndDateAfterQuarters(startDate,num);
        	}
        	else{
            	startDate = (num==1)?dateTimeUtils.getBeginofAfterQuarters(date,num):dateTimeUtils.getBeginofAfterQuarters(date,num-1);
				endDate = (num==1)?dateTimeUtils.getEndofAfterQuarters(date,num):date;
			}
        }
        
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
    result.start.assign('day', date.date());*/
    //return result;
}

exports.parser = relativeDateParser;
