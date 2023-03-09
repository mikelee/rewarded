// Data

export interface Todo {
    todoId: number,
    text: string,
    completed: boolean,
    timestamp: string,
    rewardId?: number
}

export interface Reward {
    rewardId: number,
    text: string,
    timestamp: string,
    isUnlocked?: boolean
}

export interface Requirement {
    rewardId: number,
    todoId: number,
    text: string,
    completed: boolean,
    timestamp: string
}

export interface User {
    userId: number,
    username: string
}

export interface Settings {
    [key: string]: any
}

export interface UserData {
    todos: Todo[],
    rewards: Reward[],
    requirements: Requirement[],
    settings: Settings
}

export interface SetIsUnlockedData {
    rewardId: number,
    isUnlocked: boolean
}

export type Color = 'red' | 'green' | 'blue' | 'purple';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export interface UserReducer {
    currentUser: User | null,
    settings: {
        colorTheme: string | null
    }
}

export interface TodosReducer {
    todos: Todo[]
}

export interface RewardsReducer {
    rewards: Reward[],
    selectedRewardId: number | null
}

export interface RequirementsReducer {
    requirements: Requirement[]
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