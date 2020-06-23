# 电影天堂

![](https://github.com/wwwenjie/Movie-Paradise/workflows/deploy/badge.svg)
[![Netlify Status](https://api.netlify.com/api/v1/badges/3261a25a-796e-4e36-bbba-0a3db3bf37b4/deploy-status)](https://app.netlify.com/sites/movieparadise/deploys)

> 该项目仅用于学习和交流，不用于商业用途。数据来自第三方网站。

### 介绍

电影天堂是由 Vue 和 Vuetify 构建的 web app
它可以预览电影并提供下载哈希，在线观看链接，~~实时观看功能~~

[演示网站](https://movieparadise.netlify.app)  
[中国优化](https://movie-paradise-1256033731.cos-website.ap-chengdu.myqcloud.com)

### 特性

- :iphone: 响应式
- :globe_with_meridians: 国际化
- :first_quarter_moon: 暗黑模式
- :zap: Serverless 部署

### 状态: Beta

大多数功能已经完成，更多细节有待优化

### 预览

<p align="center">
<img height="350" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/mobile_home.png" alt="mobile home view"/></p>
<p align="center"><img width="70%" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/pad_home.png" alt="pad home view"/></p>
<p align="center"><img width="100%" src="https://movie-paradise.oss-ap-southeast-1.aliyuncs.com/preview/desktop_home.png" alt="desktop home view"/></p>

### 部署

当 commit 提交至 master 分支时，将通过 [Netlify](https://www.netlify.com/) 自动部署此项目  
通过 Serverless 轻松部署该项目，只需运行`yarn deploy`

### 开发（后端）

- [后端仓库](https://github.com/wwwenjie/movie-paradise-koa)
- [Swagger API](https://api.movie.jinwenjie.me/swagger-html)
- (不推荐) [Mock API](http://rap2.jinwenjie.me:3000/repository/editor?id=1) 基于 [Rap2](https://github.com/thx/rap2-delos)

### 开发（前端）

```bash
# 克隆此项目
> git clone https://github.com/wwwenjie/Movie-Paradise.git

# 安装依赖
> yarn

# 运行
> yarn serve
```

#### 项目结构

```
main.js / 初始化脚本

config.js / 配置

App.vue / 根组件

views / 独立页面

utils / 工具

store / 状态管理

sass / 自定义 vuetify sass

router / 路由管理

plugins / 第三方插件

mixins / 混入，常用的数据和方法等

locales / 国际化资源

directives / 指令

components / 页面使用的组件

assets / 资源

api / api
```

### 贡献

欢迎报告错误或添加新功能。您可以在 [Projects](https://github.com/wwwenjie/Movie-Paradise/projects) 中查看我们将要做什么
