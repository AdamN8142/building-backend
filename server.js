const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const express = require('express')
const app = express()


app.set('port', process.env.PORT || 3000)
//setting the port to be the environemt if we have specify one, or default to 3000


app.listen(app.get('port'), () => {
  console.log(`Server is running on http://localhost:${app.get('port')}.`)
})

// Listening and getting the port 



app.get('/api/v1/artists', (request, response) => {
  // We are using the get method to grab the artists
  database('artists').select()
  //this is selecting which table to choose from, it returns a promist 
    .then((artists) => {
      response.status(200).json(artists);
    })
    // then we give a 200 status and and return our json artists
    .catch((error) => {
      response.status(500).json({ error });
    });
    // if theres an error, throw a 500 response status and throw the error
});


app.get('/api/v1/songs', (request, response) => {
  //We are using the get method to grab all of the songs
  database('songs').select()
  //selecting the songs table 
    .then((songs) => {
      response.status(200).json(songs);
    })
    // give 200 response status and json songs 
    .catch((error) => {
      response.status(500).json({ error });
    });
      // if theres an error, throw a 500 response status and throw the error
});


app.get('/api/v1/artists/:id', (request, response) => {
  //Grabbing artists dynamically by their id,
  database('artists').where('id', request.params.id).select()
  //selecting the artists table and using request.params.id to grab the one we want
    .then(artists => {
      if (artists.length) {
        response.status(200).json(artists);
        //We set a conditional saying if their is an artist with the id we are looking for then give us a 200 response status and that artist 
      } else {
        response.status(404).json({ 
          error: `Could not find artist with id ${request.params.id}`
        });
      }
      //If the artist is not found, send back a 404 with the message of could not find artist
    })
    .catch(error => {
      response.status(500).json({ error });
    });
    //if the entire get fails, send back a status of 500 and the error 
});



app.get('/api/v1/songs/:id', (request,response) => {
  //Using the get method to grab a song by its ID
  database('songs').where('id', request.params.id).select()
    //selectin the songs table, using the ID of the song 
    .then(songs => {
      if(songs.length) {
          response.status(200).json(songs);
      } else {
        response.status(404).json({
          error: `Could not find song with the if ${request.params.id}`
        });
      }
      // We set a conditonal, if we find a song, send a 200 status and the json songs, and if we dont find a song send back a 404 and a couldnt find song error msg
    })
    .catch(error => {
      response.status(500).json({ error });
    })
    //if GET fails, send back a 500 status and an error
})

app.post('/api/v1/artists/:id', (request, response ) => {
  //Adding a new artist to the backend 
  const artist = request.body;
  // setting a const artist to be the request body, which will be the new song  
    for(let requiredParameter of ['name', 'yearBorn', 'instrument']){
      //running a for of loop to make sure our user has given a name, birthday, and instrument
      if(!artist[requiredParameter]){
        return response
        .status(422)
        .send({ error: `Expected format: { name: <String>, yearBorn: <String>, yearBorn: <String> }. You're missing a "${requiredParameter}" property.` });
      }
      // Setting a conditional, if one of the required params was omitted, send back a 422 and tell them which one is missing
    }

    database('artists').insert(artist, 'id')
    // Selecting the artist table and giving it an ID on the backend
      .then(artist => {
        response.status(201).json({id: artist[0]})
      })
      //sending a 201 status, and returning the new artist with an id that we have given it 
      .catch(error => {
        response.status(500).json({ error })
      });
      //if the GET fails then throw a 500 and error 
});
