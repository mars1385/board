import { createSelector } from 'reselect';

const selectTasksData = (state) => state.tasks;

export const selectTasks = createSelector([selectTasksData], (tasks) => tasks.tasks);

export const selectServerErrors = createSelector([selectTasksData], (tasks) => tasks.error);
