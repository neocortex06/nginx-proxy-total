const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();

const PORT = 3000;
const HOST = "localhost";
const API_SERVICE_URL = "http://localhost:3030";
//const API_SERVICE_URL = "https://jsonplaceholder.typicode.com";

app.use(morgan("dev"));
app.get("/info", (req, res, next) => {
    res.send("This is a proxy service");
});
// Authorization
/*app.use('/', (req, res, next) => {
    if (req.headers.authorization) {
        next();
    }else{
        res.sendStatus(403);
    }
});*/
/* app.use("/json_placeholder", createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    },
}));*/
app.use("/auth", createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/auth`]: '',
    }
}));

app.listen(PORT, HOST, () => {
    console.log(`Proxy starting at ${HOST}:${PORT}`);
});
