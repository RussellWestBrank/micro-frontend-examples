// cross-site/main-server.js
// 主应用服务代码
import path from "path";
import express from "express";
import ngrok from "ngrok";
import ejs from "ejs";

import config from "../config.js";
const { port, host, __dirname } = config;
const app = express();

// try{
//   const url = await ngrok.connect();
//   console.log(`Ngrok tunnel created at: ${url}`);
// }catch (error) {
//   console.error('Failed to create ngrok tunnel:', error);
// }

let main, micro;

// 内网穿透（主应用反向代理）
try {
  main = await ngrok.connect({
    proto: "http",
    // authtoken: 'your-ngrok-authtoken-here',
    addr: `http://${host}:${port.main}`,
    bind_tls: true,
  });

  console.log(`Ngrok tunnel created at: ${main}`);
} catch (error) {
  console.error("main Failed to create ngrok tunnel:", error);
}

// 内网穿透（微应用反向代理）
try {
  micro = await ngrok.connect({
    proto: "http",
    // authtoken: 'your-ngrok-authtoken-here',
    addr: `http://${host}:${port.micro}`,
    bind_tls: true,
  });

  console.log(`Ngrok tunnel created at: ${micro}`);
} catch (error) {
  console.error("micro Failed to create ngrok tunnel:", error);
}

app.engine(".html", ejs.__express);
app.set("views", path.join(__dirname, "public"));
app.set("view engine", "html");

app.get("/", function (req, res) {
  res.cookie("main-app", "true");
  res.render("main", {
    micro,
  });
});

// 启动 Node 服务
app.listen(port.main, host);
console.log(`server start at http://${host}:${port.main}/`);
