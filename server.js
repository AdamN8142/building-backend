const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express')
const app = express()
const port = 3000

app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}.`)
})






app.get('/api/v1/artists', (request, response) => {
  database('artists').select()
    .then((artists) => {
      response.status(200).json(artists);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});

app.get('/api/v1/songs', (request, response) => {
  database('songs').select()
    .then((songs) => {
      response.status(200).json(songs);
    })
    .catch((error) => {
      response.status(500).json({ error });
    });
});


app.get('/api/v1/artists/:id', (request, response) => {
  database('artists').where('id', request.params.id).select()
    .then(artists => {
      if (artists.length) {
        response.status(200).json(artists);
      } else {
        response.status(404).json({ 
          error: `Could not find artist with id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});



app.get('/api/v1/songs/:id', (request,response) => {
  database('songs').where('id', request.params.id).select()
    .then(songs => {
      if(songs.length) {
          response.status(200).json(songs);
      } else {
        response.status(404).json({
          error: `Could not find song with the if ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    })
})