var http=require('http');
var fs=require('fs');
var path = require('path');
express = require('express')

var html_filename = 'commit-graph.html'; 
var Mustache = require('./node_modules/mustache/mustache')
var location = './D3'
var abs_fn = path.join(__dirname, 'D3_Graph', html_filename);
var count = 0;

var port_to_listen = 8000;

http.createServer(function(req,res) {

	console.log('added message :) ')	
	res.writeHead(200, { 'content-type' :'text/html' });
	console.log('serving a request...' + ++count);
	res.end(readHtmlFile(abs_fn));
	})
	.listen(port_to_listen, '127.0.0.1');

function readHtmlFile(fn) {
	console.log('reading'+fn);
	output = fs.readFileSync(fn, encoding='utf-8');
	return output
}

var view = {
title : "Graph Plotting",
	test: function() {
		console.log("This is fun")
	}
}
Mustache.render("{{title}} thus method {{test}}", view)

console.log('end of listen');


