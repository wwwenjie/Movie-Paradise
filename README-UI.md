# Movie Paradise App UI

> Front end of [Movie Paradise](https://github.com/wwwenjie/movie-paradise)

## Introduction

Movie Paradise App UI is a web app built by Vue and Vuetify. It provides user interface of users.

[Demo Website](https://movieparadise.netlify.app)  
[Optimized for China](https://movie-paradise-1256033731.cos-website.ap-chengdu.myqcloud.com)

## Features

- :iphone: Responsive
- :globe_with_meridians: Internationalization
- :first_quarter_moon: Dark Mode
- :zap: Serverless Deploy

## Development
Since the dependencies are installed with lerna, you only need to run serve script to serve as develop.  

```bash
# run
> yarn serve
```

## Deploying

This site is automatically deployed when commits land in master, via [Netlify](https://www.netlify.com/).  
Deploy this project easily through serverless, just run `yarn deploy`.

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
