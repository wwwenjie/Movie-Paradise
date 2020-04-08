# Movie Paradise

> This project is for learning and communication purposes only, not for commercial use. The data comes from third-party websites.

Movie Paradise is a web app built by Vue, Spring Boot, and maybe a little Python.  
It can show some movies information and provide download link, live watch functions.

[Demo site](https://movie.jinwenjie.me)  is updated every day with the latest source code.  
[Mock API](http://rap2.jinwenjie.me:3000/repository/editor?id=1) Based on [Rap2](https://github.com/thx/rap2-delos)

### Status: Pre-Alpha
I'm writing the front-end part and learning spring boot

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
main.js / initialization js

App.vue / root component

views / independent pages

utils / utils

store / state management

router / route management

plugins / third-party plugins

mixins / mixins, frequently used data or methods etc...

locales / i18n resources

components / components used by pages

assets / resources

api / api
```
