const client = require("../client");

const schema = {
    'name': 'books',
    'fields': [
      {'name': 'title', 'type': 'string' },
      {'name': 'authors', 'type': 'string[]', 'facet': true },
  
      {'name': 'publication_year', 'type': 'int32', 'facet': true },
      {'name': 'ratings_count', 'type': 'int32' },
      {'name': 'average_rating', 'type': 'float' }
    ],
    'default_sorting_field': 'ratings_count'
  }

// client.collections().create(schema)
//   .then( data => {
//     console.log(data);
//   }, err => {
//     console.log(err);
// });

module.exports = schema;