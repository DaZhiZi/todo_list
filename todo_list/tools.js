const par = str => JSON.parse(str)

const sty = obj => JSON.stringify(obj)

const loadTodos = function (filePath) {
    let fs = require('fs')
    // 确保文件有内容, 这里就不用处理文件不存在或者内容错误的情况了
    // 注意, 一般都是这样不处理的
    let content = fs.readFileSync(filePath, 'utf8')
    let todos = par(content)
    return todos
}


const log = console.log.bind(console)


const formatTime = () => {
    let d = new Date()
    let year = d.getFullYear()
    let month = d.getMonth() + 1
    let date = d.getDate()
    let hours = d.getHours()
    let minutes = d.getMinutes()
    if (hours < 10) {
        hours = `0${hours}`
    }
    if (minutes < 10) {
        minutes = `0${minutes}`
    }
    let time = `${year}-${month}-${date} ${hours}:${minutes}`
    return time
}

// 生成一个 unix 时间, unix 时间是什么,
// this.created_time = Math.floor(new Date() / 1000)


// let dataFile = 'todo.json'

// const loadTodosFromFile = function( callback) {
//     let fs = require('fs')
//     fs.readFile(dataFile, 'utf8', function(err, data){
//         if (err != null) {
//             // 出错了
//             log('出错了')
//             todos = []
//             callback()
//         } else {
//             todos = JSON.parse(data)
//             callback()
//         }
//     })
// }
// const writeTodosToFile = function() {
//     let s = JSON.stringify(todos)
//     let fs = require('fs')
//     fs.writeFile(dataFile, s, (err) => {
//         if (err) {
//             console.log(err)
//         } else {
//             console.log('保存成功')
//         }
//     })
// }

const sendHtml = (path, response) => {
    let fs = require('fs')
    let options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function (err, data) {
        log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}


module.exports = {
    par,
    loadTodos,
    log,
    formatTime,
    sty,
    sendHtml,
}