const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use('/', express.static('./'));

app.get('/', function(req,res){
    res.set('Content-Type', 'text/html');
    res.status(200);
    res.sendFile(__dirname + '/index.html');
})
app.get('/puzzle/:index', function(req,res){
    let line = +req.params.index;
    fs.readFile('./puzzles.txt', 'utf8', function(err, data){
        if(err) console.log('FILE ERROR: ',err);
        else {
            let puzzle = data.split('\n')[line];
            if(puzzle === undefined) console.log('puzzle number '+line+' does not exist');
            res.status(200);
            res.redirect('http://localhost:3000/?board='+puzzle);
        }
    });
})

app.listen(3000)

