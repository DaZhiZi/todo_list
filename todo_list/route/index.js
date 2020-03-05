const {log, sty, sendHtml,} = require('../tools')

const sendResponse = (res, data) => {
    let r = sty(data)
    res.send(r)
}

const index =  {
    path: '/',
    method: 'get',
    def:  (request, response) => {
        let path = 'index.html'
        sendHtml(path, response)
    }
}

const routes = [
    index,
]

module.exports.routes = routes