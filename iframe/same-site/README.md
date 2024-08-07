# 同站 & 跨域 & 父子域

未进行host配置，端口号不同，主子应用已经跨域
cookie可以共享

为验证host不同时，cookie是否可以共享，进行如下host配置：
本机地址 example.com
本机地址 ziyi.example.com

本地配置

启动应用

``` bash
npm run same-site
```

结论
在 host 不同的情况下，主应用的 main-app 字段不会被子应用进行覆盖，主应用和子应用无法共享 Cookie。但是如果主应用和子应用同站，那么可以通过设置 Domain 使得两个应用可以共享彼此的 Cookie