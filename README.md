XMLTools Javascript Module for Titanium
=======================================

Written in the style of http://www.thomasfrank.se/xml_to_json.html but
for Titanium with extras. 

Quick Start
-----------
It is a commonJS module so:

~~~javascript 
var XMLTools = require("XMLTools");
~~~

Code snippets
-------------

Create and parse xml string:

~~~javascript 
  var xml = new XMLTools(your_xml_string);
~~~

If you already have `Ti.XML.Document` object, it can be passed to the
constructor instead. 
  
To get the xml **documentElement**:

~~~javascript 
  var documentElement = xml.getDocument();
~~~

To get the xml converted to an **object**:

~~~javascript 
  var my_object = xml.toObject();
~~~

To get the xml converted into **JSON**:

~~~javascript 
  var my_json = xml.toJSON();
~~~

If you just want to convert xml to json in one line:

~~~javascript
  var my_json = new XMLTools(your_xml_string).toJSON()
~~~

What Next?
----------

Look at the example `app.js` file.


Contributions
-------------
I'm happy for this module to grow/improve. 
