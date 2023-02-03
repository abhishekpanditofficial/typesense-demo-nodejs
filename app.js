const express = require('express');
const { ENV_VARIABLES } = require('./config');
const fs = require('fs');
const client= require('./typesense/client');
const testCollection = require('./typesense/collections/test.collection');


const app = express();

const PORT = ENV_VARIABLES.PORT || 4000; 


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/search', (req, res) =>{
    const { q } = req.query;

    const searchParameters = {
      'q'         : q,
      'query_by'  : 'title',
      'sort_by'   : 'ratings_count:desc',
      'include_fields': 'title',
      'use_cache': true,
      'cache_ttl': 120
    }
  
    client.collections('books')
      .documents()
      .search(searchParameters)
      .then(function (searchResults) {
        res.send(searchResults)
      }, err => { res.send(err) } );
})


app.post('/add', (req, res) =>{
    const test= req.body;

    client.collections('books').documents().create(test).then(data => {
      res.send(data)
    }, err => {
      res.send(err)
    })
})

app.post('/load', (req,res) => {
client.collections().create(testCollection)
  .then( data => {
    console.log(data);
    const documents =  fs.readFileSync(__dirname+ "/db/books.jsonl");
    // get- all products fetch
    client.collections('books').documents().import(documents).then(() => console.log('added'));
    res.json('ok');
  }, err => {
    console.log(err);
    res.json('fail');
});
})

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})