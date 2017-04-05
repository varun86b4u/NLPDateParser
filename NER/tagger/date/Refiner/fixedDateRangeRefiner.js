var chrono = require('chrono-node');
var moment = require('moment');
var dateTimeUtils = require('../Utils/dateTimeUtils');



var sinceRefiner = new chrono.Refiner();

//sinceRefiner.pattern = function () { return PATTERN };

sinceRefiner.addTag = function(result){
	if(!result.tags){
		result.tags = {};
	}
	result.tags["ENCustomFixedRangeParser"] = true;
}

sinceRefiner.refine = function(text, results, opt) {
    // If there is no AM/PM (meridiem) specified, 
    //  let all time between 1:00 - 4:00 be PM (13.00 - 16.00)
    if(results && results.length > 0){
        for(var i=0;i<results.length;i++){
            var result = results[i];
            if(this.isValid(text,result)){
            	var date = moment(result.ref);
            	var currYear = date.get('year');
            	var currMonth = date.get('month');
            	var startDate = result.start.moment();
            	var endDate = null;
            	if(this.isOnlyKnownMonth(result)){
            		var mon = startDate.get('month');
            		if(mon <= currMonth){
            			startDate.set('year', currYear);
            		}
            		else{
            			startDate.set('year', currYear - 1);
            		}
            		startDate = dateTimeUtils.getBeginOfMonthFromDate(startDate,0);
            		if(mon == currMonth){
            			endDate = date;
            		}
            		else{
            			endDate = dateTimeUtils.getEndOfMonthFromDate(startDate,0);
            		}
            	}
            	else if(this.isMonthAndYearKnown(result)){
            		startDate = dateTimeUtils.getBeginOfMonthFromDate(startDate,0);
            		endDate = dateTimeUtils.getEndOfMonthFromDate(startDate,0);
            	}
            	else if(this.isMonthAndDayKnown(result)){
            		var mon = startDate.get('month');
            		if(mon <= currMonth){
            			startDate.set('year', currYear);
            		}
            		else{
            			startDate.set('year', currYear - 1);
            		}
            		endDate = startDate;
            	}
            	else if(this.isMonthDayAndYearKnown(result)){
            		endDate = startDate;
            	}
            	else if(this.isOnlyYearKnown(result)){
            		startDate = dateTimeUtils.getBeginOfYearFromDate(startDate,0);
            		endDate = dateTimeUtils.getEndOfYearFromDate(startDate,0);
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

                this.addTag(result);
            }
        }
    }
    return results;
};

sinceRefiner.isOnlyYearKnown = function(result){
	return !result.start.isCertain('month') && !result.start.isCertain('day') && result.start.isCertain('year');
};

sinceRefiner.isOnlyKnownMonth = function(result){
	return result.start.isCertain('month') && !result.start.isCertain('day') && !result.start.isCertain('year');
};

sinceRefiner.isMonthAndYearKnown = function(result){
	return result.start.isCertain('month') && !result.start.isCertain('day') && result.start.isCertain('year');
};

sinceRefiner.isMonthAndDayKnown = function(result){
	return result.start.isCertain('month') && result.start.isCertain('day') && !result.start.isCertain('year');
};

sinceRefiner.isMonthDayAndYearKnown = function(result){
	return result.start.isCertain('month') && result.start.isCertain('day') && result.start.isCertain('year');
};

sinceRefiner.isValid = function(text,result){
 	if(result && !result.end){
        	return true;
    }
    return false;
};

exports.refiner = sinceRefiner;