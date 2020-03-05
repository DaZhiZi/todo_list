const {log, sty, sendHtml,} = require('./tools')

// const todo = require('./model/todo')

const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.json())

// 配置静态文件目录
app.use(express.static('static'))


const registerRoutes = (app, routes) => {
    for (let v of routes) {
        let route = v
        app[route.method](route.path, route.def)
    }
}
const importRoutes = (app, routeModules) => {
    for (let v of routeModules) {
        let routeModule = v
        let route = require(routeModule)
        registerRoutes(app, route.routes)
    }
}

const routeModules = [
    './route/index',
    './route/todo',
]
importRoutes(app, routeModules)
// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果你监听 80 端口的话，浏览器就不需要输入端口了
// 但是 1024 以下的端口是系统保留端口，需要管理员权限才能使用
const server = app.listen(8081, () => {
    let host = server.address().address
    let port = server.address().port
    let msg = `应用实例，访问地址为 http://${host}:${port}`
    log('msg', msg)
})
