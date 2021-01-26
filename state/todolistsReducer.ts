import {FilterValuesType, TodoListType} from "../src/App"
import {v1} from "uuid";

type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}

type AddTodoListActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
type ChangeTodoListTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

export type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleActionType | ChangeTodoListFilterActionType

export function todoListsReducer(state: Array<TodoListType>, action: ActionType) {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(tl => tl.id !== action.id)
        case 'ADD-TODOLIST':
            const newTodoList: TodoListType = {
                id: v1(),
                title: action.title,
                filter: 'all'
            }
            return [...state, newTodoList]
        case 'CHANGE-TODOLIST-TITLE':
            const todoLists = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.title}
                }
                return tl
            })
            return todoLists
        case 'CHANGE-TODOLIST-FILTER': {
            const todoLists = state.map(tl => {
                if (tl.id === action.id) {
                    return {...tl, title: action.filter}
                }
                return tl
            })
            return todoLists
    }
        default:
            return state

    }
}