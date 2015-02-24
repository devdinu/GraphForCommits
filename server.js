var http = require('http');
var fs = require('fs');
var path = require('path');
var static = require('node-static');
var url = require('url');
var pythonShell = require('python-shell')
// var express = require('express')
// var Mustache = require('./node_modules/mustache/mustache')

var port_to_listen = 8000;
var html_filename = 'commit-graph.html'; 
var location = './D3'
var abs_fn = path.join(__dirname, 'D3_Graph', html_filename);
var count = 0;

var static_server = new static.Server('./lib');


http.createServer(function(req,res) {
	var url_p = url.parse(req.url,true);
	if(url_p.path.indexOf('.py') > -1) {
		console.log(url_p);
		var data = getData(res);
	}
	else {
		res.writeHead(200, { 'content-type' :'text/html' });
		console.log('serving a request...' + ++count);
		res.end(readHtmlFile(abs_fn));
	}
}).listen(port_to_listen, '127.0.0.1');

// static server to server js files
http.createServer(function(request, response) {
	request.addListener('end', function(){
		static_server.serve(request,response);
	}).resume();
}).listen(9000);

function readHtmlFile(fn) {
	console.log('reading'+fn);
	output = fs.readFileSync(fn, encoding='utf-8');
	return output
}

function getData(res) {
	var options = {
		scriptPath : '/Users/dineshkb/Documents/Learn/Python/Graph/src'
	}
	var test;
	pythonShell.run('DataExtractor.py', options, function(err, data) {
		if(err) {
			res.end(err)
		}
		if(data)
			res.end(data.toString());
		else
			res.end('Data is null!')
	})
}

/* Render with mustache
var view = {
title : "Graph Plotting",
	test: function() {
		console.log("This is fun")
	}
}
Mustache.render("{{title}} thus method {{test}}", view)

console.log('end of listen');
*/

