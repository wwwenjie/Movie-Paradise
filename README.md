# Movie Paradise

![](https://github.com/wwwenjie/Movie-Paradise/workflows/deploy/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3261a25a-796e-4e36-bbba-0a3db3bf37b4/deploy-status)](https://app.netlify.com/sites/movieparadise/deploys)

[简体中文](./README.zh-CN.md)

> This project is for learning and communication purposes only, not for commercial use. The data comes from third-party websites.

## Introduction

Movie Paradise is a web app built by Vue, React(WIP) and Koa.  
It can preview movies and provide download hash, online watch links, ~~live watch functions~~.

[Demo Website](https://movieparadise.netlify.app)  
[Optimized for China](https://movie-paradise-1256033731.cos-website.ap-chengdu.myqcloud.com)

## Features

- :iphone: Responsive
- :globe_with_meridians: Internationalization
- :first_quarter_moon: Dark Mode
- :zap: CI/CD

## Status: Beta

Most of the features has been completed, more details to be optimized

## Preview

<p align="center">
<img height="350" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/mobile_home.png" alt="mobile home view"/></p>
<p align="center"><img width="70%" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/pad_home.png" alt="pad home view"/></p>
<p align="center"><img width="100%" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/desktop_home.png" alt="desktop home view"/></p>

## Development

Movie Paradise is managed by [lerna](https://github.com/lerna/lerna). You can bootstrap all the packages including front end and back end via lerna scripts.

```bash
# clone this repo
> git clone https://github.com/wwwenjie/Movie-Paradise.git

# install lerna and basic dependencies
> yarn

# bootstrap all packages
> yarn lerna:bootstrap

# run movie app ui
> cd packages/movie-app-ui && yarn serve

# run movie web
> cd packages/movie-web && yarn serve

# you can also run all the packages using lerna (not recommended)
> yarn lerna:serve-all
```

## Deploying

Movie Paradise will automatically deploy when commits land in master.  
You can also deploy manually by running `yarn lerna:deploy-all`.

### Structure

You can view the detail of structure on each packages' README

## Contributing

Welcome to report bug or add new features. You can know what we are going to do in [Projects](https://github.com/wwwenjie/Movie-Paradise/projects)
