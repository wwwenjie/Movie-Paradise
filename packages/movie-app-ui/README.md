# Movie Paradise

![](https://github.com/wwwenjie/Movie-Paradise/workflows/deploy/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3261a25a-796e-4e36-bbba-0a3db3bf37b4/deploy-status)](https://app.netlify.com/sites/movieparadise/deploys)

[简体中文](./README.zh-CN.md)

> This project is for learning and communication purposes only, not for commercial use. The data comes from third-party websites.

## Introduction

Movie Paradise is a web app built by Vue and Vuetify.  
It can preview movies and provide download hash, online watch links, ~~live watch functions~~.

[Demo Website](https://movieparadise.netlify.app)  
[Optimized for China](https://movie-paradise-1256033731.cos-website.ap-chengdu.myqcloud.com)

## Features

- :iphone: Responsive
- :globe_with_meridians: Internationalization
- :first_quarter_moon: Dark Mode
- :zap: Serverless Deploy

## Status: Beta

Most of the features has been completed, more details to be optimized

## Preview

<p align="center">
<img height="350" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/mobile_home.png" alt="mobile home view"/></p>
<p align="center"><img width="70%" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/pad_home.png" alt="pad home view"/></p>
<p align="center"><img width="100%" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/desktop_home.png" alt="desktop home view"/></p>

## Deploying

This site is automatically deployed when commits land in master, via [Netlify](https://www.netlify.com/).  
Deploy this project easily through serverless, just run `yarn deploy`.

## Development (back-end)

You can run this project without back end, just change `VUE_APP_BASE_API` in `.env.development` to public API `https://api.movie.jinwenjie.me`, which allow access from `localhost:8080`.

- [back end repository](https://github.com/wwwenjie/movie-paradise-koa)
- [Swagger API](https://api.movie.jinwenjie.me/swagger-html)
- (deprecated) [Mock API](http://rap2.jinwenjie.me:3000/repository/editor?id=1) Based on [Rap2](https://github.com/thx/rap2-delos)

## Development (front-end)

```bash
# clone this repo
> git clone https://github.com/wwwenjie/Movie-Paradise.git

# install the dependencies
> yarn

# run
> yarn serve
```

### Structure

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

## Contributing

Welcome to report bug or add new features. You can know what we are going to do in [Projects](https://github.com/wwwenjie/Movie-Paradise/projects)
