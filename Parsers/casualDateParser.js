var chrono = require('chrono-node');
var moment = require('moment');
var dateTimeUtils = require('../Utils/dateTimeUtils');

var casualDateParser = new chrono.Parser();

var PATTERN = /(\W|^)(today|(?:yesterday)\s*|yesterday)(?=\W|$)/i;

// Provide search pattern
casualDateParser.pattern = function () { return PATTERN };

casualDateParser.extract = function(text, ref, match, opt) {
	var text = match[0].substr(match[1].length);
    var index = match.index + match[1].length;
    var result = new chrono.ParsedResult({
        index: index,
        text: text,
        ref: ref
    });

    var refMoment = moment(ref);
    var startDate = refMoment;
    var endDate = refMoment;
    var lowerText = text.toLowerCase();

    if (/^yesterday/.test(lowerText)) {
        startDate = dateTimeUtils.getYesterdaysDate();
        endDate = dateTimeUtils.getYesterdaysDate();
    }

    if(result.end == null){
        result.end = new chrono.ParsedComponents(null, result.start.date());
    }
    result.start.assign('year', startDate.year());
    result.start.assign('month', startDate.month() + 1);
    result.start.assign('day', startDate.date());

    result.end.assign('year', endDate.year());
    result.end.assign('month', endDate.month() + 1);
    result.end.assign('day', endDate.date());

    result.tags['ENCasualCustomDateParser'] = true;
    return result;
}

exports.parser = casualDateParser;