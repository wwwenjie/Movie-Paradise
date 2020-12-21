# Movie Paradise Koa

> Back end of [Movie Paradise](https://github.com/wwwenjie/movie-paradise)

## Introduction

Movie Paradise Koa is a RESTful style back end built by Koa and TypeORM.  
You can visit online [Swagger API Doc](https://api.movie.jinwenjie.me/swagger-html)

## Features

- TypeScript
- RESTful
- Swagger
- MySQL and MongoDB

## Development

You may need to set up your database first, set in `src/config/config.json`, you can also create `config.local.json`. By default, program will load `config.local.json` if it exsits. Trun `sync` on and program will create data structure. Note: sync will drop all the data exist in the database, make sure trun it off after structure is created.

```bash
# clone this repo
> git clone https://github.com/wwwenjie/Movie-Paradise-Koa.git

# install the dependencies
> yarn

# run with ts-node
> yarn serve
```

### Structure

```
__tests__ / unit test

config / config

controller / request and response

core / middleware and initialize operation

entity / entity

error / global error handle

service / database operation

util / utils

app.ts / startup script
```

## Deploying

This project is written in TypeScript, so you need to compile to JavaScript and run with node.  
Here is an example of update and deploy shell.

```bash
# update code
> git pull

# kill node, here port is 3000, change it to the port node used
> kill $(lsof -i:3000 -t)

# install new dependencies
> yarn

# compile to JavaScript
> yarn build

# copy ./src/config.local.json to dist
> cp src/config/config.local.json dist/config/config.local.json

# run under nohup, the console log in ./nohup.out, logger in ./log
> nohup node dist/app.js &
```

## Contributing

Welcome to report bug or add new features. You can know what we are going to do in [Projects](https://github.com/wwwenjie/Movie-Paradise-Koa/projects)
