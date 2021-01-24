import React, {useState} from "react"
import './App.css'
import {v1} from "uuid"
import TodoList from "./TodoList"
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type FilterValuesType = "all" | "active" | "completed"

type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    // BLL
    const todoListID1: string = v1()
    const todoListID2: string = v1()
    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListID1, title: "What to learn", filter: "all"},
        {id: todoListID2, title: "What to buy", filter: "all"}
    ])
    const [tasks, setTasks] = useState<TaskStateType>({
            [todoListID1]: [
                {id: v1(), title: "Piper at the gate of Down", isDone: true},
                {id: v1(), title: "Wish you were here", isDone: true},
                {id: v1(), title: "Dark side of the moon", isDone: false}
            ],
            [todoListID2]: [
                {id: v1(), title: "Animals", isDone: true},
                {id: v1(), title: "The Wall", isDone: false},
                {id: v1(), title: "Division Bell", isDone: true}
            ]
        }
    )

    //const [filter, setFilter] = useState<FilterValuesType>("all")

    function removeTask(taskID: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        tasks[todoListID] = todoListTasks.filter(task => task.id !== taskID)
        setTasks({...tasks})

        // const newTasks = tasks.filter(task => task.id !== taskID)
        // setTasks(newTasks) или так
        //setTasks(tasks.filter(task => task.id !== taskID))
    }

    function changeFilter(filterValue: FilterValuesType, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if (todoList) {
            todoList.filter = filterValue
            setTodoLists([...todoLists])
        }
    }

    function addTask(newTaskTitle: string, todoListID: string) {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        }
        tasks[todoListID] = [newTask, ...tasks[todoListID]]
        setTasks({...tasks})
    }

    function changeStatus(taskID: string, todoListID: string, isDone: boolean) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }

    function changeTaskTitle(taskID: string, title: string, todoListID: string) {
        const todoListTasks = tasks[todoListID]
        const task = todoListTasks.find(t => t.id === taskID)
        if (task) {
            task.title = title
            setTasks({...tasks})
        }
    }

    function removeTodoList(todoListID: string) {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
        delete tasks[todoListID]
    }

    function addTodoList(todoListTitle: string) {
        const todoListId = v1()
        const newTodoList: TodoListType = {
            id: todoListId,
            title: todoListTitle,
            filter: "all"
        }
        setTodoLists([...todoLists, newTodoList])
        setTasks({
            ...tasks,
            [todoListId]: []
        })
    }

    function changeTodoListTitle(title: string, todoListID: string) {
        const todoList = todoLists.find(tl => tl.id === todoListID)
        if(todoList) {
            todoList.title = title
            setTodoLists([...todoLists])
        }
    }

    // UI
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            {
                todoLists.map(tl => {
                    let tasksForTodoList = tasks[tl.id]
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone)
                    }
                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone)
                    }
                    return (
                        <TodoList
                            key={tl.id}
                            id={tl.id}
                            filter={tl.filter}
                            title={tl.title}
                            tasks={tasksForTodoList}
                            addTask={addTask}
                            removeTask={removeTask}
                            removeTodoList={removeTodoList}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            changeTaskTitle={changeTaskTitle}
                            changeTodoListTitle={changeTodoListTitle}
                        />
                    )
                })
            }

        </div>
    )
}

export default App
