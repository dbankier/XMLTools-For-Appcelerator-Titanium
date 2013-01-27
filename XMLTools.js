/*globals exports*/

// In the style of http://www.thomasfrank.se/xml_to_json.html but for Appcelerator with extras. 

var doc, obj;

var XMLTools = function(inputXml) {	
	if(typeof inputXml == 'object'){
		doc = inputXml.documentElement;
	}
	if(typeof inputXml == 'string'){
		doc = Ti.XML.parseString(xml_string).documentElement;
	}		
};

XMLTools.prototype.getDocument = function() {
	return doc;
};
var addToObject = function(obj, key, value) {
	if(obj[key] == null) {
		obj[key] = value;
	} else if(!(obj[key] instanceof Array)) {
		var tmp = obj[key];
		var arr = [tmp, value];
		obj[key] = arr;
	} else {
		obj[key].push(value);
	}
	return obj;
};
var traverseTree = function(node) {
	var textOnly = true;
	var part = {};
	if(node.hasChildNodes()) {
		for(var ch_index = 0; ch_index < node.childNodes.length; ch_index++) {
			var ch = node.childNodes.item(ch_index);
			if(ch.nodeName=='#text' && ch.text.replace(/\n/g,'').replace(/ /g,'') == "") continue;//skip blank text element
			if(ch.nodeType == 3) {//Text Node
				return ch.text;
			} else {
				part = addToObject(part, ch.tagName, traverseTree(ch));
			}
		}
		textOnly = false;
	}
	if(node.hasAttributes()) {
		for(var att_index = 0; att_index < node.attributes.length; att_index++) {
			var att = node.attributes.item(att_index);
			//part = addToObject(part, att.nodeName, att.nodeValue);
			part[att.nodeName] = att.nodeValue;
		}
		textOnly = false;
	}
	return part;
};
XMLTools.prototype.toObject = function() {
	obj = traverseTree(doc);
	return obj;
};

XMLTools.prototype.toJSON = function() {
	if(obj == null) {
		obj = traverseTree(doc);
	}
	return (JSON.stringify(obj));
};

module.exports = XMLTools;
