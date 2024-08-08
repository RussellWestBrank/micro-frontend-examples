# web component ajax 示例

目的：
模拟主子应用在跨站的情况下，子应用如何通过ajax设置cookie，携带cookie

重点：Nginx 反向代理，mkcert生成CA证书

nginx配置
```bash
 # HTTPS server
    # 使用 HTTPS 协议，代理到主应用
    server {
       listen       4001 ssl;
       server_name  localhost;

       ssl_certificate      /Users/wangqingqiang/Desktop/study/micro-frontend-examples/russ.com+4.pem;
       ssl_certificate_key  /Users/wangqingqiang/Desktop/study/micro-frontend-examples/russ.com+4-key.pem;
       
       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;

       ssl_ciphers  HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers  on;

       location / {
        #    root   html;
        #    index  index.html index.htm;
        proxy_pass 'http://10.23.100.168:4000';
       }
    }

    # HTTPS server
    # 使用 HTTPS 协议，代理子应用
    server {
       listen       3001 ssl;
       server_name  localhost;

       ssl_certificate      /Users/wangqingqiang/Desktop/study/micro-frontend-examples/web-component-cookie/russ.com+4.pem;
       ssl_certificate_key  /Users/wangqingqiang/Desktop/study/micro-frontend-examples/web-component-cookie/russ.com+4-key.pem;
       
       ssl_session_cache    shared:SSL:1m;
       ssl_session_timeout  5m;

       ssl_ciphers  HIGH:!aNULL:!MD5;
       ssl_prefer_server_ciphers  on;

       location / {
        #    root   html;
        #    index  index.html index.htm;
        proxy_pass 'http://10.23.100.168:3000';
       }
    }
```

host配置
```bash
127.0.0.1  russ.com
```

``` bash
# 安装依赖
npm i
# 启动主应用服务、微应用服务
npm run dev
```

启动之后访问主应用地址 https://russ.com:4001