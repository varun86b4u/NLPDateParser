var moment = require('moment');

var dateTimeUtils = {
	getBeginOfWeekFromdate:function(date,count){
		var date = moment(date).subtract(count, 'week');
		//1 means start of week is monday
		var begin = moment(date).startOf('isoweek').isoWeekday(1);
		return begin;
	},
	getEndOfWeekFromdate:function(date1,count){
		var date = moment(date1).subtract(count, 'week');
		//1 means start of week is monday
		var begin = moment(date).startOf('isoweek').isoWeekday(1);
		var end = begin.add(6,'d'); //adding 6 days
		var minDate = moment.min(end, moment(date1));
		return minDate;
	},
	getDaysBeforeDate:function(date,count){
		var date = moment(date).subtract(count,'day');
		return date;
	},
	getYesterdaysDate:function(){
		var date = moment().subtract(1,'day');
		return date;
	},
	getTodaysDate:function(){
		var date = moment();
		return date;
	},
	getTomorrowDate:function(){
		var date = moment().add(1,'day');
		return date;
	},

	getDateAfterDays:function(date,count){
		var date = moment(date).add(count-1,'day');
		return date;
	},

	getStartOfNextMonth:function(){
		var date = moment().add(1,'month');
		var begin = date.startOf('month');
		return begin;
	},

	getDateAfterMonths:function(date,count){
		var date = moment(date).add(count -1,'month').endOf('month');
		return date;
	},

	getStartOfNextWeek:function(){
		var date = moment().add(1,"week");
		var begin = moment(date).startOf('isoweek').isoWeekday(1);
		return begin;
	},

	getStartOfNextQuarter:function(){
		var date = moment().add(1,"quarter");
		var begin = moment(date).startOf('quarter');
		return begin;
	},

	getEndDateAfterQuarters:function(date,count){
		var date = moment(date).add(count -1,'quarter').endOf('quarter');
		return date;
	},

	getBeginOfCurrentQuarter:function(){
		var date = moment();
		return this.getBeginofAfterQuarters(date,0);
	},

	getBeginofAfterQuarters:function(date,count){
		var date = moment(date).subtract(count,'quarter');
		var begin = moment(date).startOf('quarter');
		return begin;
	},

	getEndofAfterQuarters:function(date,count){
		var date = moment(date).subtract(count,'quarter');
		var end = moment(date).endOf('quarter');
		return end;
	},

	getDateAfterYears:function(date,count){
		var date = moment(date).add(count-1,'year').endOf('year');
		return date;
	},

	getDateAfterWeeks:function(date,count){
		var begin = moment(date).startOf('isoweek').isoWeekday(1);
		var date = begin.add(count -1,'week').add(6,'d');
		return date;
	},

	getCurrentWeekStartDate:function(){
		var date = moment();
		return this.getBeginOfWeekFromdate(date,0);
	},
	getBeginOfCurrentMonth:function(){
		var date = moment();
		return this.getBeginOfMonthFromDate(date,0);
	},
	getBeginOfMonthFromDate:function(date,count){
		var date = moment(date).subtract(count, 'month');
		//1 means start of week is monday
		var begin = moment(date).startOf('month');
		return begin;
	},

	getEndOfMonthFromDate:function(date,count){
		var date = moment(date).subtract(count, 'month');
		//1 means start of week is monday
		var end = moment(date).endOf('month');
		return end;
	},

	getBeginOfCurrentYear:function(){
		var date = moment();
		return this.getBeginOfYearFromDate(date,0);
	},

	getBeginOfYearFromDate:function(date,count){
		var date = moment(date).subtract(count, 'year');
		//1 means start of week is monday
		var begin = moment(date).startOf('year');
		return begin;
	},

	getEndOfYearFromDate:function(date,count){
		var date = moment(date).subtract(count, 'year');
		var end = moment(date).endOf('year');
		return end;
	},

	getDateInFormat:function(date){
		var d = moment(date);
		if(d.diff(moment()) > 0){
			d = moment(d).subtract(1, 'year');
		}
		return d;
	}

}

module.exports = dateTimeUtils;