###  todo 便签

> 明日的程序员是未来的魔法师

### 前端思路

- todolist  three times

    - 载入 html

        - 输入框

        - btn

        - 头像

        - 主题背景

            - click color 自动换肤

    - todolist

        - add

            - click submit btn

        - delete

             - click delete btn

        - update

             - focus 可以直接修改

        - load todos

            - submit 直接添加 到对应容器

        - complete

            - toggle

### 后端端思路

- model

    - todos

        - todos_all

            - todos    todos.json 默认这个文件

                - read_todos_from_file



- control

      - todos_add

            - todo

                - complete

                - content

                - created_time

                - id

        - todos_delete

            - find_id

                - remove_todo(id)

        - todos_save

        - todos_update 最后写


- view

    - ajax todo_api

        - all load

        - add

        - delete

        - complete

        - update

