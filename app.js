/*globals require*/

var XMLTools = require("XMLTools");
var parser = new XMLTools('<animals><dog><name type="first">Rufus</name><breed>labrador</breed></dog><dog><name>Marty</name><breed>whippet</breed></dog><cat name="Matilda"/></animals>');
Ti.API.info(parser.toJSON());

/* will output:
  [INFO] {"dog":[{"name":{"text":"Rufus","type":"first"},"breed":"labrador"},{"name":"Marty","breed":"whippet"}],"cat":{"name":"Matilda"}}
*/
