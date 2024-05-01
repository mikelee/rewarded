import { createSlice } from '@reduxjs/toolkit';
import { RequirementsReducer } from '../../../types';

const initialState: RequirementsReducer = {
    requirements: []
}

const requirementsSlice = createSlice({
    name: 'requirements',
    initialState,
    reducers: {
        requirementAdded(state, action) {
            state.requirements.push(action.payload);
        },
        itemRequirementsDeleted(state, action) {
            state.requirements = action.payload.itemType === 'todo'
            ? state.requirements.filter(requirement => requirement.todoId !== action.payload.itemId)
            : state.requirements.filter(requirement => requirement.rewardId !== action.payload.itemId)
        },
        requirementDeleted(state, action) {
            state.requirements.filter(requirement => requirement.todoId !== action.payload.todoId || requirement.rewardId !== action.payload.rewardId);
        },
        requirementCompletedToggled(state, action) {
            const matchingRequirement = state.requirements.find(requirement => requirement.todoId === action.payload.todoId);

            if (matchingRequirement) matchingRequirement.completed = action.payload.completed;
        },
        requirementTextEdited(state, action) {
            const matchingRequirement = state.requirements.find(requirement => requirement.todoId === action.payload.todoId);

            if (matchingRequirement) matchingRequirement.text = action.payload.text;
        },
        requirementsSet(state, action) {
            state.requirements = action.payload;
        }
    }
});

export const { requirementAdded, itemRequirementsDeleted, requirementDeleted, requirementCompletedToggled, requirementTextEdited, requirementsSet } = requirementsSlice.actions;

export default requirementsSlice.reducer;