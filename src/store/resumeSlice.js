import { createSlice } from '@reduxjs/toolkit';
import resumeData from '../data/resume.json';

const resumeSlice = createSlice({
  name: 'resume',
  initialState: resumeData,
  reducers: {
    addProject(state, action){
      state.projects.push(action.payload);
    },
    updateResume(state, action){
      return {...state, ...action.payload};
    }
  }
});

export const { addProject, updateResume } = resumeSlice.actions;
export default resumeSlice.reducer;
