const timeTile = () => {
    let span = e('.time-tite')
    span.innerHTML = nowTime()
}
const init = () => {
    timeTile()
    loadTodos()
}

const bindEdt = () => {
    let container = e('#id-div-container')
    container.addEventListener('blur', event => {
        log('edit blur', event, event.target)
        let target = event.target
        if (target.classList.contains('todo-content')) {
            let cell = target.parentElement
            let todo_content = find(cell, '.todo-content')
            todo_content.setAttribute('contenteditable', 'false')
            // let id = parseInt(cell.dataset.id)
            let id = parseInt(find(cell, 'todoId').innerHTML)
            let content = todo_content.innerHTML
            let form = {
                id,
                content,
            }
            todoUpdate(form)
            // 阻止默认行为的发生, 也就是不插入回车
            event.preventDefault()
        }
    }, true)
}


const bindTheme = () => {
    let theme = e('.theme')
    bindEvent(theme, 'click', () => {
        let color = e('.theme-color')
        color.style.height = '180px'
    })

    let above = e('.shou')
    bindEvent(above, 'click', () => {
        let color = e('.theme-color')
        color.style.height = '0px'
    })
}

const bindBlack = () => {
    let theme = e('#theme-0')
    bindEvent(theme, 'click', () => {
        e('.index').style.background = '#353d40';
        e('.date').style.color = '#353d40';
        e('.list').style.background = 'rgb(64, 72, 75)';
        e('.list').style.color = '#00bff3';
        e('.list-0').style.background = '#2c3032';
        e('.list-0').style.color = '#00bff3';
    })
}
const bindPink = () => {
    let theme = e('#theme-1')
    bindEvent(theme, 'click', () => {
        e('.index').style.background = 'rgba(242, 70, 70, 0.34)';
        e('.date').style.color = 'rgba(242, 70, 70, 0.34)';
        e('.list').style.background = 'rgba(242, 70, 70, 0.35)';
        e('.list').style.color = 'white';
        e('.list-0').style.background = 'rgba(242, 70, 70, 0.65)';
        e('.list-0').style.color = 'white';
    })
}
const bindBlue = () => {
    let theme = e('#theme-2')
    bindEvent(theme, 'click', () => {
        e('.index').style.background = 'rgba(118, 195, 221, 0.73)';
        e('.date').style.color = 'rgba(118, 195, 221, 0.73)';
        e('.list').style.background = 'rgba(118, 195, 221, 0.6)';
        e('.list').style.color = 'white';
        e('.list-0').style.background = 'rgb(100, 194, 226)';
        e('.list-0').style.color = 'white';
    })
}
const bindColor = () => {
    bindBlack()
    bindPink()
    bindBlue()
}

const actions = {
    add_todo(event) {
        log('click new todo')
        let input = e('#id-input-add')
        let content = input.value
        let form = {
            content,
        }
        todoAdd(form)
        input.value = ''
    },
    delete_todo(event) {
        // let cell = event.target.closest('.todo-cell')
        let cell = event.target.parentElement
        // log('cell', cell)
        // let id = parseInt(cell.dataset.id)
        let id = parseInt(find(cell, 'todoId').innerHTML)
        cell.remove()
        // log('id', id, typeof id)
        let form = {
            id,
        }
        log('form', form)
        todoDelete(form)
    },
    finished_todo(event) {
        let cell = event.target.closest('.todo-cell')
        // let id = parseInt(cell.dataset.id)
        let id = parseInt(find(cell, 'todoId').innerHTML)
        let form = {
            id,
        }
        // log('form', form)
        todoFinished(form)
    },
    update_todo(event) {
        let target = event.target
        // let cell = target.closest('.todo-cell')
        // let id = parseInt(cell.dataset.id)
        target.setAttribute('contenteditable', 'true')
        target.focus()
    }
}

const bindAction = () => {
    let body = e('body')
    bindEvent(body, 'click', event => {
        // log('target', event.target)
        let action = event.target.dataset.action
        log('action', action)
        actions[action] && actions[action](event)
    })

}

const bindEvents = () => {
    // // add delete finish edit
    // bindAdd()
    // bindDelFin()
    bindEdt()
    bindAction()
    // theme
    bindTheme()
    // color
    bindColor()
}


const __main = () => {
    init()
    bindEvents()
}
__main()