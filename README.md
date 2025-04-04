# Soccer Manager

## [See the App!]



## Description

A web for manager a soccer team

#### [Client Repo here](https://github.com/JuanMarin129/soccer-manager-client)
#### [Server Repo here](https://github.com/JuanMarin129/soccer-manager-server)

## Technologies & Libraries used

**NOTE -** List here all technologies used in the project like HTML, CSS, Javascript, React, axios, React Context, etc.
- HTML
- CSS
- Javascript
- React
- React Context
- Axios
- Routes
- Moment.js
- React Big Calendar
- Cloudinary
- Node.js
- Express
- MongoDB
- Mongoose

## Backlog Functionalities

- Login()
- Signup()
- Calendar()
- ShowComments()
- ShowMatches()
- MatchDetails()
- ShowPlayers()
- AddMatchCard()
- AddComment()
- EditMatch()
- EditComment()
- EditUser()
- EditProfile()
- UserDetails()
- UserProfile()

# Server Structure

## Models

User model

```javascript
{
  nombre: {type: String, required: true, unique: true},
  apellidos: {type: String, required: true, unique: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role:{type: String},
  fechaNacimiento:{type: Date},
  PaisNacionalidad:{type: String},
  foto:{type: String},
  equipo:{type: String}
  
}
```

Match model

```javascript
 {
   competicion: {type: String},
   fecha: {type: Date},
   hora: {type: String},
   jornada: {type: String},
   estadio: {type: String},
   equipoRival: {type: String},
   jugarComo: {type: String},
   entrenador: {type: ObjectId},
   jugadores: {type: [ObjectId]},
   golesAnotados: {type: number},
   resultado: {type: String},
   tarjetasAmarillas: {type: number},
   tarjetasRojas: {type: number},
   posesionBalon: {type: number},
   transicionesAtaqueDefensa: {type: number},
   transicionesDefensaAtaque: {type: number},
   cornersAFavor: {type: number},
   cornersEnContra: {type: number},
   golesBalonParado: {type: number},
   enlacePartido: {type: String},
 }

```

 Comment model 

```javascript
{
    texto: {type: String},
    partido: {type: ObjectId},
    creator: {type: ObjectId},
    visibilidad: {type: String}
}

```

## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                    |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | -------------------------------------------------------------- |
| POST        | `/auth/signup`              | {name, email, password}      | 201            | 400          | Registers the user in the Database                             |
| POST        | `/auth/login`               | {username, password}         | 200            | 400          | Validates credentials, creates and sends Token                 |
| GET         | `/auth/verify`              |                              | 200            | 401          | Verifies the user Token                                        |
| GET         | `/match`                    |                              | 200            | 400          | Show all matchs                                                |
| POST        | `/match`                    | {dataMatch}                  | 201            | 400          | Creates a new match document                                   |
| GET         | `/match/:matchId`           | {dataMatch}                  | 200            | 400, 401     | Sends all match Details                                        |
| PUT         | `/match/:matchId`           | {dataMatch}                  | 200            | 400, 401     | Edits match document                                           |
| DELETE      | `/match/:matchId`           |                              | 200            | 401          | Deletes match document                                         |
| GET         | `/user`                     |                              | 200            | 401          | Sends all users                                                |
| GET         | `/user/profile`             |                              | 200            | 400, 401     | Send all details user                                          |
| PUT         | `/user/profile/:userId`     | {dataUser}                   | 201            | 401          | Edits detail user document                                     |
| GET         | `/comment/for-match/:matchId`|                             | 200            | 401          | Show all comments for this match                               |
| PUT         | `/comment/:commentId`       | {dataComment}                | 200            | 401          | Create a new comment                                           |
| DELETE      | `/comment/:commentId`       |                              | 200            | 401          | Delete a comment                                               |
  
## Links

### Collaborators

[Developer 1 name](www.github-url.com)

[Developer 2 name](www.github-url.com)

### Project

[Repository Link Client](www.your-github-url-here.com)

[Repository Link Server](www.your-github-url-here.com)

[Deploy Link](www.your-deploy-url-here.com)

### Trello

[Link to your trello board](www.your-trello-url-here.com)

### Slides

[Slides Link](www.your-slides-url-here.com)
