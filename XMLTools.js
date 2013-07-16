/**
* XMLTools: Titanium module to convert XML to objects
* Copyright: 2013 David Bankier (http://www.yydigital.com)
* License: http://opensource.org/licenses/MIT
* Source: https://github.com/dbankier/XMLTools-For-Appcelerator-Titanium
*/

// In the style of http://www.thomasfrank.se/xml_to_json.html but for Appcelerator with extras. 


var XMLTools = function(inputXml) {	
	if(typeof inputXml == 'string'){
		this.doc = Ti.XML.parseString(inputXml).documentElement;
	}	
	if(typeof inputXml == 'object'){
		this.doc = inputXml.documentElement;
	}		
};

XMLTools.prototype.getDocument = function() {
	return this.doc;
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
			if(ch.nodeName=='#text' && ch.textContent.replace(/\n/g,'').replace(/ /g,'') == "") continue;//skip blank text element
			if(ch.nodeType === 3 || ch.nodeType === ch.CDATA_SECTION_NODE) {//Text Node
        if (node.childNodes.length === 1 && !node.hasAttributes()) {
				  return ch.textContent;
        } else {
          part.text = ch.textContent;
        }
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
	if(this.doc == null){
	  	return null;
	}
	this.obj = traverseTree(this.doc);
	return this.obj;
};

XMLTools.prototype.toJSON = function() {
	if(this.doc == null){
	  	return null;
	}	
	if(this.obj == null) {
		this.obj = traverseTree(this.doc);
	}
	return (JSON.stringify(this.obj));
};

module.exports = XMLTools;
