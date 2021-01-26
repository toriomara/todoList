export type UserType = {
    name: string
    age: number
    childrenCount: number
}

type ActionType = {
    type: string
    [key: string]: any
}

export function userReducer(user: UserType, action: ActionType) {
    switch (action.type) {
        case 'INCREMENT-AGE':
            return {...user, age: user.age + 1}
        case 'INCREMENT-CHILDREN-COUNT':
            return {...user, childrenCount: user.childrenCount + 1}
        case 'CHANGE_NAME':
            return {...user, name: action.newName}
        default:
            return user
    }
}