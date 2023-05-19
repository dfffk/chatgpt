var createError = require("http-errors");
var express = require("express");
const axios = require("axios");
var logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

//创建一个项目服务器对象
let app = express();

app.all("*", function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With"
  );
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By", " 3.2.1");
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == "OPTIONS") {
    res.send(200);
    console.log("预检成功");
  } else {
    next();
  }
});

//对项目的日志、cookie的一些默认配置
app.use(logger("dev")); //采用日志模式为开发模式
app.use(express.json()); //自动对前端传来的数据进行json处理
app.use(express.urlencoded({ extended: false })); //对url进行解码
// app.use(cookieParser()); //解析cookie
// app.use(express.static(path.join(__dirname, "public"))); //配置Express项目的前端资源文件夹，配置了之后就可以通过服务器的地址来访问public文件夹下的前端资源
// app.use(express.static(path.join(__dirname, "dist"))); //配置Express项目的前端资源文件夹，配置了之后就可以通过服务器的地址来访问public文件夹下的前端资源

const API_KEY = process.env.API_KEY;
const API_KEY_PAINTINMG = process.env.API_KEY_PAINTINMG;
//聊天功能
app.post("/completions", async (req, res) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    data: {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      max_tokens: 1000,
      temperature: 1.5,
    },
    url: "你自己的链接",
  };

  try {
    const response = await axios(options);
    const data = response.data;
    console.log(data);
    res.send({ data });
  } catch (error) {
    console.log("error", error);
  }
});

//绘画功能
app.post("/images", async (req, res) => {
  try {
    const response = await axios({
      method: "post",
      url: "你自己的链接",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY_PAINTINMG}`,
      },
      data: {
        prompt: "A cute baby sea otter",
        n: 1,
        size: "512x512",
        temperature: 1,
        model: "image-alpha-001",
      },
    });
    res.send(response.data.data);
    console.log(response);
  } catch (err) {
    console.error(err);
  }
});

app.use(cors());

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(3333, () => {
  console.log("服务器已启动,3333");
});
