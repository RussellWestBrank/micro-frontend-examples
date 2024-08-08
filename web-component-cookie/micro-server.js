import express from "express";
import morgan from "morgan";
import path from "path";
import cookieParser from "cookie-parser";
import config from "./config.js";
const app = express();
const { port, host } = config;

app.use(morgan("dev"));

// cookie 中间件
app.use(cookieParser());

// 设置支持跨域请求头
// 示例设置了所有请求的跨域配置，也可以对单个请求进行跨域设置
app.use((req, res, next) => {
  // 跨域请求中涉及到 Cookie 信息传递时值不能为 *，必须是具体的主应用地址
  // 这里的 ziyi.com 使用 iHosts 映射到本地 IP 地址
  res.header("Access-Control-Allow-Origin", `https://russ.com:4001`);
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Allow", "GET, POST, OPTIONS");
  // 允许跨域请求时携带 Cookie
  // https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Access-Control-Allow-Credentials
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

app.use(
  express.static(path.join("public", "micro"), {
    etag: true,
    lastModified: true,
  })
);

app.post("/cors", function (req, res) {

  // 打印子应用的 Cookie 携带情况
  console.log("micro cookies: ", req.cookies);
  const cookieOptions = { sameSite: "none", secure: true };

  // 设置一个响应的 Cookie 数据
  res.cookie("micro-app", "true",cookieOptions);
  res.json({
    hello: "true",
  });
});

app.listen(port.micro, host);
console.log(`server start at http://${host}:${port.micro}/`);