# Movie Paradise [![Netlify Status](https://api.netlify.com/api/v1/badges/3261a25a-796e-4e36-bbba-0a3db3bf37b4/deploy-status)](https://app.netlify.com/sites/movieparadise/deploys)  

> This project is for learning and communication purposes only, not for commercial use. The data comes from third-party websites.

### Introduction
Movie Paradise is a web app built by Vue and Koa.  
It can preview movies and provide download hash, online watch url, ~~live watch functions~~.

### Status: Alpha
Most of basic features has been completed, more features are under development

### Deploying
[The site](https://movieparadise.netlify.app/) is automatically deployed when commits land in master, via [Netlify](https://www.netlify.com/).  
Deploy this project easily through serverless, just run `yarn deploy`.  

[Swagger API](https://api.movie.jinwenjie.me/swagger-html)  
(deprecated) [Mock API](http://rap2.jinwenjie.me:3000/repository/editor?id=1) Based on [Rap2](https://github.com/thx/rap2-delos)

### Development (back-end)
- [back end repository](https://github.com/wwwenjie/movie-paradise-koa)

### Development (front-end)
- clone this repo
```
git clone https://github.com/wwwenjie/Movie-Paradise.git
```
- install the dependencies
```
yarn
```
- run
```
yarn serve
```
Structure
```
main.js / initialization script

config.js / config

App.vue / root component

views / independent pages

utils / utils

store / state management

sass / customize vuetify sass

router / route management

plugins / third-party plugins

mixins / mixins, frequently used data or methods etc...

locales / i18n resources

directives / directives

components / components used by pages

assets / resources

api / api
```
