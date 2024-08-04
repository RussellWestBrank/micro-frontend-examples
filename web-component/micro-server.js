import express from 'express';
import morgan from "morgan";
import path from 'path';
import config from './config.js';
const app = express()

const { port, host } = config

// 打印请求日志
app.use(morgan('dev'))

app.use(express.static(path.join("public", "micro")));

app.listen(port.micro, host, () => {
    console.log(`Server is running on http://${host}:${port.micro}`);
})