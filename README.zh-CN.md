# 电影天堂

![](https://github.com/wwwenjie/Movie-Paradise/workflows/deploy/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3261a25a-796e-4e36-bbba-0a3db3bf37b4/deploy-status)](https://app.netlify.com/sites/movieparadise/deploys)

> 该项目仅用于学习和交流，不用于商业用途。数据来自第三方网站。

## 介绍

电影天堂是由 Vue，React(WIP) 和 Koa 构建的 web app  
它可以预览电影并提供下载哈希，在线观看链接，~~实时观看功能~~

[演示网站](https://movieparadise.netlify.app)  
[中国优化](https://movie-paradise-1256033731.cos-website.ap-chengdu.myqcloud.com)

## 特性

- :iphone: 响应式
- :globe_with_meridians: 国际化
- :first_quarter_moon: 夜间模式
- :zap: CI/CD

## 状态: Beta

大多数功能已经完成，更多细节有待优化

## 预览

<p align="center">
<img height="350" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/mobile_home.png" alt="mobile home view"/></p>
<p align="center"><img width="70%" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/pad_home.png" alt="pad home view"/></p>
<p align="center"><img width="100%" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/desktop_home.png" alt="desktop home view"/></p>

## 开发

电影天堂通过 [lerna](https://github.com/lerna/lerna) 管理，您可以通过 lerna 脚本初始化包含前后端的所有包

```bash
# 克隆此项目
> git clone https://github.com/wwwenjie/Movie-Paradise.git

# 按照 lerna 和基础依赖
> yarn

# 按照所有包的依赖
> yarn lerna:bootstrap

# 运行 movie app ui
> cd packages/movie-app-ui && yarn serve

# 运行 movie web
> cd packages/movie-web && yarn serve

# 您也可以通过 learn 运行所有包（不推荐）
> yarn lerna:serve-all
```

## 部署

当有 commits 至主分支时，电影天堂会自动部署
您也可以运行 `yarn lerna:deploy-all` 来手动部署

### 项目结构

您可以至每个包的 README 查看详细的项目结构

## 贡献

欢迎报告错误或添加新功能。您可以在 [Projects](https://github.com/wwwenjie/Movie-Paradise/projects) 中查看我们将要做什么
