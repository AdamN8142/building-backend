const adamsArtists = require('../../data')

const createArtist = (knex, artist) => {
  return knex('artists').insert({
    name: artist.name,
    born: artist.yearBorn,
    instrument: artist.instrument
  }, 'id')
  .then(artistId => {
    let songsPromises = [];

    artist.songs.forEach(song => {
      console.log('in for each', song)
      songsPromises.push(
        createSong(knex, {
          songs: song,
          artist_id: artistId[0]
        })
      )
    });

    return Promise.all(songsPromises);
  })
};

const createSong = (knex, song) => {
  console.log(song)
  return knex('songs').insert(song);
};

exports.seed = (knex, Promise) => {
  return knex('songs').del()
    .then(() => knex('artists').del())
    .then(() => {
      let artistPromises = [];

      adamsArtists.forEach(artist => {
        artistPromises.push(createArtist(knex, artist));
      });
        return Promise.all(artistPromises);
    })
  .catch(error =>  console.log(`Error seeding  datq ${error}`));
}