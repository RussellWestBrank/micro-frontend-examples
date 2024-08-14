import express from "express";
import morgan from "morgan";
import path from 'path'
import config from "./config.js";
const app = express();
const { port, host } = config

// 打印请求日志
app.use(morgan("dev"));

//创建一个静态文件服务
app.use(express.static(path.join("public", "main")));

// 创建子应用导航
app.post("/api/micro-apps", (req, res) => {
  // 这里可以是管理后台新增菜单后存储到数据库的数据
  // 从而可以通过管理后台动态配置微应用的菜单
  res.json([
    {
      name: "micro1",
      id: "micro1",
      script: `http://${host}:${port.micro}/micro1.js`,
      style: `http://${host}:${port.micro}/micro1.css`,
      mount: "micro1_mount",
      // 挂载到 window 上的启动函数 window.micro1_mount
      // 挂载到 window 上的启动函数 window.micro1_unmount
      unmount: "micro1_unmount",
      prefetch: true,
    },
    {
      name: "micro2",
      id: "micro2",
      script: `http://${host}:${port.micro}/micro2.js`,
      style: `http://${host}:${port.micro}/micro2.css`,
      mount: "micro2_mount",
      unmount: "micro2_unmount",
      prefetch: true,
    },
  ]);
});

// 启动 Node 服务
app.listen(port.main, host);
console.log(`server start at http://${host}:${port.main}/`);
