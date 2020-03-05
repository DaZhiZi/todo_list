const {log, sty, sendHtml,} = require('../tools')
const todo = require('../model/todo')

const sendResponse = (res, data) => {
    let r = sty(data)
    res.send(r)
}

const all = {
    path: '/api/todo/all',
    method: 'get',
    def:  (request, response) => {
        let todos = todo.all()
        sendResponse(response, todos)
    }
}

const add = {
    path: '/api/todo/add',
    method: 'post',
    def:  (request, response) => {
        let form = request.body
        // log("form", form, typeof  form)  // form type is obj
        let t = todo.add(form)
        sendResponse(response, t)
    }
}

const todo_delete = {
    path: '/api/todo/delete',
    method: 'post',
    def:  (request, response) => {
        let form = request.body // form is todo_id
        log("form", form, typeof form)  // form type is obj
        let t = todo.delete(form.id)
        sendResponse(response, t)
    }
}

const finished = {
    path: '/api/todo/finished',
    method: 'post',
    def:  (request, response) => {
        let form = request.body // form is todo_id
        log("form", form, typeof form)  // form type is obj
        let t = todo.finished(form.id)
        sendResponse(response, t)
    }
}

const update = {
    path: '/api/todo/update',
    method: 'post',
    def:  (request, response) => {
        let form = request.body // form is todo_id
        log("form", form, typeof form)  // form type is obj
        let t = todo.update(form)
        sendResponse(response, t)
    }
}
// 路由字典
// key 是路由(路由就是 path)
// value 是路由处理函数(就是响应)
// const route_dict = {
//     '/api/blog/all': all,
//     '/api/todo/add': add,
// }

const routes = [
    all,
    add,
    todo_delete,
    update,
    finished,
]

module.exports.routes = routes