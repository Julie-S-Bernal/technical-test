const express = require('express');
const fs = require('fs');
const Walker = require('walker');
const showdown  = require('showdown')



const app = express();
const converter = new showdown.Converter()
const templatePath = process.cwd() + '/template.html'

/**
 * Given an an entry parameter:
 * 1. Read the HTML template in memory.
 * 2. Read the md file into memory transform it in HTML.
 * 3. Use a string replace to insert the HTML into the template file.   
 * 4. return page content.
 */
const  processing = (entry) => {
  pageSettings = entry.split('/')
  let inMemoryTemplate = '';
  let htmlFromMd = '';
  fs.readFile(templatePath, (err, data) => {
    // readFile return a string buffer we use 
    // toString to convert it to a javascript string. 
    if (err) throw err; inMemoryTemplate = data.toString();
  });

  fs.readFile( process.cwd() + '/' + entry, (err, data) => {
    /** I use an external library Showdown that convert 
     *  MarkDown to HTML.
     */
    if (err) throw err; htmlFromMd = converter.makeHtml(data.toString());
  });

  app.get('/' + pageSettings[1], (req, res) => {  
    /** 
     * I use the generated HTML to replace the {{content}} marker inside 
     * the provided template.html file.
     */
    const htmlPage = inMemoryTemplate.replace('{{content}}', htmlFromMd );
    res.send(htmlPage);
  }); 
};


/**
 * I use Walker Library to find all of the Markdown 
 * files and their location in the file system tree.
 * the library returns this information through the entry argument.
 */
Walker('./content')
  .on('file', (entry, _) => {
    processing(entry);
  })

module.exports = app