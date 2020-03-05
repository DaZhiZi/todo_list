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
// const sendResponse = (res, data) => {
//     let r = sty(data)
//     res.send(r)
// }

// app.get('/', (request, response) => {
//     let path = 'index.html'
//     sendHtml(path, response)
// })

// app.get('/api/todo/all', (request, response) => {
//     // 从文件中 读取所有的 todos 再返回给浏览器
//     let todos = todo.all()
//     sendResponse(response, todos)
// })
//
// app.post('/api/todo/add', (request, response) => {
//     let form = request.body
//     // log("form", form, typeof  form)  // form type is obj
//     let t = todo.add(form)
//     sendResponse(response, t)
// })
//
// app.post('/api/todo/delete', (request, response) => {
//     let form = request.body // form is todo_id
//     log("form", form, typeof form)  // form type is obj
//     let t = todo.delete(form.id)
//     sendResponse(response, t)
// })
//
// app.post('/api/todo/finished', (request, response) => {
//     let form = request.body // form is todo_id
//     log("form", form, typeof form)  // form type is obj
//     let t = todo.finished(form.id)
//     sendResponse(response, t)
// })
//
// app.post('/api/todo/update', (request, response) => {
//     let form = request.body // form is todo_id
//     log("form", form, typeof form)  // form type is obj
//     let t = todo.update(form)
//     sendResponse(response, t)
// })

class Todo {
    constructor() {
        this.base_url = '/api/todo'
    }
    static new() {
        return new this()
    }
    ajax(request) {
        /*
        request 是一个 object, 有如下属性
        method, 请求的方法, string
        url, 请求的路径, string
        data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        callback, 响应回调, function
        */
        let r = new XMLHttpRequest()
        r.open(request.method, request.url, true)
        if (request.contentType !== undefined) {
            r.setRequestHeader('Content-Type', request.contentType)
        }
        r.onreadystatechange = function (event) {
            if (r.readyState === 4) {
                log('r.response', r.response)
                request.callback(r.response)
            }
        }
        if (request.method === 'GET') {
            r.send()
        } else {
            r.send(request.data)
        }
    }
    post(path, form, callback) {
        let data = JSON.stringify(form)
        let url = this.base_url + path
        let request = {
            method: 'POST',
            url: url,
            data: data,
            contentType: 'application/json',
            callback: callback,
        }
        this.ajax(request)
    }
    get(path, callback) {
        let url = this.base_url + path
        let request = {
            method: 'GET',
            url: url,
            contentType: 'application/json',
            callback:  callback,
        }
        this.ajax(request)
    }
    update(form, callback) { // {id : 1, content: 'xxx'}
        this.post('/update', form, callback)
    }
    finished(form, callback) { // {id : 1}
        this.post('/finished', form, callback)
    }
    remove(form, callback) { // {id : 1}
        this.post('/delete', form, callback)
    }
    add(form, callback) { // {content: 'xxx'}
        this.post('/add', form, callback)
    }
    all(callback) {
        this.get('/add', callback)  // get 请求
    }
}

let todoApi =  Todo.new()

// const todoAll = () => {
//     let request = {
//         method: 'GET',
//         url: '/api/todo/all',
//         contentType: 'application/json',
//         callback: function (response) {
//             // 不考虑错误情况(断网/服务器返回错误等等)
//             // log('响应', response)
//             let todos = JSON.parse(response)
//             window.todos = todos
//             log("todos", todos)
//             // insertTodoAll(todos)
//         }
//     }
//     ajax(request)
// }

// const todoNew = (form) => {
//     // let form = {
//     //     content: "测试内容",
//     // }
//     let data = JSON.stringify(form)
//     let request = {
//         method: 'POST',
//         url: '/api/todo/add',
//         data: data,
//         contentType: 'application/json',
//         callback: function (response) {
//             // 不考虑错误情况(断网/服务器返回错误等等)
//             // log('响应', response)
//             let res = JSON.parse(response)
//         }
//     }
//     ajax(request)
// }

// const todoDelete = (form) => { // form  必须含有 id
//     // let form = {
//     //     id: 1,
//     // }
//     let data = JSON.stringify(form)
//     let request = {
//         method: 'POST',
//         url: '/api/todo/delete',
//         data: data,
//         contentType: 'application/json',
//         callback: function (response) {
//             // 不考虑错误情况(断网/服务器返回错误等等)
//             // log('响应', response)
//             let res = JSON.parse(response)
//         }
//     }
//     ajax(request)
// }

// const todoFinished = (form) => { // form  必须含有 id
//     // let form = {
//     //     id: 1,
//     // }
//     let data = JSON.stringify(form)
//     let request = {
//         method: 'POST',
//         url: '/api/todo/finished',
//         data: data,
//         contentType: 'application/json',
//         callback: function (response) {
//             // 不考虑错误情况(断网/服务器返回错误等等)
//             // log('响应', response)
//             let res = JSON.parse(response)
//         }
//     }
//     ajax(request)
// }

// const todoUpdate = (form) => { // form  必须含有 id
//     // let form = {
//     //     id: 1,
//     //     content: '测试函数 2 update'
//     // }
//     let data = JSON.stringify(form)
//     let request = {
//         method: 'POST',
//         url: '/api/todo/update',
//         data: data,
//         contentType: 'application/json',
//         callback: function (response) {
//             // 不考虑错误情况(断网/服务器返回错误等等)
//             // log('响应', response)
//             let res = JSON.parse(response)
//         }
//     }
//     ajax(request)
// }

// const Todo = () => {}
// Todo.prototype.post = () => {}


const test_todoApi = () => {
    // all
    todoApi.all((response) => {
        let todos = JSON.parse(response)
        log('todos', todos)
    })
    // add
    let todo = {
        'content': 'add todo',
    }
    todoApi.add(todo, (r) => {
        let add_msg = JSON.parse(r)
        log('add_msg', add_msg)
    })
    // remove
    todoApi.remove({id: 1}, (r) => {
        let add_msg = JSON.parse(r)
        log('remove_msg', add_msg)
    })
    // finished
    todoApi.finished({id: 2}, (r) => {
        let add_msg = JSON.parse(r)
        log('finished_msg', add_msg)
    })
    // update
    let update_todo = {
        id: 2,
        content: '修 xxxxxxxxxxxx',
    }
    todoApi.update(update_todo, (r) => {
        let add_msg = JSON.parse(r)
        log('update_msg', add_msg)
    })

    todoApi.all((response) => {
        let todos = JSON.parse(response)
        log('todos', todos)
    })
}
// test_todoApi()   // 测试成功