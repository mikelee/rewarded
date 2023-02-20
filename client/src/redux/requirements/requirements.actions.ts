import requirementsActionTypes from './requirements.types';
import { Requirement, Todo } from '../../../types';

export const addRequirement = (requirement: Requirement) => ({
    type: requirementsActionTypes.ADD_REQUIREMENT,
    payload: requirement
});

export const editRequirementText = (todo: Todo) => ({
    type: requirementsActionTypes.EDIT_REQUIREMENT_TEXT,
    payload: todo
});

export const deleteItemRequirements = (itemType: 'todo' | 'reward', itemId: number) => ({
    type: requirementsActionTypes.DELETE_ITEM_REQUIREMENTS,
    payload: { itemType, itemId }
});

export const deleteRequirement = (todoId: number, rewardId: number) => ({
    type: requirementsActionTypes.DELETE_REQUIREMENT,
    payload: { todoId, rewardId }
});

export const setRequirements = (requirements: Requirement[]) => ({
    type: requirementsActionTypes.SET_REQUIREMENTS,
    payload: requirements
});

