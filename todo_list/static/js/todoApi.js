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
            callback: callback,
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
        this.get('/all', callback)  // get 请求
    }
}

let todoApi = Todo.new()

// todo api
const templateTodo = (todo) => {
    let {id, content, time, done} = todo
    let status = ''
    let gou = 'fa-circle-thin'
    if (done) {
        status = 'done'
        gou = 'fa-check-circle-o'
    }
    log('id', id)
    let t = `
    <div class='todo-cell ${status} data-id='${id}'>
        <todoId>${id}</todoId>
        <time class='thingTime'> ${time}</time>
        <span class='todo-done todo-check fa ${gou}' data-action="finished_todo"></span>
        <span class='todo-content' contenteditable='false' data-action="update_todo">${content}</span>
        <i class="todo-delete fa fa-trash" aria-hidden="true" data-action="delete_todo"></i>
    </div>
    `
    return t
}
const insertTodo = (todo) => {
    let container = e('#id-div-container')
    let t = templateTodo(todo)
    appendHtml(container, t)
}

const clearTodos = () => {
    let container = e('#id-div-container')
    container.innerHTML = ''
}

const loadTodos = () => {
    clearTodos() // 清空所有 todo
    todoApi.all((response) => {
        let todos = JSON.parse(response)
        for (let todo of todos) {
            insertTodo(todo)
        }
    })
}

const todoAdd = (form) => {
    todoApi.add(form, (r) => {
        let add_msg = r
        log('add_msg', add_msg)
        loadTodos()
    })

}

const todoDelete = (form) => {
    // log('form', form)
    // remove
    todoApi.remove(form, (r) => {
        loadTodos()
    })

}

const todoFinished = (form) => {
    // finished
    todoApi.finished(form, (r) => {
        let add_msg = r
        log('finished_msg', add_msg)
        loadTodos()
    })

}

const todoUpdate = (form) => {
    // finished
    todoApi.update(form, (r) => {
        let add_msg = r
        log('update_msg', add_msg)
        loadTodos()
    })

}