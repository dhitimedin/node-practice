const wiki = require('./wiki.js');
const express = require('express');
const app = express();
const port = 3000;

app.use( express.static('public') )
app.use('/wiki', wiki);


app.listen(port, function() {
   console.log(`Example app listening on port ${port}!`)
 });