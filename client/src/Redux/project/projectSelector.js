import { createSelector } from 'reselect';

const selectProjectsData = (state) => state.project;

export const selectProject = createSelector([selectProjectsData], (project) => project.project);

export const selectProjects = createSelector([selectProjectsData], (project) => project.projects);

export const selectServerErrors = createSelector([selectProjectsData], (project) => project.error);

export const selectMembers = createSelector([selectProjectsData], (project) => project.members);
