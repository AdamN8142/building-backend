# Musician Backend

## This backend is made up of some of my favorite musicians. Each object contains an artists name, birthday, and instrument, as well as an array of two or more songs. 

## Possible Endpoints
### GET
### POST
### DELETE 

## Root
### https://musician-backend.herokuapp.com/



## GET: /api/v1/artists

#### Example: You will get an array of objects 
[
  {
    name: 'Jerry Garcia',
    yearBorn: 1942,
    instrument: 'Guitar',
    songs: ['Friend of the Devil', 'High Time', 'Terrapin Station']
  },
  {
    name: 'Bob Weir',
    yearBorn: 1947,
    instrument: 'Guitar',
    songs: ['Cassidy', 'Looks Like Rain']
  },
  {
    name: 'Bob Marley',
    yearBorn: 1945,
    instrument: 'Guitar',
    songs: ['No Woman, No Cry', 'Could You Be Loved', 'Waiting in Vain']
  }
]


## GET: /api/v1/artists/:id
### Grab individual artist 

#### Example: You will get a single JSON object

  {
    name: 'Bob Dylan',
    yearBorn: 1941,
    instrument: 'Guitar',
    songs: ['Maggies Farm', 'Baby Blue', 'Knockin On Heavens Door']
  }
  
  
## POST: /api/v1/artists
### Add an individual artist 

### Required body
### name, yearBorn, instrument 



