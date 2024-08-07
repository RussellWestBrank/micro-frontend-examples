# 跨站 & 跨域

使用ngrok原因
子应用默认无法携带 Cookie（防止 CSRF 攻击），需要使用 HTTPS 协议并设置服务端 Cookie 的 SameSite 和 Secure 设置才行

使用ngrok前提条件
1. 关闭网络防火墙
2. 关闭翻墙

``` bash
npm run corss-site
```

结论
子应用无法和主应用形成 Cookie 共享