import {userReducer, UserType} from "./userReducer";

test('Increment age', () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount: 3
    }
    const endUser = userReducer(startUser, {type: 'INCREMENT-AGE'})
    expect(endUser.age).toBe(30)
})

test('Increment children count', () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount: 3
    }
    const endUser = userReducer(startUser, {type: 'INCREMENT-CHILDREN-COUNT'})
    expect(endUser.childrenCount).toBe(4)
})

test('Change name', () => {
    const startUser: UserType = {
        name: 'Alex',
        age: 29,
        childrenCount: 3
    }
    const endUser = userReducer(startUser, {type: 'CHANGE_NAME', newName: 'Bob'})
    expect(endUser.name).toBe('Bob')
})