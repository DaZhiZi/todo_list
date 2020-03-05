const { log, loadTodos, formatTime } = require('../tools')

let fs = require('fs')
let file_path = './todos.json'

const ModelTodo = function(form) {
    this.id = form.id
    // this.author = form.author || ''
    this.content = form.content || ''
    this.time = form.time || formatTime()
    this.done = form.done || false
}


let b = {
    data: loadTodos(file_path)
}

b.all = function() {
    let todos = this.data
    return todos
}

b.add = function(form) {
    let m = new ModelTodo(form)
    log('add todo', form, m)
    // 设置新数据的 id
    let d = this.data[this.data.length-1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    this.data.push(m) // push todo
    this.save(this.data) //  save  todo
    return m
}
b.delete = function(todo_id) {
    let id = todo_id
    let todos = this.data
    let new_todos = []
    for (let v of todos) {
        let todo = v
        if (todo.id != id) {  // 删掉这个 todo splice  fliter
            new_todos.push(todo)
        }
    }
    // log('delete todo', new_todos)
    this.save(new_todos)
}

b.save = function(data) {
    let s = JSON.stringify(data)   // this.data   todos_all
    fs.writeFile(file_path, s, (err) => {
        if (err) {
            log('err', err)
        } else {
            log('保存成功')
        }
    })
}
b.finished = function(todo_id) {
    let id = todo_id
    let todos = this.data
    let new_todos = []
    for (let v of todos) {
        let todo = v
        if (todo.id != id) {  // 删掉这个 todo splice  fliter
            new_todos.push(todo)
        } else {
            todo.done = !todo.done
            new_todos.push(todo)
        }
    }
    // log('finined todo', new_todos)
    this.save(new_todos)
}
b.update = function(form) {
    let id = form.id
    let content = form.content
    let todos = this.data
    let new_todos = []
    for (let v of todos) {
        let todo = v
        if (todo.id != id) {  // 删掉这个 todo splice  fliter
            new_todos.push(todo)
        } else {
            todo.content = content
            new_todos.push(todo)
        }
    }
    // log('update todo', new_todos)
    this.save(new_todos)
}
// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了(具体看使用方法)
module.exports = b
