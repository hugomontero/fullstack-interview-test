# fullstack-interview-test

This repo uses the monorepo pattern with lerna.

# How to Install
Once you clone the project you have to run 

```
$ npm install
```

# How To Use It
Before to use, you have to configure a github token please visit: [Github](https://github.com/settings/tokens) in order to create it
Make sure when you create your token you provide ¨repo¨ scopes in orde to be able to create pull requests with this application

Please add a .env file inside of `packages/gitflat-api/` as showed bellow
```
GIT_TOKEN=my-created-token
```

Once you have been configured your .env, you can run the whole project:

```
$ npm start
```

This will run two services (client and api)
| Service   |      Url      
|----------|:-------------
| api-service |  http://localhost:4000 
| client-service |    http://localhost:3000   


# How To Run Tests
In order to run all tests (api and client) please run:

```
$ npm test
```

If you want just run api tests please run:
```
$ npm run gitflat:api:test
```

In case you want to run the client tests please run:
```
$ npm run gitflat:client:test
```


# How to Run on Docker

If you want to run the application using docker then follow the next steps:

1. Copy the .env.example in root and create .env file
2. Don't forget to add your github token inside the .env file
3. run follow comands:
```
$ docker-compose build
$ docker-compose up
```

The .env default has configured the follow ports (you can changed if you want)

| Service   |      Url      
|----------|:-------------
| api-service |  http://localhost:4000 
| client-service |    http://localhost:8282   