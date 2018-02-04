const express = require('express');
const fs = require('fs');
const Walker = require('walker');
const showdown  = require('showdown')

const app = express();
const converter = new showdown.Converter()
const templatePath = process.cwd() + '/template.html'


Walker('./content')
  .on('file', (entry, _) => {
    pageSettings = entry.split('/')
    let inMemoryTemplate = '';
    let htmlFromMd = '';
    fs.readFile(templatePath, (err, data) => {
      if (err) throw err; inMemoryTemplate = data.toString();
    });
  
    fs.readFile( process.cwd() + '/' + entry, (err, data) => {
      if (err) throw err; htmlFromMd = converter.makeHtml(data.toString());
    });
  
    app.get('/' + pageSettings[1], (req, res) => {  
      const htmlPage = inMemoryTemplate.replace('{{content}}', htmlFromMd );
      res.send(htmlPage);
    });  
  })

module.exports = app