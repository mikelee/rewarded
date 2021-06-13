// Data

export interface Todo {
    todo_id: number,
    user_id: number,
    text: string,
    completed: number
}

export interface Reward {
    reward_id: number,
    user_id: number,
    text: string,
    isUnlocked?: boolean
}

export interface Requirement {
    reward_id: number,
    todo_id: number,
    text: string,
    completed: number
}

export interface User {
    user_id: number,
    username: string
}

export interface setIsUnlockedData {
    rewardId: number,
    isUnlocked: boolean
}

export interface UserData {
    todos: Todo[],
    rewards: Reward[],
    requirements: Requirement[],
    settings: Setting[]
}

export interface Setting {
    [key: string]: any
}



// Redux

export interface ReduxState {
    user: UserReducer,
    todos: TodoReducer,
    rewards: RewardReducer,
    requirements: RequirementReducer,
    menu: MenuReducer,
    temporary: TemporaryReducer
}

export interface UserReducer {
    currentUser: User | null,
    settings: {
        colorTheme: string | null
    }
}

export interface TodoReducer {
    todos: Todo[] | null
}

export interface RewardReducer {
    rewards: Reward[] | null,
    selectedReward: Reward | null
}

export interface RequirementReducer {
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