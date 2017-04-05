var chrono = require('chrono-node')
var customParsers = require('./Parsers');
var customRefiners = require('./Refiner');


var custom = new chrono.Chrono();

for(var key in customParsers){
	custom.parsers.unshift(customParsers[key]);
}

for(var key in customRefiners){
	custom.refiners.push(customRefiners[key]);
}

function dateParser(sent){
	this.sent = sent;
	this.parse();
};

dateParser.prototype = {
	parse:function(){
		this.res = custom.parse(this.sent);
	},

	getAllDateObjs:function(){
		var textObj = [];
		if(this.res && this.res.length > 0){
			this.res.forEach(function(result){
				textObj.push(this.getAllDateText(result));
			}.bind(this));
		}
		return textObj;
	},

	getAllDateText:function(result){
		var obj = {

		};
		obj['startIndex'] = result.index;
		obj.text = result.text;
		obj.startDate = result.start.moment().format('YYYY/MM/DD');
		obj.endDate = result.end.moment().format('YYYY/MM/DD');
		obj.customData = result.tags["customData"];
		return obj;
	}
}

module.exports = dateParser;