// Data

export interface Todo {
    todoId: number,
    text: string,
    completed: number
    rewardId?: number
}

export interface Reward {
    rewardId: number,
    text: string,
    isUnlocked?: boolean
}

export interface Requirement {
    rewardId: number,
    todoId: number,
    text: string,
    completed: number
}

export interface User {
    userId: number,
    username: string
}

export interface Setting {
    [key: string]: any
}

export interface UserData {
    todos: Todo[],
    rewards: Reward[],
    requirements: Requirement[],
    settings: Setting[]
}

export interface SetIsUnlockedData {
    rewardId: number,
    isUnlocked: boolean
}

export type ColorTheme = 'red' | 'green' | 'blue' | 'purple';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';



// Redux

export interface ReduxState {
    user: UserReducer,
    todos: TodosReducer,
    rewards: RewardsReducer,
    requirements: RequirementsReducer,
    menu: MenuReducer,
    temporary: TemporaryReducer
}

export interface UserReducer {
    currentUser: User | null,
    settings: {
        colorTheme: string | null
    }
}

export interface TodosReducer {
    todos: Todo[] | null
}

export interface RewardsReducer {
    rewards: Reward[] | null,
    selectedRewardId: number | null
}

export interface RequirementsReducer {
    requirements: Requirement[] | null
}

export interface MenuReducer {
    visible: boolean,
    submenuCategory: string | null
}

export interface TemporaryReducer {
    loggedOutMessage: boolean
}

export interface Action {
    type: string,
    payload?: any
}