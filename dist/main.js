// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = require("!!../node_modules/css-loader/index.js!./main.js");
if(typeof content === 'string') content = [[module.id, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = require("!../node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("88129b3c", content, true, {});