import React, {ChangeEvent, KeyboardEvent, useState} from "react"
import {FilterValuesType, TaskType} from "./App"
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

type TodoListPropsType = {
    id: string
    title: string
    filter: FilterValuesType
    tasks: Array<TaskType>
    removeTodoList: (todoListID: string) => void
    addTask: (title: string, todoListID: string) => void
    changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
    removeTask: (taskID: string, todoListID: string) => void
    changeStatus: (taskID: string, todoListID: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string, todoListID: string) => void
    changeTodoListTitle: (title: string, todoListID: string) => void
}

function TodoList(props: TodoListPropsType) {
    const addTask = (title: string) => {
        props.addTask(title, props.id)
    }
    const onAllClickHandler = () => {
        props.changeFilter("all", props.id)
    }
    const onActiveClickHandler = () => {
        props.changeFilter("active", props.id)
    }
    const onCompletedClickHandler = () => {
        props.changeFilter("completed", props.id)
    }
    const removeTodoList = () => props.removeTodoList(props.id)
    const changeTodoListTitle = (title: string) => {
        props.changeTodoListTitle(title, props.id)
    }
    return (
        <div>
            <h3 style={{textAlign: "center"}}>
                <EditableSpan
                    title={props.title}
                    changeTitle={changeTodoListTitle}
                />
                <IconButton onClick={removeTodoList}>
                    <Delete />
                </IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div>
                <Button
                    style={{marginRight: "3px"}}
                    size={"small"}
                    variant={props.filter === "all" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onAllClickHandler}>All
                </Button>
                <Button
                    style={{marginRight: "3px"}}

                    size={"small"}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    color={"primary"}
                    onClick={onActiveClickHandler}>Active
                </Button>
                <Button
                    size={"small"}
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    color={"primary"}
                    /*className={props.filter === "completed" ? "active-filter" : ""}*/
                    onClick={onCompletedClickHandler}>Completed
                </Button>
            </div>
            <ul style={{listStyle: "none", padding: "0"}}>
                {
                    props.tasks.map(task => {
                        const removeTask = () => {
                            props.removeTask(task.id, props.id)
                        }
                        const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(task.id, props.id, e.currentTarget.checked)
                        }
                        const changeTaskTitle = (title: string) => {
                            props.changeTaskTitle(task.id, title, props.id)
                        }
                        return (
                            <li key={task.id} className={task.isDone ? "is-done" : ""}>
                                <Checkbox
                                    color={"secondary"}
                                    onChange={changeStatus}
                                    checked={task.isDone}
                                />
                                <EditableSpan changeTitle={changeTaskTitle} title={task.title}/>
                                <IconButton onClick={removeTask}>
                                    <Delete />
                                </IconButton>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default TodoList
