# Restful API Basic Authentication with NodeJS ExpressJs Generator (--no-view) MySQL

install dependencies:
```
$ npm install
```

run the app:
```
$ DEBUG=restful-api-nlkybjqrtvym:* npm start
```
## Usage
```
http://localhost:3000/users/register
http://localhost:3000/profile/:id
```
## JSON
```
{
    "username": "username",
    "password": "password",
    "email": "mail@email.com",
    "fullname": "fullname"
}
```
## Dependencies
```
npm install mysql2
npm install bcryptjs
npm install passport
npm install passport-http
```