const log = console.log.bind(console)


const e = selector => document.querySelector(selector)
const es = selector => document.querySelectorAll(selector)


const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)


const find = (element, selector) => {
    return element.querySelector(selector)
}
const findAll = (element, selector) => {
    return element.querySelectorAll(selector)
}


const EventType = {
    click: 'click',
    popstate: 'popstate',
    mouseover: 'mouseover',
    mouseout: 'mouseout',
    keyup: 'keyup',
}


const toggleClass = (element, className) => {
    if (element.classList.contains(className)) {
        element.classList.remove(className)
    } else {
        element.classList.add(className)
    }
}


const removeClassAll = (className) => {
    let selector = '.' + className
    let elements = document.querySelectorAll(selector)
    for (let v of elements) {
        let element = v
        element.classList.remove(className)
    }
}


const floor = num => Math.floor(num)
// 生成 1 到 number 之间的随机整数
const random = num => Math.ceil(Math.random() * num)
 

const now = () => {
    let d = new Date()
    let nm = d.getFullYear()
    let yt = d.getMonth() + 1
    let ri = d.getDate()
    let ui = d.getHours()
    let ff = d.getMinutes()
    let mc = d.getSeconds()

    return `${nm}/${yt}/${ri} ${ui}:${ff}:${mc}`
}


const sty = obj => JSON.stringify(obj)
const par = obj => JSON.parse(obj)


/*
    element : div
    action: arr  or eventName(str)
    callback: func
 */
// const bindEvent = (ele, action, callback => {
//     if (Array.isArray(action)) {
//         action.forEach((i) => {
//             ele.addEventListener(i, callback)
//         })
//     } else {
//         ele.addEventListener(action, callback)
//     }
// }


const bindEvent = (ele, eventName, callback) => {
    ele.addEventListener(eventName, callback)
}


// 给所有的元素绑定事件
const bindAll = (elements, eventName, callback) => {
    for (let v of elements) {
        let element = v
        element.addEventListener(eventName, callback)
    }
}

// const addEvents = (eles, action, callback) => {
//     eles = Array.from(eles)
//     eles.forEach((e) => {
//         e.addEventListener(action, callback)
//     })
// }
//
// const unBindEvent = (ele, action, callback) => {
//     if (Array.isArray(action)) {
//         action.forEach((i) => {
//             ele.removeEventListener(i, callback)
//         })
//     } else {
//         ele.removeEventListener(action, callback)
//     }
// }


const todoIdWithIndex = (todoList, id) => {
    let index = -1
    for (let v of todoList) {
        index += 1
        if (v.id = id) {
            break
        }
    }
    return index
}


const nowTime = () => {
    let d = new Date()
    let nm = d.getFullYear()
    let yt = d.getMonth() + 1
    let ri = d.getDate()
    let week = d.getDay()
    let array = ['日', '一', '二', '三', '四', '五', '六']
    let weeks = array[week]
    let time = `${nm}-${yt}-${ri} 星期${weeks}`
    // log('time', time)
    return time
}

const ajax = (request) => {
    /*
    request 是一个 object, 有如下属性
        method, 请求的方法, string
        url, 请求的路径, string
        data, 请求发送的数据, 如果是 GET 方法则没这个值, string
        callback, 响应回调, function
    */
    var r = new XMLHttpRequest()
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