'use strict';

let _ = require('underscore');
let elasticsearch = require('elasticsearch');

let config = {
	'elasticSearch':{
		'url':'http://localhost:9200/'
	}
}

const bizIndex = {
        "indexName" : "4kke_bizdata", 
        "indexType" : "", 
        "alias" : "4kke_bizdata_alias"
    };
const searchIndex = {
        "indexName" : "4kke_searchdata", 
        "indexType" : "4kke", 
        "alias" : "4kke_searchdata_alias"
    };
const fileId = '4kke';

function esEntity(){
	this.client = new elasticsearch.Client({
		host: config.elasticSearch.url,
		requestTimeout : 1000 * 60 *5,
		keepAlive:false
	});
}

const fuzzyQueryWithScroll = (searchIndex,field,value) =>{
	let fuzzy = {};
	fuzzy[field] = value;

	let query = {
		index: searchIndex.alias,
		scroll : "10m",
		sort: ["_doc"],
		size: 1000,
		body: {
			query: {
				"fuzzy":fuzzy
			}
		}
	}
	return query;
}


esEntity.prototype.getBizIndex = function(dataSet){
	return bizIndex;
}

esEntity.prototype.getSearchIndex = function(dataSet){
	return searchIndex;
}

esEntity.prototype.hasAccess = function(fld, val, accessInfo) {
	if(!(accessInfo && accessInfo.length > 0))
		return true;
	
	if(fld && val) {
		var hasA = true;
		accessInfo.forEach(function(a) {
			if(a.field === fld) {
				if(a.allowedValues.indexOf(val) < 0)
					hasA = false;
				
				return;
			}
		});
		
		return hasA;
	}
	
	return false;
}

esEntity.prototype.applyAccessControl = function(dt, accessInfo) {
	if(accessInfo && accessInfo.length > 0) {
		var dt2 = []
		var me = this;
		if(dt != null && dt.length > 0) {
			dt.forEach(function(d){
				if(me.hasAccess(d.type, d.name, accessInfo))
					dt2.push(d);
			});			
		}
		
		return dt2;
	}
	
	return dt;
}

esEntity.prototype.termEntities = function*(term){
	//let fileId = ;
	//let dataSet = yield dataSetsDB.getDataSetById(fileId);
	//let accessInfo = yield datasetUserAccessDB.getAccessByDatasetIdAndUserId(fileId, req.user.id);
	let accessInfo = [];
	let bizIndex = this.getBizIndex();
	let esQuery = fuzzyQueryWithScroll(bizIndex,'values',term)

	if(!bizIndex.indexType){
		delete esQuery.type;
	}

	esQuery.scroll ='2s';
  	esQuery.search_type='scan';
  	esQuery.size = '5000';

	let test2 = yield this.client.search(esQuery);
	let masterData = yield this.scrollMasterData(test2,[]);
	return masterData;
}

esEntity.prototype.scrollMasterData = function*(scrollResponse,masterData){
	let test3 = yield this.client.scroll({
      scrollId: scrollResponse._scroll_id,
      scroll: '2s'
    });

    let stepMasterData = test3.hits.hits.map(h => { return {name : h._source.name, type : h._source.type} });	
    masterData = masterData.concat(stepMasterData);
    if(masterData.length != scrollResponse.hits.total){
    	masterData = yield this.scrollMasterData(test3,masterData);
    }	
	return masterData;
}

let gQryMeta = new esEntity();


module.exports = {
	getTermEntities : gQryMeta.termEntities.bind(gQryMeta),
}
